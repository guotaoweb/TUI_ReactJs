import '!style!css!postcss!sass!./style.scss'

import Side from "./side"
import Container from "./container"
import TipTool from "TipTool"
import Dialog from "Dialog"
import ModalDialog from "ModalDialog"
import Loading from "Loading"
import SideContent from "SideContent"

class Index extends React.Component {
  render() {
    const {children} = this.props

    return (
      <div className="t-page">
        <Side/>
        <SideContent />
        <Container>
          {children}
        </Container>
        <TipTool/> 
        <Dialog/>
        <ModalDialog/>
        <Loading/>
      </div>
    )
  }
}

export default TUI._connect({
  pageStatus: "manages.pageStatus"
}, Index)

// {this.props.children}
// <ReactCSSTransitionGroup component="div"  transitionName={pageStatus}  transitionEnterTimeout={config.ANIMATE_TIME}  transitionLeaveTimeout={config.ANIMATE_TIME}>
//   {React.cloneElement(this.props.children, {
//     key: this.props.location.pathname
//   }) }
// </ReactCSSTransitionGroup>