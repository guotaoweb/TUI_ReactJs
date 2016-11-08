import Content from "Content"
import FormControls from "FormControls"
import Btn from "Btn"

class Layout1 extends React.Component {
    render() {
        return (
            <div>
                <Content txt="Input输入框">
                    <FormControls label="只读(1)" ctrl="input" disabled="disabled" value="InputInfo.name" />
                    <FormControls label="必填(2)" ctrl="input" required="required" value="InputInfo.age" />
                    <FormControls label="多行输入(3)" ctrl="textarea" required="required" value="InputInfo.comment" />
                    <FormControls label="非必填(4)" ctrl="input" value="InputInfo1.age" />
                    <div className="formControl-btn">
                        <Btn type="add" txt="清除数据" href={this.clearData.bind(this)} />
                        <Btn type="add" txt="填充数据" href={this.addData.bind(this)} />
                        <Btn type="add" txt="保存" href={this.submit.bind(this)} />
                    </div>
                    
                    <div className="t-remark" style={{marginTop:"80px"}}>
                        FormControls自动实现onChange方法,编辑时所生成的实体是根据value的格式。如:InputInfo.name,则会生成
                        InputInfo:大括号的格式。测试起见,1,2,3,是一个编辑实体,4是一个编辑实体。
                    </div>
                </Content>
            </div>
        )
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
    editInfo: "formControlInfo.data"
}, Layout1)