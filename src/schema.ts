import { z } from "zod";
export const contactSchema = z.object({
  firstName: z.string().trim().min(1, { message: "required" }),
  lastName: z.string().trim().min(1, { message: "required" }),
  company: z.string().trim().min(1, { message: "required" }),
  email: z.string().trim().email(),
  message: z.string().trim().min(1, { message: "required" }),
});

export type TContactSchema = z.infer<typeof contactSchema>;
