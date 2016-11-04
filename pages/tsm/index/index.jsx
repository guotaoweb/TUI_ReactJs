import '!style!css!postcss!sass!./style.scss'

import Side from "./side"
import Container from "./container"
import TipTool from "TipTool"
import Dialog from "Dialog"
import ModalDialog from "ModalDialog"

class Index extends React.Component {
  render() {
    const {children} = this.props

    return (
      <div className="t-page">
        <Side/>
        <Container>
          {children}
        </Container>
        <TipTool/> 
        <Dialog/>
        <ModalDialog/>
      </div>
    )
  }
}

export default TUI._connect({}, Index)
