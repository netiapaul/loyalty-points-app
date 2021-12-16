import React, {useEffect, useState} from 'react';
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
  Link,
  Divider,
  Spacer,
} from 'native-base';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const Dashboard = ({navigation}) => {
  const [user, setUser] = useState({});

  const handleFetch = () => {
    const request =
      'http://102.37.102.247:5016/Customers/members?memberNum=PP000006';
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
      .then(response => setUser(response[0]))
      // .then(response => console.warn(response[0]))
      .catch(err => console.warn('please connect to available network'));
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <NativeBaseProvider config={config}>
      <HStack
        bg="#fff"
        p="5"
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
              Hi, {user.membername}
            </Text>
          </HStack>

          {/* Points Card */}
          <Box
            flex={1}
            // maxW="80"
            mx="5"
            mb="3"
            p="3"
            shadow={9}
            bg={{
              linearGradient: {
                // colors: ['lightBlue.300', 'violet.800'],
                colors: ['amber.500', 'amber.900'],
                start: [0, 1],
                end: [1, 0],
              },
            }}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            // borderWidth="1"
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            // _light={{
            //   backgroundColor: 'amber.900',
            // }}
          >
            <Stack flex={1} space={1}>
              <Heading size="md" color="#fafafa">
                Loyalty Points
              </Heading>
            </Stack>

            <HStack flex={2} space={10}>
              {/* <Image
                source={require('../assets/images/medicosin.png')}
                alt="company logo"
                style={styles.companyLogo}
                size="sm"
              /> */}

              <VStack>
                <Text
                  color="#fafafa"
                  fontSize="4xl"
                  flex={1}
                  fontWeight={'bold'}>
                  {user.mempointsbal} pts
                </Text>

                <Text
                  color="#fafafa"
                  flex={1}
                  textAlign={'center'}
                  fontSize="xs">
                  7,566 points remaining for your next reward
                </Text>
              </VStack>
            </HStack>

            {/* <Stack flex={1} space={1}>
              <Heading size="md" color="#fafafa">
                Loyalty Points
              </Heading>
            </Stack> */}
            <Divider mb={2} mt={-3} />
            <Stack justifyContent="flex-end" space={1}>
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
          bg="#fff"
          flex={2}
          // p="5"
          justifyContent="center"
          alignItems="center">
          <Center>
            <Text
              fontSize="2xl"
              fontWeight={'bold'}
              color="#5d3915"
              mb={3}
              mx="10">
              Points Summary
            </Text>
          </Center>

          <Center>
            <HStack>
              <VStack alignItems="center">
                <Text fontSize="sm" mx="3" mb={1} fontWeight="bold">
                  Total Points
                </Text>
                <Text fontSize="sm">{user.mempointsbal}</Text>
              </VStack>

              <VStack alignItems="center">
                <Text fontSize="sm" mx="3" mb={1} fontWeight="bold">
                  Redeemed Points
                </Text>
                <Text fontSize="sm">{user.mempointsredeem}</Text>
              </VStack>

              <VStack alignItems="center">
                <Text fontSize="sm" mx="3" mb={1} fontWeight="bold">
                  Points Buy
                </Text>
                <Text fontSize="sm">{user.mempointsbuy}</Text>
              </VStack>
            </HStack>
          </Center>
        </Box>

        <Box bg="#fff" p="5" mt={-5} justifyContent="center">
          <HStack bg="#fff">
            <Text color="#5d3915" fontSize="md" mb={5} fontWeight={'bold'}>
              Activities
            </Text>
          </HStack>

          {/* Activity Items */}

          <VStack bg="#fff">
            <Box
              p="5"
              m="2"
              bg="muted.50"
              borderRadius="md"
              borderColor="coolGray.200"
              borderWidth="1"
              onPress={() => Alert.alert('adsdd')}
              shadow={3}>
              <Link
                onPress={() =>
                  navigation.navigate('points', {screen: 'points'})
                }>
                <HStack>
                  <Image
                    source={require('../assets/images/picture.png')}
                    alt="company logo"
                    style={styles.transactionsImage}
                    size="sm"
                  />
                  <Center>
                    <Text color="#5d3915" ml={3} fontWeight="bold">
                      Points Transactions
                    </Text>
                    <Text color="#5d3915" ml={-12} fontSize={10}>
                      22/12/2021
                    </Text>
                  </Center>
                </HStack>
                <Spacer />
                <Center>
                  <Image
                    source={require('../assets/images/right-arrow.png')}
                    alt="company logo"
                    style={styles.rightArrow}
                    size="sm"
                  />
                </Center>
              </Link>
            </Box>

            <Box
              borderColor="coolGray.200"
              p="5"
              m="2"
              bg="muted.50"
              borderRadius="md"
              borderWidth="1"
              shadow={3}>
              <Link
                onPress={() => navigation.navigate('sales', {screen: 'sales'})}>
                <HStack>
                  <Image
                    source={require('../assets/images/picture.png')}
                    alt="company logo"
                    style={styles.transactionsImage}
                    size="sm"
                  />
                  <Center>
                    <Text color="#5d3915" ml={3} fontWeight="bold">
                      Sales Transactions
                    </Text>
                    <Text color="#5d3915" ml={-12} fontSize={10}>
                      22/12/2021
                    </Text>
                  </Center>
                </HStack>

                <Spacer />
                <Center>
                  <Image
                    source={require('../assets/images/right-arrow.png')}
                    alt="company logo"
                    style={styles.rightArrow}
                    size="sm"
                  />
                </Center>
              </Link>
            </Box>
          </VStack>
        </Box>
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
      </VStack>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  noBackGround: {
    opacity: 1,
  },
  image: {
    flex: 3,
    justifyContent: 'center',
  },
  transactionsImage: {
    width: 50,
    height: 50,
  },
  companyLogo: {
    width: 40,
    height: 20,
  },
  rightArrow: {width: 30, height: 30},
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
