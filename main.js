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
                <input id="reboot_fre" inputType="number" marginLeft="20"/>
            </horizontal>
        </vertical>

        <horizontal gravity="center" marginTop="24">
            <text id="progress_value" textColor="black" textSize="16sp" margin="8" text="0"/>
            <progressbar id="progress" w="*" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"/>
        </horizontal>

        <horizontal gravity="center_horizontal" marginTop="600">
            <button id="start" text="开始" textSize="20" textColor="#fffef9" textStyle="bold" bg="#51c4d3" marginLeft="20"/>
            <button id="stop" text="暂停" textSize="20" textColor="#fffef9" textStyle="bold" bg="#51c4d3" marginLeft="20"/>
            <button id="cancel" text="取消" textSize="20" textColor="#fffef9" textStyle="bold" bg="#51c4d3" marginLeft="20"/>
        </horizontal>
    </vertical>
)


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


var testId = null;


ui.start.click(() => {
    if (testId != null) {
        stopTest();
    } else {
        startTest();
    }
});

ui.stop.click(() => {
    if (testId != null) {
        stopTest();
    } else {
        startTest();
    }
});

ui.cancel.click(() => {
    stopTest();
});

function startTest() {
    if (ui.progress.getProgress() == 10) {
        ui.progress.setProgress(0);
    }
    toast("开始测试");
    startId = setInterval(() => {
        var p = ui.progress.getProgress();
        p++;
        if (p > 10) {
            overTest();
        }
        ui.progress.setProgress(p);
        ui.progress_value.setText(p.toString());
    }, 200);
}

function overTest() {
    toast("结束测试");
    clearInterval(testId);
    testId = null;
}