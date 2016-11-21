import 'babel-polyfill'

const initState = {
    list: [],//问卷列表
    data: []//问卷内容
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_SURVY_LIST":
            return Object.assign({}, state, { list: action.data })
        case "DELETE_SURVY_LIST":
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                if ($d.Id == action.Id) {
                    state.data.splice(i, 1)
                }
            }
            return Object.assign({}, state, { list: eval(JSON.stringify(state.data)) })
        case "UPDATE_SURVY_LIST":
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                if ($d.Id == action.data) {
                    state.data.Name = action.data.Name
                    state.data.Desp = action.data.Desp
                }
            }
            return Object.assign({}, state, { list: eval(JSON.stringify(state.data)) })
        case "ADD_SURVY_DATA":
            return Object.assign({}, state, { data: action.data })
        case "UPDATE_SURVY_DATA":
            return Object.assign({}, state, { data: eval(JSON.stringify(action.data)) })
        default: return state
    }
}
