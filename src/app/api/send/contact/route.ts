import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import * as React from "react";
import WorkInquire from "@/components/emails/WorkInquire";
import { contactSchema } from "@/schema";

const resend = new Resend(process.env.RESEND);

export async function POST(request: NextRequest) {
  const data = await request.json();
  const contactData = contactSchema.parse(data);
  try {
    const { data, error } = await resend.emails.send({
      from: "portfolio <contact@noelvega.dev>",
      to: "noel@noelvega.dev",
      subject: `Contact Inquire: ${contactData.company}`,
      react: WorkInquire(contactData) as React.ReactElement,
    });

    if (error) {
      return NextResponse.json({ ok: false });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false });
  }
}
