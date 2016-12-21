
//新增人岗信息【1】
export function addPersonMatchPost(data){
    return {
        type:"ADD_PERSONMATCHPOST_DATA",
        data
    }
}

//更新人岗信息【2】
export function updatePersonMatchPost(data){
    return {
        type:"UPDATE_PERSONMATCHPOST_DATA",
        data
    }
}

//追加人岗信息【4】
export function pushPersonMatchPost(data){
    return {
        type:"PUSH_PERSONMATCHPOST_DATA",
        data
    }
}

//删除人岗信息【5】
export function deletePersonMatchPost(data){
    return {
        type:"DELETE_PERSONMATCHPOST_DATA",
        data
    }
}

//更新人岗信息主键【6】
export function updatePersonMatchPostEditId(data){
    return {
        type:"UPDATE_PERSONMATCHPOST_EDITID",
        data
    }
}

//新增人岗角色信息【7】
export function addPersonMatchPostRole(data){
    return {
        type:"ADD_PERSONMATCHPOST_ROLE_DATA",
        data
    }
}

//追加人岗角色信息【8】
export function pushPersonMatchPostRole(data){
    return {
        type:"PUSH_PERSONMATCHPOST_ROLE_DATA",
        data
    }
}

export function deletePersonMatchPostRole(data){
    return {
        type:"DELETE_PERSONMATCHPOST_ROLE_DATA",
        data
    }
}

export function updatePersonMatchPostRole(data){
    return {
        type:"UPDATE_PERSONMATCHPOST_ROLE_DATA",
        data
    }
}

export function addPersonMatchPostSelectUserData(data){
    return {
        type:"ADD_PERSONMATCHPOST_SELECT_USER_DATA",
        data
    }
}

export function addPersonMatchPostSetRoleData(data){
    return {
        type:"ADD_PERSONMATCHPOST_SET_ROLE_DATA",
        data
    }
}

export function updatePersonMatchPostNumber(data){
    return {
        type:"UPDATE_PERSONMATCHPOST_NUMBER",
        data
    }
}

export function setPersonLevel(data){
    return {
        type:"SET_PERSON_LEVEL",
        data
    }
}

export function updateComponentInfo(data){
    return {
        type:"UPDATE_COMPONENT_INFO",
        data
    }
}



