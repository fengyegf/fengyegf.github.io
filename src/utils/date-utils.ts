export function formatDateToYYYYMMDD(date: Date): string {
  return date.toISOString().substring(0, 10);
}

const DAY_MS = 1000 * 60 * 60 * 24;

const toLocalDayStart = (date: Date): number =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

export function getDiffCalendarDaysFromNow(
  date: Date | string | number,
): number {
  const targetDate = new Date(date);
  if (Number.isNaN(targetDate.getTime())) {
    return 0;
  }
  const now = new Date();
  const nowStart = toLocalDayStart(now);
  const targetStart = toLocalDayStart(targetDate);
  return Math.max(0, Math.floor((nowStart - targetStart) / DAY_MS));
}
