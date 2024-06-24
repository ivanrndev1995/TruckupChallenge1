import React, {useEffect, useRef} from 'react';
import { StyleSheet, Vibration, View } from "react-native";

import {colors, MainColorName} from '../../../../../../constants/color.ts';

import {MOCK_TIME} from './mock';
import {Item, ITEM_WIDTH} from './components/Item/Item.tsx';
import {FlatList} from 'react-native-gesture-handler';
interface TimePickerI {
  index: number;
  setIndex: (v: number) => void;
}

export const TimePicker = ({index, setIndex}: TimePickerI) => {
  const myRef = useRef<FlatList>(null);
  useEffect(() => {
    myRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  }, [index]);

  return (
    <View style={styles.wrapper}>
      <FlatList
        horizontal={true}
        keyExtractor={() => Math.random().toString()}
        bounces={false}
        initialNumToRender={96}
        decelerationRate={0}
        onScroll={() => Vibration.vibrate(100)}
        ref={myRef}
        snapToInterval={ITEM_WIDTH}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            myRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
              viewPosition: 0.5,
            });
          });
        }}
        data={MOCK_TIME}
        renderItem={({index: indexI, item}) => {
          return (
            <Item
              color={
                indexI === index
                  ? colors[MainColorName.GREEN]
                  : colors[MainColorName.GREY]
              }
              showText={true}
              index={0}
              data={item}
              onPress={() => setIndex(indexI)}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
