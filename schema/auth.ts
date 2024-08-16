import z from "zod";

export const signupSchema = z.object({
  username: z
    .string({ required_error: "Oops! You missed a spot" })
    .min(2, { message: "Username must be of length 2" }),
  email: z
    .string({ required_error: "Oops! You missed a spot." })
    .email({ message: "Must be a email" }),
  password: z
    .string({ required_error: "Oops! You missed a spot." })
    .min(6, { message: "Password must be atleast 6 char long" })
    .max(8, { message: "Password can't be greater than 8 char" })
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {
      message: "Must include a special character",
    })
    .regex(new RegExp(".*[0-9].*"), { message: "Must include a number" }),
  avatar: z
    .string({ required_error: "Oops! You missed a spot." })
    .url({ message: "Url is invalid type" })
    .optional(),
  bio: z
    .string({ message: "Oops! You missed a spot" })
    .min(10, { message: "Extend it little more" }),
  instagram_url: z.string().optional(),
  linkedin_url: z.string().optional(),
  twitter_url: z.string().optional(),
  skills: z.string().array().nonempty({ message: "Must select one" }),
});

export const signinSchema = z.object({
  username: z
    .string({ required_error: "Oops! You missed a spot" })
    .min(2, { message: "Username must be of length 2" }),
  password: z
    .string({ required_error: "Oops! You missed a spot." })
    .min(6, { message: "Password must be atleast 6 char long" })
    .max(8, { message: "Password can't be greater than 8 char" })
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {
      message: "Must include a special character",
    })
    .regex(new RegExp(".*[0-9].*"), { message: "Must include a number" }),
});

export type SignupInputType = z.infer<typeof signupSchema>;
export type SigninInputType = z.infer<typeof signinSchema>;
