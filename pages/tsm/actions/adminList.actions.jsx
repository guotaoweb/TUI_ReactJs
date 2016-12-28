//添加管理员列表数据【1】
export function addAdminList(data){
    return {
        type:"ADD_ADMIN_LIST",
        data
    }
}

//添加管理员列表数据【1】
export function loadAdminList(data){
    return {
        type:"LOAD_ADMIN_LIST",
        data
    }
}

//根据ID删除管理员【2】
export function deleteAdminList(id){
    return {
        type:"DELETE_ADMIN_LIST",
        id
    } 
}

//更新管理员【3】
export function updateAdminList(data){
    return {
        type:"UPDATE_ADMIN_LIST",
        data
    } 
}

export function addRoleList(data){
    return {
        type:"ADD_ROLE_LIST",
        data
    } 
}





