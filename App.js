/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Landing from './components/landing';
import SignIn from './components/sign_in';
import Dashboard from './components/dashboard';
import Transactions from './components/transactions';
import TransactionDetails from './components/transactionDetails';
import Profile from './components/profile';
import Different from './components/home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Initial Routes

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color={'#c58c4f'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="transactions"
        component={Transactions}
        options={{
          headerShown: false,
          tabBarLabel: 'Transactions',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="bank" color={'#c58c4f'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'profile',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account"
              color={'#c58c4f'}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  // const [value, setValue] = useState('');
  // useEffect(() => {
  //   (async function getToken() {
  //     try {
  //       const value = await AsyncStorage.getItem('userData');
  //       return setValue(JSON.parse(value).token);
  //     } catch (error) {
  //       console.warn('Something went wrong on fetching', error);
  //     }
  //   })();
  //   return () => {
  //     setValue('');
  //   };
  // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            headerShadowVisible: true,
          },
          headerShadowVisible: true,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#5d3915',
          },
        }}>
        <Stack.Screen
          name="signIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="different"
          component={Different}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="dashboard"
          component={Home}
          options={{
            headerShown: false,
          }}
        /> */}

        <Stack.Screen
          name="transactions"
          component={Transactions}
          options={{
            title: 'Transactions',
          }}
        />
        <Stack.Screen
          name="transactiondetails"
          component={TransactionDetails}
          options={{
            title: 'Transaction Details',
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
          name="profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        {/* {value ? (
          <>
            <Stack.Screen
              name="dashboard"
              component={Home}
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
            <Stack.Screen
              name="sales"
              component={TransactionDetails}
              options={{
                title: 'Sales Transactions',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="signIn"
              component={SignIn}
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
          </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
