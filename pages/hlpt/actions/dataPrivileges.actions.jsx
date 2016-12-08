//新增数据权限信息【1】
export function addDataPrivileges(data){
    return {
        type:"ADD_DATAPRIVILEGES_DATA",
        data
    }
}

//更新数据权限信息【2】
export function updateDataPrivileges(data){
    return {
        type:"UPDATE_DATAPRIVILEGES_DATA",
        data
    }
}

//追加数据权限信息【3】
export function pushDataPrivileges(data){
    return {
        type:"PUSH_DATAPRIVILEGES_DATA",
        data
    }
}

//追加数据权限信息【4】
export function deleteDataPrivileges(data){
    return {
        type:"DELETE_DATAPRIVILEGES_DATA",
        data
    }
}

export function addSideData(data){
    return {
        type:"ADD_SIDE_DATA",
        data
    }
}

export function addSelectedData(data){
    return {
        type:"ADD_SELECTED_DATAPRIVILEGES_DATA",
        data
    }
}



