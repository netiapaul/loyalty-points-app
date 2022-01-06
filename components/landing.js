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
        <Box flex={1} justifyContent={'center'} bg="#fff">
          <Center flex={1}>
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
        </Box>

        {/* FORM Area */}
        <Box bg="#fff" flex={1} style={styles.inputContainer}>
          <Center>
            <Text mx="10" my="3" fontWeight="400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
            </Text>
          </Center>

          <HStack my="3" flex={1} mx="10" alignItems="center">
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
                    <Text color={isPressed ? '#fff' : '#5d3915'}>
                      Get Started
                    </Text>
                  </Center>
                </Box>
              );
            }}
          </Pressable>
          <VStack bg={'#fff'} flex={1} mb={0} justifyContent="flex-end">
            <Center>
              <Text fontSize="xs">Powered by</Text>
              <Image
                style={styles.image}
                source={require('../assets/images/pcico.png')}
                alt="Company Logo"
                size="xs"
              />
              <Text fontSize="10" fontWeight="bold" color="#5d3915" mx="10">
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
    maxWidth: 15,
    maxHeight: 15,
  },

  inputContainer: {
    borderWidth: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomColor: '#fff',
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
