import Content2 from "Content2"
import Btn from "Btn"

class Layout1 extends React.Component {
    render() {
        let tabs = [{ name: "带图标", id: "tabs1" }, { name: "无图标", id: "tabs2" }]
        return (
            <div>
                <Content2 tabs={tabs}>
                    <div>
                        <Btn type="add" style={{ padding: "10px" }} txt="新增" /><br/>
                        <Btn type="edit" style={{ padding: "10px" }} txt="编辑" /><br/>
                        <Btn type="cancel" style={{ padding: "10px" }} txt="取消" /><br/>
                        <Btn type="back" style={{ padding: "10px" }} txt="返回" /><br/>
                        <Btn type="submit" style={{ padding: "10px" }} txt="保存" /><br/>
                    </div>
                    <div>
                        <Btn style={{ padding: "10px" }} txt="保存" /><br/>
                        <Btn style={{ padding: "10px" }} width="100" txt="保存" />
                    </div>
                </Content2>
            </div>
        )
    }
}

export default TUI._connect({}, Layout1)