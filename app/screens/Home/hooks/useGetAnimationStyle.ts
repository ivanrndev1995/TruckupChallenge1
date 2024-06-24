import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
interface UseGetAnimationStyleI {
  amountOfWeek: SharedValue<number>;
}
export const useGetAnimationStyle = ({amountOfWeek}: UseGetAnimationStyleI) => {
  const timeZoneAnimatedStyle = useAnimatedStyle(() => {
    const animatedMargin = interpolate(
      amountOfWeek.value,
      [4, 5, 6],
      [-100, -50, 0],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return {marginTop: withTiming(animatedMargin, {duration: 500})};
  });
  return {timeZoneAnimatedStyle};
};
