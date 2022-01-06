import React, {useState, useEffect} from 'react';
import Snackbar from 'react-native-snackbar';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
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
  Spinner,
} from 'native-base';

const SignIn = ({navigation}) => {
  const [pinNo, setPin] = useState('');
  const [idNo, setIdno] = useState('');
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const handleClick = () => setShow(!show);

  const handleID = text => {
    return setIdno(text);
  };

  const handlePin = text => {
    return setPin(text);
  };

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
      if (reponse.ok) {
        const data = await reponse.json();
        setPin('');
        setIdno('');
        // console.warn('Success response', data);
        setIsLoading(false);
        return navigation.navigate('different', {
          token: data.token,
          memberNo: data.user.memberno,
        });
      } else {
        setIsLoading(false);
        Snackbar.show({
          backgroundColor: '#e11d48',
          text: 'Please confirm details entered',
          duration: Snackbar.LENGTH_SHORT,
        });
        // console.warn(reponse.status);
        // setStatus(!status);
      }
    } catch (error) {
      setIsLoading(false);
      console.warn(error);
      // setStatus(!status);
      Snackbar.show({
        backgroundColor: '#e11d48',
        text: 'Please connect to an internet',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

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
                  Confirm details entered or Connect to an internet connection
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

      <KeyboardAvoidingView
        flex={1}
        keyboardVerticalOffset={-500}
        behavior="padding">
        <Box py={20} justifyContent={'center'} bg="#fafafa">
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

        <Box bg="#fff" flex={1} style={styles.inputContainer}>
          <HStack my={3} justifyContent={'center'}>
            {/* <Image
              onPress={() => Alert.alert('landing')}
              source={require('../assets/images/back.png')}
              alt="next icon"
              style={styles.next}
              size="sm"
              ml="10"
            /> */}

            <Text fontSize="md" style={{textAlign: 'center'}} fontWeight="bold">
              Sign In
            </Text>
          </HStack>

          <Center>
            <Text
              mx="10"
              fontSize="sm"
              // my="3"
              style={styles.promoCode}
              fontWeight="400">
              Enter your
              <Text fontWeight="bold"> National ID Number </Text>&
              <Text fontWeight="bold"> PIN Number </Text>
              to proceed.
            </Text>
          </Center>

          <FormControl bg="#fff" flex={1}>
            {/* <FormControl.Label>Password</FormControl.Label> */}
            <Input
              type="number"
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
              type={show ? 'number' : 'password'}
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
                onPress={() => {
                  handleFetch();
                }}>
                Sign in
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
                  setTimeout(() => {
                    handleFetch();
                    setIsLoading(true);
                  }, 1000);
                }}>
                {isloading ? (
                  <Spinner size="sm" color="warning.500" />
                ) : (
                  'Sign in'
                )}
              </Button>
            )}
            <HStack mt="3" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                I'm a new user.{' '}
              </Text>
              <Link
                onPress={() => navigation.navigate('register')}
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}>
                Sign Up
              </Link>
            </HStack>
          </FormControl>
        </Box>
      </KeyboardAvoidingView>
      <VStack bg={'#fff'} mb={0} justifyContent="flex-end">
        <Center>
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
    borderWidth: 0.5,
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
