import 'babel-polyfill'

const initState = {
    data: []
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_TABLE_DATA":
            return Object.assign({}, state, { data: action.data})
        default: return state
    }
}