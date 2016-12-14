import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"
import { openSidePage, closeSidePage } from 'SidePage'

class EditVote extends React.Component {
    render() {
        const {sidePageInfo, editInfo, survyList, courseList, updateEditInfo} = this.props

        let tabs = [
            {
                name: sidePageInfo.status == "addVote"
                    ? "新增投票"
                    : "编辑投票",
                id: "tabs1"
            }
        ],
            _slide = [
                {
                    name: "是",
                    id: "0"
                }, {
                    name: "否",
                    id: "1"
                }
            ],
            _voteType = [
                {
                    name: "普通类型",
                    id: "0"
                }, {
                    name: "科目类型",
                    id: "1"
                }
            ]

        let _selectList = []
        if ((editInfo._voteInfo ? editInfo._voteInfo.Type : 1) == 1) {
            for (var i = 0; i < courseList.length; i++) {
                var $c = courseList[i]
                _selectList.push(
                    <FormControls
                        key={"course" + i}
                        label={$c.Name}
                        bind={{ SurvyIndex: $c.Id, VoteId: sidePageInfo.gateWay ? sidePageInfo.gateWay.Id : "", CourseId: $c.Id }}
                        ctrl="input"
                        type="select"
                        selectFn={this._selectFn.bind(this)}
                        value={"voteInfo.Survy" + $c.Id}
                        />
                )
            }
        }
        else {
            _selectList.push(
                <FormControls
                    key={"course0"}
                    label="问卷"
                    bind={{ SurvyIndex: i, VoteId: sidePageInfo.gateWay ? sidePageInfo.gateWay.Id : "", CourseId: "" }}
                    ctrl="input"
                    type="select"
                    selectFn={this._selectFn.bind(this)}
                    value={"voteInfo.Survy0"} />
            )
        }


        return (
            <Content2 tabs={tabs}>
                <div>
                    <FormControls
                        label="投票名称"
                        ctrl="input"
                        required="required"
                        value="voteInfo.Name" />
                    <FormControls
                        label="是否启用"
                        ctrl="slide"
                        options={_slide}
                        value="voteInfo.IsStart" />
                    <FormControls
                        label="投票类型"
                        ctrl="select"
                        options={_voteType}
                        value="voteInfo.Type" onChangeFn={this.selectOnChangeFn.bind(this)} />
                    {_selectList}
                    <div className="formControl-btn">
                        <Btn
                            type="cancel"
                            txt="取消"
                            href={this
                                .goBack
                                .bind(this)} />
                        <Btn
                            type="submit"
                            txt="确定"
                            href={this
                                .editVoteList
                                .bind(this)} />
                    </div>
                </div>
            </Content2>
        )
    }

    


    _selectFn(bind) {
        openSidePage(this, {
            id: "selectSurvy",
            status: "selectSurvy",
            width: "400",
            gateWay: {
                Id: bind.Id
            }
        })
    }

    selectOnChangeFn(type) {
        this.props.updateEditInfo({
            infoName: "_voteInfo",
            Type: type
        })
    }

    goBack() {
        const {clearEditInfo, backBreadNav} = this.props
        closeSidePage()
        clearEditInfo({ infoName: "voteInfo" })
        backBreadNav()
    }

    editVoteList() {
        const {
            editInfo,
            sidePageInfo,
            errorMsg,
            addVoteList,
            updatePageInfo,
            updateVoteList,
            pageInfo,
            successMsg
        } = this.props

        let jsonParam = {
            Name: editInfo.voteInfo.Name,
            IsStart: parseInt(editInfo.voteInfo.IsStart)
        },
            _this = this

        let voteRelated = []
        for (let key in editInfo.voteInfo) {
            if (key.indexOf("VoteRelated") > -1) {
                voteRelated.push(editInfo.voteInfo[key])
            }
        }
        jsonParam["voteRelated"] = voteRelated

        if (sidePageInfo.status == "addVote") {
            TUI.platform.post("/Vote", jsonParam, function (result) {
                if (result.code == 0) {
                    jsonParam["Id"] = result.datas
                    jsonParam["VotedNumber"] = 0
                    jsonParam["UpdateTime"] = TUI.fn.currentTime()
                    addVoteList(jsonParam)
                    updatePageInfo({
                        sum: parseInt(pageInfo.index.sum) + 1
                    })
                    successMsg("新增成功")
                } else if (result.code == 9) {
                    addVoteList([])
                } else {
                    errorMsg(TUI.ERROR_INFO[result.code]);
                }
                _this.goBack()
            })
        } else {
            let _id = editInfo.voteInfo.Id
            TUI.platform.put("/Vote/" + _id, jsonParam, function (result) {
                    if (result.code == 0) {
                        jsonParam["Id"] = _id
                        updateVoteList(jsonParam)
                        successMsg("编辑成功")
                    } else {
                        errorMsg(TUI.ERROR_INFO[result.code]);
                    }
                    _this.goBack()
                })
        }

    }

    componentDidMount() {
        const {addCourseList, courseList, errorMsg, updateEditInfo, editInfo} = this.props

        // if (courseList.length == 0) {
        //     TUI.platform.get("/Course", function (result) {
        //         if (result.code == 0) {
        //             addCourseList(result.datas)
        //         }
        //         else if (result.code == 1) {
        //             addCourseList([])
        //         } else {
        //             errorMsg(Config.ERROR_INFO[result.code]);
        //         }
        //     })
        // }
        //this.updateTest()

    }
}

export default TUI._connect({
    editInfo: "formControlInfo.data",
    voteData: "voteList.data",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    courseList: "courseList.list"
}, EditVote)
