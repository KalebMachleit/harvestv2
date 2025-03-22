import { View, Image, Text, StyleSheet, Touchable, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { MainStyles } from '../assets/mainStyles';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function Home({navigation}: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(undefined);

    useEffect(() => {
        const loadData = async () => {
            try{
                const profile = await AsyncStorage.multiGet(['_id', 'first_name', 'last_name', 'email', 'role', 'createdAt', 'updatedAt'], )
                setData(profile)
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [])
    if (isLoading) {
        return (
        <View>
            <Text>loading</Text>
        </View>)
    }
    return(
        <View>
            <Text style={MainStyles.header1}>Name: {data[1][1]} {data[2][1]}</Text>
            <Button title={"test page"} onPress={() => { navigation.navigate('Test')}}> </Button>
        </View>
    )
}