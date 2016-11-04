import 'babel-polyfill'

const initState = {
    data: [],
    baseInfo: {
        uId:"",//用户ID
        user: "",//用户名
        name: "",//中文名
        status: "1",//账户状态 0-禁用 1-启用
        mobile: "",//常用手机
        shortNumber: "",//短号码
        fax: "",//传真
        companyPhone: "",//办公电话
        companyAddress: "",//办公地址
        idCard: "",//身份证
        orgnization: "",//默认组织
        wx: "",//微信号
        sort: "",//排序号
        isShow: "1"//是否显示 0-否 1-是
    },
    orgnizationId: ""
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_USERMAINTAIN_DATA":
            return Object.assign({}, state, { data: action.data })
        case "UPDATE_USERMAINTAIN_DATA":
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                if ($d.staffId == action.data.staffId) {
                    $d.cnName = action.data.cnName
                    $d.loginUid = action.data.loginUid
                    $d.unitName = action.data.unitName
                    $d.mobilePhone = action.data.mobilePhone
                    $d.sort = action.data.sort
                }
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "PUSH_USERMAINTAIN_DATA":
            if (state.data) {
                state.data.push(action.data)
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "DELETE_USERMAINTAIN_DATA":
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                if ($d.staffId == action.data) {
                    state.data.splice(i, 1)
                }
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "ADD_USERMAINTAIN_INFO":
            return Object.assign({}, state, {
                baseInfo: {
                    uId:action.data.uId,
                    user: action.data.user,
                    name: action.data.name,
                    status: action.data.status,
                    mobile: action.data.mobile,
                    shortNumber: action.data.shortNumber,
                    fax: action.data.fax,
                    companyPhone: action.data.companyPhone,
                    companyAddress: action.data.companyAddress,
                    idCard: action.data.idCard,
                    orgnization: action.data.orgnization,
                    wx: action.data.wx,
                    sort: action.data.sort,
                    isShow: action.data.isShow
                }
            })
        case "UPDATE_USERMAINTAIN_INFO":
            return Object.assign({}, state, {
                baseInfo: {
                    uId:action.data.uId != undefined ? action.data.uId : state.baseInfo.uId,
                    user: action.data.user != undefined ? action.data.user : state.baseInfo.user,
                    name: action.data.name != undefined ? action.data.name : state.baseInfo.name,
                    status: action.data.status != undefined ? action.data.status : state.baseInfo.status,
                    mobile: action.data.mobile != undefined ? action.data.mobile : state.baseInfo.mobile,
                    shortNumber: action.data.shortNumber != undefined ? action.data.shortNumber : state.baseInfo.shortNumber,
                    fax: action.data.fax != undefined ? action.data.fax : state.baseInfo.fax,
                    companyPhone: action.data.companyPhone != undefined ? action.data.companyPhone : state.baseInfo.companyPhone,
                    companyAddress: action.data.companyAddress != undefined ? action.data.companyAddress : state.baseInfo.companyAddress,
                    idCard: action.data.idCard != undefined ? action.data.idCard : state.baseInfo.idCard,
                    orgnization: action.data.orgnization != undefined ? action.data.orgnization : state.baseInfo.orgnization,
                    wx: action.data.wx != undefined ? action.data.wx : state.baseInfo.wx,
                    sort: action.data.sort != undefined ? action.data.sort : state.baseInfo.sort,
                    isShow: action.data.isShow != undefined ? action.data.isShow : state.baseInfo.isShow
                }
            })
        case "CLEAR_USERMAINTAIN_INFO":
            return Object.assign({}, state, {
                baseInfo: {
                    uId:"",
                    user: "",
                    name: "",
                    status: "1",
                    mobile: "",
                    shortNumber: "",
                    fax: "",
                    companyPhone: "",
                    companyAddress: "",
                    idCard: "",
                    orgnization: "",
                    wx: "",
                    sort: "",
                    isShow: "1"
                }
            })
        case "UPDATE_USERMAINTAIN_EDITID":
            return Object.assign({}, state, { orgnizationId: action.data })
        default: return state
    }
}