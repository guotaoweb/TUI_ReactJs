import 'babel-polyfill'
const initState = {
    odata: "",//机构组织数据
    osdata: ""//被选择的机构组织数据
}


export default function orgnizationReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_ODATA":
            if (action.data.length > 0) {
                if (state.odata.length > 0) {
                    let _data = eval(JSON.stringify(state.odata))
                    for (var index = 0; index < action.data.length; index++) {
                        _data.push(action.data[index])
                    }

                    return Object.assign({}, state, { odata: _data })
                }
                else {
                    return Object.assign({}, state, { odata: action.data })
                }

            }
            else {
                return Object.assign({}, state, { odata: [] })
            }
        case "ADD_OSDATA":
            if (action.data.length > 0) {
                if (state.osdata.length > 0) {
                    let _data = eval(JSON.stringify(state.osdata))
                    for (var index = 0; index < action.data.length; index++) {
                        _data.push(action.data[index])
                    }

                    return Object.assign({}, state, { osdata: _data })
                }
                else {
                    return Object.assign({}, state, { osdata: action.data })
                }

            }
            else {
                return Object.assign({}, state, { osdata: [] })
            }
        case "CLEAR_OSDATA":
            let clearData = []
            Object.assign({}, state, { odata: "" })
            return Object.assign({}, state, { osdata: "" })
        case "UPDATE_ODATA":
            return Object.assign({}, state, { odata: eval(JSON.stringify(action.data ))})
        default: return state
    }

}