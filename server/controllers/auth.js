const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const User = require("../models/User");

const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 0,
    requirementCount: 2,
};

const joiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: passwordComplexity(complexityOptions),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

module.exports.postLogin = (req, res) => {
    // validate email & password
};

module.exports.postSignup = async (req, res) => {
    try {
        await joiSchema.validateAsync(req.body);
        const hash = await bcrypt.hash(req.body.password, 12);
        const user = new User({
            email: req.body.email,
            password: hash,
        });

        await user.save();
        res.status(200).send({ _id: user._id, status: "User created" });
    } catch (ex) {
        res.status(400).send({ error: ex.message });
    }
};
