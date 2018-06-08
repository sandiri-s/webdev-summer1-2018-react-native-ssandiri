import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TrueOrFalseQuestionWidget from './elements/TrueOrFalseQuestionWidget'
import MultipleChoiceQuestionWidget from './elements/MultipleChoiceQuestionWidget'
import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'

import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import AssignmentWidget from './elements/AssignmentWidget';
import NewExam from "./elements/NewExam";
import FillInTheBlanksQuestionWidget from "./elements/FillInTheBlanksQuestionWidget";
import EssayQuestionWidget from "./elements/EssayQuestionWidget";

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <ScrollView>
        <StatusBar barStyle="light-content"/>
        <FixedHeader/>

        <Button title="Courses"
                onPress={() => this.props.navigation
                  .navigate('CourseList') } />



      </ScrollView>
    )
  }
}





const App = createStackNavigator({
  Home,
  CourseList,
  ModuleList,
  LessonList,
  WidgetList,
  QuestionList,
    TrueOrFalseQuestionWidget,
  MultipleChoiceQuestionWidget,
  AssignmentWidget,
    EssayQuestionWidget,

    NewExam,
    FillInTheBlanksQuestionWidget
});

export default App;
