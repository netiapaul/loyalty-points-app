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
    setStatus(status);
    return () => {
      setStatus('');
    };
  }, []);

  const handleFetch = async () => {
    try {
      await fetch('http://102.37.102.247:5016/CustomerPoints/CustomerLogin', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idnumber: idNo,
          pin: pinNo,
        }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            setStatus('Please Confirm the details entered');
          }
        })
        .then(data => {
          setData(data);
          console.error(data.token);
          return navigation.navigate('different', {
            token: data.token,
            memberNo: data.user.memberno,
          });
        })
        .catch(() => {
          setStatus('Network request failed connect to the internet');
        });
    } catch (error) {
      console.warn(error);
    }

    // try {
    //   await fetch('http://102.37.102.247:5016/CustomerPoints/CustomerLogin', {
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
    //     .then(async response => {
    //       if (!response.ok) {
    //         setStatus('Please Confirm the details entered');
    //       } else {
    //         const data = await response.json();
    //         setData(data);
    //         console.error(data.token);
    //         return navigation.navigate('different', {
    //           token: data.token,
    //           memberNo: data.user.memberno,
    //         });
    //       }
    //     })
    //     .catch(() =>
    //       setStatus('Network request failed connect to the internet'),
    //     );
    // } catch (error) {
    //   console.warn(error);
    // }
  };

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

      <VStack flex={1} bg="#fff">
        {/* TOP Area */}
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.image}>
          <Center>
            {/* <Image
              source={require('../assets/images/medicosin.png')}
              alt="Company Logo"
              size="xl"
            /> */}
            <Image
              source={require('../assets/images/pcico.png')}
              alt="Company Logo"
              size="md"
            />
            <Heading size={'2xl'} textAlign="center" color="#5d3915">
              phAMAcore
            </Heading>
          </Center>
        </ImageBackground>
        {/* FORM Area */}
        <Box bg="#fff" flex={1} style={styles.inputContainer}>
          <HStack my={5} justifyContent={'center'}>
            {/* <Image
              onPress={() => Alert.alert('landing')}
              source={require('../assets/images/back.png')}
              alt="next icon"
              style={styles.next}
              size="sm"
              ml="10"
            /> */}

            <Text fontSize="24" style={{textAlign: 'center'}} fontWeight="bold">
              Sign In
            </Text>
          </HStack>

          <Center>
            <Text
              mx="10"
              fontSize="14"
              // my="3"
              style={styles.promoCode}
              fontWeight="400">
              Enter your
              <Text fontWeight="bold"> National ID Number </Text>&
              <Text fontWeight="bold"> PIN Number </Text>
              to proceed.
            </Text>
          </Center>

          <FormControl>
            {/* <TextInput
            style={styles.input}
            onChangeText={handleID}
            value={idNo}
            placeholder="Enter National ID"
            placeholderTextColor="#a3a3a3"
          /> */}
            {/* <FormControl.Label>Password</FormControl.Label> */}
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
                isDisabled
                onPress={handleFetch}>
                Sign In
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
                Sign In
              </Button>
            )}
          </FormControl>

          <VStack flex={1} justifyContent="flex-end">
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
