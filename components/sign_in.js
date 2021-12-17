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
  Spacer,
  Alert,
} from 'native-base';

const SignIn = ({navigation}) => {
  const [pinNo, setPin] = useState('');
  const [idNo, setIdno] = useState('');
  const [data, setData] = useState({});
  const [status, setStatus] = useState('');

  const handleID = text => {
    return setIdno(text);
  };

  const handlePin = text => {
    return setPin(text);
  };

  const handleFetch = () => {
    const request = 'http://102.37.102.247:5016/CustomerPoints/CustomerLogin';

    fetch(request, {
      method: 'POST',
      headers: new Headers({
        // Authorization: `Bearer ${data.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        idnumber: idNo,
        pin: pinNo,
      }),
    })
      .then(response => {
        if (!response.ok) {
          if (response.status == 404) {
            setStatus('Error Fetching Data from server');
            console.warn('Error Fetching Data from server');
          } else if (response.status > 499) {
            setStatus('Internal Server Error');
            console.warn('Internal Server Error');
          }
        } else {
          setIdno('');
          setPin('');
          // navigation.navigate('dashboard', {screen: 'Home'});
          return response.json();
        }
      })
      .then(response => {
        setData(response), console.warn(response);
      })
      .catch(() => {
        setStatus('please connect to available network'),
          console.warn('please connect to available network');
      });
    // console.warn('werwrwerrwr');
  };

  useEffect(() => {}, [status]);

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

      <VStack flex={1} bg="light.50">
        {/* TOP Area */}
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.image}>
          <Center flex={1}>
            <Image
              source={require('../assets/images/medicosin.png')}
              alt="Company Logo"
              size="xl"
            />
            <Heading textAlign="center" color="#000">
              Médecins Sans Frontières
            </Heading>
          </Center>
        </ImageBackground>
        {/* FORM Area */}
        <Box bg="#fff" flex={1} style={styles.inputContainer}>
          <HStack mt="5" flex={1} alignItems="center">
            {/* <Image
              onPress={() => Alert.alert('landing')}
              source={require('../assets/images/back.png')}
              alt="next icon"
              style={styles.next}
              size="sm"
              ml="10"
            /> */}

            <Center flex={1}>
              <Text
                fontSize="24"
                style={{textAlign: 'center'}}
                fontWeight="bold">
                Sign In
              </Text>
            </Center>
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

          <TextInput
            style={styles.input}
            onChangeText={handleID}
            value={idNo}
            placeholder="Enter National ID"
            placeholderTextColor="#a3a3a3"
          />

          <TextInput
            style={styles.input}
            onChangeText={handlePin}
            value={pinNo}
            placeholder="Enter PIN"
            placeholderTextColor="#a3a3a3"
          />

          <Pressable
            mx="10"
            // onPress={() => navigation.navigate('dashboard', {screen: 'Home'})}
            onPress={handleFetch}>
            {({isPressed}) => {
              return (
                <Box
                  borderWidth="3"
                  borderColor={isPressed ? '#5d3915' : '#fff'}
                  bg={isPressed ? '#fff' : '#5d3915'}
                  p="8"
                  rounded="8"
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 1 : 1,
                      },
                    ],
                  }}>
                  <Center>
                    <Text
                      fontWeight="bold"
                      color={isPressed ? '#5d3915' : '#fff'}>
                      Sign In
                    </Text>
                  </Center>
                </Box>
              );
            }}
          </Pressable>

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
