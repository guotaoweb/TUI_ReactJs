import '!style!css!postcss!sass!./style.scss'

class BreadNav extends React.Component {
  render() {
    const {breadNav} = this.props
    let _breadNav = []
    for (var i = 0; i < breadNav.length; i++) {
      var $b = breadNav[i];
      _breadNav.push(<li key={"breadNav_" + i}>{$b.name}</li>)
    }
    return (
        <ul className="t-breadnav" style={this.props.style}>
          {_breadNav}
        </ul>
    )
  }

  componentDidUpdate() {

  }
}


export default TUI._connect({ breadNav: "publicInfo.breadNav" }, BreadNav)
