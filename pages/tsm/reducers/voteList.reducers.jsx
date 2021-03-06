import 'babel-polyfill'

const initState = {
    list: [] //投票列表
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_VOTE_LIST":
            if (state.list.length == 0) {
                return Object.assign({}, state, { list: action.data })
            } else {
                state.list.push(action.data)
                return Object.assign({}, state, {
                    list: JSON.parse(JSON.stringify(state.list))
                })
            }
        case "DELETE_VOTE_LIST":
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
        case "UPDATE_VOTE_LIST":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]

                if ($d.Id == action.data.Id) {
                    $d.Name = action.data.Name?action.data.Name:$d.Name
                    $d.IsStart = action.data.IsStart
                    $d.Type = action.data.Type?action.data.Type:$d.Type
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        default:
            return state
    }
}
