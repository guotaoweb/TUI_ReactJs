//更新虚拟组织内人员【1】
export function updateUserInVTeam(addData,removeData) {
    return {
        type: "UPDATE_USER_IN_VTEAM",
        addData,
        removeData
    }
}


//添加虚拟组织内人员【2】
export function addUserInVTeam(data) {
    return {
        type: "ADD_USER_IN_VTEAM",
        data
    }
}

//根据ID填充虚拟组织人员实体【3】
export function updateVTeamUserById(id) {
    return {
        type: "UPDATE_VTEAM_USER_BY_ID",
        id
    }
}

//更新虚拟组织人员实体【4】
export function updateSubVTeamUser(data) {
    return {
        type: "UPDATE_SUB_VTEAM_USER",
        data
    }
}

//编辑以后,及时更新人员列表中相应的人员【5】
export function updateSubVTeamUserToList(data) {
    return {
        type: "UPDATE_SUB_VTEAM_USER_TO_LIST",
        data
    }
}

//清除虚拟组织内制定人员信息【6】
export function clearSubVTeamUser(data) {
    return {
        type: "CLEAR_SUB_VTEAM_USER",
        data
    }
}

//删除虚拟组织内人员【7】
export function delSubVTeamUserToList(id) {
    return {
        type: "DELETE_SUB_VTEAM_TO_LIST",
        id
    }
}