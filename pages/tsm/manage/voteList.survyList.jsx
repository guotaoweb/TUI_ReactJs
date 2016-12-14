//组件
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"
import { openLoading, closeLoading } from "Loading"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import { openContentLoading, closeContentLoading } from 'Content'
import FormControls from 'FormControls'


class SelectSurvy extends React.Component {
    render() {
        const {
            errorMsg,
            survyList,
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

        if (survyList.length > 0) {
            for (var i = 0; i < survyList.length; i++) {
                var $t = survyList[i];
                _list.push(
                    <div style={_listStyle} key={"selectSurvy"+i}>
                        <FormControls ctrl="radio" txt={$t.Name} groupName="survyList" value={$t.Id} />
                    </div>
                )
            }
        }
        else {
            _list.push(
                <div key="voteList.survyList" style={{
                    width: "100%",
                    height: "40px",
                    lineHeight: "40px",
                    marginTop: "30px",
                    textAlign: "center",
                    color: "#999"
                }}>
                    未找到任何问卷
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
        const {survyList,addSurvyList, errorMsg} = this.props
        if (survyList.length == 0) {
            TUI.platform.get("/Survy", function (result) {
                if (result.code == 0) {
                    addSurvyList(result.datas)
                }
                else if (result.code == 1) {
                    addSurvyList([])
                } else {
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
            })
        }
    }

}


export default TUI._connect({
    survyList: "survyList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, SelectSurvy)