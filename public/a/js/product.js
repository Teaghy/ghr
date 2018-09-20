$(function () {
    var page=1;
    var pagesize=10;
    var totalPage;
   function getProduct() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: page,
                pageSize: pagesize
            },
            success: function (res) {
                //console.log(res)
                var html = template('productTpl', res);
                totalPage = Math.ceil(res.total / pagesize)
                // console.log(totalPage)
                $('#productTb').html(html)
            }

        })
   }
    getProduct();
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type:'get',
        data:{
            page:page,
            pageSize:pagesize
        },
        success:function (res) {
            //console.log(res)
            var html=template('secondCateTpl',res)
            $('#select-box').html(html)
            //console.log(html)
        }
    })
     $('#prevBtn').on('click', function () {
         page--;
         if (page < 1) {
             page = 1;
             alert('已经是第一页了')
             return
         }
         getProduct();
     });
     $('#nextBtn').on('click', function () {
         page++;
         if (page > totalPage) {
             page = totalPage;
             alert('已经是最后一页了')
             return;
         }
          getProduct();
     });

    var imgArr=[];
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            imgArr.push(data.result.picAddr) ;
        }
    });
    $('#addProduct').on('click',function () {
        var brandId =$('#select-box').val();
        var proDesc = $('[name="proDesc"]').val();
        var num = $('[name="num"]').val();
        var size = $('[name="size"]').val();
        var oldPrice = $('[name="oldPrice"]').val();
        var price = $('[name="price"]').val();
        var proName = $('[name="proName"]').val();
        var staus=1;
        //console.log(imgArr)
        if(imgArr.length==0){
            alert('请上传商品图片')
            return;
        }
        //console.log(brandId, proName, proDesc, num, size, oldPrice, price, staus)
        $.ajax({
            url: '/product/addProduct',
            type:'post',
            data:{
                brandId: brandId,
                proDesc: proDesc,
                num:num,
                size: size,
                oldPrice: oldPrice,
                price: price,
                proName: proName,
                staus: staus
            },
            success:function (res) {
                console.log(res)
                if(res.success){
                    location.reload()
                }else{
                    alert(res.message)
                }
            }
        })
    })
});