//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import FormControls from "FormControls"

let COURSE_BIND_SURVY_STATUS = "UNBIND"
class VoteBindClasses extends React.Component {
    render() {
        const {
            voteList,
            errorMsg,
            classesList
        } = this.props
        let _this = this,
            _list = [],
            listStyle = {
                width: "100%",
                height: "40px",
                lineHeight: "40px",
                paddingLeft: "10px",
                position: "relative",
                borderBottom: "1px solid #ebebeb"
            },
            bStyle = {
                backgroundColor: "#F74C4E",
                position: "absolute",
                padding: "0px 10px",
                color: "white",
                borderRadius: "3px",
                height: "30px",
                lineHeight: "30px",
                top: "5px",
                right: "3px",
                fontWeight: "lighter",
                cursor: "pointer"
            }
        for (let i = 0; i < classesList.length; i++) {
            let $c = classesList[i]
            if (COURSE_BIND_SURVY_STATUS == "BIND") {
                _list.push(
                    <div key={"voteBindClasses" + i} style={listStyle}>
                        <span>{$c.Classes}</span>
                        <b style={bStyle} data-id={$c.Id} onClick={this.removeBind.bind(this)}>解绑</b>
                    </div>
                )
            }
            else {
                _list.push(
                    <div key={"voteBindClasses" + i} style={listStyle}>
                        <FormControls key={"fc-votelist-" + i} id={$c.Id} ctrl="checkbox" txt={$c.Classes} />
                    </div>
                )
            }
        }
        return (
            <div>
                <ul className="voteBindClassesStatusBar">
                    <li ref="voteUnbind" onClick={this.unBind.bind(this)} className="activity">未绑定</li>
                    <li ref="voteBinded" onClick={this.binded.bind(this)}>已绑定</li>
                </ul>
                <br style={{ clear: "both" }} />
                {_list}
            </div>
        )
    }

    componentDidMount() {
        document.querySelector(".voteBindClassesStatusBar").parentNode.parentNode.parentNode.style.paddingTop = "0px"
    }

    unBind(e) {
        const {sidePageInfo, loadClassesList, errorMsg} = this.props
        COURSE_BIND_SURVY_STATUS = "UNBIND"
        TUI.platform.get("/ClassesInVote/" + sidePageInfo.gateWay.Id + "?status=unbind", function (result) {
            if (result.code == 0) {
                loadClassesList(result.datas)
            } else {
                loadClassesList([])
            }
        })

        var $currentLi = ReactDOM.findDOMNode(this.refs.voteUnbind)
        if ($currentLi.getAttribute("class") != "activiry") {
            $currentLi.setAttribute("class", "activity")
            $currentLi.nextSibling.setAttribute("class", "")
        }

        document.getElementById("bindClasses")
            .querySelector(".t-content_t")
            .getElementsByTagName("div")[0].style.display = "block"
        document.getElementById("bindClasses")
            .querySelector(".t-content_t")
            .getElementsByTagName("div")[1].style.display = "block"

    }
    binded(e) {
        const {sidePageInfo, loadClassesList, errorMsg} = this.props
        COURSE_BIND_SURVY_STATUS = "BIND"
        TUI.platform.get("/ClassesInVote/" + sidePageInfo.gateWay.Id + "?status=bind", function (result) {
            if (result.code == 0) {
                loadClassesList(result.datas)
            } else {
                loadClassesList([])
            }
        })

        var $currentLi = ReactDOM.findDOMNode(this.refs.voteBinded)
        if ($currentLi.getAttribute("class") != "activiry") {
            $currentLi.setAttribute("class", "activity")
            $currentLi.previousSibling.setAttribute("class", "")
        }

        document.getElementById("bindClasses")
            .querySelector(".t-content_t")
            .getElementsByTagName("div")[0].style.display = "none"
        document.getElementById("bindClasses")
            .querySelector(".t-content_t")
            .getElementsByTagName("div")[1].style.display = "none"
    }
    removeBind(e) {
        const {updateCourseBindSurvy, errorMsg} = this.props
        var classesId = e.currentTarget.getAttribute("data-id")
        TUI.platform.delete("/VoteBindClasses/" + classesId, function (result) {
            if (result.code == 0) {
                updateCourseBindSurvy(classesId)
            } else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }
}

export default TUI._connect({
    voteList: "voteList.list",
    classesList: "classesList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, VoteBindClasses)