import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, TextInput, Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {
  NativeBaseProvider,
  VStack,
  Center,
  Heading,
  Image,
  Box,
  Text,
  HStack,
  Pressable,
  Spacer,
  Avatar,
  Button,
  Spinner,
  FormControl,
  Input,
} from 'native-base';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const SignIn = ({route, navigation}) => {
  const {token, memberNo} = route.params;
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [current, setCurrent] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const handlePin = text => {
    return setPin(text);
  };

  const currentPin = text => {
    return setCurrent(text);
  };
  useEffect(() => {
    handleFetch();
    // console.warn('profile', user);
  }, []);

  const handleUpdate = async () => {
    try {
      const reponse = await fetch(
        `http://102.37.102.247:5016/CustomerPoints/UpdatePassword/${memberNo}`,
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPin: current,
            newPin: pin,
          }),
        },
      );
      if (reponse.ok) {
        const data = await reponse.json();
        setCurrent('');
        setPin('');
        setIsLoading(false);
        return navigation.navigate('signIn');
      } else {
        setIsLoading(false);
        return Snackbar.show({
          backgroundColor: '#e11d48',
          text: 'Please confirm details entered',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } catch (error) {
      setIsLoading(false);
      return Snackbar.show({
        backgroundColor: '#e11d48',
        text: 'please connect to available network',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const handleFetch = () => {
    const request = `http://102.37.102.247:5016/Customers/members?memberNum=${memberNo}`;

    fetch(request, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(response => {
        setUser(response[0]), setName(response[0].membername);
      })
      .catch(() =>
        Snackbar.show({
          backgroundColor: '#e11d48',
          text: 'please connect to available network',
          duration: Snackbar.LENGTH_LONG,
        }),
      );
  };

  const clearAll = async () => {
    try {
      await Keychain.resetGenericPassword();
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Something went wrong on fetching', e);
    }
    return navigation.navigate('signIn');
  };

  return (
    <NativeBaseProvider>
      <VStack flex={1} bg="#fff">
        {/* TOP Area */}
        <Box flex={1} bg="#fff" justifyContent={'center'}>
          <Center>
            <Avatar bg="blueGray.600" size="md">
              {name ? name.match(/\b([A-Z])/g).join('') : null}
            </Avatar>
            <Heading textAlign="center" color="#000">
              {user.membername}
            </Heading>
          </Center>
        </Box>

        {/* FORM Area */}
        <Box bg="#fff" flex={3} style={styles.inputContainer}>
          <Center mt={2}>
            <Text fontSize="24" style={{textAlign: 'center'}} fontWeight="bold">
              Update PIN
            </Text>
            <Text
              mx="10"
              fontSize="14"
              style={styles.promoCode}
              fontWeight="400">
              Fill in the form to update your pin.
            </Text>
          </Center>

          <FormControl isRequired>
            {/* <Input
              type="text"
              mx="auto"
              mt={5}
              onChangeText={handleID}
              value={idNo}
              placeholder="Enter Fullnames"
              w={{
                base: '75%',
                md: '25%',
              }}
            /> */}
            {/* <Input
              type="text"
              mx="auto"
              mt={5}
              onChangeText={handleID}
              value={idNo}
              placeholder="Enter Email"
              w={{
                base: '75%',
                md: '25%',
              }}
            /> */}
            <Input
              type="number"
              mx="auto"
              keyboardType="numeric"
              mt={5}
              onChangeText={currentPin}
              value={current}
              placeholder="Current Pin"
              w={{
                base: '75%',
                md: '25%',
              }}
            />
            <Input
              type="number"
              mx="auto"
              keyboardType="numeric"
              mt={5}
              onChangeText={handlePin}
              value={pin}
              placeholder="Enter New Pin"
              w={{
                base: '75%',
                md: '25%',
              }}
            />
            <Button
              mx="auto"
              mt={5}
              w={{
                base: '75%',
                md: '25%',
              }}
              p={4}
              bg={'#5d3915'}
              rounded="5"
              onPress={() => {
                setTimeout(() => {
                  setIsLoading(true);
                  handleUpdate();
                }, 1000);
              }}>
              {isloading ? <Spinner size="sm" color="warning.500" /> : 'Update'}
            </Button>

            <Button
              mx="auto"
              mt={5}
              // variant={'outline'}
              w={{
                base: '75%',
                md: '25%',
              }}
              borderWidth="1"
              borderColor="#5d3915"
              p={4}
              bg={'#fff'}
              colorScheme="danger.800"
              rounded="5"
              onPress={clearAll}>
              Log Out
            </Button>
          </FormControl>
        </Box>
        <VStack justifyContent="flex-end">
          <Center>
            <Text fontSize="xs" mx="10">
              Powered by
            </Text>
            <Image
              style={styles.image}
              source={require('../assets/images/corebase.png')}
              alt="Company Logo"
              size="xs"
            />
            <Text fontSize="10" fontWeight="bold" color="#5d3915" mx="10">
              Corebase Solutions
            </Text>
          </Center>
        </VStack>
      </VStack>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  image: {
    maxWidth: 15,
    maxHeight: 15,
  },
  inputContainer: {
    borderWidth: 0.5,
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
    borderBottomColor: 'white',
  },
  promoCode: {
    textAlign: 'center',
  },
  stackText: {
    fontWeight: 'bold',
    color: 'black',
  },
  next: {
    width: 30,
    height: 20,
  },
  input: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 10,
    height: 60,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#5d3915',
    borderColor: '#737373',
  },
});

export default SignIn;
