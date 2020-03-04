//  转换时间
let getTime = function(arr) {
  for(var i = 0; i < arr.length; i ++) {
    var str = arr[i].updatedAt
    var re_str = new Date(str).toLocaleString()
    var year = re_str.split(' ')[0]
    var time = re_str.split(' ')[1].slice(2)
    var year_time = year + " " + time
    arr[i].updatedAt = year_time
  }
}

export default getTime