$(function () {
    var keyArr=[];
    $('.textSearch').on('click',function () {
        var text=$('.textBox').val();
        if(text.trim()){
            keyArr.unshift(text);
            var keyStr=JSON.stringify(keyArr);

             localStorage.setItem('keyArr',keyStr);
             location.href="search-result.html?keyword="+text
        }else{
            alert('请输入关键字');
            return;
        }
    })
    if(localStorage.getItem('keyArr')){
        keyArr=JSON.parse(localStorage.getItem('keyArr'));

        var html=template('historyResult',{data:keyArr});
        $('.my-list').html(html);
    }
    $('.icon_clear').on('click',function () {
        keyArr=[];
        localStorage.removeItem('keyArr');
        $('.my-list').html('')
    })
    $('.my-list').on('click','li',function () {
        var keyword=$(this).text();
        location.href="search-result.html?keyword="+keyword;
    })
})