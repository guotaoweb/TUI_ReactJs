import 'babel-polyfill'

const initState = {
    data: []
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        
        case "PUSH_PAGER_DATA":
            let _pushData = []
            _pushData.push(action.data)
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                _pushData.push($d)
            }
            return Object.assign({}, state, { data: _pushData})
        default: return state
    }
}