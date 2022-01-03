import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, TextInput} from 'react-native';
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
  Alert,
  Button,
  Input,
  Link,
  KeyboardAvoidingView,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const SignIn = ({navigation}) => {
  const [pinNo, setPin] = useState('');
  const [idNo, setIdno] = useState('');
  const [data, setData] = useState({});
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleID = text => {
    return setIdno(text);
  };

  const handlePin = text => {
    return setPin(text);
  };

  // async function storeToken(data) {
  //   try {
  //     const username = data.user.memberno;
  //     const password = data.token;
  //     await Keychain.setGenericPassword(username, password);
  //     const jsonValue = JSON.stringify(data);
  //     await AsyncStorage.setItem('userData', jsonValue);
  //   } catch (error) {
  //     console.error('Something went wrong on saving', error);
  //   }
  // }

  useEffect(() => {
    setStatus('');
    return () => {
      setStatus('');
    };
  }, []);

  async function handleFetch() {
    try {
      const reponse = await fetch(
        'http://102.37.102.247:5016/CustomerPoints/CustomerLogin',
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idnumber: idNo,
            pin: pinNo,
          }),
        },
      );
      if (reponse.status >= 200 && reponse.status < 400) {
        const data = await reponse.json();
        console.warn('Success response', reponse.status);
        return navigation.navigate('signIn');
      } else if (reponse.status === 400) {
        onsole.warn('Failed response', reponse.status);
      } else {
        // console.warn(reponse.status);
        // setStatus('Incorrect Details entered');
        console.warn('Failed response', reponse.status);
      }
    } catch (error) {
      setStatus('Network request failed connect to the internet');
      // console.error('CATCH Error', error);
    }
  }

  // async function handleFetch() {
  //   try {
  //     const reponse = await fetch(
  //       'http://102.37.102.247:5016/CustomerPoints/CustomerLogin',
  //       {
  //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           idnumber: idNo,
  //           pin: pinNo,
  //         }),
  //       },
  //     );
  //     if (reponse.ok) {
  //       const data = await reponse.json();
  //       console.warn('Success response', data);
  //       return navigation.navigate('different', {
  //         token: data.token,
  //         memberNo: data.user.memberno,
  //       });
  //     } else {
  //       console.warn(reponse.status);
  //       // setStatus('Incorrect Details entered');
  //       // console.warn('Failed response', reponse);
  //     }
  //   } catch (error) {
  //     setStatus('Network request failed connect to the internet');
  //     // console.error('CATCH Error', error);
  //   }
  // }

  // const handleFetch = () => {
  //   fetch('http://102.37.102.247:5016/CustomerPoints/CustomerLogin', {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       idnumber: idNo,
  //       pin: pinNo,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       return navigation.navigate('different', {
  //         token: data.token,
  //         memberNo: data.user.memberno,
  //       });
  //     })
  //     .catch(() => setStatus('Network request failed connect to the internet'));

  //   // try {
  //   //   await fetch('http://102.37.102.247:5016/CustomerPoints/CustomerLogin', {
  //   //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //   //     headers: {
  //   //       Accept: 'application/json',
  //   //       'Content-Type': 'application/json',
  //   //     },
  //   //     body: JSON.stringify({
  //   //       idnumber: idNo,
  //   //       pin: pinNo,
  //   //     }),
  //   //   })
  //   //     .then(async response => {
  //   //       if (!response.ok) {
  //   //         setStatus('Please Confirm the details entered');
  //   //       } else {
  //   //         const data = await response.json();
  //   //         setData(data);
  //   //         console.error(data.token);
  //   //         return navigation.navigate('different', {
  //   //           token: data.token,
  //   //           memberNo: data.user.memberno,
  //   //         });
  //   //       }
  //   //     })
  //   //     .catch(() =>
  //   //       setStatus('Network request failed connect to the internet'),
  //   //     );
  //   // } catch (error) {
  //   //   console.warn(error);
  //   // }
  // };

  return (
    <NativeBaseProvider>
      {status ? (
        <Alert w="100%" status="error">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={1}
              alignItems="center"
              justifyContent="space-between">
              <HStack space={2} flexShrink={1} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: 'coolGray.800',
                  }}>
                  {status}
                </Text>
              </HStack>
              {/* <IconButton
                  variant="unstyled"
                  icon={<CloseIcon size="3" color="coolGray.600" />}
                  onPress={() => setShow(false)}
                /> */}
            </HStack>
          </VStack>
        </Alert>
      ) : null}

      {/* <VStack flex={1} bg="#fff"> */}
      {/* TOP Area */}
      <Box flex={1} justifyContent={'center'} bg="#fff">
        <Center>
          <Image
            source={require('../assets/images/pcico.png')}
            alt="Company Logo"
            size="md"
          />
          <Heading size={'2xl'} textAlign="center" color="#5d3915">
            phAMAcore
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
            Welcome
          </Heading>

          <Text
            mx="10"
            fontSize="sm"
            // my="3"
            style={styles.promoCode}
            fontWeight="400">
            Sign up to continue!
          </Text>
        </Center>

        <FormControl flex={1}>
          {/* <FormControl.Label>Password</FormControl.Label> */}
          <Input
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
            placeholder="Enter Organisation"
            w={{
              base: '75%',
              md: '25%',
            }}
          />
          {/* <FormControl.Label>Password</FormControl.Label> */}

          <Input
            mx="auto"
            mt={2}
            onChangeText={handlePin}
            value={pinNo}
            type={show ? 'text' : 'password'}
            w={{
              base: '75%',
              md: '25%',
            }}
            InputRightElement={
              <Button
                size="xs"
                bg={'#5d3915'}
                rounded="none"
                w="1/6"
                h="full"
                onPress={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            }
            placeholder="Enter PIN"
          />
          {/* <TextInput
            style={styles.input}
            onChangeText={handlePin}
            value={pinNo}
            placeholder="Enter PIN"
            placeholderTextColor="#a3a3a3"
          /> */}

          {!idNo || !pinNo ? (
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
              Sign Up
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
              onPress={handleFetch}>
              Sign Up
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
        <Center p={1}>
          <Text fontSize="xs" mx="10">
            Powered by
          </Text>
          <Image
            style={styles.image}
            source={require('../assets/images/pcico.png')}
            alt="Company Logo"
            size="xs"
          />
          {/* <Text fontSize="xs" fontWeight="bold" color="#5d3915" mx="10">
              Corebase Solutions
            </Text> */}
        </Center>
      </VStack>
      {/* </VStack> */}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  image: {
    // flex: 1,
    // justifyContent: 'center',
    maxWidth: 20,
    maxHeight: 20,
  },
  footer: {
    marginTop: '1rem',
  },
  inputContainer: {
    borderWidth: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
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
