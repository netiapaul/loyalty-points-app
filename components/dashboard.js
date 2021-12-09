import React from 'react';
import {ImageBackground, StyleSheet, Alert} from 'react-native';
import {
  NativeBaseProvider,
  VStack,
  Center,
  Heading,
  Image,
  Box,
  Text,
  HStack,
  Stack,
  Pressable,
} from 'native-base';

const Dashboard = ({navigation}) => {
  return (
    <NativeBaseProvider>
      <HStack
        bg="#fff"
        p="3"
        justifyContent="space-between"
        alignItems="center">
        <Text color="#5d3915" fontSize="20" fontWeight="bold">
          Dashboard
        </Text>
        {/*
        <Image
          source={require('../assets/images/medicosin.png')}
          alt="company logo"
          style={styles.companyLogo}
          size="sm"
        />

         <Text
          color="#5d3915"
          fontSize="20"
          fontWeight="bold"
          onPress={() => Alert.alert('i am Headed to greatness')}>
          Dashboard
        </Text> */}
      </HStack>
      {/* bg="light.50" */}
      <VStack flex={1} bg="#fff">
        <ImageBackground
          source={require('../assets/images/background.png')}
          flex={1}
          style={styles.image}>
          <HStack mx="5" my="3">
            <Text
              color="#000"
              fontSize="sm"
              style={styles.noBackGround}
              fontWeight="bold">
              Hi, John Tracy Doe
            </Text>
          </HStack>

          {/* Points Card */}
          <Box
            // maxW="80"
            mx="5"
            mb="3"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'gray.50',
            }}>
            <Stack p="4" space={1}>
              <Heading size="md">Loyalty Points</Heading>
              <Text fontWeight="400">
                Bengaluru (also called Bangalore) is the center of India's
                high-tech industry. The city is also known for its parks and
                nightlife.
              </Text>
              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between">
                <HStack alignItems="center">
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}
                    fontWeight="400">
                    Last Updated: 1st Dec, 2021
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </ImageBackground>
        {/* Points Summary */}
        <Box bg="#fff" my="3" justifyContent="center" alignItems="center">
          <Center>
            <Text fontSize="lg" mx="10">
              Points Summary
            </Text>
          </Center>

          <Center>
            <HStack>
              <VStack alignItems="center">
                <Text fontSize="sm" mx="3" fontWeight="bold">
                  Total Points
                </Text>
                <Text fontSize="sm">12,043</Text>
              </VStack>

              <VStack alignItems="center">
                <Text fontSize="sm" mx="3" fontWeight="bold">
                  Redeemed Points
                </Text>
                <Text fontSize="sm">56,324</Text>
              </VStack>

              <VStack alignItems="center">
                <Text fontSize="sm" mx="3" fontWeight="bold">
                  Points Earned
                </Text>
                <Text fontSize="sm">234,344</Text>
              </VStack>
            </HStack>
          </Center>
        </Box>

        <Box bg="#fff" flex={2} justifyContent="center">
          <HStack mx="5" bg="#fff">
            <Text color="#5d3915" fontSize="sm" fontWeight="bold">
              Activities
            </Text>
          </HStack>

          {/* Activity Items */}

          <VStack mx="5" my="5" bg="#fff">
            <Box
              rounded="sm"
              borderColor="coolGray.200"
              p="5"
              my="2"
              borderWidth="1">
              <Text color="#5d3915" fontWeight="bold">
                Activities
              </Text>
            </Box>

            <Box
              rounded="sm"
              borderColor="coolGray.200"
              p="5"
              my="2"
              borderWidth="1">
              <Text color="#5d3915" fontWeight="bold">
                Activities
              </Text>
            </Box>

            <Box
              rounded="sm"
              borderColor="coolGray.200"
              p="5"
              my="2"
              borderWidth="1">
              <Text color="#5d3915" fontWeight="bold">
                Activities
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  noBackGround: {
    opacity: 1,
  },
  image: {
    // flex: 1,
    justifyContent: 'center',
  },
  companyLogo: {
    width: 40,
    height: 20,
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

export default Dashboard;
