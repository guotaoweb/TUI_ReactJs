//新增数据权限信息【1】
export function addTableData(data){
    return {
        type:"ADD_TABLE_DATA",
        data
    }
}

export function pushTableData(data){
    return {
        type:"PUSH_TABLE_DATA",
        data
    }
}


export function updateTableData(data){
    return {
        type:"UPDATE_TABLE_DATA",
        data
    }
}




