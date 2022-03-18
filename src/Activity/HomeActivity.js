import React, { useState } from 'react';
import Card from '../components/card';
import { NativeBaseProvider, Box, VStack, Stack, Select, CheckIcon, HStack, Container, Center } from "native-base";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Button,
    Image,
    StyleSheet,
    Text,
    View,
    Picker,
    useColorScheme,
} from 'react-native';


const HomeActivity = () => {
    let [service, setService] = React.useState("");
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
                    <Select selectedValue={service} minWidth="30%" accessibilityLabel="Choose WorkStation" placeholder="Choose WorkStation" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                        <Select.Item label="WorkStation 1" value="ux" />
                        <Select.Item label="WorkStation 2" value="web" />
                        <Select.Item label="WorkStation 3" value="cross" />
                        <Select.Item label="WorkStation 4" value="ui" />
                        <Select.Item label="WorkStation 5" value="backend" />
                    </Select>
                </Box>
                <Box w={{ base: "45%" }} >
                    <Select selectedValue={service} minWidth="50%" accessibilityLabel="Choose Model" placeholder="Choose Service" _selectedItem={{
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
            </HStack>
            <ScrollView>

                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>

                <Card></Card>
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