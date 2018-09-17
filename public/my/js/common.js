$(function () {
    $('body').on('tap','a',function () {
        mui.openWindow({
            url:$(this).attr('href')
        })
    })
})
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