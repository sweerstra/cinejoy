import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import WelcomeScreen from '../screens/WelcomeScreen';

const WelcomeStack = createStackNavigator({
  Welcome: WelcomeScreen,
});

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Welcome: WelcomeStack,
  Main: MainTabNavigator,
}));
