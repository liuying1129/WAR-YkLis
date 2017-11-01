	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";

window.onload = function(){
	
	var myTBody = document.getElementById("myTBody");
	var trList=myTBody.getElementsByTagName("tr");
	
    for (var i = 0; i < trList.length; i++) {                //遍历Table的所有Row
    	
    	var tdArr=trList[i].getElementsByTagName("td");
    	
        for (var j = 0; j < tdArr.length; j++) {   //遍历Row中的每一列

			if(tdArr[j].getAttribute("flag") === "itemValue"){
				//objSelected.unid = tdArr[j].innerText;
			}
			if(tdArr[j].getAttribute("flag") === "ifValueAlarm"){
				//if(tdArr[j].innerText)
			}
        }
    }
};