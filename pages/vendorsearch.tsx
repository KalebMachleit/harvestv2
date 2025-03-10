import { View, Image, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { MainStyles } from '../assets/mainStyles';

type VendorSearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
    navigation: VendorSearchScreenNavigationProp;
};

export const VendorSearch = ({navigation}: Props) => {


    return(
        <>
        </>
    )
}