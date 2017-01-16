//组件
import Content from "Content"
import Btn from "Btn"
import FormControls from "FormControls"
import Remark from "Remark"
import { openDialog, closeDialog } from "Dialog"
import SidePage, { openSidePage, closeSidePage } from "SidePage"

class Print extends React.Component {
    render() {
        const {
            voteList,
            printStatus,
            votedClasses,
            votedCourse,
            classes,
            course
        } = this.props

        let _printPreview = "",
            _print = ""
        if (printStatus == 1) {
            _printPreview = this.printPreview.bind(this)
            _print = this.print.bind(this)
        }

        let _classesList = [],
            _courseList = []
        _classesList.push(
            <li key="voted_classes">
                <FormControls ctrl="checkbox" txt="全选" />
            </li>
        )
        _courseList.push(
            <li key="voted_course">
                <FormControls ctrl="checkbox" txt="全选" />
            </li>
        )
        for (var i = 0; i < votedClasses.length; i++) {
            var $classes = votedClasses[i];
            _classesList.push(
                <li key={"voted_classes" + i}>
                    <FormControls ctrl="checkbox" id={$classes.id} txt={$classes.name} clickFn={this.clickClasses.bind(this)} />
                </li>
            )
        }
        for (var i = 0; i < votedCourse.length; i++) {
            var $course = votedCourse[i];
            _courseList.push(
                <li key={"voted_course" + i}>
                    <FormControls ctrl="checkbox" id={$course.id} txt={$course.name} clickFn={this.clickCourse.bind(this)} />
                </li>
            )
        }

        return (
            <div>
                <Content
                    txt="打印服务"
                    editHref={_printPreview}
                    editTxt="打印预览"
                    addHref={_print}
                    addTxt="打印">
                    <div>
                        <div className="empty_msg" style={{ display: printStatus == 0 ? "block" : "none" }}>正在启动打印机控件,请稍候...</div>
                        <div className="empty_msg" style={{ display: printStatus == 2 ? "block" : "none" }}>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</div>
                        <div style={{ display: printStatus == 1 ? "block" : "none", padding: "10px" }}>
                            <Remark>
                                【打印服务】提供了在线打印的功能,以下为打印内容的过滤条件,打印过程中需要先生成在线打印内容,在根据填写的过滤条件
                                进行批量答应,整个过程需要点时间,请根据提示进行操作。<br />
                                <div style={{ color: "red" }}>
                                    1、投票表格为必选项<br />
                                    2、打印班级、打印科目、一次打印数量不选择/填写表示打印所有
                                </div>
                            </Remark><br />
                            <FormControls ctrl="select" options={voteList} label="投票表格" labelWidth="120" required="required" value="printInfo.VoteId" />
                            <FormControls ctrl="tip" label="打印班级" labelWidth="120" txt={classes} addFn={this.addClassesTip.bind(this)} deleteFn={this.removeClassesTip.bind(this)} /><br style={{ clear: "both" }} />
                            <FormControls ctrl="tip" label="打印科目" labelWidth="120" txt={course} addFn={this.addCourseTip.bind(this)} deleteFn={this.removeCourseTip.bind(this)} /><br style={{ clear: "both" }} />
                            <FormControls ctrl="input" label="显示数量" labelWidth="120" style={{ width: "60px" }} value="printInfo.Number" />
                        </div>
                    </div>
                </Content>
                <SidePage id="classesList" title="已投班级列表">
                    <div>
                        <ul style={{ margin: "5px" }}>{_classesList}</ul>
                    </div>
                </SidePage>
                <SidePage id="courseList" title="已投科目列表">
                    <div>
                        <ul style={{ margin: "5px" }}>{_courseList}</ul>
                    </div>
                </SidePage>
            </div>
        )
    }

    addClassesTip() {

        openSidePage(this, {
            id: "classesList",
            status: "classesList",
            width: "300px"
        })
        closeSidePage({
            id: "courseList"
        })

    }

    addCourseTip() {

        openSidePage(this, {
            id: "courseList",
            status: "classesList",
            width: "300px"
        })
        closeSidePage({
            id: "classesList"
        })

    }

    clickClasses(e) {
        let $classes = e.currentTarget,
            status = $classes.getAttribute("data-status"),
            id = $classes.getAttribute("data-id"),
            name = $classes.parentNode.innerText
        if (status == "selected") {
            this.props.addPrintClasses({ id: id, name: name })
        }
        else {
            this.props.removePrintClasses(id)
        }
    }

    removeClassesTip(id) {
        this.props.removePrintClasses(id)
    }

    clickCourse(e) {
        let $course = e.currentTarget,
            status = $course.getAttribute("data-status"),
            id = $course.getAttribute("data-id"),
            name = $course.parentNode.innerText
        if (status == "selected") {
            this.props.addPrintCourse({ id: id, name: name })
        }
        else {
            this.props.removePrintCourse(id)
        }
    }

    removeCourseTip(id) {
        this.props.removePrintCourse(id)
    }

    componentDidMount() {
        const {updatePrintStatus, addPrintVoteList, addPrintVotedClasses, addPrintVotedCourse,addEditInfo} = this.props
        if (TUI.fn.needCLodop()) {
            var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            var oscript = document.createElement("script");
            oscript.src = "http://localhost:8000/CLodopfuncs.js?priority=1";
            head.insertBefore(oscript, head.firstChild);

            //引用双端口(8000和18000）避免其中某个被占用：
            oscript = document.createElement("script");
            oscript.src = "http://localhost:18000/CLodopfuncs.js?priority=0";
            head.insertBefore(oscript, head.firstChild);
        };

        addEditInfo({
            infoName:"printInfo",
            VoteId:"",
            Number:0
        })

        setTimeout(function () {
            var LODOP = TUI.fn.getLodop();
            if (LODOP.VERSION) {
                updatePrintStatus(1)
            }
            else {
                updatePrintStatus(2)
            }
        }, 1000)

        let _url = "/Vote?pageIndex={0}&pageSize=10"
        TUI.platform.get(_url.replace("{0}", 1), function (result) {
            if (result.code == 0) {
                let _data = []
                for (var i = 0; i < result.datas.length; i++) {
                    var $d = result.datas[i];
                    _data.push({ name: $d.Name, id: $d.Id })
                }
                addPrintVoteList(_data)
            } else if (result.code == 1) {
                addPrintVoteList([])
            } else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        })

        TUI.platform.get("/VotedClasses?pageIndex=0&pageSize=100", function (result) {
            if (result.code == 0) {
                let _data = []
                for (var i = 0; i < result.datas.length; i++) {
                    var $d = result.datas[i]
                    _data.push({ name: $d.Name, id: $d.Id })
                }
                addPrintVotedClasses(_data)
            } else if (result.code == 1) {
                addPrintVotedClasses([])
            } else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        })

        TUI.platform.get("/VotedCourse?pageIndex=0&pageSize=100", function (result) {
            if (result.code == 0) {
                let _data = []
                for (var i = 0; i < result.datas.length; i++) {
                    var $d = result.datas[i]
                    _data.push({ name: $d.Name, id: $d.Id })
                }
   
                addPrintVotedCourse(_data)
            } else if (result.code == 1) {
                addPrintVotedCourse([])
            } else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        })
    }

    printPreview() {
        const {editInfo, classes, course} = this.props;
        if (this.props.editInfo.printInfo.VoteId) {
            var LODOP = TUI.fn.getLodop();
            console.info(editInfo)
            let voteId = editInfo.printInfo.VoteId,
                number = editInfo.printInfo.Number,
                classesId = [],
                courseId = []
            for (var i = 0; i < classes.length; i++) {
                var $classes = classes[i];
                classesId.push($classes.id)
            }
            for (var i = 0; i < course.length; i++) {
                var $course = course[i];
                courseId.push($course.id)
            }

          
           let _classesId = classesId.join(",")?classesId.join(","):"0"
           let _courseId = courseId.join(",")?courseId.join(","):"0"

           TUI.platform.get("/CourseOnlineDetail?voteId="+voteId+"&classesId="+_classesId+"&courseId="+_courseId, function (result) {
                if (result.code == 0) {
                    
                } else if (result.code == 1) {
                    addPrintVotedCourse([])
                } else {
                    errorMsg(TUI.ERROR_INFO[result.code]);
                }
            })
            // console.info(voteId)
            // console.info(classesId.join(","))
            // console.info(courseId.join(","))
            // console.info(number)
            console.info("打印预览")
        }
        else {
            openDialog(this, "投票表格为必选项")
        }
    }

    print() {
        var LODOP = TUI.fn.getLodop();
        console.info("打印")
    }
}


export default TUI._connect({
    voteList: "print.printVote",
    classes: "print.classes",
    course: "print.course",
    votedCourse: "print.votedCourse",
    votedClasses: "print.votedClasses",
    printStatus: "publicInfo.printStatus",
    editInfo: "formControlInfo.data"
}, Print)