//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import FormControls from "FormControls"
import Remark from "Remark"
import { openDialog, closeDialog } from "Dialog"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import uncheck from "!url!../../../components/FormControls/img/uncheckbox.png"
import check from "!url!../../../components/FormControls/img/checkbox.png"

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
                <FormControls ctrl="checkbox" txt="全选" clickFn={this.allClasses.bind(this)} />
            </li>
        )
        _courseList.push(
            <li key="voted_course">
                <FormControls ctrl="checkbox" txt="全选" clickFn={this.allCourse.bind(this)} />
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

        //表格


        return (
            <div>
                <Content
                    txt="在线打印"
                    editHref={_printPreview}
                    editTxt="打印"
                    editType="print"
                    >
                    <div>
                        <div className="empty_msg" style={{ display: printStatus == 0 ? "block" : "none" }}>正在启动打印机控件,请稍候...</div>
                        <div className="empty_msg" style={{ display: printStatus == 2 ? "block" : "none" }}>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</div>
                        <div style={{ display: printStatus == 1 ? "block" : "none", padding: "10px" }}>
                            <Remark>
                                【打印服务】提供了在线打印的功能,以下为打印内容的过滤条件,打印过程中需要先生成在线打印内容,在根据填写的过滤条件
                                进行批量答应,整个过程需要点时间,请根据提示进行操作。<br />
                                <div style={{ color: "red" }}>
                                    1、投票表格为必选项<br />
                                    2、打印班级、打印科目未填写表示打印所有<br />
                                    3、显示数量默认为3,表示一页打印纸中包含至多3个班级<br />
                                </div>
                            </Remark><br />
                            <FormControls ctrl="select" options={voteList} label="投票表格" labelWidth="120" required="required" value="printInfo.VoteId" />
                            <FormControls ctrl="tip" label="打印班级" labelWidth="120" txt={classes} addFn={this.addClassesTip.bind(this)} deleteFn={this.removeClassesTip.bind(this)} /><br style={{ clear: "both" }} />
                            <FormControls ctrl="tip" label="打印科目" labelWidth="120" txt={course} addFn={this.addCourseTip.bind(this)} deleteFn={this.removeCourseTip.bind(this)} /><br style={{ clear: "both" }} />
                            <FormControls ctrl="input" label="显示数量" labelWidth="120" style={{ width: "60px" }} placeholder="3" value="printInfo.Number" />
                        </div>
                    </div>
                </Content>
                <SidePage id="classesList" title="已投班级列表">
                    <div className="classeslist">
                        <ul style={{ margin: "5px" }}>{_classesList}</ul>
                    </div>
                </SidePage>
                <SidePage id="courseList" title="已投科目列表">
                    <div className="courselist">
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

    allClasses(e) {
        let $classes = e.currentTarget,
            status = $classes.getAttribute("data-status"),
            classesList = document.getElementsByClassName("classeslist")[0].getElementsByClassName("t-c_checkbox")
        if (status == "selected") {
            for (let i = 1; i < classesList.length; i++) {
                let $c = classesList[i]
                let id = $c.getAttribute("data-id"),
                    name = $c.parentNode.innerText,
                    $img = $c.getElementsByTagName("img")[0]
                this.props.addPrintClasses({ id: id, name: name })
                $img.setAttribute("src", check)
                $img.parentNode.setAttribute("data-status", "selected")
            }
        }
        else {
            for (let i = 1; i < classesList.length; i++) {
                let $c = classesList[i],
                    id = $c.getAttribute("data-id"),
                    $img = $c.getElementsByTagName("img")[0]
                this.props.removePrintClasses(id)
                $img.setAttribute("src", uncheck)
                $img.parentNode.setAttribute("data-status", "unselect")
            }
        }
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
        let classesList = document.getElementsByClassName("classeslist")[0].getElementsByClassName("t-c_checkbox")
        for (let i = 1; i < classesList.length; i++) {
            let $c = classesList[i],
                _id = $c.getAttribute("data-id"),
                $img = $c.getElementsByTagName("img")[0]
            if (id == _id) {
                $img.setAttribute("src", uncheck)
                $img.parentNode.setAttribute("data-status", "unselect")
            }
        }
    }

    allCourse(e) {
        let $course = e.currentTarget,
            status = $course.getAttribute("data-status"),
            courseList = document.getElementsByClassName("courselist")[0].getElementsByClassName("t-c_checkbox")
        if (status == "selected") {
            for (let i = 1; i < courseList.length; i++) {
                let $c = courseList[i]
                let id = $c.getAttribute("data-id"),
                    name = $c.parentNode.innerText,
                    $img = $c.getElementsByTagName("img")[0]
                this.props.addPrintCourse({ id: id, name: name })
                $img.setAttribute("src", check)
                $img.parentNode.setAttribute("data-status", "selected")
            }
        }
        else {
            for (let i = 1; i < courseList.length; i++) {
                let $c = courseList[i],
                    id = $c.getAttribute("data-id"),
                    $img = $c.getElementsByTagName("img")[0]
                this.props.removePrintCourse(id)
                $img.setAttribute("src", uncheck)
                $img.parentNode.setAttribute("data-status", "unselect")
            }
        }
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
        let courseList = document.getElementsByClassName("courselist")[0].getElementsByClassName("t-c_checkbox")
        for (let i = 1; i < courseList.length; i++) {
            let $c = courseList[i],
                _id = $c.getAttribute("data-id"),
                $img = $c.getElementsByTagName("img")[0]
            if (id == _id) {
                $img.setAttribute("src", uncheck)
                $img.parentNode.setAttribute("data-status", "unselect")
            }
        }
    }

    componentDidMount() {
        const {updatePrintStatus, addPrintVoteList, addPrintVotedClasses, addPrintVotedCourse, addEditInfo, addBreadNav} = this.props
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

        addBreadNav({ name: "在线打印" })

        addEditInfo({
            infoName: "printInfo",
            VoteId: "",
            Number: 0
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
        let _this = this
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


            let _classesId = classesId.join(",") ? classesId.join(",") : "0"
            let _courseId = courseId.join(",") ? courseId.join(",") : "0"
            openContentLoading()
            TUI.platform.get("/CourseOnlineDetail?voteId=" + voteId + "&classesId=" + _classesId + "&courseId=" + _courseId, function (result) {
                if (result.code == 0) {
                    _this.generateTable(result.datas, LODOP, number < 3 ? 3 : number)
                } else if (result.code == 1) {
                    addPrintVotedCourse([])
                    openDialog(_this, "未匹配到任何数据")
                } else {
                    errorMsg(TUI.ERROR_INFO[result.code]);
                }
                closeContentLoading()
            })
            // console.info(voteId)
            // console.info(classesId.join(","))
            // console.info(courseId.join(","))
            // console.info(number)
            //console.info("打印预览")

        }
        else {
            openDialog(this, "投票表格为必选项")
        }
    }

    print() {
        var LODOP = TUI.fn.getLodop();
        console.info("打印")
    }

    generateTable(html, LODOP, number) {
        let strHtml = "<table  border='0' width='100%'  cellspacing='0' style='border-collapse:collapse' bordercolor='#000000'>"

        //strHtml += "<tr><td><table border='1' width='100%' style='border-collapse:collapse' bordercolor='#000000'><tr><td>测试1</td></tr></table></td></tr>"
        //strHtml += "<tr><td><table border='1' width='100%' style='border-collapse:collapse' bordercolor='#000000'><tr><td>测试2</td></tr></table></td></tr>"


        let _title = ""
        var _header = new Array()
        var _temp = new Array()
        for (let m = 0; m < html.length; m++) {
            var _header_ = new Array()
            _title = html[m].VoteName

            if (_temp.join(",").indexOf(html[m].ClassesName + "_" + html[m].CourseName) < 0) {
                var _header_a = new Array()
                _header_a.push("问卷内容")
                _header_a.push("")
                _header_.push(_header_a)
                _temp.push("问卷内容_0")

                var _header_0 = new Array()
                _header_0.push(html[m].ClassesName)
                _header_0.push(html[m].TeacherName + "(" + html[m].CourseName + ")")
                _header_.push(_header_0)
                _temp.push(html[m].ClassesName + "_" + html[m].CourseName)

                for (let n = 0; n < html.length; n++) {
                    var _header_1 = new Array()
                    if (html[m].ClassesName != html[n].ClassesName && html[m].CourseName == html[n].CourseName) {
                        _header_1.push(html[n].ClassesName)
                        _header_1.push(html[n].TeacherName + "(" + html[n].CourseName + ")")
                        _header_.push(_header_1)
                        _temp.push(html[n].ClassesName + "_" + html[n].CourseName)
                    }
                }
            }
            if (_header_.length > 0) {
                _header.push(_header_)
            }
        }

        //根据number分页
        for (let j = 0; j < _header.length; j++) {
            let $h = _header[j]
            let _h = ""
            for (let i = 0; i < $h.length; i++) {
                if (i - 1 >= number) {
                    if ((i - 1) % number == 0) {
                        _h = new Array()
                        _h.push($h[0])
                        _h.push($h[i])
                    }
                    else {
                        _h.push($h[i])
                        //$h.slice(i,1)
                    }
                }
            }
            if (_h.length > 0) {
                _header.push(_h)
            }
        }
        // console.info("==>" + number)
        // console.info(_header)

        var _header0 = new Array()
        var _temp0 = new Array()
        for (let m = 0; m < html.length; m++) {
            var _header_ = new Array()

            if (_temp0.join(",").indexOf(html[m].ClassesName + "_" + html[m].CourseName) < 0) {
                for (var i = 0; i < html[m].Survy.length; i++) {
                    var _header_0 = new Array()
                    var $s = html[m].Survy[i];

                    _header_0.push($s.Name)
                    _header_0.push("投票人数")
                    _header_0.push("占比")
                    _header_0.push("最高")
                    _header_0.push("最低")
                    _temp0.push(html[m].ClassesName + "_" + html[m].CourseName)

                    for (let n = 0; n < html.length; n++) {
                        if (html[m].ClassesName != html[n].ClassesName && html[m].CourseName == html[n].CourseName) {
                            for (var j = 0; j < html[n].Survy.length; j++) {
                                var $s0 = html[n].Survy[j];
                                if ($s.Id == $s0.Id) {
                                    _header_0.push("投票人数")
                                    _header_0.push("占比")
                                    _header_0.push("最高")
                                    _header_0.push("最低")
                                    _temp0.push(html[n].ClassesName + "_" + html[n].CourseName)
                                }
                            }

                        }
                    }
                    _header_.push(_header_0)
                    for (var r = 0; r < $s.Datas.length; r++) {
                        var $d = $s.Datas[r];
                        var _header_1 = new Array()

                        _header_1.push($d.Name)
                        _header_1.push($d.Number + "/" + $d.Count)
                        _header_1.push($d.Percent)
                        _header_1.push($d.MaxPercent)
                        _header_1.push($d.MinPercent)
                        _temp0.push(html[m].ClassesName + "_" + html[m].CourseName)

                        for (let n = 0; n < html.length; n++) {
                            if (html[m].ClassesName != html[n].ClassesName && html[m].CourseName == html[n].CourseName) {
                                for (var j = 0; j < html[n].Survy.length; j++) {
                                    var $s0 = html[n].Survy[j];

                                    for (var t = 0; t < $s0.Datas.length; t++) {
                                        var $t0 = $s0.Datas[t];
                                        if ($d.Id == $t0.Id) {

                                            _header_1.push($t0.Number + "/" + $t0.Count)
                                            _header_1.push($t0.Percent)
                                            _header_1.push($t0.MaxPercent)
                                            _header_1.push($t0.MinPercent)
                                        }
                                    }

                                    _temp0.push(html[n].ClassesName + "_" + html[n].CourseName)

                                }

                            }
                        }
                        _header_.push(_header_1)
                    }



                }
            }
            if (_header_.length > 0) {
                _header0.push(_header_)
            }
        }

        //根据number分页
        for (let j = 0; j < _header0.length; j++) {
            let $h = _header0[j]
            let _h0 = new Array()
            for (let i = 0; i < $h.length; i++) {
                let $hh = $h[i]
                let _h1 = ""
                for (let k = 0; k < $hh.length; k++) {
                    if (k - 1 >= number * 4) {
                        if ((k - 1) % 4 == 0) {
                            _h1 = new Array()
                            _h1.push($hh[0])
                            _h1.push($hh[k])
                        }
                        else {
                            _h1.push($hh[k])
                        }
                    }
                }
                if (_h1.length > 0) {
                    _h0.push(_h1)
                }
            }
            if (_h0.length > 0) {
                _header0.push(_h0)
            }
        }
        // console.info("==>")
        // console.info(_header0)


        for (var i = 0; i < _header.length; i++) {
            var $h = _header[i];
            strHtml += "<tr><td>"
            strHtml += "<table border='1' width='100%' style='border-collapse:collapse' bordercolor='#000000'>"
            strHtml += "<tr><td colspan='" + 1 + ($h.length - 1) * 4 + "' style='text-align:center;height:35px;line-height:30px;font-weight:bold;font-size:21px;'>" + _title + "</td></tr>"

            //内容详情
            strHtml += "<tr>"
            for (let j = 0; j < $h.length; j++) {
                let $hh = $h[j];
                if (j <= number) {
                    if (j == 0) {
                        strHtml += "<td rowspan='2' style='text-align:center;font-weight:bold;'>" + $hh[0] + "</td>"
                    }
                    else {
                        strHtml += "<td style='text-align:center;font-weight:bold;' colspan='4'>" + $hh[0] + "</td>"
                    }
                }
            }
            strHtml += "</tr>"

            //班级列表
            strHtml += "<tr>"
            for (let j = 0; j < $h.length; j++) {
                let $hh = $h[j]
                if (j <= number) {
                    if ($hh[1]) {
                        strHtml += "<td style='text-align:center;font-weight:bold;' colspan='4'>" + $hh[1] + "</td>"
                    }
                }
            }
            strHtml += "</tr>"

            let _survyNo = 0,
                _optionNo = 0
            for (var j = 0; j < _header0[i].length; j++) {
                var $hhh = _header0[i][j];
                strHtml += "<tr>"

                for (var m = 0; m < $hhh.length; m++) {
                    if (m <= number * 4) {
                        if (m == 0) {
                            let _no = ""
                            if ($hhh[m + 1] == "投票人数") {
                                _survyNo++
                                _optionNo = 0
                                _no = _survyNo
                            }
                            else {
                                _optionNo++
                                _no = this.NumberToLetter(_optionNo)
                            }
                            strHtml += "<td style='text-align:left;padding-left:10px;width:" + (m == 0 ? "250px;" : "100px;") + ";font-weight:" + (isNaN(parseInt(_no)) ? "lighter;" : "bold;") + "'>" + _no + "、" + $hhh[m] + "</td>"
                        }
                        else {
                            if (j > 0 && ($hhh[m] == "投票人数" || $hhh[m] == "占比" || $hhh[m] == "最高" || $hhh[m] == "最低")) {
                                strHtml += "<td></td>"
                            }
                            else if (_optionNo > 1 && ((m - 3) % 3 == 0 || (m - 4) % 4 == 0)) {
                                strHtml += "<td></td>"
                            }
                            else {
                                strHtml += "<td style='text-align:center;width:" + (m == 0 ? "250px;" : "100px;") + "'>" + $hhh[m] + "</td>"
                            }
                        }
                    }
                }
                strHtml += "</tr>"
            }

            strHtml += "</table>"
            strHtml += "</td></tr>"
        }
        strHtml += "</table>"
        //console.info(strHtml)
        LODOP.PRINT_INIT(_title);
        LODOP.ADD_PRINT_TABLE(10, 10, "98%", 1, strHtml);
        LODOP.PREVIEW();
    }

    NumberToLetter(index) {
        let letter = ",A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
        let returnLetter = "";
        for (let i = 0; i < letter.split(',').length; i++) {
            if (index == i) {
                returnLetter = letter.split(',')[i];
            }
        }
        return returnLetter
    }
}


export default TUI._connect({
    voteList: "print.printVote",
    classes: "print.classes",
    course: "print.course",
    votedCourse: "print.votedCourse",
    votedClasses: "print.votedClasses",
    printStatus: "publicInfo.printStatus",
    editInfo: "formControlInfo.data",
    printDetail: "print.printDetai"
}, Print)