import Content from "Content"
import { openDialog } from "Dialog"

class Layout1 extends React.Component {
    render() {
        return (
            <div>
                <Content
                    txt="这是Content的标题"
                    addHref={this._openDialog1.bind(this)}
                    editHref={this._openDialog2.bind(this)}
                    backHref={this._openDialog3.bind(this)}>

                    这是Content的内容区域<br />
                    --<b>addHref</b>属性决定是否显示新增按钮<br />
                    --<b>editHref</b>属性决定是否显示编辑按钮<br />
                    --<b>backHref</b>属性决定是否显示回退按钮<br />
                    --<b>txt</b>属性为title的文本内容<br />
                    
                </Content>
            </div>
        )
    }

    _openDialog1() {
        openDialog(this, "单击了addHref")
    }
    _openDialog2() {
        openDialog(this, "单击了editHref")
    }
    _openDialog3() {
        openDialog(this, "单击了backHref")
    }

    componentDidMount() {
        this.props.addBreadNav([{ name: "布局1" }])
    }
}

export default TUI._connect({

}, Layout1)