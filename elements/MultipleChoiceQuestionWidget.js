import React from 'react'
import {ScrollView, View,StyleSheet, TextInput,TouchableOpacity} from 'react-native'
import {Text, Button, CheckBox, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import QuestionService from '../services/QuestionService'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

class MultipleChoiceQuestionWidget extends React.Component {
    static navigationOptions = {title: "Essay Question"}

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            points: 0,
            options: "",
            correctOption:0
        }
        this.QuestionService = QuestionService.instance;
        this.createQuestion=this.createQuestion.bind(this);
        this.deleteQuestion=this.deleteQuestion.bind(this);
        this.optionField="";
        this.onSelect = this.onSelect.bind(this)
        this.updateOptionField=this.updateOptionField.bind(this);
        this.deleteOption=this.deleteOption.bind(this);
    }

    deleteOption(index){

       this.setState({options: this.state.options.splice( index, 1 )});
    }

    updateForm(newState) {
        this.setState(newState)
    }


    componentDidMount() {
        let question = this.props.navigation.getParam("question");
        if (typeof question !== 'undefined') {
            this.setState(
                {
                    title: question.title,
                    description: question.description,
                    points: question.points,
                    existing: true,
                    options:question.options,
                    correctOption:question.correctOption,
                });
        }

    }

    deleteQuestion(){
        let examId = this.props.navigation.getParam("examId");
        let question = this.props.navigation.getParam("question");
        let updateChoiceQuestions = this.props.navigation.getParam("updateChoiceQuestions");
        this.QuestionService.deleteQuestion(question.id).then(() => this.props.navigation
            .navigate("QuestionList", {examId: examId})).then(() => updateChoiceQuestions());


    }
    onSelect(index,value){

        this.updateForm({correctOption:index});
    }

    updateOptionField(value){

        this.optionField = value;
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
        if(this.state.existing)
        {   let questionId = this.props.navigation.getParam("question").id;
            this.QuestionService.updateChoiceQuestion(questionId, question).then(() => this.props.navigation
                .navigate("QuestionList", {examId: examId})).then(() => updateChoiceQuestions());
        }
        else {
            this.QuestionService.createChoiceQuestion(examId, question).then(() => this.props.navigation
                .navigate("QuestionList", {examId: examId})).then(() => updateChoiceQuestions());
        }
    }

    render() {
        let examId = this.props.navigation.getParam("examId");
        return (
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                } value={this.state.title}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    points => this.updateForm({points: points})
                } value={this.state.points.toString()}/>
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                } value={this.state.description}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>


                <FormLabel>Enter an option</FormLabel>
                <FormInput onChangeText={
                    text => this.updateOptionField(text)
                }/>
                <Button	style={{padding: 10}}  backgroundColor="red"
                           color="white"
                           title="Add option"
                           onPress={() => this.updateForm({options: this.state.options  + this.optionField + " "})}/>

                <View style={styles.container}>
                    <RadioGroup
                        size={24}
                        thickness={2}
                        color='#9575b2'
                        highlightColor='#ccc8b9'
                        selectedIndex={this.state.correctOption}
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



                <View style={questionStyles.buttonRow}>

                    <Button backgroundColor="green"
                            color="white"
                            title="Save" onPress={this.createQuestion}/>
                    <Button backgroundColor="orange"
                            color="white"
                            title="Cancel"
                            onPress={() => this.props.navigation
                                .navigate("QuestionList", {examId: examId})}
                    />
                    {this.state.existing && <Button backgroundColor="red"
                                                    color="white"
                                                    title="delete"
                                                    onPress={this.deleteQuestion}

                    />}
                </View>
                <Divider style={{
                    backgroundColor:
                        'black' }}/>
                <Text h4>Preview</Text>
                <Divider style={{
                    backgroundColor:
                        'black' }}/>
                <View style={questionStyles.rows}>
                    <Text h5 >
                        {this.state.title}
                    </Text>
                    <Text h5 >
                        {this.state.points}pts
                    </Text>
                </View>
                <View style={{padding: 5}}>
                    <Text style={questionStyles.description}>
                        {this.state.description}
                    </Text>
                    <View style={styles.container}>
                        <RadioGroup
                            size={24}
                            thickness={2}
                            color='#9575b2'
                            highlightColor='#ccc8b9'
                        >

                            {this.state.options.split(" ").slice(0,-1).map(
                                (option, index) => (<RadioButton
                                    key = {index}
                                    value = {option}>
                                    <Text>{option}</Text>
                                </RadioButton>))}

                        </RadioGroup>



                    </View>

                    <Button style={{padding: 10}} title='Submit'/>


                </View>

            </ScrollView>
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

const questionStyles = StyleSheet.create({

    rows: {
        flexDirection: 'row',padding: 10,
        justifyContent: 'space-between'
    },

    buttonRow: {
        flexDirection: 'row',padding: 20,
        justifyContent: 'space-between'
    }
    ,

    description: {
        padding: 10,
        fontSize: 15
    }
});
export default MultipleChoiceQuestionWidget