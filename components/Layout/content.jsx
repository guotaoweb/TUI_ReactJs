import '!style!css!postcss!sass!./style.scss'

import ScrollArea from 'react-scrollbar';

import Btn from "Btn"
import back from "!url!./img/singleLeft.png"
import loading from "!url!./img/loading.png"

class Content extends React.Component {
    render() {
        const {addHref, txt, children, editHref, addTxt, editTxt, backHref, hasVerticalScroll} = this.props
        let addBtn,
            editBtn,
            backBtn
        if (addHref) {
            addBtn = <div style={{ float: "right" }}>
                <Btn type="add" txt={addTxt ? addTxt : "新增"} href={addHref} />
            </div>
        }

        if (editHref) {
            editBtn = <div style={{ float: "right", marginRight: "10px" }}>
                <Btn type="edit" txt={editTxt ? editTxt : "编辑"} href={editHref} />
            </div>
        }

        if (backHref) {
            backBtn = <img src={back} onClick={this.goBack.bind(this)} />
        }
        return (
            <div className="t-content" ref="tContent">
                <div className="t-content_t">
                    <span>{backBtn}{txt}</span>
                    {addBtn}{editBtn}
                </div>
                <div ref="tContentDiv">
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
                            {children}
                        </div>
                    </ScrollArea>
                </div>
                <div className="t-content-loading">
                    <div className="t_loading_img">
                        <img src={loading} />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let allHeight = document.documentElement.clientHeight
        let headerHeight = document.querySelector(".t-header").offsetHeight
        let marginTop = 15
        let _height = allHeight - headerHeight - marginTop * 2
        ReactDOM.findDOMNode(this.refs.tContent).style.height = _height + "px"
        ReactDOM.findDOMNode(this.refs.tContent).style.marginTop = marginTop + "px"
        let _scrollWrapper = this.scrollAreaComponent.wrapper
        let _scrollContent = this.scrollAreaComponent.content
        _scrollWrapper.style.height = (allHeight - headerHeight - 80) + "px"
     
        if(_scrollContent.offsetHeight<_scrollWrapper.offsetHeight){
            _scrollContent.style.height = (allHeight - headerHeight - 80) + "px"
        }
        if (this.scrollAreaComponent) {
            this.scrollAreaComponent.scrollArea.refresh()
        }
    }

    goBack() {
        this.props.backHref()
    }
};

export default TUI._connect({
    hasVerticalScroll: "publicInfo.hasVerticalScroll"
}, Content)

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