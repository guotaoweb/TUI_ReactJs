import 'babel-polyfill'
const initState = {
    data: "",//机构组织数据
    subList: "",//机构子组织数据
    unitBizTypes: "",//业务数据
    unitKind: "",//机构类别
    status: "",//状态
    city: "",//地区
    hasVerticalScroll: false,//iScroll专用,判断滚动条
    relateId:"",//级联的ID
    unitCode:""//上级的code
}


export default function orgnizationReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_DATA":
            return Object.assign({}, state, { data: eval(JSON.stringify(action.data)) })
        case "ADD_SUBLIST":
            return Object.assign({}, state, { subList: action.data })
        case "PUSH_SUBLIST":
            state.subList.push(action.data)
            return Object.assign({}, state, { subList: eval(JSON.stringify(state.subList ))})
        case "UPDATE_SUBLIST":
            for (let i = 0; i < state.subList.length; i++) {
                let $s = state.subList[i]
                if ($s.unitId == action.data.unitId) {
                    $s.unitName = action.data.unitName
                    $s.statusName = action.data.statusName
                    $s.sort = action.data.sort
                }
            }
            return Object.assign({}, state, { subList: JSON.parse(JSON.stringify(state.subList)) })
        case "DELETE_SUBLIST":
            //删除列表中的组织
            for (let i = 0; i < state.subList.length; i++) {
                let $s = state.subList[i]
                if ($s.unitId == action.data.unitId) {
                    state.subList.splice(i,1)
                }
            }
            return Object.assign({}, state, { subList: eval(JSON.stringify(state.subList)) })
        case "ADD_UNITBIZTYPES":
            return Object.assign({}, state, { unitBizTypes: action.data })
        case "ADD_UNITKIND":
            return Object.assign({}, state, { unitKind: action.data })
        case "ADD_STATUS":
            return Object.assign({}, state, { status: action.data })
        case "ADD_CITY":
            return Object.assign({}, state, { city: action.data })
        case "SET_CANVERTICALLYSCROLL":
            return Object.assign({}, state, { hasVerticalScroll: action.data })
        case "UPDATE_ORGNIZATION_RELATEID":
            return Object.assign({}, state, {
                relateId: action.data.relateId,
                unitCode:action.data.unitCode
            })
        default: return state
    }
}