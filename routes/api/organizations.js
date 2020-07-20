const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Organization = require('../../models/Organization');
const auth = require('../../middleware/auth');

// @route    GET api/organization
// @desc     Get all organization
// @access   Public
router.get('/', auth, async (req, res) => {
    try {
        const organizations = await Organization.find().sort({ date: -1 });
        res.json({ data: organizations });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route    Post api/organization
// @desc     Add organization details
// @access   Public
router.post(
    '/',
    [
        check('type', 'Type of Organization is required')
            .not()
            .isEmpty(),
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('service', 'Service is required')
            .not()
            .isEmpty(),
        check('about_organization', 'About organization is required')
            .not()
            .isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { type, email, service, about_organization } = req.body;

        try {
            organization = new Organization({ type, email, service, about_organization });
            await organization.save();
            res.status(200).json({ message: "Your details will be reviewed as soon as possible, Thank You." });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server Error' });
        }
    }
);


module.exports = router;