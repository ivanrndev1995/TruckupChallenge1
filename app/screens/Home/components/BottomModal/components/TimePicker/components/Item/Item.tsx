import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  calcFontSize,
  calcWidth,
} from '../../../../../../../../utils/scaling-system';

interface ItemI {
  color: string;
  showText: boolean;
  index: number;
  data: {hour: string; mehrid: string};
  onPress: () => void;
}
export const ITEM_WIDTH = calcWidth(94);
export const Item = ({color, showText, data, onPress}: ItemI) => {
  return (
    <TouchableOpacity style={[styles.wrapper]} onPressIn={onPress}>
      <Text style={[styles.textHour, {color}, !showText && styles.displayNone]}>
        {data.hour}
      </Text>
      <Text
        style={[styles.textMehrid, {color}, !showText && styles.displayNone]}>
        {data.mehrid}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,

    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textHour: {
    fontSize: calcFontSize(32),
    fontFamily: 'Lazzer-Heavy',
    textAlign: 'center',
  },
  textMehrid: {
    fontSize: calcFontSize(16),
    fontFamily: 'Lazzer-Bold',
    textAlign: 'center',
  },
  displayNone: {
    display: 'none',
  },
});
