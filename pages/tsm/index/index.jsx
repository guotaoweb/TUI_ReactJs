import '!style!css!postcss!sass!./style.scss'

import FormControls from "FormControls"
import Dialog from "Dialog"
import Loading from "Loading"
import Btn from "Btn"
import logo from "!url!./img/logo.png"
import votestart from "!url!./img/votestart.png"
import login from "!url!./img/login.png"

class Index extends React.Component {
    render() {
        const {classes} = this.props

        let _classes = [],
        _voteStartBtn = []
        console.info(classes)
        if (classes.length == 0) {
            _classes.push(<div className="i-voting">正在获取准备投票的班级...</div>)
        }
        else if(classes=="no"){
            _classes.push(<div className="i-voting">目前无班级投票</div>)
        }
        else {
            _classes.push(<div className="i-voting">正准备投票的班级:C0601</div>)
            _voteStartBtn.push(
                <div className="i-startbtn">
                    <img src={votestart} onClick={this.voteStart.bind(this)} />
                </div>
            )
        }

        return (
            <div className="i-body">
                <div className="i-header">
                    <h3>长沙市实验中学教师评价系统<span>V3.0</span></h3>
                    <p className="i-manage"><img src={login} onClick={this.login.bind(this)} /></p>
                </div>
                {_classes}
                <div className="i-votedesp"></div>
                {_voteStartBtn}
            </div>
        )
    }

    login() {

    }

    voteStart() {
        console.info("开始投票")
    }

    componentDidMount() {
        const {addVotingClasses, errorMsg} = this.props

        let classesId = TUI.fn.requestParam("id")
        TUI.platform.get("/VotingClassesSimple", function (result) {
            if (result.code == 0) {
                let _d = result.datas[0]
                addVotingClasses(_d)
            }
            if (result.code == 1) {
                addVotingClasses("no")
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }
}

export default TUI._connect({
    classes: "voting.classes"
}, Index)
