export function addUserMaintainInfo(data){
    return {
        type:"ADD_USERMAINTAIN_INFO",
        data
    }
}

//更新职位类别信息【1】
export function updateUserMaintainInfo(data){
    return {
        type:"UPDATE_USERMAINTAIN_INFO",
        data
    }
}

//清除职位类别信息【2】
export function clearUserMaintainInfo(data){
    return {
        type:"CLEAR_USERMAINTAIN_INFO",
        data
    }
}



//新增职位信息【9】
export function addUserMaintain(data){
    return {
        type:"ADD_USERMAINTAIN_DATA",
        data
    }
}

//更新职位信息【10】
export function updateUserMaintain(data){
    return {
        type:"UPDATE_USERMAINTAIN_DATA",
        data
    }
}

//追加职位信息【11】
export function pushUserMaintain(data){
    return {
        type:"PUSH_USERMAINTAIN_DATA",
        data
    }
}

export function deleteUserMaintain(data){
    return {
        type:"DELETE_USERMAINTAIN_DATA",
        data
    }
}

export function updateUserMaintainOrgnizationId(data){
    return {
        type:"UPDATE_USERMAINTAIN_EDITID",
        data
    }
}


