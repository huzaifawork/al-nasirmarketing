import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Change this to your email for testing, then swap to client email later
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'your@email.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, service_interest, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Al-Nasir Advertising <onboarding@resend.dev>',
      to: [NOTIFY_EMAIL],
      replyTo: email,
      subject: `New Inquiry: ${service_interest} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a1120; color: #ffffff; padding: 40px; border-radius: 16px;">
          <div style="border-bottom: 2px solid #2EAB8C; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #2EAB8C; font-size: 24px; margin: 0; text-transform: uppercase; letter-spacing: 2px;">New Project Inquiry</h1>
            <p style="color: #888; margin: 8px 0 0; font-size: 13px;">Al-Nasir Advertising — Contact Form</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Name</td>
              <td style="padding: 10px 0; color: #fff; font-size: 15px; font-weight: bold;">${name}</td>
            </tr>
            ${company ? `<tr>
              <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Company</td>
              <td style="padding: 10px 0; color: #fff; font-size: 15px;">${company}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #2EAB8C; font-size: 15px;">${email}</a></td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
              <td style="padding: 10px 0; color: #fff; font-size: 15px;">${phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service</td>
              <td style="padding: 10px 0;">
                <span style="background: #2EAB8C; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">${service_interest}</span>
              </td>
            </tr>
          </table>

          <div style="margin-top: 30px; padding: 20px; background: #111c33; border-radius: 12px; border-left: 3px solid #2EAB8C;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Message</p>
            <p style="color: #fff; font-size: 15px; line-height: 1.7; margin: 0;">${message.replace(/\n/g, '<br/>')}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1B2A4A; text-align: center;">
            <p style="color: #555; font-size: 11px; margin: 0;">Al-Nasir Advertising · Flat#17, Cantonment Plaza, Abbottabad</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error('API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
