$(function () {
    // 页面滚动
    var maxNum;
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // var gallery = mui('.mui-slider');
    // gallery.slider({
    //     interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
    // });
    var id=getParamsByUrl(location.href, 'id');
    //console.log(id)
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{
            id:id
        },
        success:function (res) {
            console.log(res);
            var html=template('detailTpl',res);
           // console.log(html);
            maxNum=res.num;
            $('#detail-Box').html(html);
            // 轮播图重置
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });
    $('#detail-Box').on('tap','.size span',function () {
        $(this).addClass('active').siblings().removeClass('active');
    }).on('tap','#reduce',function () {
        var sizeNum=$('#inp').val();
        if(sizeNum<=2){
            sizeNum=2
        }
        $('#inp').val(--sizeNum)
    }).on('tap','#increase',function () {
        var sizeNum=$('#inp').val();
        if(sizeNum>=maxNum-1){
            sizeNum=maxNum-1
        }
        $('#inp').val(++sizeNum);
    }).on('tap','#addCart',function () {
        var num=$('#inp').val();
        var size=$(this).parent().siblings('.size').find('.active').html();
        if(!size){
            mui.toast("请选择尺码");
            return;
        }
        $.ajax({
            url:'/cart/addCart',
            type:'post',
            data:{
                num:num,
                size:size,
                productId:id
            },
            success:function (res) {
                //console.log(res)
                if(res.success){
                    mui.confirm("加入购物车成功,跳转到购物车?", function(message){
                        if(message.index){
                            // 跳转到购物车
                            location.href = "cart.html";
                        }
                    })
                }
            }
        })
    })

})