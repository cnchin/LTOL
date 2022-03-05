"ui";

ui.layout(
    <vertical>
        <vertical>
            <horizontal gravity="center" marginTop="100">
                <checkbox id="cb_reboot" text="    设置重启测试次数" textColor="#22a2c3" textSize="25" textStyle="bold"></checkbox>
                <input id="reboot_fre" inputType="number" marginLeft="20"/>
            </horizontal>
            <horizontal gravity="center">
                <checkbox id="cb_ito" text="    设置容值测试次数" textColor="#22a2c3" textSize="25" textStyle="bold"></checkbox>
                <input id="ito_fre" inputType="number" marginLeft="20"/>
            </horizontal>
        </vertical>

        <horizontal gravity="center" marginTop="24">
            <text id="progress_value" textColor="black" textSize="16sp" margin="8" text="0"/>
            <progressbar id="progress" w="*" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"/>
        </horizontal>

        <horizontal gravity="center_horizontal" marginTop="300">
            <button id="start" text="开始" textSize="20" textColor="#fffef9" textStyle="bold" bg="#51c4d3" marginLeft="20"/>
            <button id="stop" text="暂停" textSize="20" textColor="#fffef9" textStyle="bold" bg="#51c4d3" marginLeft="20"/>
            <button id="cancel" text="取消" textSize="20" textColor="#fffef9" textStyle="bold" bg="#51c4d3" marginLeft="20"/>
        </horizontal>
    </vertical>
)

/*checkbox test func */
ui.cb_reboot.on("check",(checked)=>{
    if(checked){
        toast("勾选了重启测试");
    }else{
        toast("取消了重启测试");
    }
});

ui.cb_ito.on("check",(checked)=>{
    if(checked){
        toast("勾选了ITO测试");
    }else{
        toast("取消了ITO测试");
    }
});




/*start & stop & cancel test func */
var testId = null;
var testFlag =false;
var rebootNum =0;
var itoNum=0;

ui.start.click(() => {
    if (testId != null) {
        // clearInterval(testId);
        // testId = null;
        // startTest();
    } else {
        if(prepareTest()){
            startTest();
        }
    }
});

ui.stop.click(() => {
    testFlag=true;
    toast("暂停测试");
});

ui.cancel.click(() => {
    overTest();
});



function prepareTest(){
    if(!(ui.cb_ito.checked||ui.cb_reboot.checked)){
        toast("请选择测试项");
        return false;
    }
    if(ui.cb_reboot.checked){
        if(ui.reboot_fre.text().length==0)
        {
            toast("重启次数输入不能为空");
            return false;
        }else{
            rebootNum=ui.reboot_fre.text();
            toast("重启次数"+rebootNum);
        }
    }
    if(ui.cb_ito.checked){
        if(ui.ito_fre.text().length==0)
        {
            toast("容值测试次数输入不能为空");
            return false;
        }else{
            itoNum=ui.ito_fre.text();
            toast("容值测试次数"+itoNum);
            //设置屏幕永不熄屏(除非手动)(24h)
            device.keepScreenOn(24*3600*1000);
        }
    }
    return true;
}

function startTest() {
    toast("开始测试");
}

function stopTest() {
    toast("暂停测试");
}

function overTest() {
    toast("取消测试");
    // clearInterval(testId);
    // testId = null;
}

/*
adb shell settings get system screen_off_timeout

    if (ui.progress.getProgress() == 10) {
        ui.progress.setProgress(0);
    }
    toast("开始测试");

    startId = setInterval(() => {
        var p = ui.progress.getProgress();
        var itoResult=itoTestItem();
        var rebootResult=rebootTestItem();
        if()
        p++;
        if (p > 10) {
            overTest();
        }
        ui.progress.setProgress(p);
        ui.progress_value.setText(p.toString());
    }, 200);
    if(testFlag==true){
        var conf =confirm("是否继续测试?");
        if(conf){
            testFlag=false;
        }else{
            overTest();
        }
    }





*/
