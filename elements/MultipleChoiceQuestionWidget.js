import React from 'react'
import {View,StyleSheet} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import QuestionService from '../services/QuestionService'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

class MultipleChoiceQuestionWidget extends React.Component {
    static navigationOptions = { title: "Multiple choice"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            options: "",
            correctOption:0
        }
        this.QuestionService = QuestionService.instance;
        this.createQuestion=this.createQuestion.bind(this);
        this.optionField="";
        this.onSelect = this.onSelect.bind(this)
    }
    updateForm(newState) {
        this.setState(newState)
    }

    updateOptionField(value){

        this.optionField = value;
    }

    onSelect(index,value){

        this.updateForm({correctOption:index});
    }

    createQuestion() {
        let question;
        let examId = this.props.navigation.getParam("examId");
        let updateChoiceQuestions = this.props.navigation.getParam("updateChoiceQuestions");
        question = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            options:this.state.options,
            correctOption:this.state.correctOption,
            type: "Choice"
        }

        this.QuestionService.createChoiceQuestion(examId, question).then(() => this.props.navigation
            .navigate("QuestionList", {examId: examId})).then(() => updateChoiceQuestions());
    }




    render() {
        return(
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                }/>


                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                }/>


                <FormLabel>enter an option</FormLabel>
                <FormInput onChangeText={
                    text => this.updateOptionField(text)
                }/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Add option"
                           onPress={() => this.updateForm({options: this.state.options  + this.optionField + " "})}/>

                <View style={styles.container}>
                    <RadioGroup
                        size={24}
                        thickness={2}
                        color='#9575b2'
                        highlightColor='#ccc8b9'
                        onSelect = {(index, value) => this.onSelect(index, value)}
                    >

                        {this.state.options.split(" ").slice(0,-1).map(
                            (option, index) => (<RadioButton
                                key = {index}
                                value = {option}>
                                    <Text>{option}</Text>
                                </RadioButton>))}

                    </RadioGroup>



                </View>


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

let styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
    text: {
        padding: 10,
        fontSize: 14,
    },
})
export default MultipleChoiceQuestionWidget