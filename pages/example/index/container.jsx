//组件
import Header from "Header"
class Container extends React.Component {
  render() {
    const {sideStatus} = this.props
    let list = [{ 
        name:"帮助说明",
        fn:function(){
            openModalDialog()
        }
    },{
        name:"关于我们",
        fn:function(){
            openDialog(_this, config.VERSION)
        }
    }]
    return (
      <div className={"t-container " + (sideStatus == "0" ? "t-container--close" : "") } ref="tContainter">
        <Header list={list}/>
        {this.props.children}
      </div>
    )
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.tContainter).style.height = document.documentElement.clientHeight + "px";
  }
}


export default TUI._connect({
    sideStatus: "publicInfo.sideStatus"
  }, Container)
