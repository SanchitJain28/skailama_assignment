import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const TIMEZONES = [
  "UTC",
  "Asia/Kolkata",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Australia/Sydney",
  "Asia/Tokyo",
];

export const formatToUserTimezone = (utcDateString, userTimezone) => {
  if (!utcDateString || !userTimezone) return "Invalid Date";
  const cleanTz = userTimezone.replace(/\s/g, ""); 
  return dayjs(utcDateString).tz(cleanTz).format("MMM D, YYYY h:mm A");
};

export const convertLocalToUTC = (localDateTimeString, userTimezone) => {
  if (!localDateTimeString || !userTimezone) return null;
  const cleanTz = userTimezone.replace(/\s/g, ""); 
  return dayjs.tz(localDateTimeString, cleanTz).utc().toISOString();
};

export const formatForInput = (utcDateString, userTimezone) => {
  if (!utcDateString || !userTimezone) return "";
  const cleanTz = userTimezone.replace(/\s/g, ""); 
  return dayjs(utcDateString).tz(cleanTz).format("YYYY-MM-DDTHH:mm");
};