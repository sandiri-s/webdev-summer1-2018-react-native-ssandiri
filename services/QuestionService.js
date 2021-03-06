const CHOICE_QUESTION_API_URL =
    'https://react-native-java-server.herokuapp.com/api/exam/EID/choice';

const ESSAY_QUESTION_API_URL =
    'https://react-native-java-server.herokuapp.com/api/exam/EID/essay';

const TF_QUESTION_API_URL =
    'https://react-native-java-server.herokuapp.com/api/exam/EID/truefalse';

const BLANKS_QUESTION_API_URL =
    'https://react-native-java-server.herokuapp.com/api/exam/EID/blanks';

const BASE_URL =
    'https://react-native-java-server.herokuapp.com/api/';


let _singleton = Symbol();
export default class QuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllChoiceQuestionsForExam(examId) {
        return fetch(
            CHOICE_QUESTION_API_URL
                .replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
    }

    findAllEssayQuestionsForExam(examId) {
        return fetch(
            ESSAY_QUESTION_API_URL
                .replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
    }

    findAllTFQuestionsForExam(examId) {
        return fetch(
            TF_QUESTION_API_URL
                .replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
    }

    findAllBLanksQuestionsForExam(examId) {
        return fetch(
            BLANKS_QUESTION_API_URL
                .replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
    }




    deleteQuestion(questionId){
        return fetch(BASE_URL + 'question/' + questionId, {
            method: 'delete'
        });
    }


    updateChoiceQuestion(questionId,question) {
        return fetch(BASE_URL + 'choice/' + questionId, {
            method: 'put',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response){
                if(response.bodyUsed) {
                    return response.json();
                } else {
                    return null;
                }
            });

    }

    updateFIBQuestion(questionId,question) {
        return fetch(BASE_URL + 'blanks/' + questionId, {
            method: 'put',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response){
                if(response.bodyUsed) {
                    return response.json();
                } else {
                    return null;
                }
            });

    }

    updateEssayQuestion(questionId,question) {
        return fetch(BASE_URL + 'essay/' + questionId, {
            method: 'put',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response){
                if(response.bodyUsed) {
                    return response.json();
                } else {
                    return null;
                }
            });

    }

    updateTFQuestion(questionId,question) {
        return fetch(BASE_URL + 'truefalse/' + questionId, {
            method: 'put',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response){
                if(response.bodyUsed) {
                    return response.json();
                } else {
                    return null;
                }
            });

    }

    createChoiceQuestion(examId, question) {
        return fetch(CHOICE_QUESTION_API_URL.replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    createEssayQuestion(examId, question) {
        return fetch(ESSAY_QUESTION_API_URL.replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    createBlanksQuestion(examId, question) {
        return fetch(BLANKS_QUESTION_API_URL.replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    createTFQuestion(examId, question) {
        return fetch(TF_QUESTION_API_URL.replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new QuestionService(_singleton);
        return this[_singleton]
    }
}
