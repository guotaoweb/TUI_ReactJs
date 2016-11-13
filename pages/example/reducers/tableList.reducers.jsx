import 'babel-polyfill'

const initState = {
    data: []
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_TABLE_DATA":
            return Object.assign({}, state, { data: action.data })
        case "PUSH_TABLE_DATA":
            let _pushData = []
            _pushData.push(action.data)
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                _pushData.push($d)
            }
            console.info(_pushData)
            return Object.assign({}, state, { data: _pushData })
        case "UPDATE_TABLE_DATA":
            state.data[0].name=action.data.name
           
      
            return Object.assign({}, state, { data: JSON.parse(JSON.stringify(state.data)) })
        default: return state
    }
}