"ui";

ui.layout(
    <vertical>
        <vertical>
            <horizontal gravity="center" marginTop="100">
                <text text="  " id="reboot_remain" textColor="green"/>
                <checkbox id="cb_reboot" text="    设置重启测试次数" textColor="#22a2c3" textSize="25" textStyle="bold" marginLeft="10"></checkbox>
                <input id="cb_reboot_fre" inputType="number" marginLeft="20"/>
            </horizontal>
            <horizontal gravity="center">
                <text text="  " id="ito_remain" textColor="green"/>
                <checkbox id="cb_ito" text="    设置容值测试次数" textColor="#22a2c3" textSize="25" textStyle="bold" marginLeft="10"></checkbox>
                <input id="cb_ito_fre" inputType="number" marginLeft="20"/>
            </horizontal>
            <horizontal gravity="right" marginTop="50" marginRight="20">
                <checkbox id="log" text=" LOG" textColor="#22a2c3" textSize="25" textStyle="bold" marginLeft="10"></checkbox>
            </horizontal>
        </vertical>

        <horizontal gravity="center_horizontal" marginTop="300">
            <button id="start" text="开始" textSize="20" textColor="#fffef9" textStyle="bold" bg="#51c4d3" marginLeft="20"/>
            <button id="stop" text="暂停" textSize="20" textColor="#fffef9" textStyle="bold" bg="#51c4d3" marginLeft="20"/>
            <button id="cancel" text="取消" textSize="20" textColor="#fffef9" textStyle="bold" bg="#51c4d3" marginLeft="20"/>
        </horizontal>
    </vertical>
)

//test item button
var rb_checked=false
var ito_checked=false

//test item num
var rb_num=0
var ito_num=0


var log_checkd=false
ui.log.on("check",(checked)=>{
    if(checked){
        log_checkd=true
    }else{
        log_checkd=false
    }
});

ui.cb_reboot.on("check",(checked)=>{
    if(checked){
        log("勾选了重启测试");
        rb_checked=true
    }else{
        log("取消了重启测试");
        rb_checked=false
    }
});

ui.cb_ito.on("check",(checked)=>{
    if(checked){
        log("勾选了ITO测试");
        ito_checked=true
    }else{
        log("取消了ITO测试");
        ito_checked=false
    }
});


//检查测试测试参数设置是否正常，能否启动测试
var check_item_verify =function(){
    var n=0;
    if(rb_checked){
        if(ui.cb_reboot_fre.getText()<=0){
            log("重启未设定次数");
            n=-1;
        }
        else{
            n++;
        }
    }

    if(ito_checked){
        if(ui.cb_ito_fre.getText()<=0){
            log("容值未设定次数");
            n=-1;
        }else{
            n++;
        }
    }

    if(n > 0){
        log("启动测试",",一共 ",n," 项测试");
        toast("启动测试"+",一共 "+ n +" 项测试");
        return 1;
    }else if(n ==0){
        toast("未勾选测试！")
        return 0;
    }else{
        log("参数有误，放弃测试");
        toast("参数有误，放弃测试");
        return -1;
    }
}

var reboot_test=function(rb_num){
    
}

var ito_test=function(ito_num){
    var ito_test_remain=0
    while(ito_test_remain<ito_num){
        var result = shell("cat /sys/devices/platform/tp_wake_switch/factory_check", false);
        log(result);
        if(result.code == 0){
            log("执行成功");
        }else{
            toast("执行失败!请打开LOG查看错误信息");
            break;
        }
        log("执行结果 result= "+result.result)
        if(result.result==1){
            ito_test_remain++;
            ui.ito_remain.setText(ito_test_remain+"/"+ito_num+" pass");
        }else{
            ito_test_remain++;
            ui.ito_remain.setText(ito_test_remain+"/"+ito_num+" fail");
            break;
        }
    }
}


ui.start.click(() => {
    log(log_checkd)
    if(log_checkd){
        console.show();
    }
    var rb_num=ui.cb_reboot_fre.getText();
    var ito_num=ui.cb_ito_fre.getText();
    var verify=check_item_verify()
    log(verify)
    if(verify > 0){
        if(rb_checked){
            reboot_test(rb_num);
        }
        if(ito_checked){
            ito_test(ito_num);
        }
    }else{
        ui.ito_remain.setText(" ");
        ui.reboot_remain.setText(" ");
    }

});
