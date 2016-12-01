
import Btn from "Btn"
import FormControls from "FormControls"
import { closeSidePage } from "SidePage"


class EditClasses extends React.Component {
    render() {
        const {voteList} = this.props
        let list = []
        for (var i = 0; i < voteList.length; i++) {
            var $v = voteList[i];
            list.push(
                <div key={"bindVote_"+i} style={{
                    width: "100%",
                    height: "40px",
                    lineHeight: "40px",
                    paddingLeft: "10px",
                    borderBottom: "1px solid #ebebeb"
                }}>
                    <FormControls ctrl="radio" txt={$v.Name} value={$v.Id} />
                </div>
            )
        }
        return (
            <div>
                {list}
            </div>
        )
    }


    _goBack() {
        closeSidePage({
            id:"bindVote"
        })
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo",
    voteList: "voteList.list"
}, EditClasses)