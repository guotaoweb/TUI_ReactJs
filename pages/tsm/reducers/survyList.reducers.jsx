import 'babel-polyfill'

const initState = {
    data: [],
    odata: [],
    editInfo: {
        id: "",//ID
        name: "",//科目名称
        survyId: ""//问卷ID
    }
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_SURVY_DATA":
            return Object.assign({}, state, { data: action.data })
        case "UPDATE_SURVY_DATA":
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
        case "PUSH_SURVY_DATA":
            if (state.data) {
                state.data.push(action.data)
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "DELETE_SURVY_DATA":
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                if ($d.staffId == action.data) {
                    state.data.splice(i, 1)
                }
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "ADD_SURVY_INFO":
            return Object.assign({}, state, {
                baseInfo: {
                    uId: action.data.uId,
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
        case "UPDATE_SURVY_INFO":
            return Object.assign({}, state, {
                baseInfo: {
                    uId: action.data.uId != undefined ? action.data.uId : state.baseInfo.uId,
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
        case "CLEAR_SURVY_INFO":
            return Object.assign({}, state, {
                baseInfo: {
                    uId: "",
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
        case "UPDATE_SURVY_OPTIONS_DATA":
            return Object.assign({}, state, { odata: eval(JSON.stringify(action.data)) })
        default: return state
    }
}