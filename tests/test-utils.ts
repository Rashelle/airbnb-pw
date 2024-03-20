import { Moment } from 'moment';

export function getDateTestId(date: Moment) {
    const formattedDate = date.format('MM/DD/YYYY');

    return `calendar-day-${formattedDate}`;
}

export function getPickerDisplayDateFormat(date: Moment) {
    const formattedDate = date.format('MMM DD');

    return formattedDate;
}

export function getConfirmationDateFormat(date: Moment) {
    const formattedDate = date.format('M/DD/YYYY');

    return formattedDate;
}