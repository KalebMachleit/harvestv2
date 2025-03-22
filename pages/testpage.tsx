import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, SectionList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { MainStyles } from '../assets/mainStyles';
import { FruitTag } from '../components/FruitTag';
import { produceList } from '../assets/produceList';
import _ from 'lodash'

type TestScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Test'
>;

type Props = {
  navigation: TestScreenNavigationProp;
};


// const produce: any = {


//   apples: [
//     'Green Apple',
//     'Honeycrisp Apple',
//     'Fuji Apple',
//     'Gala Apple'
//   ],
//   bananas: [
//     'Banana',
//     'Plantain'
//   ],
//   citrus: [
//     'Navel Orange',
//     'Orange',
//     'Tangerine',
//     'Lemon',
//     'Lime',
//     'Mandarin'
//   ],
//   tomatoes: [
//     'Roma Tomato',
//     'Grape Tomato',
//   ],
//   potatoes: [
//     'Yellow Potato',
//     'Red Potato',
//     'Yukon Gold Potato',
//     'Russet Potato'
//   ]
// }

export const TestPage = ({ navigation }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selling, setSelling] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [list, setList] = useState(produceList)

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
    <>
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
              onPress={() => setModalVisible(!modalVisible)}>
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
                  <Text>{x}</Text>
                ))
              }
            </View>

            <SectionList
              sections={list}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, section }) => (
                <FruitTag name={item} color={section.color} func={() => { setSelling([...selling, item]) }}></FruitTag>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text>{title}</Text>
              )}
            >

            </SectionList>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
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