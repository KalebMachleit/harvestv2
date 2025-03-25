import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface FruitTagPressableProps {
  name: string,
  color: string
  func: Function
}

interface FruitTagStaticProps {
  name: string,
  color: string
}

export const FruitTagPressable = ({ name, color, func }: FruitTagPressableProps) => {
  return (
    <TouchableOpacity style={[styles.fruitTag, { backgroundColor: color }]} onPressOut={func}>
      <Text>
        {name}
      </Text>
    </TouchableOpacity>
  )
}

export const FruitTagStatic = ({ name, color }: FruitTagStaticProps) => {
  return (
    <View style={[styles.fruitTag, { backgroundColor: color }]}>
      <Text>
        {name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  fruitTag: {
    borderRadius: 5,
    height: 20,
    width: 'auto',
    elevation: 2,
  }
})