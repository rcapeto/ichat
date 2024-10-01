import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.locale(ptBR);

export function getDiffByDate(date: string) {
  const now = dayjs();
  const diff = dayjs.duration(now.diff(date));

  return diff;
}

export function formatDateDifference(date: string): string {
  const diff = getDiffByDate(date);

  if (diff.asMinutes() < 60) {
    return dayjs(date).fromNow(true);
  }

  if (diff.asHours() < 24) {
    return dayjs(date).fromNow(true);
  }

  if (diff.asDays() < 7) {
    return dayjs(date).fromNow(true);
  }

  if (diff.asMonths() < 12) {
    return dayjs(date).fromNow(true);
  }

  return dayjs(date).fromNow(true);
}

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("pt-br", {
  relativeTime: {
    future: "em %s",
    past: "%s atrás",
    s: "há poucos segundos",
    ss: "%d segundos",
    m: "1 min",
    mm: "%d min",
    h: "1 h",
    hh: "%d h",
    d: "1 d",
    dd: "%d d",
    w: "1 w",
    ww: "%d s",
    M: "1 m",
    MM: "%d m",
    y: "1 y",
    yy: "%d a",
  },
});
