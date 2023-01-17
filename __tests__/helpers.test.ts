import {formatDate, formatNumber, request} from '../src/helpers';

describe('helpers', () => {
  test('request', async () => {
    const response = await request(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    expect(response).toEqual({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    });
  });

  test('formatDate', () => {
    const date = new Date(2020, 0, 1, 0, 0, 0, 0);
    expect(formatDate(date)).toEqual('1/1/2020, 00:00:00');
    expect(formatDate(date, {year: 'numeric'})).toEqual('2020');
    expect(formatDate(date, {month: 'long'})).toEqual('enero');
    expect(formatDate(date, {day: 'numeric'})).toEqual('1');
  });

  test('formatNumber', () => {
    expect(formatNumber(1000)).toEqual('1,000');
    expect(
      formatNumber(100, {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    ).toEqual('100.00');
  });
});
