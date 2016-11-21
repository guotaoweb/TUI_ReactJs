import 'babel-polyfill'

const initState = {
    data: "",
    detail: {
        id: "",
        name: "",
    },
    survyList: []
}

export default function courseListReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_COURSE_DATA":
            return Object.assign({}, state, { data: action.data })
        case "UPDATE_COURSE_DATA":
            if (state.data) {
                state.data.push(action.data)
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "UPDATE_COURSE_ID":
            return Object.assign({}, state, {
                detail: {
                    id: action.id,
                    name: ""
                }
            })

        case "UPDATE_COURSE_LIST_BYID":
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
        case "DELETE_COURSE_BYID":
            for (var i = 0; i < state.data.length; i++) {
                var _d = state.data[i]
                if (_d.id == action.id) {
                    state.data.splice(i, 1)
                }
            }
            return Object.assign({}, state, {
                data: eval(JSON.stringify(state.data))
            })
        case "COURSE_BIND_SURVY":
            return Object.assign({}, state, {
                survyList: eval(JSON.stringify(action.data))
            })
        default: return state
    }
}