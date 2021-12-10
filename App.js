/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Landing from './components/landing';
import SignIn from './components/sign_in';
import Dashboard from './components/dashboard';
import PointsTransaction from './components/points_transactions';
import Profile from './components/profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// TABS icons
function LogoTitle() {
  return (
    <>
      <Image
        style={{width: 30, height: 30}}
        source={uri(
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F449%2F897%2Foriginal%2Fhome-vector-icon.jpg&f=1&nofb=1',
        )}
      />
      <Text>Home Screen</Text>
    </>
  );
}

// Initial Routes

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          animationEnabled: true,
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
        <Stack.Screen
          name="dashboard"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="landing"
          component={Landing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="points"
          component={PointsTransaction}
          options={{
            title: 'Points Transactions',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
