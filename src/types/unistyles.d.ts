import {AppTheme} from '$src/styles/theme';
import {ViewStyle} from 'react-native';

declare module 'react-native-unistyles' {
  export interface UnistylesTheme extends AppTheme {}
}

interface Styles {
  safeArea?: ViewStyle;
  indicatorContainer?: ViewStyle;
  container?: ViewStyle;
  textStyle?: TextStyle;
  scrollContainer?: ViewStyle;
  indicatorContainer?: ViewStyle;
  error?: TextStyle;
  content?: TextStyle;
  buttonContainer?: TextStyle;
  jokeContainer?: TextStyle;
  jokeText?: TextStyle;
  ActivityIndicator: TextStyle;
}
