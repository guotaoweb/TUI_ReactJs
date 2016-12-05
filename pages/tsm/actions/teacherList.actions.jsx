//添加教师列表数据【1】
export function addTeacherList(data){
    return {
        type:"ADD_TEACHER_LIST",
        data
    }
}

//根据ID删除教师【2】
export function deleteTeacherList(id){
    return {
        type:"DELETE_TEACHER_LIST",
        id
    } 
}

//更新教师【3】
export function updateTeacherList(data){
    return {
        type:"UPDATE_TEACHER_LIST",
        data
    } 
}

export function addTeacherInClasses(data){
    return {
        type:"ADD_TEACHER_IN_CLASSES",
        data
    } 
}

export function loadTeacherList(data){
    return {
        type:"LOAD_TEACHER_LIST",
        data
    } 
}






