import '!style!css!postcss!sass!./style.scss'
import { Link } from 'react-router'
import { openLoading } from "Loading"
import * as config from "config"


class Side extends React.Component {
    render() {
        const {sideStatus, userId, list, title, addFn} = this.props

        let _list = []
        for (let i = 0; i < list.length; i++) {
            let $l = list[i],
                _a = []

            if (!$l.url && $l.url != "#") {
                _a = <Link key={"side_main_link" + i} to={$l.url}><img src={$l.sicon} data-src={$l.icon} data-src-s={$l.sicon} /><span style={{ display: sideStatus == "0" ? "inline" : "none" }}>{$l.name}</span></Link>
            }
            else {
                _a = <a key={"side_main_a" + i} href="#"><img src={$l.sicon} data-src={$l.icon} data-src-s={$l.sicon} /><span style={{ display: sideStatus == "0" ? "inline" : "none" }}>{$l.name}</span></a>
            }

            _list.push(
                <li key={"side_main_li" + i} className="tSubSide" data-status={sideStatus == "0" ? "open" : "close"}>
                    <div id={$l.id} ref={$l.id + "s"} onClick={this.updateSubStatus.bind(this, this.props.addFn, $l.id)}>{_a}</div>
                    <SubNode list={$l.sub} />
                </li>
            )

        }

        return (
            <div className={"t-side " + (sideStatus == "0" ? "t-side--open" : "t-side--close")} ref="tSide">
                <div className="t-side_header">{title}</div>
                <ul className="t-side_list" ref="tSideList">
                    {_list}
                </ul>
            </div>
        )
    }

    //展开/收缩 菜单
    updateSubStatus(addFn, id) {
        if (addFn) { addFn(this, id) }
        let subUl = this.refs[id + "s"].nextSibling

        if (subUl) {
            let tSubSide = document.getElementsByClassName("tSubSide")
            for (var index = 0; index < tSubSide.length; index++) {
                var $e = tSubSide[index]

                if ($e.getElementsByTagName("ul").length > 0 && this.refs[id + "s"].parentNode != $e) {
                    $e.getElementsByTagName("ul")[0].style.display = "none"
                }
            }

            if (this.refs[id + "s"].parentNode.getAttribute("data-status") == "open") {
                if (!subUl.style.display || subUl.style.display == "none") {
                    subUl.style.display = "block"
                }
                else {
                    subUl.style.display = "none"
                }
            }

        }
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.list.length == 0) {
            return true
        }
        else {
            return false
        }
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.tSide).style.height = document.documentElement.clientHeight + "px"
    }
    componentDidUpdate() {
        let _this = this
        let _open_status = config.DEFAULT_OPEN_SIDE
        let tSubSide = document.getElementsByClassName("tSubSide")

        for (let index = 0; index < tSubSide.length; index++) {
            //一级菜单
            let s = tSubSide[index]

            //初始化话side状态
            if (typeof _open_status == "object" && _open_status.length == 2) {
                if (index == _open_status[0]) {
                    s.setAttribute("data-status", "open")
                    s.style.backgroundColor = "rgb(36, 46, 63)"
                    s.getElementsByTagName("div")[0].getElementsByTagName("a")[0].style.color = "white"
                    s.getElementsByTagName("ul")[0].style.display = "block"
                    s.getElementsByTagName("img")[0].setAttribute("src", s.getElementsByTagName("img")[0].getAttribute("data-src"))
                }
            }



            s.addEventListener("mouseenter", function(e) {
                if (_this.props.sideStatus == "1") {
                    this.parentNode.style.overflow = "visible"
                    this.getElementsByTagName("span")[0].style.display = "inline"
                    if (this.querySelector(".t-side_sub")) {
                        this.querySelector(".t-side_sub").style.display = "block"
                    }
                    this.style.backgroundColor = "rgba(36,46,63,1)"
                    for (let i = 0; i < tSubSide.length; i++) {
                        let $s = tSubSide[i]
                        if (this != $s && $s.getAttribute("data-click") == "true") {
                            $s.style.backgroundColor = "transparent"
                        }
                    }
                }
            })

            s.addEventListener("mouseleave", function(e) {
                if (_this.props.sideStatus == "1") {
                    this.parentNode.style.overflow = "hidden"
                    this.getElementsByTagName("span")[0].style.display = "none"
                    if (this.querySelector(".t-side_sub")) {
                        this.querySelector(".t-side_sub").style.display = "none"
                    }
                    this.style.backgroundColor = "transparent"

                    //恢复被选中的状态

                    for (let i = 0; i < tSubSide.length; i++) {
                        let $s = tSubSide[i]
                        if ($s.getAttribute("data-click") == "true") {
                            $s.style.backgroundColor = "rgba(36,46,63,1)"
                        }
                    }
                }
            })

            s.addEventListener("click", function() {
                let _tSubSide = document.getElementsByClassName("tSubSide")
                //将菜单中所有的图片和文字都切换成灰色(为选中状态)
                for (let i = 0; i < _tSubSide.length; i++) {
                    let img_s = _tSubSide[i].getElementsByTagName("img")[0].getAttribute("data-src-s")
                    _tSubSide[i].getElementsByTagName("img")[0].setAttribute("src", img_s)
                    _tSubSide[i].getElementsByTagName("a")[0].style.color = "#999"
                    _tSubSide[i].style.backgroundColor = "transparent"
                    _tSubSide[i].setAttribute("data-click", "false")
                }

                //切换主菜单的状态
                let img = this.getElementsByTagName("img")[0].getAttribute("data-src")
                this.getElementsByTagName("img")[0].setAttribute("src", img)
                this.getElementsByTagName("a")[0].style.color = "white"
                this.style.backgroundColor = "rgba(36,46,63,1)"
                this.setAttribute("data-click", "true")

                // let urlHref = window.location.href
                // let thisHref = this.getElementsByTagName("a")[0].getAttribute("href")
                // if (urlHref.indexOf(thisHref) < 0) {
                //   openLoading()
                // }
            })


            //二级菜单
            let twoSub = s.getElementsByTagName("li")
            for (var j = 0; j < twoSub.length; j++) {
                var $twoSub = twoSub[j]

                if (typeof _open_status == "object" && _open_status.length == 2) {
                    if (j == _open_status[1] && index == _open_status[0]) {
                        $twoSub.style.borderRightWidth = "3px"
                        $twoSub.style.borderRightStyle = "solid"
                        $twoSub.style.borderRightColor = "rgb(76, 134, 220)"
                        $twoSub.getElementsByTagName("a")[0].style.color = "white"
                        $twoSub.setAttribute("data-click", "true")
                    }
                }
                $twoSub.addEventListener("mouseenter", function(e) {
                    this.style.borderRight = "3px solid #4C86DC"
                })

                $twoSub.addEventListener("mouseleave", function(e) {
                    if (this.getAttribute("data-click") != "true") {
                        this.style.borderRight = "3px solid transparent"
                    }
                })
                $twoSub.addEventListener("click", function() {
                    _this.removeSubMenuStatus(twoSub)
                    _this.clearSubMenu()
                    _this.addSubMenuStatus(this)
                })
            }
        }
    }


    clearSubMenu() {
        let sub_sub = document.getElementsByClassName("t-side_sub")
        for (let m = 0; m < sub_sub.length; m++) {
            let $m = sub_sub[m];
            for (let n = 0; n < $m.getElementsByTagName("li").length; n++) {
                let $n = $m.getElementsByTagName("li")[n];
                this.removeSubMenuStatus($n)
            }
        }
    }

    addSubMenuStatus($obj) {
        //取消所有子菜单的选中状态
        let _sub_li = document.getElementsByClassName("sub_li")

        for (let k = 0; k < _sub_li.length; k++) {
            let $k = _sub_li[k]
            $k.style.borderRight = "3px solid transparent"
            $k.getElementsByTagName("a")[0].style.color = "rgb(153, 153, 153)"
            $k.setAttribute("data-click", "false")
        }

        $obj.style.borderRight = "3px solid #4C86DC"
        $obj.setAttribute("data-click", "true")
        $obj.style.color = "white"
        if ($obj.getElementsByTagName("a").length > 0) {
            $obj.getElementsByTagName("a")[0].style.color = "white"
        }
    }

    removeSubMenuStatus($obj) {
        for (var k = 0; k < $obj.length; k++) {
            var $twoSub_ = $obj[k]
            $twoSub_.style.borderRight = "3px solid transparent" //二级菜单的右边框
            $twoSub_.setAttribute("data-click", "false")//鼠标移开此元素时,根据此属性判断是否同时移除元素上的其它效果
            $twoSub_.style.color = "#999"
            $twoSub_.getElementsByTagName("a")[0].style.color = "#999"
        }
    }

}

export default TUI._connect({
    sideStatus: "publicInfo.sideStatus",
    userId: "publicInfo.userInfo.id",
    data: "sideList.data",
}, Side)


class SubNode extends React.Component {
    render() {
        const {list} = this.props
        let _list = []
        if (list) {
            for (let j = 0; j < list.length; j++) {
                let $s = list[j]
                if ($s.url) {
                    _list.push(<li className="sub_li" key={"side_sub_link" + j}><Link to={$s.url}>{$s.name}</Link></li>)
                }
                else {
                    _list.push(<li className="sub_li" key={"side_sub_a" + j}><a href="#" onClick={$s.fn}>{$s.name}</a></li>)
                }
            }
        }

        return (
            <ul className="t-side_sub">
                {_list}
            </ul>
        )
    }
}