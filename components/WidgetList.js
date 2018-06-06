import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}

    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            exams: []
        }
        this.updateAssignments = this.updateAssignments.bind(this);
        this.assignmentService = AssignmentService.instance;
    }

    updateAssignments(){
        let lessonId = this.props.navigation.getParam("lessonId");
          this.assignmentService.findAllAssignmentsForLesson(lessonId)
            .then(assignments => this.setState({assignments}))


    }
    componentDidMount() {

        this.updateAssignments();
    }

    render() {

        let lessonId = this.props.navigation.getParam("lessonId")
        return (

            <View>
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
                <Button	backgroundColor="red"
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
                                .navigate("ExamWidget", {exam: exam})}
                            key={index}
                            subtitle={exam.description}
                            title={exam.title}/>))}
                    <View style={{padding: 5}}>
                        <Button	backgroundColor="red"
                                   color="white"
                                   title="Add Exam"
                                   onPress={() => this.props.navigation
                                       .navigate("AssignmentWidget", {lessonId: lessonId})}
                        />
                    </View>
                </View>




            </View>




            )


    }
}

export default WidgetList