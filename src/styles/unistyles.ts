import {UnistylesRegistry} from 'react-native-unistyles';
import {lightTheme, darkTheme} from '$src/styles/theme';

UnistylesRegistry.addThemes({
  light: lightTheme,
  dark: darkTheme,
}).addConfig({
  adaptiveThemes: true,
});
