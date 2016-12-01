import Content from "Content"
import FormControls from "FormControls"
import Btn from "Btn"

class _select extends React.Component {
    render() {
        let options = [{ "id": "1", "name": "选项一" }, { "id": "2", "name": "选项二" }, { "id": "3", "name": "选项三" }]
        return (
            <div>
                <Content txt="下拉选择框">
                    <div className="t-content-padding">
                        <FormControls label="选择列表" ctrl="select" options={options} value="3" />
                        <FormControls label="选择日期" ctrl="datepicker" value="3" />
                    </div>
                </Content>
            </div>
        )
    }

    componentDidMount() {
        this.props.addBreadNav([{ name: "Select" }])
    }

}

export default TUI._connect({
    preventSubmit: "publicInfo.msgInfo.txt"
}, _select)