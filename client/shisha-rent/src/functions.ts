export const getReservedDates = (
  allExcludedDates: Date[],
  selectedShishaAmount: number
) => {
  const datesCounter: any = {};
  allExcludedDates.forEach((date: Date) => {
    const month = date.getUTCMonth() + 1; //months from 1-12
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const newdate: string = year + "/" + month + "/" + day;
    if (datesCounter.hasOwnProperty(newdate)) {
      datesCounter[newdate].count++;
    } else {
      datesCounter[newdate] = {
        count: 1,
        originalDate: date,
      };
    }
  });
  const fullyReservedDates = Object.entries(datesCounter)
    .filter(
      ([name, obj]: any) =>
        obj.count >= (selectedShishaAmount ? selectedShishaAmount : 0)
    )
    .map(([name, obj]: any) => {
      return obj.originalDate;
    });
  return fullyReservedDates;
};
