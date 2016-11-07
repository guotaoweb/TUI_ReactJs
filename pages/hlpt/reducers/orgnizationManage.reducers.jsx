import 'babel-polyfill'
const initState = {
    data: "",//机构组织数据
    subList: "",//机构子组织数据
    unitBizTypes: "",//业务数据
    unitKind: "",//机构类别
    status: "",//状态
    city: "",//地区
    detail: {
        id: "",
        code: "",
        who: "",
        uppper: "",
        level: "",
        unitName: "",//全称
        ext2: "",//短名称
        bizType: "",//业务类型
        kind: "",//组织机构
        status: "1",//状态
        areaCode: "",//地区
        email: "",//邮件
        sort: 9999,//序号
        staffing: "",//编制
        remark: "",//备注
        permission: ""//权限关联
    },
    hasVerticalScroll: false,//iScroll专用,判断滚动条
    relateId:"",//级联的ID
    type:""//上级的UnitCode
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
                    $s.status = action.data.status
                    $s.sort = action.data.sort
                }
            }
            return Object.assign({}, state, { subList: eval(JSON.stringify(state.subList)) })
        case "DELETE_SUBLIST":
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
        case "UPDATE_ORGNIZATIONBYID":
            return Object.assign({}, state, {
                detail: {
                    id: action.id,
                    code: state.detail.code,
                    who: state.detail.who,
                    upper: state.detail.upper,
                    level: state.detail.level,
                    unitName: state.detail.unitName,
                    ext2: state.detail.ext2,
                    bizType: state.detail.bizType,
                    kind: state.detail.kind,
                    status: state.detail.status,
                    areaCode: state.detail.areaCode,
                    email: state.detail.email,
                    sort: state.detail.sort,
                    staffing: state.detail.staffing,
                    remark: state.detail.remark,
                    permission: state.detail.permission
                }
            })
        case "UPDATE_ORGNIZATIONINFO":
            return Object.assign({}, state, {
                detail: {
                    id: action.data.id!=undefined ? action.data.id : state.detail.id,
                    code: action.data.code!=undefined ? action.data.code : state.detail.code,
                    who: action.data.who!=undefined ? action.data.who : state.detail.who,
                    upper: action.data.upper!=undefined ? action.data.upper : state.detail.upper,
                    level: action.data.level!=undefined ? action.data.level : state.detail.level,
                    unitName: action.data.unitName!=undefined ? action.data.unitName : state.detail.unitName,//全称
                    ext2: action.data.ext2!=undefined ? action.data.ext2 : state.detail.ext2,//简称
                    bizType: action.data.bizType!=undefined ? action.data.bizType : state.detail.bizType,//业务类型
                    kind: action.data.kind!=undefined ? action.data.kind : state.detail.kind,//组织类别
                    status: action.data.status!=undefined ? action.data.status : state.detail.status,//状态
                    areaCode: action.data.areaCode!=undefined ? action.data.areaCode : state.detail.areaCode,//地区代码
                    email: action.data.email!=undefined ? action.data.email : state.detail.email,
                    sort: action.data.sort!=undefined ? action.data.sort : state.detail.sort,//排序号
                    staffing: action.data.staffing!=undefined ? action.data.staffing : state.detail.staffing,
                    remark: action.data.remark!=undefined ? action.data.remark : state.detail.remark,//备注
                    permission: action.data.permission!=undefined ? action.data.id : state.detail.permission,
                }
            })
        case "CLEAR_ORGNIZATIONINFO":
            return Object.assign({}, state, {
                detail: {
                    id: "",
                    code: "",
                    who: "",
                    upper: "",
                    level: "",
                    unitName: "",
                    ext2: "",
                    bizType: "",
                    kind: "",
                    status: "1",
                    areaCode: "",
                    email: "",
                    sort: 9999,
                    staffing:"",
                    remark: "",
                    permission: ""
                }
            })
        case "UPDATE_ORGNIZATION_RELATEID":
            return Object.assign({}, state, {
                relateId: action.data.relateId,
                type:action.data.type
            })
        default: return state
    }
}