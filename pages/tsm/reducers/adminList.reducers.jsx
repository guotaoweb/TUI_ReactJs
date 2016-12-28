import 'babel-polyfill'

const initState = {
    list: [],
    role:""
}

export default function adminListReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_ADMIN_LIST":
            if (state.list.length == 0) {
                return Object.assign({}, state, {list: action.data})
            } else {
                state.list.push(action.data)
                return Object.assign({}, state, {
                    list: JSON.parse(JSON.stringify(state.list))
                })
            }
        case "DELETE_ADMIN_LIST":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]
                if ($d.Id == action.id) {
                    state.list.splice(i, 1)
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        case "UPDATE_ADMIN_LIST":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]

                if ($d.Id == action.data.Id) {
                    $d.UserName = action.data.UserName
                    $d.LockoutEnabled = action.data.LockoutEnabled
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        case "LOAD_ADMIN_LIST":
            return Object.assign({}, state, {
                list: JSON.parse(JSON.stringify(action.data))
            })
        case "ADD_ROLE_LIST":
            return Object.assign({}, state, {
                role: action.data
            })
            
        default:
            return state
    }
}