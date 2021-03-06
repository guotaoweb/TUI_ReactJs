import 'babel-polyfill'

const initState = {
    list: []
}

export default function reportListReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_REPORT_LIST":
            if (state.list.length == 0) {
                return Object.assign({}, state, { list: action.data })
            } else {
                state.list.push(action.data)
                return Object.assign({}, state, {
                    list: JSON.parse(JSON.stringify(state.list))
                })
            }
        case "LOAD_REPORT_LIST":
            return Object.assign({}, state, {
                list: JSON.parse(JSON.stringify(action.data))
            })
        case "DELETE_REPORT_LIST":
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
        case "UPDATE_REPORT_LIST":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]

                if ($d.Id == action.data.Id) {
                    $d.Name = action.data.Name
                    $d.Sort = action.data.Sort
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        default:
            return state
    }
}