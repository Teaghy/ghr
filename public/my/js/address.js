$(function () {
    var address;
    $.ajax({
        url:'/address/queryAddress',
        type:'get',
        success:function (res) {
            address=res;
            var html=template('addressTpl',{data:res});
            $('#address-box').html(html)
        }
    })
    $('#address-box').on('tap','.delete-btn',function () {
        var id=$(this).data('id');
        var This=this;
        var li=this.parentNode.parentNode;
        mui.confirm('确认要删除吗?',function (msg) {
            if(msg.index == 1){
                $.ajax({
                    url:'/address/deleteAddress',
                    type:'post',
                    data:{
                        id:id
                    },
                    success:function (res) {
                        if(res.success){
                            $(This).parent().parent().remove()
                        }
                    }
                })
            }else{
                mui.swipeoutClose(li)
            }
        });

    }).on('tap','.edit-btn',function () {
       var id=$(this).data('id');
       //console.log(id)
        for (var i = 0; i < address.length; i++) {
            if(address[i].id==id){
                // console.log(address[i]);
                var currentAdd=JSON.stringify(address[i]);
                localStorage.setItem('address',currentAdd);
                break;
            }
        }
        location.href="addAddress.html?edit=1";
    })
})