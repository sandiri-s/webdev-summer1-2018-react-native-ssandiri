import React from 'react'
import {ScrollView, View,StyleSheet, TextInput} from 'react-native'
import {Text, Button, CheckBox, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'

class AssignmentWidget extends React.Component {
    static navigationOptions = {title: "Assignment Widget"}

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            points: 0,
            existing : false
        };
        this.AssignmentService = AssignmentService.instance;
        this.createAssignment = this.createAssignment.bind(this);
        this.deleteAssignment=this.deleteAssignment.bind(this);
    }


    updateForm(newState) {
        this.setState(newState)
    }


    componentDidMount() {
        let assignment = this.props.navigation.getParam("assignment");
        if (typeof assignment !== 'undefined') {

            this.setState(
                {
                    title: assignment.title,
                    description: assignment.description,
                    points: assignment.points,
                    existing: true
                });
        }

    }

    deleteAssignment(){
        let lessonId = this.props.navigation.getParam("lessonId");
        let assignment = this.props.navigation.getParam("assignment");
        let updateAssignments = this.props.navigation.getParam("updateAssignments");
        this.AssignmentService.deleteAssignment(assignment.id).then(() => this.props.navigation
            .navigate("WidgetList", {lessonId: lessonId})).then(() => updateAssignments());


    }
    createAssignment() {
        let assignment;

        let lessonId = this.props.navigation.getParam("lessonId");
        let updateAssignments = this.props.navigation.getParam("updateAssignments");
        assignment = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            widgetType: "Assignment"
        }
        if(this.state.existing)
        {   let assignmentId = this.props.navigation.getParam("assignment").id;
            this.AssignmentService.updateAssignment(assignmentId, assignment).then(() => this.props.navigation
                .navigate("WidgetList", {lessonId: lessonId})).then(() => updateAssignments());
        }
        else {
            this.AssignmentService.createAssignment(lessonId, assignment).then(() => this.props.navigation
                .navigate("WidgetList", {lessonId: lessonId})).then(() => updateAssignments());
        }
    }

    render() {
        let lessonId = this.props.navigation.getParam("lessonId");
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
                <View style={assignmentStyles.buttonRow}>

                <Button backgroundColor="green"
                        color="white"
                        title="Save" onPress={this.createAssignment}/>
                <Button backgroundColor="orange"
                        color="white"
                        title="Cancel"
                        onPress={() => this.props.navigation
                            .navigate("WidgetList", {lessonId: lessonId})}
                />
                {this.state.existing && <Button backgroundColor="red"
                        color="white"
                        title="delete"
                    onPress={this.deleteAssignment}

                />}
                </View>
                <Divider style={{
                    backgroundColor:
                        'black' }}/>
                <Text h4>Preview</Text>
                <Divider style={{
                    backgroundColor:
                        'black' }}/>
                <View style={assignmentStyles.rows}>
                    <Text h5 >
                        {this.state.title}
                    </Text>
                    <Text h5 >
                        {this.state.points}pts
                    </Text>
                </View>
                <View style={{padding: 5}}>
                <Text style={assignmentStyles.description}>
                    {this.state.description}
                </Text>
                 <View style={{padding: 5}} >
                <Text h5>Essay Answer</Text>
                <TextInput  multiline={true}
                              numberOfLines={4} placeholder='enter the answer here'/>


                    <Text h5>Upload File</Text>
                    <Button style={{padding: 10, width:120}} title='upload'/>
                 </View>
                    <View style={{padding: 5}}>
                    <FormLabel>Submit a link</FormLabel>
                    <FormInput />
                    </View>

                    <Button style={{padding: 10}} title='Submit'/>


                </View>

            </ScrollView>
        )
    }

}
const assignmentStyles = StyleSheet.create({

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
export default AssignmentWidget