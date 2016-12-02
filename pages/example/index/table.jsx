import Content from "Content"
import Table from "Table"
import Pager from "Pager"
import { openDialog } from "Dialog"
import SidePage, { openSidePage } from "SidePage"
import Btn from "Btn"

class TablePage extends React.Component {
    render() {
        let _this = this
        const {list} = _this.props

        let tblContent = {
            "thead": { "name1": "序号", "name2": "字段一", "name3": "字段二", "name4": "字段三", "name5": "操作" },
            "tbody": []
        }

        for (var index = 0; index < list.length; index++) {
            let $t = list[index]
            tblContent.tbody.push({
                "value1": index + 1,
                "value2": "1",
                "value3": "2",
                "value4": $t.name,
                "fns": [{
                    "name": "编辑",
                    "fn": function () {
                        openDialog(_this, "这是编辑按钮")
                    }
                }, {
                    "name": "删除",
                    "fn": function () {
                        openDialog(_this, "这是删除按钮")
                    }
                }]
            })
        }
        //     <Btn txt="修改Table内容(无效果)" href={this.editTableContent2.bind(this)} />
        return (
            <div>
                <Content txt="Table表格">
                    <div className="t-content-padding">
                        <div className="formControl-btn" style={{ margin: "5px" }} >
                            <Btn txt="多表格" href={this.multyTable.bind(this)} />
                            <Btn txt="修改Table内容" href={this.editTableContent1.bind(this)} />

                        </div><br /><br />
                        <Table id="table1" tblContent={tblContent} width="50,200,0,0,180" />
                    </div>
                </Content>
                <SidePage id="tableSidePage" title="多表格测试">
                    <div>
                        <Table id="table2" num="6" tblContent={tblContent} width="50,200,0,0,180" />
                    </div>
                </SidePage>
            </div>
        )
    }

    multyTable() {
        openSidePage(this, {
            status: "multyTable",
            id: "tableSidePage"
        })
    }

    editTableContent1() {
        this.props.updateTableData({
            name: "这里被修改了,第一次"
        })
        this.props.refreshTable()
    }
    editTableContent2() {
        this.props.updateTableData({
            name: "这里被修改了,第二次"
        })

    }

    componentDidMount() {
        this.props.addTableData([{
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }, {
            name: "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,"
        }])
    }
}

export default TUI._connect({
    list: "tableList.data"
}, TablePage)