const OWNER_WHATSAPP = "919860667552";

interface FormData {
  type: "contact" | "brochure" | "application";
  data: Record<string, string>;
}

function generateWhatsAppMessage(formData: FormData): string {
  const { type, data } = formData;

  switch (type) {
    case "contact":
      return `🎓 *New Contact Form Submission*\n\n` +
        `*Name:* ${data.fullName}\n` +
        `*Email:* ${data.email}\n` +
        `*Phone:* ${data.phoneNumber}\n` +
        `*Preferred Country:* ${data.preferredCountry || "Not specified"}\n` +
        `*Message:* ${data.message}\n\n` +
        `_From HN Study Abroad Website_`;

    case "brochure":
      return `📥 *Brochure Download Request*\n\n` +
        `*Name:* ${data.name}\n` +
        `*Email:* ${data.email}\n` +
        `*Phone:* ${data.phone}\n` +
        `*Country:* ${data.country}\n\n` +
        `_From HN Study Abroad Website_`;

    case "application":
      return `📝 *New University Application*\n\n` +
        `*Student:* ${data.studentName}\n` +
        `*Email:* ${data.email}\n` +
        `*Country:* ${data.country}\n` +
        `*University:* ${data.university}\n` +
        `*Course:* ${data.course}\n` +
        `*Intake:* ${data.intake}\n\n` +
        `_From HN Study Abroad Website_`;

    default:
      return "New form submission received";
  }
}

export function sendWhatsAppNotifications(formData: FormData): void {
  const message = generateWhatsAppMessage(formData);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
}
