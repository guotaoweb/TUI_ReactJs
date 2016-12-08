import Content2,{getContentIndex} from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"
import { closeSidePage } from 'SidePage'
import SurvyListPreView from './survyList.preview'
import SurvyListProblem from './survyList.problem'



class EditSurvy extends React.Component {
    render() {
        const {editInfo, survyData,updateSurvy} = this.props
        let tabs = [{
            name: "基本信息", id: "tabs1"
        }, {
            name: "问卷内容", id: "tabs2", fn: function () {
                TUI.platform.get("/SurvyContent/" + editInfo.survyInfo.Id, function (result) {
                    if (result.code == 0) {
                        var _d = result.datas
                        updateSurvy(_d)
                    }
                    else if(result.code==1){
                        updateSurvy([])
                    }
                    else {
                        errorMsg(Config.ERROR_INFO[result.code]);
                    }
                })
            }
        }, {
            name: "问卷预览", id: "tabs3"
        }]

        let _survys = []

        if (survyData.length == 0) {
            _survys.push(
                <div key={"survy_empty"} style={{
                    padding: "10px",
                    color: "#999",
                    width: "100%",
                    textAlign: "center",
                    marginTop: "15%",
                    fontSize: "20px"
                }}>
                    <span>单击 </span>
                    <Btn txt="编辑" style={{ display: "inline-block" }} href={this.addSurvy.bind(this)} />
                    <span> 题目</span>
                </div>
            )
        }
        else {
            _survys.push(<SurvyListProblem key="survyProblem" />)
        }
        return (
            <Content2 tabs={tabs}>
                <div>
                    <FormControls label="问卷名称" ctrl="input" required="required" value="survyInfo.Name" />
                    <FormControls label="问卷说明" ctrl="textarea" value="survyInfo.Desp" />
                    <div className="formControl-btn">
                        <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
                        <Btn type="add" txt="确定" />
                    </div>
                </div>
                <div>
                    {_survys}
                    <br /><br />
                </div>
                <div><SurvyListPreView /></div>
            </Content2>
        )
    }

    goBack() {
        closeSidePage()
        this.props.backBreadNav()
    }

    addSurvy() {
        this.props.addSurvy([{
            Id: TUI.fn.newGuid(),
            ParentId: "0",
            Name: "",
            Order: 0,
            Type: "radio",
            Datas: [{
                Id: TUI.fn.newGuid(),
                Name: "",
                Order: 0
            }]
        }])
        var _this = this

        console.info(_this.props.survyData)


    }

    componentDidMount() {
        // this.props.updateSurvy([{
        //     txt: "这是第一道题",
        //     sort: 0,
        //     type: "radio",
        //     options: [{
        //         txt: "选项一",
        //         sort: 0
        //     }, {
        //         txt: "选项二",
        //         sort: 1
        //     }, {
        //         txt: "选项三",
        //         sort: 2
        //     }, {
        //         txt: "选项四",
        //         sort: 3
        //     }]
        // }, {
        //     txt: "这是第二道题",
        //     sort: 1,
        //     type: "textarea",
        //     options: []
        // }, {
        //     txt: "这是第三道题",
        //     sort: 1,
        //     type: "checkbox",
        //     options: [{
        //         txt: "选项一",
        //         sort: 0
        //     }, {
        //         txt: "选项二",
        //         sort: 1
        //     }, {
        //         txt: "选项三",
        //         sort: 2
        //     }, {
        //         txt: "选项四",
        //         sort: 3
        //     }]
        // }, {
        //     txt: "这是第四道题",
        //     sort: 1,
        //     type: "checkbox",
        //     options: [{
        //         txt: "选项一",
        //         sort: 0
        //     }, {
        //         txt: "选项二",
        //         sort: 1
        //     }, {
        //         txt: "选项三",
        //         sort: 2
        //     }, {
        //         txt: "选项四",
        //         sort: 3
        //     }]
        // }])


        let _this = this
        //鼠标经过操作按钮的时候,提示正在操作哪个题目/选项
        setTimeout(function () {
            let $optionbtns = document.getElementsByClassName("optionbtns")
            for (let i = 0; i < $optionbtns.length; i++) {
                $optionbtns[i].addEventListener("mouseenter", function () {
                    this.previousSibling.getElementsByTagName("input")[0].style.borderColor = "red"
                })
                $optionbtns[i].addEventListener("mouseleave", function () {
                    this.previousSibling.getElementsByTagName("input")[0].style.borderColor = "#ebebeb"
                })
            }
        }, 200)

    }
}

export default TUI._connect({
    editInfo: "formControlInfo.data",
    survyData: "survyList.data"
}, EditSurvy)