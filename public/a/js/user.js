$(function () {
    var page=1;
    var pageSize=10;
    getData();
    $('#userBody').on('click','#off-on',function () {
        var id=$(this).data('id');
        var This=this;
        var isDelete=parseInt($(this).data('isdelete'));
        isDelete= isDelete==1? 0 : 1;
        //console.log(isDelete);
        $.ajax({
            url:'/user/updateUser',
            type:'post',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function (res) {
                //console.log(res)
                if(res.success){
                    if(!isDelete){
                        $(This).removeClass('btn-danger').addClass('btn-success').html('启用').data('isdelete',0).parent().siblings('.state').html('已禁用');
                    }else{
                        $(This).removeClass('btn-success').addClass('btn-danger').html('禁用').data('isdelete',1).parent().siblings('.state').html('已启用');
                    }


                    // location.reload()
                }else{
                    alert(result.message);
                }
            }
        })
    })
    function getData() {
        $.ajax({
            url:'/user/queryUser',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function (res) {
                console.log(res);
                var html=template('userTpl',res);
                $("#userBody").html(html)
            }
        })
    }

})