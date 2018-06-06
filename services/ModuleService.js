const MODULE_API_URL =
  'https://react-native-java-server.herokuapp.com/api/course/CID/module';

const MODULE_BASE_URL =
  'https://react-native-java-server.herokuapp.com/api/module';

let _singleton = Symbol();
export default class ModuleService {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Singleton!!!');
  }

  findAllModulesForCourse(courseId) {
    return fetch(
      MODULE_API_URL
        .replace('CID', courseId))
      .then(function (response) {
        return response.json();
      })
  }

  findAllModules() {
    return fetch(MODULE_API_URL)
    .then(function(response){
      return response.json();
    });
  }


  deleteModule(ModuleId){
    return fetch(MODULE_BASE_URL + '/' + ModuleId, {
      method: 'delete'
    });
  }
  createModule(courseId, module) {
    return fetch(MODULE_API_URL.replace('CID', courseId),
      {
        body: JSON.stringify(module),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }).then(function (response)
    { return response.json(); })
  }

  static get instance() {
    if(!this[_singleton])
      this[_singleton] = new ModuleService(_singleton);
    return this[_singleton]
  }
}
