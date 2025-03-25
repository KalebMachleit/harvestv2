import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, SectionList, TouchableOpacity, TextInput, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { MainStyles } from '../../assets/mainStyles';
import { FruitTagPressable, FruitTagStatic } from '../../components/FruitTag';
import { produceList } from '../../assets/produceList'
import _ from 'lodash'
import AsyncStorage from '@react-native-async-storage/async-storage';

type VendorSetupScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'UserRegistration'
>;

type Props = {
    navigation: VendorSetupScreenNavigationProp;
};

type SellingListProps =
    {
        name: string,
        color: string
    }

export const VendorSetup = ({ navigation }: Props) => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [selling, setSelling] = useState<SellingListProps[]>([])
    const [search, setSearch] = useState('')
    const [list, setList] = useState(produceList)

    useEffect(() => {
        async function getEmail() {
            const pullEmail = await AsyncStorage.getItem('email')
            setEmail(pullEmail)
        }
        getEmail()
    }, [])

    const doVendorSetup = async () => {
        try {
            const response = await fetch('http://localhost:5050/v1/user/vendor/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    address: address,
                    selling: selling,
                    bio: bio,
                    emails: email
                })
            })
            console.log(response)
            const data = await response.json()
            console.log(data)


            //TODO: setup asyncstorage for vendor profile for offline access
            // const data = await response.json()
            // const profile = data.data[0]
            // const profileKeys = Object.keys(profile)
            // let profileData: any = []
            // for (let x in profileKeys) {
            //     profileData.push([profileKeys[x], profile[profileKeys[x]]])
            // }
            // profileData.pop()

            // if (!response.ok) {
            //     Alert.alert(data.message)
            // }

            // await AsyncStorage.multiSet(
            //     profileData
            // )

            // navigation.navigate('Home')
        } catch (err) {
            Alert.alert('Error!')
            console.log(err)
        }
    };

    function filterIt(searchKey: string) {
        const newList = _.cloneDeep(produceList)
        console.log(searchKey)

        if (searchKey == '') {
            console.log('empty')
            return produceList
        }

        return newList.filter(function (obj) {
            const thing = obj.data.filter(function (key) {
                return key.toLowerCase().includes(searchKey.toLowerCase())
            })
            if (thing.length == 0) {
                return
            } else {
                console.log(thing)
                obj.data = thing
                return obj
            }
        });
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                value={name}
                placeholder={"Name"}
                onChangeText={(text) => setName(text)}
            /><TextInput
                style={styles.input}
                value={address}
                placeholder={"Address"}
                onChangeText={(text) => setAddress(text)}
            /><TextInput
                style={styles.input}
                value={bio}
                placeholder={"Bio"}
                onChangeText={(text) => setBio(text)}
                autoCapitalize={"none"}
            />
            <Text style={MainStyles.header1}>Selling</Text>
            <View style={styles.sellingList}>
                {
                    selling.map(x => (
                        <FruitTagStatic key={x.name} color={x.color} name={x.name} ></FruitTagStatic>
                    ))
                }
                <Button onPress={() => setModalVisible(!modalVisible)} title='Add'></Button>
            </View>
            <Button title={"Sign Up"} onPress={() => { doVendorSetup(); navigation.navigate('Home') }} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => { setModalVisible(!modalVisible); }}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                        <View>
                            <TextInput placeholder='Search' value={search} onChangeText={setSearch} autoCapitalize='none' style={{ width: '80%' }}></TextInput>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setList(filterIt(search))}>
                                <Text style={styles.textStyle}>Search</Text>
                            </Pressable>
                        </View>
                        <View style={styles.sellingList}>
                            {
                                selling.map(x => (
                                    <Text key={x.name}>{x.name}</Text>
                                ))
                            }
                        </View>

                        <SectionList
                            sections={list}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item, section }) => (
                                <FruitTagPressable name={item} color={section.color} func={() => { if (!selling.includes({ name: item, color: section.color })) { setSelling([...selling, { name: item, color: section.color }]) } }}></FruitTagPressable>
                            )}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text>{title}</Text>
                            )}
                        >

                        </SectionList>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '85%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    searchBar: {
        flexDirection: 'row'
    },
    sellingList: {

    }
});