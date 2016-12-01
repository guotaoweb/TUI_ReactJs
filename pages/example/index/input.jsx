import Content from "Content"
import FormControls from "FormControls"
import Btn from "Btn"
import Remark from "Remark"
import SidePage, { openSidePage,closeSidePage } from "SidePage"

class Layout1 extends React.Component {
    render() {
        return (
            <div>
                <Content txt="Input输入框">
                    <div style={{ padding: "10px" }}>
                        <FormControls label="只读(1)" labelWidth="100" ctrl="input" disabled="disabled" value="InputInfo.name" />
                        <FormControls label="必填(2)" labelWidth="100" ctrl="input" required="required" value="InputInfo.age0" />
                        <FormControls label="多行输入(3)" labelWidth="100" ctrl="textarea" required="required" value="InputInfo.comment" />
                        <FormControls label="非必填(4)" labelWidth="100" ctrl="input" value="InputInfo1.age" />
                        <FormControls label="数字" labelWidth="100" ctrl="input" type="number" value="InputInfo1.age1" />
                        <FormControls label="选择" labelWidth="100" bind={{courseId:"这是CourseId",TeacherId:"这是教师Id"}} ctrl="input" type="select" value="InputInfo1.age2"
                            selectFn={this._selectFn.bind(this)} />
                        <div className="formControl-btn" style={{ marginLeft: "110px" }}>
                            <Btn type="add" txt="清除数据" href={this.clearData.bind(this)} />
                            <Btn type="add" txt="填充数据" href={this.addData.bind(this)} />
                            <Btn type="add" txt="保存" href={this.submit.bind(this)} />
                        </div>

                        <Remark style={{ marginTop: "60px", clear: "both" }}>
                            FormControls自动实现onChange方法,编辑时所生成的实体是根据value的格式。如:InputInfo.name,则会生成
                        InputInfo:大括号的格式。测试起见,1,2,3,是一个编辑实体,4是一个编辑实体。
                    </Remark>
                    </div>
                </Content>
                <SidePage>
                    <div>
                        <div style={{ width: "100%", height: "40px", lineHeight: "40px", paddingLeft: "10px" }}>
                            <FormControls ctrl="radio" txt="选项一" groupName="a" value="a1" />
                     </div>
                        <div style={{ width: "100%", height: "40px", lineHeight: "40px", paddingLeft: "10px" }}>
                            <FormControls ctrl="radio" txt="选项二" groupName="a" value="a2" />
                        </div>
                        <div style={{ width: "100%", height: "40px", lineHeight: "40px", paddingLeft: "10px" }}>
                            <FormControls ctrl="radio" txt="选项三" groupName="a" value="a3" />
                        </div>
                        <Btn type="add" txt="保存" href={this.selectSave.bind(this)} />
                    </div>
                </SidePage>
            </div>
        )
    }

    _selectFn(bind) {
        openSidePage(this, {
            status: "a",
            width: "400",
            gateWay:{
                Id:bind.id
            }
        })
        console.info(bind)
    }

    selectSave(){
        const {sidePageInfo,updateEditInfo} = this.props
        let $radio = document.getElementsByClassName("t-c_radio")
        let teacherId = []
        for (var i = 0;  i< $radio.length; i++) {
            var $r = $radio[i];
            if($r.getAttribute("data-status")=="selected"){
                let _info = {
                    infoName:"InputInfo1"
                }
                _info[sidePageInfo.gateWay.Id] = $r.getAttribute("data-value")
                _info["age2"] = $r.innerText
                updateEditInfo(_info)
            }
        }
        closeSidePage()
        console.info(this.props.editInfo)
    }

    clearData() {
        this.props.clearEditInfo({
            infoName: "InputInfo"
        })
    }

    addData() {
        this.props.updateEditInfo({
            infoName: "InputInfo",
            name: "guotao",
            age: "18",
            comment: "测试数据"
        })
    }

    submit() {

        console.info(this.props.editInfo)
    }
}

export default TUI._connect({
    preventSubmit: "publicInfo.msgInfo.txt",
    editInfo: "formControlInfo.data",
    sidePageInfo:"publicInfo.sidePageInfo"
}, Layout1)