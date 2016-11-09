import 'babel-polyfill'

const initState = {
    data: [],
    sdata: []
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_SIDE":
            return Object.assign({}, state, { data: JSON.parse(JSON.stringify(action.data)) })
        case "ADD_SELECTED_SIDE":
            return Object.assign({}, state, { sdata: action.data })
        default: return state
    }
}