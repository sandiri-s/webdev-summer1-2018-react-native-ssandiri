const CourseService = require("./CourseService")
// @ponicode
describe("findAllCourses", () => {
    let inst

    beforeEach(() => {
        inst = new CourseService.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.findAllCourses()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("deleteCourse", () => {
    let inst

    beforeEach(() => {
        inst = new CourseService.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.deleteCourse(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.deleteCourse(0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.deleteCourse("http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.deleteCourse("https://api.telegram.org/bot")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.deleteCourse("http://base.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.deleteCourse(Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("createCourse", () => {
    let inst

    beforeEach(() => {
        inst = new CourseService.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.createCourse("Senior Brand Assistant")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.createCourse("Product Accountability Executive")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.createCourse("Customer Metrics Consultant")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.createCourse("Principal Implementation Strategist")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.createCourse("National Infrastructure Supervisor")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.createCourse(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
