var userInfo;
$.ajax({
    url: '/user/queryUserMessage',
    type: 'get',
    // 同步
    async: false,
    success: function(res){
        console.log(res);
        // 用户没有登录
        if(res.error == 400){
            location.href = "signIn.html";
        }

        userInfo = res;

    }
});
$(function () {
   $('#logout').on('tap',function () {
       $.ajax({
           type:'get',
           url:'/user/logout',
           success:function (res) {
               if(res.success){
                   mui.toast("退出登录成功");
                   setTimeout(function(){
                       location.href = "index.html";
                   },1000)
               }
           }
       })
   });
   //console.log(userInfo)
   var html=template('userTemp',userInfo);
   console.log(html);
   $('#userInfoBox').html(html)
});
