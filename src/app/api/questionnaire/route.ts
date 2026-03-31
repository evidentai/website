import { NextResponse } from "next/server";
import { Resend } from "resend";

interface QuestionnairePayload {
  name: string;
  email: string;
  company: string;
  role: string;
  framework: string[];
  cloud: string[];
  scm: string[];
  cicd: string[];
  identity: string[];
  endpoint: string[];
  logs: string[];
  otherTools: string[];
  message: string;
}

function formatList(items: string[]): string {
  if (items.length === 0) return "—";
  return items
    .map((item) =>
      item.startsWith("other:") ? item.replace("other:", "") : item
    )
    .join(", ");
}

function buildEmailHtml(data: QuestionnairePayload): string {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:8px 12px;font-weight:600;color:#888;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;color:#fff">${value}</td>
    </tr>`;

  return `
    <div style="font-family:sans-serif;background:#111;color:#fff;padding:32px;border-radius:12px;max-width:600px;margin:0 auto">
      <h2 style="color:#00E5A0;margin:0 0 24px">New Questionnaire Submission</h2>
      <table style="width:100%;border-collapse:collapse">
        ${row("Name", data.name)}
        ${row("Email", data.email)}
        ${row("Company", data.company)}
        ${row("Role", data.role || "—")}
        <tr><td colspan="2" style="padding:12px 0;border-bottom:1px solid #333"></td></tr>
        ${row("Frameworks", formatList(data.framework))}
        ${row("Cloud", formatList(data.cloud))}
        ${row("SCM", formatList(data.scm))}
        ${row("CI/CD", formatList(data.cicd))}
        ${row("Identity", formatList(data.identity))}
        ${row("Endpoint", formatList(data.endpoint))}
        ${row("Logs", formatList(data.logs))}
        ${row("Other Tools", data.otherTools.length > 0 ? data.otherTools.join(", ") : "—")}
        <tr><td colspan="2" style="padding:12px 0;border-bottom:1px solid #333"></td></tr>
        ${row("Message", data.message ? data.message.replace(/\n/g, "<br>") : "—")}
      </table>
    </div>
  `;
}

function buildEmailText(data: QuestionnairePayload): string {
  return `--- New Questionnaire Submission ---

Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Role: ${data.role || "—"}

Compliance Frameworks: ${formatList(data.framework)}
Cloud Providers: ${formatList(data.cloud)}
Source Code Management: ${formatList(data.scm)}
CI/CD Pipelines: ${formatList(data.cicd)}
Identity Providers: ${formatList(data.identity)}
Endpoint Management: ${formatList(data.endpoint)}
Log / Monitoring Tools: ${formatList(data.logs)}
Additional Tools: ${data.otherTools.length > 0 ? data.otherTools.join(", ") : "—"}

Message:
${data.message || "—"}
`;
}

export async function POST(request: Request) {
  try {
    const data: QuestionnairePayload = await request.json();

    if (!data.name?.trim() || !data.email?.trim() || !data.company?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and company are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const personalDomains = [
      "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.ca",
      "yahoo.com.au", "yahoo.co.in", "hotmail.com", "hotmail.co.uk",
      "outlook.com", "live.com", "msn.com", "aol.com", "icloud.com",
      "me.com", "mac.com", "mail.com", "protonmail.com", "proton.me",
      "zoho.com", "yandex.com", "yandex.ru", "gmx.com", "gmx.net",
      "tutanota.com", "tuta.io", "fastmail.com", "hey.com", "qq.com",
      "163.com", "126.com", "rediffmail.com", "mail.ru",
    ];
    const domain = data.email.split("@")[1]?.toLowerCase();
    if (personalDomains.includes(domain)) {
      return NextResponse.json(
        { error: "Please use a work email address." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "info@evidentflow.ai",
      replyTo: data.email,
      subject: `New Questionnaire: ${data.company} — ${data.name}`,
      html: buildEmailHtml(data),
      text: buildEmailText(data),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Questionnaire submission error:", error);
    return NextResponse.json(
      { error: "Failed to send questionnaire. Please try again." },
      { status: 500 }
    );
  }
}
