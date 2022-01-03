import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  NativeBaseProvider,
  VStack,
  Center,
  Alert,
  Box,
  Text,
  HStack,
  Spacer,
  Divider,
  Image,
} from 'native-base';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const SalesTransaction = ({route, navigation}) => {
  const {token, memberNo, docNum, salesBCODE, branch, gain, redeemed} =
    route.params;
  const [users, setUser] = useState([]);
  const [status, setstatus] = useState('');
  const [branchName, setBranchName] = useState('');
  const [gainpts, setgainpts] = useState('');
  const [redeemedpts, setredeemedpts] = useState('');

  useEffect(() => {
    handleFetch();
    setBranchName(branch);
    setgainpts(gain);
    setredeemedpts(redeemed);
    console.warn(users);
    return () => {
      return setstatus('');
    };
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
      .catch(() => setstatus('please connect to a working network'));
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
        p="5"
        justifyContent="space-between"
        alignItems="center">
        <Center mx={'auto'}>
          <VStack>
            <Text color="#5d3915" fontSize="20" fontWeight="bold">
              Total Cost:{' '}
              {users
                .reduce((previousValue, curr) => {
                  return previousValue + curr.totalCost;
                }, 0)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>

            <VStack mx={'auto'}>
              <Text color="success.600" ml={3} fontWeight="bold">
                {gainpts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
              <Text color="danger.600" ml={3} fontWeight="bold">
                {redeemedpts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </VStack>
          </VStack>
        </Center>
      </HStack>

      <Box p="2" flex={1} bg="#fff">
        <ScrollView>
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
                <VStack>
                  {/* <Center>
                    <Text fontWeight="bold">{user.itmname}</Text>
                    <Divider my="2" />
                  </Center> */}

                  <HStack>
                    <Text
                      color="#5d3915"
                      fontSize={15}
                      my={1}
                      fontWeight="bold">
                      Item Code:{' '}
                    </Text>
                    <Spacer />
                    <Text color="#5d3915" fontSize={15} my={1}>
                      {user.itmcode}
                    </Text>
                  </HStack>

                  <HStack>
                    <Text
                      color="#5d3915"
                      fontSize={15}
                      my={1}
                      fontWeight="bold">
                      Item Name:{' '}
                    </Text>
                    <Spacer />
                    <Text color="#5d3915" fontSize={15} my={1}>
                      {user.itmname}
                    </Text>
                  </HStack>

                  <HStack>
                    <Text
                      color="#5d3915"
                      fontSize={15}
                      my={1}
                      fontWeight="bold">
                      Total Quantity:{' '}
                    </Text>
                    <Spacer />
                    <Text color="#5d3915" fontSize={15} my={1}>
                      {user.quantity}
                    </Text>
                  </HStack>

                  <HStack>
                    <Text
                      fontWeight="bold"
                      color="#5d3915"
                      fontSize={15}
                      my={1}>
                      Item Cost:{' '}
                    </Text>
                    <Spacer />
                    <Text color="#5d3915" fontSize={15} my={1}>
                      {user.totalCost.toFixed(2)}
                    </Text>
                  </HStack>

                  {/* <HStack my={1}>
                    <Text color="success.600" fontWeight="bold">
                      Received: {user.mempointsbuy}
                    </Text>
                    <Spacer />
                    <Text color="danger.600" ml={2} fontWeight="bold">
                      Redeemed: {user.mempointsredeem}
                    </Text>
                  </HStack> */}

                  <HStack my={1}>
                    {/* <Text
                      // color="#5d3915"
                      color={'muted.500'}
                      fontSize={11}
                      fontWeight="bold">
                      Date:{' '}
                    </Text> */}
                    <Text color={'muted.500'} fontSize={12}>
                      {/* {new Date(user.saledate + 'Z').toUTCString()} */}
                      {new Date(user.saledate).toLocaleDateString()}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            );
          })}
        </ScrollView>
        {/* {users.map((user, index) => {
          return (
            <HStack my={1} key={index}>
              <Text color="success.600" fontWeight="bold">
                Received: {user.mempointsbuy}
              </Text>
              <Spacer />
              <Text color="danger.600" ml={2} fontWeight="bold">
                Redeemed: {user.mempointsredeem}
              </Text>
              <Text>{+user.totalCost}</Text>
            </HStack>
          );
        })} */}
        {/* <HStack>
          <Text>Total Cost:</Text>
          <Text>
            {users.reduce((previousValue, curr) => {
              return previousValue + curr.totalCost;
            }, 0)}
          </Text>
        </HStack> */}

        <VStack justifyContent="flex-end">
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
      </Box>
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
  rightArrow: {
    width: 30,
    height: 30,
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

export default SalesTransaction;
