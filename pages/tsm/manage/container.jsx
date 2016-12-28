
//组件
import Header from "./header"
import { browserHistory, Link } from 'react-router'

class Container extends React.Component {
  render() {
    const {sideStatus} = this.props
    return (
      <div className={"t-container " + (sideStatus == "0" ? "t-container--close" : "")} ref="tContainter">
        <Header />
        {this.props.children}
      </div>
    )
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.tContainter).style.height = document.documentElement.clientHeight + "px";

    
  }

  gorouter() {
    browserHistory.push(Config.ROOTPATH + "teachers")
  }
}


export default TUI._connect({
  sideStatus: "publicInfo.sideStatus"
}, Container)

