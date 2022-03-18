import React from "react";
import { Badge, VStack, ScrollView, AspectRatio, Stack, Image, HStack, Center, NativeBaseProvider, FormControl, Container, Button, StatusBar, Heading, Box, Text, Card, View, } from 'native-base';


const card = (props) => {
    return (
        <View key={props.index}>
            <Box mb="3"alignItems="center">
                <Box maxW="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                }} _web={{
                    shadow: 2,
                    borderWidth: 0
                }} _light={{
                    backgroundColor: "gray.50"
                }}>
                    <VStack space={2} alignItems="center">
                        <HStack space={2} ml="3" justifyContent="center">
                            <Container w="60%"  ><Text fontSize="md" m="2">id:{props.data.id}</Text>
                            </Container>
                            <Container w="40%" alignItems="center">
                                <Badge rounded="8" m="2"><Text fontSize="sm" w="60%">{props.data.status}</Text></Badge>
                            </Container>
                        </HStack>
                        <HStack space={2} ml="3" >
                            <VStack w="60%" space={2} >
                                <HStack>
                                    <Container><Text fontSize="md" m="2" mb="1">Workstation :{props.data.workstation}</Text>
                                    </Container>
                                </HStack>
                                <HStack>
                                    <Container><Text fontSize="md" m="2" mt="0">Model : {props.data.substation}</Text>
                                    </Container>
                                </HStack>
                            </VStack>
                            <VStack w="40%" mt="5" space={2} alignItems="center">
                                <Box alignItems="center">
                                    <Button rounded="full" pl="5" pr="5" onPress={() => console.log("hello world")}>Open</Button>
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