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
  return dayjs(utcDateString).tz(userTimezone).format("MMM D, YYYY h:mm A");
};

export const convertLocalToUTC = (localDateTimeString, userTimezone) => {
  if (!localDateTimeString || !userTimezone) return null;
  return dayjs.tz(localDateTimeString, userTimezone).utc().toISOString();
};
