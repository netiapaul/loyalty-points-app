import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
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
  Spacer,
  Spinner,
} from 'native-base';
import * as Keychain from 'react-native-keychain';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const Transactions = ({route, navigation}) => {
  const {token, memberNo} = route.params;
  const [users, setUser] = useState([]);
  const [status, setStatus] = useState('');
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    handleFetch();
    console.warn(users);
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
        setIsLoading(false);
      } else {
        setIsLoading(false);
        return navigation.goBack();
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
          <ScrollView>
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
                        transdate: user.SALEDATE,
                      })
                    }>
                    <HStack>
                      <VStack>
                        <Text
                          // color="#5d3915"
                          color="#ff720d"
                          fontSize={12}>
                          {new Date(user.SALEDATE).toDateString()}
                        </Text>
                        <Text
                          color={'muted.800'}
                          fontWeight="bold"
                          fontSize={15}>
                          {user.DOCNUM}
                        </Text>
                        <Text
                          color={'light.600'}
                          fontWeight="bold"
                          fontSize={15}>
                          {user.SALESBRANCH}
                        </Text>
                      </VStack>
                    </HStack>
                    <Spacer />
                    <Center>
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
          //  </Box>
        )}

        <VStack bg={'#fff'} justifyContent="flex-end">
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
            <Text fontSize="10" fontWeight="bold" color="#5d3915" mx="10">
              Corebase Solutions
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
