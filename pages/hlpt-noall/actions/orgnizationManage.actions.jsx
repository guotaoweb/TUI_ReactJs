//添加机构组织数据
export function addData(data) {
    return {
        type: "ADD_DATA",
        data
    }
}

//添加机构子组织数据
export function addSubList(data) {
    return {
        type: "ADD_SUBLIST",
        data
    }
}

//更新机构子组织数据
export function updateSubList(data) {
    return {
        type: "UPDATE_SUBLIST",
        data
    }
}

//删除机构子组织数据
export function delSubList(data) {
    return {
        type: "DELETE_SUBLIST",
        data
    }
}

//业务数据
export function addUnitBizTypes(data) {
    return {
        type: "ADD_UNITBIZTYPES",
        data
    }
}

//职业类别
export function addUnitKind(data) {
    return {
        type: "ADD_UNITKIND",
        data
    }
}

//状态
export function addStatus(data) {
    return {
        type: "ADD_STATUS",
        data
    }
}

//地区
export function addCity(data) {
    return {
        type: "ADD_CITY",
        data
    }
}

export function setCanVerticallyScroll(data) {
    return {
        type: "SET_CANVERTICALLYSCROLL",
        data
    }
}


//更新组织信息(根据ID)
export function updateOrgnizationById(id){
    return {
        type:"UPDATE_ORGNIZATIONBYID",
        id
    }
}


export function updateOrgnizationRelateId(data){
    return {
        type:"UPDATE_ORGNIZATION_RELATEID",
        data
    }
}

export function pushSubList(data){
    return {
        type:"PUSH_SUBLIST",
        data
    }
}
