import React, { useEffect, useState } from 'react';
import { Center, NativeBaseProvider, Checkbox, Select, CheckIcon, Input, WarningOutlineIcon, VStack, ScrollView, AspectRatio, Image, Stack, HStack, FormControl, Container, Button, StatusBar, Heading, Box, Text, } from 'native-base';
import firestore from '@react-native-firebase/firestore';

const OpenTaskActivity = ({ navigation, route }) => {
    const { id, date } = route.params;
    let [service, setService] = React.useState("");
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        await firestore()
            .collection(date)
            .doc(id)
            .get()
            .then(ele => {
                setData(ele);
                console.log(ele);
                setLoading(false);
            });
    }
  


    return (
        <>
            <NativeBaseProvider>
                {loading ? <Text>Loading ... :)</Text> :
                    <>
                       <ScrollView bgColor={"white"}>
                            <Box w="94%">
                                <Box w="100%">
                                    <Box w="100%" p="3" m="3" rounded="lg" _dark={{}} _light={{
                                       
                                    }}>
                                        <Heading>
                                            {data._data.id === undefined ? null : data._data.id}
                                        </Heading>
                                        <Text fontSize="md">
                                            {data._data.date}
                                        </Text>
                                        <Container mt="5" mb="5">
                                            <HStack space={2} mb="3">
                                                <Text w="50%" fontSize="md">WorkStation          :</Text>
                                                <Text w="50%" fontSize="md">
                                                    {data._data.workstation=== undefined ?null:data._data.workstation.slice(-1)}
                                                </Text>
                                            </HStack>
                                            <HStack space={2} mb="3">
                                                <Text w="50%" fontSize="md">Model                     :</Text>
                                                <Text w="50%" fontSize="md">
                                                    {data._data.substation === undefined ?null:data._data.substation}
                                                </Text>
                                            </HStack>
                                            <HStack space={2} mb="3">
                                                <Text w="50%" fontSize="md">Planned Count      :</Text>
                                                <Text w="50%" fontSize="md">
                                                    {data._data.count === undefined ?null:data._data.count}
                                                </Text>
                                            </HStack>
                                            <HStack space={2} mb="3">
                                                <Text w="50%" fontSize="md">Planned Time        :</Text>
                                                <Text w="50%" fontSize="md">
                                                    {data._data.hr === undefined ?null:data._data.hr+"hr "+data._data.min+"min"}
                                                </Text>
                                            </HStack>
                                        </Container>
                                        <FormControl isInvalid w="100%" mb="5">
                                            <Box mb="3">
                                                <FormControl.Label>Actual Count</FormControl.Label>
                                                <Input placeholder="Enter Actual Count" />{true ? null :
                                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                                        *Needed.
                                                    </FormControl.ErrorMessage>}
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
                        </ScrollView></>
                }
            </NativeBaseProvider>

        </>
    )
}

export default OpenTaskActivity;