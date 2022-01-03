import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
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
  Link,
  Avatar,
  Spacer,
} from 'native-base';
import * as Keychain from 'react-native-keychain';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const Transactions = ({route, navigation}) => {
  const {token, memberNo} = route.params;
  const [users, setUser] = useState([]);

  useEffect(() => {
    handleFetch();
    console.warn(users);
    // console.warn('users', users);
    // return () => {
    //   cleanup
    // }
  }, []);

  const handleFetch = () => {
    const request = `http://102.37.102.247:5016/CustomerPoints/GetCustomerTransactions?memberNo=${memberNo}`;

    fetch(request, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(response => {
        setUser(JSON.parse(response));
      })
      .catch(() => console.warn('please connect to available network'));
  };

  return (
    <NativeBaseProvider config={config} bg="#fff">
      {/* <HStack
        bg="#fff"
        p="5"
        justifyContent="space-between"
        alignItems="center">
        <Text color="#5d3915" fontSize="20" fontWeight="bold">
          Transactions & Points
        </Text>
      </HStack> */}
      <Box flex={1} bg="#fff">
        <ScrollView>
          {/* Activity Items */}

          {users.map((user, index) => {
            return (
              <Box
                p="5"
                mt={2}
                mx="2"
                bg="muted.50"
                key={index}
                borderRadius="md"
                borderColor="coolGray.200"
                onPress={() => console.warn('pressed')}
                borderWidth="1"
                shadow={1}>
                <Link
                  onPress={() =>
                    navigation.navigate('transactiondetails', {
                      token,
                      memberNo: memberNo,
                      docNum: user.DOCNUM,
                      salesBCODE: user.SALESBCODE,
                      branch: user.SALESBRANCH,
                      gain: user.MEMPOINTSBUY,
                      redeemed: user.MEMPOINTSREDEEM,
                    })
                  }>
                  <HStack>
                    <VStack>
                      <Text
                        // color="#5d3915"
                        color="#ff720d"
                        fontSize={12}>
                        {new Date(user.SALEDATE).toLocaleDateString()}
                      </Text>
                      <Text color={'muted.800'} fontWeight="bold" fontSize={15}>
                        {user.DOCNUM}
                      </Text>
                      <Text color={'light.600'} fontWeight="bold" fontSize={15}>
                        {user.SALESBRANCH}
                      </Text>
                      {/* <Text
                        color="#5d3915"
                        ml={3}
                        fontWeight="bold"
                        fontSize={15}>
                        Total Items Bought: {user.ItemCount}
                      </Text>

                       <HStack my={2}>
                        <Text color="success.600" ml={3} fontWeight="bold">
                          Received: {user.MEMPOINTSBUY}
                        </Text>
                        <Text color="danger.600" ml={3} fontWeight="bold">
                          Redeemed: {user.MEMPOINTSREDEEM}
                        </Text>
                      </HStack> */}
                    </VStack>
                  </HStack>
                  <Spacer />
                  <Center>
                    {/* <Avatar bg="success.500" size="md">
                      {user.SALESBRANCH.match(/\b([A-Z])/g).join('')}
                    </Avatar> */}
                    <Text color="success.600" ml={3} fontWeight="bold">
                      {user.MEMPOINTSBUY.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ',',
                      )}
                    </Text>
                    <Text color="danger.600" ml={3} fontWeight="bold">
                      {user.MEMPOINTSREDEEM.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ',',
                      )}
                    </Text>
                  </Center>
                </Link>
              </Box>
            );
          })}
        </ScrollView>

        {/* <HStack
          shadow={2}
          bg="#fff"
          p="2"
          justifyContent="flex-end"
          justifyContent="space-between"
          alignItems="center">
          <Link onPress={() => navigation.navigate('different', {token})}>
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
          </Link>

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
                  name="bank"
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
        </HStack> */}
      </Box>

      <VStack flex={1} bg={'#fff'} justifyContent="flex-end">
        <Center>
          <Text fontSize="xs" mx="10">
            Powered by
          </Text>
          <Image
            style={styles.image}
            source={require('../assets/images/pcico.png')}
            alt="Company Logo"
            size="xs"
          />
          {/* <Text fontSize="xs" fontWeight="bold" color="#5d3915" mx="10">
            Corebase Solutions
          </Text> */}
        </Center>
      </VStack>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  noBackGround: {
    opacity: 1,
  },
  image: {
    maxWidth: 20,
    maxHeight: 20,
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

export default Transactions;
