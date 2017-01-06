//添加机构组织数据
export function addOData(data){
    return {
        type:"ADD_ODATA",
        data
    }
}

//更新机构组织数据
export function updateOData(data){
    return {
        type:"UPDATE_ODATA",
        data
    }
}

//添加被选择的机构组织数据
export function addOSData(data){
    return {
        type:"ADD_OSDATA",
        data
    }
}

//清除被选择的机构组织数据
export function clearOSData(data){
    return {
        type:"CLEAR_OSDATA",
        data
    }
}

export function updateComponentInfo(data){
    return {
        type:"UPDATE_COMPONENT_INFO",
        data
    }
}



