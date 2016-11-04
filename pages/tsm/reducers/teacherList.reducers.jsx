import 'babel-polyfill'

const initState = {
    data: "",
    classesData:"",
    courseData:"",
    detail: {
        id: "",
        name: "",
        courseId: "",
        classesId: ""
    }
}

export default function teacherListReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_TEACHER_DATA":
            return Object.assign({}, state, { data: action.data })
        case "ADD_CLASSES_DATA":
            return Object.assign({}, state, { classesData: action.data })
        case "ADD_COURSE_DATA":
            return Object.assign({}, state, { courseData: action.data })
        case "UPDATE_TEACHER_DATA":
            if (state.data) {
                state.data.push(action.data)
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "UPDATE_TEACHER_INFO":
            return Object.assign({}, state, {
                detail: {
                    id: action.data.id ? action.data.id : state.detail.id,
                    name: action.data.name? action.data.name : state.detail.name,
                    courseId: action.data.courseId? action.data.courseId : state.detail.courseId,
                    classesId: action.data.classesId? action.data.classesId : state.detail.classesId,
                }
            })
        case "CLEAR_TEACHER_INFO":
            return Object.assign({}, state, {
                detail: {
                    id: state.detail.id,
                    name: "",
                    courseId: "",
                    classesId: ""
                }
            })
        case "UPDATE_TEACHER_ID":
            return Object.assign({}, state, {
                detail: {
                    id: action.id,
                    name: "",
                    courseId: "",
                    classesId: ""
                }
            })

        case "UPDATE_TEACHER_LIST_BYID":
            for (var i = 0; i < state.data.length; i++) {
                var _d = state.data[i]
                if (_d.id == state.detail.id) {
                    _d.name = state.detail.name
                    _d.course = state.detail.course
                    _d.classes = state.detail.classes
                    break
                }
            }

            return Object.assign({}, state, {
                data: eval(JSON.stringify(state.data))
            })
        case "DELETE_TEACHER_BYID":
            for (var i = 0; i < state.data.length; i++) {
                var _d = state.data[i]
                if (_d.id == action.id) {
                    state.data.splice(i, 1)
                }
            }
            return Object.assign({}, state, {
                data: eval(JSON.stringify(state.data))
            })
        default: return state
    }
}