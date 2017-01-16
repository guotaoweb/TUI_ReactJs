import '!style!css!postcss!sass!./style.scss'
import ScrollArea from 'react-scrollbar'

let SIDESTATUS = 0 //open
class SideContent extends React.Component {
    render() {
        const {sideStatus} = this.props
        return (
            <div className="t-sidecontent" ref="sideContent">
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
                        {this.props.children}
                    </div>
                </ScrollArea>
            </div>
        )
    }

    componentDidMount() {
        const {sideStatus} = this.props
        ReactDOM.findDOMNode(this.refs.sideContent).style.height = (_obj().allHeight - _obj().headerHeight) + "px"
        ReactDOM.findDOMNode(this.refs.sideContent).style.top = _obj().headerHeight + "px"

        SIDESTATUS = sideStatus

        this.scrollAreaComponent.wrapper.style.height = (_obj().allHeight - _obj().headerHeight) + "px"

        //bindEvent(this)
        if (this.scrollAreaComponent) {
            this.scrollAreaComponent.scrollArea.refresh()
        }
    }

    componentDidUpdate(nextProps) {
        const {sideStatus} = this.props
        let sideContentLeft = document.getElementsByClassName("t-sidecontent")[0].style.left
        if(sideContentLeft){
            sideContentLeft = sideContentLeft.substring(0,sideContentLeft.length-2)
        }
  
        if (sideStatus != nextProps.sideStatus && sideContentLeft > 0) {
            SIDESTATUS = sideStatus
            openSideContent()
            this.autoAdaption()
            return true
        }
        else {
            return false
        }
    }

    autoAdaption(){
        if(this.props.sideStatus=="1"){
            _obj().sideContent.style.left = "60px"
            if(document.getElementsByClassName("t-sidecontent")[0].style.left > 0){
                let $tContent = document.getElementsByClassName("t-content")[0]
                $tContent.style.width = (_obj().allWidth - 60 - 240 - 30) + "px"
            }
        }
        else{
            _obj().sideContent.style.left = "160px"
            let $tContent = document.getElementsByClassName("t-content")[0]
            if($tContent && document.getElementsByClassName("t-sidecontent")[0].style.left > 0){
                $tContent.style.width = (_obj().allWidth - 160 - 240 - 30) + "px"
            }
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

    _obj().sideContent.style.left = _sideWidth + "px"
    let $tContent = document.getElementsByClassName("t-content")[0]

    $tContent.style.transition = "all 200ms ease"
    $tContent.style.marginLeft = "0px"
    $tContent.style.width = (_obj().allWidth - _sideWidth - 240 - 30) + "px"
    $tContent.style.left = "255px"
}

export function closeSideContent() {
    if (_obj().sideContent) {
        _obj().sideContent.style.left = "-1000px";
    }
}