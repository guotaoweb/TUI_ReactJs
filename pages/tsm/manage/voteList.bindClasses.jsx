//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import FormControls from "FormControls"

class VoteUnBindClasses extends React.Component {
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
                        <span>{$c.Classes}</span>
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
                    未找到任何已绑定的班级
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
        const {updateClassesBindVote, errorMsg} = this.props
        var classesId = e.currentTarget.getAttribute("data-id")
        TUI.platform.delete("/VoteBindClasses/" + classesId, function(result) {
            if (result.code == 0) {
                updateClassesBindVote(classesId)
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
}, VoteUnBindClasses)