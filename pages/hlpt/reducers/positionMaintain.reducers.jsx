import 'babel-polyfill'

const initState = {
    data: [],
    baseInfo: {
        name: "",//职位名称
        id: "",//职位ID
        staffing: "",//职位编制
        positionFamily: "",//职位族
        jobFamily: "",//职位序列
        positionLevel: "",//级别
        remark: "",//职位说明
        sort: ""//排序
    },
    positionFamilys: "",
    jobFamilys: [{name:"请选择",id:"-1"}],
    jobsData: [],//工作职责
    jobsSearchData: [],//搜索职责结果
    jobsInfo: {
        id: "",
        name: "",
        remark: "",
        standard: "",
        status: "" //edit 编辑页面 list 列表页面
    },//工作职责编辑信息
    rolesData: [],//角色
    rolesInfo: {
        id: "",
        name: "",
        position: "",
        remark: "",
        status: "" //edit 编辑页面 list 列表页面
    },//角色编辑信息
    tabStatus: "",
    editId: ""//职位信息所属的组织架构ID
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_POSITIONMAINTAIN_DATA":
            return Object.assign({}, state, { data: action.data })
        case "UPDATE_POSITIONMAINTAIN_DATA":
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                if ($d.positionId == action.data.positionId) {
                    $d.positionName = action.data.positionName
                    $d.kindName = action.data.kindName
                    $d.unitShortName = action.data.unitShortName
                    $d.statusName = action.data.statusName
                    $d.staffing = action.data.staffing
                    $d.staffing = action.data.staffing
                }
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "PUSH_POSITIONMAINTAIN_DATA":
            if (state.data) {
                state.data.push(action.data)
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "DELETE_POSITIONMAINTAIN_DATA":
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                if ($d.positionId == action.data) {
                    state.data.splice(i, 1)
                }
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "ADD_POSITIONMAINTAIN_INFO":
            return Object.assign({}, state, {
                baseInfo: {
                    name: action.data.name,
                    id: action.data.id,
                    staffing: action.data.staffing,
                    positionFamily: action.data.positionFamily,
                    jobFamily: action.data.jobFamily,
                    positionLevel: action.data.positionLevel,
                    remark: action.data.remark,
                    sort: action.data.sort
                }
            })
        case "UPDATE_POSITIONMAINTAIN_INFO":
            return Object.assign({}, state, {
                baseInfo: {
                    name: action.data.name != undefined ? action.data.name : state.baseInfo.name,
                    id: action.data.id != undefined ? action.data.id : state.baseInfo.id,
                    staffing: action.data.staffing != undefined ? action.data.staffing : state.baseInfo.staffing,
                    positionFamily: action.data.positionFamily != undefined ? action.data.positionFamily : state.baseInfo.positionFamily,
                    jobFamily: action.data.jobFamily != undefined ? action.data.jobFamily : state.baseInfo.jobFamily,
                    positionLevel: action.data.positionLevel != undefined ? action.data.positionLevel : state.baseInfo.positionLevel,
                    remark: action.data.remark != undefined ? action.data.remark : state.baseInfo.remark,
                    sort: action.data.sort != undefined ? action.data.sort : state.baseInfo.sort,
                }
            })
        case "CLEAR_POSITIONMAINTAIN_INFO":
            return Object.assign({}, state, {
                baseInfo: {
                    name: "",
                    id: "",
                    staffing: "",
                    positionFamily: "",
                    jobFamily: "",
                    positionLevel: "",
                    remark: "",
                    sort: ""
                }
            })
        case "ADD_POSITIONMAINTAIN_POSITIONFAMILYS":
            return Object.assign({}, state, { positionFamilys: action.data })
        case "ADD_POSITIONMAINTAIN_JOBFAMILYS":
            return Object.assign({}, state, { jobFamilys: action.data })
        case "UPDATE_POSITIONMAINTAIN_EDITID":
            return Object.assign({}, state, { editId: action.data })

        case "ADD_POSITIONMAINTAIN_JOBS":
            return Object.assign({}, state, { jobsData: action.data })
        case "SEARCH_POSITIONMAINTAIN_JOBS":
            return Object.assign({}, state, { jobsSearchData: action.data })
        case "ADD_POSITIONMAINTAIN_ROLES":
            return Object.assign({}, state, { rolesData: action.data })
        case "PUSH_POSITIONMAINTAIN_JOBS":
            if (state.data) {
                state.jobsData.push(action.data)
            }
            return Object.assign({}, state, { jobsData: eval(JSON.stringify(state.jobsData)) })
        case "PUSH_POSITIONMAINTAIN_ROLES":
            if (state.data) {
                state.rolesData.push(action.data)
            }
            return Object.assign({}, state, { rolesData: eval(JSON.stringify(state.rolesData)) })
        case "UPDATE_POSITIONMAINTAIN_JOBS":
            for (let i = 0; i < state.jobsData.length; i++) {
                let $d = state.jobsData[i]
                if ($d.jobId == action.data.jobId) {
                    $d.jobName = action.data.jobName
                }
            }
            return Object.assign({}, state, { jobsData: eval(JSON.stringify(state.jobsData)) })

        case "UPDATE_POSITIONMAINTAIN_ROLES":
            for (let i = 0; i < state.rolesData.length; i++) {
                let $d = state.rolesData[i]
                if ($d.roleId == action.data.roleId) {
                    $d.roleName = action.data.roleName
                    $d.jobNames = action.data.jobNames
                }
            }
            return Object.assign({}, state, { rolesData: eval(JSON.stringify(state.rolesData)) })
        case "DELETE_POSITIONMAINTAIN_JOBS":
            for (let i = 0; i < state.jobsData.length; i++) {
                let $d = state.jobsData[i]
                if ($d.jobId == action.data) {
                    state.jobsData.splice(i, 1)
                }
            }
            return Object.assign({}, state, { jobsData: eval(JSON.stringify(state.jobsData)) })
        case "DELETE_POSITIONMAINTAIN_ROLES":
            for (let i = 0; i < state.rolesData.length; i++) {
                let $d = state.rolesData[i]
                if ($d.roleId == action.data) {
                    state.rolesData.splice(i, 1)
                }
            }
            return Object.assign({}, state, { rolesData: eval(JSON.stringify(state.rolesData)) })
        case "UPDATE_POSITIONMAINTAIN_JOBS_INFO":
            return Object.assign({}, state, {
                jobsInfo: {
                    id: action.data.id != undefined ? action.data.id : state.jobsInfo.id,
                    name: action.data.name != undefined ? action.data.name : state.jobsInfo.name,
                    remark: action.data.remark != undefined ? action.data.remark : state.jobsInfo.remark,
                    standard: action.data.standard != undefined ? action.data.standard : state.jobsInfo.standard,
                    status: action.data.status != undefined ? action.data.status : state.jobsInfo.status
                }
            })
        case "UPDATE_POSITIONMAINTAIN_ROLES_INFO":
            return Object.assign({}, state, {
                rolesInfo: {
                    id: action.data.id != undefined ? action.data.id : state.rolesInfo.id,
                    name: action.data.name != undefined ? action.data.name : state.rolesInfo.name,
                    position: action.data.position != undefined ? action.data.position : state.rolesInfo.position,
                    remark: action.data.remark != undefined ? action.data.remark : state.rolesInfo.remark,
                    status: action.data.status != undefined ? action.data.status : state.rolesInfo.status
                }
            })
        case "CLEAR_POSITIONMAINTAIN_JOBS_INFO":
            return Object.assign({}, state, {
                jobsInfo: {
                    id: "",
                    name: "",
                    remark: "",
                    standard: "",
                    status: ""
                }
            })
        case "CLEAR_POSITIONMAINTAIN_ROLES_INFO":
            return Object.assign({}, state, {
                rolesInfo: {
                    id: "",
                    name: "",
                    position: "",
                    remark: "",
                    status: ""
                }
            })
        default: return state
    }
}