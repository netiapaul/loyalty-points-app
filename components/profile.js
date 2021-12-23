import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, TextInput, Alert} from 'react-native';
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
  FormControl,
  Input,
} from 'native-base';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const SignIn = ({route, navigation}) => {
  const {token, memberNo} = route.params;
  const [user, setUser] = useState({});
  // const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [idNo, setIdno] = useState('');

  const handleID = text => {
    return setIdno(text);
  };

  useEffect(() => {
    handleFetch();
    console.warn('profile', user);
  }, []);

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
      .catch(() => console.warn('please connect to available network'));
  };

  const clearAll = async () => {
    try {
      await Keychain.resetGenericPassword();
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Something went wrong on fetching', e);
    }
    navigation.navigate('landing');
    console.warn('Done.');
  };

  return (
    <NativeBaseProvider>
      <VStack flex={1} bg="light.50">
        {/* TOP Area */}
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.image}>
          <Center>
            <Avatar bg="blueGray.600" size="md">
              {name ? name.match(/\b([A-Z])/g).join('') : null}
            </Avatar>
            <Heading textAlign="center" color="#000">
              {user.membername}
            </Heading>
          </Center>
        </ImageBackground>
        {/* FORM Area */}
        <Box bg="#fff" flex={3} style={styles.inputContainer}>
          <Center mt={2}>
            <Text fontSize="24" style={{textAlign: 'center'}} fontWeight="bold">
              Profile
            </Text>
            <Text
              mx="10"
              fontSize="14"
              style={styles.promoCode}
              fontWeight="400">
              Edit your personal information below.
            </Text>
          </Center>

          <FormControl isRequired>
            <Input
              type="text"
              mx="auto"
              mt={5}
              onChangeText={handleID}
              value={idNo}
              placeholder="Enter National ID"
              w={{
                base: '75%',
                md: '25%',
              }}
            />
            <Input
              type="text"
              mx="auto"
              mt={5}
              onChangeText={handleID}
              value={idNo}
              placeholder="Enter National ID"
              w={{
                base: '75%',
                md: '25%',
              }}
            />
            <Input
              type="text"
              mx="auto"
              mt={5}
              onChangeText={handleID}
              value={idNo}
              placeholder="Enter National ID"
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
              rounded="5">
              Sign In
            </Button>

            <Button
              mx="auto"
              mt={5}
              variant={'outline'}
              w={{
                base: '75%',
                md: '25%',
              }}
              p={4}
              // bg={'#5d3915'}
              colorScheme="danger.600"
              rounded="5"
              onPress={clearAll}>
              Log Out
            </Button>
          </FormControl>

          <VStack flex={1} justifyContent="flex-end" my="2">
            <Center>
              <Text fontSize="xs" mx="10">
                Powered by
              </Text>
              <Text fontSize="xs" fontWeight="bold" color="#5d3915" mx="10">
                Corebase Solutions
              </Text>
            </Center>
          </VStack>
        </Box>
      </VStack>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
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
