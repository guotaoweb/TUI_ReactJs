import '!style!css!postcss!sass!./style.scss'
import Btn from "Btn"
import FormControls from "FormControls"
import { browserHistory } from 'react-router'

class login extends React.Component {
    render() {
        const {title,width,height} = this.props
        let _inputStyle = {
            width: "100%",
            height: "40px"
        },
            _loginStyle = {
                width: width?width+"px":"400px",
                height: height?heihgt+"px":"500px"
            }

        return (
            <div className="t-login" style={_loginStyle}>
                <h3>{title}</h3>
                <br />
                <FormControls ctrl="input" placeholder="请输入用户账号" style={_inputStyle} />
                <FormControls ctrl="input" placeholder="请输入用户密码" style={_inputStyle} />
                <br />
                <Btn txt="登陆" width="185" href={this._login.bind(this)} style={{
                    display:"block",
                    fontSize:"20px",
                    textAlign:"center"
                }} />
            </div>
        )
    }

    _login() {
        browserHistory.push(Config.ROOTPATH + "manage")
    }
}

export default TUI._connect({}, login)