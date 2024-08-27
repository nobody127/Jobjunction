import z from "zod";

const locationEnum = ["Remote", "Onsite", "Hybrid"] as const;

const jobTypeEnum = [
  "Fulltime",
  "Internship",
  "Contract",
  "Freelance",
] as const;

const experienceEnum = ["Fresher", "0-1", "1+", "3+", "5+"] as const;

export const createJobSchema = z.object({
  position: z
    .string({ message: "Position is required" })
    .min(2, { message: "Extend it little" }),

  company: z
    .string({ message: "Company name is required" })
    .min(2, { message: "Extend it little" }),

  role_description: z
    .string({ message: "Description is required" })
    .min(200, {
      message: "Description need to be long",
    })
    .optional(),

  location: z.enum(locationEnum, {
    message: "Unexpected Inputs",
  }),

  job_type: z.enum(jobTypeEnum, { message: "Unexpected Inputs" }),

  role_name: z.string({ message: "Role must be defined" }).min(2, {
    message: "Role can't be this small",
  }),

  experience_level: z.enum(experienceEnum, { message: "Unexpected Inputs" }),

  salary_min: z
    .number({ message: "Min salary must specified" })
    .min(5000, { message: "Salary can't be less than 5000" }),

  salary_max: z
    .number({ message: "Max salary must specified" })
    .min(5001, { message: "Max Salary can't be less than 5001" }),

  apply_link: z
    .string({ message: "Must provide apply link" })
    .url({ message: "Invalid url" }),

  author: z.string({ message: "Author is required" }).optional(),
});

export type createJobSchemaType = z.infer<typeof createJobSchema>;
