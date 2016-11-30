import Content2 from "Content2"
import { openDialog } from "Dialog"
import FormControls from "FormControls"
import Btn from "Btn"
import Layout1 from "./layout1"
import SidePage, { openSidePage } from "SidePage"

class Layout2 extends React.Component {
    render() {
        let tabs = [{ name: "选项一", id: "tabs1" }, { name: "选项二", id: "tabs2" }, { name: "选项三", id: "tabs3" }]
        return (
            <div>
                <Content2 tabs={tabs}>
                    <div>
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                        <FormControls label="字段" ctrl="input" />
                    </div>
                    <div>
                        选项卡二的内容
                    </div>
                    <div>选项卡三的内容</div>
                </Content2>

            </div>
        )
    }
}

export default TUI._connect({}, Layout2)