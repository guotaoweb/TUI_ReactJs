import '!style!css!postcss!sass!./style.scss'
import { browserHistory } from 'react-router'
import FormControls from "FormControls"
import Dialog, { openDialog } from "Dialog"
import Loading from "Loading"
import Btn from "Btn"
// import logo from "!url!./img/logo.png"
import votestart from "!url!./img/votestart.png"

import Header from "./Header"

class Index extends React.Component {
    render() {
        const {classes} = this.props

        let _classes = [],
            _voteStartBtn = []

        if (classes.length == 0) {
            _classes.push(<div key="i-voting" className="i-voting">正在获取准备投票的班级...</div>)
        }
        else if (classes == "no") {
            _classes.push(<div key="i-no-voting" className="i-voting">目前无班级投票</div>)
        }
        else {
            _classes.push(<div key="i-voting-ing" className="i-voting">正准备投票的班级:{classes.Name}</div>)
            _voteStartBtn.push(
                <div className="i-startbtn" key="i-voting-btn">
                    <img src={votestart} onClick={this.voteStart.bind(this)} />
                </div>
            )
        }

        return (
            <div className="i-body">
                <Header />
                {_classes}
                <div className="i-votedesp"></div>
                {_voteStartBtn}
                <p className="getip" onClick={this.getIp.bind(this)}>IP</p>
                <p className="getip" onClick={this.clearStatus.bind(this)} style={{bottom:"28px"}}>清</p>
                <Dialog/>
            </div>

        )
    }

    getIp() {
        let _this = this
        TUI.platform.get("/MyIp", function (result) {
            if (result.code == 0) {
                let _d = result.datas
                openDialog(_this,"当前IP地址:"+_d)
            }
        })
    }

    clearStatus(){
        browserHistory.push(Config.ROOTPATH + "login?cs=true")
    }

    login() {
        browserHistory.push(Config.ROOTPATH + "login")
    }

    voteStart() {
        const {classes} = this.props
        if (window.localStorage) {
            if (localStorage["voting"] != classes.Name) {
                localStorage["voting"] = classes.Name
                browserHistory.push(Config.ROOTPATH + "vote")
            }
            else {
                alert("投票异常,请联系管理员!")
            }
        }
        else {
            let _cookie = document.cookie ? document.cookie.substring(7) : document.cookie

            if (_cookie != classes.Name) {
                document.cookie = "voting=" + classes.Name;
                browserHistory.push(Config.ROOTPATH + "vote")
            }
            else {
                alert("投票异常,请联系管理员!")
            }
        }
    }

    componentDidMount() {
        const {addVotingClasses, errorMsg, addVotingStatus} = this.props

        let classesId = TUI.fn.requestParam("id")
        TUI.platform.get("/VotingClassesSimple", function (result) {
            if (result.code == 0) {
                let _d = result.datas[0]
                addVotingClasses(_d)
                addVotingStatus({
                    ClassesId: _d.Id,
                    VoteId: _d.VoteId,
                    GradeId: _d.GradeId
                })
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
