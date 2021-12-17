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
} from 'native-base';

const SignIn = ({navigation}) => {
  const [input, setInput] = useState('');
  const handleChange = text => {
    return setInput(text);
  };

  const [user, setUser] = useState({});

  const handleFetch = () => {
    const request =
      'http://102.37.102.247:5016/Customers/members?memberNum=PP000006';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEb2N1bWVudENlbnRyYWwiLCJqdGkiOiIzZGJmNDhiMC0zYzQ0LTRhOTEtOTlhNC1mNGUwMDg0MWMxODIiLCJpYXQiOiIxMi8xNy8yMDIxIDg6MzE6MTIgQU0iLCJleHAiOjE2Mzk4MTYyNzIsImlkIjoiMSIsInVzZXJuYW1lIjoiQXBwU3VwZXJBZG1pbiIsIkNvbXBhbnlEZXRhaWxJZCI6IjEiLCJjbGllbnRDb2RlIjoiQ29yZVBoYW1hIiwiYnJhbmNoZXMiOiIyLDQsNiwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCIsInJvbGUiOiJTdXBlckFkbWluIiwiaXNzIjoiQ29yZUJhc2VTb2x1dGlvbnNMaW1pdGVkIiwiYXVkIjoiRG9jdW1lbnRDZW50cmFsQ2xpZW50cyJ9.xFYMbJmfh3oaf106HWPHWZvC0m5MS4g02AMvg76pRT0';
    fetch(request, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(response => setUser(response[0]))
      // .then(response => console.warn(response[0]))
      .catch(err => console.warn('please connect to available network'));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <NativeBaseProvider>
      <VStack flex={2} bg="light.50">
        {/* TOP Area */}
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.image}>
          <Center flex={1}>
            {/* <Avatar bg="green.500">SS</Avatar> */}
            {/* <Image
              source={require('../assets/images/medicosin.png')}
              alt="Company Logo"
              size="xl"
            /> */}
            <Avatar bg="blueGray.600" size="xl">
              {/* .match(/\b([A-Z])/g).join('') */}
              {/* {user.membername} */}
              SS
            </Avatar>
            <Heading textAlign="center" color="#000">
              {user.membername}
            </Heading>
            {input}
          </Center>
        </ImageBackground>
        {/* FORM Area */}
        <Box bg="#fff" flex={3} style={styles.inputContainer}>
          <Text
            fontSize="24"
            my={2}
            style={{textAlign: 'center'}}
            fontWeight="bold">
            Profile
          </Text>

          <Center mt={-2}>
            <Text
              mx="10"
              fontSize="14"
              style={styles.promoCode}
              fontWeight="400">
              Edit your personal information below.
            </Text>
          </Center>

          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            value={input}
            placeholder="Enter Member ID"
            placeholderTextColor="#a3a3a3"
          />

          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            value={input}
            placeholder="Enter Member ID"
            placeholderTextColor="#a3a3a3"
          />

          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            value={input}
            placeholder="Enter Member ID"
            placeholderTextColor="#a3a3a3"
          />

          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            value={input}
            placeholder="Enter Member ID"
            placeholderTextColor="#a3a3a3"
          />

          <Pressable
            mx="10"
            mb={3}
            onPress={() => Alert.alert('Update button works')}>
            {({isPressed}) => {
              return (
                <Box
                  borderWidth="3"
                  borderColor={isPressed ? '#5d3915' : '#fff'}
                  bg={isPressed ? '#fff' : '#5d3915'}
                  p="5"
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
                      Update
                    </Text>
                  </Center>
                </Box>
              );
            }}
          </Pressable>

          <Pressable mx="10" onPress={() => navigation.navigate('landing')}>
            {({isPressed}) => {
              return (
                <Box
                  borderWidth="3"
                  borderColor="#5d3915"
                  bg={isPressed ? '#5d3915' : '#fff'}
                  p="5"
                  rounded="8"
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 1 : 1,
                      },
                    ],
                  }}>
                  <Center>
                    <Text color={isPressed ? '#fff' : '#5d3915'}>Log Out</Text>
                  </Center>
                </Box>
              );
            }}
          </Pressable>

          {/* <VStack flex={1} justifyContent="flex-end" my="2">
            <Center>
              <Text fontSize="xs" mx="10">
                Powered by
              </Text>
              <Text fontSize="xs" fontWeight="bold" color="#5d3915" mx="10">
                Corebase Solutions
              </Text>
            </Center>
          </VStack> */}
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
