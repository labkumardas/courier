import { checkSchema, validationResult } from 'express-validator';
import ResponseStatus from '../../util/responseStatus.js';

class jobValidation {
    static rejectIfInvalid(req, res, next) {
        const errors = validationResult(req).array();
        if (errors && Array.isArray(errors) && errors.length > 0) {
            const errorMessages = errors.map((errElem) => errElem.msg);
            const { code, message } = ResponseStatus.getStatus('BAD_REQUEST');
            return res.status(code).send({
                status: 'failed',
                message,
                error: errorMessages,
            });
        }
        return next();
    }

    static async jobCreateValidation(req, res, next) {
        await checkSchema({
            locations: {
                optional: false,
                isArray: true,
                errorMessage: 'Locations must be an array',
                custom: {
                    options: value => Array.isArray(value) && value.every(loc => validateLocation(loc)),
                },
            },
            pickup: {
                errorMessage: 'Time pickup is required',
                 isString: true,
                 trim: true,
             },
            pickup_count: {
                errorMessage: 'Time pickup_count is required',
                 isString: true,
                 trim: true,
             },
            drop_off: {
                errorMessage: 'Time drop_off is required',
                 isString: true,
                 trim: true,
             },
            drop_off_count: {
                errorMessage: 'Time drop_off_count is required',
                 isString: true,
                 trim: true,
             },
            dates: {
               errorMessage: 'Time slot is required',
                isString: true,
                trim: true,
            },
            timeSlot: {
                errorMessage: 'Time slot is required',
                isString: true,
                trim: true,
            },
            vehicle: {
                 isString: true,
                trim: true,
            },
            weight: {
                 isNumeric: true,
            },
            contactNumber: {
                 isString: true,
                trim: true,
            },
            note: {
                 isString: true,
                trim: true,
            },
            documents: {
                isString: true,
                errorMessage: 'Upload documents must be an array',
               
            },
            createdBy: {
                errorMessage: 'Created by user ID is required',
                isMongoId: true,
            },

        }).run(req);
        jobValidation.rejectIfInvalid(req, res, next);
    }

    static async checkJobByType(req,res,next){
        await checkSchema({
            jobCategory: {
               errorMessage: 'jobCategory is required',
                isString: true,
                trim: true,
                notEmpty: true,
            },
            jobType: {
                errorMessage: 'jobType is required',
                isString: true,
                trim: true,
                //notEmpty: true,
            },
            
        }).run(req);
        jobValidation.rejectIfInvalid(req, res, next);
    }

}
export default jobValidation;
