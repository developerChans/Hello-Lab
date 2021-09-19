const Joi = require("joi");

exports.createLabJoi = Joi.object({
  name: Joi.string(),
  associateProfessorId: Joi.number().optional(),
});

exports.getOneLabJoi = Joi.number().min(1);

exports.joinLabJoi = Joi.object({
  userId: Joi.number().min(1),
  labId: Joi.number().min(1),
});

exports.updateJoinLabJoi = Joi.boolean();
