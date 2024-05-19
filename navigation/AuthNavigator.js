import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import UserDetails from '../screens/UserDetails';
import AllGames from '../screens/AllGames';

const Stack = createStackNavigator();

export default function AuthNavigator () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="Games" component={AllGames} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


