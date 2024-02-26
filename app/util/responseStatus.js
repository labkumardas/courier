class ResponseStatus {
  constructor() {
    this.statusCodes = {
      OK: { code: 200, message: 'OK' },
      CREATED: { code: 201, message: 'Created' },
      BAD_REQUEST: { code: 400, message: 'Bad Request' },
      UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
      FORBIDDEN: { code: 403, message: 'Forbidden || Account blocked' },
      USER_IS_NOT_ACTIVE: { code: 403, message: 'Inactive User Or Account Blocked , Please Contact To Admin' },
      NOT_FOUND: { code: 404, message: 'Not Found' },
      EXISTING_PHONE_NUMBER: { code: 409, message: 'Phone number already exists' },
      EXISTING_EMAIL: { code: 409, message: 'Emails already exist' },
      EXISTING_USERNAME: { code: 409, message: 'Username already exists' },
      INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal Server Error' },
      NO_USER_FOUND: { code: 404, message: 'No USER FOUND.' },
      INVALID_OTP: { code: 401, message: 'INVALID OTP.' },
      WRONG_PASSWORD: { code: 401, message: 'INVALID PASSWORD.' },
      INVALID_EMAIL: { code: 401, message: 'INVALID EMAIL.' },
      EMAIL_REQUIRED: { code: 400, message: 'EMAIL_REQUIRED.' },
      EMAIL_REQUIRED: { code: 400, message: 'EMAIL_REQUIRED.' },
      OTP_is_expired: { code: 400, message: 'OTP Is Expired.' },
      PASSWORD_REQUIRED: { code: 400, message: 'PASSWORD_REQUIRED.' },
      ACCOUNT_BLOCK: { code: 400, message: 'ACCOUNT_BLOCK.' },
      ACCOUNT_DELETE: { code: 400, message: 'Account not found.' },
    };
  }
  getStatus(code, customMessage) {
    const status = this.statusCodes[code] || { code: 500, defaultMessage: 'Internal Server Error' };
    return {
      code: status.code,
      message: customMessage || status.message || 'OK',
    };
  }
}
export default new ResponseStatus();
