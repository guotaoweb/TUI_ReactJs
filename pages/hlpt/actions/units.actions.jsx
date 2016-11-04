//添加组织结构
export function addUnitsData(data){
    return {
        type:"ADD_UNITS_DATA",
        data
    } 
}

//更新组织结构
export function updateUnitsData(data){
    return {
        type:"UPDATE_UNITS_DATA",
        data
    } 
}