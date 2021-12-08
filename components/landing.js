import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
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
  Button,
} from 'native-base';

const Landing = ({navigation}) => {
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
          <Center flex={2}>
            <Text mx="10" my="3" fontWeight="400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
            </Text>
          </Center>

          <HStack my="3" mx="10" flex={1} alignItems="center">
            <Text style={styles.stackText}>Next</Text>
            <Image
              source={require('../assets/images/next.png')}
              alt="next icon"
              style={styles.next}
              size="sm"
              ml="3"
            />
          </HStack>

          <Pressable mx="10" onPress={() => navigation.navigate('signIn')}>
            {({isPressed}) => {
              return (
                <Box
                  borderWidth="3"
                  borderColor="#5d3915"
                  bg={isPressed ? '#5d3915' : '#fff'}
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
                    <Text color={isPressed ? '#fff' : '#5d3915'}>Sign In</Text>
                  </Center>
                </Box>
              );
            }}
          </Pressable>

          <VStack flex={1} justifyContent="flex-end" mb="2">
            <Center>
              <Text fontSize="xs">Powered by</Text>
              <Text fontSize="xs" fontWeight="bold" color="#5d3915">
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
  stackText: {
    fontWeight: 'bold',
    color: 'black',
  },
  next: {
    width: 40,
    height: 20,
  },
});

export default Landing;