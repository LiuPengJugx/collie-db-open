import request from '@/utils/request'
export function fetchTableList(query){
    return request({
        url: '/aidb/index/tabledata',
        method: 'get',
        params: query
    })
}

export function fetchTableColumns(tablename){
    return request({
        url: '/aidb/storage/tableInfo/columns/'+tablename,
        method: 'get'
    })
}

export function fetchIndexRecommand(query){
    return request({
        url: '/aidb/index/recommand',
        method: 'get',
        params:query
    })
}