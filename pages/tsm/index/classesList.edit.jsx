import Content2 from "Content2"
import Btn from "Btn"
import FormControls from "FormControls"
import { openSidePage, closeSidePage } from "SidePage"


class EditClasses extends React.Component {
    render() {
        const {sidePageInfo, gradeList, courseList} = this.props
        let tabs = []

        if (sidePageInfo.status == "editClasses") {
            tabs.push({ name: "编辑班级信息", id: "item1" })
        }
        else {
            tabs.push({ name: "新增班级信息", id: "item2" })
        }

        let _gradeList = []
        for (let i = 0; i < gradeList.length; i++) {
            let $g = gradeList[i];
            _gradeList.push({
                name: $g.Name,
                id: $g.Id
            })
        }

        let courseInput = []
        for (let i = 0; i < courseList.length; i++) {
            let $c = courseList[i];
            courseInput.push(
                <FormControls
                    key={"course_" + i}
                    label={$c.Name}
                    ctrl="input"
                    type="select"
                    value={"classesInfo.CourseName" + i}
                    selectFn={this._selectFn.bind(this)}
                    bind={{ CourseId: $c.Id, ClassesId: sidePageInfo.gateWay ? sidePageInfo.gateWay.classesId : "" }}
                    />)
        }

        return (
            <div>
                <Content2 tabs={tabs}>
                    <div>
                        <FormControls label="班级名称" ctrl="input" value="classesInfo.Name" required="required" />
                        <FormControls label="班级人数" ctrl="input" value="classesInfo.Number" required="required" />
                        <FormControls label="所属年级" ctrl="select" options={_gradeList} value="classesInfo.GradeId" />
                        {courseInput}
                        <div className="formControl-btn">
                            <Btn type="cancel" txt="取消" href={this._goBack.bind(this)} />
                            <Btn type="submit" txt="确定" href={this.selectSave.bind(this)} />
                        </div>
                    </div>
                </Content2>
            </div>
        )
    }

    _selectFn(bind) {
        const {addTeacherList, errorMsg} = this.props
        let _this = this

        TUI.platform.get("/TeacherInCourse/" + bind.CourseId, function(result) {
            if (result.code == 0) {
                addTeacherList(_addData)
            }
            if (result.code == 1) {
                addTeacherList([])
            }
            else {
                errorMsg(config.ERROR_INFO[result.code]);
            }
            openSidePage(_this, {
                id: "selectTeacher",
                status: "selectTeacher",
                width: "400",
                gateWay: {
                    Id: bind.CourseId
                }
            })
        })


    }

    selectSave() {
        const {sidePageInfo, updateEditInfo} = this.props
        let $radio = document.getElementsByClassName("t-c_radio")
        let teacherId = []
        for (var i = 0; i < $radio.length; i++) {
            var $r = $radio[i];
            if ($r.getAttribute("data-status") == "selected") {
                let _info = {
                    infoName: "InputInfo1"
                }
                _info[sidePageInfo.gateWay.Id] = $r.getAttribute("data-value")
                _info["age2"] = $r.innerText
                updateEditInfo(_info)
            }
        }
        closeSidePage()
        console.info(this.props.editInfo)
    }

    editClassesInfo() {
        const {editInfo, sidePageInfo, successMsg, errorMsg, updateClassesList, addClassesList} = this.props

        let _this = this,
            jsonParam = {
                Name: editInfo.classesInfo.Name,
                Number: editInfo.classesInfo.Number,
                GradeId: editInfo.classesInfo.GradeId,
                ClassesRelated: []
            }

        if (sidePageInfo.status == "addClasses") {
            TUI.platform.post("/Classes", jsonParam, function(result) {
                if (result.code == 0) {
                    successMsg("新增成功")
                    jsonParam["Id"] = result.datas
                    addClassesList(_addData)
                }
                else {
                    errorMsg(config.ERROR_INFO[result.code]);
                }
                _this._goBack()
            })
        }
        else {
            let _id = editInfo.classesInfo.Id
            TUI.platform.put("/Classes/" + _id, jsonParam, function(result) {
                if (result.code == 0) {
                    jsonParam["Id"] = _id
                    jsonParam["Grade"] = editInfo.classesInfo.GradeIdName

                    successMsg("编辑成功")
                    updateClassesList(jsonParam)
                }
                else {
                    errorMsg(config.ERROR_INFO[result.code]);
                }
                _this._goBack()
            })
        }
    }

    _goBack() {
        const {clearEditInfo} = this.props
        clearEditInfo({
            infoName: "classesInfo"
        })
        closeSidePage({ id: "editClass" })
    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo",
    editInfo: "formControlInfo.data",
    gradeList: "gradeList.list",
    courseList: "courseList.list"
}, EditClasses)