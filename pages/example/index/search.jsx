import Content from "Content"
import FormControls from "FormControls"
import Btn from "Btn"
import Search from "Search"
import { openSideContent } from "SideContent"

class _Search extends React.Component {
    render() {
        return (
            <Content txt="搜索框">
                <div className="t-content-padding">
                    <Search fn={this._Search.bind(this)} />
                    <div>当前输入的内容为:<span ref="inputContent"></span></div>
                </div>
            </Content>
        )
    }

    _Search(val) {
        this.refs.inputContent.innerHTML = val
    }
}

export default TUI._connect({
    tips: "publicInfo.tips"
}, _Search)