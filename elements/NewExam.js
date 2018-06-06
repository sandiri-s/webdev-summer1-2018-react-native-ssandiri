import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import ExamService from '../services/ExamService'

class NewExam extends React.Component {
    static navigationOptions = { title: "New Exam"}
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        };
        this.examService = ExamService.instance;
        this.createExam= this.createExam.bind(this);
    }



    updateForm(newState) {
        this.setState(newState)
    }




    createExam(){
        let exam;
        let lessonId = this.props.navigation.getParam("lessonId");
        let updateExams = this.props.navigation.getParam("updateExams");
        exam = {
            title: this.state.title,
            description: this.state.description,
            widgetType : "Exam"
        }

        this.examService.createExam(lessonId,exam).then(() => this.props.navigation
            .navigate("WidgetList", {lessonId: lessonId})).then(() => updateExams());
    }
    render() {
        return(
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                } value={ this.state.title}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>


                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                } value={this.state.description}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>


                <Button	backgroundColor="green"
                           color="white"
                           title="Save" onPress={this.createExam}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                />

                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text>{this.state.description}</Text>

            </View>
        )
    }
}

export default NewExam