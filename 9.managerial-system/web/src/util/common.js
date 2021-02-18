import qs from 'qs';
import { Message } from 'element-ui'
export function getFormData(obj) {
    let formData = new FormData();
    for(let key in obj) {
        formData.append(key, obj[key])
    }
    return formData
}

export function getQsData(obj) {
    return qs.stringify(obj)
}

export function checkData(list) {
    let obj = {}
    for(let i = 0; i < list.length; i++) {
        let item = list[i]
        if(!item.notNeed){
            obj[item.name] = item.value
        }
        if(item.require && item.value === '') {
            Message({
                message: item.title + '不能为空',
                type: 'error'
            })
            return null
        }else {
            if(item.rule && item.rule.test && !(item.rule.test.test(item.value))) {
                Message({
                    message: item.rule.msg,
                    type: 'error'
                })
                return null
            }
            if(item.callback) {
                let res = ''
                item.callback(item, (msg)=>{res = msg})
                if(res) {
                    Message({
                        message: res,
                        type: 'error'
                    })
                    return null
                }
            }
        }
    }
    return obj
}

export function setItem(id, cb, list) {
    for(let j = 0; j < list.length; j++) {
        if(list[j].id === id) {
            cb(list[j])
        }
    }
}

export function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) {
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { 
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { 
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}
   