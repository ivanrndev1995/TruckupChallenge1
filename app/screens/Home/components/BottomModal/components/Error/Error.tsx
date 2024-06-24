import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {colors, MainColorName} from '../../../../../../constants/color.ts';
import {
  calcFontSize,
  calcHeight,
  calcWidth,
} from '../../../../../../utils/scaling-system';

export const Error = () => {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require('../../../../../../assets/image/error.png')}
        style={styles.imageStyle}
      />
      <Text style={styles.text}>
        Select an end time that’s later than your start time
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: calcHeight(56),
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: calcWidth(20),
  },
  text: {
    fontFamily: 'FiraCode-Regular',
    fontSize: calcFontSize(14),
    color: colors[MainColorName.RED],
  },
  imageStyle: {
    width: calcWidth(14),
    height: calcHeight(14),
    marginRight: calcWidth(10),
  },
});
