import 'babel-polyfill'

const initState = {
    data: "",
    
    type: "",//0 职务类别 1 职位族 2 职位序列
    editDeep:""//编辑的时候,需要根据deep关联去将数据插入到指定位置
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_POSITIONGROUP_DATA":
            return Object.assign({}, state, { data: action.data })
        case "UPDATE_POSITIONGROUP_DATA":
            return Object.assign({}, state, { data: eval(JSON.stringify(action.data)) })
        case "PUSH_POSITIONGROUP_DATA":
            if (state.data) {
                state.data.push(action.data)
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "UPDATE_POSITION_TYPE":
            return Object.assign({}, state, { type: action.data })
        case "UPDATE_POSITION_DEEP":
            return Object.assign({}, state, { editDeep: action.data })
        case "UPDATE_POSITION_BYID":
            for (var i = 0; i < state.data.length; i++) {
                var _d = state.data[i]
                if (_d.id == action.id) {
                    state.data.splice(i, 1)
                }
            }
            return Object.assign({}, state, {
                data: eval(JSON.stringify(state.data))
            })
        case "DELETE_POSITION_BYID":
            for (var i = 0; i < state.data.length; i++) {
                var _d = state.data[i]
                if (_d.id == action.id) {
                    state.data.splice(i, 1)
                }
            }
            return Object.assign({}, state, {
                data: eval(JSON.stringify(state.data))
            })
        default: return state
    }
}