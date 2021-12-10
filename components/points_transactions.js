import React from 'react';
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
} from 'native-base';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const PointsTransaction = ({navigation}) => {
  return (
    <NativeBaseProvider config={config}>
      {/* <HStack
        bg="#fff"
        p="5"
        justifyContent="space-between"
        alignItems="center">
        <Text color="#5d3915" fontSize="20" fontWeight="bold">
          Points Transactions
        </Text>
      </HStack> */}
      <ScrollView>
        <VStack>
          <Box bg="#fff" p="5" justifyContent="center">
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
                  </Center>

                  <Spacer />
                  <Center>
                    <Image
                      source={require('../assets/images/right-arrow.png')}
                      alt="company logo"
                      style={styles.rightArrow}
                      size="sm"
                    />
                  </Center>
                </HStack>
              </Box>

              <Box
                p="5"
                m="2"
                bg="muted.50"
                borderRadius="md"
                borderColor="coolGray.200"
                borderWidth="1"
                shadow={3}>
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
                  </Center>

                  <Spacer />
                  <Center>
                    <Image
                      source={require('../assets/images/right-arrow.png')}
                      alt="company logo"
                      style={styles.rightArrow}
                      size="sm"
                    />
                  </Center>
                </HStack>
              </Box>

              <Box
                p="5"
                m="2"
                bg="muted.50"
                borderRadius="md"
                borderColor="coolGray.200"
                borderWidth="1"
                shadow={3}>
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
                  </Center>

                  <Spacer />
                  <Center>
                    <Image
                      source={require('../assets/images/right-arrow.png')}
                      alt="company logo"
                      style={styles.rightArrow}
                      size="sm"
                    />
                  </Center>
                </HStack>
              </Box>

              <Box
                p="5"
                m="2"
                bg="muted.50"
                borderRadius="md"
                borderColor="coolGray.200"
                borderWidth="1"
                shadow={3}>
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
                  </Center>

                  <Spacer />
                  <Center>
                    <Image
                      source={require('../assets/images/right-arrow.png')}
                      alt="company logo"
                      style={styles.rightArrow}
                      size="sm"
                    />
                  </Center>
                </HStack>
              </Box>

              <Box
                p="5"
                m="2"
                bg="muted.50"
                borderRadius="md"
                borderColor="coolGray.200"
                borderWidth="1"
                shadow={3}>
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
                  </Center>

                  <Spacer />
                  <Center>
                    <Image
                      source={require('../assets/images/right-arrow.png')}
                      alt="company logo"
                      style={styles.rightArrow}
                      size="sm"
                    />
                  </Center>
                </HStack>
              </Box>

              <Box
                p="5"
                m="2"
                bg="muted.50"
                borderRadius="md"
                borderColor="coolGray.200"
                borderWidth="1"
                shadow={3}>
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
                  </Center>

                  <Spacer />
                  <Center>
                    <Image
                      source={require('../assets/images/right-arrow.png')}
                      alt="company logo"
                      style={styles.rightArrow}
                      size="sm"
                    />
                  </Center>
                </HStack>
              </Box>

              <Box
                p="5"
                m="2"
                bg="muted.50"
                borderRadius="md"
                borderColor="coolGray.200"
                borderWidth="1"
                shadow={3}>
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
                  </Center>

                  <Spacer />
                  <Center>
                    <Image
                      source={require('../assets/images/right-arrow.png')}
                      alt="company logo"
                      style={styles.rightArrow}
                      size="sm"
                    />
                  </Center>
                </HStack>
              </Box>

              <Box
                borderColor="coolGray.200"
                p="5"
                m="2"
                bg="muted.50"
                borderRadius="md"
                borderWidth="1"
                shadow={3}>
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
                  </Center>

                  <Spacer />
                  <Center>
                    <Image
                      source={require('../assets/images/right-arrow.png')}
                      alt="company logo"
                      style={styles.rightArrow}
                      size="sm"
                    />
                  </Center>
                </HStack>
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
      </ScrollView>
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

export default PointsTransaction;
