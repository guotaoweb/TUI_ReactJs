//新增问卷列表信息【1】
export function addSurvyList(data){
    return {
        type:"ADD_SURVY_LIST",
        data
    }
}

//更新问卷列表信息【2】
export function updateSurvyList(data){
    return {
        type:"UPDATE_SURVY_LIST",
        data
    }
}


//删除问卷列表信息【3】
export function deleteSurvyList(data){
    return {
        type:"DELETE_SURVY_LIST",
        data
    }
}



//新增问卷内容信息【4】
export function addSurvy(data){
    return {
        type:"ADD_SURVY_DATA",
        data
    }
}

//更新问卷内容信息【5】
export function updateSurvy(data){
    return {
        type:"UPDATE_SURVY_DATA",
        data
    }
}

export function updateSurvyIsDefault(data){
    return {
        type:"UPDATE_SURVY_ISDEFAULT",
        data
    }
}

