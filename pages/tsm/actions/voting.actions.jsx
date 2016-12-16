export function addVotingClasses(data){
    return {
        type:"ADD_VOTING_CLASSES",
        data
    }
}

export function addVotingCourse(data){
    return {
        type:"ADD_VOTING_COURSE",
        data
    }
}

export function addVotingSurvy(data){
    return {
        type:"ADD_VOTING_SURVY",
        data
    }
}

export function addVotingStatus(data){
    return {
        type:"ADD_VOTING_STATUS",
        data
    }
}

export function addVotedCourse(id){
    return {
        type:"ADD_VOTED_COURSE",
        id
    }
}

export function updateOperateStatus(data){
    return {
        type:"UPDATE_OPERATE_STATUS",
        data
    }
}
