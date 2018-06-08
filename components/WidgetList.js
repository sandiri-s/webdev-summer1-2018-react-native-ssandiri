import React, {Component} from 'react'
import {View, Alert,ScrollView} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'
import ExamService from '../services/ExamService'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}

    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            exams: []
        }
        this.updateAssignments = this.updateAssignments.bind(this);
        this.updateExams= this.updateExams.bind(this);
        this.assignmentService = AssignmentService.instance;
        this.examService = ExamService.instance;
    }

    updateAssignments(){
        let lessonId = this.props.navigation.getParam("lessonId");
          this.assignmentService.findAllAssignmentsForLesson(lessonId)
            .then(assignments => this.setState({assignments}))


    }


    updateExams(){
        let lessonId = this.props.navigation.getParam("lessonId");
        console.log(lessonId);
        this.examService.findAllExamsForLesson(lessonId)
            .then(exams => this.setState({exams}))


    }


    componentDidMount() {

        this.updateAssignments();
        this.updateExams();
    }

    render() {

        let lessonId = this.props.navigation.getParam("lessonId")
        return (

            <ScrollView>
            <View style={{padding: 15}}>
              <Text h4> Assignments </Text>
            {this.state.assignments.map(
                (assignment, index) => (<ListItem
                            onPress={() => this.props.navigation
                                .navigate("AssignmentWidget", {lessonId: lessonId,assignment: assignment, updateAssignments:this.updateAssignments })}
                            key={index}
                            subtitle={assignment.description}
                            title={assignment.title}/>))}
            <View style={{padding: 5}}>
                <Button	style={{padding: 5}} backgroundColor="orange"
                           color="white"
                           title="Add Assignment"
                           onPress={() => this.props.navigation
                               .navigate("AssignmentWidget", {lessonId: lessonId, updateAssignments:this.updateAssignments })}
                />
            </View>
            </View>



                <View style={{padding: 15}}>
                    <Text h4> Exams </Text>
                    {this.state.exams.map(
                        (exam, index) => (<ListItem
                            onPress={() => this.props.navigation
                                .navigate("QuestionList", {examId: exam.id})}
                            key={index}
                            subtitle={exam.description}
                            title={exam.title}/>))}
                    <View style={{padding: 5}}>
                        <Button	style={{padding: 5}} backgroundColor="orange"
                                   color="white"
                                   title="Add Exam"
                                   onPress={() => this.props.navigation
                                       .navigate("NewExam", {lessonId: lessonId,updateExams:this.updateExams })}
                        />
                    </View>
                </View>




            </ScrollView>




            )


    }
}

export default WidgetList