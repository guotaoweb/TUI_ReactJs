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

        if (courseList.length > 0) {
            for (let i = 0; i < courseList.length; i++) {
                let $c = courseList[i]
                _list.push(
                    <div key={"voteUnBindClasses" + i} style={listStyle}>
                        <FormControls key={"fc-votelist-" + i} id={$c.Id} ctrl="checkbox" txt={$c.Name} />
                    </div>
                )
            }
        }
        else {
            _list.push(
                <div key="voteUnBindClassesEmpty" style={{
                    width: "100%",
                    height: "40px",
                    lineHeight: "40px",
                    marginTop: "30px",
                    textAlign: "center",
                    color:"#999"
                }}>
                    未找到任何未绑定的科目
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
    sidePageInfo: "publicInfo.sidePageInfo",
    courseList: "courseList.list"
}, SurvyUnBindCourse)