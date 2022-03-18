import React, { useState, useEffect } from 'react';
import Card from '../components/card';
import { NativeBaseProvider, Box, Select, CheckIcon, HStack } from "native-base";
import { ScrollView, Image, StyleSheet, } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const HomeActivity = ({ navigation }) => {
    const [workstation, setWorkStation] = useState("");
    const [substation, setsubStation] = useState("");
    const [error, setError] = useState(null);
    const [updateWorkStation, setUpdateWorkStation] = useState([]);
    const [updateSubStation, setUpdateSubStation] = useState([]);
    const [querydata, setquerydata] = useState([]);


    useEffect(() => {
        GetData();
    }, [])

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
        var today = new Date();
        let month = today.getMonth() + 1;
        let tod = today.getDate();
        if (tod < 10) {
            tod = "0" + tod;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var collection = "2022-03-02";
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
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://www.vguard.in/waterpurifier/assets/images/logo.png',
                    }} />
                <HStack space={2} mb="10" justifyContent="center">
                    <Box w={{ base: "45%" }}>
                        <Select selectedValue={workstation} minWidth="30%" accessibilityLabel="Choose WorkStation" placeholder="Choose WorkStation" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={(itemValue) => {
                            setWorkStation(itemValue)
                            getsubstation()
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
                        }} mt={1} onValueChange={(itemValue) =>{
                            setsubStation(itemValue)
                            getAllData()}
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
                <ScrollView>
                    {
                        querydata.map((element,index)=>(
                            <Card data={element} key={index}/>
                        ))
                    }
                   
                </ScrollView>
            </NativeBaseProvider>

        </>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        margin: 10,
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