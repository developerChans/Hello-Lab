const Joi = require("joi");

exports.createLabJoi = Joi.object({
  name: Joi.string(),
  associateProfessorId: Joi.number().optional(),
});

exports.getOneLabJoi = Joi.number().min(1);

exports.applyLabJoi = Joi.object({
  userId: Joi.number().min(1),
  labId: Joi.number().min(1),
  content: Joi.string().required(),
});

exports.updateJoinLabJoi = Joi.boolean();
