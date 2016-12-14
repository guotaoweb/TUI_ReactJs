import 'babel-polyfill'

const initState = {
    classes: 
    {
      "Id": "62354bdf-14f5-4de1-8ee6-1c33dcd2b127",
      "Name": "505",
      "Vote": "第一个投票",
      "GradeId": "391c97d0-032b-4e98-be4b-86c4e9ebb1eb",
      "Grade": "初一",
      "GradeShortName": "C1"
    }
  ,
    course:[],
    survy:[]
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_VOTING_CLASSES":
            return Object.assign({}, state, { classes: action.data })
        case "ADD_VOTING_COURSE":
            return Object.assign({}, state, { course: action.data })
        case "ADD_VOTING_SURVY":
            return Object.assign({}, state, { survy: action.data })
        default:
            return state
    }
}
