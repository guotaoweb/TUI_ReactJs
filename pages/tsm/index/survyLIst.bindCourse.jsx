import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"
import { closeSidePage } from "SidePage"


class SurvyBindCourse extends React.Component {
    render() {
        const {sidePageInfo, courseList} = this.props

        let _courseList = []
        for (var i = 0; i < courseList.length; i++) {
            var $c = courseList[i];
            _courseList.push(
                <div style={{
                    width: "100%",
                    height: "40px",
                    lineHeight: "40px",
                    paddingLeft: "15px",
                    borderBottom:"1px solid #ddd"
                }} key={"bindCourse_"+i}>
                    <FormControls ctrl="checkbox" id={$c.Id} txt={$c.Name}/>
                </div>
            )
        }

        return (
            <div>
                {_courseList}
            </div>
        )
    }


    editVTeamInfo() {
        const {detail, sidePageInfo, userId, successMsg, errorMsg, updateVTeamListByID, updateVTeamData, preventSubmit, waiteMsg} = this.props

        if (preventSubmit) {
            return false
        }

        waiteMsg("数据提交中,请稍后...")

        let _this = this,
            operType,
            teamId

        if (sidePageInfo.status == "editVTeam") {
            operType = "U"
            teamId = detail.id
        }
        else {
            operType = "A"
        }

        TUI.platform.post("/projectteam/team", {
            "uid": userId,
            "team_id": teamId,
            "upper_team_id": "-1",
            "team_code": detail.code,
            "team_name": detail.name,
            "team_note": detail.note,
            "team_icon": "",
            "sort": "99",
            "state": "1",
            "del_flag": "n",
            "opertype": operType
        }, function (result) {
            if (result.code == 0) {
                if (operType == "U") {
                    setTimeout(function () { successMsg("虚拟组编辑成功") }, 800)
                }
                else {
                    setTimeout(function () { successMsg("虚拟组新增成功") }, 800)
                    let _addData = {
                        team_id: result.datas[0],
                        team_code: detail.code,
                        team_name: detail.name,
                        team_note: detail.note,
                        admins: {}
                    }

                    updateVTeamData(_addData)
                }
                updateVTeamListByID(teamId)
                _this.goPrevPage()
            }
            else {
                errorMsg(config.ERROR_INFO[result.code]);
            }
        })
    }

    goPrevPage() {
        const {clearVTeamInfo} = this.props
        setTimeout(function () {
            clearVTeamInfo()
            closeSidePage()
        }, 0)
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo",
    courseList: "courseList.data"
}, SurvyBindCourse)