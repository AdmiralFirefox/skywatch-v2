import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getTimePassed = (uploadDate: string) => {
  const now = dayjs();
  const uploadTime = dayjs(uploadDate);
  return uploadTime.from(now);
};
