//更新虚拟组信息【1】
export function updateVTeamInfo(data){
    return {
        type:"UPDATE_VTEAM_INFO",
        data
    }
}

//清除虚拟组信息【2】
export function clearVTeamInfo(data){
    return {
        type:"CLEAR_VTEAM_INFO",
        data
    }
}

//记录当前组ID虚拟组信息【3】
export function updateVTeamId(id){
    return {
        type:"UPDATE_VTEAM_ID",
        id
    }
}


//根据ID,更新虚拟组列表中的相应信息【4】
export function updateVTeamListByID(id){
    return {
        type:"UPDATE_VTEAM_LIST_BYID",
        id
    } 
}


