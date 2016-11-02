import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import 'whatwg-fetch'

import TUI from '../utils'
import Actions from "../actions/index"
import {openLoading, closeLoading} from "../components/Loading/index"

export const platform = {
    //url 接口地址
    //_callback 回调方法
    //loadComplate:true 表示此方法完成网络请求后,取消加载状态
    //this 对象
    get: function (url, _callback, loadComplate, _this) {
        let _interface = TUI.INTERFACE1
        if (window.location.href.indexOf("?uId") > -1 || window.location.href.indexOf("manage") > -1) {
            _interface = TUI.INTERFACE
        }

        openLoading()

        let _isRefreshPage = false

        if (_this.props.isRefreshPage) {
            //更新刷新页面的状态
            if (_this && loadComplate) {
                _this.props.updateRefreshPageStatus()
            }
            _isRefreshPage = true
        }

        if (_isRefreshPage) {
            fetch(_interface + url, {
                method: "get",
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            }).then(function (res) {
                if (res.ok) {
                    res.json().then(function (obj) {
                        if (loadComplate) {
                            closeLoading()
                        }
                        _callback(obj)
                    })
                }
            })
        }
    },
    post: function (url, params, _callback) {
        let _interface = TUI.INTERFACE1
        if (window.location.href.indexOf("?uId") > -1 || window.location.href.indexOf("manage") > -1) {
            _interface = TUI.INTERFACE
        }
        fetch(_interface + url, {
            method: "post",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(params)
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (obj) {
                    _callback(obj)
                })
            }
        })
    },
    patch: function (url, _callback) {
        let _interface = TUI.INTERFACE1
        if (window.location.href.indexOf("?uId") > -1 || window.location.href.indexOf("manage") > -1) {
            _interface = TUI.INTERFACE
        }
        fetch(_interface + url, {
            method: "PATCH",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' }
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (obj) {
                    _callback(obj)
                })
            }
        })
    },
    delete: function (url, _callback) {
        let _interface = TUI.INTERFACE1
        if (window.location.href.indexOf("?uId") > -1 || window.location.href.indexOf("manage") > -1) {
            _interface = TUI.INTERFACE
        }
        fetch(_interface + url, {
            method: "DELETE",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' }
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (obj) {
                    _callback(obj)
                })
            }
        })
    },
    put: function (url, params, _callback) {
        let _interface = TUI.INTERFACE1
        if (window.location.href.indexOf("?uId") > -1 || window.location.href.indexOf("manage") > -1) {
            _interface = TUI.INTERFACE
        }
        fetch(_interface + url, {
            method: "PUT",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(params)
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (obj) {
                    _callback(obj)
                })
            }
        })
    },
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    } (),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

export function _connect(params, _component) {
    let mapStateToProps = function (state) {
        let _json = {}
        for (let key in params) {
            let _r = null
            let paramArry = params[key].split(".")
            for (var i = 0; i < paramArry.length; i++) {
                var k = paramArry[i];
                if (_r) {
                    _r = _r[k]
                }
                else {
                    _r = state[k]
                }
            }
            _json[key] = _r
        }

        return _json
    }
    let mapDispatchToProps = function (dispatch) {
        return bindActionCreators(Actions, dispatch)
    }
    return connect(mapStateToProps, mapDispatchToProps)(_component)
}


