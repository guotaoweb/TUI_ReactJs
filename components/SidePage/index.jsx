import '!style!css!postcss!sass!./style.scss'
import singleLeft from "!url!./img/singleLeft.png"
import Btn from "Btn"

class SidePage extends React.Component {
  render() {
    const {title, href, id} = this.props
    let _title = []
    if (title) {
      _title = <div className="t-content_t">
        <span><img src={singleLeft} onClick={this._closeSidePage.bind(this)} />{title}</span>
        {
          href ? <Btn style={{ float: "right" }} txt="保存" href={href} /> : ""
        }
      </div>
    }
    return (
      <div>

        <div id={this.props.id} className="t-sidepage" ref="sidePage">
          {_title}
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
    //文档高度
    let allHeight = document.documentElement.clientHeight
    //header高度
    let headerHeight = document.querySelector(".t-header") ? document.querySelector(".t-header").offsetHeight : 0
    //文档宽度
    let allWidth = document.documentElement.clientWidth
    //side的宽度
    let sideWidth = document.querySelector(".t-side") ? document.querySelector(".t-side").offsetWidth : 0
    //content3布局中的side宽度
    let contentSideWidth = document.querySelector(".t-content3_side") ? document.querySelector(".t-content3_side").offsetWidth : 0
    //主SidePage
    let $sidePage = document.querySelector(".t-sidepage")
    //辅SidePage
    let $sidePageMin = document.querySelector(".t-sidepage_min")
    if (sidePageInfo.id) {
      $sidePage = document.getElementById(sidePageInfo.id)
    }
    if (sidePageInfo.id) {
      $sidePageMin = document.getElementById(sidePageInfo.id + "_min")
    }
    //type:1 显示辅助SidePage
    //type:0 只显示主SidePage
    let sidePageWidth = sidePageInfo.width ? parseInt(sidePageInfo.width) : (allWidth - sideWidth - contentSideWidth)
    if ($sidePage) {
      $sidePage.style.width = sidePageWidth + "px"
      $sidePage.style.height = (allHeight - headerHeight) + "px"
      $sidePage.style.top = headerHeight + "px"
    }

    if (sidePageInfo.type == 1) {
      let sidePageWidth = allWidth - sideWidth - contentSideWidth
      sidePageWidth -= $sidePageMin.offsetWidth
      $sidePageMin.style.height = (allHeight - headerHeight) + "px"
      $sidePageMin.style.top = headerHeight + "px"
      $sidePage.style.width = sidePageWidth + "px"
    }

    //this.autoAdapter()
  }

  autoAdapter() {
    //side缩小时,让sidePage自适应
    //right等于0px的时候,表示sidepage已经打开了
    if ($sidePage.style.right == "0px") {
      if (sideStatus == 1) {
        let sidePageMinWidth = 200,
          sideWidth = 60,
          sidePageWidth = sidePageMinWidth + sideWidth
        if (sidePageInfo.type == 1) {
          $sidePageMin.style.left = sideWidth + "px"
        }
        else {
          $sidePage.style.width = (allWidth - sideWidth) + "px"
        }
      }
      else {
        let sidePageMinWidth = 200,
          sideWidth = 160,
          sidePageWidth = sidePageMinWidth + sideWidth
        if (sidePageInfo.type == 1) {
          $sidePageMin.style.left = sideWidth + "px"
          $sidePage.style.width = (allWidth - sidePageWidth) + "px"
        }
        else {
          $sidePage.style.width = sidePageInfo.width ? sidePageInfo.width : (allWidth - sideWidth) + "px"
        }
      }
    }
  }


  _closeSidePage() {
    const {id} = this.props
    if (id) {
      closeSidePage({
        id: id
      })
    }
    else {
      closeSidePage()
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
        let sideWidth = document.querySelector(".t-side") ? document.querySelector(".t-side").offsetWidth : 0
        //content3布局中的side宽度
        let contentSideWidth = document.querySelector(".t-content3_side") ? document.querySelector(".t-content3_side").offsetWidth : 0

        $sidepagemin.style["transition"] = "left 300ms ease"
        $sidepagemin.style.left = sideWidth + "px"

        // let sidePageWidth = allWidth - sideWidth - contentSideWidth
        // sidePageWidth -= $sidepagemin.offsetWidth
        // $sidepage.style.right = "-" + sidePageWidth + "px"
        $sidepage.style["transition"] = "right,width 1500ms ease"
        $sidepage.style.right = "0px"
      }
      else {
        $sidepage.style["transition"] = "right,width 300ms ease"
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
