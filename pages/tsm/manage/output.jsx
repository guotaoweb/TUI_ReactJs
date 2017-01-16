//图片
import singleLeft from "!url!./img/singleLeft.png"

//组件
import Content from "Content"
import Btn from "Btn"
import FormControls from "FormControls"
import Remark from "Remark"
import {openDialog, closeDialog} from "Dialog"




class ReportList extends React.Component {
    render() {
        const {
            voteList
        } = this.props


        let gradeList = [{name:"所以班级",id:"-1"},{name:"初一",id:"0"},{name:"初二",id:"1"},{name:"初三",id:"2"},{name:"高一",id:"3"},{name:"高二",id:"3"},{name:"高三",id:"3"}]
        return (
            <div>
                <Content txt="批量导出">
                    <div style={{width:"98%",margin:"auto",marginTop:"10px"}}>
                        <Remark>
                            【批量导出】为批量导出报表,只允许一次性批量导出指定年级或所有年级内已投过票的班级,如果希望导出指定班级,
                            可以使用【班级统计】中的导出报表功能。
                        </Remark>
                        <br style={{clear:"both"}}/>
                        <div style={{width:"45%",float:"left"}}>
                            <FormControls label="投票表格" ctrl="select" options={voteList} style={{width:"80%"}}  />
                        </div>
                        <div style={{width:"45%",float:"left"}}>
                            <FormControls label="投票年级" ctrl="select" options={gradeList}  style={{width:"80%"}}  />
                        </div>
                        <Btn type="add" txt="导出" style={{float:"left",marginTop:"6px"}} />
                    </div>
                </Content>
            </div>
        )
    }

    componentDidMount(){
        TUI.platform.get("/Vote?pageIndex=1&pageSize=10", function (result) {
            if (result.code == 0) {
                addVoteList(result.datas)
            }
            else if (result.code == 1) {
                addVoteList([])
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }
}


export default TUI._connect({
    voteList: "voteList.list"
}, ReportList)