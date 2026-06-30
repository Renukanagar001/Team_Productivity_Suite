const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER ROUTE (Direct Auto-Login Support ke sath)
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // User ko database me save kiya
        await user.save();

        // ✅ CHANGE: Register hote hi instant JWT Token generate kiya taaki frontend bypass ho sake
        const token = jwt.sign(
            { id: user._id, name: user.name }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        // ✅ CHANGE: Message ke sath token aur user data dono return kiya
        res.status(201).json({ 
            msg: 'User registered successfully', 
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// 2. LOGIN ROUTE
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// 3. PROFILE ROUTE
router.get('/profile', async (req, res) => {
    try {
        const token = req.header('Authorization');
        
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied ❌' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error("Profile Route Error:", err.message);
        res.status(401).json({ msg: 'Token is not valid ❌' });
    }
});

module.exports = router;