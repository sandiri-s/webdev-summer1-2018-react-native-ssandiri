const ASSIGNMENT_API_URL =
    'https://react-native-java-server.herokuapp.com/api/lesson/LID/assignment';

const ASSIGNMENT_BASE_URL =
    'https://react-native-java-server.herokuapp.com/api/assignment';

let _singleton = Symbol();
export default class AssignmentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllAssignmentsForLesson(lessonId) {
        return fetch(
            ASSIGNMENT_API_URL
                .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }

    findAllAssignments() {
        return fetch(ASSIGNMENT_API_URL)
            .then(function(response){
                return response.json();
            });
    }


    deleteAssignment(assignmentId){
        return fetch(ASSIGNMENT_BASE_URL + '/' + assignmentId, {
            method: 'delete'
        });
    }
    createAssignment(lessonId, assignment) {
        return fetch(ASSIGNMENT_API_URL.replace('LID', lessonId),
            {
                body: JSON.stringify(assignment),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }
}
