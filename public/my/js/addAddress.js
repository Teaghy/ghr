$(function () {
    var editId= parseInt(getParamsByUrl(location.href, 'edit'));
    if(editId){
        if(localStorage.getItem('address')){
            var address= JSON.parse(localStorage.getItem('address'));
            console.log(address);
            var html= template('addressTemp',address);
            $('#editForm').html(html);
        }
    }else{
        var html= template('addressTemp',{});
        $('#editForm').html(html);
    }
    var picker = new mui.PopPicker({layer:3});
    picker.setData(cityData);
    $('#addAddress').on('tap',function () {
        var username=$('[name="username"]').val();
        var postCode=$('[name="postCode"]').val();
        var city=$('[name="city"]').val();
        var detail=$('[name="detail"]').val();
        var data={
            address:city,
            addressDetail:detail,
            recipients:username,
            postcode:postCode
        }
        if(editId){
            var url='/address/updateAddress';
            data.id=address.id;
        }else{
            var url='/address/addAddress';
        }
        $.ajax({
            type:'post',
            url:url,
            data:data,
            success:function (res) {
                // console.log(res)
                if(res.success){
                    if(editId){
                        mui.toast("地址修改成功");
                    }else{
                        mui.toast("地址添加成功");
                    }
                    setTimeout(function () {
                        location.href="address.html";
                    },2000)

                }
            }
        })
    });
    $('#selectCity').on('tap',function () {
        picker.show(function (SelectedItem) {
            var province=SelectedItem[0].text;
            var downCity=SelectedItem[1].text;
            var area=SelectedItem[2].text;
            $('#selectCity').val(province+downCity+area);
        })
    });



})