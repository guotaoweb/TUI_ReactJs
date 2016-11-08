import Content from "Content"
import Btn from "Btn"
import SidePage, { openSidePage, closeSidePage } from "SidePage"

class _SidePage extends React.Component {
    render() {
        return (
            <div>
                <Content txt="SidePage">
                    <Btn type="add" txt="展开sidePage【全屏】" href={this._openSidePage1.bind(this)} style={{ padding: "10px" }} />
                    <Btn type="add" txt="展开sidePage【自定义展开距离】" href={this._openSidePage4.bind(this)} style={{ padding: "10px" }} />
                    <Btn type="add" txt="展开sidePage【多内容】" href={this._openSidePage2.bind(this)} style={{ padding: "10px" }} />
                    <Btn type="add" txt="展开sidePage【多任务】" href={this._openSidePage3.bind(this)} style={{ padding: "10px" }} />
                </Content>
                <SidePage id="SidePageOne">
                    <div style={{ color: "white" }}>
                        <Btn txt="返回" width="70" style={{ padding: "10px", margin: "5px" }} href={closeSidePage} />
                        这是SidePage1的侧边内容
                    </div>
                    <div>
                        <Btn txt="返回" width="70" style={{ padding: "10px", margin: "5px" }} href={closeSidePage} />
                        这是SidePage1的内容
                    </div>
                </SidePage>
                <SidePage id="SidePageTwo">
                    <div style={{ color: "white" }}>
                        <Btn txt="返回" width="70" style={{ padding: "10px", margin: "5px" }} href={this.closeSidePage1.bind(this)} />
                        这是SidePage2的侧边内容
                    </div>
                    <div>
                        <Btn txt="返回" width="70" style={{ padding: "10px", margin: "5px" }} href={this.closeSidePage1.bind(this)} />
                        这是SidePage2的内容
                    </div>
                </SidePage>
            </div>
        )
    }

    _openSidePage1() {
        openSidePage(this, {
            status: "addTeam"
        })
    }
    _openSidePage4() {
        openSidePage(this, {
            status: "addTeam",
            width: "500"
        })
    }
    _openSidePage2() {
        openSidePage(this, {
            status: "addTeam",
            type: 1
        })
    }
    _openSidePage3() {
        openSidePage(this, {
            status: "addTeam",
            type: 1,
            id: "SidePageTwo"
        })
    }

    closeSidePage1() {
        closeSidePage({
            id: "SidePageTwo"
        })
    }
}

export default TUI._connect({

}, _SidePage)