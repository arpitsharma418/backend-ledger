const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Your Backend Ledger Account Has Been Created";

  const safeName = escapeHtml(name?.trim() || "Customer");

  const text = `Dear ${name?.trim() || "Customer"},

Thank you for registering with Backend Ledger.

This email is to confirm that your account has been created successfully. You may now sign in using your registered email address.

If you did not create this account, please contact our support team immediately.

Yours sincerely,
Backend Ledger Team

This is an automated message. Please do not reply to this email.`;

  const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Backend Ledger Account Has Been Created</title>
        </head>
        <body style="margin:0; padding:32px 16px; font-family:Arial, Helvetica, sans-serif; color:#222b3a; background:#ffffff;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td align="center">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                            style="max-width:520px;">

                            <tr>
                                <td style="padding-top:32px;">

                                    <p style="margin:0 0 16px; font-size:15px; line-height:1.8; color:#4b5563;">
                                        Dear ${safeName},
                                    </p>

                                    <p style="margin:0 0 16px; font-size:15px; line-height:1.8; color:#4b5563;">
                                        Thank you for registering with Backend Ledger. This email is to confirm that your account has been created successfully. You may now sign in using your registered email address.
                                    </p>

                                    <p style="margin:0 0 32px; font-size:15px; line-height:1.8; color:#4b5563;">
                                        If you did not create this account, please contact our support team immediately.
                                    </p>

                                    <p style="margin:0 0 40px; font-size:14px; line-height:1.8; color:#4b5563;">
                                        Yours sincerely,<br>
                                        <strong style="font-weight:600; color:#172b4d;">Backend Ledger Team</strong>
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <td style="padding-top:16px; border-top:1px solid #e5e7eb; font-size:12px; line-height:1.6; color:#6b7280;">
                                    This is an automated message. Please do not reply to this email.
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

  await sendEmail(userEmail, subject, text, html);
}

function escapeHtml(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Successful!";
  const text = `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Failed";
  const text = `Hello ${name},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail,
};
