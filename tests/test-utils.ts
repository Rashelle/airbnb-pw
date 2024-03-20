export function getDateTestId(date) {
    const formattedDate = date.format('dd/mm/yyyy');

    return `calendar-day-${formattedDate}`;
}