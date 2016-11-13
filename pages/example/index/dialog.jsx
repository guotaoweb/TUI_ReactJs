import Content from "Content"
import Btn from "Btn"
import {openDialog,closeDialog} from "Dialog"

class _Dialog extends React.Component {
    render() {
        return (
            <div>
                <Content txt="Dialog">
                    <Btn type="add" txt="弹出Dialog【text】" href={this._openDialog1.bind(this) } style={{ padding: "10px" }}/>
                    <Btn type="add" txt="弹出Dialog【confirm】" href={this._openDialog2.bind(this) } style={{ padding: "10px" }}/>
                    <Btn type="add" txt="弹出Dialog【prompt】" href={this._openDialog3.bind(this) } style={{ padding: "10px" }}/>
                    <Btn type="add" txt="弹出Dialog【list】" href={this._openDialog4.bind(this) } style={{ padding: "10px" }}/>
                </Content>
            </div>
        )
    }

    _openDialog1() {
        openDialog(this,"这是Dialog弹窗")
    }
     _openDialog2() {
        openDialog(this,"这是Dialog弹窗",function(){})
    }
    _openDialog3() {
        let _this = this 
       
        openDialog(_this,{title:"这是标题",type:"txtarea",placeholder:"请输入内容..."},function(){
            if(isNaN(parseInt(_this.props.textareaValue.value))){
                openDialog(_this,"这是不是数字")
            }
            else{
                closeDialog()
            }
        })
    }
    _openDialog4() {
        openDialog(this,{title:"这是标题",data:[{name:"选项一"}]})
    }
}

export default TUI._connect({
    textareaValue:"publicInfo.dialogInfo.txt"
}, _Dialog)