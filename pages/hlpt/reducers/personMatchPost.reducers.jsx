import 'babel-polyfill'

const initState = {
    data: [],
    roleData: [],
    selectUserData: [],
    setRoleData: [],
    editId: ""//职位信息所属的组织架构ID
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_PERSONMATCHPOST_DATA":
            return Object.assign({}, state, { data: action.data })
        case "UPDATE_PERSONMATCHPOST_DATA":
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
        case "ADD_PERSONMATCHPOST_ROLE_DATA":
            return Object.assign({}, state, { roleData: eval(JSON.stringify(action.data)) })
        case "PUSH_PERSONMATCHPOST_ROLE_DATA":
            if (state.roleData) {
                state.roleData.push(action.data)
            }
            return Object.assign({}, state, { roleData: eval(JSON.stringify(state.roleData)) })
        case "UPDATE_PERSONMATCHPOST_ROLE_DATA":
            for (let i = 0; i < state.roleData.length; i++) {
                let $r = state.roleData[i]
                if ($r.poid == action.data.poId) {
                    $r.roleName = action.data.roleName
                }
            }
            return Object.assign({}, state, { roleData: eval(JSON.stringify(state.roleData)) })
        case "DELETE_PERSONMATCHPOST_ROLE_DATA":
            for (let i = 0; i < state.roleData.length; i++) {
                let $d = state.roleData[i]
                if ($d.poid == action.data) {
                    state.roleData.splice(i, 1)
                }
            }
            return Object.assign({}, state, { roleData: eval(JSON.stringify(state.roleData)) })

        case "UPDATE_PERSONMATCHPOST_EDITID":
            return Object.assign({}, state, { editId: action.data })
        case "ADD_PERSONMATCHPOST_SELECT_USER_DATA":
            return Object.assign({}, state, { selectUserData: action.data })
        case "ADD_PERSONMATCHPOST_SET_ROLE_DATA":
            return Object.assign({}, state, { setRoleData: action.data })
        case "UPDATE_PERSONMATCHPOST_NUMBER":
            for (let i = 0; i < state.data.length; i++) {
                let $d = state.data[i]
                if ($d.positionId == action.data.positionId) {
                    if (action.data.type == "add") {
                        $d.sumStaff = parseInt($d.sumStaff) + 1
                    }
                    else {
                        $d.sumStaff = parseInt($d.sumStaff) - 1
                    }
                }
            }
            return Object.assign({}, state, { data: eval(JSON.stringify(state.data)) })
        case "SET_PERSON_LEVEL":
            for (let i = 0; i < state.roleData.length; i++) {
                let $d = state.roleData[i]
                if($d.staffId==action.data.staffId){
                    $d.userLevel = action.data.userLevel
                }
            }
            return Object.assign({}, state, { roleData: eval(JSON.stringify(state.roleData))})
        default: return state
    }
}