const { z } = require('zod')
const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .email({ message: 'Invalid email address' })
        .min(3, { message: 'Email must have atleast 3 character' })
        .max(255, { message: 'Email must not be more than 255 character' }),
    password: z
        .string({ required_error: 'Password is required' })
        .trim()
        .min(4, { message: 'Password must have atleast 4 character' })
        .max(1024, { message: 'Password must not be more than 1024 character' }),
})
const signupSchema = loginSchema.extend({
    username: z
        .string({ required_error: 'Name is required' })
        .trim()
        .min(3, { message: 'Name must have atleast 3 character' })
        .max(255, { message: 'Name must not be more than 255 character' }),

    phone: z
        .string({ required_error: 'Phone is required' })
        .trim()
        .min(10, { message: 'Phone must have atleast 10 character' })
        .max(20, { message: 'Phone must not be more than 20 character' }),

});

module.exports = { signupSchema, loginSchema };