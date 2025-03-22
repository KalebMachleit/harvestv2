import { StyleSheet, Text, TouchableOpacity } from "react-native"

interface FruitTagProps {
    name: string,
    color: string
    func: Function
  }
  
export const FruitTag = ({name, color, func}: FruitTagProps) => {
    return (
      <TouchableOpacity style={[styles.fruitTag, {backgroundColor: color}]} onPressOut={func}>
        <Text>
          {name}
        </Text>
      </TouchableOpacity>
    )
  }

const styles = StyleSheet.create({
  fruitTag: {
    borderRadius: 3,
    height: 16,
    width: 'auto',
    elevation: 2,
  }
})