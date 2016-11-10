//添加虚拟子组织【1】
export function addSubVTeamData(data) {
    return {
        type: "ADD_SUB_VTEAM_DATA",
        data
    }
}

//删除虚拟子组织【2】
export function delSubVTeamData(data) {
    return {
        type: "DELETE_SUB_VTEAM_DATA",
        data
    }
}

//更新虚拟子组织的信息
export function updateSubVTeamInfo(data) {
    return {
        type: "UPDATE_SUB_VTEAM_INFO",
        data
    }
}

//更新虚拟子组织的ID
export function updateSubVTeamId(data) {
    return {
        type: "UPDATE_SUB_VTEAM_ID",
        data
    }
}










