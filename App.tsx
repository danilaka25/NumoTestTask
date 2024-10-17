/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {store} from '$src/store/store';
import HistoryScreen from '$src/screens/HistoryScreen';
import TodayScreen from '$src/screens/TodayScreen';
import {loadFavoriteJokes} from '$src/store/jokesSlice';
import {useAppDispatch} from '$src/hooks/useAppDispatch';
import TodayActive from '$assets/icons/TodayActive.svg';
import TodayInactive from '$assets/icons/TodayInActive.svg';
import HistoryActive from '$assets/icons/HistoryActive.svg';
import HistoryInactive from '$assets/icons/HistoryInActive.svg';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {AppTheme} from '$src/styles/theme';
import '$src/styles/unistyles';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import CustomHeader from '$src/components/CustomHeader';

const Tab = createBottomTabNavigator();

const AppContent = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const {theme}: {theme: AppTheme} = useStyles(stylesheet);

  useEffect(() => {
    dispatch(loadFavoriteJokes());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          header: ({route}) => (
            <CustomHeader
              title={route.name}
              insetsTop={insets.top}
              bgColor={theme.colors.white}
            />
          ),
          tabBarIcon: ({focused}) => {
            let Icon;
            if (route.name === 'Today') {
              Icon = focused ? TodayActive : TodayInactive;
            } else if (route.name === 'History') {
              Icon = focused ? HistoryActive : HistoryInactive;
            }
            return Icon ? <Icon width={28} height={28} /> : null;
          },
          tabBarActiveTintColor: theme.colors.main,
          tabBarInactiveTintColor: theme.colors.grey,
          tabBarIconStyle: {
            marginTop: 10,
          },
          tabBarLabelStyle: {
            flex: 1,
            fontSize: 12,
            marginTop: 10,
          },
          tabBarStyle: {
            height: 68 + insets.bottom,
            borderTopWidth: 1,
            borderTopColor: theme.colors.lightGray,
            flexDirection: 'row',
            paddingHorizontal: '33%',
            paddingBottom: insets.bottom,
          },
        })}>
        <Tab.Screen name="Today" component={TodayScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </SafeAreaProvider>
  );
};

const stylesheet = createStyleSheet((theme: AppTheme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
}));

export default App;
