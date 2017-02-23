//添加虚拟组织列表数据【1】
export function addVTeamData(data){
    return {
        type:"ADD_VTEAM_DATA",
        data
    }
}

//根据ID删除虚拟组织【2】
export function delTeamList(id){
    return {
        type:"DELETE_VTEAM_BYID",
        id
    } 
}

//更新虚拟组织【3】
export function updateVTeamData(data){
    return {
        type:"UPDATE_VTEAM_DATA",
        data
    } 
}


