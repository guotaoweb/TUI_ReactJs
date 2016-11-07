import 'babel-polyfill'

const initState = {
    data: "",
    positionType: {
        typeCode: "",
        typeName: "",
        remark: ""
    },
    positionFamily: {
        familyCode: "",
        familyName: "",
        typeCode: "",
        remark: ""
    },
    jobFamily: {
        poId: "",
        seqId: "",
        familyId:"",
        seqName: "",
        baseLevel: "",
        channelLevel: "",
        remark: ""
    },
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
        case "ADD_POSITIONTYPE_INFO":
            return Object.assign({}, state, {
                positionType: {
                    typeCode: action.data.typeCode,
                    typeName: action.data.typeName,
                    remark: action.data.remark
                }
            })
        case "UPDATE_POSITIONTYPE_INFO":
            return Object.assign({}, state, {
                positionType: {
                    typeCode: action.data.typeCode!=undefined ? action.data.typeCode : state.positionType.typeCode,
                    typeName: action.data.typeName!=undefined ? action.data.typeName : state.positionType.typeName,
                    remark: action.data.remark!=undefined ? action.data.remark : state.positionType.remark,
                }
            })
        case "CLEAR_POSITIONTYPE_INFO":
            return Object.assign({}, state, {
                positionType: {
                    typeCode: "",
                    typeName: "",
                    remark: ""
                }
            })
        case "ADD_POSITIONFAMILY_INFO":
            return Object.assign({}, state, {
                positionFamily: {
                    familyCode: action.data.familyCode?action.data.familyCode:"",
                    familyName: action.data.familyName?action.data.familyName:"",
                    typeCode: action.data.typeCode?action.data.typeCode:"",
                    remark: action.data.remark?action.data.remark:""
                }
            })
        case "UPDATE_POSITIONFAMILY_INFO":
        console.info(action.data.familyName)
      
            return Object.assign({}, state, {
                positionFamily: {
                    familyCode: action.data.familyCode!=undefined ? action.data.familyCode : state.positionFamily.familyCode,
                    familyName: action.data.familyName!=undefined ? action.data.familyName : state.positionFamily.familyName,
                    typeCode: action.data.typeCode!=undefined ? action.data.typeCode : state.positionFamily.typeCode,
                    remark: action.data.remark!=undefined ? action.data.remark : state.positionFamily.remark
                }
            })
        case "CLEAR_POSITIONFAMILY_INFO":
            return Object.assign({}, state, {
                positionFamily: {
                    familyCode: "",
                    familyName: "",
                    typeCode: "",
                    remark: ""
                }
            })
        case "ADD_JOBFAMILY_INFO":
            return Object.assign({}, state, {
                jobFamily: {
                    poId:action.data.poid?action.data.poid:"",
                    seqId: action.data.seqId?action.data.seqId:"",
                    familyId:action.data.familyId?action.data.familyId:"",
                    seqName: action.data.seqName?action.data.seqName:"",
                    baseLevel: action.data.baseLevel?action.data.baseLevel:"",
                    channelLevel: action.data.channelLevel?action.data.channelLevel:"",
                    remark: action.data.remark?action.data.remark:"undefined",
                }
            })
        case "UPDATE_JOBFAMILY_INFO":
            return Object.assign({}, state, {
                jobFamily: {
                    poId:action.data.poid!=undefined ? action.data.poid : state.jobFamily.poId,
                    seqId: action.data.seqId!=undefined ? action.data.seqId : state.jobFamily.seqId,
                    familyId:action.data.familyId!=undefined ? action.data.familyId : state.jobFamily.familyId,
                    seqName: action.data.seqName!=undefined ? action.data.seqName : state.jobFamily.seqName,
                    baseLevel: action.data.baseLevel!=undefined ? action.data.baseLevel : state.jobFamily.baseLevel,
                    channelLevel: action.data.channelLevel!=undefined ? action.data.channelLevel : state.jobFamily.channelLevel,
                    remark: action.data.remark!=undefined ? action.data.remark : state.jobFamily.remark
                }
            })
        case "CLEAR_JOBFAMILY_INFO":
            return Object.assign({}, state, {
                jobFamily: {
                    poId:"",
                    seqId: "",
                    familyId:"",
                    seqName: "",
                    baseLevel: "",
                    channelLevel: "",
                    remark: ""
                }
            })

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