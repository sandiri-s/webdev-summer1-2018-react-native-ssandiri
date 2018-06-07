import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'
import QuestionService from '../services/QuestionService'

class TrueFalseQuestionEditor extends React.Component {
  static navigationOptions = { title: "True False"}
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      points: 0,
      isTrue: true
    }
    this.QuestionService = QuestionService.instance;
    this.createQuestion=this.createQuestion.bind(this);
  }
  updateForm(newState) {
    this.setState(newState)
  }


    createQuestion() {
        let question;
        let examId = this.props.navigation.getParam("examId");
        let updateTrueFalseQuestions = this.props.navigation.getParam("updateTrueFalseQuestions");
        question = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            isTrue:this.state.isTrue,
            type: "TrueFalse"
        }

        this.QuestionService.createTFQuestion(examId, question).then(() => this.props.navigation
            .navigate("QuestionList", {examId: examId})).then(() => updateTrueFalseQuestions());
    }




  render() {
    return(
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({title: text})
        }/>
        <FormValidationMessage>
          Title is required
        </FormValidationMessage>

        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({description: text})
        }/>
        <FormValidationMessage>
          Description is required
        </FormValidationMessage>

        <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                  checked={this.state.isTrue} title={'The answer is ' + this.state.isTrue.toString()}/>

        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
                 onPress={this.createQuestion}
        />
        <Button	backgroundColor="red"
                 color="white"
                 title="Cancel"/>

        <Text h3>Preview</Text>
        <Text h2>{this.state.title}</Text>
        <Text>{this.state.description}</Text>

      </View>
    )
  }
}

export default TrueFalseQuestionEditor