import '!style!css!postcss!sass!./style.scss'
import { Link } from 'react-router'
import { openLoading } from "Loading"

let SIDESTATUS = 0 //open
class SideContent extends React.Component {
    render() {
        const {sideStatus} = this.props
        return (
            <div className="t-sidecontent" ref="sideContent">
                {this.props.children}
            </div>
        )
    }

    componentDidMount() {
        const {sideStatus} = this.props
        ReactDOM.findDOMNode(this.refs.sideContent).style.height = (_obj().allHeight - _obj().headerHeight) + "px"
        ReactDOM.findDOMNode(this.refs.sideContent).style.top = _obj().headerHeight + "px"

        SIDESTATUS = sideStatus
    }

    componentDidUpdate(nextProps) {
        const {sideStatus} = this.props
        console.info(nextProps)
        if (sideStatus != nextProps.sideStatus) {
            SIDESTATUS = sideStatus
            openSideContent()
            return true
        }
        else{
            return false
        }
    }
}

export default TUI._connect({
    sideStatus: "publicInfo.sideStatus"
}, SideContent)

export function _obj() {
    return {
        allWidth: document.documentElement.clientWidth,
        allHeight: document.documentElement.clientHeight,
        headerHeight: document.querySelector(".t-header") ? document.querySelector(".t-header").offsetHeight : 0,
        sideContent: document.getElementsByClassName("t-sidecontent")[0]
    }
}

export function openSideContent() {

    let _sideWidth = SIDESTATUS == 0 ? "160" : "60"
    console.info(_sideWidth)
    _obj().sideContent.style.left = _sideWidth + "px"
    let $tContent = document.getElementsByClassName("t-content")[0]

    $tContent.style.transition = "all 200ms ease"
    $tContent.style.marginLeft = "0px"
    $tContent.style.width = (_obj().allWidth - _sideWidth - 240 - 30) + "px"
    $tContent.style.left = "255px"
}

export function closeSideContent() {
    _obj().sideContent.style.left = "-1000px";
}