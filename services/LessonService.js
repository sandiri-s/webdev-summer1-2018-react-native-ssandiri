const LESSON_API_URL =
  'https://react-native-java-server.herokuapp.comapi/module/MID/lesson';

const LESSON_BASE_URL =
  'https://react-native-java-server.herokuapp.com/api/lesson';

let _singleton = Symbol();
export default class LessonService {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Singleton!!!');
  }

  findAllLessonsForModule(moduleId) {
    return fetch(
      LESSON_API_URL
        .replace('MID', moduleId))
      .then(function (response) {
        return response.json();
      })
  }

  findAllLessons() {
    return fetch(LESSON_API_URL)
    .then(function(response){
      return response.json();
    });
  }


  deleteLesson(LessonId){
    return fetch(LESSON_BASE_URL + '/' + LessonId, {
      method: 'delete'
    });
  }
  createLesson(moduleId, lesson) {
    return fetch(LESSON_API_URL.replace('MID', moduleId),
      {
        body: JSON.stringify(lesson),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }).then(function (response)
    { return response.json(); })
  }

  static get instance() {
    if(!this[_singleton])
      this[_singleton] = new LessonService(_singleton);
    return this[_singleton]
  }
}
