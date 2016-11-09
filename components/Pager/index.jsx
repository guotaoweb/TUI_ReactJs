import '!style!css!postcss!sass!./style.scss'

import prev from "!url!./img/prev.png"
import next from "!url!./img/next.png"
import first from "!url!./img/first.png"
import last from "!url!./img/last.png"

//Math.ceil 向上舍入
//Math.floor 向下舍入
import loading from "!url!./img/loading.png"

class Pager extends React.Component {
    render() {
        const {_pageInfo, pageLoadStatus, id} = this.props

        let _id = id ? id : "index"
        let pagerLi = []
        let pagerLength //默认分页按钮的数量
        let pageCIndex = 0
        let pageSize = 0
        let pageSum = 0
        let loadStatusImg
        if (pageLoadStatus == 0) {
            loadStatusImg = <div className="pager-loading"><img src={loading} /></div>
        }

        if (_pageInfo[_id]) {
            let pageInfo = _pageInfo[_id]
            pageCIndex = pageInfo.index
            pageSize = pageInfo.size
            pageSum = pageInfo.sum


            let _pageSum = Math.ceil(pageSum / pageSize)//总页数
            let _pageSize = parseInt(5) //每页的数量

            if (_pageSum > Math.ceil(pageCIndex / _pageSize) * _pageSize) {
                pagerLength = Math.ceil(pageCIndex / _pageSize) * _pageSize
            }
            else {
                pagerLength = _pageSum
            }

            if (_pageSum > _pageSize) {
                pagerLi.push(<li key="pageli_prev" className='prev' onClick={this.clickPrev.bind(this)}><a href='javascript:void(0);'><img src={prev} /></a></li>)
            }

            //默认显示的分页按钮数量
            let initPage
            if (Math.floor(pageCIndex / _pageSize) * _pageSize < pageCIndex / _pageSize * _pageSize) {
                initPage = Math.floor(pageCIndex / _pageSize) * _pageSize
            }
            else {
                initPage = (Math.floor(pageCIndex / _pageSize) - 1) * _pageSize
            }

            for (var index = initPage; index < pagerLength; index++) {
                pagerLi.push(<li key={"pagerli" + index} style={{ backgroundColor: pageCIndex - 1 == index ? "#ebebeb" : "white" }} className='pagerli' onClick={this.clickpage.bind(this)}><a href='javascript:void(0);'>{index + 1}</a></li>)
            }

            if (_pageSum > _pageSize) {
                pagerLi.push(<li key="pageli_next" className='next' onClick={this.clickNext.bind(this)}><a href='javascript:void(0);'><img src={next} /></a></li>)
            }


        }
        else {
            pageCIndex = 1
            pageSize = 5
            pageSum = 1
        }


        return (
            <div style={{ display: (pagerLength == 1 ? "none" : "block") }}>
                <div className="t-pager" style={this.props.style}>
                    <span>总条数: {pageSum} </span>{loadStatusImg}
                    <ul>
                        <li className='first' onClick={this.clickFirst.bind(this)}><a href='javascript:void(0);'><img src={first} /></a></li>
                        {pagerLi}
                        <li className='last' onClick={this.clickLast.bind(this)}><a href='javascript:void(0);'><img src={last} /></a></li>
                    </ul>
                </div>
            </div>
        )

    }

    clickpage(e) {
        const {fn, updatePageInfo, _pageInfo, pageLoading, pageLoadComplete,id} = this.props
        let _id = id ? id : "index"

        let pageInfo = _pageInfo[_id]
        let obj = e.currentTarget
        if (obj.innerText == pageInfo.index) {
            return false
        }
        for (var index = 0; index < document.getElementsByClassName("pagerli").length; index++) {
            var p = document.getElementsByClassName("pagerli")[index];
            p.style.backgroundColor = "white"
        }
        obj.style.backgroundColor = "#ebebeb"
        updatePageInfo({
            index: parseInt(obj.innerText)
        })
        fn(parseInt(obj.innerText), pageLoadComplete)
        pageLoading()
     
    }
    clickPrev(e) {
        const {pageInfo, fn, updatePageInfo, pageLoading, pageLoadComplete} = this.props
        if (pageInfo.index == 1) { return false }
        updatePageInfo({
            index: pageInfo.index - 1
        })
        fn(pageInfo.index - 1, pageLoadComplete)
        pageLoading()
    }
    clickNext(e) {
        const {pageInfo, fn, updatePageInfo, pageLoading, pageLoadComplete} = this.props
        if (pageInfo.index == Math.ceil(pageInfo.sum / pageInfo.size)) { return false }
        updatePageInfo({
            index: pageInfo.index + 1
        })
        fn(pageInfo.index + 1, pageLoadComplete)
        pageLoading()
    }
    clickFirst(e) {
        const {fn, updatePageInfo, pageLoading, pageLoadComplete} = this.props
        updatePageInfo({
            index: 1
        })
        fn(1, pageLoadComplete)
        pageLoading()
    }
    clickLast(e) {
        const {pageInfo, fn, updatePageInfo, pageLoading, pageLoadComplete} = this.props
        updatePageInfo({
            index: Math.ceil(pageInfo.sum / pageInfo.size)
        })

        fn(Math.ceil(pageInfo.sum / pageInfo.size), pageLoadComplete)
        pageLoading()
    }
}

export default TUI._connect({
    _pageInfo: "publicInfo.pageInfo",
    pageLoadStatus: "publicInfo.pageLoadStatus"
}, Pager)

