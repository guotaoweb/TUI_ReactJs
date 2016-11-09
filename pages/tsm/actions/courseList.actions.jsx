//添加科目列表数据【1】
export function addCourseData(data){
    return {
        type:"ADD_COURSE_DATA",
        data
    }
}

//根据ID删除科目【2】
export function delCourseList(id){
    return {
        type:"DELETE_COURSE_BYID",
        id
    } 
}

//更新科目【3】
export function updateCourseData(data){
    return {
        type:"UPDATE_COURSE_DATA",
        data
    } 
}

//更新科目实体信息【6】
export function updateCourseInfo(data){
    return {
        type:"UPDATE_COURSE_INFO",
        data
    } 
}

//清楚科目实体信息【7】
export function clearCourseInfo(data){
    return {
        type:"CLEAR_COURSE_INFO",
        data
    } 
}




