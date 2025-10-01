import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, tel, text, message } = body;

        // Create transporter (using Gmail SMTP)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER, // your Gmail address
                pass: process.env.SMTP_PASS  // app password or OAuth token
            }
        });

        // Send mail
        await transporter.sendMail({
            from: `Magnólia Tiffanystudió <${email}>`,
            to: process.env.SMTP_USER,
            replyTo: `"${name}" <${email}>`,
            subject: text || 'Megkeresés a weboldalon keresztül',
            text: `
Name: ${name}
Email: ${email}
Phone: ${tel || ''}

Message:

${message}
`,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
}
