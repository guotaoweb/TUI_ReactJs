import '!style!css!postcss!sass!./style.scss'

import Side from "./side"
import Container from "./container"
import TipTool from "TipTool"
import Dialog from "Dialog"
import ModalDialog from "ModalDialog"
import Loading from "Loading"
import building from "!url!../../../components/ModalDialog/img/building.png"

class Index extends React.Component {
  render() {
    const {children} = this.props
    let allWidth = document.documentElement.clientWidth-120
    let allHeight = document.documentElement.clientHeight-300
    return (
      <div className="t-page">
        <Side />
        <Container>
          {children}
        </Container>
        <TipTool />
        <Dialog />
        <ModalDialog id="help">
          <div className="t-modalDialog_building" style={{ width: allWidth + "px", height: allHeight + "px" }}>
            <img src={building} />
            <p>==建设中==</p>
          </div>
        </ModalDialog>
        <ModalDialog id="quickKey" title="系统快捷键">
          <div style={{ width: "500px", padding: "10px" }}>
            <table className="qkeytbl" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <td>按键</td>
                  <td>功能说明</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SHIFT+D</td>
                  <td>首页</td>
                </tr>
                <tr>
                  <td>SHIFT+F</td>
                  <td>班级列表</td>
                </tr>
                <tr>
                  <td>SHIFT+E</td>
                  <td>投票列表</td>
                </tr>
                <tr>
                  <td>SHIFT+P</td>
                  <td>在线打印</td>
                </tr>
                <tr>
                  <td>SHIFT+H</td>
                  <td>帮助说明</td>
                </tr>
                <tr>
                  <td>SHIFT+V</td>
                  <td>关于我们</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ModalDialog>
        <Loading />
      </div>
    )
  }
}

export default TUI._connect({}, Index)

// {this.props.children}
// <ReactCSSTransitionGroup component="div"  transitionName={pageStatus}  transitionEnterTimeout={config.ANIMATE_TIME}  transitionLeaveTimeout={config.ANIMATE_TIME}>
//   {React.cloneElement(this.props.children, {
//     key: this.props.location.pathname
//   }) }
// </ReactCSSTransitionGroup>