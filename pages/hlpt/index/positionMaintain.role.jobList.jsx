import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import SidePage, { openSidePage, closeSidePage } from "SidePage"

import singleLeft from "!url!./img/singleLeft.png"

class PositionMaintainRoleInJobList extends React.Component {
    render() {
        const {jobsSearchData,tips} = this.props
        let _list = []
        if (jobsSearchData.length > 0) {
            for (let i = 0; i < jobsSearchData.length; i++) {
                let $d = jobsSearchData[i],
                isSelected = "no"
                for (let j = 0; j < tips.length; j++) {
                    let $s = tips[j];
                    if($d.jobId == $s.id){
                        isSelected = "yes"
                        break
                    }
                }
                _list.push(
                    <div key={"joblist_checkbox_" + i} style={{
                        width: "100%",
                        height: "40px",
                        lineHeight: "40px",
                        paddingLeft: "10px",
                        borderBottom: "1px solid #ebebeb"
                    }}>
                        <FormControls label="" ctrl="checkbox" txt={$d.jobName} id={$d.jobId} labelWidth="100" fn={this.checkboxClick.bind(this)} selected={isSelected} />
                   
                    </div>
                )
            }
        }
        else {
            _list.push(<div key={"joblist_checkbox_-1"} style={{ width: "100%", height: "80px", lineHeight: "80px", textAlign: "center", color: "#999" }}>没有找到任何数据</div>)
        }
        return (
            <div>
                <div className="t-header-search" style={{ top: "50px", paddingLeft: "30px", backgroundPositionX: "5px" }}>
                    <input type="text" ref="sidePageSearch" placeholder="请输入关键词" />
                </div>
                <div style={{ marginTop: "50px", borderTop: "1px solid #ebebeb" }}>
                    {_list}
                </div>
            </div>
        )
    }

    _closeSidePage() {
        closeSidePage({
            id: "PositionMaintainRoleEdit"
        })
    }


    checkboxClick(action, params) {
        if (action == "open") { 
            let _param  = []
            _param.push(params)
            this.props.pushTip(_param)
        }
        else {
            let selectedId = params.id
            this.props.deleteTip(selectedId)
        }
    }


    componentDidMount() {
        const {jobsData, jobsSearchData, searchPositionMaintainJobs} = this.props
        let $sidePageSearch = ReactDOM.findDOMNode(this.refs.sidePageSearch)
        let keypressFn = function (e) {
            if (e.keyCode == 13) {
                let _value = $sidePageSearch.value
                let finded = []
                if (_value) {
                    for (let i = 0; i < jobsData.length; i++) {
                        let $d = jobsData[i];
                        if ($d.jobName.indexOf(_value) > -1) {
                            finded.push($d)
                        }
                    }
                }
                else {
                    finded = jobsData
                }

                searchPositionMaintainJobs(eval(JSON.stringify(finded)))
            }
        }
        $sidePageSearch.addEventListener("focus", function () {
            document.addEventListener("keypress", keypressFn)
        })

        $sidePageSearch.addEventListener("blur", function () {
            document.removeEventListener("keypress", keypressFn)
        })
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo",
    jobsData: "positionMaintain.jobsData",
    jobsSearchData: "positionMaintain.jobsSearchData",
    jobsSelectedData:"positionMaintain.jobsSelectedData",
    jobsInfo:"positionMaintain.jobsInfo",
    tips: "publicInfo.tips",
    editInfo:"formControlInfo.data"
}, PositionMaintainRoleInJobList)
