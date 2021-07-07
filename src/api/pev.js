import request from '@/utils/request'
export function fetchQueryPlan(query){
    return request({
        url: '/aidb/storage/pev2',
        method: 'get',
        params: query
    })
}