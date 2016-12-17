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
                <FormControls ctrl="input" placeholder="请输入用户密码" style={_inputStyle} value="loginInfo.Password" />
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
            </div>
        )
    }

    _login() {
        const {editInfo, errorMsg, updateLoginStatus, loginStatus} = this.props
        let _this = this
        if (loginStatus == 1) { return false }
        if (editInfo.loginInfo) {
            let jsonParam = {
                UserName: editInfo.loginInfo.UserName,
                Password: editInfo.loginInfo.Password
            }

            console.info(jsonParam)
            //browserHistory.push(Config.ROOTPATH + "manage")
            updateLoginStatus(1)
            setTimeout(function () {
                updateLoginStatus(0)
            }, 3000)
        }
        _this.loginError()
    }

    loginError() {
        let $error = document.getElementsByClassName("t-l-error")[0]
        $error.style.display = "block"
    }

    componentDidMount() {
        let _this = this
        // let $inputs = document.getElementsByClassName("t-login")[0].getElementsByTagName("input")
        // for (var i = 0; i < $inputs.length; i++) {
        //     var $input = $inputs[i];
        document.addEventListener("keypress", function (e) {
            let $error = document.getElementsByClassName("t-l-error")[0]
            $error.style.display = "none"
            console.info(e.keyCode)
            if (e.keyCode == 13) {
                _this._login()
            }
        })
        //}
    }
}

export default TUI._connect({
    editInfo: "formControlInfo.data",
    loginStatus: "publicInfo.loginStatus"
}, login)