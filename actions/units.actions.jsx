//添加数据
export function addData(data,reducer){


    return {
        type:"ADD_DATA"+"_"+reducer,
        data
    } 
}

//更新数据
export function updateData(data){
    return {
        type:"UPDATE_DATA",
        data
    } 
}

//删除数据
export function deleteData(data){
    return {
        type:"UPDATE_DATA",
        data
    } 
}

//添加子级数据
export function addChildrenData(data){
    return {
        type:"ADD_CHILDREN_DATA",
        data
    } 
}

//更新子级数据
export function updateChildrenData(data){
    return {
        type:"UPDATE_CHILDREN_DATA",
        data
    } 
}

//删除子级数据
export function deleteChildrenData(data){
    return {
        type:"UPDATE_CHILDREN_DATA",
        data
    } 
}