import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const button_order = ['AC', '+/-', '%', '÷','7','8','9','X','4','5','6','-','1','2','3','+','0','.','=']
  const [history_number, setHistoryNumber] = useState("");
  const [number, setNumber] = useState("");
  const [negative, setNegative] = useState("");

 

  function calculate(){
    const splitNumbers = number.split(' ')
    const first = parseFloat(splitNumbers[0])
    const second = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]
  

    switch(operator){
      case '+':
        setNumber((first + second).toString())
        return
      case'-':
        setNumber((first - second).toString())
        return
      case'X':
        setNumber((first * second).toString())
        return
      case'÷':
        setNumber((first / second).toString())
        return    
    }
  }

  function user_input(button){
    let aux = 0

    if(button === '+' || button === '-' || button === 'X'|| button === '÷'){
      setNumber(number + " " + button + " ")
      return
    }
    switch(button){
      case 'AC':
        setNumber("")
        setHistoryNumber("")
        return
      case '=':
        setHistoryNumber(number + '=')
        calculate()
        return
      case '%':
        setHistoryNumber(number + '=')
        setNumber((number / 100).toString())
        return     
      case '+/-':
        aux = parseFloat(number)
        if(aux>0){
          setNumber(aux = aux - (aux * 2))
        }else if(aux < 0){
          setNumber(aux = aux - (aux * 2))
        }
        return
    }
    setNumber(number + button)
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.text_result_history}>{history_number}</Text>
        <Text style={styles.text_result}>{number}</Text>
      </View>
      <View style={styles.keybord}>
        {button_order.map((button_order) =>
            button_order === '=' || button_order === '+' || button_order === '-' || button_order === 'X' || button_order === '÷'?
            <TouchableOpacity key={button_order} style= {[ styles.key, styles.key_operator]} onPress={() => user_input(button_order)}>
              <Text class='key' style={styles.key_text}>{button_order}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity key={button_order} style= {[styles.key, {width: button_order === '0' ? 205 : 95}, {backgroundColor: button_order 
            === 'AC' || button_order === '+/-' || button_order === '%' ? '#949494' : '#454545'},]} onPress={() => user_input(button_order)}>
              <Text class='key' style={[styles.key_text,  {color: button_order 
            === 'AC' || button_order === '+/-' || button_order === '%' ? 'black' : 'white'}]}>{button_order}</Text>
            </TouchableOpacity>
       )}         
  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },

  result: {
    height: 350,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    
  },

  text_result: {
    color: 'white',
    fontSize: 50,
    margin: 10,
  },

  text_result_history: {
    color: '#a3a2a2',
    fontSize: 25,
    margin: 10,
  },

  keybord: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
   
  },

  key: {
    backgroundColor: '#454545',
    borderWidth: 2,
    borderRadius: 100,
    width: 90,
    height: 90,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    
  },

  key_operator: {
    backgroundColor: '#cf9c11',
  },

  key_text: {
    color: 'white',
    fontSize: 30,
  }
});
