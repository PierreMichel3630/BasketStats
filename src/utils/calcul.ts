export const getPourcentageLF = (value: number, total: number) =>
  `${getPourcentageLFNumber(value, total).toFixed(1)}`;

export const getPourcentageLFNumber = (value: number, total: number) =>
  (value / total) * 100;

export const isInt = (n: number) => n % 1 === 0;
