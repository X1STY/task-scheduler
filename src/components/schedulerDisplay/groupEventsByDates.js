export const groupEventsByDates = (date) =>
  date.reduce((groupedByDateEvent, currValue) => {
    const date = currValue.date;
    if (!groupedByDateEvent[date]) {
      groupedByDateEvent[date] = [];
    }
    groupedByDateEvent[date].push({ time: currValue.time, desc: currValue.description });

    return groupedByDateEvent;
  }, {});
