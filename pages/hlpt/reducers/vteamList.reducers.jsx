import 'babel-polyfill'

const initState = {
    data: "",
    subData:"",
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_VTEAM_DATA":
            return Object.assign({}, state, { data: action.data })
        case "UPDATE_VTEAM_DATA":
            if(state.data){
                state.data.push(action.data)
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) }) 

        case "UPDATE_VTEAM_ID":
            return Object.assign({}, state, {
                detail: {
                    id: action.id,
                    code: "",
                    name: "",
                    note: "",
                    num: ""
                }
            })

        case "UPDATE_VTEAM_LIST_BYID":
            for (var i = 0; i < state.data.length; i++) {
                var _d = state.data[i]
                if (_d.team_id == state.detail.id) {
                    _d.team_name = state.detail.name
                    _d.team_note = state.detail.note
                    _d.team_code = state.detail.code
                    break
                }
            }

            return Object.assign({}, state, {
                data: eval(JSON.stringify(state.data))
            })
        case "DELETE_VTEAM_BYID":
            for (var i = 0; i < state.data.length; i++) {
                var _d = state.data[i]
                if(_d.team_id==action.id){
                    state.data.splice(i,1)
                }
            }
            return Object.assign({}, state, {
                data: eval(JSON.stringify(state.data))
            })
        default: return state
    }
}