import 'babel-polyfill'

const initState = {
    list: ""
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
                    $d.Vote = action.data.Vote ? action.data.Vote : $d.Vote
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        case "DELETE_VOTE_BIND_CLASSES":
            for (let i = 0; i < state.list.length; i++) {
                let $d = state.list[i]
                if ($d.Id == action.data.Id) {
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
                        $d.VotedNumber = parseInt($d.VotedNumber)-1
                    }
                }
                else {
                    for (var j = 0; j < action.data.length; j++) {
                        var $a = action.data[j];
                        if ($d.Id == $a.ClassesId) {
                            state.list.splice(i, 1)
                            $d.VotedNumber = parseInt($d.VotedNumber)+1
                        }
                    }
                }
            }
            return Object.assign({}, state, {
                list: eval(JSON.stringify(state.list))
            })
        default:
            return state
    }
}