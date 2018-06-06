import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'

class AssignmentWidget extends React.Component {
    static navigationOptions = { title: "Assignment Widget"}
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            points: 0,
        };
        this.AssignmentService = AssignmentService.instance;
        this.createAssignment= this.createAssignment.bind(this);
    }



    updateForm(newState) {
        this.setState(newState)
    }


    componentDidMount(){
        let assignment = this.props.navigation.getParam("assignment");
        if(typeof assignment !== 'undefined'){

            this.setState(
                {
                    title : assignment.title,
                    description : assignment.description,
                    points : assignment.points

                });
        }

    }


    createAssignment(){
        let assignment;
        let lessonId = this.props.navigation.getParam("lessonId");
        let updateAssignments = this.props.navigation.getParam("updateAssignments");
        assignment = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            widgetType : "Assignment"
        }

        this.AssignmentService.createAssignment(lessonId,assignment).then(() => this.props.navigation
            .navigate("WidgetList", {lessonId: lessonId})).then(() => updateAssignments());
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


                <Button	backgroundColor="green"
                           color="white"
                           title="Save" onPress={this.createAssignment}/>
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

export default AssignmentWidget