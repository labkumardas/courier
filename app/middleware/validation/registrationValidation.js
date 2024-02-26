import { checkSchema, validationResult } from 'express-validator';
import ResponseStatus from '../../util/responseStatus.js';

class RegistrationValidation {
  
  static rejectIfInvalid(req, res, next) {
    const validationErrors = validationResult(req);
  
    if (!validationErrors.isEmpty()) {
      const errorMessages = validationErrors.array().map((errElem) => errElem.msg);
      const { code, message } = ResponseStatus.getStatus('BAD_REQUEST');
  
      return res.status(code).send({
        status: 'failed',
        message,
        validationError: errorMessages,
      });
    }
  
    return next();
  }
  static async registrationStep1(req, res, next) {
    await checkSchema({
      role_id: {
        errorMessage: 'role id required',
        isString: true,
        trim: true,
      },
      first_name: {
        errorMessage: 'first name required',
        isString: true,
        trim: true,
      },
      last_name: {
        errorMessage: 'last name required',
        isString: true,
        trim: true,
      },
      username: {
        errorMessage: 'username required',
        isString: true,
        trim: true,
      },
      phone: {
        errorMessage: 'phone required',
        isString: true,
        trim: true,
        isLength: {
          options: { min: 10, max: 12 }, // Adjust min and max values as needed
          errorMessage: 'Phone number must be between 10 and 12 characters.',
        },
      },
      email: {
        errorMessage: 'email required',
        isEmail: true,
        trim: true,
      },
      password: {
        errorMessage: 'password is required and should be at least 8 characters long',
        isString: true,
        isLength: { options: { min: 8 } },
        trim: true,
      },
      dob: {
        errorMessage: 'dob is required and should be a valid date',
        isString: true,
        trim: true,
      },
    }).run(req);
    RegistrationValidation.rejectIfInvalid(req, res, next);
  }
  static async editProfile(req, res, next) {
    await checkSchema({
      
      phone: {
        errorMessage: 'Phone number must be between 10 and 12 numeric characters.',
        isNumeric: true, // Check if the value is numeric
        trim: true,
        isLength: {
          options: { min: 10, max: 12 },
          errorMessage: 'Phone number must be between 10 and 12 numeric characters.',
        },
      },
      id: {
        errorMessage: 'id required',
        isString: true,
        trim: true,
        notEmpty: true,
      },
      email: {
        errorMessage: 'email required',
        isEmail: true,
        trim: true,
      },
      
    }).run(req);
    RegistrationValidation.rejectIfInvalid(req, res, next);
  }
  
  static async userLoginValidation(req, res, next) {
    try {
      await checkSchema({
        email: {
          errorMessage: 'email id required',
          isEmail: true,
          isString: true,
          trim: true,
          notEmpty: true,
        },
        password: {
          errorMessage: 'password is required and should be at least 8 characters long',
          isString: true,
          isLength: { options: { min: 8 } },
          trim: true,
          notEmpty: true,
        },
      }).run(req);
  
      const validationErrors = validationResult(req);
  
      if (!validationErrors.isEmpty()) {
        const errorMessages = validationErrors.array().map((errElem) => errElem.msg);
        const { code, message } = ResponseStatus.getStatus('BAD_REQUEST');
  
        return res.status(code).send({
          status: 'failed',
          message,
          error: errorMessages[0],
        });
      }
  
      next(); // Proceed to the next middleware/controller if validation passes
    } catch (error) {
      console.error('Error in userLoginValidation:', error);
      return res.status(500).json({
        status: 'failed',
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }
  static async phoneNumberValidation(req, res, next) {
    await checkSchema({
      phone: {
        errorMessage : 'Phone number must be between 10 and 12 numeric characters',
        isNumeric : true, // Check if the value is numeric
        trim : true,
        isLength: {
          options : { min: 10, max: 12 },
          errorMessage : 'Phone number must be between 10 and 12 numeric characters',
        },
      },
    }).run(req);
    RegistrationValidation.rejectIfInvalid(req, res, next);
  }
  
  static async checkOtp(req, res, next) {
    await checkSchema({
      email: {
        errorMessage: 'email id required',
        isEmail: true,
        isString: true,
        trim: true,
        notEmpty: true,
      },
      userId: {
        errorMessage: 'userId id required',
        isString: true,
        notEmpty: true,
      },
      otp: {
        errorMessage: 'otp required',
        isString: false,
        trim: true,
        notEmpty: true,
        isLength: {
          options: { min: 6, max: 6 },  
          errorMessage: 'otp must be between 4 and 6 characters.',
        },
      },

    }).run(req);
    RegistrationValidation.rejectIfInvalid(req, res, next);
  }
  
  static async cancelJobReq(req, res, next) {
    await checkSchema({
      jobId: {
        errorMessage: 'Job Id Required',
        isString: true,
        trim: true,
        notEmpty: true,
      },
      reasone: {
        errorMessage: 'Reasone Required',
        isString: true,
        notEmpty: true,
      },
      status: {
        errorMessage: 'Job Status Required',
        isString: true,
        trim: true,
        notEmpty: true,
       },

    }).run(req);
    RegistrationValidation.rejectIfInvalid(req, res, next);
  }
  static async acceptJobVal(req, res, next) {
    await checkSchema({
      job_id: {
        errorMessage: 'Job Id Required',
        isString: true,
        trim: true,
        notEmpty: true,
      },
      
      driver_id: {
        errorMessage: 'Driver Id Required',
        isString: true,
        trim: true,
        notEmpty: true,
       },
       accept: {
        errorMessage: 'Accept Value Required',
        isString: true,
        trim: true,
        notEmpty: true,
       },

    }).run(req);
    RegistrationValidation.rejectIfInvalid(req, res, next);
  }
  
  static async verifyOtp(req, res, next) {
    await checkSchema({
      email: {
        errorMessage: 'email id required',
        isEmail: true,
        isString: true,
        trim: true,
        notEmpty: true,
      },
      userId: {
        errorMessage: 'userId id required',
        isString: true,
        notEmpty: true,
      },
       

    }).run(req);
    RegistrationValidation.rejectIfInvalid(req, res, next);
  }
  static async idCheck(req, res, next) {
    await checkSchema({
      id: {
        errorMessage: 'id required',
        isString: true,
        trim: true,
        notEmpty: true,
        
      },

    }).run(req);
    RegistrationValidation.rejectIfInvalid(req, res, next);
  }
}
export default RegistrationValidation;
