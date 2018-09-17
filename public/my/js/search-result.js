var keyword=getParamsByUrl(location.href, 'keyword');
var page=1;
var html="";
var This;
var priceSort = 1;
var pageSize=3;
$(function () {
    // $(window).on('swipeup',function () {
    //     $('.filter').animate({'opacity':0}, 1000 , 'linear');
    // }).on('swipedown',function () {
    //     $('.filter').animate({'opacity':1}, 1000 , 'linear');
    // });
    mui.init({
        pullRefresh : {
            container:'.mui-scroll-wrapper',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    $('.priceLow').on('tap',function () {
        priceSort=priceSort==1? 2:1;
        html = "";
        page = 1;
        mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
        getData();
    });
    // $('#detail-box').on('tap','.mui-btn',function () {
    //    var id= $(this).data('id');
    //    console.log(id);
    //    location.href="detail.html?"+id;
    // })
});
function getData() {
    if(!This){
        This=this;
    }
    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:{
            page:page++,
            pageSize:pageSize,
            proName: keyword,
            price: priceSort
        },
        success:function (res) {
            console.log(res);
            if(res.data.length>0){
                html+=template('searchRes',res);
                //console.log(html);
                $('.list').html(html);
                This.endPullupToRefresh(false);
            }else{
                This.endPullupToRefresh(true);
            }


        }
    });
}
