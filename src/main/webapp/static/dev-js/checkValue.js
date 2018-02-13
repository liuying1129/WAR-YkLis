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
    if(trList3.length>=2){

        for (var i = 0; i < trList3.length; i++) {//遍历Table的所有Row
        	
        }

    }
    /*procedure TSDIAppForm.Draw_MVIS2035_Curve(Chart_XLB:TChart;const X1,Y1,X2,Y2,X1_MIN,Y1_MIN,X2_MIN,Y2_MIN,
                                                   X1_MAX,Y1_MAX,X2_MAX,Y2_MAX:Real);
    //要利用Chart生成图片,故该函数不能写在DLL中                                    
    VAR
      Y:Array[1..200] of real;
      Y_MIN:Array[1..200] of real;
      Y_MAX:Array[1..200] of real;
      A,B:real;
      A_MIN,B_MIN:real;
      A_MAX,B_MAX:real;
      i:integer;
      rMin,rMax:real;
      Series_Val,Series_Min,Series_Max:TFastLineSeries;
    BEGIN
      if not CassonEquation(X1,Y1,X2,Y2,A,B) then exit;
      if not CassonEquation(X1_MIN,Y1_MIN,X2_MIN,Y2_MIN,A_MIN,B_MIN) then exit;
      if not CassonEquation(X1_MAX,Y1_MAX,X2_MAX,Y2_MAX,A_MAX,B_MAX) then exit;

      Chart_XLB.Width:=600;
      Chart_XLB.Height:=250;
      Chart_XLB.View3D:=false;
      Chart_XLB.Legend.Visible:=false;
      Chart_XLB.Color:=clWhite;
      Chart_XLB.BevelOuter:=bvNone;
      Chart_XLB.BottomAxis.Axis.Width:=1;
      Chart_XLB.LeftAxis.Axis.Width:=1;
      Chart_XLB.BackWall.Pen.Visible:=false;//隐藏top、right的框
      Chart_XLB.BottomAxis.Grid.Visible:=false;//隐藏横向的GRID线
      Chart_XLB.LeftAxis.Grid.Visible:=false;//隐藏纵向的GRID线
      Chart_XLB.Title.Font.Color:=clBlack;//默认是clBlue
      Chart_XLB.Title.Text.Clear;
      Chart_XLB.Title.Text.Add('血液粘度特性曲线');
      Chart_XLB.BottomAxis.Title.Caption:='切变率(1/s)';
      Chart_XLB.LeftAxis.Title.Caption:='粘度(mPa.s)';
      //for k:=Chart2.SeriesCount-1 downto 0 do Chart2.Series[k].Clear;//动态创建的Chart,肯定没Serie

      Series_Val:=TFastLineSeries.Create(Chart_XLB);
      Series_Val.ParentChart :=Chart_XLB;
      Series_Val.SeriesColor:=clBlack;//设置曲线颜色
      Chart_XLB.AddSeries(Series_Val);

      Series_Min:=TFastLineSeries.Create(Chart_XLB);
      Series_Min.ParentChart :=Chart_XLB;
      Series_Min.SeriesColor:=clBtnFace;//设置曲线颜色
      Series_Min.LinePen.Style:=psDashDotDot;
      Chart_XLB.AddSeries(Series_Min);

      Series_Max:=TFastLineSeries.Create(Chart_XLB);
      Series_Max.ParentChart :=Chart_XLB;
      Series_Max.SeriesColor:=clBtnFace;//设置曲线颜色
      Series_Max.LinePen.Style:=psDashDotDot;
      Chart_XLB.AddSeries(Series_Max);

      rMin:=0;rMax:=0;
      for i :=1 to 200 do
      begin
        Y[i]:=POWER(A+B*sqrt(1/I),2);
        Y_MIN[i]:=POWER(A_MIN+B_MIN*sqrt(1/I),2);
        Y_MAX[i]:=POWER(A_MAX+B_MAX*sqrt(1/I),2);

        Series_Val.Add(Y[i]);
        Series_Min.Add(Y_min[i]);
        Series_Max.Add(Y_max[i]);

        if i=1 then begin rMin:=Y[i];rMax:=Y[i];end;
        if Y[i]<rMin then rMin:=Y[i];
        if Y[i]>rMax then rMax:=Y[i];
      end;

      Chart_XLB.LeftAxis.Automatic:=false;
      Chart_XLB.LeftAxis.Maximum:=MaxInt;//如果不加这句,下句有可能报错(最小值必须=<最大值)
      Chart_XLB.LeftAxis.Minimum:=rMin-10*(rMax-rMin)/100;//下面留10%的空
      Chart_XLB.LeftAxis.Maximum:=rMax-10*(rMax-rMin)/100;//上面减少10%,这样图形才机子打出来的差不多
    END;*/
    //血流变曲线 stop
    
};