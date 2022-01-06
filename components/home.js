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
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const Dashboard = ({route, navigation}) => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);

  const [status, setStatus] = useState('');
  const {token, memberNo} = route.params;
  const [name, setName] = useState('');
  const [points, setPoints] = useState();
  const [buy, setbuy] = useState();
  const [redeemed, setredeemed] = useState();
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    handleSubmit();
    handleTransactions();
    console.warn(transactions);
    // console.warn('name', name);
    // console.warn('paramater', token);
  }, []);

  async function handleTransactions() {
    try {
      const response = await fetch(
        `http://102.37.102.247:5016/CustomerPoints/GetCustomerTransactions?memberNo=${memberNo}`,
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setTransactions(JSON.parse(data));
      } else {
        console.error('error');
      }
    } catch (error) {
      // setIsLoading(false);
      return Snackbar.show({
        backgroundColor: '#e11d48',
        text: 'Network request failed connect to the internet',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  async function GetUSerData() {
    try {
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
      if (response.ok) {
        const data = await response.json();
        setUser(data[0]);
        setName(data[0].membername);
        setPoints(data[0].mempointsbal);
        setbuy(data[0].mempointsbuy);
        setredeemed(data[0].mempointsredeem);
        console.warn(data[0].membername);
        setIsLoading(false);
      } else {
        // return response.json();
        // return Snackbar.show({
        //   backgroundColor: '#e11d48',
        //   text: 'Login is required to view your data',
        //   duration: Snackbar.LENGTH_SHORT,
        // });
        return navigation.goBack();
      }
    } catch (error) {
      return Snackbar.show({
        backgroundColor: '#e11d48',
        text: 'Network request failed connect to the internet',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    // const response = await fetch(
    //   `http://102.37.102.247:5016/Customers/members?memberNum=${memberNo}`,
    //   {
    //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   },
    // );
    // if (!response.ok) {
    //   setStatus('Login is required to view your data');
    // } else {
    //   return Snackbar.show({
    //     backgroundColor: '#e11d48',
    //     text: 'Network request failed connect to the internet',
    //     duration: Snackbar.LENGTH_SHORT,
    //   });
    // }
  }
  const handleSubmit = () => {
    GetUSerData();
    // .then(data => {
    //   setUser(data[0]);
    //   setName(data[0].membername);
    //   setPoints(data[0].mempointsbal);
    //   setbuy(data[0].mempointsbuy);
    //   setredeemed(data[0].mempointsredeem);
    //   console.warn(data[0].membername);
    // })
    // .catch(() => {
    //   return Snackbar.show({
    //     backgroundColor: '#e11d48',
    //     text: 'Network request failed connect to the internet',
    //     duration: Snackbar.LENGTH_SHORT,
    //   });
    // });
  };

  return (
    <NativeBaseProvider config={config}>
      <Box flex={1} bg={'#fff'}>
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
              </HStack>
            </VStack>
          </Alert>
        ) : null}

        <HStack
          shadow={2}
          bg="#fff"
          p="5"
          justifyContent="space-between"
          alignItems="center">
          <Text color="#5d3915" fontSize="18" fontWeight="bold">
            phAMACore Loyalty
          </Text>
          <Spacer />
        </HStack>

        {isloading ? (
          <Center flex={1}>
            <Spinner size="lg" color="warning.500" />
          </Center>
        ) : (
          <>
            <Box flex={1} bg="#fff">
              <VStack flex={1} mt={2} bg="#fff">
                <Box flex={1}>
                  <HStack mx="5" mb="3">
                    <Text
                      color="#000"
                      fontSize="md"
                      style={styles.noBackGround}
                      fontWeight="bold">
                      Hi, {user.membername}.
                    </Text>
                  </HStack>
                  <Box
                    flex={1}
                    // maxW="80"
                    mx="5"
                    mb="3"
                    p="3"
                    shadow={9}
                    bg={{
                      linearGradient: {
                        colors: ['amber.500', 'amber.900'],
                        start: [0, 1],
                        end: [1, 0],
                      },
                    }}
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    _web={{
                      shadow: 2,
                      borderWidth: 0,
                    }}>
                    <Center flex={1}>
                      <Heading
                        size="md"
                        mt={-3}
                        fontWeight={'400'}
                        color="#fafafa">
                        Loyalty Points Balance
                      </Heading>
                    </Center>

                    <Center flex={1}>
                      <Text color="#fafafa" fontSize="3xl" fontWeight={'bold'}>
                        {points
                          ? points
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : user.mempointsbal}{' '}
                        pts
                      </Text>
                    </Center>

                    <Center flex={1}>
                      <HStack>
                        <HStack>
                          <Text color="#fafafa">Earned: </Text>
                          <Text color="#fafafa">
                            {buy
                              ? buy
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                              : user.mempointsbuy}
                          </Text>
                        </HStack>
                        <HStack ml={2}>
                          <Text color="#fafafa">Redemed: </Text>
                          <Text color="#fafafa">
                            {redeemed
                              ? redeemed
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                              : user.mempointsredeem}
                          </Text>
                        </HStack>
                      </HStack>
                    </Center>

                    <Divider mb={2} mt={-3} />
                    <Center justifyContent="flex-end" space={1}>
                      <Text
                        color="light.50"
                        _dark={{
                          color: 'light.100',
                        }}
                        fontWeight="400">
                        Last Updated: {new Date().toDateString()}
                      </Text>
                    </Center>
                  </Box>
                </Box>

                <VStack bg="#fff" flex={2} mx={'15'}>
                  <Text
                    color="#5d3915"
                    fontSize="md"
                    mb={5}
                    ml={2}
                    fontWeight={'bold'}>
                    Activities
                  </Text>

                  <Box
                    p="1"
                    mx="1"
                    bg="muted.50"
                    // bg="#000"
                    // borderRadius="sm"
                    mb={5}
                    borderColor="coolGray.200"
                    // shadow={1}
                    borderWidth="1">
                    <Text fontWeight="500" fontSize={12} my={1}>
                      Last 5 Transactions:
                    </Text>
                    <Divider my={1} />
                    {transactions.slice(0, 5).map((transaction, index) => {
                      return (
                        <Box p={1}>
                          <HStack>
                            <VStack>
                              <Text
                                color={'muted.800'}
                                fontWeight="bold"
                                fontSize={15}>
                                {transaction.DOCNUM}
                              </Text>
                              <HStack>
                                <Text
                                  color={'muted.800'}
                                  fontWeight="400"
                                  fontSize={10}>
                                  {new Date(
                                    transaction.SALEDATE,
                                  ).toDateString()}
                                </Text>
                                <Center>
                                  <Divider
                                    orientation="vertical"
                                    h={3}
                                    bg={'muted.500'}
                                    mx={1}
                                  />
                                </Center>

                                <Text
                                  color={'muted.800'}
                                  fontWeight="400"
                                  fontSize={10}>
                                  {transaction.SALESBRANCH}
                                </Text>
                              </HStack>
                            </VStack>

                            <Spacer />
                            <VStack>
                              <Text
                                color={'muted.800'}
                                fontWeight="bold"
                                fontSize={15}>
                                Kshs.
                                {transaction.DOCNUM}
                              </Text>
                              <HStack space={3}>
                                <Text
                                  color={'muted.800'}
                                  fontWeight="400"
                                  fontSize={10}>
                                  EPts:{' '}
                                  {transaction.MEMPOINTSBUY.toString().replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ',',
                                  )}
                                </Text>

                                <Text
                                  color={'muted.800'}
                                  fontWeight="400"
                                  fontSize={10}>
                                  RPts:{' '}
                                  {transaction.MEMPOINTSREDEEM.toString().replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ',',
                                  )}
                                </Text>
                              </HStack>
                            </VStack>
                          </HStack>
                          <Divider my={1} />
                        </Box>
                      );
                    })}
                  </Box>

                  <Box
                    p="5"
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
                        <Center>
                          <MaterialCommunityIcons
                            name="receipt"
                            color={'#c58c4f'}
                            size={30}
                          />
                        </Center>

                        <Center>
                          <VStack ml={2}>
                            <Text color="#5d3915" fontWeight="bold">
                              My Transactions
                            </Text>
                          </VStack>
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
              </VStack>
              {/* <HStack
                shadow={5}
                bg="#fff"
                p="3"
                justifyContent="space-between"
                alignItems="center">
                <VStack>
                  <Center>
                    <MaterialCommunityIcons
                      name="home"
                      color={'#c58c4f'}
                      size={20}
                    />
                  </Center>

                  <Text color="#5d3915" fontSize="10">
                    Home
                  </Text>
                </VStack>
                <Spacer />
                <Link
                  onPress={() =>
                    navigation.navigate('transactions', {
                      screen: 'transactions',
                      memberNo,
                      token,
                    })
                  }>
                  <VStack>
                    <Center>
                      <MaterialCommunityIcons
                        name="receipt"
                        color={'#c58c4f'}
                        size={20}
                      />
                    </Center>

                    <Text color="#5d3915" fontSize="10">
                      Transactions
                    </Text>
                  </VStack>
                </Link>

                <Spacer />
                <Link
                  onPress={() =>
                    navigation.navigate('profile', {token, memberNo})
                  }>
                  <VStack>
                    <Center>
                      <MaterialCommunityIcons
                        name="account"
                        color={'#c58c4f'}
                        size={20}
                      />
                    </Center>

                    <Text color="#5d3915" fontSize="10">
                      Profile
                    </Text>
                  </VStack>
                </Link>
              </HStack> */}
              {/* <VStack justifyContent="flex-end" my="2">
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
          </>
        )}

        {/* <HStack
        shadow={2}
        bg="#fff"
        p="5"
        justifyContent="space-between"
        alignItems="center">
        <Text color="#5d3915" fontSize="18" fontWeight="bold">
          phAMACore Loyalty
        </Text>
        <Spacer />
      </HStack>

      <Box flex={1} bg="#fff">
        <VStack flex={1} mt={2} bg="#fff">
          <Box flex={2}>
            <HStack mx="5" mb="3">
              <Text
                color="#000"
                fontSize="md"
                style={styles.noBackGround}
                fontWeight="bold">
                Hi, {user.membername}.
              </Text>
            </HStack>
            <Box
              flex={1}
              // maxW="80"
              mx="5"
              mb="3"
              p="3"
              shadow={9}
              bg={{
                linearGradient: {
                  colors: ['amber.500', 'amber.900'],
                  start: [0, 1],
                  end: [1, 0],
                },
              }}
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}>
              <Center flex={1}>
                <Heading size="md" mt={-3} fontWeight={'400'} color="#fafafa">
                  Loyalty Points Balance
                </Heading>
              </Center>

              <Center flex={1}>
                <Text color="#fafafa" fontSize="3xl" fontWeight={'bold'}>
                  {points
                    ? points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : user.mempointsbal}{' '}
                  pts
                </Text>
              </Center>

              <Center flex={1}>
                <HStack>
                  <HStack>
                    <Text color="#fafafa">Earned: </Text>
                    <Text color="#fafafa">
                      {buy
                        ? buy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : user.mempointsbuy}
                    </Text>
                  </HStack>
                  <HStack ml={2}>
                    <Text color="#fafafa">Redemed: </Text>
                    <Text color="#fafafa">
                      {redeemed
                        ? redeemed
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : user.mempointsredeem}
                    </Text>
                  </HStack>
                </HStack>
              </Center>

              <Divider mb={2} mt={-3} />
              <Center justifyContent="flex-end" space={1}>
                <Text
                  color="light.50"
                  _dark={{
                    color: 'light.100',
                  }}
                  fontWeight="400">
                  Last Updated: {new Date().toDateString()}
                </Text>
              </Center>
            </Box>
          </Box>

          <Box
            bg="#fff"
            flex={1}
            mx={15}
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
                  <Text color="light.600" fontSize="sm">
                    {points
                      ? points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : user.mempointsbal}
                  </Text>
                </VStack>

                <VStack alignItems="center">
                  <Text fontSize="sm" mx="3" mb={1} fontWeight="bold">
                    Redeemed Points
                  </Text>
                  <Text color="danger.600" fontSize="sm">
                    {redeemed
                      ? redeemed
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : user.mempointsredeem}
                  </Text>
                </VStack>

                <VStack alignItems="center">
                  <Text fontSize="sm" mx="3" mb={1} fontWeight="bold">
                    Points Buy
                  </Text>
                  <Text color="success.600" fontSize="sm">
                    {buy
                      ? buy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : user.mempointsbuy}
                  </Text>
                </VStack>
              </HStack>
            </Center>
          </Box>

          <VStack bg="#fff" flex={2} mx={'15'}>
            <Text
              color="#5d3915"
              fontSize="md"
              mb={5}
              ml={2}
              fontWeight={'bold'}>
              Activities
            </Text>

            <Box
              p="5"
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
                  <Center>
                    <MaterialCommunityIcons
                      name="receipt"
                      color={'#c58c4f'}
                      size={30}
                    />
                  </Center>

                  <Center>
                    <VStack ml={2}>
                      <Text color="#5d3915" fontWeight="bold">
                        Transaction History
                      </Text>
                    </VStack>
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
        </VStack>
        <HStack
          shadow={5}
          bg="#fff"
          p="3"
          justifyContent="space-between"
          alignItems="center">
          <VStack>
            <Center>
              <MaterialCommunityIcons name="home" color={'#c58c4f'} size={20} />
            </Center>

            <Text color="#5d3915" fontSize="10">
              Home
            </Text>
          </VStack>
          <Spacer />
          <Link
            onPress={() =>
              navigation.navigate('transactions', {
                screen: 'transactions',
                memberNo,
                token,
              })
            }>
            <VStack>
              <Center>
                <MaterialCommunityIcons
                  name="receipt"
                  color={'#c58c4f'}
                  size={20}
                />
              </Center>

              <Text color="#5d3915" fontSize="10">
                Transactions
              </Text>
            </VStack>
          </Link>

          <Spacer />
          <Link
            onPress={() => navigation.navigate('profile', {token, memberNo})}>
            <VStack>
              <Center>
                <MaterialCommunityIcons
                  name="account"
                  color={'#c58c4f'}
                  size={20}
                />
              </Center>

              <Text color="#5d3915" fontSize="10">
                Profile
              </Text>
            </VStack>
          </Link>
        </HStack>
       // <VStack justifyContent="flex-end" my="2">
          //  <Center>
           //   <Text fontSize="xs" mx="10">
           //     Powered by
           //   </Text>
          //    <Text fontSize="xs" fontWeight="bold" color="#5d3915" mx="10">
          //      Corebase Solutions
          //    </Text>
          //  </Center>
        //  </VStack> 
      </Box> */}

        <HStack
          shadow={5}
          bg="#fff"
          p="3"
          justifyContent="space-between"
          alignItems="center">
          <VStack>
            <Center>
              <MaterialCommunityIcons name="home" color={'#c58c4f'} size={20} />
            </Center>

            <Text color="#5d3915" fontSize="10">
              Home
            </Text>
          </VStack>
          <Spacer />
          <Link
            onPress={() =>
              navigation.navigate('transactions', {
                screen: 'transactions',
                memberNo,
                token,
              })
            }>
            <VStack>
              <Center>
                <MaterialCommunityIcons
                  name="receipt"
                  color={'#c58c4f'}
                  size={20}
                />
              </Center>

              <Text color="#5d3915" fontSize="10">
                Transactions
              </Text>
            </VStack>
          </Link>

          <Spacer />
          <Link
            onPress={() => navigation.navigate('profile', {token, memberNo})}>
            <VStack>
              <Center>
                <MaterialCommunityIcons
                  name="account"
                  color={'#c58c4f'}
                  size={20}
                />
              </Center>

              <Text color="#5d3915" fontSize="10">
                Profile
              </Text>
            </VStack>
          </Link>
        </HStack>
      </Box>
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
