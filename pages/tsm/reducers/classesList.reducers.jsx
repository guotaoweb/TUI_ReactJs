import 'babel-polyfill'

const initState = {
    data: "",
    detail: {
        id: "",
        name: "",
    }
}

export default function classesListReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_CLASSES_DATA":
            return Object.assign({}, state, { data: action.data })
        case "UPDATE_CLASSES_DATA":
            if (state.data) {
                state.data.push(action.data)
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "UPDATE_CLASSES_INFO":
            return Object.assign({}, state, {
                detail: {
                    id: action.data.id ? action.data.id : state.detail.id,
                    name: action.data.name? action.data.name : state.detail.name
                }
            })
        case "CLEAR_CLASSES_INFO":
            return Object.assign({}, state, {
                detail: {
                    id: state.detail.id,
                    name: ""
                }
            })
        case "UPDATE_CLASSES_ID":
            return Object.assign({}, state, {
                detail: {
                    id: action.id,
                    name: ""
                }
            })

        case "UPDATE_CLASSES_LIST_BYID":
            for (var i = 0; i < state.data.length; i++) {
                var _d = state.data[i]
                if (_d.id == state.detail.id) {
                    _d.name = state.detail.name
                    break
                }
            }

            return Object.assign({}, state, {
                data: eval(JSON.stringify(state.data))
            })
        case "DELETE_CLASSES_BYID":
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