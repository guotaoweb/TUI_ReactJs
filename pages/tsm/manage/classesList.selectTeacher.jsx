//组件
import Btn from "Btn"
import { openLoading, closeLoading } from "Loading"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openContentLoading, closeContentLoading } from 'Content'
import FormControls from 'FormControls'


class SelectTeacher extends React.Component {
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
                    <div key={"selectTeacher"+i} style={_listStyle}>
                        <FormControls ctrl="radio" txt={$t.Name} groupName="teacherList" value={$t.Id} />
                    </div>
                )
            }
        }
        else {
            _list.push(
                <div key="selectTeacher0" style={{
                    width: "100%",
                    height: "40px",
                    lineHeight: "40px",
                    marginTop: "30px",
                    textAlign: "center",
                    color: "#999"
                }}>
                    科目下未找到任何教师
                </div>
            )
        }
        return (
            <div>
                {_list}
            </div>

        )
    }
}


export default TUI._connect({
    teacherList: "teacherList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, SelectTeacher)