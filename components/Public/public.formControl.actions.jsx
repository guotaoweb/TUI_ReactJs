export function addEditInfo(data){
    return {
        type:"ADD_FORMCONTROL",
        data
    } 
}

export function updateEditInfo(data){
    return {
        type:"UPDATE_FORMCONTROL",
        data
    } 
}

export function clearEditInfo(data){
    return {
        type:"CLEAR_FORMCONTROL",
        data
    } 
}