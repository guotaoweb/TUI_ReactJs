import Content2 from "Content2"
import { openDialog } from "Dialog"
import FormControls from "FormControls"
import Btn from "Btn"
import Layout1 from "./layout1"
import SidePage, { openSidePage } from "SidePage"
import {closeLoading} from "Loading"

class Layout2 extends React.Component {
    render() {
        setTimeout(function(){
            closeLoading()
        },1000)
        let tabs = [{ name: "选项一", id: "tabs1" }, { name: "选项二", id: "tabs2" }, { name: "选项三", id: "tabs3" }
        , { name: "选项三", id: "tabs4" }, { name: "选项三", id: "tabs5" }, { name: "选项三", id: "tabs6" }
        , { name: "选项三", id: "tabs7" }, { name: "选项三", id: "tabs8" }, { name: "选项三", id: "tabs9" }
        , { name: "选项三", id: "tabs10" }, { name: "选项三", id: "tabs11" }, { name: "选项三", id: "tabs12" }
        , { name: "选项三", id: "tabs13" }, { name: "选项三", id: "tabs14" }, { name: "选项三", id: "tabs15" }]
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
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                    <div>000000</div><div>111111</div><div>2222222</div>
                </Content2>

            </div>
        )
    }
}

export default TUI._connect({}, Layout2)