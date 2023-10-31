import dayjs from "dayjs";

export const timeZoneOffset = (
  locationDateValue: number,
  timeZoneOffSetValue: number
) => {
  const timestamp = locationDateValue;
  const timeZoneOffset = timeZoneOffSetValue;
  const date = new Date(timestamp * 1000);
  const localTimestamp =
    timestamp + date.getTimezoneOffset() * 60 + timeZoneOffset;
  const localDate = new Date(localTimestamp * 1000);
  const formattedDate = dayjs(localDate).format("h:mm a");

  return formattedDate;
};
