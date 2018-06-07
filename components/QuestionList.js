import React, {Component} from 'react'
import {View, Alert, ScrollView, Picker} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'
import QuestionService from '../services/QuestionService'


class QuestionList extends Component {
    static navigationOptions = {title: 'Widgets'}

    constructor(props) {
        super(props)
        this.state = {
            choiceQuestions: [],
            blankQuestions:[],
            essayQuestions:[],
            trueFalseQuestions:[],
            questionType:"TF"
        }
        this.newQuestion = this.newQuestion.bind(this);
        this.updateChoiceQuestions = this.updateChoiceQuestions.bind(this);
        this.updateBlankQuestions= this.updateBlankQuestions.bind(this);
        this.updateEssayQuestions = this.updateEssayQuestions.bind(this);
        this.updateTrueFalseQuestions= this.updateTrueFalseQuestions.bind(this);
        this.QuestionService = QuestionService.instance;
    }

    updateChoiceQuestions(){
        let examId = this.props.navigation.getParam("exam").id;
        this.QuestionService.findAllChoiceQuestionsForExam(examId)
            .then(choiceQuestions => this.setState({choiceQuestions}))

    }

    newQuestion(){
        let examId = this.props.navigation.getParam("exam").id;
        this.props.navigation
            .navigate("TrueFalseQuestionEditor", {examId: examId, updateTrueFalseQuestions:this.updateTrueFalseQuestions })

    }

    updateBlankQuestions(){
        let examId = this.props.navigation.getParam("exam").id;
        this.QuestionService.findAllBLanksQuestionsForExam(examId)
            .then(blankQuestions => this.setState({blankQuestions}))

    }

    updateEssayQuestions(){
        let examId = this.props.navigation.getParam("exam").id;
        this.QuestionService.findAllEssayQuestionsForExam(examId)
            .then(essayQuestions => this.setState({essayQuestions}))

    }

    updateTrueFalseQuestions(){
        let examId = this.props.navigation.getParam("exam").id;
        this.QuestionService.findAllTFQuestionsForExam(examId)
            .then(trueFalseQuestions => this.setState({trueFalseQuestions}))

    }


    componentDidMount() {
        this.updateChoiceQuestions()
        this.updateBlankQuestions()
        this.updateEssayQuestions()
        this.updateTrueFalseQuestions()

    }


    render() {

        let examId = this.props.navigation.getParam("exam").id;
        return (

            <ScrollView style={{padding: 15}}>
                <View  >

                    <Picker
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({questionType: itemValue})}
                        selectedValue={this.state.questionType}>
                        <Picker.Item value="MC" label="Multiple choice" />
                        <Picker.Item value="ES" label="Essay" />
                        <Picker.Item value="TF" label="True or false" />
                        <Picker.Item value="FB" label="Fill in the blanks" />
                    </Picker>

                    <Button backgroundColor="red"
                            color="white"
                            title="Add" onPress={this.newQuestion}/>

                 </View>

                {this.state.choiceQuestions.map(
                        (question, index) => (<ListItem
                            onPress={() => this.props.navigation
                                .navigate("AssignmentWidget", {examId: examId,question: question, updateChoiceQuestions:this.updateChoiceQuestions })}
                            key={index}
                            title={question.title}/>))}

                {this.state.blankQuestions.map(
                    (question, index) => (<ListItem
                        onPress={() => this.props.navigation
                            .navigate("AssignmentWidget", {examId: examId,question: question, updateBlankQuestions:this.updateBlankQuestions })}
                        key={index}
                        title={question.title}/>))}

                {this.state.essayQuestions.map(
                    (question, index) => (<ListItem
                        onPress={() => this.props.navigation
                            .navigate("AssignmentWidget", {examId: examId,question: question, updateEssayQuestions:this.updateEssayQuestions })}
                        key={index}
                        title={question.title}/>))}

                {this.state.trueFalseQuestions.map(
                    (question, index) => (<ListItem
                        onPress={() => this.props.navigation
                            .navigate("AssignmentWidget", {examId: examId,question: question, updateTrueFalseQuestions:this.updateTrueFalseQuestions })}
                        key={index}
                        title={question.title}/>))}


            </ScrollView>



        )


    }
}

export default QuestionList