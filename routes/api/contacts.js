const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Contact = require('../../models/Contact');

// @route    GET api/contact
// @desc     Get all contacts
// @access   Public
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ date: -1 });
        res.json({data: contacts});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route    Post api/contact
// @desc     Add contact
// @access   Public
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('subject', 'Subject is required')
            .not()
            .isEmpty(),
        check('message', 'Message is required')
            .not()
            .isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, subject, message } = req.body;

        try {
            contact = new Contact({ name, email, subject, message });
            await contact.save();
            res.status(200).json({ message: "Your details will be reviewed as soon as possible, Thank You." });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server Error' });
        }
    }
);


module.exports = router;