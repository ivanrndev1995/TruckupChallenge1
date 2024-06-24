
import {getTimeZone} from 'react-native-localize';
import moment from 'moment-timezone';
import {useMemo} from 'react';

const timeZoneNames: {[key: string]: string} = {
  EST: 'Eastern Standard Time',
  EDT: 'Eastern Daylight Time',
  CST: 'Central Standard Time',
  CDT: 'Central Daylight Time',
  MST: 'Mountain Standard Time',
  MDT: 'Mountain Daylight Time',
  PST: 'Pacific Standard Time',
  PDT: 'Pacific Daylight Time',
  CET: 'Central European Time',
};
export const useGetTimeZone = () => {
  const currentTimeZone = useMemo(() => {
    const timeZone = getTimeZone();
    moment.fn.zoneName = function () {
      let abbr: string = this.zoneAbbr();
      return timeZoneNames[abbr] || abbr;
    };
    return moment.tz([2012, 0], timeZone).format('zz');
  }, []);

  return {currentTimeZone};
};
