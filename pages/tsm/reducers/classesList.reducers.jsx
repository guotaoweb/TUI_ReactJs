import 'babel-polyfill'

const initState = {
    list: "",
    related:"",
    voting:"",
    statistic:"",
    classesStatisticList:[],
    classesStatisticDetail:[],
    classesStatisticDetailList:[]
}

export default function classesListReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_CLASSES_LIST":
            if (state.list.length == 0) {
                return Object.assign({}, state, { list: action.data })
            } else {
                state.list.push(action.data)
                return Object.assign({}, state, {
                    list: JSON.parse(JSON.stringify(state.list))
                })
            }
        case "LOAD_CLASSES_LIST":
            return Object.assign({}, state, {
                list: JSON.parse(JSON.stringify(action.data))
            })
        case "ADD_VOTING_CLASSES":
            return Object.assign({}, state, {
                voting: action.data
            })
        case "ADD_STATISTIC":
            return Object.assign({}, state, {
                statistic: JSON.parse(JSON.stringify(action.data))
            })
        case "UPDATE_VOTING_CLASSES":
            if(state.voting){
                if(state.voting.Id==action.data.Id){
                    state.voting.IsStart = action.data.IsStart
                }
                return Object.assign({}, state, {
                    voting: JSON.parse(JSON.stringify([]))
                })
            }

        case "DELETE_CLASSES_LIST":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]
                if ($d.Id == action.id) {
                    state.list.splice(i, 1)
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        case "UPDATE_CLASSES_LIST":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]

                if ($d.Id == action.data.Id) {
                    $d.Name = action.data.Name ? action.data.Name : $d.Name
                    $d.Grade = action.data.Grade ? action.data.Grade : $d.Grade
                    $d.Number = action.data.Number ? action.data.Number : $d.Number
                    $d.IsStart = action.data.IsStart
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        case "DELETE_VOTE_BIND_CLASSES":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]
                if ($d.Id == action.id) {
                    $d.Vote = null
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        case "UPDATE_CLASSES_BIND_VOTE":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]
                if (typeof action.data == "string") {
                    if ($d.Id == action.data) {
                        state.list.splice(i, 1)
                        $d.VotedNumber = parseInt($d.VotedNumber) - 1
                    }
                }
                else {
                    for (var j = 0; j < action.data.length; j++) {
                        var $a = action.data[j];
                        if ($d.Id == $a.ClassesId) {
                            state.list.splice(i, 1)
                            $d.VotedNumber = parseInt($d.VotedNumber) + 1
                        }
                    }
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        case "UP_CLASSES_LEVEL":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]
                if ($d.Id == action.data.Id) {
                    $d.Grade = action.data.Grade
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        case "ADD_CLASSES_RELATED":
            return Object.assign({}, state, {
                related: eval(JSON.stringify(action.data))
            })
        case "ADD_CLASSES_STATISTIC_LIST":
            return Object.assign({}, state, {
                classesStatisticList: eval(JSON.stringify(action.data))
            })
        case "ADD_CLASSES_STATISTIC_DETAIL":
            return Object.assign({}, state, {
                classesStatisticDetail: eval(JSON.stringify(action.data))
            })
        case "ADD_CLASSES_STATISTIC_DETAIL_LIST":
            return Object.assign({}, state, {
                classesStatisticDetailList: eval(JSON.stringify(action.data))
            })
            
        default:
            return state
    }
}