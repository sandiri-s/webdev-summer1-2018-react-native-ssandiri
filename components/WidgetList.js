import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      courseId: 1,
      moduleId: 1
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const lessonId = navigation.getParam("lessonId")
    fetch("https://react-native-java-server.herokuapp.com/api/lesson/"+lessonId+"/widget")
      .then(response => (response.json()))
      .then(widgets => this.setState({widgets}))
  }
  render() {
    return(
      <View style={{padding: 15}}>
      {this.state.widgets.map(
        (widget, index) => (
          <ListItem
            onPress={() => this.props.navigation
              .navigate("QuestionList", {examId: widget.id})}
            key={index}
            subtitle={widget.description}
            title={widget.title}/>))}
          <View style={{padding: 5}}>
          <Button	backgroundColor="red"
                     color="white"
                     title="Add Assignment"/>
           </View>
          <View style={{padding: 5}}>
          <Button	backgroundColor="red"
                     color="white"
                     title="Add Exam"/>
          </View>

      </View>
    )
  }
}
export default WidgetList