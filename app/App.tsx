/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {LogBox, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import {Home} from './screens/Home/Home.tsx';
import {colors, MainColorName} from './constants/color.ts';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

function App(): React.JSX.Element {
  LogBox.ignoreAllLogs();
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View style={styles.sectionContainer}>
          <StatusBar barStyle={'light-content'} />
          <Home />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: colors[MainColorName.BLACK],
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
export default App;
