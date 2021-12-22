import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, ScrollView} from 'react-native';
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
  Divider,
  Spacer,
  Avatar,
} from 'native-base';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const SalesTransaction = ({route, navigation}) => {
  const {token, memberNo, docNum, salesBCODE} = route.params;
  const [users, setUser] = useState([]);

  useEffect(() => {
    handleFetch();

    // console.warn('users', users);
    // return () => {
    //   cleanup
    // }
  }, []);

  const handleFetch = () => {
    const request = `http://102.37.102.247:5016/CustomerPoints/GetTransactionDetails?salesBcode=${salesBCODE}&docNum=${docNum}&memberNumber=${memberNo}`;

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
        setUser(response);
      })
      .catch(err => console.warn('please connect to available network'));
  };

  return (
    <NativeBaseProvider config={config}>
      <ScrollView>
        <VStack>
          {users.map((user, index) => {
            return (
              <Box
                p="5"
                m="2"
                bg="muted.50"
                key={index}
                borderRadius="md"
                borderColor="coolGray.200"
                borderWidth="1"
                shadow={3}>
                <HStack>
                  <VStack p={3}>
                    <Center my={1}>
                      <Text
                        color="#5d3915"
                        ml={3}
                        fontWeight="bold"
                        fontSize={15}>
                        Item Bought: {user.itmname}
                      </Text>
                    </Center>

                    <Center my={1}>
                      <Text
                        color="#5d3915"
                        ml={3}
                        fontWeight="bold"
                        fontSize={15}>
                        Total Item Cost: {user.totalCost} ksh
                      </Text>
                    </Center>

                    <Center my={1}>
                      <HStack>
                        <Text color="success.600" ml={3} fontWeight="bold">
                          Received: {user.mempointsbuy}
                        </Text>
                        <Text color="danger.600" ml={3} fontWeight="bold">
                          Redeemed: {user.mempointsredeem}
                        </Text>
                      </HStack>
                    </Center>
                    <Center my={1}>
                      <Text color="#5d3915" ml={3} fontSize={12}>
                        Date: {user.saledate}
                      </Text>
                    </Center>
                  </VStack>
                </HStack>
              </Box>
            );
          })}
        </VStack>
      </ScrollView>
      <VStack flex={1} justifyContent="flex-end" mt="2">
        <Center>
          <Text fontSize="xs" mx="10">
            Powered by
          </Text>
          <Text fontSize="xs" fontWeight="bold" color="#5d3915" mx="10">
            Corebase Solutions
          </Text>
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

export default SalesTransaction;
