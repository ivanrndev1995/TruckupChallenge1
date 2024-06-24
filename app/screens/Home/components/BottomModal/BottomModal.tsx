import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, MainColorName} from '../../../../constants/color.ts';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import moment from 'moment';
import {
  calcFontSize,
  calcHeight,
  calcWidth,
} from '../../../../utils/scaling-system';
import {CustomButton} from './components/CustomButton/CustomButton.tsx';
import {TimePicker} from './components/TimePicker/TimePicker.tsx';
import {Error} from './components/Error/Error.tsx';
import {StateI} from '../../Home.tsx';

interface BottomModalI {
  day: string | null;
  setDay: (value: string | null) => void;
  setMainState: (value: Array<StateI>) => void;
  mainState: Array<StateI>;
}
export const BottomModal = ({
  day,
  setDay,
  setMainState,
  mainState,
}: BottomModalI) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [indexStart, setIndexStart] = useState(24);
  const [indexEnd, setIndexEnd] = useState(80);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const snapPoints = useMemo(() => ['62%', '62%'], []);
  const filteredValue = mainState.filter(item => item.date === day);
  useEffect(() => {
    if (day) {
      if (filteredValue.length !== 0) {
        setIndexStart(filteredValue[0].startIndex);
        setIndexEnd(filteredValue[0].endIndex);
      }
      bottomSheetModalRef.current?.present();
    }
  }, [day]);
  useEffect(() => {
    if (indexEnd <= indexStart) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [indexEnd, indexStart]);
  const displayedDay = `Set availability on ${moment(day).format(
    'MMM DD,yyyy',
  )}`;
  const onClose = () => {
    bottomSheetModalRef.current?.close();
  };

  const onPress = () => {
    setIsLoading(true);
    if (filteredValue.length === 0) {
      setMainState([
        ...mainState,
        {date: day, startIndex: indexStart, endIndex: indexEnd},
      ]);
    } else {
      setMainState([
        ...mainState.filter(item => item.date !== day),
        {date: day, startIndex: indexStart, endIndex: indexEnd},
      ]);
    }
    setTimeout(() => {
      setIsLoading(false);
      bottomSheetModalRef.current?.close();
    }, 150);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          onDismiss={() => {
            setDay(null);
            setIndexStart(24);
            setIndexEnd(80);
          }}
          backgroundStyle={styles.backgroundStyle}
          snapPoints={snapPoints}>
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.topWrapper}>
              <Text style={styles.topText}>{displayedDay}</Text>
              <TouchableOpacity onPress={onClose}>
                <Image
                  source={require('../../../../assets/image/close.png')}
                  style={styles.close}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.middleContent}>
              <View style={styles.middleContentWrap}>
                <View style={styles.workWrapper}>
                  <Text style={styles.middleText}>Start work at</Text>
                  <TimePicker setIndex={setIndexStart} index={indexStart} />
                </View>
                <View style={styles.workWrapper}>
                  <Text style={styles.middleText}>End work by</Text>
                  <TimePicker setIndex={setIndexEnd} index={indexEnd} />
                </View>
              </View>
              {isError && <Error />}
            </View>
            <CustomButton
              onPress={onPress}
              value={'Set time'}
              disable={isError}
              isLoading={isLoading}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors[MainColorName.BLACK_GRAY],
    flex: 1,
  },
  backgroundStyle: {
    backgroundColor: colors[MainColorName.BLACK_GRAY],
  },
  topWrapper: {
    height: calcHeight(40),
    paddingHorizontal: calcWidth(25),
    paddingBottom: calcWidth(10),
    marginVertical: calcWidth(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topText: {
    fontSize: calcFontSize(16),
    color: colors[MainColorName.WHITE],
    fontFamily: 'Lazzer-Bold',
  },
  close: {
    width: calcWidth(15),
    height: calcHeight(15),
  },
  middleContent: {
    height: calcHeight(300),
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: colors[MainColorName.WHITE],
  },
  middleContentWrap: {
    height: calcHeight(250),
  },
  workWrapper: {
    flex: 1,
  },
  middleText: {
    fontSize: calcFontSize(14),
    color: colors[MainColorName.WHITE],
    fontFamily: 'Lazzer-SemiBold',
    paddingHorizontal: calcWidth(25),
    paddingTop: calcHeight(15),
  },
});
