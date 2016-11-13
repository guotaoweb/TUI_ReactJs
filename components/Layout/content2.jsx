import '!style!css!postcss!sass!./style.scss'
import loading from "!url!./img/loading.png"

class Content2 extends React.Component {
  render() {
    const {tabs} = this.props
    let tabsArry = []


    if (this.props.tabs) {
      for (var index = 0; index < tabs.length; index++) {
        var $li = tabs[index]
        if (index == 0) {
          tabsArry.push(<li key='content2_editVteam_0' className="t-content2_tab t-contetn2_tab--active" data-bind={$li.id}>{$li.name}</li>)
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
        setTimeout(function () { bindEvent() }, 500)

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
          <div>
            <div className="t-content-loading">
              <div className="t_loading_img">
                <img src={loading} />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    let _this = this
    let didMount = function () {
      let allHeight = document.documentElement.clientHeight
      let headerHeight = document.querySelector(".t-header").offsetHeight
      ReactDOM.findDOMNode(_this.refs.tContent2).style.height = (allHeight - headerHeight) + "px"

      let bodyScrollHeight = document.documentElement.scrollHeight

      if (document.querySelector(".t-sidepage")) {
        let sidePageScrollHeight = document.querySelector(".t-sidepage").scrollHeight
        let scrollHeight = bodyScrollHeight < sidePageScrollHeight ? sidePageScrollHeight : bodyScrollHeight
        ReactDOM.findDOMNode(_this.refs.tContent2Sub).style.height = (scrollHeight - headerHeight - 30) + "px"
      }
      else {
        ReactDOM.findDOMNode(_this.refs.tContent2Sub).style.height = (bodyScrollHeight - headerHeight - 60) + "px"
      }
    }
    setTimeout(didMount, 0)
  }
};

export default Content2

export function bindEvent() {
  //为tabs绑定事件
  let contentTabs = document.getElementsByClassName("t-content2_tab")
  for (var i = 0; i < contentTabs.length; i++) {
    var $t = contentTabs[i]
    $t.addEventListener("click", function () {
      let _this = this
      let tabId = this.getAttribute("data-bind")
      let nodes = TUI.fn.siblingsElem(tabId)
      document.querySelector(".t-contetn2_tab--active").className = "t-content2_tab"
      _this.className = _this.className + " " + "t-contetn2_tab--active"
      for (var index = 0; index < nodes.length; index++) {
        var $n = nodes[index];
        $n.style.display = "none"
      }

      document.querySelector("." + tabId).style.display = "block"
    })
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