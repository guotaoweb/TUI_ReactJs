import Login from "Login"

class _login extends React.Component {
    render() {
        const {title} = this.props
        return (
            <Login title="TSM"  />
        )
    }
}

export default TUI._connect({
    textareaValue:"publicInfo.dialogInfo.txt"
}, _login)