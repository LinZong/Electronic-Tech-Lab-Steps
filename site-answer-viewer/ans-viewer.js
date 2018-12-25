// ==UserScript==
// @name         电路复习显示答案
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A helper for 华工电工电子教学网站连线复习
// @author       NemesissLin
// @match        http://222.201.130.196/eetec/HTML/exercise/*.htm
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var ShowAnswerBody = document.createElement("p");
    function GetAnswerChecker()
    {
        let alldisp = frame_main.document.getElementsByClassName("disp");
        let btnlist;
        if(alldisp.length === 0)
        {
            alldisp = frame_main.document.getElementsByClassName("question");
            btnlist = alldisp[alldisp.length-1];
        }
        else btnlist = alldisp[alldisp.length-1].getElementsByTagName("button")[0];
        let clickhandler = btnlist.onclick.toString();
        let ansChecker = clickhandler.match("\n.*()\n")[0].replace("\n","").replace("\n","").replace("()","");
        ShowAnswerBody.innerText = frame_main.window.eval(ansChecker).toString();
    }
        let ShowAnsContainer = document.createElement("div");
        ShowAnsContainer.style.zIndex = 1000;
        ShowAnsContainer.style.position = "absolute";
        ShowAnsContainer.style.width = "20vw";
        var ShowAnswerBtn = document.createElement("button");
        ShowAnswerBody.id = "ShowAnswerBody";
        ShowAnswerBody.innerText = "这里将会显示判定答案的JS函数。\n\n可能有一些题目的答案不能被正常显示。如遇到此问题请自行F12查看控制台报错信息解决。\n\n还有一些题目的答案存在数组里，脚本只能看到数组名，也请使用F12进一步查看。";
        ShowAnswerBtn.id = "ShowAnsBtn";
        ShowAnswerBtn.innerText = "查看答案";
        ShowAnswerBtn.onclick = GetAnswerChecker;
        ShowAnsContainer.append(ShowAnswerBtn);
        ShowAnsContainer.append(ShowAnswerBody);
        document.getElementsByTagName("body")[0].append(ShowAnsContainer);

})();