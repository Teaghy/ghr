$(function () {
    var username;
    var mobile;
    var password;
    var againPass;
    var vCode;
    $('#register').on('click',function () {
         username=$('[name="username"]').val();
         mobile=$('[name="mobile"]').val();
         password=$('[name="password"]').val();
         againPass=$('[name="againPass"]').val();
        vCode=$('[name="code"]').val();
        if(!username){
            mui.toast('请输入用户名');
            return;
        }
        if(mobile.length != 11){
            mui.toast('请输入合法手机号码');
            return;
        }
        if(password != againPass){
            mui.toast("两次输入的密码不一样");
            return;
        }
        $.ajax({
            url: '/user/register',
            type: 'post',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function(res){
                mui.toast("注册成功");
                setTimeout(function(){
                    location.href = "signIn.html";
                }, 1000)
            }
        })
    });
    // $('[name="againPass"]').on('blur',function () {
    //     password=$('[name="password"]').val();
    //     againPass=$('[name="againPass"]').val();
    //
    // })
    $('#getCode').on('tap',function () {
        $.ajax({
            type:'get',
            url:'/user/vCode',
            success:function (res) {
                console.log(res)
            }
        })
    })
});