import React from "react";
import {
  View,
  Text,
  Box,
  Select,
  CheckIcon,
  HStack,
  Stack,
  Heading,
} from "native-base";
import { Button, FlatList, TouchableOpacity } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { firebase } from "../../firebaseConfig";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useRef } from "react";

export default function MyCompaniesHome({ navigation, route }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [companies, setCompanies] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState();
  const [selectedIndustry, setSelectedIndustry] = React.useState();

  const [locations, setLocations] = React.useState([]);
  const [industries, setIndustries] = React.useState([]);
  const isFocused = useIsFocused();

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
    if (isFocused) {
      // Reload your data here
      getCompanies();
    }
  }, [isFocused]);

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

  // //function to delete a company
  // const deleteCompany = async (id) => {
  //   try {
  //     await firebase.firestore().collection("companies").doc(id).delete();
  //     getCompanies();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //function to navigate to edit company page with company details
  const editCompany = (company) => {
    navigation.navigate("Edit Company", { company });
  };

  return (
    <View style={{ padding: 10, height: "100%" }}>
      <HStack>
        <Box width="49%" marginRight={1}>
          <Select
            height="45"
            selectedValue={selectedLocation}
            // backgroundColor="primary.900"
            color="black"
            backgroundColor="#c4c4c4"
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
        <Box width="49%" marginLeft={1}>
          <Select
            height="45"
            selectedValue={selectedIndustry}
            color="black"
            backgroundColor="#c4c4c4"
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
                borderColor="white"
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
                <Box p="2" bg="#1253bc" h={10} shadow={4}>
                  <FontAwesome5
                    style={{ position: "absolute", right: 10, top: 10 }}
                    name="edit"
                    size={20}
                    color="#bfbfbf"
                    onPress={() => editCompany(item)}
                  ></FontAwesome5>
                </Box>
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
                        {Array.from(Array(Math.round(item.ratings)), (e, i) => (
                          <FontAwesome
                            key={i}
                            name="star"
                            size={15}
                            color="orange"
                          ></FontAwesome>
                        ))}
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
