angular.module("App").filter('CustomerNewsService',function(){
    return function(res){
        //修改账户信息
        $.each(res.body , function(i, n){
            //修改ip地址段
            n.customer.ipAll= n.customer.ipField.split(',');
            //修改账户信息
            $.each(n.orderItems , function(i, m){
                var sta= m.serviceId;
                switch (sta)
                {
                    case 1:
                        x="压制";
                        break;
                    case 2:
                        x="清洗";
                        break;
                }
                m.serviceId=x;
            })
            //修改订单信息
            $.each(n.orders , function(i, y){
                var timeModify=function(final){
                    var d= new Date( final);
                    var   monthTime=d.getMonth()+ 1,
                        dayTime=d.getDate();
                    if(monthTime<10)
                    {
                        monthTime="0"+monthTime;
                    }
                    if(dayTime<10){
                        dayTime="0"+dayTime;
                    }
                    final=d.getFullYear()+"-"+monthTime+"-"+dayTime
                        +" "+d.toString().slice(16,24);
                    return final;
                }
                y.activeDate=timeModify(y.activeDate);
                var b= y.expiredDate;
                var a=new Date(b);
                if(typeof(b) == "undefined"){
                    y.expiredDate="无限期";
                }else{
                    y.expiredDate=timeModify(y.expiredDate);
                }
                var sta= y.payStatus;
                switch (sta)
                {
                    case 1:
                        x="未付款";
                        break;
                    case 2:
                        x="已付款";
                        break;
                    case 3:
                        x="欠费";
                        break;
                }
                console.log(x);
                y.payStatus=x;
            })
        })
        return res;
    }
})