const dayNames = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
];

export const formatDateToStandart = (date) => {
  const splittedDate = date.split('.');
  const formattedDate = new Date(
    Number(splittedDate[2]),
    Number(splittedDate[1]) - 1,
    Number(splittedDate[0])
  );
  return formattedDate;
};

export const dayOfWeek = (date) => dayNames[formatDateToStandart(date).getDay()];

export const groupEventsByDates = (date) =>
  date.reduce((groupedByDateEvent, currValue) => {
    const date = newDateToStringFormat(new Date(currValue.date));
    if (!groupedByDateEvent[date]) {
      groupedByDateEvent[date] = [];
    }
    groupedByDateEvent[date].push({
      time: currValue.time,
      description: currValue.description,
      id: currValue.event_id
    });

    return groupedByDateEvent;
  }, {});

export const newDateToStringFormat = (date) =>
  date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
export const newDateToStringFormatWithDefis = (date) =>
  date.toLocaleDateString('fr-CA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
