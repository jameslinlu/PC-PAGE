angular.module("App").filter('ServerFilterStatus',function(){
    return function(json){
        /*修改状态*/
        var x; switch (json)
        {
            case 0:x="未启动";break;
            case 1:x="启动中";break;
            case 2:x="已启动防护";break;
            case 3:x="启动失败";break;
            case 4:x="暂停中";break;
            case 5:x="已暂停";break;
            case 6:x="暂停失败";break;
            case 7:x="恢复中";break;
            case 8:x="已启动防护";break;
            case 9:x="恢复失败";break;
            case 10:x="停止中";break;
            case 11:x="已停止防护";break;
            case 12:x="停止失败";break;
        }
        return x;
    }
}).filter('ServerFilterTime',function(){
    //修改时间
    return function (n){
        /*修改停止防护时间*/
        if(n.terminateTime){

        }else if(n.dutyDuration){
            n.terminateTime=n.activateTime+(n.dutyDuration)*60*1000;
        }else{
            n.terminateTime="无限期";
        }
        return n.terminateTime;
    }
})