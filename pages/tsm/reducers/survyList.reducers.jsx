import 'babel-polyfill'

const initState = {
    list: [],//问卷列表
    data: []//问卷内容
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_SURVY_LIST":
            state.list.push(action.data)
            return Object.assign({}, state, { list: eval(JSON.stringify(state.list)) })
        case "LOAD_SURVY_LIST":
            return Object.assign({}, state, { list: action.data})
        case "DELETE_SURVY_LIST":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]
                if ($d.Id == action.Id) {
                    state.list.splice(i, 1)
                }
            }
            return Object.assign({}, state, { list: eval(JSON.stringify(state.list)) })
        case "UPDATE_SURVY_LIST":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]
                if ($d.Id == action.data) {
                    state.list.Name = action.data.Name
                    state.list.Desp = action.data.Desp
                }
            }
            return Object.assign({}, state, { list: eval(JSON.stringify(state.list)) })
        case "UPDATE_SURVY_ISDEFAULT":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]
     
                if ($d.Id == action.data) {
                    $d.IsDefault = 0
                    continue
                }
                $d.IsDefault = 1
            }
            return Object.assign({}, state, { list: eval(JSON.stringify(state.list)) })
            
        case "ADD_SURVY_DATA":
            return Object.assign({}, state, { data: action.data })
        case "UPDATE_SURVY_DATA":
            return Object.assign({}, state, { data: eval(JSON.stringify(action.data)) })
        default: return state
    }
}
