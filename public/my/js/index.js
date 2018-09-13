$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function (res) {
            console.log(res);
            var html=template('temFirst',{'data':res.rows});
            $('#leftList').html(html);
            if(res.rows.length>0){
                var id=res.rows[0].id;
                $.ajax({
                    type:'get',
                    url:' /category/querySecondCategory',
                    data:{
                        id:id
                    },
                    success:function (res) {
                        // console.log(res)
                        var html=template('temSecond',res);
                        $('#rightList').html(html);
                        $('#leftList').find('a:first-child').addClass('active');
                    }
                })
            }
        }
    });
    $('.leftCate').on('click','a',function () {
        var dataId=$(this).data('id');
        $(this).addClass('active').siblings().removeClass('active');
        $.ajax({
            type:'get',
            url:' /category/querySecondCategory',
            data:{
                id:dataId
            },
            success:function (res) {
                if(res.rows.length>0) {
                    var html = template('temSecond', res);
                    $('#rightList').html(html)
                }else{
                    $('#rightList').html("<span>暂无数据</span>")
                }
            }
        })
    })
})