const setTop = (name, obj) => {
    let value = 0;
    let key;
    if(!!name){
        key = name
    }else{
        key = window.location.hash;
    }
    if(obj) {
        value = obj.scrollTop;
    } else {
        if (typeof window.pageYOffset != 'undefined') {
            value = window.pageYOffset;
        } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
            value = document.documentElement.scrollTop;
        } else if (typeof document.body != 'undefined') {
            value = document.body.scrollTop;
        }
    }
    sessionStorage.setItem(key, value)
}

const getTop = (name, obj) => {
    let key;
    if(!!name){
        key = name
    }else{
        key = window.location.hash;
    }
    let a = sessionStorage.getItem(key);
    if(obj){
        if(a && a >= 0){
            obj.scrollTop = parseInt(a);
        }
    }else{
        if(a && a >= 0){
            window.scrollTo(0, parseInt(a));
        }
    }
}

const deviceType = () => {
    let deviceName;
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        deviceName = 'IOS'
    } else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
        deviceName = 'ANDROID'
    } else { //pc
        deviceName = 'PC'
    }
    return deviceName;
}
export {setTop, getTop, deviceType};
