export function addPositionTypeInfo(data){
    return {
        type:"ADD_POSITIONTYPE_INFO",
        data
    }
}




//根据ID,更新职位树的相应信息【7】
export function updatePositionByID(id){
    return {
        type:"UPDATE_POSITION_BYID",
        id
    } 
}

//根据ID,删除职位树的相应信息【8】
export function deletePositionByID(id){
    return {
        type:"DELETE_POSITION_BYID",
        id
    } 
}

//新增职位族信息【9】
export function addPositionGroup(data){
    return {
        type:"ADD_POSITIONGROUP_DATA",
        data
    }
}

//更新职位族信息【10】
export function updatePositionGroup(data){
    return {
        type:"UPDATE_POSITIONGROUP_DATA",
        data
    }
}

//追加职位族信息【11】
export function pushPositionGroup(data){
    return {
        type:"PUSH_POSITIONGROUP_DATA",
        data
    }
}


//更新type【12】
export function updatePositionType(data){
    return {
        type:"UPDATE_POSITION_TYPE",
        data
    }
}

//更新deep【13】
export function updatePositionDeep(data){
    return {
        type:"UPDATE_POSITION_DEEP",
        data
    }
}

