import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactElement, useState, useEffect } from "react";
import { Button, StyleSheet, TextInput, Alert } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'UserLogin'
>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

export const UserLogin = ({ navigation }: Props): ReactElement => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        async function checkLoggedIn() {
            console.log('greetings')
            try {
                const token = await AsyncStorage.getItem('user_token')
                // const cookie = "SessionID=" + token
                const response = await fetch('http://localhost:5050/v1/user', {
                    method: 'GET',
                    // headers: {
                    //     cookie: cookie
                    // }
                })
                if (response.ok) {
                    navigation.navigate('Home')
                }
            } catch (err) {
                console.log(err)
            }
        }
        checkLoggedIn()
    }, [])

    const doUserLogin = async () => {
        const emailValue: string = email;
        const passwordValue: string = password;
        try {
            const response = await fetch('http://localhost:5050/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue
                })
            })

            //get profile info from response and format it for AsyncStorage
            const data = await response.json()
            const token = data.token
            // console.log(token)
            const profile = data.data[0]
            const profileKeys = Object.keys(profile)
            let profileData: any = []
            for (let x in profileKeys) {
                profileData.push([profileKeys[x], profile[profileKeys[x]]])
            }
            profileData.pop()
            profileData.push(['user_token', token])

            if (!response.ok) {
                console.log('hi')
                Alert.alert(data.message)
                throw new Error
            }

            const currentTime = new Date().getTime() + (1000 * 60 * 3)
            const cookieTime = new Date(currentTime).toISOString()

            await AsyncStorage.multiSet(
                profileData
            )
            navigation.navigate('Home')
        } catch (err) {
            Alert.alert('Sign in failed :(')
            console.log(err)
        }
    }

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
            <Button title={"Login"} onPress={() => { doUserLogin() }} />
            <Button title={"New Account"} onPress={() => { navigation.navigate('UserRegistration') }} />
            <Button title={"bypass login"} onPress={() => { navigation.navigate('Home') }} />
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
});