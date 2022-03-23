import React from "react";
import { Badge, VStack, HStack, Container, Button, Box, Text,View, } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const card =(props) => {
    const navigation = useNavigation();
    const OpenTask = () => {
        console.log(props.data);
        const d = props.data;
        navigation.navigate("OpenTaskScreen", {id: d.id,date:d.date});
        
      }
    return (
        <View key={props.index}>
            <Box mb="3"alignItems="center" >
                <Box maxW="90%" rounded="lg" overflow="hidden" borderColor="gray.500" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.00"
                }} _web={{
                    shadow: 2,
                    borderWidth: 0
                }} _light={{
                    backgroundColor: "gray.50"
                }}>
                    <VStack space={2} alignItems="center">
                        <HStack space={2} ml="3" justifyContent="center">
                            <Container w="50%"  ><Text fontSize="md" m="2" color= "gray.500">id:{props.data.id.slice(1,8)}<Text  color="light.100" bold >{props.data.id.slice(-4)}</Text></Text>
                            </Container>
                            <Container w="50%" alignItems="center">
                                <Badge colorScheme="black" borderColor="gray.400" variant="outline" rounded="8" m="2" mr="-10"><Text fontSize="sm" w="60%">{props.data.status}</Text></Badge>
                            </Container>
                        </HStack>
                        <HStack space={2} ml="3" >
                            <VStack w="60%" space={2} >
                                <HStack>
                                    <Container><Text fontSize="md" m="2" mb="1">Workstation : {props.data.workstation.slice(-1)}</Text>
                                    </Container>
                                </HStack>
                                <HStack>
                                    <Container><Text fontSize="md" m="2" mt="0">Model : {props.data.substation}</Text>
                                    </Container>
                                </HStack>
                            </VStack>
                            <VStack w="40%" mt="5" space={2} alignItems="center">
                                <Box w="100%" alignItems="center">
                                    <Button  w="80%"textAlign="center" colorScheme="yellow" rounded="full" onPress={OpenTask}>Open</Button>
                                </Box>
                            </VStack>
                        </HStack>
                    </VStack>
                </Box>
            </Box>

        </View>
    )
}

export default card;