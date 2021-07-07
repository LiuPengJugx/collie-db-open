import request from '@/utils/request'
export function fetchJson(query){
    return request({
        url: '/aidb/storage/compress/getjson',
        method: 'get',
        params:query
    })
}

export function configAlogorithm(data){
    return request({
        url: '/aidb/storage/compress/comp',
        method: 'post',
        data
    })
}

export function getResult(){
    return request({
        url: '/aidb/storage/compress/result',
        method: 'get'
    })
}

export function pointQueryTest(data){
    return request({
        url: '/aidb/storage/filter/signin',
        method: 'post',
        data
    })
}

export function rangeQueryTest(){
    return request({
        url: '/aidb/storage/filter/range',
        method: 'get',
    })
}