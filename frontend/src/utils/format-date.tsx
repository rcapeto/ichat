import dayjs from "dayjs";

export function formatDate(date: string | Date, formatter = "DD MMMM YYYY") {
  if (!date) {
    return "";
  }

  return dayjs(date).format(formatter);
}
