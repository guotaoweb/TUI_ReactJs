import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"
import { closeSidePage } from "SidePage"

let COURSE_BIND_SURVY_STATUS = "UNBIND"
class SurvyBindCourse extends React.Component {
    render() {
        const {sidePageInfo, courseList} = this.props


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
        for (let i = 0; i < courseList.length; i++) {
            let $c = courseList[i]
            if (COURSE_BIND_SURVY_STATUS == "BIND") {
                _list.push(
                    <div key={"voteBindClasses" + i} style={listStyle}>
                        <span>{$c.Name}</span>
                        <b style={bStyle} data-id={$c.Id} onClick={this.removeBind.bind(this)}>解绑</b>
                    </div>
                )
            }
            else {
                _list.push(
                    <div key={"voteBindClasses" + i} style={listStyle}>
                        <FormControls key={"fc-votelist-" + i} id={$c.Id} ctrl="checkbox" txt={$c.Name} />
                    </div>
                )
            }

        }

        return (
            <div>
                <ul className="voteBindClassesStatusBar">
                    <li ref="courseUnbind" onClick={this.unBind.bind(this)} className="activity">未绑定</li>
                    <li ref="courseBinded" onClick={this.binded.bind(this)}>已绑定</li>
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
        const {sidePageInfo, loadCourseList, errorMsg} = this.props
        COURSE_BIND_SURVY_STATUS = "UNBIND"
        TUI.platform.get("/CourseInSurvy/" + sidePageInfo.gateWay.Id + "?status=unbind", function (result) {
            if (result.code == 0) {
                loadCourseList(result.datas)
            } else {
                loadCourseList([])
            }
        })

        var $currentLi = ReactDOM.findDOMNode(this.refs.courseUnbind)
        if ($currentLi.getAttribute("class") != "activiry") {
            $currentLi.setAttribute("class", "activity")
            $currentLi.nextSibling.setAttribute("class", "")
        }

        document.getElementById("bindCourse")
            .querySelector(".t-content_t")
            .getElementsByTagName("div")[0].style.display = "block"
        document.getElementById("bindCourse")
            .querySelector(".t-content_t")
            .getElementsByTagName("div")[1].style.display = "block"

    }
    binded(e) {
        const {sidePageInfo, loadCourseList, errorMsg} = this.props
        COURSE_BIND_SURVY_STATUS = "BIND"
        TUI.platform.get("/CourseInSurvy/" + sidePageInfo.gateWay.Id + "?status=bind", function (result) {
            if (result.code == 0) {
                loadCourseList(result.datas)
            } else {
                loadCourseList([])
            }
        })

        var $currentLi = ReactDOM.findDOMNode(this.refs.courseBinded)
        if ($currentLi.getAttribute("class") != "activiry") {
            $currentLi.setAttribute("class", "activity")
            $currentLi.previousSibling.setAttribute("class", "")
        }

        document.getElementById("bindCourse")
            .querySelector(".t-content_t")
            .getElementsByTagName("div")[0].style.display = "none"
        document.getElementById("bindCourse")
            .querySelector(".t-content_t")
            .getElementsByTagName("div")[1].style.display = "none"
    }

    removeBind(e) {
        const {updateCourseBindSurvy,errorMsg} = this.props
        var courseId = e.currentTarget.getAttribute("data-id")
        TUI.platform.delete("/CourseInSurvy/" + courseId, function (result) {
            if (result.code == 0) {
                updateCourseBindSurvy(courseId)
            } else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo",
    courseList: "courseList.list"
}, SurvyBindCourse)