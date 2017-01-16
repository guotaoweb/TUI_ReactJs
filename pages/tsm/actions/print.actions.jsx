
export function addPrintData(data){
    return {
        type:"ADD_PRINT_DATA",
        data
    }
}


export function addPrintClasses(data){
    return {
        type:"ADD_PRINT_CLASSES",
        data
    } 
}

export function removePrintClasses(id){
    return {
        type:"REMOVE_PRINT_CLASSES",
        id
    } 
}


export function addPrintCourse(data){
    return {
        type:"ADD_PRINT_COURSE",
        data
    } 
}

export function removePrintCourse(id){
    return {
        type:"REMOVE_PRINT_COURSE",
        id
    } 
}

export function addPrintVoteList(data){
    return {
        type:"ADD_PRINT_VOTE_LIST",
        data
    } 
}

export function addPrintVotedClasses(data){
    return {
        type:"ADD_PRINT_VOTED_CLASSES",
        data
    } 
}


export function addPrintVotedCourse(data){
    return {
        type:"ADD_PRINT_VOTED_COURSE",
        data
    } 
}



