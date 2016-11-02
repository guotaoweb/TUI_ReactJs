import React, { Component } from 'react'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content2 from "../../components/Layout/content2"
import FormControls from "../../components/FormControls/index"
import Btn from "../../components/Btn/index"
import { closeSidePage } from "../../components/SidePage/index"

class OrgnizationEdit extends Component {
    render() {
        const {sidePageInfo, detail, unitBizTypes, unitKind, status, city} = this.props
        let tabs = null
        if (sidePageInfo.status == "addOrgnization") {
            tabs = [{ name: "添加组织机构", }]
        }
        else {
            tabs = [{ name: "编辑组织机构" }]
        }
        return (
            <Content2 tabs={tabs} key="content2_userEdit">
  