import 'babel-polyfill'

const initState = {
    data: [],
    filters:[],
    filtersTxt:[],
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_AUDITLOGS_DATA":
            return Object.assign({}, state, { data: eval(JSON.stringify(action.data))})
        case "ADD_AUDITLOGS_FILTER":
            return Object.assign({}, state, { filters: action.data})
        case "ADD_AUDITLOGS_FILTER_TXT":
            return Object.assign({}, state, { filtersTxt: action.data})
            
        default: return state
    }
}