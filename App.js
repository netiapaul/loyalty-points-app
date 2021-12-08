/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import Landing from './components/landing';
import SignIn from './components/sign_in';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          shadowColor: '#52006A',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#000',
          },
        }}>
        <Stack.Screen name="landing" component={Landing} />
        <Stack.Screen name="signin" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
