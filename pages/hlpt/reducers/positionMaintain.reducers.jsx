import 'babel-polyfill'

const initState = {
    data: [],

    positionFamilys: "",
    jobFamilys: [{ name: "请选择", id: "-1" }],
    jobsData: [],//工作职责
    jobsSearchData: [],//搜索职责结果
    rolesData: [],//角色
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
                    $d.statusName = action.data.statusName
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
        default: return state
    }
}