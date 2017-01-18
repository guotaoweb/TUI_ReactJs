import 'babel-polyfill'

const initState = {
    pageInfo: {
        index: {
            index: 1,//页数
            size: 5,//每页的数量
            sum: 1,//总数
            url: "",//当前接口地址
            surl: "#"//搜索url
        }
    },
    sidePageInfo: {
        status: "",//状态表示
        width: "",//展开宽度
        gateWay: "",//原始页面到sidePage页面的通道,传值用
        type: "", //sidepage类型
        id: ""//多任务的时候,sidePage的唯一ID
    },
    msgInfo: {
        txt: "",
        status: 0 //0 正常 1成功 2失败 3等待
    },
    sideStatus: 0, //0 open / 1 close
    userInfo: {
        id: "",//用户ID
        name: "",//用户名
        photo: "",//用户图像
        role: ""//用户图像
    },
    dialogInfo: "",//弹窗文字
    loadStatus: 1, //0 加载中 1加载完成
    pageLoadStatus: 1, //0 加载中 1加载完成
    searchLoadStatus:1,
    searchInfo: {
        id: "",
        key: "",
        name: "",
        info: ""
    },
    tips: [],//标签集合
    init: 0, //0 初始化 1 非初始化状态
    isRefreshTable: 0, //0不刷新 1刷新
    side: [],
    breadNav: [],//面包屑
    breadNavCD:true,
    hasVerticalScroll: true,//iScroll专用,判断滚动条
    loginStatus: 0, //0未登陆 1登陆中
    sideContentInfo: {},
    printStatus:0 //0 启动中 1启动成功 2启动失败
}

export default function manageReducers(state = initState, action) {

    switch (action.type) {
        case "UPDATE_SIDEPAGEINFO":
            return Object.assign({}, state, {
                sidePageInfo: {
                    status: action.data.status,
                    width: action.data.width,
                    gateWay: action.data.gateWay,
                    type: action.data.type,
                    id: action.data.id
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
                    photo: action.photo,
                    role: action.role
                }
            })
        case "UPDATE_SIDE_STATUS":
            return Object.assign({}, state, { sideStatus: state.sideStatus == 0 ? 1 : 0 })
        case "UPDATE_DIALOG":
            return Object.assign({}, state, { dialogInfo: action.txt })
        case "UPDATE_PAGEINFO":
            let _pageInfo = { pageInfo: {} }
            if (action.data.id) {
                let _id = action.data.id
                state.pageInfo[_id] = {
                    index: action.data.index ? action.data.index : state.pageInfo[_id].index,
                    size: action.data.size ? action.data.size : state.pageInfo[_id].size,
                    sum: (action.data.sum || action.data.sum == 0) ? action.data.sum : state.pageInfo[_id].sum,
                    url: action.data.url ? action.data.url : state.pageInfo[_id].url,
                    surl: action.data.surl ? action.data.surl : (state.pageInfo[_id] ? state.pageInfo[_id].surl : "#")
                }
                return Object.assign({}, state, {
                    pageInfo: JSON.parse(JSON.stringify(state.pageInfo))
                })
            }
            else {
                return Object.assign({}, state, {
                    pageInfo: {
                        index: {
                            index: action.data.index ? action.data.index : state.pageInfo["index"].index,
                            size: action.data.size ? action.data.size : state.pageInfo["index"].size,
                            sum: action.data.sum ? action.data.sum : state.pageInfo["index"].sum,
                            url: action.data.url ? action.data.url : state.pageInfo["index"].url,
                            surl: action.data.surl ? action.data.surl : state.pageInfo["index"].surl
                        }
                    }
                })
            }
        case "UPDATE_LOAING_STATUS":
            return Object.assign({}, state, {
                loadStatus: action.status
            })
        case "UPDATE_PAGELOAING_STATUS":
            return Object.assign({}, state, {
                pageLoadStatus: action.status
            })
        case "UPDATE_SEARCHLOAING_STATUS":
            return Object.assign({}, state, {
                searchLoadStatus: action.status
            })
        case "CLEAR_PAGEINFO":

            let _id
            if (action.data) {
                _id = action.data.id ? action.data.id : "index"
            }
            else {
                _id = "index"
            }
            state.pageInfo[_id] = {
                index: 1,
                size: 5,
                sum: 1,
                url: ""
            }
            return Object.assign({}, state, {
                pageInfo: JSON.parse(JSON.stringify(state.pageInfo))
            })
        case "UPDATE_SEARCH_INFO":
            return Object.assign({}, state, {
                searchInfo: {
                    id: action.data.key ? action.data.key : state.searchInfo.key,
                    key: action.data.key ? action.data.key : state.searchInfo.key,
                    name: action.data.name ? action.data.name : state.searchInfo.name,
                    info: action.data.info ? action.data.info : state.searchInfo.info,
                }
            })
        case "UPDATE_REFRESH_PAGE_STATUS":
            return Object.assign({}, state, {
                isRefreshPage: !state.isRefreshPage
            })
        case "ADD_TIP":
            return Object.assign({}, state, { tips: action.data })
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
                    if ($d.id == action.data) {
                        _tip_d.splice(i, 1)
                    }
                }
            }
            return Object.assign({}, state, {
                tips: _tip_d
            })
        case "CLEAR_TIP":
            return Object.assign({}, state, { tips: [] })
        case "UPDATE_INIT":
            return Object.assign({}, state, { init: 1 })
        case "REFRESH_TABLE":
            return Object.assign({}, state, { isRefreshTable: 1 })
        case "NO_REFRESH_TABLE":
            return Object.assign({}, state, { isRefreshTable: 0 })
        case "ADD_SIDE":
            return Object.assign({}, state, { side: action.data })
        case "ADD_BREAD_NAV":
            let _breadNav = []
            if (action.data.length) {
                for (var i = 0; i < action.data.length; i++) {
                    var $a = action.data[i];
                    _breadNav.push($a)
                }
            }
            else {
                _breadNav.push(action.data)
            }
            return Object.assign({}, state, { breadNav: eval(JSON.stringify(_breadNav)) })
        case "PUSH_BREAD_NAV":
            state.breadNav.push(action.data)
            return Object.assign({}, state, { 
                breadNav: eval(JSON.stringify(state.breadNav)) 
            })
        case "CLEAR_BREAD_NAV":
            return Object.assign({}, state, { breadNav: [] })
        case "BACK_BREAD_NAV":
            state.breadNav.splice(state.breadNav.length - 1, 1)
            return Object.assign({}, state, { breadNav: eval(JSON.stringify(state.breadNav)) })
        case "SET_CANVERTICALLYSCROLL":
            return Object.assign({}, state, { hasVerticalScroll: action.data })
        case "UPDATE_LOGIN_STATUS":
            return Object.assign({}, state, { loginStatus: action.data })
        case "UPDATE_SIDECONTENT_INFO":
            for (let key in action.data) {
                state.sideContentInfo[key] = action.data[key]
            }
            return Object.assign({}, state, { sideContentInfo: JSON.parse(JSON.stringify(state.sideContentInfo)) })
        case "UPDATE_PRINT_STATUS":
            return Object.assign({}, state, { printStatus: action.data })
        default: return state
    }
}