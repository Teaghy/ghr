$(function () {
    $.ajax({
        url:'/employee/checkRootLogin',
        type:'get',
        success:function(result){

            if(result.success){

                location.href = "user.html";

            }

        }
    });
    $('#btn_login').on('click',function () {
        var username=$.trim($('#username').val());
        var password=$.trim($('#password').val());
        if(!username || !password){
            alert('请输入用户名或密码')
        }
        $.ajax({
            url:' /employee/employeeLogin',
            type:'post',
            data:{
                username:username,
                password:password
            },
            success:function (res) {
                console.log(res);
                if(res.success){
                    location.href="user.html"
                }else{
                    if(res.error){
                        alert(res.message)
                    }
                }
            }
        })
    })
})