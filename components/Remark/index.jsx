import '!style!css!postcss!sass!./style.scss'

import rightK from "!url!./img/right-k.png"
import leftK from "!url!./img/left-k.png"
import warning from "!url!./img/warning.png"

class Remark extends React.Component {
  render() {
    const {type} = this.props
    return (
      <div className={type=="warning"?"t-remark remark-warning":"t-remark remark-note"} style={this.props.style}>
        {type=="warning"?<img src={warning} className="warningk" />:<img src={leftK} className="leftk" />}
        {this.props.children}
        {type=="warning"?"":<img src={rightK}  className="rightk" />}
      </div>
    )
  }
}


export default Remark
