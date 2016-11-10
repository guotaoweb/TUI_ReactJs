

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


