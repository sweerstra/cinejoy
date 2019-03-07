import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/SettingsScreen';
import FilmScreen from '../screens/FilmScreen';
import Colors from '../constants/Colors';
import CinemaScreen from '../screens/CinemaScreen';

const FilmStack = createStackNavigator({
  Film: FilmScreen,
});

FilmStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      name="film"
      color={focused ? Colors.light : Colors.primary}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Cinema: CinemaScreen,
});

SettingsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      name="settings"
      color={focused ? Colors.light : Colors.primary}
    />
  ),
};

export default createBottomTabNavigator(
  {
    Film: FilmStack,
    Settings: SettingsStack,
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: Colors.primaryDark,
      },
    },
  }
);
