import 'babel-polyfill'

const initState = {
    data: [],
    orgnizationId: "",
    nation: [],
    jobsList: []
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_USERMAINTAIN_DATA":
            return Object.assign({}, state, { data: eval(JSON.stringify(action.data)) })
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
        case "ADD_NATION":
            return Object.assign({}, state, { nation: action.data })
        case "ADD_USERMAINTAIN_JOBLIST":
            return Object.assign({}, state, { jobsList: eval(JSON.stringify(action.data)) })
        case "DELETE_USERMAINTAIN_JOBSLIST":
            for (let i = 0; i < state.jobsList.length; i++) {
                let $d = state.jobsList[i]
                if ($d.poid == action.data) {
                    state.jobsList.splice(i, 1)
                }
            }
            return Object.assign({}, state, { jobsList: eval(JSON.stringify(state.jobsList)) })
        default: return state
    }
}