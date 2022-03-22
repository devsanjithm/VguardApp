import React, { useEffect, useState } from 'react';
import { Center, Spinner, NativeBaseProvider, Modal, Checkbox, Select, CheckIcon, Input, WarningOutlineIcon, VStack, ScrollView, AspectRatio, Image, Stack, HStack, FormControl, Container, Button, StatusBar, Heading, Box, Text, } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const OpenTaskActivity = ({ navigation, route }) => {
    const { id, date } = route.params;
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [actualCount, setactualcount] = useState();
    const [actualhr, setactualhr] = useState();
    const [actualmin, setactualmin] = useState();
    const [reason, setreason] = useState("");
    const [getReasons, setgetReasons] = useState([]);
    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const formValues = [];
        const da = await firestore()
            .collection(date)
            .doc(id)
            .get()
            .then(ele => {
                setData(ele);
                setLoading(false);
            })

        await firestore()
            .collection("Reasons")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    formValues.push(documentSnapshot.data().reason);
                });
            });
        setgetReasons(formValues);
    }


    async function handleSubmit() {
        let ActualCount = actualCount
        let ActualTime = actualhr + "hr " + actualmin + "mins"

        if (ActualCount.length === 0 && ActualTime.length === 0) {
            return;
        }
        const dataupdate = await firestore()
            .collection(date)
            .doc(id)
            .set({
                actualCount: ActualCount,
                actualTime: ActualTime,
                Reason: reason,
                status: "Completed"
            }, { merge: true })
            .then(res => {
                console.log("Data Updated SuccessFully");
                Alert.alert("Data Updated SuccessFully");
            })
            .catch(err => {
                console.error("error", err);
            })
    }

    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <>
            <NativeBaseProvider>
                {loading ? <Spinner margin="auto" color="yellow.500" size="lg" /> :
                    <>
                        <ScrollView bgColor={"white"}>
                            <Box w="94%">
                                <Box w="100%">
                                    <Box w="100%" p="3" m="3" rounded="lg" _dark={{}} _light={{

                                    }}>
                                        <Heading mb="1" fontSize="2xl" color="gray.500">id :
                                            {data._data.id === undefined ? null : data._data.id.slice(1, 8)}<Text color="black">{data._data.id.slice(-4)}</Text>
                                        </Heading>
                                        <Text fontSize="md" mb="6">
                                            {data._data.date}
                                        </Text>
                                        <Container mt="5" mb="5">
                                            <Box>
                                            <HStack space={2} mb="8">
                                                <Text w="60%" fontSize="md">WorkStation          :</Text>
                                                <Text w="40%"  fontSize="md">
                                                    {data._data.workstation === undefined ? null : data._data.workstation.slice(-1)}
                                                </Text>
                                            </HStack>
                                            <HStack space={2} mb="8">
                                                <Text w="60%" fontSize="md">Model                     :</Text>
                                                <Text w="40%"  fontSize="md">
                                                    {data._data.substation === undefined ? null : data._data.substation}
                                                </Text>
                                            </HStack>
                                            <HStack space={2} mb="8">
                                                <Text w="60%" fontSize="md">Planned Count      :</Text>
                                                <Text w="40%"  bold fontSize="md">
                                                    {data._data.count === undefined ? null : data._data.count}
                                                </Text>
                                            </HStack>
                                            <HStack space={2} mb="5">
                                                <Text w="60%" fontSize="md">Planned Time        :</Text>
                                                <Text w="40%" bold fontSize="md">
                                                    {data._data.hr === undefined ? null : data._data.hr + "hr " + data._data.min + "min"}
                                                </Text>
                                            </HStack>
                                            </Box>
                                        </Container>
                                    </Box>
                                    <Modal size="xl" isOpen={modalVisible} onClose={setModalVisible} avoidKeyboard>
                                        <Modal.Content>
                                            <Modal.Header>Enter Values to Complete</Modal.Header>
                                            <Modal.Body>
                                                <FormControl  w="100%" mt="3" mb="5">
                                                    <Box mb="3">
                                                        <FormControl.Label>Actual Count</FormControl.Label>
                                                        <Input keyboardType='number-pad' borderColor="yellow.500" placeholder={data._data.count === undefined ? null : data._data.count} onChangeText={(e) => setactualcount(e)} />
                                                    </Box>
                                                    <Box mb="3">
                                                        <FormControl.Label>Actual Time</FormControl.Label>
                                                        <HStack space={2} justifyContent="center">

                                                            <Box w={{ base: "49%" }}>
                                                                <Input keyboardType='number-pad' borderColor="yellow.500" placeholder={data._data.hr === undefined ? "Hr" : data._data.hr+" hr"} onChangeText={(e) => setactualhr(e)} />
                                                            </Box>
                                                            <Box w={{ base: "48%" }} >
                                                                <Input keyboardType='number-pad' borderColor="yellow.500" placeholder={data._data.min === undefined ? "Mins" : data._data.min +" mins"} onChangeText={(e) => setactualmin(e)} />
                                                            </Box>
                                                        </HStack>
                                                    </Box>
                                                    <Box mb="3">
                                                        <FormControl.Label>Reason</FormControl.Label>
                                                        <Select borderColor="yellow.500" selectedValue={reason} minWidth="200" accessibilityLabel="Choose" placeholder="Choose Reason" _selectedItem={{
                                                            bg: "teal.600",
                                                            endIcon: <CheckIcon size="5" />
                                                        }} mt={1} onValueChange={itemValue => setreason(itemValue)}>
                                                            {
                                                                getReasons.map((ele, index) => (
                                                                    <Select.Item key={index} label={ele} value={ele} />
                                                                ))
                                                            }
                                                        </Select>
                                                    </Box>
                                                </FormControl>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button.Group space={2}>
                                                    <Button onPress={() => {
                                                        setModalVisible(!modalVisible);
                                                    }} colorScheme="gray">
                                                        CLOSE
                                                    </Button>
                                                    <Button colorScheme="yellow" onPress={handleSubmit}>SUBMIT</Button>
                                                </Button.Group>

                                            </Modal.Footer>
                                        </Modal.Content>
                                    </Modal>
                                    <VStack space={2}>
                                        <Button colorScheme="yellow" w="98%" m="4" onPress={() => {
                                            setModalVisible(!modalVisible);
                                        }}>
                                            Mark as Complete?
                                        </Button>
                                    </VStack>
                                </Box>
                            </Box>
                        </ScrollView></>
                }
            </NativeBaseProvider>

        </>
    )
}

export default OpenTaskActivity;