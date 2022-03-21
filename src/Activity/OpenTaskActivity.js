import React, { useEffect, useState } from 'react';
import { Center, NativeBaseProvider, Checkbox, Select, CheckIcon, Input, WarningOutlineIcon, VStack, ScrollView, AspectRatio, Image, Stack, HStack, FormControl, Container, Button, StatusBar, Heading, Box, Text, } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const OpenTaskActivity = ({ navigation, route }) => {
    const { id, date } = route.params;
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [actualCount,setactualcount] = useState();
    const [actualtime,setactualtime] = useState();
    const [reason,setreason] = useState("");
    const [getReasons,setgetReasons] = useState([]);
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
  

    async function handleSubmit(){
        let ActualCount = actualCount
        let ActualTime =actualtime
    
        if(ActualCount.length === 0 && ActualTime.length === 0){
            return;
        }
        const dataupdate = await firestore()
                            .collection(date)
                            .doc(id)
                            .set({
                                actualCount:ActualCount,
                                actualTime:ActualTime,
                                Reason : reason,
                                status : "Completed"
                            },{merge:true})
                            .then(res=>{
                                console.log("Data Updated SuccessFully");
                                Alert.alert("Data Updated SuccessFully");
                            })
                            .catch(err=>{
                                console.error("error",err);
                            })
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
                                                <Input placeholder="Enter Actual Count" onChangeText={(e)=>setactualcount(e)}/>{true ? null :
                                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                                        *Needed.
                                                    </FormControl.ErrorMessage>}
                                            </Box>
                                            <Box mb="3">
                                                <FormControl.Label>Actual Time</FormControl.Label>
                                                <Input placeholder="Enter Actual Time" onChangeText={(e)=>setactualtime(e)}/>
                                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                                    *Needed.
                                                </FormControl.ErrorMessage>
                                            </Box>
                                            <Box mb="3">
                                                <FormControl.Label>Reason</FormControl.Label>
                                                <Select selectedValue={reason} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                                                    bg: "teal.600",
                                                    endIcon: <CheckIcon size="5" />
                                                }} mt={1} onValueChange={itemValue => setreason(itemValue)}>
                                                    {
                                                        getReasons.map((ele,index)=>(
                                                            <Select.Item key={index} label={ele} value={ele} />
                                                        ))
                                                    }
                                                </Select>
                                            </Box>
                                        </FormControl>
                                    </Box>
                                    <Button w="98%" m="4" onPress={handleSubmit}>Submit</Button>
                                </Box>
                            </Box>
                        </ScrollView></>
                }
            </NativeBaseProvider>

        </>
    )
}

export default OpenTaskActivity;