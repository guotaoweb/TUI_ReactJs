import '!style!css!postcss!sass!./style.scss'

import FormControls from "FormControls"
import Dialog from "Dialog"
import Loading from "Loading"
import Btn from "Btn"
import logo from "!url!./img/logo.png"
import voteend from "!url!./img/close.png"
import login from "!url!./img/login.png"


class Index extends React.Component {
  render() {
    const {related} = this.props

    return (
      <div className="i-body">
        <div className="i-header">
          <h3>长沙市实验中学教师评价系统<span>V3.0</span></h3>
          <p className="i-manage"><img src={login} onClick={this.login.bind(this)}/></p>
        </div>
        <div className="i-voting">投票结束的班级:C0601</div>
        <div className="i-voteend"></div>
        <div className="i-startbtn">
            <img src={voteend} onClick={this.voteEnd.bind(this)}/>
        </div>
      </div>
    )
  }

  login(){

  }

  voteEnd(){
      console.info("投票结束")
  }

  componentDidMount() {
    const {addClassesRelated,errorMsg} = this.props

    let classesId = TUI.fn.requestParam("id")
    TUI.platform.get("/ClassesRelated/" +classesId , function (result) {
      if (result.code == 0) {
        let _d = result.datas
        addClassesRelated(_d)
      }
      if (result.code == 1) {
        addClassesRelated([])
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
    })
  }
}

export default TUI._connect({

}, Index)
