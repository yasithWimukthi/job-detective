<Box alignItems="center">
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
          The Silicon Valley of India.
        </Text>
      </Stack>

      <HStack alignItems="center" space={4} justifyContent="space-between">
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
</Box>;
