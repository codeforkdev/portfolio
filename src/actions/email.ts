"use server";
import { Resend } from "resend";
import WorkInquire from "@/components/emails/WorkInquire";
const resend = new Resend(process.env.RESEND);

type Params = {
  email: string;
  company: string;
  message: string;
  firstName: string;
  lastName: string;
};
export const sendEmail = async (params: Params) => {
  const response = await resend.emails.send({
    from: "contact@noelvega.dev",
    to: params.email,
    subject: `Portfolio Inquire: ${params.company}`,
    react: WorkInquire(params),
  });

  if (response.error?.message) {
    return { ok: false, message: "unable to send email" } as const;
  } else {
    return { ok: true } as const;
  }
};
