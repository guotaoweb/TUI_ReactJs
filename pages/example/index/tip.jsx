import Content from "Content"
import FormControls from "FormControls"
import Btn from "Btn"


class _TipTool extends React.Component {
    render() {

        return (
            <div>
                <Content txt="标签">
                    <div className="t-content-padding">
                        <FormControls label="Tip" ctrl="tip" txt={this.props.tips} deleteFn={this.deleteFn.bind(this)} addFn={this.addFn.bind(this)} />
                    </div>
                </Content>
            </div>
        )
    }
    addFn() {
        this.props.pushTip([{ name: "test", id: "4" }, { name: "测试1", id: "5" }])
    }

    deleteFn(id) {
        this.props.deleteTip(id)
    }

    componentDidMount() {
        let _txt = [{ name: "test", id: "1" }, { name: "测试1", id: "2" }]
        this.props.pushTip(_txt)
    }
}

export default TUI._connect({
    tips: "publicInfo.tips"
}, _TipTool)