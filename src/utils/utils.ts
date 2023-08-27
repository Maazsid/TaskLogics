import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import localeData from 'dayjs/plugin/localeData';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(updateLocale);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

dayjs.updateLocale('en', {
  weekStart: 1,
});

export const getFormattedTime = (time: number): string => {
  const hours = Math.floor(time / 3600)
    ?.toString()
    ?.padStart(2, '0');

  const minutes = Math.floor((time % 3600) / 60)
    ?.toString()
    ?.padStart(2, '0');

  const seconds = Math.floor(time % 60)
    ?.toString()
    ?.padStart(2, '0');

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
};

export const getHoursAndMinutesFromDate = (
  date: string
): { hh: string; mm: string; hhNumber: number; mmNumber: number } => {
  const hoursAndMinutes = date
    ?.split('')
    ?.filter((n) => typeof parseInt(n, 10) === 'number' && !isNaN(parseInt(n, 10)))
    ?.join('')
    ?.padStart(4, '0');

  const hh = hoursAndMinutes?.slice(0, 2);
  const hhNumber = parseInt(hh);
  const mm = hoursAndMinutes?.slice(2, 4);
  const mmNumber = parseInt(mm);

  return { hh, mm, hhNumber, mmNumber };
};
