import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem, Text} from 'react-native-elements'


export default class Exam extends Component {
  render() {
    return(
      <View style={{padding: 15}}>
        <Text h2>Lists</Text>
        {questions.map( (question, index) => (
          <ListItem
            key={index}
            leftIcon={{name: question.icon}}
            subtitle={question.subtitle}
            title={question.title}/>
        ))}
      </View>
    )
  }
}