import '!style!css!postcss!sass!./style.scss'
//import ReactCSSTransitionGroup  from 'react-addons-css-transition-group' //引用动画
import Side from "./side"
import Container from "./container"
import TipTool from "TipTool"
import Dialog from "Dialog"
import ModalDialog from "ModalDialog"
import Loading from "Loading"  

class Index extends React.Component {
  render() {
    const {children} = this.props

    return (
      <div className="t-page">
        <Side />
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
}

export default TUI._connect({
  pageStatus: "manages.pageStatus"
}, Index)


// 动画
// {this.props.children}
// <ReactCSSTransitionGroup component="div"  transitionName={pageStatus}  transitionEnterTimeout={config.ANIMATE_TIME}  transitionLeaveTimeout={config.ANIMATE_TIME}>
//   {React.cloneElement(this.props.children, {
//     key: this.props.location.pathname
//   }) }
// </ReactCSSTransitionGroup>