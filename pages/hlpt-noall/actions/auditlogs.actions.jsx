//新增日志查询信息【1】
export function addAuditLogs(data){
    return {
        type:"ADD_AUDITLOGS_DATA",
        data
    }
}

export function addAuditLogsFilter(data){
    return {
        type:"ADD_AUDITLOGS_FILTER",
        data
    }
}

export function addAuditLogsFilterTxt(data){
    return {
        type:"ADD_AUDITLOGS_FILTER_TXT",
        data
    }
}




