import { browserHistory } from 'react-router'
import login from "!url!./img/login.png"

class Header extends React.Component {
    render() {
        return (
            <div className="i-header">
                <h3>长沙市实验中学教师评价系统<span>V3.0</span></h3>
                <p className="i-manage"><img src={login} onClick={this.login.bind(this)} /></p>
            </div>
        )
    }

    login() {
        browserHistory.push(Config.ROOTPATH + "login")
    }
}

export default TUI._connect({}, Header)

















