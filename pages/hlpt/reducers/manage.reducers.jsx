import 'babel-polyfill'
const initState = {
    data: "",//虚拟子组织
    users: "",//虚拟子组织内人员列表
    detail: {
        //组织详情
        id: "",
        relateId:"",
        code: "",
        name: "",
        note: "",
        num: ""
    },
    userDetail: {
        id: "",
        user: "",
        name: "",
        role: "",
        admin: "",
        sort: ""
    }
}

export default function manageReducers(state = initState, action) {
    switch (action.type) {
        case "ADD_SUB_VTEAM_DATA":
            return Object.assign({}, state, { data: action.data })
        case "ADD_USER_IN_VTEAM":
            return Object.assign({}, state, { users: action.data })
        case "UPDATE_USER_IN_VTEAM":
            let _newData = eval(JSON.stringify(state.users))
            let addUser = action.addData
            if (addUser.length > 0) {
                if (_newData.length > 0) {
                    for (var index = 0; index < addUser.length; index++) {
                        _newData.push(addUser[index])
                    }
                }
                else {
                    _newData = addUser
                }

            }
            let usersDelete = action.removeData
            if (usersDelete.length > 0) {
                for (var index = 0; index < usersDelete.length; index++) {
                    var $duser = usersDelete[index]
                    for (var j = 0; j < _newData.length; j++) {
                        var $d = _newData[j];
                        if ($d.user_id == $duser.user_id) {
                            _newData.splice(j, 1)
                        }
                    }

                }
            }
            return Object.assign({}, state, { users: _newData })
        case "DELETE_SUB_VTEAM_DATA":
            return Object.assign({}, state, { data: eval(JSON.stringify(action.data)) })
        case "DELETE_SUB_VTEAM_DATA":
            return Object.assign({}, state, { data: eval(JSON.stringify(action.data)) })
        case "UPDATE_SUB_VTEAM_INFO":
            return Object.assign({}, state, {
                detail: {
                    id: action.data.id!=undefined ? action.data.id : state.detail.id,
                    code: action.data.code!=undefined? action.data.code : state.detail.code,
                    name: action.data.name!=undefined? action.data.name : state.detail.name,
                    note: action.data.note!=undefined? action.data.note : state.detail.note,
                    relateId:action.data.relateId!=undefined ? action.data.relateId : state.detail.relateId,
                    num: action.data.num!=undefined ? action.data.num : state.detail.num,
                }
            })
        case "UPDATE_SUB_VTEAM_ID":
            return Object.assign({}, state, {
                detail: {
                    id: action.data.id,
                    code:"",
                    name:"",
                    note:"",
                    relateId:action.data.relateId,
                    num:action.data.num
                }
            })
        case "CLEAR_SUB_VTEAM_INFO":
            return Object.assign({}, state, {
                detail: {
                    id: state.detail.id,
                    relateId:state.detail.relateId,
                    code: null,
                    name: null,
                    note: null,
                    num: null
                }
            })
        case "UPDATE_SUB_VTEAM_USER_TO_LIST":
            for (var i = 0; i < state.users.length; i++) {
                var $user = state.users[i]
                if ($user.id == action.data.id) {
                    $user.user_note = action.data.user_note
                    $user.user_type = action.data.user_type
                    $user.sort = action.data.sort
                }
            }
            return Object.assign({}, state, {
                users: eval(JSON.stringify(state.users))
            })
        case "UPDATE_SUB_VTEAM_USER":
            return Object.assign({}, state, {
                userDetail: {
                    id: action.data.id?action.data.id:state.userDetail.id,
                    user: action.data.user?action.data.user:state.userDetail.user,
                    name: action.data.name?action.data.name:state.userDetail.name,
                    role: action.data.role,
                    admin: action.data.admin,
                    sort: action.data.sort
                }
            })
        case "CLEAR_SUB_VTEAM_USER":
            return Object.assign({}, state, {
                userDetail: {
                    user: "",
                    id: "",
                    name: "",
                    role: "",
                    admin: "",
                    sort: ""
                }
            })

        case "DELETE_SUB_VTEAM_TO_LIST":
            for (var i = 0; i < state.users.length; i++) {
                var $user = state.users[i]
                if ($user.id == action.id) {
                    state.users.splice(i, 1)
                }
            }
            return Object.assign({}, state, {
                users: eval(JSON.stringify(state.users))
            })
        default: return state
    }
}
