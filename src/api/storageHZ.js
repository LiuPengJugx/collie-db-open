import request from '@/utils/request'
export function fetchTableData(){
    return request({
        url: '/aidb/storgae/horizontal/original',
        method: 'get',
    })
}

export function fetchTableAndWorkloadData(){
    return request({
        url: '/aidb/storgae/horizontal/orgtable',
        method: 'get',
    })
}

export function fetchQdPartitions(){
    return request({
        url: '/aidb/storgae/horizontal/partitionQD',
        method: 'get'
    })
}

export function fetchSopPartitions(method){
    return request({
        url: '/aidb/storgae/horizontal/partition'+method,
        method: 'get'
    })
}


export function fetchSearchResult(data){
    console.log(data)
    return request({
        url: '/aidb/storgae/horizontal/search',
        method: 'post',
        data
    })
}



