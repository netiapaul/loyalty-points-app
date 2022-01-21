import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
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
  Spinner,
} from 'native-base';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Snackbar from 'react-native-snackbar';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const SalesTransaction = ({route, navigation}) => {
  const {
    token,
    memberNo,
    docNum,
    salesBCODE,
    branch,
    gain,
    redeemed,
    transdate,
  } = route.params;
  const [users, setUser] = useState([]);
  const [status, setstatus] = useState('');
  const [branchName, setBranchName] = useState('');
  const [gainpts, setgainpts] = useState('');
  const [redeemedpts, setredeemedpts] = useState('');
  const [date, setDate] = useState('');
  const [isloading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    handleFetch();
    setBranchName(branch);
    setgainpts(gain);
    setredeemedpts(redeemed);
    setDate(transdate);
    // console.warn(users);
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  async function handleFetch() {
    try {
      const response = await fetch(
        `http://102.37.102.247:5016/CustomerPoints/GetTransactionDetails?salesBcode=${salesBCODE}&docNum=${docNum}&memberNumber=${memberNo}`,
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
        setUser(data);
        return setIsLoading(false);
      } else {
        // setIsLoading(false);
        return navigation.goBack();
      }
    } catch (error) {
      return Snackbar.show({
        backgroundColor: '#e11d48',
        text: 'Network request failed connect to the internet',
        duration: Snackbar.LENGTH_LONG,
      });
    }

    // const request = `http://102.37.102.247:5016/CustomerPoints/GetTransactionDetails?salesBcode=${salesBCODE}&docNum=${docNum}&memberNumber=${memberNo}`;

    // fetch(request, {
    //   method: 'GET',
    //   headers: new Headers({
    //     Authorization: `Bearer ${token}`,
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   }),
    // })
    // .then(response => response.json())
    // .then(response => {
    //   setUser(response);
    // })
    // .catch(() => setstatus('please connect to a working network'));
  }

  return (
    <NativeBaseProvider config={config}>
      <Box flex={1} bg={'#fff'}>
        {/* {status ? (
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
        ) : null} */}

        {isloading ? (
          <Center flex={1}>
            <Spinner size="lg" color="warning.500" />
          </Center>
        ) : (
          <>
            <HStack
              bg="#fff"
              p="2"
              justifyContent="space-between"
              alignItems="center">
              <Center mx={'auto'}>
                <Text mx={'auto'} fontWeight={'500'} color={'#5d3915'}>
                  {docNum}
                </Text>
                <VStack>
                  <HStack>
                    <Text mx={'auto'} color={'muted.500'}>
                      {date ? new Date(date).toDateString() : null}
                    </Text>
                    <Center>
                      <Divider
                        orientation="vertical"
                        h={3}
                        bg={'muted.500'}
                        mx={1}
                      />
                    </Center>
                    <Center>
                      <Text color={'muted.500'} fontWeight="400" fontSize={10}>
                        {branchName}
                      </Text>
                    </Center>
                  </HStack>
                  {/* <Text mx={'auto'} color={'muted.500'}>
                    {date ? new Date(date).toDateString() : null}
                  </Text> */}
                  <Text color="#5d3915" mx={'auto'} fontWeight={500}>
                    Kshs:{' '}
                    {users
                      .reduce((previousValue, curr) => {
                        return previousValue + curr.totalCost;
                      }, 0)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>

                  <Center>
                    <HStack space={3}>
                      <HStack>
                        <Text>Earned: </Text>
                        <Text color="success.600">
                          {gainpts
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text>Redeemed: </Text>

                        <Text color="danger.600">
                          {redeemedpts
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Text>
                      </HStack>
                    </HStack>
                  </Center>
                </VStack>
              </Center>
            </HStack>
            <Divider my={2} />

            {/* SCROLLVIEW */}
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {users.map((user, index) => {
                return (
                  // <Box
                  //   p="3"
                  //   m="2"
                  //   bg="muted.50"
                  //   key={index}
                  //   borderRadius="md"
                  //   borderColor="coolGray.200"
                  //   borderWidth="1"
                  //   shadow={3}>
                  <Box mx={'5'}>
                    <VStack>
                      <HStack>
                        <VStack>
                          <Text
                            color="#5d3915"
                            fontSize={'sm'}
                            // fontSize={15}
                            my={1}
                            fontWeight={500}>
                            {user.itmname}
                          </Text>
                          <HStack>
                            <Text
                              color={'muted.500'}
                              fontSize={14}
                              mb={1}
                              fontWeight={400}>
                              {user.itmcode}
                            </Text>
                            <Spacer />
                            <Text color={'muted.500'} fontSize={14}>
                              Qty: {user.quantity}
                            </Text>
                          </HStack>
                        </VStack>

                        <Spacer />
                        <Text
                          color="#5d3915"
                          // style={{fontSize: RFValue(9.5, 580)}}
                          // fontSize={9}
                          my={1}>
                          {user.totalCost.toFixed(2)}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                );
              })}
              <Divider my={2} />
            </ScrollView>
          </>
        )}

        <VStack justifyContent="flex-end" bg={'#fff'}>
          <Center>
            <Text fontSize="xs" mx="10">
              Powered by
            </Text>
            <Image
              style={styles.image}
              source={require('../assets/images/corebase.png')}
              alt="Company Logo"
              size="xs"
            />
            <Text fontSize="10" fontWeight="bold" color="#5d3915" mx="10">
              CoreBase Solutions
            </Text>
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
    maxWidth: 15,
    maxHeight: 15,
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
