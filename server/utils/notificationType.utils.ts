import { calls, emailer, message, whatsapp } from "./services.utils";

const notificationType = async (
  notType: string,
  phone: string[],
  to: string[]
): Promise<any> => {
  switch (notType) {
    case "whatsapp":
      return await whatsapp(phone);
    case "sms":
      return await message(phone);
    case "phone":
      return await calls(phone);
    default:
      return await emailer(to);
  }
};

export default notificationType;
