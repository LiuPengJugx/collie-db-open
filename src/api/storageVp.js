import request from '@/utils/request'
export function fetchStudentList(query){
    return request({
        url: '/aidb/storage/tableInfo/'+query['tabName'],
        method: 'get',
        params: query
    })
}

export function fetchAllTables(){
    return request({
        url: '/aidb/storage/tabList',
        method: 'get'
    })
}

export function fetchTableColumns(tableName){
    return request({
        url: '/aidb/storage/tableInfo/columns/'+tableName,
        method: 'get'
    })
}

export function fetchWorkload(path){
    return request({
        url: '/aidb/storage/workload/'+path,
        method: 'get'
    })
}

export function addWorkload(data){
    return request({
        url: '/aidb/storage/workload/add',
        method: 'post',
        data
    })
}

export function executeAnalysis(data){
    return request({
        url:'/aidb/storage/vertical/partitions/analysis',
        method:'post',
        data
    })
}