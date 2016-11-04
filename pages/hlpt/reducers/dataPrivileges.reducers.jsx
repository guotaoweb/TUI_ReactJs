import 'babel-polyfill'

const initState = {
    data: [],
    selectedInfo:[]
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_DATAPRIVILEGES_DATA":
            return Object.assign({}, state, { data: action.data })
        case "UPDATE_DATAPRIVILEGES_DATA":
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                if($d.positionId == action.data.positionId){
                    $d.positionName = action.data.positionName
                    $d.kindName = action.data.kindName
                    $d.unitShortName = action.data.unitShortName
                    $d.statusName = action.data.statusName
                    $d.staffing = action.data.staffing
                    $d.staffing = action.data.staffing
                }
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "PUSH_DATAPRIVILEGES_DATA":
            if (state.data) {
                state.data.push(action.data)
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "DELETE_DATAPRIVILEGES_DATA":
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                if($d.positionId == action.data){
                    state.data.splice(i,1)
                }
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "ADD_SELECTED_DATAPRIVILEGES_DATA":
            return Object.assign({}, state, { selectedInfo: action.data=="true"?"false":"true" })
            
        default: return state
    }
}