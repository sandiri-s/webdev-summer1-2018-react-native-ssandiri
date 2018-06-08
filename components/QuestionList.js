import React, {Component} from 'react'
import {View, Alert, ScrollView, Picker} from 'react-native'
import {Text, Button, ListItem,Divider} from 'react-native-elements'
import QuestionService from '../services/QuestionService'
import MultipleChoiceQuestionWidget from "../elements/MultipleChoiceQuestionWidget";
import FillInTheBlanksQuestionWidget from "../elements/FillInTheBlanksQuestionWidget";


class QuestionList extends Component {
    static navigationOptions = {title: 'Questions'}

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
        let examId = this.props.navigation.getParam("examId");
        this.QuestionService.findAllChoiceQuestionsForExam(examId)
            .then(choiceQuestions => this.setState({choiceQuestions}))

    }

    newQuestion(){
        let examId = this.props.navigation.getParam("examId");
        
        switch (this.state.questionType) {
            case "TF":
                this.props.navigation
                    .navigate("TrueOrFalseQuestionWidget", {examId: examId, updateTrueFalseQuestions:this.updateTrueFalseQuestions });
                break;
            case "ES":
                this.props.navigation
                    .navigate("EssayQuestionWidget", {examId: examId, updateEssayQuestions:this.updateEssayQuestions });
                break;
            case "MC":
                this.props.navigation
                    .navigate("MultipleChoiceQuestionWidget", {examId: examId, updateChoiceQuestions:this.updateChoiceQuestions });
                break;
            case "FB":
                this.props.navigation
                    .navigate("FillInTheBlanksQuestionWidget", {examId: examId, updateBlankQuestions:this.updateBlankQuestions });
                break;
        }


    }

    updateBlankQuestions(){
        let examId = this.props.navigation.getParam("examId");
        this.QuestionService.findAllBLanksQuestionsForExam(examId)
            .then(blankQuestions => this.setState({blankQuestions}))

    }

    updateEssayQuestions(){
        let examId = this.props.navigation.getParam("examId");
        this.QuestionService.findAllEssayQuestionsForExam(examId)
            .then(essayQuestions => this.setState({essayQuestions}))

    }

    updateTrueFalseQuestions(){
        let examId = this.props.navigation.getParam("examId");
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

        let examId = this.props.navigation.getParam("examId");
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

                    <Button backgroundColor="orange"
                            color="white"
                            title="Add Question"
                            style={{padding: 5}} onPress={this.newQuestion}/>

                    <View style={{padding: 10}} >
                    <Divider style={{
                        backgroundColor:
                            'black' }}/>
                    <Text h4>Questions</Text>
                    <Divider style={{
                        backgroundColor:
                            'black' }}/>
                    </View>
                 </View>

                {this.state.choiceQuestions.map(
                        (question, index) => (<ListItem
                            leftIcon={{name: 'list'}}
                            onPress={() => this.props.navigation
                                .navigate("MultipleChoiceQuestionWidget", {examId: examId,question: question, updateChoiceQuestions:this.updateChoiceQuestions })}
                            key={index}
                            title={question.title}/>))}

                {this.state.blankQuestions.map(
                    (question, index) => (<ListItem
                                leftIcon={{name: 'code'}}
                        onPress={() => this.props.navigation
                            .navigate("FillInTheBlanksQuestionWidget", {examId: examId,question: question, updateBlankQuestions:this.updateBlankQuestions })}
                        key={index}
                        title={question.title}/>))}

                {this.state.essayQuestions.map(
                    (question, index) => (<ListItem
                                    leftIcon={{name: 'subject'}}
                        onPress={() => this.props.navigation
                            .navigate("EssayQuestionWidget", {examId: examId,question: question, updateEssayQuestions:this.updateEssayQuestions })}
                        key={index}
                        title={question.title}/>))}

                {this.state.trueFalseQuestions.map(
                    (question, index) => (<ListItem
                                        leftIcon={{name: 'check'}}
                        onPress={() => this.props.navigation
                            .navigate("TrueOrFalseQuestionWidget", {examId: examId,question: question, updateTrueFalseQuestions:this.updateTrueFalseQuestions })}
                        key={index}
                        title={question.title}/>))}


            </ScrollView>



        )


    }
}

export default QuestionList