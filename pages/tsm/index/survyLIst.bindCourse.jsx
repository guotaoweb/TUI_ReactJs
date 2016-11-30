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
                    borderBottom: "1px solid #ddd"
                }} key={"bindCourse_" + i}>
                    <FormControls ctrl="checkbox" id={$c.Id} txt={$c.Name} />
                </div>
            )
        }

        return (
            <div>
                {_courseList}
            </div>
        )
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo",
    courseList: "courseList.list"
}, SurvyBindCourse)