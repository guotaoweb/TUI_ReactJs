//添加报表列表数据【1】
export function addReportList(data){
    return {
        type:"ADD_REPORT_LIST",
        data
    }
}

//根据ID删除报表【2】
export function delReportList(id){
    return {
        type:"DELETE_REPORT_LIST",
        id
    } 
}

//更新报表【3】
export function updateReportList(data){
    return {
        type:"UPDATE_REPORT_LIST",
        data
    } 
}

export function loadReportList(data){
    return {
        type:"LOAD_REPORT_LIST",
        data
    } 
}
