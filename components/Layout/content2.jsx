import '!style!css!postcss!sass!./style.scss'
import ScrollArea from 'react-scrollbar'
import loading from "!url!./img/loading.png"

class Content2 extends React.Component {
    render() {
        const {hasVerticalScroll, tabs} = this.props
        let tabsArry = []
        let _this = this

        if (this.props.tabs) {
            for (var index = 0; index < tabs.length; index++) {
                var $li = tabs[index]
                if (index == 0) {
                    tabsArry.push(<li key='content2_editVteam_0' className="t-content2_tab t-contetn2_tab--active" data-bind={$li.id} onClick={$li.fn}>{$li.name}</li>)
                }
                else {
                    tabsArry.push(<li key={"content2_editVteam_" + index} className="t-content2_tab" data-bind={$li.id} onClick={$li.fn}>{$li.name}</li>)
                }
            }
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
    }
}

export default TUI._connect({
    hasVerticalScroll: "publicInfo.hasVerticalScroll"
}, Content2)

export function bindEvent($this) {
    let allHeight = document.documentElement.clientHeight
    let headerHeight = document.querySelector(".t-header").offsetHeight
    let baseHeight = (allHeight - headerHeight)


    //let bodyScrollHeight = document.documentElement.scrollHeight
    let _fn = function () {
        let _this = this
        let tabId = this.getAttribute("data-bind")
        let nodes = TUI.fn.siblingsElem(tabId)
        document.querySelector(".t-contetn2_tab--active").className = "t-content2_tab"
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
    
    //为tabs绑定事件
    let contentTabs = document.getElementsByClassName("t-content2_tab")
    for (var i = 0; i < contentTabs.length; i++) {
        var $t = contentTabs[i]

        //console.info($t)
        $t.removeEventListener("click", _fn)
        $t.addEventListener("click", _fn)
    }
}

export function getContentIndex(index) {

    let $tabs = document.getElementsByClassName("t-content2_tab")
    for (let i = 0; i < $tabs.length; i++) {
        let $t = $tabs[i]
        if (i == index) {
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