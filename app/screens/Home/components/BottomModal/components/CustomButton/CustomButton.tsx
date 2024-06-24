import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {colors, MainColorName} from '../../../../../../constants/color.ts';
import {
  calcFontSize,
  calcHeight,
  calcWidth,
} from '../../../../../../utils/scaling-system';

interface CustomButtonI {
  value: string;
  onPress: () => void;
  disable: boolean;
  isLoading: boolean;
}
export const CustomButton = ({
  value,
  onPress,
  disable,
  isLoading,
}: CustomButtonI) => {
  const wrapperStyle = disable ? styles.wrapperDisable : styles.wrapperActive;
  const textStyle = disable ? styles.textDisable : styles.textActive;
  return (
    <TouchableOpacity
      style={[styles.wrapper, wrapperStyle]}
      onPressIn={onPress}
      disabled={disable}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors[MainColorName.GREY]} />
      ) : (
        <Text style={[styles.text, textStyle]}>{value}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: calcHeight(56),
    width: calcWidth(335),

    alignSelf: 'center',
    borderRadius: calcWidth(16),
    justifyContent: 'center',
    marginVertical: calcHeight(20),
  },

  text: {
    fontSize: calcFontSize(16),
    fontFamily: 'Lazzer-SemiBold',
    textAlign: 'center',
  },
  textActive: {
    color: colors[MainColorName.BLACK],
  },
  textDisable: {
    color: colors[MainColorName.WHITE],
  },
  wrapperActive: {
    backgroundColor: colors[MainColorName.GREEN],
  },
  wrapperDisable: {
    backgroundColor: colors[MainColorName.DARK_GREY],
    opacity: 0.48,
  },
});
