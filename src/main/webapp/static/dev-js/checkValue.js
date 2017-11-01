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
    	
    	var cxzf = "";
    	
        for (var j = 0; j < tdArr.length; j++) {   //遍历Row中的每一列

			if(tdArr[j].getAttribute("flag") === "ifValueAlarm"){

				cxzf = tdArr[j].innerText;
			}
        }
        
        if(cxzf == "1"||cxzf == "2"){
        	
            for (var k = 0; k < tdArr.length; k++) {   //遍历Row中的每一列

    			if(tdArr[k].getAttribute("flag") === "itemValue"){
    				if(cxzf == "1"){
    					tdArr[k].setAttribute("style","color:blue");
    				}
    				if(cxzf == "2"){
    					tdArr[k].setAttribute("style","color:red");
    				}
    			}    			
            }
        }
    }
};