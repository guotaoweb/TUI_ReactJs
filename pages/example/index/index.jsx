import '!style!css!postcss!sass!./style.scss'
//import ReactCSSTransitionGroup  from 'react-addons-css-transition-group' //引用动画
import Side from "./side"
import SideContent from "SideContent"
import Container from "./container"
import TipTool from "TipTool"
import Dialog from "Dialog"
import ModalDialog from "ModalDialog"
import Loading from "Loading"
import FormControls from "FormControls"
import Btn from "Btn"

class Index extends React.Component {
  render() {
    const {children, sideContentTest} = this.props

    let _sideContentTest = []

    for (var i = 0; i < sideContentTest.length; i++) {
      _sideContentTest.push(<FormControls key={"sideContentTest" + i} ctrl="input" style={{ margin: "10px" }} />)
    }

    return (
      <div className="t-page">
        <Side />
        <SideContent>
          <div>
            <Btn txt="添加" href={this.addTest.bind(this)} style={{margin:"10px"}} />
            {_sideContentTest}
          </div>
        </SideContent>
        <Container>
          {children}
        </Container>
        <TipTool />
        <Dialog />
        <ModalDialog />
        <Loading />
      </div>
    )
  }

  addTest() {
    this.props.addSideContent({ "name": "1" })
  }

  componentDidMount() {

  }
}

export default TUI._connect({
  pageStatus: "manages.pageStatus",
  sideContentTest: "sideContentTest.test"
}, Index)


// 动画
// {this.props.children}
// <ReactCSSTransitionGroup component="div"  transitionName={pageStatus}  transitionEnterTimeout={config.ANIMATE_TIME}  transitionLeaveTimeout={config.ANIMATE_TIME}>
//   {React.cloneElement(this.props.children, {
//     key: this.props.location.pathname
//   }) }
// </ReactCSSTransitionGroup>