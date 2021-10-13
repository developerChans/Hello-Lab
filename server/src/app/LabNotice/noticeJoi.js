const Joi = require("joi");

exports.createNoticeJoi = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

exports.updateNoticeJoi = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});
