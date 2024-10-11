import * as Joi from 'joi';

export const createUserSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required()
});

export const createPostSchema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required()
});
