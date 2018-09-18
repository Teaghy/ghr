$(function(){

	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});
	$('#loginOut').on('click',function () {
        $.ajax({
            url:'/employee/employeeLogout',
            type:'get',
            success:function (res) {
               // console.log(res)
                if(res.success){
                    location.href="login.html"
                }
            }
        })
    })
    $.ajax({
        url:'/employee/checkRootLogin',
        type:'get',
        success:function(result){
            if(result.error && result.error == 400){
                location.href = "login.html";
            }
        }
    })
});