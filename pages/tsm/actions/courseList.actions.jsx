//添加科目列表数据【1】
export function addCourseList(data){
    return {
        type:"ADD_COURSE_LIST",
        data
    }
}

//根据ID删除科目【2】
export function delCourseList(id){
    return {
        type:"DELETE_COURSE_LIST",
        id
    } 
}

//更新科目【3】
export function updateCourseList(data){
    return {
        type:"UPDATE_COURSE_LIST",
        data
    } 
}

export function loadCourseList(data){
    return {
        type:"LOAD_COURSE_LIST",
        data
    } 
}

export function updateCourseBindSurvy(data){
    return {
        type:"UPDATE_COURSE_BIND_SURVY",
        data
    } 
}

export function addCourseStatisticList(data){
    return {
        type:"ADD_COURSE_STATISTIC_LIST",
        data
    } 
}


export function addCourseStatisticDetail(data){
    return {
        type:"ADD_COURSE_STATISTIC_DETAIL",
        data
    } 
}

export function addCourseStatisticDetailList(data){
    return {
        type:"ADD_COURSE_STATISTIC_DETAIL_LIST",
        data
    } 
}

