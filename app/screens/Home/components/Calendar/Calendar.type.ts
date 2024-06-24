import {SharedValue} from 'react-native-reanimated';
import {StateI} from '../../Home.tsx';

export interface DateI {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}
export interface DayComponentDateI {
  date: DateI;
}
export interface CalendarI {
  amountOfWeek: SharedValue<number>;
  setDay: (value: string) => void;
  mainState: Array<StateI>;
}
