import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
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
  FormControl,
  Spacer,
  IconButton,
  CloseIcon,
  Button,
  Input,
  Link,
  Spinner,
  KeyboardAvoidingView,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SignIn = ({navigation}) => {
  const [pinNo, setPin] = useState('');
  const [idNo, setIdno] = useState('');
  const [number, setData] = useState('');
  const [show, setShow] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const handleClick = () => setShow(!show);

  const handleID = text => {
    return setIdno(text);
  };

  async function handleFetch() {
    try {
      const response = await fetch(
        `http://102.37.102.247:5016/CustomerPoints/ForgotPassword?idNumber=${idNo}`,
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.warn('Success response', data);
        setIsLoading(false);
        setIdno('');
        setData(data.phoneNumber);

        Alert.alert(
          'PIN Changed',
          `New PIN sent to your phone number +${data.phoneNumber}`,
          [{text: 'OK', onPress: () => navigation.navigate('signIn')}],
        );
        // Snackbar.show({
        //   backgroundColor: '#0f5132',
        //   text: `New PIN sent to your phone number +${data.phoneNumber}`,
        //   duration: Snackbar.LENGTH_INDEFINITE,
        //   action: {
        //     text: 'close',
        //     textColor: 'white',
        //     onPress: () => {
        //       Snackbar.dismiss();
        //     },
        //   },
        // });

        // return navigation.navigate('signIn');
      } else {
        console.error('ERROR response', response);
        setIsLoading(false);
        return Snackbar.show({
          backgroundColor: '#e11d48',
          text: 'ID number does not exist',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } catch (error) {
      console.warn(error);
      setIsLoading(false);
      return Snackbar.show({
        backgroundColor: '#e11d48',
        text: 'please connect to available network',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  return (
    <NativeBaseProvider>
      {/* <VStack flex={1} bg="#fff"> */}
      {/* TOP Area */}
      <Box flex={1} justifyContent={'center'} bg="#fff">
        <Center>
          <Image
            source={require('../assets/images/pcico.png')}
            alt="Company Logo"
            size="md"
          />
          <Heading size={'xl'} mt={3} textAlign="center" color="#5d3915">
            phAMACore Loyalty
          </Heading>
        </Center>
      </Box>
      <Box bg="#fff" flex={2} style={styles.inputContainer}>
        <Center>
          <Heading
            justifyContent={'center'}
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            fontWeight="semibold">
            Reset Pin
          </Heading>

          <Text
            mx="10"
            fontSize="sm"
            // my="3"
            style={styles.promoCode}
            fontWeight="400">
            Please enter your National ID number to reset your pin
          </Text>
        </Center>

        {/* {number ? (
          <Alert w="100%" status={'success'} mx={'auto'}>
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="sm" color="coolGray.800">
                    New PIN sent to your phone number +{number}
                  </Text>
                </HStack>
              
              </HStack>
            </VStack>
          </Alert>
        ) : null} */}

        <FormControl flex={1}>
          {/* <FormControl.Label>Password</FormControl.Label> */}
          <Input
            type="text"
            mx="auto"
            mt={5}
            onChangeText={handleID}
            value={idNo}
            placeholder="Enter ID Number"
            w={{
              base: '75%',
              md: '25%',
            }}
          />

          {!idNo ? (
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
              isDisabled>
              Submit
            </Button>
          ) : (
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
                Keyboard.dismiss();
                setTimeout(() => {
                  setIsLoading(true);
                  handleFetch();
                }, 1000);
              }}>
              {isloading ? (
                <Spinner size="sm" color="warning.500" />
              ) : (
                'Sign in'
              )}
            </Button>
          )}
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              Already have an account.{' '}
            </Text>
            <Link
              onPress={() => navigation.navigate('signIn')}
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}>
              Sign In
            </Link>
          </HStack>
        </FormControl>
      </Box>
      <VStack bg={'#fff'} justifyContent="flex-end">
        <Center>
          <Text style={styles.myText} mx="10">
            Powered by
          </Text>
          <Image
            style={styles.image}
            source={require('../assets/images/corebase.png')}
            alt="Company Logo"
            size="2xs"
          />
          <Text style={styles.myText} fontWeight="bold" color="#5d3915" mx="10">
            Corebase Solutions
          </Text>
        </Center>
      </VStack>
      {/* </VStack> */}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  myText: {
    fontSize: hp('1%'), // End result looks like the provided UI mockup
  },
  image: {
    maxWidth: 15,
    maxHeight: 15,
  },
  footer: {
    marginTop: '1rem',
  },
  inputContainer: {
    borderWidth: 0.5,
    borderTopColor: '#000',
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
    borderBottomColor: '#fff',
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
