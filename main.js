"ui";

ui.layout(
    <vertical>
        <vertical>
            <horizontal gravity="center" marginTop="100">
                <checkbox id="cb_reboot" text="    设置重启测试次数" textColor="#22a2c3" textSize="25" textStyle="bold"></checkbox>
                <input id="cb_reboot_fre" inputType="number" marginLeft="20"/>
            </horizontal>
            <horizontal gravity="center">
                <checkbox id="cb_ito" text="    设置容值测试次数" textColor="#22a2c3" textSize="25" textStyle="bold"></checkbox>
                <input id="cb_ito_fre" inputType="number" marginLeft="20"/>
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

ui.cb_reboot.on("check",(checked)=>{
    if(checked){
        //toast("勾选了重启测试");
        rb_checked=true
    }else{
        //toast("取消了重启测试");
        rb_checked=false
    }
});

ui.cb_ito.on("check",(checked)=>{
    if(checked){
        //toast("勾选了ITO测试");
        ito_checked=true
    }else{
        //toast("取消了ITO测试");
        ito_checked=false
    }
});

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
    }else if(n ==0){
        toast("未勾选测试！")
    }else{
        log("参数有误，放弃测试");
        toast("参数有误，放弃测试");
    }
}
 

ui.start.click(() => {
    check_item_verify()
});
