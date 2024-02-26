import responseStatus from '../util/responseStatus.js';
const sendResponse = (res, code, message, data, error) => {
    const responseObj = {
        status: code,
        message,
        data: data || null,
    };
    if (error) {
        responseObj.error = error;
    }
    return res.status(code).send(responseObj);
};
const sendSuccessResponse = (res, status, message, data) => {
    const { code, message: customMessage } = responseStatus.getStatus(status, message);
    return sendResponse(res, code, customMessage, data, null);
};
const sendErrorResponse = (res, status, customError) => {
    const { code, message } = responseStatus.getStatus(status);
    return sendResponse(res, code, message, null, customError || message);
};
export { sendSuccessResponse, sendErrorResponse };