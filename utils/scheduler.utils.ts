import schedule from "node-schedule";
import notificationType from "./notificationType.utils";

export const scheduleJob = async (
  startDate: Date,
  endDate: Date,
  time: string,
  notType: string,
  phone: string[],
  to: string[]
) => {
  const timeInterval = 24 * 60 * 60 * 1000;

  const [hours, minutes] = time.split(":").map(Number);

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const scheduledDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hours,
      minutes
    );

    schedule.scheduleJob(scheduledDate, () =>
      notificationType(notType, phone, to)
    );
    currentDate = new Date(currentDate.getTime() + timeInterval);
    return currentDate;
  }
};
