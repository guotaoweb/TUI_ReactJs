import '!style!css!postcss!sass!./style.scss'

import FormControls, { clearCtrlStatus } from "FormControls"
import Dialog, { openDialog } from "Dialog"
import TipTool from "TipTool"
import Btn from "Btn"
import logo from "!url!./img/logo.png"
import { browserHistory } from 'react-router'

let VOTING_COURSE_ID = "",//投票科目ID
  GO_NEXT = true,//提交数据时,判断是否进行下一步的条件true/false
  VOTING_SURVY_ID = ""//投票问卷ID
class Vote extends React.Component {
  render() {
    const {
      classes,
      course,
      survy,
      operateStatus
    } = this.props

    let _course = []
    for (let i = 0; i < course.length; i++) {
      let $e = course[i]
      //科目状态 novote 未投,voting 正在投票,voted 已投
      let _voteStatus = "novote"
      if ($e.VoteStatus == "voting") {
        _voteStatus = "voting"
      }
      else if ($e.VoteStatus == "voted") {
        _voteStatus = "voted"
      }
      //科目列表
      _course.push(<li key={"courseList" + i}><span className={_voteStatus}>{i + 1}</span>{$e.Name}【{$e.Teacher}】</li>)
    }

    //问卷题目
    let _survy = []
    if (survy.length != 0) {
      _survy.push(<SurvyProblem key="survyProblem" survyData={survy.Survys} action={this} />)
    }

    //统计未投数量,当noVoteNumber为0或1的时候,按钮为提交,否则为下一科目
    let noVoteNumber = 0
    for (let i = 0; i < course.length; i++) {
      let $c = course[i]
      if ($c["VoteStatus"] == "novote" || $c["VoteStatus"] == "voting") {
        noVoteNumber += 1
        if (!VOTING_COURSE_ID) {
          VOTING_COURSE_ID = $c.Id
        }
      }
    }

    //提交状态
    let _btnTxt = (noVoteNumber == 1) ? "提交" : "下一科目"
    if (operateStatus == 1) {
      _btnTxt = "提交中..."
    }
    let _btn = []
    if (noVoteNumber > 0) {
      _btn.push(<Btn key="vote_btn" txt={_btnTxt} style={{ textAlign: "center" }} href={this.submitVote.bind(this)} />)
    }
    if(course.length>0 && noVoteNumber==0) {
      browserHistory.push(Config.ROOTPATH + "end")
    }
    //console.info(noVoteNumber)

    return (
      <div className="v-body">
        <div className="v-header">
          <img src={logo} />
        </div>
        <div className="v-container">
          <div className="v-c-top"></div>
          <div className="v-content">
            <div className="v-c-title">
              <h3>{classes.Vote}</h3>
              <p>{survy.Desp}</p>
            </div>
            <div className="v-c-content">
              {_survy}

              <br /><br />
              {_btn}
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
        <TipTool />
        <Dialog />
      </div>
    )
  }

  submitVote(e) {
    const {status, addVotedCourse, course, updateOperateStatus, operateStatus} = this.props

    if (operateStatus == 1) {
      return false
    }


    let $selectBox = document.getElementsByClassName("v-c-survy"),
      selectedIds = [],
      _this = this

    for (let i = 0; i < $selectBox.length; i++) {
      let $s = $selectBox[i],
        $selectObj = $s.getElementsByClassName("t-formControls"),
        _isSelected = false

      for (let j = 0; j < $selectObj.length; j++) {
        let $o = $selectObj[j].getElementsByTagName("div")[0]
        if ($o.getAttribute("data-status") == "selected") {
          _isSelected = true
          selectedIds.push({
            Id: $o.getAttribute("data-id")
          })
        }
      }
      //有选题未回答
      if (!_isSelected) {
        $s.setAttribute("class", $s.getAttribute("class") + " mustselect")
        GO_NEXT = false
      }
    }

    if (!GO_NEXT) {
      openDialog(this, "至少有一个选题未回答")
      return false
    }

    let jsonParam = {
      ClassesId: status.ClassesId,
      VoteId: status.VoteId,
      GradeId: status.GradeId,
      CourseId: VOTING_COURSE_ID,
      SurvyId: VOTING_SURVY_ID,
      Options: selectedIds
    }

    updateOperateStatus(1)
    TUI.platform.post("/Answer", jsonParam, function (result) {
      if (result.code == 0) {
        let _d = result.datas
        addVotedCourse(
          jsonParam.CourseId
        )
        //切换科目投票的时候,必须要将VOTING_COURSE_ID清除
        VOTING_COURSE_ID = ""
        GO_NEXT = true
        for (let i = 0; i < course.length; i++) {
          let $c = course[i]

          if ($c["VoteStatus"] == "voting") {
            //获取下一个问卷
            _this.getSurvy($c.Id)
            break
          }
        }
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
      updateOperateStatus(0)
    })


  }

  componentDidMount() {
    const {classes, addVotingCourse, errorMsg} = this.props
    let _this = this
    //获取投票班级投票列表
    TUI.platform.get("/VotingCourse/" + classes.Id, function (result) {
      if (result.code == 0) {
        let _d = result.datas
        for (let i = 0; i < _d.length; i++) {
          let $d = _d[i]
          if($d.VoteStatus=="novote"){
            $d["VoteStatus"] = "voting"
            break;
          }
          // if (i == 0) {
          //   $d["VoteStatus"] = "voting"
          // }
          // else {
          //   $d["VoteStatus"] = "novote"
          // }
        }
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
    const {addVotingSurvy, errorMsg} = this.props
    if (!courseId) { return false }

    TUI.platform.get("/SurvyByCourseId/" + courseId, function (result) {
      if (result.code == 0) {
        let _d = result.datas
        addVotingSurvy(_d)
        VOTING_SURVY_ID = _d.Id
        clearCtrlStatus()
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
  survy: "voting.survy",
  editInfo: "formControlInfo.data",
  status: "voting.status",
  operateStatus: "voting.operateStatus"
}, Vote)



class SurvyProblem extends React.Component {
  render() {
    const {survyData, action} = this.props

    let _survyProblem = []

    for (var i = 0; i < survyData.length; i++) {
      var $s = survyData[i]
      _survyProblem.push(
        <div className="v-c-survy" key={"survyProblem_" + i}>
          <div>
            <h3>{i + 1}、{$s.Name}<b style={{ fontWeight: "lighter", fontSize: "12px" }}>(必选)</b></h3>
            <SurvyOptions survyOptionsData={$s.Datas} i={i} action={action} type={$s.Type} parentId={$s.Id} />
          </div>
          <b>此题为必答题,请填写答案</b>
        </div>
      )
    }

    return (
      <div>
        {_survyProblem}
      </div>
    )
  }
}


class SurvyOptions extends React.Component {
  render() {
    const {survyOptionsData, i, action, type, parentId} = this.props

    let _survy = []
    if (survyOptionsData) {
      for (let j = 0; j < survyOptionsData.length; j++) {
        let $o = survyOptionsData[j],
          _type = this.props.type
        if (_type != "textarea") {
          let _val = this.NumSwitchChar(j + 1) + "." + $o.Name
          _survy.push(<FormControls key={"options_type" + j} groupName={"option_groupName"+i} id={$o.Id} minWidth="0" labelWidth="40" ctrl={_type} txt={_val} clickFn={this.clickFn.bind(this)} />)
        }
        else {
          _survy.push(<FormControls key={"options_type" + j} id={$o.Id} minWidth="0" labelWidth="40" ctrl={_type} value="" style={{ width: "430px" }} />)
        }
      }
    }

    return (
      <div>
        {_survy}
      </div>
    )
  }

  clickFn(e) {
    let _this = e.currentTarget
    _this.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("class", "v-c-survy")
    GO_NEXT = true
  }

  NumSwitchChar(num) {
    switch (num) {
      case 1: return "A"
      case 2: return "B"
      case 3: return "C"
      case 4: return "D"
      case 5: return "E"
      case 6: return "F"
      case 7: return "G"
      case 8: return "H"
      case 9: return "I"
      case 10: return "J"
      case 11: return "K"
      case 12: return "L"
      case 13: return "M"
      default: return "N"
    }
  }
}

class SurvyEmpty extends React.Component {
  render() {
    return (
      <div key={"survy_empty"} style={{
        padding: "10px",
        color: "#999",
        width: "100%",
        textAlign: "center",
        marginTop: "15%",
        fontSize: "20px"
      }}>
        <span>此处为问卷预览区域</span>
      </div>
    )
  }
}
