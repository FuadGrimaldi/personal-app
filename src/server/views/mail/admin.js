/**
 * Build mail options for admin notification when a contact form is submitted.
 * Usage: const mail = require('./mail/admin');
 * transporter.sendMail(mail(config, created));
 */
module.exports = function adminMail(config, created) {
  return {
    from: `"Website Contact" <${config.email_user}>`,
    to: config.admin_email,
    subject: `New Contact Form - ${created.subject}`,
    html: `
		<h2>New Contact Message</h2>

		<p><strong>Name:</strong> ${created.name}</p>
		<p><strong>Email:</strong> ${created.email}</p>
		<p><strong>Subject:</strong> ${created.subject}</p>
		<p><strong>Message:</strong></p>

		<div style="padding:10px;background:#f5f5f5;">
			${created.message}
		</div>
	`,
  };
};
