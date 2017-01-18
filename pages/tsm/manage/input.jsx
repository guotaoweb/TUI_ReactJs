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


        let gradeList = [{name:"所以班级",id:"0"},{name:"初一",id:"0"},{name:"初二",id:"1"},{name:"初三",id:"2"},{name:"高一",id:"3"},{name:"高二",id:"3"},{name:"高三",id:"3"}]
        return (
            <div>
                <Content txt="批量导入">
                    <div style={{width:"98%",margin:"auto",marginTop:"10px"}}>
                        <Remark>
                            【批量导入】为批量导入班级、科目、教师的关联关系,请单击<a href="#">-&gt;关联表格&lt;-</a>进行表格下载,
                            务必严格依据表格格式进行内容填写,特别注意:如果所填内容在系统中存在,上传表格过程中,以"关联表格"
                            内容为主进行旧数据替换。<br/>
                            <span style={{color:"red"}}>注:在选择文件后,请在输入框内出现所选文件名后,再单击导入按钮,否则无效</span>
                        </Remark>
                        <br style={{clear:"both"}}/>
                        <div style={{width:"91%",float:"left"}}> 
                            <FormControls label="上传关联表格" ctrl="input" value="uploadFiles.fileName" style={{width:"87%"}} placeholder="单击输入框,选择需要上传的文件"  />
                        </div>
                        <Btn type="import" txt="导入" style={{float:"left",marginTop:"6px"}} />
                        <div style={{
                            position: "relative",
                            top: "-45px",
                            left: "10%",
                            width: "10%",
                            height: "40px",
                            opacity:"0",
                            width:"80%"
                        }}>
                            <form id="form1" method="POST" name="files" target="blankFrame" action="/v1/UploadFile" encType="multipart/form-data">
                                <input type="file" id="files" name="files" style={{
                                    width: "100%",
                                    height: "40px"
                                }} onChange={this.filesOnChange.bind(this)} accept="application/vnd.ms-excel" />
                                <iframe src="about:blank" name="blankFrame" id="blankFrame" style={{display: "none"}}></iframe>
                                <input type="submit" style={{
                                    width: "90px",
                                    height: "40px",
                                    position: "absolute",
                                    right: "-100px",
                                    cursor:"pointer"
                                }} onClick={this.uploadFile.bind(this)}/>
                            </form>
                        </div>
                    </div>
                </Content>
            </div>
        )
    }
    filesOnChange(e){
        this.props.addEditInfo({
            infoName:"uploadFiles",
            fileName:e.currentTarget.value
        })
    }

    uploadFile(){
        console.info("aaa")
        return false
    }

    componentDidMount(){
        
    }
}


export default TUI._connect({
    voteList: "voteList.list"
}, ReportList)