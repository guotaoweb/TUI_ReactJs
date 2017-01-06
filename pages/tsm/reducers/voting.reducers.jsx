import 'babel-polyfill'

    // {
    //     "Id": "62354bdf-14f5-4de1-8ee6-1c33dcd2b127",
    //     "Name": "505",
    //     "Vote": "第一个投票",
    //     "GradeId": "391c97d0-032b-4e98-be4b-86c4e9ebb1eb",
    //     "Grade": "初一",
    //     "GradeShortName": "C1",
    //     "VoteId": "1726f9e5-4f4f-4274-aacd-db06acb12d42",
    // }


// {
//         ClassesId: "62354bdf-14f5-4de1-8ee6-1c33dcd2b127",
//         VoteId: "1726f9e5-4f4f-4274-aacd-db06acb12d42",
//         GradeId: "391c97d0-032b-4e98-be4b-86c4e9ebb1eb"
//     }
const initState = {
    classes:[],//投票班级
    course: [],//投票科目
    survy: [],//投票问卷
    status:[],//投票状态,包括提交成功需要的一系列的ID
    operateStatus:0//投票操作状态=>0:提交 1:下一个科目 2:提交中... 3:正在生成问卷...
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_VOTING_CLASSES":
            return Object.assign({}, state, { classes: action.data })
        case "ADD_VOTING_COURSE":
            return Object.assign({}, state, { course: action.data })
        case "ADD_VOTING_SURVY":
            return Object.assign({}, state, { survy: action.data })
        case "ADD_VOTING_STATUS":
            return Object.assign({}, state, { status: action.data })
        case "ADD_VOTED_COURSE":
            for (let i = 0; i < state.course.length; i++) {
                let $c = state.course[i]
                if($c.Id==action.id){
                    $c["VoteStatus"] = "voted"
                    if(i+1<state.course.length){
                        state.course[i+1]["VoteStatus"] = "voting"
                    }
                }
            }
            return Object.assign({}, state, { course: JSON.parse(JSON.stringify(state.course))})
        case "UPDATE_OPERATE_STATUS":
            return Object.assign({}, state, { operateStatus: action.data })
        default:
            return state
    }
}
