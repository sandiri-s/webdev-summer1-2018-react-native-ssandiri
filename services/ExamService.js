const EXAM_API_URL =
    'https://react-native-java-server.herokuapp.com/api/lesson/LID/exam';

const EXAM_BASE_URL =
    'https://react-native-java-server.herokuapp.com/api/exam';

let _singleton = Symbol();
export default class ExamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllExamsForLesson(lessonId) {
        return fetch(
            EXAM_API_URL
                .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }

    findAllExams() {
        return fetch(EXAM_API_URL)
            .then(function(response){
                return response.json();
            });
    }


    deleteExam(examId){
        return fetch(EXAM_BASE_URL + '/' + examId, {
            method: 'delete'
        });
    }
    createExam(lessonId, exam) {
        return fetch(EXAM_API_URL.replace('LID', lessonId),
            {
                body: JSON.stringify(exam),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }
}
