import 'babel-polyfill'

const initState = {
    list: ""
}

export default function classesListReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_CLASSES_LIST":
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
        case "LOAD_CLASSES_LIST":
            return Object.assign({}, state, {
                list: JSON.parse(JSON.stringify(action.data))
            })
        case "DELETE_CLASSES_LIST":
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
        case "UPDATE_CLASSES_LIST":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]

                if ($d.Id == action.data.Id) {
                    $d.Name = action.data.Name
                    $d.Grade = action.data.Grade
                    $d.Number = action.data.Number
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        default:
            return state
    }
}