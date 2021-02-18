const DATEUTIL = {
    formatDate(date, fmt) {
        if(!date) return date
        date = new Date(date)
        if(isNaN(Date.parse(date))){
        　　return date
        }
        
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : DATEUTIL.padLeftZero(str));
            }
        }
        return fmt;
    },
    padLeftZero(str) {
        str = str + '';
        return ('00' + str).substr(str.length);
    },
    getMonthTotalDays(date=new Date()) {
        var now = new Date(date)
        let year = now.getFullYear();
        let month = now.getMonth();
        return new Date(year,month+1,0).getDate();
    },
    getNextMonth(date=new Date()) {
        var now = new Date(date)
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDate();
        return new Date(year,month+1,day);
    },
    getAge(date=new Date()) {
        if(!date) return
        var now = new Date(date)
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let day = new Date().getDate();
        let year1 = now.getFullYear();
        let month1 = now.getMonth();
        let day1 = now.getDate();
        if(new Date(year, month1, day1) - new Date(year, month, day) > 0){
            return  year - year1 - 1
        }else{
            return year - year1
        }
    },
    preDate(date=new Date()) {
        return new Date(new Date(date).getTime() - 24 * 3600 * 1000)
    },
    nextDate(date=new Date()) {
        return new Date(new Date(date).getTime() + 24 * 3600 * 1000)
    }
}

export default DATEUTIL;