import { PassThrough } from "stream";
import { z } from "zod";

const signUpSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: `The Name Should be At Least 5 Length`,
    })
    .max(100, {
      message: `The Name Length Cannot be More than 100`,
    }),

  email: z.string().email({
    message: `Please Enter the Apporpriate Email`,
  }),
  password: z.string().min(8, {
    message: `The Password Should be At Least 8 Character`,
  }),
});
const loginSchema= z.object({
  email:z
  .string()
  .email({message:`Email must be valid`}),

  password:z
  .string()

})

export { signUpSchema,loginSchema };
