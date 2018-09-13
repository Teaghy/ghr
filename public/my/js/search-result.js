$(function () {
    // console.log(location.href)
   var keyword=getParamsByUrl(location.href, 'keyword');
   $.ajax({
       type:'get',
       url:'/product/queryProduct',
       data:{
          page:1,
          pageSize:6
       },
       success:function (res) {
           //console.log(res)
           var html=template('searchRes',res);
           //console.log(html);
           $('.list').html(html)
       }
   })


});
function getParamsByUrl(url, name) {
    var add=url.substr(url.indexOf('?')+1);
    var addArr=add.split('&');
    for (var i = 0; i < addArr.length; i++) {
       var currentAdd= addArr[i].split('=');
        if(currentAdd[0]==name){
            return currentAdd[1];
        }
    }
    return ;
}