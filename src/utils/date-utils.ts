const DAY_MS = 1000 * 60 * 60 * 24;

export function formatDateToYYYYMMDD(date: Date): string {
  return date.toISOString().substring(0, 10);
}

export function getDiffDaysFromNow(date: Date | string | number): number {
  const targetDate = new Date(date);
  if (Number.isNaN(targetDate.getTime())) {
    return 0;
  }
  const diff = Math.max(0, Date.now() - targetDate.getTime());
  return Math.floor(diff / DAY_MS);
}
