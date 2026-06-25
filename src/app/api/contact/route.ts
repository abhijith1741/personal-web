import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER || "abhijithlenin00@gmail.com";

    // Verify SMTP configuration is provided
    if (!user || !pass) {
      console.warn("=============================================================");
      console.warn("⚠️  [CONTACT FORM ENGINE]: SMTP credentials not configured!");
      console.warn("To make emails fully operational, add the following to your .env.local file:");
      console.warn("-------------------------------------------------------------");
      console.warn("SMTP_USER=your-email@gmail.com");
      console.warn("SMTP_PASS=your-gmail-app-password");
      console.warn("CONTACT_RECEIVER=abhijithlenin00@gmail.com");
      console.warn("=============================================================");
      console.log("Logged Message Payload:", { name, email, subject, message });

      return NextResponse.json(
        { 
          success: true, 
          warning: "SMTP credentials not configured. The form payload was logged to the server console.",
          data: { name, email, subject, message }
        },
        { status: 200 }
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // Use SSL/TLS
      auth: {
        user,
        pass,
      },
    });

    // Email content setup
    const mailOptions = {
      from: `"${name}" <${user}>`, // Sender address must match authenticated user in many SMTPs (like Gmail)
      replyTo: email, // Set Reply-To to the user's email
      to: receiver, // Destination
      subject: `[Portfolio Contact]: ${subject}`,
      text: `You have received a new contact submission from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 8px;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px; margin-top: 0;">Portfolio Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <div style="background-color: #f4f4f5; padding: 15px; border-radius: 6px; white-space: pre-wrap; line-height: 1.5; color: #18181b;">${message}</div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Nodemailer send error:", error);
    return NextResponse.json(
      { error: "Failed to dispatch email", details: error.message },
      { status: 500 }
    );
  }
}
