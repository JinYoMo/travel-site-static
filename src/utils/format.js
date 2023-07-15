
//时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
export function dateFormat(time) { 
	var date=new Date(time);
	var year=date.getFullYear();
	/* 在日期格式中，月份是从0开始的，因此要加0
	 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
	 * */
	var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
	var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
	var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
	var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
	var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
	// 拼接
	return year+"-"+month+"-"+day+' '+hours+":"+minutes+":"+seconds;
	//"+hours+":"+minutes+":"+seconds
}
//结束时间
export function endDateFormat(time) { 
	var date=new Date(time);
	var year=date.getFullYear();
	/* 在日期格式中，月份是从0开始的，因此要加0
	 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
	 * */
	var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
	var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
	// 拼接
	return year+"-"+month+"-"+day+' '+'23'+":"+'59'+":"+'59'; 
}

//毫秒转日期格式
export function getMyDate(str) {
	var oDate = new Date(str),
		oYear = oDate.getFullYear(),
		oMonth = oDate.getMonth() + 1,
		oDay = oDate.getDate(),
		oHour = oDate.getHours(),
		oMin = oDate.getMinutes(),
		oSen = oDate.getSeconds(),
		oTime = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay) + ' ' + addZero(oHour) + ':' + addZero(oMin) + ':' + addZero(oSen);
	return oTime;
}

//时间补零操作
function addZero(num) {
	if(parseInt(num) < 10) {
		num = '0' + num;
	}
	return num;
}
/**
 * 取出中括号内的内容
 * @param text
 * @returns {string}
 */
export function getBracketStr(text) {
    let result = ''
    if (text == "")
        return result
    let regex = /\[(.+?)\]/g;
    let options = text.match(regex)
    if (options !=="") {
        let option = options[0]
        if (option !=="") {
            result = option.substring(1, option.length - 1)
        }
    }
    return result
}
/**
 * 取出小括号内的内容
 * @param text
 * @returns {string}
 */
export function getParenthesesStr(text) {
    let result = ''
    if (text == "")
        return result
    let regex = /\((.+?)\)/g;
    let options = text.match(regex)
    if (options !=="") {
        let option = options[0]
        if (option !=="") {
            result = option.substring(1, option.length - 1)
        }
    }
    return result
}

