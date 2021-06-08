const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const User = require("../models/User");
const { ErrorHandler } = require("../controllers/error");

module.exports.postLogin = async (req, res, next) => {
    // validate email & password
    const emailSchema = Joi.object({
        email: Joi.string().email().required(),
    });

    try {
        await validateBody(emailSchema, { email: req.body.email });

        const user = await User.findOne({ email: req.body.email }).select({ password: 1 });
        if (!user) throw new ErrorHandler(401, "Your email or password is incorrect.");

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (isPasswordValid === true) {
            req.session.isAuth = true;
            req.session.userId = user._id;
            res.sendStatus(200);
        } else {
            throw new ErrorHandler(401, "Your email or password is incorrect.");
        }
    } catch (error) {
        next(error);
    }
};

module.exports.postSignup = async (req, res, next) => {
    const complexityOptions = {
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 0,
        requirementCount: 2,
    };

    const signUpSchema = Joi.object({
        email: Joi.string().email().required(),
        password: passwordComplexity(complexityOptions),
        confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    });

    try {
        await validateBody(signUpSchema, req.body);

        const hash = await bcrypt.hash(req.body.password, 12);
        const user = new User({
            email: req.body.email,
            password: hash,
        });

        await user.save();
        res.status(200).send({ _id: user._id, status: "User created" });
    } catch (error) {
        next(error);
    }
};

module.exports.isAuth = (req, res, next) => {
    res.status(200).send({ isAuth: true });
};

async function validateBody(schema, body) {
    try {
        await schema.validateAsync(body);
    } catch (error) {
        throw new ErrorHandler(400, error.message);
    }
}
