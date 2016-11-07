import 'babel-polyfill'

const initState = {
    data: ""
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "UPDATE_FORMCONTROL":
            return Object.assign({}, state, {
                sidePageInfo: {
                    status: action.data.status,
                    width: action.data.width,
                    gateWay: action.data.gateWay,
                    type: action.data.type,
                    id: action.data.id
                }
            })
        case "ADD_FORMCONTROL":
            let _infoName = action.data.infoName,
                initObject = {}
            if (_infoName) {
                if (!state.data[_infoName]) {
                    initObject[_infoName] = {}
                }
                else {
                    initObject = state.data
                }
                for (let key in action.data) {
                    if (state.data[_infoName]) {
                        initObject[_infoName][key] = action.data[key] != undefined ? action.data[key] : state.data[_infoName][key]
                    }
                    else {
                        initObject[_infoName][key] = action.data[key]
                    }
                }
            }

            return Object.assign({}, state, {
                data: initObject
            })
        default: return state
    }
}