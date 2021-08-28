const MultipleChoiceQuestionWidget = require("./MultipleChoiceQuestionWidget")
// @ponicode
describe("deleteOption", () => {
    let inst

    beforeEach(() => {
        inst = new MultipleChoiceQuestionWidget.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.deleteOption(-100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.deleteOption(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.deleteOption(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.deleteOption(-1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.deleteOption(100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.deleteOption(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new MultipleChoiceQuestionWidget.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("deleteQuestion", () => {
    let inst

    beforeEach(() => {
        inst = new MultipleChoiceQuestionWidget.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.deleteQuestion()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onSelect", () => {
    let inst

    beforeEach(() => {
        inst = new MultipleChoiceQuestionWidget.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.onSelect(100, "elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.onSelect(-100, "elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.onSelect(-1, "Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.onSelect(-100, "Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.onSelect(1, "elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.onSelect(-Infinity, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("updateOptionField", () => {
    let inst

    beforeEach(() => {
        inst = new MultipleChoiceQuestionWidget.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.updateOptionField("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.updateOptionField("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.updateOptionField("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.updateOptionField(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("createQuestion", () => {
    let inst

    beforeEach(() => {
        inst = new MultipleChoiceQuestionWidget.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.createQuestion()
        }
    
        expect(callFunction).not.toThrow()
    })
})
