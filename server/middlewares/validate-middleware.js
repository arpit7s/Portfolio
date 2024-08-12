const { Schema } = require("zod")

const validate = (schema) => async (req, res,next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next()
    } catch (err) {
        const status = 422;
        const message = "Fill input properlly";
        const extraDeatails = err.errors[0].message;
        // return res.status(400).json({ msg: message })
        const error = {
            status,
            message,
            extraDeatails
        };

        next(error)
    }
}

module.exports = validate;