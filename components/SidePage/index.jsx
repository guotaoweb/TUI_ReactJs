import '!style!css!postcss!sass!./style.scss'

class SidePage extends React.Component {
  render() {
    return (
      <div>
        <div id={this.props.id} className="t-sidepage" ref="sidePage">
          {this.props.children.length ? this.props.children[1] : this.props.children}
        </div>
        <div id={this.props.id + "_min"} className="t-sidepage_min" ref="sidePageMin">
          {this.props.children.length > 1 ? this.props.children[0] : ""}
        </div>
      </div>
    )
  }
  componentDidUpdate() {
    const {sidePageInfo, sideStatus} = this.props
    let allHeight = document.documentElement.clientHeight
    let headerHeight = document.querySelector(".t-header") ? document.querySelector(".t-header").offsetHeight : 0

    let allWidth = document.documentElement.clientWidth
    let sideWidth = document.querySelector(".t-side") ? document.querySelector(".t-side").offsetWidth : 0
    let contentSideWidth = document.querySelector(".t-content3_side") ? document.querySelector(".t-content3_side").offsetWidth : 0

    //let $sidePage = ReactDOM.findDOMNode(this.refs.sidePage)
    let $sidePage = document.querySelector(".t-sidepage")
    if (sidePageInfo.id) {
      $sidePage = document.getElementById(sidePageInfo.id)
    }
    //let $sidePageMin = ReactDOM.findDOMNode(this.refs.sidePageMin)
    let $sidePageMin = document.querySelector(".t-sidepage_min")
    if (sidePageInfo.id) {
      $sidePageMin = document.getElementById(sidePageInfo.id + "_min")
    }
    let sidePageWidth = sidePageInfo.width ? parseInt(sidePageInfo.width) : (allWidth - sideWidth - contentSideWidth)

    if (sidePageInfo.type == 1) {
      sidePageWidth -= $sidePageMin.offsetWidth
    }

    if ($sidePage) {
      $sidePage.style.width = sidePageWidth + "px"

      $sidePage.style.height = (allHeight - headerHeight) + "px"
      $sidePage.style.top = headerHeight + "px"
    }
    if (sidePageInfo.type == 1) {
      $sidePageMin.style.height = (allHeight - headerHeight) + "px"
      $sidePageMin.style.top = headerHeight + "px"
    }

    //side缩小时,让sidePage自适应
    //right等于0px的时候,表示sidepage已经打开了

    if ($sidePage.style.right == "0px") {
      if (sideStatus == 1) {
        let sidePageMinWidth = 200,
        sideWidth = 60,
        sidePageWidth = sidePageMinWidth+sideWidth
        if (sidePageInfo.type == 1) {
          $sidePageMin.style.left = sideWidth + "px"
        }
        else{
          $sidePage.style.width = (allWidth - sideWidth) + "px"
        }
      }
      else {
        let sidePageMinWidth = 200,
        sideWidth = 160,
        sidePageWidth = sidePageMinWidth+sideWidth
        if (sidePageInfo.type == 1) {
          $sidePageMin.style.left = sideWidth + "px"
          $sidePage.style.width = (allWidth - sidePageWidth) + "px"
        }
        else{
          $sidePage.style.width = sidePageInfo.width?sidePageInfo.width: (allWidth - sideWidth) + "px"
        }
      }
    }
  }
}

export default TUI._connect({
  sidePageInfo: "publicInfo.sidePageInfo",
  sideStatus: "publicInfo.sideStatus"
}, SidePage)

export function openSidePage(_this, params) {
  _this.props.updateSidePageInfo({
    status: params.status,
    width: params.width,
    gateWay: params.gateWay,
    type: params.type,
    id: params.id
  })

  let sidepage = document.querySelector(".t-sidepage")
  if (params.id) {
    sidepage = document.getElementById(params.id)
  }
  sidepage.style["transition"] = "right,width 200ms ease"
  sidepage.style.right = "0px"

  if (params.type == 1) {
    let sidepagemin = document.querySelector(".t-sidepage_min")
    if (params.id) {
      sidepagemin = document.getElementById(params.id + "_min")
    }
    let sideWidth = document.querySelector(".t-side") ? document.querySelector(".t-side").offsetWidth : 0
    sidepagemin.style["transition"] = "left 200ms ease"
    sidepagemin.style.left = sideWidth + "px"
  }
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
