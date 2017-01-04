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
                        placeholder="内容为空则绑定默认问卷"
                        clearFn={this._clearFn.bind(this, $c.Id)}
                        />
                )
            }
        }
        else {
            _selectList.push(
                <FormControls
                    key={"course0"}
                    label="问卷"
                    bind={{ SurvyIndex: 0, VoteId: sidePageInfo.gateWay ? sidePageInfo.gateWay.Id : "", CourseId: "" }}
                    ctrl="input"
                    type="select"
                    selectFn={this._selectFn.bind(this)}
                    value={"voteInfo.Survy0"}
                    clearFn={this._clearFn.bind(this)}
                    />
            )
        }

        // <FormControls
        //     label="是否启用"
        //     ctrl="slide"
        //     options={_slide}
        //     value="voteInfo.IsStart" />
        return (
            <Content2 tabs={tabs}>
                <div>
                    <FormControls
                        label="投票名称"
                        ctrl="input"
                        required="required"
                        value="voteInfo.Name" />

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

    _clearFn(courseId) {
        const {updateEditInfo,editInfo} = this.props
        let _jsonParam = {
            infoName: "voteInfo"
        }

        for (let key in editInfo.voteInfo) {
            if (key=="VoteRelated" + courseId) {
                editInfo.voteInfo[key]["SurvyId"]=""
                _jsonParam["VoteRelated" + courseId]=editInfo.voteInfo[key]
            }
        }
        updateEditInfo(_jsonParam)
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
            IsStart: parseInt(editInfo.voteInfo.IsStart),
            Type: parseInt(editInfo.voteInfo.Type)
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
                    successMsg("新增成功")
                } else if (result.code == 9) {
                    addVoteList([])
                } else {
                    errorMsg(Config.ERROR_INFO[result.code]);
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
                    errorMsg(Config.ERROR_INFO[result.code]);
                }
                _this.goBack()
            })
        }

    }
}

export default TUI._connect({
    editInfo: "formControlInfo.data",
    voteData: "voteList.data",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    courseList: "courseList.list"
}, EditVote)
