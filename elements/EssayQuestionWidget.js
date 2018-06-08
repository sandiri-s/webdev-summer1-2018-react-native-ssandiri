import React from 'react'
import {ScrollView, View,StyleSheet, TextInput} from 'react-native'
import {Text, Button, CheckBox, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import QuestionService from '../services/QuestionService'

class EssayQuestionWidget extends React.Component {
    static navigationOptions = {title: "Essay Question"}

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            points: 0,
            existing : false
        };
        this.QuestionService = QuestionService.instance;
        this.createQuestion = this.createQuestion.bind(this);
        this.deleteQuestion=this.deleteQuestion.bind(this);
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
                    existing: true
                });
        }

    }

    deleteQuestion(){
        let examId = this.props.navigation.getParam("examId");
        let question = this.props.navigation.getParam("question");
        let updateEssayQuestions = this.props.navigation.getParam("updateEssayQuestions");
        this.QuestionService.deleteQuestion(question.id).then(() => this.props.navigation
            .navigate("QuestionList", {examId: examId})).then(() => updateEssayQuestions());


    }
    createQuestion() {
        let question;

        let examId = this.props.navigation.getParam("examId");
        let updateEssayQuestions = this.props.navigation.getParam("updateEssayQuestions");
        question = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            type: "Essay"
        }
        if(this.state.existing)
        {   let questionId = this.props.navigation.getParam("question").id;
            this.QuestionService.updateEssayQuestion(questionId, question).then(() => this.props.navigation
                .navigate("QuestionList", {examId: examId})).then(() => updateEssayQuestions());
        }
        else {
            this.QuestionService.createEssayQuestion(examId, question).then(() => this.props.navigation
                .navigate("QuestionList", {examId: examId})).then(() => updateEssayQuestions());
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
                    <View style={{padding: 5}} >
                        <Text h5>Essay Answer</Text>
                        <TextInput multiline={true}
                                   style={{
                                       height: 100,
                                       backgroundColor: 'white',
                                       borderBottomWidth: 0,
                                       borderWidth: 2,
                                       padding:10
                                   }}
                                   placeholder="write the essay here"
                        />


                    </View>

                    <Button style={{padding: 10}} title='Submit'/>


                </View>

            </ScrollView>
        )
    }

}
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
export default EssayQuestionWidget