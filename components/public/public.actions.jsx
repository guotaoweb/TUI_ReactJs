//展开side
export function updateSideStatus(data){
    return {
        type:"UPDATE_SIDE_STATUS",
        data
    }
}

//更新sidePage状态
export function updateSidePageInfo(data){
    return {
        type:"UPDATE_SIDEPAGEINFO",
        data
    }
}

//更新个人信息
export function updateUserInfo(data){
    return {
        type:"SET_USERINFO",
        name:data.name,
        id:data.id,
        photo:data.photo,
        role:data.role
    } 
}

//常规提示消息
export function alertMsg(txt){
    return {
        type:"AlERT_MESSAGE",
        txt
    }
}

//成功的提示消息
export function successMsg(txt){
    return {
        type:"SUCCESS_MESSAGE",
        txt
    }
}

//错误的提示消息
export function errorMsg(txt){
    return {
        type:"ERROR_MESSAGE",
        txt
    }
}

//等待提示消息
export function waiteMsg(txt){
    return {
        type:"WAITE_MESSAGE",
        txt
    }
}

//更新分页信息
export function updatePageInfo(data){
    return {
        type:"UPDATE_PAGEINFO",
        data
    } 
}

//数据加载完成
export function loadComplete(){
    return {
        type:"UPDATE_LOAING_STATUS",
        status:1
    } 
}

//数据加载中
export function pageLoading(){
    return {
        type:"UPDATE_PAGELOAING_STATUS",
        status:0
    } 
}

//数据加载完成
export function pageLoadComplete(){
    return {
        type:"UPDATE_PAGELOAING_STATUS",
        status:1
    } 
}

//清除分页信息
export function clearPageInfo(data){
    return {
        type:"CLEAR_PAGEINFO",
        data
    } 
}

//更新DIALOG提示内容
export function updateDialog(txt){
    return {
        type:"UPDATE_DIALOG",
        txt
    } 
}

//更新搜索信息
export function updateSearchInfo(data){
    return {
        type:"UPDATE_SEARCH_INFO",
        data
    } 
}

//更新回退是否刷新页面的状态
export function updateRefreshPageStatus(data){
    return {
        type:"UPDATE_REFRESH_PAGE_STATUS",
        data
    } 
}

export function pushTip(data){
    return {
        type:"PUSH_TIP",
        data
    } 
}

export function deleteTip(data){
    return {
        type:"DELETE_TIP",
        data
    } 
}

export function addTip(data){
    return {
        type:"ADD_TIP",
        data
    } 
}

export function clearTip(data){
    return {
        type:"CLEAR_TIP",
        data
    } 
}

export function programInit(data){
    return {
        type:"UPDATE_INIT",
        data
    } 
}

export function refreshTable(data){
    return {
        type:"REFRESH_TABLE",
        data
    } 
}

export function noRefreshTable(data){
    return {
        type:"NO_REFRESH_TABLE",
        data
    } 
}

export function addSide(data){
    return {
        type:"ADD_SIDE",
        data
    } 
}

export function addBreadNav(data){
    return {
        type:"ADD_BREAD_NAV",
        data
    } 
}
export function pushBreadNav(data){
    return {
        type:"PUSH_BREAD_NAV",
        data
    } 
}
export function backBreadNav(data){
    return {
        type:"BACK_BREAD_NAV",
        data
    } 
}
export function clearBreadNav(data){
    return {
        type:"CLEAR_BREAD_NAV",
        data
    } 
}

export function setCanVerticallyScroll(data) {
    return {
        type: "SET_CANVERTICALLYSCROLL",
        data
    }
}

export function updateLoginStatus(data) {
    return {
        type: "UPDATE_LOGIN_STATUS",
        data
    }
}

export function updateSideContentInfo(data) {
    return {
        type: "UPDATE_SIDECONTENT_INFO",
        data
    }
}

export function updatePrintStatus(data) {
    return {
        type: "UPDATE_PRINT_STATUS",
        data
    }
}


