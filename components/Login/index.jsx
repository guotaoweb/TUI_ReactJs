import '!style!css!postcss!sass!./style.scss'
import Btn from "Btn"
import FormControls from "FormControls"
import { browserHistory } from 'react-router'

class login extends React.Component {
    render() {
        const {title, width, height, loginStatus} = this.props
        let _inputStyle = {
            width: "100%",
            height: "40px"
        },
            _loginStyle = {
                width: width ? width + "px" : "",
                height: height ? heihgt + "px" : ""
            }

        let _btnTxt = "登陆"
        if (loginStatus == 1) {
            _btnTxt = "登陆中..."
        }

        return (
            <div className="t-login" style={_loginStyle}>
                <h3>{title}</h3>
                <br />
                <FormControls ctrl="input" placeholder="请输入用户账号" style={_inputStyle} value="loginInfo.UserName" />
                <FormControls ctrl="input" placeholder="请输入用户密码" type="password" style={_inputStyle} value="loginInfo.Password" />
                <br />
                <Btn txt={_btnTxt} href={this._login.bind(this)} style={{
                    display: "block",
                    fontSize: "20px",
                    textAlign: "center",
                    marginBottom: "15px",
                    width: "100%",
                    marginTop: "-20px"
                }} />
                <p className="t-l-error">*用户账号或密码错误</p>
                <p className="t-l-error">*账号已经被锁定</p>
            </div>
        )
    }

    _login() {
        const {editInfo, errorMsg, updateLoginStatus, loginStatus, url, to,updateUserInfo} = this.props
        let _this = this,
            clearStatus = TUI.fn.requestParam("cs")=="true"?1:0
        if (loginStatus == 1) { return false }
        if (editInfo.loginInfo) {
            let jsonParam = { 
                UserName: editInfo.loginInfo.UserName,
                Password: editInfo.loginInfo.Password,
                Action:clearStatus
            }
            updateLoginStatus(1)
            TUI.platform.post(url, jsonParam, function (result) {
                if (result.code == 0) {
                    if (clearStatus == 1) {
                        if(window.localStorage){
                            localStorage.clear()
                            document.cookie=""
                        }
                        browserHistory.push(Config.ROOTPATH)
                    }
                    else {
                        updateUserInfo({ id: result.datas[0]})
                        browserHistory.push(Config.ROOTPATH + to)
                    }
                }
                else {
                    _this.loginError(result.code)
                }
                updateLoginStatus(0)
            })
        }

    }

    loginError(code) {
        if (code == 984) {
            let $error = document.getElementsByClassName("t-l-error")[1]
            $error.style.display = "block"
        }
        else {
            let $error = document.getElementsByClassName("t-l-error")[0]
            $error.style.display = "block"
        }
    }

    componentDidMount() {
        let _this = this
        document.addEventListener("keypress", function (e) {
            let $error1 = document.getElementsByClassName("t-l-error")[0]
            let $error2 = document.getElementsByClassName("t-l-error")[1]
            $error1.style.display = "none"
            $error2.style.display = "none"
            if (e.keyCode == 13) {
                _this._login()
            }
        })
    }
}

export default TUI._connect({
    editInfo: "formControlInfo.data",
    loginStatus: "publicInfo.loginStatus"
}, login)