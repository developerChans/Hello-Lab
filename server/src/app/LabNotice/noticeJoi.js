const Joi = require("joi");

exports.createNoticeJoi = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
});
