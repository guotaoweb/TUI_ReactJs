import 'babel-polyfill'

const initState = {
    data: {}
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_FORMCONTROL":
            let _infoName = action.data.infoName,
                initObject = {}
            if (_infoName) {
               
                if (!state.data[_infoName]) {
                    initObject[_infoName] ={}
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
            state.data[_infoName] = initObject[_infoName]
            return Object.assign({}, state, {
                data: JSON.parse(JSON.stringify(state.data))
            })

        case "UPDATE_FORMCONTROL":
            let _infoName1 = action.data.infoName,
                initObject1 = {}
            if (_infoName1) {
                if (!state.data[_infoName1]) {
                    initObject1[_infoName1] = {}
                }
                else {
                    initObject1 = state.data
                }
                for (let key in action.data) {
                    if (state.data[_infoName1]) {
                        initObject1[_infoName1][key] = action.data[key] != undefined ? action.data[key] : state.data[_infoName1][key]
                    }
                    else {
                        initObject1[_infoName1][key] = action.data[key]
                    }
                }
            }
            state.data[_infoName1] = initObject1[_infoName1]
            return Object.assign({}, state, {
                data: JSON.parse(JSON.stringify(state.data))
            })

        case "CLEAR_FORMCONTROL":
            let _infoName2 = action.data.infoName,
                initObject2 = {}
            if (_infoName2) {
                if (!state.data[_infoName2]) {
                    initObject2[_infoName2] = {}
                }
                else {
                    initObject2 = state.data
                }
                initObject2 = {}
            }
            state.data[_infoName2] = initObject2[_infoName2]
            return Object.assign({}, state, {
                data: JSON.parse(JSON.stringify(state.data))
            })
        default: return state
    }
}