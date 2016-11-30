import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import {openDialog, closeDialog} from "Dialog"
import {closeSidePage} from 'SidePage'

class EditVote extends React.Component {
    render() {
        const {sidePageInfo} = this.props
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
                ]

            return (
                <Content2 tabs={tabs}>
                    <div>
                        <FormControls
                            label="投票名称"
                            ctrl="input"
                            required="required"
                            value="voteInfo.Name"/>
                        <FormControls
                            label="是否启用"
                            ctrl="slide"
                            options={_slide}
                            value="voteInfo.IsStart"/>
                        <div className="formControl-btn">
                            <Btn
                                type="cancel"
                                txt="取消"
                                href={this
                                .goBack
                                .bind(this)}/>
                            <Btn
                                type="submit"
                                txt="确定"
                                href={this
                                .editVoteList
                                .bind(this)}/>
                        </div>
                    </div>
                </Content2>
            )
        }

        goBack() {
            closeSidePage()
            this
                .props
                .clearEditInfo({infoName: "voteInfo"})
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
                IsStart: parseInt(editInfo.voteInfo.IsStartindex)
            },
            _this = this

            if (sidePageInfo.status == "addVote") {
                TUI
                    .platform
                    .post("/Vote", jsonParam, function (result) {
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
                TUI
                    .platform
                    .put("/Vote/" + _id, jsonParam, function (result) {
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

        componentDidMount() {}
    }

    export default TUI._connect({
        editInfo: "formControlInfo.data",
        voteData: "voteList.data",
        sidePageInfo: "publicInfo.sidePageInfo",
        pageInfo: "publicInfo.pageInfo"
    }, EditVote)
