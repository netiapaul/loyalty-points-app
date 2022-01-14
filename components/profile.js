import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
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
  Spacer,
  Avatar,
  Button,
  Spinner,
  FormControl,
  Input,
} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const SignIn = ({route, navigation}) => {
  const {token, memberNo} = route.params;
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [current, setCurrent] = useState('');
  const [confirm, setConfirm] = useState('');

  const [isloading, setIsLoading] = useState(false);

  const handlePin = text => {
    return setPin(text);
  };

  const currentPin = text => {
    return setCurrent(text);
  };

  const confirmPin = text => {
    return setConfirm(text);
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
            Authorization: `Bearer ${token}`,
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

        Snackbar.show({
          backgroundColor: '#0f5132',
          text: 'PIN changed successfully',
          duration: Snackbar.LENGTH_LONG,
        });
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
        <Box bg="#fff" my={1} justifyContent={'center'}>
          <Center>
            <Avatar bg="blueGray.600" size="sm">
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
            <Text style={{textAlign: 'center'}} fontWeight="bold">
              Update PIN
            </Text>
            <Text mx="10" style={styles.promoCode} fontWeight="400">
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
            <Input
              type="number"
              mx="auto"
              keyboardType="numeric"
              mt={5}
              onChangeText={confirmPin}
              value={confirm}
              placeholder="Confirm New Pin"
              w={{
                base: '75%',
                md: '25%',
              }}
            />
            {pin !== confirm || !pin || !confirm ? (
              <Button
                isDisabled
                mx="auto"
                mt={5}
                w={{
                  base: '75%',
                  md: '25%',
                }}
                p={3}
                bg={'#5d3915'}
                rounded="5"
                onPress={() => {
                  Keyboard.dismiss();
                  setTimeout(() => {
                    setIsLoading(true);
                    handleUpdate();
                  }, 1000);
                }}>
                {isloading ? (
                  <Spinner size="sm" color="warning.500" />
                ) : (
                  'Update'
                )}
              </Button>
            ) : (
              <Button
                mx="auto"
                mt={5}
                w={{
                  base: '75%',
                  md: '25%',
                }}
                p={3}
                bg={'#5d3915'}
                rounded="5"
                onPress={() => {
                  Keyboard.dismiss();
                  setTimeout(() => {
                    setIsLoading(true);
                    handleUpdate();
                  }, 1000);
                }}>
                {isloading ? (
                  <Spinner size="sm" color="warning.500" />
                ) : (
                  'Update'
                )}
              </Button>
            )}

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
              p={2}
              bg={'#fff'}
              colorScheme="danger.800"
              rounded="5"
              onPress={clearAll}>
              Log Out
            </Button>
          </FormControl>
        </Box>
        <VStack flex={1} justifyContent="flex-end">
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
            <Text
              style={styles.myText}
              fontWeight="bold"
              color="#5d3915"
              mx="10">
              Corebase Solutions
            </Text>
          </Center>
        </VStack>
      </VStack>
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
