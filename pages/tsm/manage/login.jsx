import Login from "Login"

class _login extends React.Component {
    render() {
        const {title} = this.props
        return (
            <Login title="长沙实验中学教师评分系统V3.0"  />
        )
    }
}

export default TUI._connect({
    textareaValue:"publicInfo.dialogInfo.txt"
}, _login)