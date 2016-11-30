import '!style!css!postcss!sass!./style.scss'

class Remark extends React.Component {
  render() {
    return (
      <div className="t-remark" style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}


export default Remark
