import '!style!css!postcss!sass!./style.scss'

import FormControls from "FormControls"
import Dialog from "Dialog"
import Loading from "Loading"
import Btn from "Btn"
import logo from "!url!./img/logo.png"


class Index extends React.Component {
  render() {
    const {
      classes,
      course
    } = this.props

    let _course = []
    for (let i = 0; i < course.length; i++) {
      let $e = course[i]
      _course.push(<li><span className={i == 0 ? "voting" : ""}>{i + 1}</span>{$e.Name}【{$e.Teacher}】</li>)
    }

    return (
      <div>
        <div className="v-header">
          <img src={logo} />
        </div>
        <div className="v-container">
          <div className="v-c-top"></div>
          <div className="v-content">
            <div className="v-c-title">
              <h3>{classes.Vote}</h3>
              <p>期末将近。学工部近期收到同学们的意见，希望在备考期末阶段，寝室晚上不断电。故特此调查学生相关诉求，以方便同学们期末备考～</p>
            </div>
            <div className="v-c-content">
              <div className="v-c-survy mustselect">
                <div>
                  <h3>1、对于期末是否断电,同学们有什么意见?</h3>
                  <FormControls ctrl="checkbox" label="A" labelTxt="." minWidth="0" labelWidth="40" txt="希望断电,保证正常休息" />
                  <FormControls ctrl="checkbox" label="B" labelTxt="." minWidth="0" labelWidth="40" txt="希望不断电,充分备考" />
                  <FormControls ctrl="checkbox" label="C" labelTxt="." minWidth="0" labelWidth="40" txt="无所谓" />
                </div>
                <b>此题为必答题,请填写答案</b>
              </div>
              <div className="v-c-survy">
                <div>
                  <h3>2、对于期末是否断电,同学们有什么意见?<b>*</b></h3>
                  <FormControls ctrl="radio" label="A" labelTxt="." minWidth="0" labelWidth="40" txt="希望断电,保证正常休息" />
                  <FormControls ctrl="radio" label="B" labelTxt="." minWidth="0" labelWidth="40" txt="希望不断电,充分备考" />
                  <FormControls ctrl="radio" label="C" labelTxt="." minWidth="0" labelWidth="40" txt="无所谓" />
                </div>
                <b>此题为必答题,请填写答案</b>
              </div>
              <div className="v-c-survy">
                <div>
                  <h3>2、对于期末是否断电,同学们有什么意见?<b>*</b></h3>
                  <FormControls ctrl="radio" label="A" labelTxt="." minWidth="0" labelWidth="40" txt="希望断电,保证正常休息" />
                  <FormControls ctrl="radio" label="B" labelTxt="." minWidth="0" labelWidth="40" txt="希望不断电,充分备考" />
                  <FormControls ctrl="radio" label="C" labelTxt="." minWidth="0" labelWidth="40" txt="无所谓" />
                </div>
                <b>此题为必答题,请填写答案</b>
              </div>
              <br /><br />
              <Btn txt="下一科目" style={{ margin: "auto", width: "100px" }} />
              <br /><br />
            </div>

          </div>
          <div className="v-footer">
            POWSER BY TSM
          </div>
        </div>

        <div className="v-list">
          <p>{classes.GradeShortName}{classes.Name}的投票科目列表</p>
          <ul>
            {_course}
          </ul>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const {classes, addVotingCourse,addVotingSurvy, errorMsg} = this.props
    let _this = this
    //获取投票班级投票列表
    TUI.platform.get("/VotingCourse/" + classes.Id, function (result) {
      if (result.code == 0) {
        let _d = result.datas
        addVotingCourse(_d)
        _this.getSurvy(_d[0].Id)
      }
      if (result.code == 1) {
        addVotingCourse([])
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
    })
  }


  getSurvy(courseId) {
    TUI.platform.get("/SurvyByCourseId/" + courseId, function (result) {
      if (result.code == 0) {
        let _d = result.datas
        addVotingSurvy(_d)
      }
      if (result.code == 1) {
        addVotingSurvy([])
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
    })
  }

}

export default TUI._connect({
  classes: "voting.classes",
  course: "voting.course",
  survy: "voting.survy"
}, Index)
