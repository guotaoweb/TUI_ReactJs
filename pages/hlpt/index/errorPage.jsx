import Remark from "Remark"

class ErrorPage extends React.Component {
  render() {
    return (
      <Remark type="warning" style={{width:"250px",height:"50px",lineHeight:"40px",marginTop:"18%"}}>
            没有权限,请联系管理员!
      </Remark>
    )
  }
}

export default TUI._connect({

}, ErrorPage)