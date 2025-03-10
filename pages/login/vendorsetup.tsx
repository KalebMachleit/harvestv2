import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { View, TextInput, StyleSheet, Alert, Button } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

type VendorSetupScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'UserRegistration'
>;

type Props = {
    navigation: VendorSetupScreenNavigationProp;
};

export const VendorSetup = ({ navigation }: Props) => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [selling, setSelling] = useState([])
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState([])
    const [authToken, setAuthToken] = useState('')

    useEffect(() => {
        async function addUserCreds() {
            try {
                const userEmail = await AsyncStorage.getItem('email')
                const token = await AsyncStorage.getItem('auth_token')
                const newArray = email.push(userEmail)
                setEmail(newArray)
                setAuthToken(token)
            } catch (err) {
                Alert.alert('Sorry, it appears there was an issue getting your login info')
                console.log(err)
            }
        }
        addUserCreds()
    }, [])

    const doVendorSetup = async () => {
        // Note that these values come from state variables that we've declared before
        const emailValue: Array<string> = email;
        const addressValue: string = address;
        const bioValue: string = bio;
        const nameValue: string = name;
        const sellingValue: Array<string> = selling;

        try {
            const response = await fetch('http://localhost:5050//v1/user/vendor/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Set-Cookie': authToken
                },
                body: JSON.stringify({
                    name: nameValue,
                    address: addressValue,
                    selling: sellingValue,
                    bio: bioValue,
                    emails: emailValue
                })
            })

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
            <Button title={"Sign Up"} onPress={() => { doVendorSetup() }} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginBottom: 10,
        backgroundColor: '#fff',
    }
});