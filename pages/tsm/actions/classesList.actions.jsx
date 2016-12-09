//添加班级列表数据【1】
export function addClassesList(data){
    return {
        type:"ADD_CLASSES_LIST",
        data
    }
}

//根据ID删除班级【2】
export function deleteClassesList(id){
    return {
        type:"DELETE_CLASSES_LIST",
        id
    } 
}

//更新班级【3】
export function updateClassesList(data){
    return {
        type:"UPDATE_CLASSES_LIST",
        data
    } 
}

export function loadClassesList(data){
    return {
        type:"LOAD_CLASSES_LIST",
        data
    } 
}

export function deleteVoteBindClasses(id){
    return {
        type:"DELETE_VOTE_BIND_CLASSES",
        id
    }
}

export function updateClassesBindVote(data){
    return {
        type:"UPDATE_CLASSES_BIND_VOTE",
        data
    } 
}

export function upClassesLevel(data){
    return {
        type:"UP_CLASSES_LEVEL",
        data
    } 
}

export function addClassesRelated(data){
    return {
        type:"ADD_CLASSES_RELATED",
        data
    } 
}







