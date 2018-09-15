$(function () {
    $('#signIn').on('tap',function () {
        var userName=$('[name="username"]').val();
        var password=$('[name="password"]').val();
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:userName,
                password:password,
            },
            success:function (res) {
                if(res.error){
                    mui.toast("用户名或密码错误");
                    return;
                }else{
                    mui.toast("登录成功");
                    setTimeout(function(){
                        location.href = "user.html";
                    }, 1000)
                }

            }
        })
    })
})