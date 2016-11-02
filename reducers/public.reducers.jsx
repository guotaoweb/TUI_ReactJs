import 'babel-polyfill'

const initState = {
    pageInfo: {
        index: 1,//页数
        size: 5,//每页的数量
        sum: 1,//总数
        url: ""//当前接口地址

    },
    sidePageInfo: {
        status: "",//状态表示
        width: "",//展开宽度
        gateWay: "",//原始页面到sidePage页面的通道,传值用
        type: "" //sidepage类型
    },
    msgInfo: {
        txt: "",
        status: 0 //0 正常 1成功 2失败 3等待
    },
    sideStatus: 0, //0 open / 1 close
    userInfo: {
        id: "",//用户ID
        name: "",//用户名
        photo: ""//用户图像
    },
    dialogInfo: "",//弹窗文字
    loadStatus: 1, //0 加载中 1加载完成
    searchInfo: {
        key: "",
        name: "",
        info: ""
    },
    tips: [],//标签集合
    isRefreshPage: false //是否在回退的时候,刷新页面
}

export default function manageReducers(state = initState, action) {

    switch (action.type) {
        case "UPDATE_SIDEPAGEINFO":
            return Object.assign({}, state, {
                sidePageInfo: {
                    status: action.data.status,
                    width: action.data.width,
                    gateWay: action.data.gateWay,
                    type: action.data.type
                }
            })
        case "AlERT_MESSAGE":
            return Object.assign({}, state, {
                msgInfo: {
                    txt: action.txt,
                    status: 0
                }
            })
        case "SUCCESS_MESSAGE":
            return Object.assign({}, state, {
                msgInfo: {
                    txt: action.txt,
                    status: 1
                }
            })
        case "ERROR_MESSAGE":
            return Object.assign({}, state, {
                msgInfo: {
                    txt: action.txt,
                    status: 2
                }
            })
        case "WAITE_MESSAGE":
            return Object.assign({}, state, {
                msgInfo: {
                    txt: action.txt,
                    status: 3
                }
            })
        case "SET_USERINFO":
            return Object.assign({}, state, {
                userInfo: {
                    id: action.id,
                    name: action.name,
                    photo: action.photo
                }
            })
        case "UPDATE_SIDE_STATUS":
            return Object.assign({}, state, { sideStatus: state.sideStatus == 0 ? 1 : 0 })
        case "UPDATE_DIALOG":
            return Object.assign({}, state, { dialogInfo: action.txt })
        case "UPDATE_PAGEINFO":
            return Object.assign({}, state, {
                pageInfo: {
                    index: action.data.index ? action.data.index : state.pageInfo.index,
                    size: action.data.size ? action.data.size : state.pageInfo.size,
                    sum: action.data.sum ? action.data.sum : state.pageInfo.sum,
                    url: action.data.url ? action.data.url : state.pageInfo.url,
                }
            })
        case "UPDATE_LOAING_STATUS":
            return Object.assign({}, state, {
                loadStatus: action.status
            })
        case "UPDATE_PAGELOAING_STATUS":
            return Object.assign({}, state, {
                pageLoadStatus: action.status
            })
        case "CLEAR_PAGEINFO":
            return Object.assign({}, state, {
                pageInfo: {
                    index: 1,
                    size: 5,
                    sum: 1,
                    url: ""
                }
            })
        case "UPDATE_SEARCH_INFO":
            return Object.assign({}, state, {
                searchInfo: {
                    key: action.data.key ? action.data.key : state.searchInfo.key,
                    name: action.data.name ? action.data.name : state.searchInfo.name,
                    info: action.data.info ? action.data.info : state.searchInfo.info,
                }
            })
        case "UPDATE_REFRESH_PAGE_STATUS":
            return Object.assign({}, state, {
                isRefreshPage: !state.isRefreshPage
            })
        case "PUSH_TIP":
            let _tip = eval(JSON.stringify(state.tips))
            if (action.data && typeof action.data == "object") {
                for (let i = 0; i < action.data.length; i++) {
                    let $d = action.data[i];
                    _tip.push($d)
                }
            }
            return Object.assign({}, state, {
                tips: _tip
            })
        case "DELETE_TIP":
            let _tip_d = eval(JSON.stringify(state.tips))
            if (action.data) {
                for (let i = 0; i < _tip_d.length; i++) {
                    let $d = _tip_d[i];
                    if ($d.id == action.data){
                        _tip_d.splice(i,1)
                    }
                }
            }
            return Object.assign({}, state, {
                tips: _tip_d
            })
        default: return state
    }
}