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
          style={styles.image}>
          <HStack mx="5" mb="3">
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
            flex={2}
            // maxW="80"
            mx="5"
            mb="3"
            p="3"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: 'amber.900',
            }}>
            <Stack flex={1} space={1}>
              <Heading size="md" color="#fafafa">
                Loyalty Points
              </Heading>
            </Stack>

            <HStack flex={1} space={1}>
              <Image
                source={require('../assets/images/medicosin.png')}
                alt="company logo"
                style={styles.companyLogo}
                size="sm"
              />

              <Text size="2lg" color="#fafafa">
                Loyalty Points
              </Text>
            </HStack>

            <Stack flex={1} space={1}>
              <Heading size="md" color="#fafafa">
                Loyalty Points
              </Heading>
            </Stack>

            <Stack flex={1} justifyContent="flex-end" space={1}>
              <Text
                color="light.50"
                _dark={{
                  color: 'light.100',
                }}
                fontWeight="400">
                Last Updated: 1st Dec, 2021
              </Text>
            </Stack>
          </Box>
        </ImageBackground>
        {/* Points Summary */}
        <Box
          bg="#000"
          flex={2}
          // p="5"
          justifyContent="center"
          alignItems="center">
          <Center>
            <Text fontSize="lg" color="#5d3915" mx="10">
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

        <Box bg="#000" p="5" justifyContent="center">
          <HStack bg="#fff">
            <Text color="#5d3915" fontSize="sm" fontWeight="bold">
              Activities
            </Text>
          </HStack>

          {/* Activity Items */}

          <VStack bg="#fff">
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
      </VStack>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  noBackGround: {
    opacity: 1,
  },
  image: {
    flex: 4,
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
