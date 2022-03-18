import React from 'react';
import { Center, NativeBaseProvider, Checkbox, Select, CheckIcon, Input, WarningOutlineIcon, VStack, ScrollView, AspectRatio, Image, Stack, HStack, FormControl, Container, Button, StatusBar, Heading, Box, Text, } from 'native-base';


const OpenTaskActivity = () => {
    let [service, setService] = React.useState("");
    return (
        <>
            <NativeBaseProvider >
                <Button w="100" size="sm" mt="3" mb="3" variant="ghost">
                    Go Back
                </Button>
                
                <ScrollView >
                <Box w="94%">
                    <Box w="100%" >
                        <Box w="100%" p="3" m="3" rounded="lg" _dark={{
                        }} _light={{
                            backgroundColor: "gray.50"
                        }}>
                            <Heading >#1234566</Heading>
                            <Text fontSize="md" >29 jan 2022</Text>
                            <Container mt="5" mb="5">
                                <HStack space={2} mb="3" >
                                    <Text w="50%" fontSize="md">WorkStation          :</Text>
                                    <Text w="50%" fontSize="md">1</Text>
                                </HStack>
                                <HStack space={2} mb="3">
                                    <Text w="50%" fontSize="md">Model                     :</Text>
                                    <Text w="50%" fontSize="md">small</Text>
                                </HStack>
                                <HStack space={2} mb="3">
                                    <Text w="50%" fontSize="md">Planned Count      :</Text>
                                    <Text w="50%" fontSize="md">55</Text>
                                </HStack>
                                <HStack space={2} mb="3">
                                    <Text w="50%" fontSize="md">Planned Time        :</Text>
                                    <Text w="50%" fontSize="md">10 hr 20min</Text>
                                </HStack>
                            </Container>
                            <FormControl isInvalid w="100%" mb="5" >
                                <Box mb="3">
                                    <FormControl.Label>Actual Count</FormControl.Label>
                                    <Input placeholder="Enter Actual Count" />
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        *Needed.
                                    </FormControl.ErrorMessage>
                                </Box>
                                <Box mb="3">
                                    <FormControl.Label>Actual Time</FormControl.Label>
                                    <Input placeholder="Enter Actual Time" />
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        *Needed.
                                    </FormControl.ErrorMessage>
                                </Box>
                                <Box mb="3">
                                    <FormControl.Label>Reason</FormControl.Label>
                                    <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                        <Select.Item label="UX Research" value="ux" />
                                        <Select.Item label="Web Development" value="web" />
                                        <Select.Item label="Cross Platform Development" value="cross" />
                                        <Select.Item label="UI Designing" value="ui" />
                                        <Select.Item label="Backend Development" value="backend" />
                                    </Select>
                                </Box>
                            </FormControl>
                        </Box>
                        <Button w="98%" m="4" onPress={() => console.log("hello world")}>Submit</Button>
                    </Box>
                </Box>
                </ScrollView>
            </NativeBaseProvider>

        </>
    )
}

export default OpenTaskActivity;