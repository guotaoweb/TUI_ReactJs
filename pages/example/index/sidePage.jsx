import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import SidePage, { openSidePage, closeSidePage,openSidePageLoading,closeSidePageLoading } from "SidePage"
import Remark from 'Remark'

class _SidePage extends React.Component {
    render() {
        return (
            <div>
                <Content txt="SidePage">
                <br/>
                    <Btn type="add" txt="展开sidePage【全屏】" href={this._openSidePage1.bind(this)} style={{ padding: "10px" }} /><br/>
                    <Btn type="add" txt="展开sidePage【自定义展开距离】" href={this._openSidePage4.bind(this)} style={{ padding: "10px" }} /><br/>
                    <Btn type="add" txt="展开sidePage【多内容】" href={this._openSidePage2.bind(this)} style={{ padding: "10px" }} /><br/>
                    <Btn type="add" txt="展开sidePage【多任务】" href={this._openSidePage3.bind(this)} style={{ padding: "10px" }} /><br/>
                    <br/><br/>
                    <Remark type="warning">区分【多内容】和【多任务】的区别~可以再单击【自定义展开距离】后,分别单击【多内容】和【多任务】后看效果
                    区分【多内容】和【多任务】的区别~可以再单击【自定义展开距离】后,分别单击【多内容】和【多任务】后看效果
                    </Remark>
                    <Remark type="note">区分【多内容】和【多任务】的区别~可以再单击【自定义展开距离】后,分别单击【多内容】和【多任务】后看效果
                    区分【多内容】和【多任务】的区别~可以再单击【自定义展开距离】后,分别单击【多内容】和【多任务】后看效果
                    </Remark>
                </Content>
                <SidePage id="SidePageOne">
                    <div style={{ color: "white" }}>
                        <Btn txt="返回" width="70" style={{ padding: "10px", margin: "5px" }} href={closeSidePage} />
                        
                        这是SidePage1的侧边内容
                    </div>
                    <div>
                        <Btn txt="返回" width="70" style={{ padding: "10px", margin: "5px" }} href={closeSidePage} />
                        <Btn txt="加载提示" width="70" style={{ padding: "10px", margin: "5px" }} href={this._openSidePageLoading.bind(this)} />
                        这是SidePage1的内容
                    </div>
                </SidePage>
                <SidePage id="SidePageTwo">
                    <div style={{ color: "white" }}>
                        <Btn txt="返回" width="70" style={{ padding: "10px", margin: "5px" }} href={this.closeSidePage1.bind(this)} />
                        这是SidePage2的侧边内容
                    </div>
                    <div>
                        <Btn txt="返回" width="70" style={{ padding: "10px", margin: "5px" }} href={this.closeSidePage1.bind(this)} />
                        这是SidePage2的内容
                    </div>
                </SidePage>
            </div>
        )
    }

    _openSidePage1() {
        openContentLoading()
        let _this = this
        setTimeout(function () {
            openSidePage(_this, {
                status: "addTeam"
            })

            closeContentLoading()
        }, 1000)
    }
    _openSidePage4() {
        openSidePage(this, {
            status: "addTeam",
            width: "500"
        })
    }
    _openSidePage2() {
        openSidePage(this, {
            status: "addTeam",
            type: 1
        })
    }
    _openSidePage3() {
        openSidePage(this, {
            status: "addTeam",
            type: 1,
            id: "SidePageTwo"
        })
    }

    closeSidePage1() {
        closeSidePage({
            id: "SidePageTwo"
        })
    }

    _openSidePageLoading(){
        openSidePageLoading()
        setTimeout(function(){
            closeSidePageLoading()
        },1000)
    }
}

export default TUI._connect({

}, _SidePage)