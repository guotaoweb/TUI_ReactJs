import 'babel-polyfill'

const initState = {
    data: [],
    classes:[],
    course:[],
    printVote:[],
    votedClasses:[],
    votedCourse:[],
    printDetail:[]
}

export default function printReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_PRINT_DATA":
           return Object.assign({}, state, {
                data: eval(JSON.stringify(action.data))
            })
        case "ADD_PRINT_CLASSES":
            let noClasses = true
            for (var i = 0; i < state.classes.length; i++) {
                var $c = state.classes[i];
                if($c.id==action.data.id){
                    noClasses = false
                }
            }
            if(noClasses){
                state.classes.push(action.data)
            }
            return Object.assign({}, state, {
                classes: eval(JSON.stringify(state.classes))
            })
        case "REMOVE_PRINT_CLASSES":
            for (var i = 0; i < state.classes.length; i++) {
                var $c = state.classes[i];
                if($c.id==action.id){
                    state.classes.splice(i,1)
                }
            }
            return Object.assign({}, state, {
                classes: eval(JSON.stringify(state.classes))
            })
        case "ADD_PRINT_COURSE":
            let noCourse = true
            for (var i = 0; i < state.course.length; i++) {
                var $c = state.course[i];
                if($c.id==action.data.id){
                    noCourse = false
                }
            }
            if(noCourse){
                state.course.push(action.data)
            }
           return Object.assign({}, state, {
                course: eval(JSON.stringify(state.course))
            })
        case "REMOVE_PRINT_COURSE":
            for (var i = 0; i < state.course.length; i++) {
                var $c = state.course[i];
                if($c.id==action.id){
                    state.course.splice(i,1)
                }
            }
            return Object.assign({}, state, {
                course: eval(JSON.stringify(state.course))
            })
        case "ADD_PRINT_VOTE_LIST":
           return Object.assign({}, state, {
                printVote: eval(JSON.stringify(action.data))
            })
        case "ADD_PRINT_VOTED_COURSE":
           return Object.assign({}, state, {
                votedCourse: eval(JSON.stringify(action.data))
            })
        case "REMOVE_PRINT_VOTED_COURSE":
           return Object.assign({}, state, {
                votedCourse: eval(JSON.stringify(action.data))
            })
        case "ADD_PRINT_VOTED_CLASSES":
           return Object.assign({}, state, {
                votedClasses: eval(JSON.stringify(action.data))
            })
        case "ADD_PRINT_VOTED_CLASSES":
           return Object.assign({}, state, {
                votedClasses: eval(JSON.stringify(action.data))
            })
        case "ADD_PRINT_DETAIL":
           return Object.assign({}, state, {
                votedClasses: eval(JSON.stringify(action.data))
            })
        default:
            return state
    }
}