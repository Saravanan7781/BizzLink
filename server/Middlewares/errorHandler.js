const {constants} = require('../constants/constants');

const errHandler = (err, req, res, next) => {
    const statusCode =(res.statusCode!==undefined) ? res.statusCode : 500;
    // console.log(statusCode);
    switch (statusCode) {
        case constants.VALIDATION_ERR:
            res.json({
                "title":"Validation Error",
                "message": err.message,
                "stackTrace": err.stack
            });
            break;

        case constants.UNAUTHORIZED_ERR:
            res.json({
                "title":"Unauthorized Error",
                "message": err.message,
                "stackTrace": err.stack
            });
            break;

        case constants.FORBIDDEN:
            res.json({
                "title":"Forbidden Error",
                "message": err.message,
                "stackTrace": err.stack
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                "title":"Not Found",
                "message": err.message,
                "stackTrace": err.stack
            });
            break;
        
        default:
            res.json({"message":err.message,"stackTrace":err.stack});
            break;
    }

    console.log("Error handler executed");
}

module.exports = { errHandler };