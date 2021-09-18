// app.get("/test", async (req, res) => {
//     // const schema = Joi.number();
//     const schema = Joi.object({
//       num: Joi.number().min(5),
//       string: Joi.string(),
//     });
//     const num = req.body.num;
//     const string = req.body.string;
//     const testObject = { num, string };
//     console.log(testObject);
//     try {
//       await schema.validateAsync(testObject);
//       return res.send("성공");
//     } catch (e) {
//       console.log(e);
//       return res.send("Jo");
//     }
//   });

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
