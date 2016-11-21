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


export function courseBindSurvy(data){
    return {
        type:"COURSE_BIND_SURVY",
        data
    } 
}



