import Content from "Content"
import FormControls from "FormControls"
import Btn from "Btn"

class _select extends React.Component {
    render() {
        let options = [{"id":"1","name":"选项一"},{"id":"2","name":"选项二"},{"id":"3","name":"选项三"}]
        return (
            <div>
                <Content txt="下拉选择框">
                    <FormControls label="选择框" ctrl="select" options={options} txt="3" onChange={this.test1.bind(this) } />
                </Content>
            </div>
        )
    }

    test1() {

    }

}

export default TUI._connect({
    preventSubmit: "publicInfo.msgInfo.txt"
}, _select)