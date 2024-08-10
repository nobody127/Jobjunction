import z from "zod";

export const signinSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(2, { message: "Username must be of length 2" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Must be a email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be atleast 6 char long" })
    .max(8, { message: "Password can't be greater than 8 char" })
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {
      message: "Must include a special character",
    })
    .regex(new RegExp(".*[0-9].*"), { message: "Must include a number" }),
});
