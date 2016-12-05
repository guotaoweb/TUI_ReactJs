import 'babel-polyfill'

const initState = {
    list: [],
    teacherInClasses:[]
}

export default function teacherListReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_TEACHER_LIST":
            if (state.list.length == 0) {
                return Object.assign({}, state, { list: action.data })
            } else {
                state
                    .list
                    .push(action.data)
                return Object.assign({}, state, {
                    list: JSON.parse(JSON.stringify(state.list))
                })
            }
        case "LOAD_TEACHER_LIST":
            return Object.assign({}, state, {
                list: JSON.parse(JSON.stringify(action.data))
            })
        case "DELETE_TEACHER_LIST":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]
                if ($d.Id == action.id) {
                    state
                        .list
                        .splice(i, 1)
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        case "UPDATE_TEACHER_LIST":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]

                if ($d.Id == action.data.Id) {
                    $d.Name = action.data.Name
                    $d.Courses = action.data.Courses
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        case "ADD_TEACHER_IN_CLASSES":
            return Object.assign({}, state, {
                teacherInClasses: JSON.parse(JSON.stringify(action.data))
            })
        default:
            return state
    }
}