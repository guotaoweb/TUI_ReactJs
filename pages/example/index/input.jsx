import Content from "Content"
import FormControls from "FormControls"
import Btn from "Btn"

class Layout1 extends React.Component {
    render() {
        return (
            <div>
                <Content txt="Input输入框">
                    <FormControls label="只读" ctrl="input" disabled="disabled" txt="" onChange={this.test1.bind(this) } />
                    <FormControls label="必填" ctrl="input" required="required" txt="" onChange={this.test2.bind(this) } />
                    <FormControls label="多行输入" ctrl="textarea" required="required" txt="" />
                    <Btn type="submit" txt="保存" style={{ marginLeft: "70px", marginTop: "10px" }} href={this.submit.bind(this) } />
                </Content>
            </div>
        )
    }

    submit() {
        let _this = this
        setTimeout(function () {
            _this.props.successMsg("编辑成功")
        }, 1000)
    }

    test1() {

    }
    test2() {

    }
}

export default TUI._connect({
    preventSubmit: "publicInfo.msgInfo.txt"
}, Layout1)