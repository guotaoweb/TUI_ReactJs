//添加班级列表数据【1】
export function addClassesData(data){
    return {
        type:"ADD_CLASSES_DATA",
        data
    }
}

//根据ID删除班级【2】
export function delClassesList(id){
    return {
        type:"DELETE_CLASSES_BYID",
        id
    } 
}

//更新班级【3】
export function updateClassesData(data){
    return {
        type:"UPDATE_CLASSES_DATA",
        data
    } 
}

//更新班级实体信息【6】
export function updateClassesInfo(data){
    return {
        type:"UPDATE_CLASSES_INFO",
        data
    } 
}

//清除班级实体信息【7】
export function clearClassesInfo(data){
    return {
        type:"CLEAR_CLASSES_INFO",
        data
    } 
}




