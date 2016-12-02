import Content from "Content"
import FormControls from "FormControls"
import Btn from "Btn"


class _Slide extends React.Component {
    render() {
        const {editInfo} = this.props
        let _options = [{ name: "是", id: "0" }, { name: "否", id: "1" }]
        return (
            <Content txt="标签">
                <div className="t-content-padding">
                    <FormControls label="Slide" ctrl="slide" options={_options} selected="0" value="slideInfo.val" />
                    <span style={{ marginLeft: "45px" }}>当前的选择内容:{editInfo.slideInfo ? editInfo.slideInfo.valName : ""}</span><br />
                    <span style={{ marginLeft: "45px" }}>当前的选择ID:{editInfo.slideInfo ? editInfo.slideInfo.val : ""}</span>
                </div>
            </Content>
        )
    }
}

export default TUI._connect({
    tips: "publicInfo.tips",
    editInfo: "formControlInfo.data"
}, _Slide)