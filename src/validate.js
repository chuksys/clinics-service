const {
    check
} = require('express-validator');

const validateRequest = [
    check('name').optional().isString().not().isEmpty().withMessage("name cannot be empty"),
    check('state').optional().isString().not().isEmpty().withMessage("state cannot be empty"),
    check('from').optional().isString().not().isEmpty().withMessage("from cannot be empty"),
    check('to').optional().isString().not().isEmpty().withMessage('to cannot be empty')
]

module.exports.validateRequest = validateRequest;