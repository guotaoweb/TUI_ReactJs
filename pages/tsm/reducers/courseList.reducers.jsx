import 'babel-polyfill'

const initState = {
    list: [],
    courseList:[],
    courseDetail:[],
    courseDetailList:[]
}

export default function courseListReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_COURSE_LIST":
            if (state.list.length == 0) {
                return Object.assign({}, state, { list: action.data })
            } else {
                state.list.push(action.data)
                return Object.assign({}, state, {
                    list: JSON.parse(JSON.stringify(state.list))
                })
            }
        case "LOAD_COURSE_LIST":
            return Object.assign({}, state, {
                list: JSON.parse(JSON.stringify(action.data))
            })
        case "DELETE_COURSE_LIST":
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
        case "UPDATE_COURSE_LIST":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]

                if ($d.Id == action.data.Id) {
                    $d.Name = action.data.Name
                    $d.Sort = action.data.Sort
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        case "UPDATE_COURSE_BIND_SURVY":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]
                if (typeof action.data == "string") {
                    if ($d.Id == action.data) {
                        state.list.splice(i, 1)
                    }
                }
                else {
                    for (var j = 0; j < action.data.length; j++) {
                        var $a = action.data[j];
                        if ($d.Id == $a.CourseId) {
                            state.list.splice(i, 1)
                        }
                    }
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        case "ADD_COURSE_STATISTIC_LIST":
            return Object.assign({}, state, {
                courseList: JSON.parse(JSON.stringify(action.data))
            })
        case "ADD_COURSE_STATISTIC_DETAIL":
            return Object.assign({}, state, {
                courseDetail: JSON.parse(JSON.stringify(action.data))
            })
        case "ADD_COURSE_STATISTIC_DETAIL_LIST":
            return Object.assign({}, state, {
                courseDetailList: JSON.parse(JSON.stringify(action.data))
            })
        default:
            return state
    }
}