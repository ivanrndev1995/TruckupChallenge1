import moment, {Moment} from 'moment/moment';
import {styles} from '../Calendar.tsx';

interface GetDayComponentInfoI {
  today: Moment;
  dateString: string;
  isDayWithData: boolean;
}
export const getDayComponentInfo = ({
  today,
  dateString,
  isDayWithData,
}: GetDayComponentInfoI) => {
  const isAfter = moment(today).isBefore(dateString);
  const isToday = moment(today).format('YYYY-MM-DD') === dateString;
  const dayStyle = isDayWithData
    ? styles.calendarSelectedDayComponentText
    : !isAfter && !isToday
    ? styles.calendarPrevDayComponentText
    : styles.calendarDayComponentText;
  const dayWrapperStyle = isDayWithData
    ? styles.calendarSelectedDayComponentWrapper
    : isToday
    ? styles.calendarCurrentDayComponentWrapper
    : styles.calendarDayComponentWrapper;
  return {dayStyle, dayWrapperStyle};
};
