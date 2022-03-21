import React, { useState, useEffect } from 'react';
import Card from '../components/card';
import { NativeBaseProvider,Badge , Pressable ,ChevronDownIcon,Text, Button, Box, Select, CheckIcon, HStack } from "native-base";
import { ScrollView, Image, StyleSheet, } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker'

const HomeActivity = ({ navigation }) => {
    const [loading,setLoading] = useState(true);
    const [workstation, setWorkStation] = useState("");
    const [substation, setsubStation] = useState("");
    const [error, setError] = useState(null);
    const [updateWorkStation, setUpdateWorkStation] = useState([]);
    const [updateSubStation, setUpdateSubStation] = useState([]);
    const [querydata, setquerydata] = useState([]);
    const [pickdate, setpickDate] = useState(new Date);
    const [date , setdate] = useState(pickdate.getFullYear()+"-"+(pickdate.getMonth()+1)+"-"+pickdate.getDate());
    
    const [open, setOpen] = useState(false);

    useEffect(() => {
        GetData();
    }, [])

    useEffect(()=>{
        getsubstation()
        setsubStation("");
        
    },[workstation])

    useEffect(()=>{
        getAllData()
    },[pickdate])

    useEffect(()=>{
     getAllData()   
    },[substation])

    async function GetData() {
        const formValues = [];
        await firestore()
            .collection('workstation')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    formValues.push(documentSnapshot.data().workstation);
                });
            });
        setUpdateWorkStation(formValues);
        setLoading(false);
        console.log(formValues);
    }

    async function getsubstation() {
        const formValues = [];
        if (workstation.length === 0) {
            return;
        }
        await firestore()
            .collection(workstation)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    formValues.push(documentSnapshot.data().model);
                });
            });
        setUpdateSubStation(formValues);
        console.log(formValues);
    }

    async function getAllData() {
        const formValues = [];
        let month = pickdate.getMonth()+1;
        let tod = pickdate.getDate();
        console.log(tod + " " + month);
        if (tod < 10) {
            tod = "0" + tod;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var collection = pickdate.getFullYear()+"-"+month+"-"+tod;
        await firestore()
            .collection(collection).where("substation", "==", substation).where("workstation", "==", workstation)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log(documentSnapshot.data());
                    formValues.push(documentSnapshot.data());
                });
            });
        setquerydata(formValues);
    }

    return (
        <>
            <NativeBaseProvider>
                {loading?<Text>Loading ... :)</Text>:
                <>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://www.vguard.in/waterpurifier/assets/images/logo.png',
                    }} />
                <HStack space={2} mb="3" justifyContent="center">
                    <Box w={{ base: "45%" }}>
                        <Select selectedValue={workstation} minWidth="30%" accessibilityLabel="Choose WorkStation" placeholder="Choose WorkStation" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={(itemValue) => {
                            // updateworkstation(itemValue);
                            setWorkStation(itemValue);
                            
                        }
                        }>
                            {
                                updateWorkStation.map((element, index) => (
                                    <Select.Item key={index} label={element} value={element} />
                                ))
                            }
                        </Select>
                    </Box>
                    <Box w={{ base: "45%" }} >
                        <Select selectedValue={substation} minWidth="50%" accessibilityLabel="Choose Model" placeholder="Choose Service" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={(itemValue) => {
                            setsubStation(itemValue)
                            getAllData()
                        }
                        }>
                            <Select.Item key={0} label="All" value="All" />
                            {
                                updateSubStation.map((element, index) => (
                                    <Select.Item key={index + 1} label={element} value={element} />
                                ))
                            }
                        </Select>
                    </Box>
                </HStack>
                <Pressable onPress={() => setOpen(true)}>
                    <Badge ml="5" mb="5" h="9" rounded="sm" w="92%">
                    <HStack>
                    <Text m="1" w="90%">{date.toString()}</Text>
                    <ChevronDownIcon w="10%" m="1" size="5" />
                    </HStack>
                    </Badge >
                </Pressable>
                <DatePicker
                    modal
                    open={open}
                    date={pickdate}
                    mode="date"
                    onConfirm={(date) => {
                        setpickDate(date)
                        setOpen(false)
                        setdate(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate())
                       
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
                <ScrollView>
                    {
                        querydata.map((element, index) => (
                            <Card data={element} key={index} />
                        ))
                    }

                </ScrollView>
                </>}
            </NativeBaseProvider>

        </>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        margin: 20,
        width: 140,
        height: 50,
    },
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    }
});


export default HomeActivity;