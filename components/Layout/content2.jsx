import '!style!css!postcss!sass!./style.scss'
import ScrollArea from 'react-scrollbar'
import loading from "!url!./img/loading.png"
import goback from "!url!./img/singleLeft.png"


class Content2 extends React.Component {
    render() {
        const {goBackHref, tabs, content2More} = this.props
        let tabsArry = []
        let _this = this

        if (this.props.tabs) {
            tabsArry.push(<li key={"content2_editVteam_default"} className="t-content2_tab" data-bind="goback" onClick={goBackHref}><img style={{ width: "20px", verticalAlign: "middle", marginTop: "-2px" }} src={goback} />返回</li>)
            for (var index = 0; index < tabs.length; index++) {
                var $li = tabs[index]

                if (index == 0) {
                    tabsArry.push(<li key='content2_editVteam_0' className="t-content2_tab t-contetn2_tab--active" data-bind={$li.id} onClick={$li.fn}>{$li.name}</li>)
                }
                else {
                    tabsArry.push(<li key={"content2_editVteam_" + index} className="t-content2_tab" data-bind={$li.id} onClick={$li.fn}>{$li.name}</li>)
                }
            }

            let _content2more = []
            for (var i = 0; i < content2More.length; i++) {
                var $c = content2More[i]
                if ($c) {
                    _content2more.push(<p key={"content2More" + i} className="content2More" data-index={$c.index} data-bind={$c.id} onClick={$c.fn}>{$c.name}</p>)
                }
            }

            tabsArry.push(
                <li
                    key="t_content2_tabs_more"
                    className="t_content2_tabs_more"
                    style={{ width: "20px", padding: "8px 10px", position: "relative",display:"none" }}
                    onClick={this.content2tabsmore.bind(this)}>
                    <img src={goback} style={{ width: "10px" }} />
                    <div style={{
                        width: "200px",
                        backgroundColor: "#ebebeb",
                        border: "1px solid #ebebeb",
                        position: "absolute",
                        zIndex: "99",
                        right: "0px",
                        top: "39px",
                        display: "none"
                    }}>
                        {_content2more}
                    </div>
                </li>
            )
        }

        let isValid = true
        let children = this.props.children
        for (var index = 0; index < children.length; index++) {
            if (typeof children[index] != "object") {
                isValid = false
            }
        }

        if (isValid) {
            if (this.props.children.length != null) {
                children = []
                for (let i = 0; i < this.props.children.length; i++) {
                    let $c = this.props.children[i]
                    let id = tabs[i] ? tabs[i].id : "none_children_" + i
                    children.push(React.cloneElement($c, { style: { display: i > 0 ? "none" : "block" }, key: id, className: id + " t_contemt_c" }))
                }
                setTimeout(function () { bindEvent(_this) }, 500)

            }
        }
        else {
            children = <div>此布局用法不正确, children的内容必须被元素包裹</div>
        }

        return (
            <div className="t-content2" ref="tContent2">
                <div className="t-content2_sub" ref="tContent2Sub">
                    <ul className="t-contetn2_tab">
                        {tabsArry}
                    </ul>
                    <div ref="tContent2SubDiv">
                        <ScrollArea
                            className="area"
                            contentClassName="content"
                            speed={Config.SCROLL.speed}
                            smoothScrolling={Config.SCROLL.smoothScrolling}
                            minScrollSize={Config.SCROLL.minScrollSize}
                            verticalScrollbarStyle={{ borderRadius: Config.SCROLL.scrollRadius }}
                            verticalContainerStyle={{ borderRadius: Config.SCROLL.scrollRadius }}
                            ref={(component) => { this.scrollAreaComponent = component } }
                            >
                            <div>
                                <div className="t-content-loading">
                                    <div className="t_loading_img">
                                        <img src={loading} />
                                    </div>
                                </div>
                                {children}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        )
    }

    componentDidUpdate(nextProps) {
        let _scrollContent = this.scrollAreaComponent.content
        let thisProps = this.props.pageInfo
        for (let key in thisProps) {
            let _thisProps = thisProps[key]
            if (_thisProps[key].size != nextProps.pageInfo[key].size) {
                _scrollContent.style.height = "auto"
                return true

            }
            else {
                return false
            }
        }
    }

    componentDidMount() {
        let allHeight = document.documentElement.clientHeight
        let headerHeight = document.querySelector(".t-header").offsetHeight
        let baseHeight = (allHeight - headerHeight)
        ReactDOM.findDOMNode(this.refs.tContent2Sub).style.height = baseHeight - 70 + "px"
        ReactDOM.findDOMNode(this.refs.tContent2).style.height = baseHeight + "px"
        this.scrollAreaComponent.wrapper.style.height = baseHeight - 70 + "px"
        bindEvent(this)
        if (this.scrollAreaComponent) {
            this.scrollAreaComponent.scrollArea.refresh()
        }

        
        let $tcontent2 = document.getElementsByClassName("t-content2")
        let outNum = 0
        let newTabs = []
        // for (var i = 0; i < $tcontent2.length; i++) {
        //     var $t = $tcontent2[i]
        //     //console.info($t)
        //     //console.info($t.offsetWidth)
        //     let $t_ul = $t.getElementsByClassName("t-content2_tab")
          
        //     //console.info(($t_ul.length + 1) * 80 +","+ $t.offsetWidth)
        //     if (($t_ul.length + 1) * 80 > $t.offsetWidth) {
        //         console.info("超过了")
        //         outNum = Math.ceil((($t_ul.length + 1) * 80 - $t.offsetWidth) / 80)
        //         $t.getElementsByClassName("t_content2_tabs_more")[0].style.display="inline"
            
        //         for (var j = 0; j < $t_ul.length; j++) {
        //             if (j > $t_ul.length - outNum - 2) {
        //                 $t_ul[j].style.display = "none"
        //                 let tabs = this.props.tabs
        //                 //tabs[j]["Index"] = j
        //                 if (tabs[j]) {
        //                     tabs[j]["index"] = j
        //                     newTabs.push(tabs[j])
        //                 }
        //             }
        //         }
        //     }
        // }
        // console.info(outNum)
        // if(outNum>0){
        //     this.props.addContent2More(newTabs)
        // }
    }

    content2tabsmore(e) {
        let $this = e.currentTarget.getElementsByTagName("div")[0]

        if ($this.style.display == "block") {
            $this.style.display = "none"
        }
        else {
            $this.style.display = "block"
        }
    }
}

export default TUI._connect({
    pageInfo: "publicInfo.pageInfo",
    content2More: "publicInfo.content2More"
}, Content2)

export function bindEvent($this) {
    let allHeight = document.documentElement.clientHeight
    let headerHeight = document.querySelector(".t-header").offsetHeight
    let baseHeight = (allHeight - headerHeight)


    //let bodyScrollHeight = document.documentElement.scrollHeight
    let _fn = function () {
        let _this = this
        let tabId = this.getAttribute("data-bind")
        if (tabId != "goback") {
            let nodes = TUI.fn.siblingsElem(tabId)
            if (document.querySelector(".t-contetn2_tab--active")) {
                document.querySelector(".t-contetn2_tab--active").setAttribute("class", "t-content2_tab")
            }
            _this.className = _this.className + " " + "t-contetn2_tab--active"
            for (var index = 0; index < nodes.length; index++) {
                var $n = nodes[index];
                $n.style.display = "none"
            }

            let _content = document.querySelector("." + tabId)
            _content.style.display = "block"
            _content.style.paddingBottom = "10px"
            if (_content.offsetHeight > _content.parentNode.parentNode.parentNode.offsetHeight) {
                $this.props.setCanVerticallyScroll(true)
            }
            else {
                $this.props.setCanVerticallyScroll(false)
            }
        }
    }

    let _fn0 = function () {
        let $c2more = this
        let tabId = $c2more.getAttribute("data-bind")
        let _content = document.querySelector("." + tabId)
        // console.info(tabId)
        // console.info(_content)

        let nodes = TUI.fn.siblingsElem(tabId)
        if (document.querySelector(".t-contetn2_tab--active")) {
            document.querySelector(".t-contetn2_tab--active").setAttribute("class", "t-content2_tab")
        }
        //c2more.className = _this.className + " " + "t-contetn2_tab--active"
        for (var index = 0; index < nodes.length; index++) {
            var $n = nodes[index];
            $n.style.display = "none"
        }

        _content.style.display = "block"
        _content.style.paddingBottom = "10px"
        if (_content.offsetHeight > _content.parentNode.parentNode.parentNode.offsetHeight) {
            $this.props.setCanVerticallyScroll(true)
        }
        else {
            $this.props.setCanVerticallyScroll(false)
        }
    }

    //为tabs绑定事件
    let contentTabs = document.getElementsByClassName("t-content2_tab")
    for (var i = 0; i < contentTabs.length; i++) {
        var $t = contentTabs[i]

        $t.removeEventListener("click", _fn)
        $t.addEventListener("click", _fn)
    }

    let content2More = document.getElementsByClassName("content2More")
    for (let i = 0; i < content2More.length; i++) {
        let $c2more = content2More[i]
        $c2more.removeEventListener("click", _fn0)
        $c2more.addEventListener("click", _fn0)
    }
}

export function getContentIndex(index) {

    let $tabs = document.getElementsByClassName("t-content2_tab")
    for (let i = 1; i < $tabs.length; i++) {
        let $t = $tabs[i]
        if (i == index + 1) {
            $t.className = $t.className + " " + "t-contetn2_tab--active"
        }
        else {
            $t.className = "t-content2_tab"
        }
    }
    let $tabsContent = document.getElementsByClassName("t_contemt_c")
    for (let j = 0; j < $tabsContent.length; j++) {
        let $c = $tabsContent[j]
        if (j == index) {
            $c.style.display = "block"
        }
        else {
            $c.style.display = "none"
        }
    }

}


export function openContentLoading() {
    let sidepage = document.querySelector(".t-content-loading")
    sidepage.style["transition"] = "opacity 200ms ease"
    sidepage.style.opacity = "1"
    sidepage.style.display = "block"
    setTimeout(function () {
        closeContentLoading()
    }, 15000)
}

export function closeContentLoading() {
    setTimeout(function () {
        let sidepage = document.querySelector(".t-content-loading")
        sidepage.style["transition"] = "opacity 200ms ease"
        sidepage.style.opacity = "0"
        setTimeout(function () {
            sidepage.style.display = "none"
        }, 201)
    }, 500)
}