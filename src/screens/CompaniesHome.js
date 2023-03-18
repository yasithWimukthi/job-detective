import React from "react";
import { View, Text, Button } from "native-base";
import { Box, Select, CheckIcon, HStack } from "native-base";
import { ScrollView, VStack, Divider } from "native-base";
import { Wrap } from "native-base";
import { FlatList } from "react-native";
import { Spacer } from "native-base";
import {
  Image,
  AspectRatio,
  Stack,
  Heading,
  Center,
  Container,
} from "native-base";

//function returns two box components with select components inside them with responsive width
export default function CompaniesHome({ navigation }) {
  const [service, setService] = React.useState("ux");
  const [companies, setCompanies] = React.useState([
    {
      id: 1,
      name: "name1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, Provident similique accusantium nemo autem",
      ratings: 4,
      location: "colombo",
      industry: "IT",
    },
    {
      id: 2,
      name: "name2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, Provident similique accusantium nemo autem",
      ratings: 4,
    },
    {
      id: 3,
      name: "name3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, Provident similique accusantium nemo autem",
      ratings: 4,
    },
    {
      id: 4,
      name: "name4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, Provident similique accusantium nemo autem",
      ratings: 4,
    },
    {
      id: 5,
      name: "name5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, Provident similique accusantium nemo autem",
      ratings: 4,
    },
  ]);

  let counter = 0;

  return (
    <View style={{ padding: 10, height: "100%" }}>
      <HStack>
        <Box width="50%" marginRight={1}>
          <Select
            selectedValue={service}
            color="primary.50"
            backgroundColor="primary.700"
            accessibilityLabel="Select Service"
            placeholder="Select Service"
            onValueChange={(itemValue) => setService(itemValue)}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={4} />,
            }}
            borderRadius={8}
          >
            <Select.Item label="UX Design" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Mobile Development" value="mobile" />
            <Select.Item label="Data Science" value="data" />
          </Select>
        </Box>
        <Box width="50%" marginLeft={1}>
          <Select
            selectedValue={service}
            color="primary.50"
            backgroundColor="primary.700"
            accessibilityLabel="Select Service"
            placeholder="Select Service"
            onValueChange={(itemValue) => setService(itemValue)}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={4} />,
            }}
            borderRadius={8}
          >
            <Select.Item label="UX Design" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Mobile Development" value="mobile" />
            <Select.Item label="Data Science" value="data" />
          </Select>
        </Box>
      </HStack>

      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
        mt={7}
      >
        <FlatList
          data={companies}
          renderItem={({ item }) => (
            <Box alignItems="center" width="50%" mb={4} pr={3} ml={1}>
              <Box
                width="100%"
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
                <Box p="2" bg="primary.500" h={10} shadow={4}></Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1">
                      {item.name}
                    </Heading>
                    <Text
                      fontSize="xs"
                      _light={{
                        color: "coolGray.600",
                      }}
                      _dark={{
                        color: "coolGray.200",
                      }}
                      fontWeight="500"
                      ml="-0.5"
                      mt="-1"
                    >
                      {item.description}
                    </Text>
                  </Stack>

                  <HStack
                    alignItems="center"
                    space={4}
                    justifyContent="space-between"
                  >
                    <HStack alignItems="center">
                      <Text
                        color="yellow.500"
                        _dark={{
                          color: "yellow.400",
                        }}
                        fontWeight="800"
                      >
                        {item.ratings} Stars
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Box>
          )}
          numColumns={2}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </View>
  );
}
