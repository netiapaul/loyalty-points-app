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
} from 'native-base';

const SignIn = ({navigation}) => {
  const [pin, setPin] = useState('');
  const [idno, setIdno] = useState('');

  const handleID = text => {
    return setIdno(text);
  };

  const handlePin = text => {
    return setPin(text);
  };

  const handleFetch = () => {
    const request =
      'http://102.37.102.247:5016/Customers/members?memberNum=PP000007';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEb2N1bWVudENlbnRyYWwiLCJqdGkiOiI1NDMyYzkzNy1hMjQwLTQyZmItOGM4ZC0wYmZhZmJmMDgxYTAiLCJpYXQiOiIxMi8xNi8yMDIxIDc6NTQ6NDcgQU0iLCJleHAiOjE2Mzk3Mjc2ODcsImlkIjoiMSIsInVzZXJuYW1lIjoiQXBwU3VwZXJBZG1pbiIsIkNvbXBhbnlEZXRhaWxJZCI6IjEiLCJjbGllbnRDb2RlIjoiQ29yZVBoYW1hIiwiYnJhbmNoZXMiOiIyLDQsNiwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCIsInJvbGUiOiJTdXBlckFkbWluIiwiaXNzIjoiQ29yZUJhc2VTb2x1dGlvbnNMaW1pdGVkIiwiYXVkIjoiRG9jdW1lbnRDZW50cmFsQ2xpZW50cyJ9.kjhV-SS6FmbN082hD_1Go6jVlrjNjAavjWjHjF_jukA';
    fetch(request, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(response => console.warn(response))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    handleFetch();
  });

  return (
    <NativeBaseProvider>
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
              my="3"
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
            value={idno}
            placeholder="Enter National ID"
            placeholderTextColor="#a3a3a3"
          />

          <TextInput
            style={styles.input}
            onChangeText={handlePin}
            value={pin}
            placeholder="Enter PIN"
            placeholderTextColor="#a3a3a3"
          />

          <Pressable
            mx="10"
            onPress={() => navigation.navigate('dashboard', {screen: 'Home'})}>
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
