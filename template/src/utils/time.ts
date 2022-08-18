import dayjs from 'dayjs';

export const formDate = (d: number): string => {
  return dayjs(d).format('YYYY-MM-DD HH:mm:ss');
};
