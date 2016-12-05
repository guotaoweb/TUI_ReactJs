import '!style!css!postcss!sass!./style.scss'

import ScrollArea from 'react-scrollbar';

import Btn from "Btn"
import loading from "!url!./img/loading.png"

class Content3 extends React.Component {
  render() {
    const {tabs, side, hasVerticalScroll} = this.props
    let tabsArry = []
    if (this.props.tabs) {
      for (var index = 0; index < tabs.length; index++) {
        var $li = tabs[index];
        if (index == 0) {
          tabsArry.push(<li key='content2_editVteam_0' className="t-contetn2_tab--active">{$li.name}</li>)
        }
        else {
          tabsArry.push(<li key={"content2_editVteam_" + index}>{$li.name}</li>)
        }
      }
    }

    return (
      <div className="t-content3" ref="tContent3">
        <div className="t-content3_side" ref="tContent3Side">
          <ScrollArea
            className="area"
            contentClassName="content"
            speed={Config.SCROLL.speed}
            smoothScrolling={Config.SCROLL.smoothScrolling}
            minScrollSize={Config.SCROLL.minScrollSize}
            verticalScrollbarStyle={{ borderRadius: Config.SCROLL.scrollRadius }}
            verticalContainerStyle={{ borderRadius: Config.SCROLL.scrollRadius }}
            ref={(component) => { this.scrollAreaSideComponent = component } }
            >
            {this.props.children[0]}
          </ScrollArea>
        </div>
        <div className="t-content3_c">

          {this.props.children[1]}
          <div className="tblContent" ref="tblContent">
            <div className="t-content-loading">
              <div className="t_loading_img">
                <img src={loading} />
              </div>
            </div>
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
                {this.props.children[2]}
                {this.props.children[3]}
                {this.props.children[4]}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    let allHeight = document.documentElement.clientHeight
    let headerHeight = document.querySelector(".t-header") ? document.querySelector(".t-header").offsetHeight : 0
    let baseHeight = allHeight - headerHeight
    ReactDOM.findDOMNode(this.refs.tContent3).style.height = baseHeight + "px"
    ReactDOM.findDOMNode(this.refs.tContent3Side).style.height = baseHeight + "px"

    let tip = ReactDOM.findDOMNode(this.refs.tblContent).previousSibling.offsetHeight
    tip = tip > 0 ? tip + 30 : 20;

    ReactDOM.findDOMNode(this.refs.tblContent).style.height = (baseHeight - tip) + "px"

    this.scrollAreaSideComponent.wrapper.style.height = baseHeight + "px"
    this.scrollAreaSideComponent.content.style.height = baseHeight + "px"
    if (this.scrollAreaSideComponent) {
      this.scrollAreaSideComponent.scrollArea.refresh()
    }

    this.scrollAreaComponent.wrapper.style.height = (baseHeight - tip) + "px"
    if (this.scrollAreaComponent) {
      this.scrollAreaComponent.scrollArea.refresh()
    }
  }
};

export default TUI._connect({
  hasVerticalScroll: "publicInfo.hasVerticalScroll"
}, Content3)

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