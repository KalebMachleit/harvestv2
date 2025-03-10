import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactElement, useState } from "react";
import { Button, StyleSheet, TextInput, Alert, Modal, View, Text } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { MainStyles } from "../../assets/mainStyles";

type UserRegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserRegistration'
>;

type Props = {
    navigation: UserRegistrationScreenNavigationProp;
  };

export const UserRegistration = ({ navigation }: Props): ReactElement => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isModalVisible, setModalVisible] = useState(false)

    const doUserRegistration = async () => {
        // Note that these values come from state variables that we've declared before
        const emailValue: string = email;
        const passwordValue: string = password;
        const firstNameValue: string = firstName;
        const lastNameValue: string = lastName;

        try {
            const response = await fetch('http://localhost:5050/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstNameValue,
                    last_name: lastNameValue,
                    email: emailValue,
                    password: passwordValue
                })
            })

            const data = await response.json()
            const profile = data.data[0]
            const profileKeys = Object.keys(profile)
            let profileData: any = []
            for (let x in profileKeys) {
                profileData.push([profileKeys[x], profile[profileKeys[x]]])
            }
            profileData.pop()

            if (!response.ok) {
                Alert.alert(data.message)
            }

            await AsyncStorage.multiSet(
                profileData
            )

            setModalVisible(true)

            // navigation.navigate('Home')
        } catch (err) {
            Alert.alert('Error!')
            console.log(err)
        }
    };

    return (
        <>
            <TextInput
                style={styles.input}
                value={email}
                placeholder={"Email"}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize={"none"}
            />
            <TextInput
                style={styles.input}
                value={password}
                placeholder={"Password"}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                value={firstName}
                placeholder={"First Name"}
                onChangeText={(text) => setFirstName(text)}
                autoCapitalize={"none"}
            />
            <TextInput
                style={styles.input}
                value={lastName}
                placeholder={"Last Name"}
                onChangeText={(text) => setLastName(text)}
            />
            <Button title={"Sign Up"} onPress={() => { doUserRegistration() }} />
            <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            style={styles.toVendorSetup}
            >
                <View>
                    <Text style={MainStyles.header1}>Would you like to set up a store?</Text>
                    <Button title={"Yes"} onPress={() => { setModalVisible(false); navigation.navigate('VendorSetup') }} />
                    <Button title={"No"} onPress={() => { setModalVisible(false); navigation.navigate('Home') }} />
                    <Text style={MainStyles.subText}>You can set this up later</Text>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    toVendorSetup: {
        top: 'auto',
    }
});