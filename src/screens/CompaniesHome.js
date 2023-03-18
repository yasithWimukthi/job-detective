import React, { useEffect } from "react";
import { View, Text, Button } from "native-base";
import { Box, Select, CheckIcon, HStack } from "native-base";
import { ScrollView, VStack, Divider } from "native-base";
import { Wrap } from "native-base";
import { FlatList } from "react-native";
import { Modal, FormControl, Input } from "native-base";
import {
  Image,
  AspectRatio,
  Stack,
  Heading,
  Center,
  Container,
} from "native-base";
import { FloatingAction } from "react-native-floating-action";
import { FontAwesome5 } from "@expo/vector-icons";
import { firebase } from "../../firebaseConfig";
//function returns two box components with select components inside them with responsive width
export default function CompaniesHome({ navigation }) {
  // const [service, setService] = React.useState("ux");
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [companies, setCompanies] = React.useState([
    // {
    //   id: 1,
    //   name: "name1",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, Provident similique accusantium nemo autem",
    //   ratings: 4,
    //   location: "colombo",
    //   industry: "IT",
    // },
  ]);
  const [selectedLocation, setSelectedLocation] = React.useState();
  const [selectedIndustry, setSelectedIndustry] = React.useState();

  const [locations, setLocations] = React.useState([]);
  const [industries, setIndustries] = React.useState([]);

  //get companies from firebase and set to companies state
  const getCompanies = async () => {
    try {
      const companies = await firebase
        .firestore()
        .collection("companies")
        .get();
      const companiesArray = companies.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCompanies(companiesArray);
      setLocations(
        companiesArray
          .map((company) => company.location)
          .filter((v, i, a) => a.indexOf(v) === i)
      );
      setIndustries(
        companiesArray
          .map((company) => company.industry)
          .filter((v, i, a) => a.indexOf(v) === i)
      );
    } catch (error) {
      console.log(error);
    }
  };

  //create useEffect to get companies from firebase
  React.useEffect(() => {
    getCompanies();
  }, []);

  let counter = 0;

  //function to filter companies based on location and industry
  const filterCompanies = () => {
    if (selectedLocation && selectedIndustry) {
      return companies.filter(
        (company) =>
          company.location === selectedLocation &&
          company.industry === selectedIndustry
      );
    } else if (selectedLocation) {
      return companies.filter(
        (company) => company.location === selectedLocation
      );
    } else if (selectedIndustry) {
      return companies.filter(
        (company) => company.industry === selectedIndustry
      );
    } else {
      return companies;
    }
  };

  return (
    <View style={{ padding: 10, height: "100%" }}>
      <HStack>
        <Box width="50%" marginRight={1}>
          <Select
            height="45"
            selectedValue={selectedLocation}
            color="primary.50"
            backgroundColor="primary.900"
            accessibilityLabel="Select a Location"
            placeholder="Select a Location"
            onValueChange={(itemValue) => setSelectedLocation(itemValue)}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={4} />,
            }}
            borderRadius={8}
          >
            <Select.Item label="None" value="" />
            {locations.map((location) => (
              <Select.Item key={location} label={location} value={location} />
            ))}
          </Select>
        </Box>
        <Box width="50%" marginLeft={1}>
          <Select
            height="45"
            selectedValue={selectedIndustry}
            color="primary.50"
            backgroundColor="primary.900"
            accessibilityLabel="Select an Industry"
            placeholder="Select an Industry"
            onValueChange={(itemValue) => setSelectedIndustry(itemValue)}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={4} />,
            }}
            borderRadius={8}
          >
            <Select.Item label="None" value="" />
            {industries.map((industry) => (
              <Select.Item key={industry} label={industry} value={industry} />
            ))}
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
          data={filterCompanies()}
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
                <Box p="2" bg="primary.600" h={10} shadow={4}></Box>
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
      <FloatingAction
        onPressMain={() => {
          navigation.navigate("Add New Company");
        }}
        color="#155e75"
      />
    </View>
  );
}
