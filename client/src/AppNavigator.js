import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './screens/Splash';
import Home from './screens/Home';
import AddCareTaker from './screens/AddCareTaker';
import Success from './screens/Success';
import Pending from './screens/Pending';
import Completed from './screens/Completed';
import Schedule from './screens/Schedule';
import Register from './screens/Register';
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Splash}
          name="Splash"
          options={{headerShown: false}}
        />
        <Stack.Screen
        component={Register}
        name="Register"
        options={{headerShown: false}}
        />
        <Stack.Screen
          component={Home}
          name="Home"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={AddCareTaker}
          name="BookAppointment"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Success}
          name="Success"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Pending}
          name="Pending"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Completed}
          name="Completed"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Schedule}
          name="CallAmb"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
