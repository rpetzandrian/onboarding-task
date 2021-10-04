import * as Joi from 'joi';
import { IObject } from 'rey-common';

export const COMMON_PARAMS_ID = Joi.object({
    params: Joi.object({
        id: Joi.string().required()
    })
});

export const SCHEME: IObject<Joi.ObjectSchema> = {
    CREATE_ARTICLE: Joi.object({
        body: Joi.object({
            title: Joi.string().min(4).max(50).required(),
            content: Joi.string().min(10).required(),
            author_id: Joi.string().required(),
        }).required()
    }),
    UPDATE_ARTICLE: Joi.object({
        body: Joi.object({
            id: Joi.string().required(),
            title: Joi.string().min(4).max(50).optional(),
            content: Joi.string().min(10).optional(),
            author_id: Joi.string().optional(),
        }).required(),
    }),
    CREATE_AUTHOR: Joi.object({
        body: Joi.object({
            name: Joi.string().min(3).max(50).required()
        }).required()
    }),
    UPDATE_AUTHOR: Joi.object({
        body: Joi.object({
            id: Joi.string().required(),
            name: Joi.string().min(3).max(50).optional()
        }).required()
    })
};
