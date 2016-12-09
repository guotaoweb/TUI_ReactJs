import '!style!css!postcss!sass!./style.scss'

import FormControls from "FormControls"
import Dialog from "Dialog"
import Loading from "Loading"
import Btn from "Btn"
import logo from "!url!./img/logo.png"
import classes from "!url!./img/classes.png"

class Index extends React.Component {
  render() {
    const {children,related} = this.props

    let _classesRelated = []
    for (let i = 0; i < related.length; i++) {
      let $e = related[i]
      _classesRelated.push(<li><span className={i==0?"voting":""}>{i+1}</span>{$e.Course}【{$e.Teacher}】</li>)
    }

    return (
      <div>
        <div className="i-header">
          <img src={logo} />
          <span><img src={classes} />&nbsp;&nbsp;C1004</span>
        </div>
        <div className="i-container">
          <div className="i-c-top"></div>
          <div className="i-content">
            <div className="i-c-title">
              <h3>期末备考,是否断电</h3>
              <p>期末将近。学工部近期收到同学们的意见，希望在备考期末阶段，寝室晚上不断电。故特此调查学生相关诉求，以方便同学们期末备考～</p>
            </div>
            <div className="i-c-content">
              <div className="i-c-survy mustselect">
                <div>
                  <h3>1、对于期末是否断电,同学们有什么意见?</h3>
                  <FormControls ctrl="checkbox" label="A" labelTxt="." minWidth="0" labelWidth="40" txt="希望断电,保证正常休息" />
                  <FormControls ctrl="checkbox" label="B" labelTxt="." minWidth="0" labelWidth="40" txt="希望不断电,充分备考" />
                  <FormControls ctrl="checkbox" label="C" labelTxt="." minWidth="0" labelWidth="40" txt="无所谓" />
                </div>
                <b>此题为必答题,请填写答案</b>
              </div>
              <div className="i-c-survy">
                <div>
                  <h3>2、对于期末是否断电,同学们有什么意见?<b>*</b></h3>
                  <FormControls ctrl="radio" label="A" labelTxt="." minWidth="0" labelWidth="40" txt="希望断电,保证正常休息" />
                  <FormControls ctrl="radio" label="B" labelTxt="." minWidth="0" labelWidth="40" txt="希望不断电,充分备考" />
                  <FormControls ctrl="radio" label="C" labelTxt="." minWidth="0" labelWidth="40" txt="无所谓" />
                </div>
                <b>此题为必答题,请填写答案</b>
              </div>
              <div className="i-c-survy">
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
          <div className="i-footer">
            POWSER BY TSM
          </div>
        </div>

        <div className="i-list">
          <p>投票科目列表</p>
          <ul>
            {_classesRelated}
          </ul>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const {addClassesRelated,errorMsg} = this.props

    let classesId = TUI.fn.requestParam("id")
    TUI.platform.get("/ClassesRelated/" +classesId , function (result) {
      if (result.code == 0) {
        let _d = result.datas
        addClassesRelated(_d)



      }
      if (result.code == 1) {
        addClassesRelated([])
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
    })
  }


  getSurvy(courseId){
    
  }

}

export default TUI._connect({
  related:"classesList.related"
}, Index)
