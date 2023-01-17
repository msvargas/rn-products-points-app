import {DEFAULT_LOCALE} from '../constants';

export const request = async (url: string, options?: RequestInit) =>
  fetch(url, options)
    .then(response => ({
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: response.json(),
      headers: response.headers,
    }))
    .then(res => (res.ok ? res.data : Promise.reject(res)));

export const formatDate = (
  date: string | Date | number | undefined,
  options?: Intl.DateTimeFormatOptions,
) =>
  date ? new Date(date).toLocaleString(DEFAULT_LOCALE, options) : undefined;

export const formatNumber = (
  value: number | string | undefined,
  options?: Intl.NumberFormatOptions,
) => Number(value).toLocaleString(DEFAULT_LOCALE, options);
