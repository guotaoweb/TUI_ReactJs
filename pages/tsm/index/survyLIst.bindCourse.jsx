import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"
import { closeSidePage } from "SidePage"


class SurvyUnBindCourse extends React.Component {
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

        if(courseList.length>0){
            for (let i = 0; i < courseList.length; i++) {
                let $c = courseList[i]
                _list.push(
                    <div key={"voteBindClasses" + i} style={listStyle}>
                        <span>{$c.Name}</span>
                        <b style={bStyle} data-id={$c.Id} onClick={this.removeBind.bind(this)}>解绑</b>
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
                    color:"#999"
                }}>
                    未找到任何已绑定的科目
                </div>
            )
        }
        return (
            <div>
                {_list}
            </div>
        )
    }

    removeBind(e) {
        const {updateCourseBindSurvy, errorMsg} = this.props
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
}, SurvyUnBindCourse)