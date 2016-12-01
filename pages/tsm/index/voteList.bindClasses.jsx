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
                cursor:"pointer"
            }
        for (var i = 0; i < classesList.length; i++) {
            var $c = classesList[i];
            _list.push(
                <div key={"voteBindClasses" + i} style={listStyle}>
                    <FormControls key={"fc-votelist-" + i} id={$c.Id}  ctrl="checkbox" txt={$c.Name} />
                    <b style={bStyle}>解绑</b>
                </div>
            )
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
        // TUI.platform.get("/Classes", function (result) {
        //     if (result.code == 0) {
        //         addClassesList(result.datas)
        //     } else {
        //         errorMsg(Config.ERROR_INFO[result.code]);
        //     }
        // })

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
        // TUI.platform.get("/Classes", function (result) {
        //     if (result.code == 0) {
        //         addClassesList(result.datas)
        //     } else {
        //         errorMsg(Config.ERROR_INFO[result.code]);
        //     }
        // })

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
}

export default TUI._connect({
    voteList: "voteList.list",
    classesList: "classesList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, VoteBindClasses)