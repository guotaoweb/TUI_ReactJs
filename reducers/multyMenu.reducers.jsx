import 'babel-polyfill'
const initState = {
    data: ""
}


export default function multyMenuReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_DATA_MULTYMENU":
            return Object.assign({}, state, { data: action.data })
        default: return state
    }
}
