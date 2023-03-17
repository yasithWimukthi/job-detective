import React from "react";
import { View, Text, Button } from "react-native";
import { Box, Select, CheckIcon, HStack } from "native-base";
import { Image, AspectRatio, Stack, Heading, Center } from "native-base";

export default function CompaniesHome({ navigation }) {
  const [service, setService] = React.useState("ux");
  return (
    <View>
      <HStack>
        <Box maxW="200">
          <Select
            shadow={2}
            selectedValue={service}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            _light={{
              bg: "coolGray.100",
              _hover: {
                bg: "coolGray.200",
              },
              _focus: {
                bg: "coolGray.200:alpha.70",
              },
            }}
            _dark={{
              bg: "coolGray.800",
              _hover: {
                bg: "coolGray.900",
              },
              _focus: {
                bg: "coolGray.900:alpha.70",
              },
            }}
            onValueChange={(itemValue) => setService(itemValue)}
          >
            <Select.Item shadow={2} label="UX Research" value="ux" />
            <Select.Item shadow={2} label="Web Development" value="web" />
            <Select.Item
              shadow={2}
              label="Cross Platform Development"
              value="cross"
            />
            <Select.Item shadow={2} label="UI Designing" value="ui" />
            <Select.Item
              shadow={2}
              label="Backend Development"
              value="backend"
            />
          </Select>
        </Box>
        <Box maxW="200">
          <Select
            shadow={2}
            selectedValue={service}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            _light={{
              bg: "coolGray.100",
              _hover: {
                bg: "coolGray.200",
              },
              _focus: {
                bg: "coolGray.200:alpha.70",
              },
            }}
            _dark={{
              bg: "coolGray.800",
              _hover: {
                bg: "coolGray.900",
              },
              _focus: {
                bg: "coolGray.900:alpha.70",
              },
            }}
            onValueChange={(itemValue) => setService(itemValue)}
          >
            <Select.Item shadow={2} label="UX Research" value="ux" />
            <Select.Item shadow={2} label="Web Development" value="web" />
            <Select.Item
              shadow={2}
              label="Cross Platform Development"
              value="cross"
            />
            <Select.Item shadow={2} label="UI Designing" value="ui" />
            <Select.Item
              shadow={2}
              label="Backend Development"
              value="backend"
            />
          </Select>
        </Box>
      </HStack>

      <HStack>
        <Box
          maxW="40"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                }}
                alt="image"
              />
            </AspectRatio>
            <Center
              bg="violet.500"
              _dark={{
                bg: "violet.400",
              }}
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
              PHOTOS
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="sm" ml="-1">
                The Garden City
              </Heading>
              <Text
                fontSize="xs"
                _light={{
                  color: "violet.500",
                }}
                _dark={{
                  color: "violet.400",
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                The Silicon Valley of India. The Silicon Valley of India.
              </Text>
            </Stack>

            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                >
                  6 mins ago
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
        <Box
          maxW="40"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                }}
                alt="image"
              />
            </AspectRatio>
            <Center
              bg="violet.500"
              _dark={{
                bg: "violet.400",
              }}
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
              PHOTOS
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="sm" ml="-1">
                The Garden City
              </Heading>
              <Text
                fontSize="xs"
                _light={{
                  color: "violet.500",
                }}
                _dark={{
                  color: "violet.400",
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                The Silicon Valley of India. The Silicon Valley of India.
              </Text>
            </Stack>

            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                >
                  6 mins ago
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </HStack>
    </View>
  );
}
