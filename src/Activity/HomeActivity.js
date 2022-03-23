import React, { useState, useEffect } from 'react';
import Card from '../components/card';
import { NativeBaseProvider, StatusBar, extendTheme, Badge, Spinner, Pressable, ChevronDownIcon, Text, Box, Select, CheckIcon, HStack } from "native-base";
import { ScrollView, Image, StyleSheet, RefreshControl } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';

const HomeActivity = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [workstation, setWorkStation] = useState("");
    const [substation, setsubStation] = useState("");
    const [updateWorkStation, setUpdateWorkStation] = useState([]);
    const [updateSubStation, setUpdateSubStation] = useState([]);
    const [querydata, setquerydata] = useState([]);
    const [pickdate, setpickDate] = useState(new Date);
    const [today, settoday] = useState(true);
    const [taskloading, settaskloading] = useState(false);
    const [date, setdate] = useState(pickdate.getFullYear() + "-" + (pickdate.getMonth() + 1) + "-" + pickdate.getDate());
    const [open, setOpen] = useState(false);

    
    const onRefresh = () => {
        setRefreshing(true);
        getAllData().then(() =>
        setRefreshing(false));
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllData()
        });
        return unsubscribe;
      }, [navigation]);


    useEffect(() => {
        GetData();
        datetoday()
    }, [])

    useEffect(() => {
        getsubstation()
        setsubStation("");
        datetoday()


    }, [workstation])

    useEffect(() => {
        getAllData()
        datetoday()

    }, [pickdate])

    useEffect(() => {
        getAllData()
        datetoday()

    }, [substation])

    async function GetData() {
        setquerydata([])
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
        setquerydata([])
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
        setquerydata([])
        settaskloading(true)
        const formValues = [];
        let month = pickdate.getMonth() + 1;
        let tod = pickdate.getDate();
        console.log(tod + " " + month);
        if (tod < 10) {
            tod = "0" + tod;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var collection = pickdate.getFullYear() + "-" + month + "-" + tod;
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
        settaskloading(false)
    }

    function datetoday() {
        setquerydata([])
        const temptoday = new Date;
        if (pickdate.getDate() === (temptoday.getDate()) && pickdate.getMonth() === (temptoday.getMonth()) && pickdate.getFullYear() === (temptoday.getFullYear())) {
            settoday(true);

        } else {
            settoday(false);

        }
    }

    const config = {
        useSystemColorMode: false,
        initialColorMode: "dark",
    };

    const customTheme = extendTheme({ config });
    return (
        <>

            <NativeBaseProvider theme={customTheme}   >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                } >
                    <Box bgColor="black">
                        {loading ? <><StatusBar backgroundColor="black" /><Spinner margin="auto" h="100%" color="yellow.500" size="lg" /></> :
                            <>
                                <StatusBar backgroundColor="black" />
                                <Box style={styles.container}>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={{
                                            uri: 'https://www.vguard.in/waterpurifier/assets/images/logo.png',
                                        }} />
                                </Box>

                                <HStack space={2} mt="3" mb="3" justifyContent="center">
                                    <Box w={{ base: "44%" }} >
                                        <Select borderColor="gray.500" borderWidth="1" selectedValue={workstation} minWidth="30%" accessibilityLabel="Choose WorkStation" placeholder="Choose WorkStation" _selectedItem={{
                                            bg: "yellow.600",
                                            endIcon: <CheckIcon size="4" />
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
                                    <Box w={{ base: "44%" }} >
                                        <Select borderColor="gray.500" borderWidth="1" selectedValue={substation} minWidth="50%" accessibilityLabel="Choose Model" placeholder="Choose Model" _selectedItem={{
                                            bg: "yellow.600",
                                            endIcon: <CheckIcon size="5" />
                                        }} mt={1} onValueChange={(itemValue) => {
                                            setsubStation(itemValue)
                                            getAllData()
                                        }
                                        }>
                                            {
                                                updateSubStation.map((element, index) => (
                                                    <Select.Item key={index + 1} label={element} value={element} />
                                                ))
                                            }
                                        </Select>
                                    </Box>
                                </HStack>

                                <Pressable onPress={() => setOpen(true)}>
                                    <Badge bgColor="black" borderWidth="1" ml="4" mb="2" h="9" rounded="sm" w="92%">
                                        <HStack>
                                            {today ? <Text m="1" w="90%">{"Today - " + date.toString()} </Text> :
                                                <Text m="1" w="90%">{date}</Text>}
                                            <ChevronDownIcon color="gray.100" w="10%" m="1" size="5" />
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
                                        setdate(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())

                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />

                                {taskloading ? <Spinner margin="auto" h="100%" color="yellow.500" size="lg" /> :
                                    querydata.length === 0 ? <Text marginX="auto" mt="50%" h="100%" color="gray.200" >No task found</Text>
                                        : <Box h="100%">
                                           { querydata.map((element, index) => (
                                            <Card data={element} key={index} />
                                            ))}
                                        </Box>

                                }
                            </>}
                    </Box>
                </ScrollView>
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
        alignItems: "center"
    },

    background: {
        backgroundColor: "black",
    }
});


export default HomeActivity;