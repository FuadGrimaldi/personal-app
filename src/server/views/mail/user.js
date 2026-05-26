module.exports = function userMail(config, created) {
  return {
    from: "FuadOneTwo <contact@fuadonetwo.my.id>",
    to: created.email,
    subject: "We've Received Your Message",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
      
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #111827; margin: 0;">
          FuadOneTwo
        </h1>
        <p style="color: #6b7280; margin-top: 5px;">
          Thank you for contacting us
        </p>
      </div>

      <div style="background: #ffffff; padding: 20px; border-radius: 8px;">
        <p style="font-size: 16px; color: #111827;">
          Dear <strong>${created.name || "Customer"}</strong>,
        </p>

        <p style="font-size: 15px; color: #374151; line-height: 1.7;">
          Thank you for reaching out to us. We have successfully received your message and our team will review it shortly.
        </p>

        <p style="font-size: 15px; color: #374151; line-height: 1.7;">
          We appreciate your interest and will get back to you as soon as possible.
        </p>

        <div style="margin-top: 25px; padding: 15px; background-color: #f3f4f6; border-radius: 6px;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">
            <strong>Your Subject:</strong><br/>
            ${created.subject || "-"}
          </p>
        </div>

        <p style="margin-top: 30px; font-size: 15px; color: #111827;">
          Best regards,<br/>
          <strong>FuadOneTwo Team</strong>
        </p>
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <p style="font-size: 12px; color: #9ca3af;">
          This is an automated message. Please do not reply directly to this email.
        </p>
      </div>
    </div>
  `,
  };
};
