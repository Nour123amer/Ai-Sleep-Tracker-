import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName,lastName,subject, email, message } = body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "nouramer295@gmail.com",
       replyTo: email,
      subject: `${subject}`,
      html: `
        <h2>New Contact Form</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}