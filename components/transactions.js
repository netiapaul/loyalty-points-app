import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {
  NativeBaseProvider,
  VStack,
  Center,
  Heading,
  Image,
  Box,
  Alert,
  Text,
  HStack,
  Pressable,
  Link,
  Avatar,
  Divider,
  Spacer,
  Spinner,
} from 'native-base';
import * as Keychain from 'react-native-keychain';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const Transactions = ({route, navigation}) => {
  const {token, memberNo} = route.params;
  const [users, setUser] = useState([]);
  const [status, setStatus] = useState('');
  const [isloading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    handleFetch();
    console.warn(users);
    console.warn(window);
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleFetch();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  async function handleFetch() {
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
        setUser(JSON.parse(data));
        return setIsLoading(false);
      } else {
        return navigation.goBack();
      }
    } catch (error) {
      // setIsLoading(false);
      return Snackbar.show({
        backgroundColor: '#e11d48',
        text: 'Network request failed connect to the internet',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

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
                    Connect to an internet connection
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

        {isloading ? (
          <Center flex={1}>
            <Spinner size="lg" color="warning.500" />
          </Center>
        ) : (
          // <Box flex={1} bg="#fff">
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {users.map((user, index) => {
              return (
                // <Box
                //   p="5"
                //   mt={2}
                //   mx="2"
                //   bg="muted.50"
                //   key={index}
                //   borderRadius="sm"
                //   borderColor="coolGray.200"
                //   borderWidth="1"
                //   shadow={1}>
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
                      transdate: user.SALEDATE,
                    })
                  }>
                  <Box style={styles.transactions} key={index} mt={5} mx={5}>
                    <HStack bg={'#fff'} justifyContent="space-between">
                      <VStack>
                        <Text
                          color={'muted.800'}
                          fontWeight="600"
                          fontSize={'sm'}>
                          {user.DOCNUM}
                        </Text>
                        <HStack>
                          <Text
                            color={'muted.800'}
                            fontWeight="400"
                            style={styles.myText}
                            // fontSize={'8'}
                          >
                            {new Date(user.SALEDATE).toDateString()}
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
                            style={styles.myText}
                            // fontSize={'8'}
                          >
                            {user.SALESBRANCH}
                          </Text>
                        </HStack>
                      </VStack>
                      {/* <Spacer /> */}
                      <VStack>
                        <Text
                          color={'muted.800'}
                          fontWeight="600"
                          fontSize={'sm'}>
                          Kshs.
                          {user.Itmtotalinc.toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Text>
                        <HStack space={3}>
                          <Text
                            color="success.600"
                            fontWeight="400"
                            style={styles.myText}>
                            Earned:{' '}
                            {user.MEMPOINTSBUY.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ',',
                            )}
                          </Text>

                          <Text
                            color="danger.600"
                            fontWeight="400"
                            style={styles.myText}>
                            Redeemed:{' '}
                            {user.MEMPOINTSREDEEM.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ',',
                            )}
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Divider my={1} />
                  </Box>
                </Link>
                // {/* </Box> */}
              );
            })}
          </ScrollView>
          //  </Box>
        )}

        <VStack bg={'#fff'} justifyContent="flex-end">
          <Center>
            <Text fontSize="2xs" mx="10">
              Powered by
            </Text>
            <Image
              style={styles.image}
              source={require('../assets/images/corebase.png')}
              alt="Company Logo"
              size="2xs"
            />
            <Text fontSize="2xs" fontWeight="bold" color="#5d3915" mx="10">
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
  transactions: {
    width: wp('90%'),
  },
  myText: {
    fontSize: hp('1.2%'), // End result looks like the provided UI mockup
  },
  smallText: {
    fontSize: hp('1.2%'), // End result looks like the provided UI mockup
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
