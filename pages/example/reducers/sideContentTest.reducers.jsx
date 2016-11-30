import 'babel-polyfill'

const initState = {
    test: [{name:"1"},{name:"1"},{name:"1"},{name:"1"},{name:"1"},{name:"1"},{name:"1"},{name:"1"}]
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_SIDECONTENT":
            state.test.push(action.data)
            return Object.assign({}, state, { test: JSON.parse(JSON.stringify(state.test)) })
        default:return state
    }
}