//新增投票列表信息【1】
export function addVoteList(data){
    return {
        type:"ADD_VOTE_LIST",
        data
    }
}

//更新投票列表信息【2】
export function updateVoteList(data){
    return {
        type:"UPDATE_VOTE_LIST",
        data
    }
}


//删除投票列表信息【3】
export function deleteVoteList(id){
    return {
        type:"DELETE_VOTE_LIST",
        id
    }
}



