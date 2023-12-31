import dayjs from "dayjs";

export const formatDate = (timeZoneOffset: number): string => {
  let currentTime = new Date().getTime();
  currentTime = (currentTime - (currentTime % 1000)) / 1000;

  const timestamp = currentTime;
  const date = new Date(timestamp * 1000);
  const localTimestamp =
    timestamp + date.getTimezoneOffset() * 60 + timeZoneOffset!;
  const localDate = new Date(localTimestamp * 1000);
  const formattedDate = dayjs(localDate).format("h:mm a, MMM D, YYYY");

  return formattedDate;
};

export const formatDay = (
  locationDateValue: number,
  timeZoneOffSetValue: number
) => {
  const timestamp = locationDateValue;
  const timeZoneOffset = timeZoneOffSetValue;
  const date = new Date(timestamp * 1000);
  const localTimestamp =
    timestamp + date.getTimezoneOffset() * 60 + timeZoneOffset;
  const localDate = new Date(localTimestamp * 1000);
  const formattedDate = dayjs(localDate).format("MMM D");

  return formattedDate;
};

export const formatTime = (
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
