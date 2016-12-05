//图片
import singleLeft from "!url!./img/singleLeft.png"
import minus from "!url!../../../components/MultyMenu/img/minus.png"

//组件
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"
import MultyMenu from "MultyMenu"
import { openLoading, closeLoading } from "Loading"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openContentLoading, closeContentLoading } from 'Content'
import FormControls from 'FormControls'


class ClassesGrade extends React.Component {
    render() {
        const {
            errorMsg,
            teacherList,
            pageInfo,
            updateEditInfo
        } = this.props


        let _listStyle = {
            width: "100%",
            height: "40px",
            lineHeight: "40px",
            paddingLeft: "10px"
        },
            _list = []

        if (teacherList.length > 0) {
            for (var i = 0; i < teacherList.length; i++) {
                var $t = teacherList[i];
                _list.push(
                    <div style={_listStyle}>
                        <FormControls ctrl="radio" txt={$t.Name} groupName="teacherList" value={$t.Id} />
                    </div>
                )
            }
        }
        else {
            _list.push(
                <div style={{
                    width: "100%",
                    height: "40px",
                    lineHeight: "40px",
                    marginTop: "30px",
                    textAlign: "center",
                    color: "#999"
                }}>
                    科目未找到下任何教师
                </div>
            )
        }
        return (
            <div>
                {_list}
            </div>

        )
    }

    componentDidMount() {
        const {addGradeList, updatePageInfo, errorMsg, courseList, addCourseList} = this.props
        // let _this = this
        // openLoading()
        // TUI.platform.get("/Grade", function (result) {
        //     if (result.code == 0) {
        //         addGradeList(result.datas)
        //     }
        //     else if (result.code == 1) {
        //         addGradeList([])
        //     }
        //     else {
        //         errorMsg(TUI.ERROR_INFO[result.code]);
        //     }
        // })
    }

}


export default TUI._connect({
    teacherList: "teacherList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, ClassesGrade)