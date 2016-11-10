import 'babel-polyfill'

const initState = {
    data: [],
    orgnizationId: ""
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_USERMAINTAIN_DATA":
            return Object.assign({}, state, { data: action.data })
        case "UPDATE_USERMAINTAIN_DATA":
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                if ($d.staffId == action.data.staffId) {
                    $d.cnName = action.data.cnName
                    $d.loginUid = action.data.loginUid
                    $d.unitName = action.data.unitName
                    $d.mobilePhone = action.data.mobilePhone
                    $d.sort = action.data.sort
                }
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "PUSH_USERMAINTAIN_DATA":
            if (state.data) {
                state.data.push(action.data)
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "DELETE_USERMAINTAIN_DATA":
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                if ($d.staffId == action.data) {
                    state.data.splice(i, 1)
                }
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "UPDATE_USERMAINTAIN_EDITID":
            return Object.assign({}, state, { orgnizationId: action.data })
        default: return state
    }
}