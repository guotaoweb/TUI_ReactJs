import Content from "Content"
import FormControls from "FormControls"
import Btn from "Btn"


class _Slide extends React.Component {
    render() {
        const {editInfo} = this.props
        let _options = [{name:"是",id:"0"},{name:"否",id:"1"}]
        return (
            <div>
                <Content txt="标签">
                    <FormControls label="Slide" ctrl="slide" options={_options} value="slideInfo.val" />
                    <span style={{marginLeft:"45px"}}>当前的选择是:{editInfo.slideInfo?editInfo.slideInfo.val:""}</span>
                </Content>
            </div>
        )
    }
}

export default TUI._connect({
    tips:"publicInfo.tips",
    editInfo:"formControlInfo.data"
}, _Slide)