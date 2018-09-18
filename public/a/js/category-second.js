$(function () {
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page:1,
            pageSize:100
        },
        success:function (res) {
            var html=template('selectTpl',res);
            $('#method').html(html);
        }
    });
    var page=1;
    var pageSize=10;
    var totalPage;
    getSecondData();
    $('#prevBtn').on('click',function () {
        page--;
        if(page<1){
            page=1;
            alert('已经是第一页了')
            return
        }
        getSecondData();
    });
    $('#nextBtn').on('click',function () {
        page++;
        if(page>totalPage){
            page=totalPage;
            alert('已经是最后一页了')
            return;
        }
        getSecondData();
    });

    var brandLogo;
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
             brandLogo=data.result.picAddr
            $('.img-thumbnail').attr('src',brandLogo);
        }
    });

    $('#save').on('click',function () {
        var brandName=$.trim($('[name="brandName"]').val());
        var categoryId=$('#method').val();
        //console.log(categoryId)
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:{
                brandName:brandName,
                categoryId:categoryId,
                brandLogo:brandLogo,
                hot:1
            },
            success:function (res) {
                if(res.success){
                    location.reload()
                }
            }
        })
    });

    function getSecondData() {
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function (res) {
                //console.log(res);
                var html=template('secondTpl',res);
                $('#secondCategory tbody').html(html);
                totalPage=Math.ceil(res.total/pageSize);
            }
        });
    }
})