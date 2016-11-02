       "superUnitid1": unitCode ? unitCode : sidePageInfo.gateWay.type,
                "unitLevel": relateId ? relateId.split("-").length + 1 : sidePageInfo.gateWay.ext1
            }

            TUI.platform.post("/unit", postJson, function (result) {
                if (result.code == 0) {
                    closeSidePage()
                    _this.props.successMsg("新增组织成功")
                    postJson.unitCode = result.data.unitCode
                    //实时新增组织
                    pushSubList(postJson)

                    _this.addData(data, relateId.split("-"), {
                        id: result.data.unitId,
                        name: result.data.unitName,
                        isleaf: "1",
                        deep: relateId.split("-").length,
                        unitCode: result.data.unitCode
                    })
                }
                else {
                    _this.props.errorMsg(TUI.ERROR_INFO[result.code])
                }
            })
        }
        else {
            postJson = {
                "unitId": sidePageInfo.gateWay.id,
                "unitName": detail.unitName,
                "ext2": detail.ext2,
                "bizType": detail.bizType,
                "kind": detail.kind