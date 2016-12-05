import '!style!css!postcss!sass!./style.scss'
import singleLeft from "!url!./img/singleLeft.png"
import Btn from "Btn"
import ScrollArea from 'react-scrollbar'
import loading from "!url!./img/loading.png"

class SidePage extends React.Component {
    render() {
        const {title, editHref, addHref, editHrefTxt, addHrefTxt, id, hasVerticalScroll} = this.props
        let _title = []
        if (title) {
            _title = <div className="t-content_t">
                <span><img
                    src={singleLeft}
                    onClick={this._closeSidePage.bind(this)} />{title}</span>
                {addHref ?
                    <Btn style={{ float: "right" }} txt={addHrefTxt ? addHrefTxt : "保存"} href={addHref} />
                    : ""
                }
                {editHref ?
                    <Btn style={{ float: "right", marginRight: "10px" }} txt={editHrefTxt ? editHrefTxt : "编辑"} href={editHref} />
                    : ""
                }
            </div>
        }
        return (
            <div>

                <div id={this.props.id} className="t-sidepage" ref="sidePage">
                    {_title}
                    <ScrollArea
                        className="area"
                        contentClassName="content"
                        speed={Config.SCROLL.speed}
                        smoothScrolling={Config.SCROLL.smoothScrolling}
                        minScrollSize={Config.SCROLL.minScrollSize}
                        verticalScrollbarStyle={{ borderRadius: Config.SCROLL.scrollRadius }}
                        verticalContainerStyle={{ borderRadius: Config.SCROLL.scrollRadius }}
                        ref={(component) => { this.scrollAreaSidePageComponent = component } }
                        >
                        {this.props.children.length ? this.props.children[1] : this.props.children}
                    </ScrollArea>
                    <div className="t-sidePageCover">
                        <div className="t_loading_img">
                            <img src={loading} />
                        </div>
                    </div>
                </div>
                <div id={this.props.id + "_min"} className="t-sidepage_min" ref="sidePageMin">
                    {this.props.children.length > 1
                        ? this.props.children[0]
                        : ""}
                </div>
            </div>
        )
    }

    componentDidUpdate() {
        const {sidePageInfo, sideStatus} = this.props
        let $obj = {
            allHeight: document.documentElement.clientHeight, //文档高度
            headerHeight: document.querySelector(".t-header")
                ? document.querySelector(".t-header").offsetHeight
                : 0, //header高度
            allWidth: document.documentElement.clientWidth, //文档宽度
            sideWidth: document.querySelector(".t-side")
                ? document.querySelector(".t-side").offsetWidth
                : 0, //side的宽度
            contentSideWidth: document.querySelector(".t-content3_side")
                ? document.querySelector(".t-content3_side").offsetWidth
                : 0, //content3布局中的side宽度
            $sidePage: document.querySelector(".t-sidepage"), //主SidePage
            $sidePageMin: document.querySelector(".t-sidepage_min"), //辅SidePage
            sideStatus: sideStatus,
            sidePageInfo: sidePageInfo,
            content3SideWidth: document.querySelector(".t-content3_side") ? document.querySelector(".t-content3_side").offsetWidth : 0
        }
        let _scrollWrapper = this.scrollAreaSidePageComponent.wrapper
        let _scrollContent = this.scrollAreaSidePageComponent.content
        _scrollWrapper.style.height = ($obj.allHeight) + "px"
        _scrollContent.style.height = ($obj.allHeight) + "px"
        if (this.scrollAreaSidePageComponent) {
            this.scrollAreaSidePageComponent.scrollArea.refresh()
        }

        if (sidePageInfo.id) {
            $obj.$sidePage = document.getElementById(sidePageInfo.id)
        }
        if (sidePageInfo.id) {
            $obj.$sidePageMin = document.getElementById(sidePageInfo.id + "_min")
        }
        //type:1 显示辅助SidePage type:0 只显示主SidePage
        $obj.sidePageWidth = sidePageInfo.width ? parseInt(sidePageInfo.width) : ($obj.allWidth - $obj.sideWidth - $obj.contentSideWidth)
        if ($obj.$sidePage) {
            $obj.$sidePage.style.width = $obj.sidePageWidth + "px"
            $obj.$sidePage.style.height = ($obj.allHeight - $obj.headerHeight) + "px"
            $obj.$sidePage.style.top = $obj.headerHeight + "px"
        }

        if (sidePageInfo.type == 1) {
            $obj.sidePageWidth = $obj.allWidth - $obj.sideWidth - $obj.contentSideWidth
            $obj.sidePageWidth = $obj.sidePageWidth - $obj.$sidePageMin.offsetWidth
            $obj.$sidePageMin.style.height = ($obj.allHeight - $obj.headerHeight) + "px"
            $obj.$sidePageMin.style.top = $obj.headerHeight + "px"
            $obj.$sidePage.style.width = $obj.sidePageWidth + "px"
        }

        this.autoAdapter($obj)
    }

    autoAdapter($obj) {
        //side缩小时,让sidePage自适应 right等于0px的时候,表示sidepage已经打开了

        let sidePageMinWidth = $obj.$sidePageMin ? $obj.$sidePageMin.offsetWidth : 0
        if ($obj.$sidePage) {
            if ($obj.$sidePage.style.right == "0px" && !$obj.sidePageInfo.width) {
                if ($obj.sideStatus == 1) {
                    let sideWidth = 60
                    if ($obj.sidePageInfo.type == 1) {
                        $obj.$sidePageMin.style.left = sideWidth + "px"
                        $obj.$sidePage.style.right = "0px"
                        $obj.$sidePage.style.width = ($obj.allWidth - sideWidth - sidePageMinWidth) + "px"
                    } else {
                        $obj.$sidePage.style.width = ($obj.allWidth - sideWidth - $obj.content3SideWidth) + "px"
                    }
                } else {
                    let sideWidth = 160

                    if ($obj.sidePageInfo.type == 1) {
                        $obj.$sidePageMin.style.left = sideWidth + "px"
                        $obj.$sidePage.style.width = ($obj.allWidth - sidePageMinWidth - sideWidth) + "px"
                    } else {
                        $obj.$sidePage.style.width = ($obj.allWidth - sideWidth - $obj.content3SideWidth) + "px"
                    }
                }
            }
        }
    }

    _closeSidePage() {
        const {id} = this.props
        if (id) {
            closeSidePage({ id: id })
        } else {
            closeSidePage()
        }
    }
}

export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo",
    sideStatus: "publicInfo.sideStatus",
    hasVerticalScroll: "publicInfo.hasVerticalScroll"
}, SidePage)

export function openSidePage(_this, params) {
    _this.props.updateSidePageInfo({ status: params.status, width: params.width, gateWay: params.gateWay, type: params.type, id: params.id })
    setTimeout(function () {
        let $sidepage = document.querySelector(".t-sidepage")
        let $sidepagemin = document.querySelector(".t-sidepage_min")
        if (params.id) {
            $sidepage = document.getElementById(params.id)
        }
        if (params.id) {
            $sidepagemin = document.getElementById(params.id + "_min")
        }
        if ($sidepage) {
            if (params.type == 1) {
                //文档宽度
                let allWidth = document.documentElement.clientWidth
                //side的宽度
                let sideWidth = document.querySelector(".t-side")
                    ? document
                        .querySelector(".t-side")
                        .offsetWidth
                    : 0
                //content3布局中的side宽度
                let contentSideWidth = document.querySelector(".t-content3_side")
                    ? document
                        .querySelector(".t-content3_side")
                        .offsetWidth
                    : 0

                $sidepagemin.style["transition"] = "left 300ms ease"
                $sidepagemin.style.left = sideWidth + "px"

                // let sidePageWidth = allWidth - sideWidth - contentSideWidth sidePageWidth -=
                // $sidepagemin.offsetWidth $sidepage.style.right = "-" + sidePageWidth + "px"
                $sidepage.style["transition"] = "all 300ms ease" //right,width
                $sidepage.style.right = "0px"
            } else {
                $sidepage.style["transition"] = "all 300ms ease"
                $sidepage.style.right = "0px"
            }
        }
    }, 0)
}

export function closeSidePage(params) {
    let sidepage = document.querySelector(".t-sidepage")
    let sidepagemin = document.querySelector(".t-sidepage_min")
    if (params) {
        sidepage = document.getElementById(params.id)
        sidepagemin = document.getElementById(params.id + "_min")
    }

    if (sidepage) {
        sidepage.style["transition"] = "right 200ms ease"
        sidepage.style.right = "-2000px"
        sidepagemin.style["transition"] = "left 200ms ease"
        sidepagemin.style.left = "-2000px"
    }
}

export function openSidePageLoading(_this, params) {
    let $sidepage = document.querySelector(".t-sidepage")
    let $sidepagemin = document.querySelector(".t-sidepage_min")
    if (params.id) {
        $sidepage = document.getElementById(params.id)
    }
    if (params.id) {
        $sidepagemin = document.getElementById(params.id + "_min")
    }

    let sidepage = $sidepage.querySelector(".t-sidePageCover")
    sidepage.style["transition"] = "opacity 200ms ease"
    sidepage.style.opacity = "1"
    sidepage.style.display = "block"
}

export function closeSidePageLoading(_this, params) {
    setTimeout(function () {
        let $sidepage = document.querySelector(".t-sidepage")
        let $sidepagemin = document.querySelector(".t-sidepage_min")
        if (params.id) {
            $sidepage = document.getElementById(params.id)
        }
        if (params.id) {
            $sidepagemin = document.getElementById(params.id + "_min")
        }

        let sidepage = $sidepage.querySelector(".t-sidePageCover")
        sidepage.style["transition"] = "opacity 200ms ease"
        sidepage.style.opacity = "0"
        setTimeout(function () {
            sidepage.style.display = "none"
        }, 201)
    }, 200)
}