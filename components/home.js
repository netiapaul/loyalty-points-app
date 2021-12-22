import React, {useEffect, useState, Component} from 'react';
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
  Stack,
  Link,
  Divider,
  Spacer,
  Alert,
  Avatar,
  Button,
  Collapse,
  IconButton,
  CloseIcon,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const Dashboard = ({route, navigation}) => {
  const [user, setUser] = useState({});
  const [status, setStatus] = useState('');
  const [asyncData, setAsyncData] = useState({});
  const {token, memberNo} = route.params;
  const [name, setName] = useState('');

  useEffect(() => {
    handleSubmit();
    console.warn('name', name);
    console.warn('paramater', token);
  }, []);

  async function GetUSerData() {
    const response = await fetch(
      `http://102.37.102.247:5016/Customers/members?memberNum=${memberNo}`,
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      setStatus('Error fetching Data from the server;');
    } else {
      return response.json(); // parses JSON response into native JavaScript objects
    }
  }
  const handleSubmit = () => {
    GetUSerData()
      .then(data => {
        setUser(data[0]);
        setName(data[0].membername);
        console.warn(data[0].membername);
      })
      .catch(() => setStatus('Network request error: connect to a network'));
  };

  return (
    <NativeBaseProvider config={config}>
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

      <HStack
        bg="#fff"
        p="3"
        justifyContent="space-between"
        alignItems="center">
        <Text color="#5d3915" fontSize="16" fontWeight="bold">
          Dashboard
        </Text>
        <Spacer />
        <Avatar bg="blueGray.600" size="sm">
          {name ? name.match(/\b([A-Z])/g).join('') : null}
          {/* {user.membername.match(/\b([A-Z])/g).join('')} */}
        </Avatar>
      </HStack>
      {/* bg="light.50" */}
      <VStack flex={1} bg="#fff">
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.image}>
          <HStack mx="5" mb="3">
            <Text
              color="#000"
              fontSize="md"
              style={styles.noBackGround}
              fontWeight="bold">
              Hi, {user.membername}.
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

                {/* <Text
                    color="#fafafa"
                    flex={1}
                    textAlign={'center'}
                    fontSize="xs">
                    7,566 points remaining for your next reward
                  </Text> */}
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
              shadow={3}>
              <Link
                onPress={() =>
                  navigation.navigate('transactions', {
                    screen: 'transactions',
                    memberNo,
                    token,
                  })
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
                      Transaction History
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
