import React, { useEffect, useState } from 'react';
import { Spinner, extendTheme, Alert, NativeBaseProvider, IconButton, CloseIcon, Modal, Center, Select, CheckIcon, Input, VStack, ScrollView, HStack, FormControl, Container, Button, Heading, Box, Text, Badge, } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import { ToastAndroid ,RefreshControl} from "react-native";


const OpenTaskActivity = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const { id, date } = route.params;
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [actualCount, setactualcount] = useState();
    const [actualhr, setactualhr] = useState();
    const [actualmin, setactualmin] = useState();
    const [reason, setreason] = useState("");
    const [getReasons, setgetReasons] = useState([]);
    const [pending, setpending] = useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getData().then(() => 
        setRefreshing(false));
    }, []);

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
                if (ele._data.status === "Pending") {
                    setpending(true)
                } else {
                    setpending(false)
                }
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
        console.log(reason);
        if (actualCount === undefined || actualhr === undefined || actualmin===undefined  || reason.length===0) {
            ToastAndroid.showWithGravityAndOffset(
                "Invalid Input",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }else{
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
                ToastAndroid.showWithGravityAndOffset(
                    "Task Updated Successfully",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                setModalVisible(false)
                onRefresh()
            })

            .catch(err => {
                console.error("error", err);
            })
        }
      
    }
    const config = {
        useSystemColorMode: false,
        initialColorMode: "dark",
    };
    const customTheme = extendTheme({ config });
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <>
            <NativeBaseProvider theme={customTheme}>
                {loading ? <Spinner bgColor={"black"} h="100%" w="100%" margin="auto" color="yellow.500" size="lg" /> :
                    <>
                        <ScrollView refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                            bgColor={"black"}>
                            <Box w="94%">
                                <Box w="100%">
                                    <Box w="100%" p="3" m="3" rounded="lg" >
                                        <Heading mb="1" fontSize="2xl" color="light.400">id :
                                            {data._data.id === undefined ? null : data._data.id.slice(1, 8)}<Text color="light.100">{data._data.id.slice(-4)}</Text>
                                        </Heading>
                                        <Text color="light.300" fontSize="md" mb="6">
                                            {data._data.date}
                                        </Text>
                                        <Container w="100%" mt="5">
                                            <Box>
                                                <HStack space={2} mb="8">
                                                    <Text w="60%" color="light.300" fontSize="md">WorkStation          :</Text>
                                                    <Text w="40%" color="light.200" fontSize="md">
                                                        {data._data.workstation === undefined ? null : data._data.workstation.slice(-1)}
                                                    </Text>
                                                </HStack>
                                                <HStack space={2} mb="8">
                                                    <Text w="60%" color="light.300" fontSize="md">Model                     :</Text>
                                                    <Text w="40%" color="light.200" fontSize="md">
                                                        {data._data.substation === undefined ? null : data._data.substation}
                                                    </Text>
                                                </HStack>
                                                <HStack space={2} mb="8">
                                                    <Text w="60%" color="light.300" fontSize="md">Planned Count      :</Text>
                                                    <Text w="40%" color="light.100" bold fontSize="md">
                                                        {data._data.count === undefined ? null : data._data.count}
                                                    </Text>
                                                </HStack>
                                                <HStack space={2} mb="8">
                                                    <Text w="60%" color="light.300" fontSize="md">Planned Time        :</Text>
                                                    <Text w="40%" color="light.100" bold fontSize="md">
                                                        {data._data.hr === undefined ? null : data._data.hr + "hr " + data._data.min + "min"}
                                                    </Text>
                                                </HStack>
                                                <HStack space={2} mb="5">
                                                    <Text w="60%" color="light.300" fontSize="md">Status                     :</Text>
                                                    <Badge rounded="8" w="40%" color="light.100" bold fontSize="md">
                                                        {data._data.hr === undefined ? null : data._data.status}
                                                    </Badge>
                                                </HStack>
                                            </Box>
                                        </Container>
                                    </Box>
                                    <Modal bgColor="black.300" size="xl" isOpen={modalVisible} onClose={setModalVisible} avoidKeyboard>
                                        <Modal.Content >
                                            <Modal.Header bgColor="gray.900">Enter Values to Complete</Modal.Header>
                                            <Modal.Body bgColor="gray.900">
                                                <FormControl w="100%" mt="2" mb="5">
                                                    <Box mb="3">
                                                        <Text color="light.100" mb="2">Actual Count</Text>
                                                        <Input keyboardType='number-pad' borderColor="yellow.500" placeholder={data._data.count === undefined ? null : data._data.count} onChangeText={(e) => setactualcount(e)} />
                                                    </Box>
                                                    <Box mb="3">
                                                        <Text color="light.100" mb="2">Actual Time</Text>
                                                        <HStack space={2} justifyContent="center">

                                                            <Box w={{ base: "49%" }}>
                                                                <Input keyboardType='number-pad' borderColor="yellow.500" placeholder={data._data.hr === undefined ? "Hr" : data._data.hr + " hr"} onChangeText={(e) => setactualhr(e)} />
                                                            </Box>
                                                            <Box w={{ base: "48%" }} >
                                                                <Input keyboardType='number-pad' borderColor="yellow.500" placeholder={data._data.min === undefined ? "Mins" : data._data.min + " mins"} onChangeText={(e) => setactualmin(e)} />
                                                            </Box>
                                                        </HStack>
                                                    </Box>
                                                    <Box mb="3">
                                                        <Text color="light.100" mb="2">Reason</Text>
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
                                            <Modal.Footer bgColor="gray.900">
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
                                    {pending ? <VStack mt="5" space={2}>
                                        <Button colorScheme="yellow" w="98%" m="4" onPress={() => {
                                            setModalVisible(!modalVisible);

                                        }}>
                                            Mark as Complete?
                                        </Button>
                                    </VStack> :
                                        <Box ml="5" mb="5" p="4" maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                                            borderColor: "coolGray.600",
                                            backgroundColor: "yellow.500"
                                        }} _web={{
                                            shadow: 2,
                                            borderWidth: 0
                                        }} _light={{
                                            backgroundColor: "gray.50"
                                        }}>
                                            <Box>
                                                <HStack space={2} mb="8">
                                                    <Text w="60%" color="gray.900" fontSize="md">Actual Count      :</Text>
                                                    <Text w="40%" color="gray.900" bold fontSize="md">
                                                        {data._data.count === undefined ? null : data._data.actualCount}
                                                    </Text>
                                                </HStack>
                                                <HStack space={2} mb="5">
                                                    <Text w="60%" color="gray.900" fontSize="md">Actual Time        :</Text>
                                                    <Text w="40%" color="gray.900" bold fontSize="md">
                                                        {data._data.hr === undefined ? null : data._data.actualTime}
                                                    </Text>
                                                </HStack>
                                                <HStack space={2} mb="5">
                                                    <Text w="60%" color="gray.900" fontSize="md">Reason                :</Text>
                                                    <Text w="40%" color="gray.900" bold fontSize="sm">
                                                        {data._data.hr === undefined ? null : data._data.Reason}
                                                    </Text>
                                                </HStack>
                                            </Box>
                                        </Box>}
                                </Box>
                            </Box>
                        </ScrollView></>
                }
            </NativeBaseProvider>

        </>
    )
}

export default OpenTaskActivity;