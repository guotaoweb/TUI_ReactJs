import Content from "Content"
import Btn from "Btn"
import BreadNav from "BreadNav"


class _BreadNav extends React.Component {
    render() {
        const {breadNav} = this.props
        return (
            <Content txt="面包屑">
                <div className="t-content-padding">
                    <BreadNav data={breadNav} />
                    <br />
                    <div className="formControl-btn" style={{ marginLeft: "0px" }}>
                        <Btn type="add" txt="pushBreadnav" href={this._pushBreadNav.bind(this)} />
                        <Btn type="add" txt="backBreadnav" href={this._backBreadnav.bind(this)} />
                        <Btn type="add" txt="clearBreadnav" href={this._clearBreadnav.bind(this)} />
                    </div>
                </div>
            </Content>
        )
    }

    componentDidMount() {
        let _this = this
        _this.props.addBreadNav([{
            name: "breadNav组件"
        }, {
            name: "测试"
        }])



    }

    _pushBreadNav() {
        this.props.pushBreadNav({
            name: "最后一级"
        })
    }

    _backBreadnav() {
        this.props.backBreadNav()
    }

    _clearBreadnav() {
        this.props.clearBreadNav()
    }
}

export default TUI._connect({
    breadNav: "publicInfo.breadNav"
}, _BreadNav)