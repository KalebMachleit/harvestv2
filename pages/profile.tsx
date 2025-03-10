import { View, Image, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainInfo = (props: {image: string, address: string, rating: number}) => {
    let imageRating = '../images.ratings_moderate.png'
    const stringRating: string = props.rating.toString()

    if (props.rating > 4.5) {imageRating = require('../assets/images/ratings_great.png')}
    else if (props.rating > 4) {imageRating = require('../assets/images/ratings_good.png')}
    else {imageRating = require('../assets/images/ratings_moderate.png')}

    return (
        <View style={styles.mainInfoLayout}>
            <Image source={{uri: props.image}} style={{height: 140, width: 140, borderRadius: '50%', marginRight: 24}}></Image>
            <View style={styles.metrics}>
                <Text style={styles.header1}>Information</Text>
                <View>
                    <Text style={styles.header2}>Address</Text>
                    <Text style={styles.text}>{props.address}</Text>
                </View>
                <View>
                    <Text style={styles.header2}>Rating</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={imageRating} style={{width: 16, height: 16}}></Image>
                        <Text style={styles.text}>{stringRating}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{width: 125, height: 26, borderRadius: 13, backgroundColor: '#FFF1DD', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.text}>Message</Text>
                    <Image source={require('../assets/images/message.png')} style={{width: 19, height: 15, margin: 6}}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function Profile(): React.JSX.Element {
    return(
        <View>
            <MainInfo image={"https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg"} address={'yo mamas house'} rating={4.7}></MainInfo>
        </View>
    )
}

const styles = StyleSheet.create({
    mainInfoLayout: {
        // flex: 1,
        flexDirection: "row",
        height: 180,
        padding: 20
    },
    metrics: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    header1: {
        fontFamily: "Arial Rounded MT Bold",
        fontSize: 24,
        color: '#0D7700'
    },
    header2: {
        fontFamily: "Arial Rounded MT Bold",
        fontSize: 16,
        color: '#074100'
    },
    text: {
        fontFamily: "Arial Rounded MT Bold",
        fontSize: 12,
        color: '#0C6C00'
    },
});