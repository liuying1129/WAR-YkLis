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
        	
        	var preObj=trList[i].querySelector("pre");
			if(cxzf == "1"){
				preObj.setAttribute("style","color:blue");
			}
			if(cxzf == "2"){
				preObj.setAttribute("style","color:red");
			}        	
        }
    }
    
    //绘点begin
    var tbdLineChartBloodCount = document.getElementById("tbdLineChartBloodCount");
    var trList2=tbdLineChartBloodCount.getElementsByTagName("tr");
    for (var i = 0; i < trList2.length; i++) {//遍历Table的所有Row
    	
    	var divLineChartBloodCount = trList2[i].querySelector('div[flag="lineChartBloodCount"]');
    	var spanLineChartBloodCount = trList2[i].querySelector('span[flag="lineChartBloodCount"]');
    	var ss1 = spanLineChartBloodCount.innerHTML;
    	var sl1 = ss1.split(" ");
    	var filterResult = sl1.filter(function(item, index, array){ 
    			return (item.length > 0);
    		});
    	var option = {
    		    xAxis: {
    		        type: 'category',
    		    },
    		    yAxis: {
    		        type: 'value'
    		    },
    		    series: [{
    		        data: filterResult,
    		        type: 'line'
    		    }]
    	};
    	var myChart = echarts.init(divLineChartBloodCount);
    	myChart.setOption(option);
    }
    //绘点end
    
    //血流变曲线 start
    var tbdLineChartBloodRheology = document.getElementById("tbdLineChartBloodRheology");
    var trList3=tbdLineChartBloodRheology.getElementsByTagName("tr");
    
	var X1=-1,Y1=-1,X1_MIN=-1,Y1_MIN=-1,X1_MAX=-1,Y1_MAX=-1,X2=-1,Y2=-1,X2_MIN=-1,Y2_MIN=-1,X2_MAX=-1,Y2_MAX=-1;

    if(trList3.length>=2){
    	
        for (var i = 0; i < trList3.length; i++) {//遍历Table的所有Row
        	
        	if(i===0){
        		
            	X1 = trList3[i].querySelector('td[flag="rheologyReserve8"]').innerHTML;
            	Y1 = trList3[i].querySelector('td[flag="rheologyItemvalue"]').innerHTML;
            	X1_MIN = trList3[i].querySelector('td[flag="rheologyReserve8"]').innerHTML;
            	Y1_MIN = trList3[i].querySelector('td[flag="rheologyMin_value"]').innerHTML;
            	X1_MAX = trList3[i].querySelector('td[flag="rheologyReserve8"]').innerHTML;
            	Y1_MAX = trList3[i].querySelector('td[flag="rheologyMax_value"]').innerHTML;
        	}
        	
        	if(i===1){
        		
            	X2 = trList3[i].querySelector('td[flag="rheologyReserve8"]').innerHTML;
            	Y2 = trList3[i].querySelector('td[flag="rheologyItemvalue"]').innerHTML;
            	X2_MIN = trList3[i].querySelector('td[flag="rheologyReserve8"]').innerHTML;
            	Y2_MIN = trList3[i].querySelector('td[flag="rheologyMin_value"]').innerHTML;
            	X2_MAX = trList3[i].querySelector('td[flag="rheologyReserve8"]').innerHTML;
            	Y2_MAX = trList3[i].querySelector('td[flag="rheologyMax_value"]').innerHTML;
        	}
        }
    }
    
    if((X1>=0)&&(Y1>=0)&&(X1_MIN>=0)&&(Y1_MIN>=0)&&(X1_MAX>=0)&&(Y1_MAX>=0)&&(X2>=0)&&(Y2>=0)&&(X2_MIN>=0)&&(Y2_MIN>=0)&&(X2_MAX>=0)&&(Y2_MAX>=0)){
    	
        var B=(Math.sqrt(Y1)-Math.sqrt(Y2))/(Math.sqrt(1/X1)-Math.sqrt(1/X2));
        var A=Math.sqrt(Y1)-B*Math.sqrt(1/X1);

        var B_MIN=(Math.sqrt(Y1_MIN)-Math.sqrt(Y2_MIN))/(Math.sqrt(1/X1_MIN)-Math.sqrt(1/X2_MIN));
        var A_MIN=Math.sqrt(Y1_MIN)-B_MIN*Math.sqrt(1/X1_MIN);

        var B_MAX=(Math.sqrt(Y1_MAX)-Math.sqrt(Y2_MAX))/(Math.sqrt(1/X1_MAX)-Math.sqrt(1/X2_MAX));
        var A_MAX=Math.sqrt(Y1_MAX)-B_MAX*Math.sqrt(1/X1_MAX);
        
        var Y=[];
        var Y_MIN=[];
        var Y_MAX=[];
        
        for (var i = 1; i <= 200; i++) {
        	           
              Y.push(Math.pow(A+B*Math.sqrt(1/i),2));
              Y_MIN.push(Math.pow(A_MIN+B_MIN*Math.sqrt(1/i),2));
              Y_MAX.push(Math.pow(A_MAX+B_MAX*Math.sqrt(1/i),2));
        }
        
        var option = {
        	    
        	    title: {
        	        text: '血液粘度特性曲线',
        	        x: 'center'
        	    },
                legend: {
                    orient:'vertical',
                    right:'10%',
                    top:'15%'
                },
        	    xAxis: {
        	    	name : '切变率(1/s)',
        	        type: 'category'//,
        	        //boundaryGap: false
        	    },
        	    yAxis: {
        	    	name : '粘度(mPa.s)',
        	        type: 'value'
        	    },
        	    series: [
        	        {
        	        	name:'全血粘度曲线',
        	            type:'line',
        	            data:Y
        	        },
        	        {
        	        	name:'参考范围(下限)',
        	            type:'line',
        	            data:Y_MIN
        	        },
        	        {
        	        	name:'参考范围(上限)',
        	            type:'line',
        	            data:Y_MAX
        	        }
        	    ]
        	};

    	var myChart = echarts.init(document.getElementById("divLineChartBloodRheology"));
    	myChart.setOption(option);
    }    
    //血流变曲线 stop    
};