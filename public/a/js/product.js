$(function () {
    $.ajax({
        type:'get',
        url:'/product/queryProductDetailList',
        data:{
            page:1,
            pageSize:100
        },
        success:function (res) {
            console.log(res)
            var html=template('productTpl',res);
            $('#productTb').html(html)
        }

    })
})