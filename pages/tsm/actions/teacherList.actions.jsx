//添加教师列表数据【1】
export function addTeacherData(data){
    return {
        type:"ADD_TEACHER_DATA",
        data
    }
}

//根据ID删除教师【2】
export function delTeacherList(id){
    return {
        type:"DELETE_TEACHER_BYID",
        id
    } 
}

//更新教师【3】
export function updateTeacherData(data){
    return {
        type:"UPDATE_TEACHER_DATA",
        data
    } 
}

//新增年级【4】
export function addClassesData(data){
    return {
        type:"ADD_CLASSES_DATA",
        data
    } 
}

//新增班级【5】
export function addCourseData(data){
    return {
        type:"ADD_COURSE_DATA",
        data
    } 
}

//更新实体信息【6】
export function updateTeacherInfo(data){
    return {
        type:"UPDATE_TEACHER_INFO",
        data
    } 
}

//清除教师实体信息【7】
export function clearTeacherInfo(data){
    return {
        type:"CLEAR_TEACHER_INFO",
        data
    } 
}




