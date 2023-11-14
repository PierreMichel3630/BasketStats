export const sortByName = (a: any, b: any) =>
  `${a.lastname.toUpperCase()} ${a.firstname}`.localeCompare(
    `${b.lastname.toUpperCase()} ${b.firstname}`
  );
