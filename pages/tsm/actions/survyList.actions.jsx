//新增问卷信息【1】
export function addSurvy(data){
    return {
        type:"ADD_SURVY_DATA",
        data
    }
}

//更新问卷信息【2】
export function updateSurvy(data){
    return {
        type:"UPDATE_SURVY_DATA",
        data
    }
}

//追加问卷信息【3】
export function pushSurvy(data){
    return {
        type:"PUSH_SURVY_DATA",
        data
    }
}

//删除问卷信息【4】
export function deleteSurvy(data){
    return {
        type:"DELETE_SURVY_DATA",
        data
    }
}

//更新问卷类别信息【5】
export function updateSurvyInfo(data){
    return {
        type:"UPDATE_SURVY_INFO",
        data
    }
}

//清除问卷类别信息【6】
export function clearSurvyInfo(data){
    return {
        type:"CLEAR_SURVY_INFO",
        data
    }
}

//新增问卷信息【7】
export function updateSurvyOptions(data){
    return {
        type:"UPDATE_SURVY_OPTIONS_DATA",
        data
    
    }
}
