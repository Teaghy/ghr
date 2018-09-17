$(function () {
    $('#changePw').on('tap',function () {
        var oldPass=$('[name="oldPassword"]').val();
        var newPassword=$('[name="newPassword"]').val();
        var secondPass=$('[name="secondPass"]').val();
        var code=$('[name="code"]').val();
        //console.log(oldPass);
        if(!$.trim(oldPass)){
            mui.toast('请输入密码');
            return;
        }
        if(!$.trim(newPassword)){
            mui.toast('请输入新密码');
            return;
        }
        if(!$.trim(secondPass)){
            mui.toast('请再次确认新密码');
            return;
        }
        if(!$.trim(code)){
            mui.toast('请输入认证码');
            return;
        }
        $.ajax({
            url:'/user/updatePassword',
            type:'post',
            data:{
                oldPassword:oldPass,
                newPassword:newPassword,
                vCode:code
            },
            success:function (res) {
                mui.toast("修改成功");
                setTimeout(function(){
                    location.href = "signIn.html";
                },1000)
            }
        })
    })
    $('#getCode').on('tap',function () {
        $.ajax({
            url:'/user/vCodeForUpdatePassword',
            type:'get',
            success:function (res) {
                console.log(res)
            }
        })
    })
});