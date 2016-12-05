//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import FormControls from "FormControls"

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
        if (classesList.length > 0) {
            for (let i = 0; i < classesList.length; i++) {
                let $c = classesList[i]
                _list.push(
                    <div key={"voteBindClasses" + i} style={listStyle}>
                        <FormControls key={"fc-votelist-" + i} id={$c.Id} ctrl="checkbox" txt={$c.Classes} />
                    </div>
                )
            }
        }
        else {
            _list.push(
                <div style={{
                    width:"100%",
                    height:"40px",
                    lineHeight:"40px",
                    marginTop:"30px",
                    textAlign:"center",
                    color:"#999"
                }}>
                    未找到任何未绑定的班级
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
    voteList: "voteList.list",
    classesList: "classesList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, VoteBindClasses)