//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import FormControls from "FormControls"

class VoteBindClasses extends React.Component {
    render() {
        const {
            voteList,
            errorMsg,
            sidePageInfo,
            pageInfo,
            addClassesData,
            updateEditInfo,
            deleteVoteList,
            successMsg,
            classesList
        } = this.props
        let _this = this,
            _list = [],
            listStyle = {
                width: "100%",
                height: "40px",
                lineHeight: "40px",
                paddingLeft: "10px",
                borderBottom: "1px solid #ebebeb"
            }
        for (var i = 0; i < classesList.length; i++) {
            var $c = classesList[i];
            _list.push(<FormControls key={"fc-votelist-" + i} ctrl="checkbox" txt={$c.Name} />)
        }
        return (
            <div style={listStyle}>
                {_list}
            </div>
        )
    }

    componentDidMount() {
        // const {addVoteList, errorMsg, updatePageInfo} = this.props
        // let _this = this

        // TUI.platform.get("/Vote", function (result) {
        //         if (result.code == 0) {
        //             addVoteList(result.datas)
        //             updatePageInfo({ index: 1, size: 7, sum: 10, url: "" })
        //         } else if (result.code == 9) {
        //             addVoteList([])
        //         } else {
        //             errorMsg(TUI.ERROR_INFO[result.code]);
        //         }
        //     })
    }

}

export default TUI._connect({
    voteList: "voteList.list",
    classesList: "classesList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, VoteBindClasses)