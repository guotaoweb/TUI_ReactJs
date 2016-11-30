//添加年级列表数据【1】
export function addGradeList(data){
    return {
        type:"ADD_GRADE_LIST",
        data
    }
}

//根据ID删除年级【2】
export function deleteGradeList(id){
    return {
        type:"DELETE_GRADE_List",
        id
    } 
}

//更新年级【3】
export function updateGradeList(data){
    return {
        type:"UPDATE_GRADE_LIST",
        data
    } 
}





