$(function () {
    var page=1;
    var pageSize=10;
    var totalPage;
    getCatagoryData();
    $('#prev').on('click',function () {
        page--;
        if(page<1){
            page=1;
            alert('已经是第一页了')
            return
        }
        getCatagoryData();
    });
    $('#next').on('click',function () {
        page++;
        if(page>totalPage){
            page=totalPage;
            alert('已经是最后一页了')
            return;
        }
        getCatagoryData();
    });
    $('#saveData').on('click',function () {
        var categoryName=$.trim($('#categoryName').val());
        if(!categoryName){
            alert('请输入分类名称');
            return;
        }
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:{
                categoryName:categoryName
            },
            success:function (res) {
                if(res.success){

                     location.reload();

                }
            }
        })
    });




    function getCatagoryData(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function (res) {
                console.log(res);
                var html=template('categoryTpl',res);
                $('#categoryTb').html(html);
                totalPage=Math.ceil(res.total/pageSize);
            }
        });
    }

});