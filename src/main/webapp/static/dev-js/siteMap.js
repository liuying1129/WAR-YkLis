	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";
    
var intervals=0;

$(document).ready(function() {
	
	initNotice();
	initSiteMap();
	$('.wrap').css('min-height',$(window).height()-368+'px');
	var leftMargin= 1340/2;
 	$('.container-bgc').css('min-height',$(window).height()+'px');

	$('#leftContent').css({'margin-left':-leftMargin+'px'});//设置左边fixed的x位置
	$('#rightContent').css({'margin-right':-leftMargin+'px'});//设置右边fixed的x位置

	var leftContentTop=$('#leftContent').offset().top;
	if($(window).scrollTop()-leftContentTop>=0){
		$('#leftContent').css({'position':'fixed'}) ;
		$('#rightContent').css({'position':'fixed'}) ;
	 }else{
		$('#leftContent').css({'position':'absolute'}) ;
		$('#rightContent').css({'position':'absolute'}) ;
	 }
	window.onresize=function(){
		if($(window).scrollTop()-leftContentTop>=0&&($(window).width()/2)<=leftMargin){
			$('#leftContent').css({'margin-left': -(leftMargin - (leftMargin - $(window).width() / 2)) + 'px'});//设置左边fixed的x位置
			$('#rightContent').css({'margin-right': -(leftMargin + (leftMargin - $(window).width() / 2)) + 'px'});//设置左边fixed的x位置
		}else{
			$('#leftContent').css({'margin-left':-leftMargin+'px'});//设置左边fixed的x位置
			$('#rightContent').css({'margin-right':-leftMargin+'px'});//设置右边fixed的x位置
		}
	};
	window.onscroll=function(){
	 	if($(window).scrollTop()-leftContentTop>=0){
			$('#leftContent').css({'position':'fixed'}) ;
			$('#rightContent').css({'position':'fixed'}) ;
			if(($(window).width()/2)<=leftMargin) {
				$('#leftContent').css({'margin-left': -(leftMargin - (leftMargin - $(window).width() / 2)) + 'px'});//设置左边fixed的x位置
				$('#rightContent').css({'margin-right': -(leftMargin + (leftMargin - $(window).width() / 2)) + 'px'});//设置左边fixed的x位置
			}
		}else{
			$('#leftContent').css({'position':'absolute'}) ;
			$('#rightContent').css({'position':'absolute'}) ;
			$('#leftContent').css({'margin-left':-leftMargin+'px'});//设置左边fixed的x位置
			$('#rightContent').css({'margin-right':-leftMargin+'px'});//设置右边fixed的x位置
		}
	};
});

$(document).ajaxStop(function(){
	if(intervals==0){
		intervals=180000;
	}
	$('body').powerTimer({
        interval: intervals,
        func: initNotice
    });
}); 

function initSiteMap() {
	/*$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'selectSiteList',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : "json",
		success : function(data) {
			if (data.success) {
				var page = createPage(data.data);
				$("#dvContent").append(page);
				$("#leftContent").append(createLeftContent(data.data));
				createRecently();
			}
		}
	});*/
	
	var data = {
			success:true,
			data:[{
				parentId:"-1",
				groupNum:"0",
				title:"仓储开放平台",
				siteMapId:"1"
			},{
				parentId:"-1",
				groupNum:"0",
				title:"运输配送平台",
				siteMapId:"2"				
			},{
				parentId:"1",
				groupNum:"0",
				title:"WMS大仓",
				siteMapId:"3"				
			},{
				parentId:"3",
				groupNum:"0",
				title:"华南仓-主域",
				siteMapId:"4"				
			},{
				parentId:"3",
				groupNum:"0",
				title:"西南仓-主域",
				siteMapId:"5"				
			},{
				parentId:"2",
				groupNum:"0",
				title:"TMS",
				siteMapId:"6"				
			},{
				parentId:"6",
				groupNum:"0",
				title:"TMS主域",
				siteMapId:"7"				
			}]			
	};
	if (data.success) {
		var page = createPage(data.data);
		$("#dvContent").append(page);
		$("#leftContent").append(createLeftContent(data.data));
		createRecently();
	}
}

function createRecently(){
	var recentlyArr=$.parseJSON(getCookie('recently'))||[];
	if(recentlyArr.length>0){
		recentlyArr=recentlyArr.slice(0,10);
	}
	
	var page ='';
	for(var i=0;i < recentlyArr.length;i++){
		page+='<div class="live_ts_14 bottom_dash_line live_plr_12 live_ptb_6">' +
			'<a class="  " data-parent-id="'+recentlyArr[i].parentId+'" onclick="linkTo(this,\''+recentlyArr[i].url+'\',\''+recentlyArr[i].id+'\')"  href="javascript:;" target="_blank">' +
			'<span class="live_pr_6">'+recentlyArr[i].parentTitle+'</span>' +
			'<span class="title">'+recentlyArr[i].title+'</span>' +
			'</a>' +
			'</div>' ;
	}
	if(!page){
		$("#rightContent").hide();
	}else{
		$("#rightContent").show();
	}
	$("#rightContent >.right_content_body").html(page);
}
function createPage(siteData){
	var page="";
	var groupArray=[];
	for (var i = 0; i < siteData.length; i++) {
		if(siteData[i].parentId=="-1" && $.inArray(siteData[i].groupNum, groupArray)==-1){
			groupArray.push(siteData[i].groupNum);
		}
	}

	for(var k=0;k<groupArray.length;k++){
		var tabTitle="";
		var tabContent="";
		var activeFlag=0;
		for (var l = 0; l < siteData.length; l++) {
			if(siteData[l].parentId=="-1" && groupArray[k]==siteData[l].groupNum){
				tabTitle=createTitle(siteData[l].title,siteData[l].siteMapId,activeFlag);
				tabContent=createContent(siteData,siteData[l].siteMapId,activeFlag);
				activeFlag++;
				if(tabTitle!=""){
					page+='<div class="row-fluid">';
					page+='<div class="span12">';
					page+=tabTitle;
					page+='	<div class="">';
					page+=tabContent;
					page+='</div>';
					page+='</div>';
					page+='</div>';
				}
			}
		}
	}
	return page;
}

function createLeftContent(siteData){
	var page='';
	for (var l = 0; l < siteData.length; l++) {
		if(siteData[l].parentId=="-1" ){
			page+='<div class="left_content_text" style="cursor: pointer" onclick="scrollToArea(\''+siteData[l].siteMapId+'\')">'+siteData[l].title+'<img style="margin-top:3px" class="live_fr" src="../static/images/siteMap/first.png"></div>';
		}
	}

	return page;
}

function createTitle(currTitle,currId,activeFlag){
	var tabTitle='<div class="live_p_12 live_ts_16  live_tc_white title-red live_mtb_12 live_radius" id="title_'+currId+'">'+currTitle+'</div>';
	return tabTitle;
}

function createContent(siteData,parentId,activeFlag){
	var tabContent="";
	for(var i=0;i<siteData.length;i++){
		if(siteData[i].parentId==parentId){
			var contentList=createContentList(siteData,siteData[i].siteMapId);
			tabContent+='<div class="span12 live_ml_0 live_mb_12">';
			tabContent+='<div class="  live_bgc_white live_radius  ">';
			tabContent+='<div class="  live_p_0 " style="border-bottom: 1px solid #eee">';
			tabContent+='<div class="live_p_12 live_ts_16 text-red" id="'+siteData[i].siteMapId+'">'+siteData[i].title+'</div>';
			tabContent+='</div>';
			tabContent+='<div class=" ">';
			tabContent+='<div class=" live_p_12 live_ts_14"  >';
			tabContent+=contentList;
			tabContent+='</div>';
			tabContent+='</div>';
			tabContent+='</div>';
			tabContent+='</div>';						
		}
	}

	var tabContentResult='<div class="tab-pane  active" id="portlet_tab'+parentId+'">';

	tabContentResult+=tabContent;
	tabContentResult+='</div>';
	return tabContentResult;
}

function createContentList(siteData,parentId){
	var contentList ='';
	var siteList='';
	var childArr=[];
	var endCount=0,//一行的结束序列
		col=0;//列的序列
	//找出符合parent的子集数组
	for(var i=0;i<siteData.length;i++) {
		if (siteData[i].parentId == parentId) {
			childArr.push(siteData[i]);
		}
	}
	for(var i=0;i<childArr.length;i++){
			if(i%6==0){
				contentList+='<div class="row-fluid live_m_0"  >';
				endCount=i+5;//现在6个一行，所以是count+5
			}
			contentList+='<div class="span2 live_m_0" style="min-height: 0;">';
			contentList+='<a href="javascript:;" id="'+childArr[i].siteMapId+'" data-parent-id="'+parentId+'" onclick="linkTo(this,\''+childArr[i].url+'\',\''+childArr[i].siteMapId+'\')"  ><span class="title">'+childArr[i].title+'</span></a>';
			contentList+='</div>';
			siteList+=getLevelFourSite(siteData,childArr[i].siteMapId,col);
			if((i==childArr.length-1||i==endCount)){
				contentList+=siteList;
				contentList+='</div>';
				siteList='';
				col=0;
			}
			col++;
	}
	return contentList;
}
function getLevelFourSite(siteData,parentId,col){
	var siteContent='<div class="span12    live_m_0     level_four   live_pt_12    " id="level_four_'+parentId+'"  >';
	siteContent+='<div class="arrow1" style="left:'+(145*col)+'px"></div>';
	siteContent+='<div class="row-fluid live_m_0 live_ptb_6    live_radius"  style="position: relative;z-index: 3;width: auto" >';
	var childArr=[];
	//找出符合parent的子集数组
	for(var i=0;i<siteData.length;i++) {
		if (siteData[i].parentId == parentId) {
			childArr.push(siteData[i]);
		}
	}

 	for(var i=0;i<childArr.length;i++){
			siteContent+='<div class="span2 live_m_0 live_pl_12"  style="min-height: 0;">';
			siteContent+='<a href="javascript:;" data-parent-id="'+parentId+'" onclick="linkTo(this,\''+childArr[i].url+'\',\''+childArr[i].siteMapId+'\')"  ><span class="title">'+childArr[i].title+'</span></a>';
			siteContent+='</div>';
	}
	siteContent+='</div>';
	siteContent+='</div>';

	return childArr.length==0?'':siteContent;
}
function linkTo(t,url,id){
	if(url==undefined||url==null||url==''){
		$('#level_four_'+id).siblings('.level_four').slideUp(100);
		setTimeout(function(){
			$('#level_four_'+id).slideToggle(100);
		},100);
	}else{
		var recentlyArr=$.parseJSON(getCookie('recently'))||[];
		var deleteIndex=NaN;
		for(var i=0;i<recentlyArr.length;i++){
			if(recentlyArr[i].id==id){
				deleteIndex=i;
			}
		}
		var count=1;
		if(!isNaN(deleteIndex)){
			 count=recentlyArr[deleteIndex].count==null?1:recentlyArr[deleteIndex].count+1;
			 recentlyArr.splice(deleteIndex,1);
		}
		recentlyArr.push({
			title:$(t).find('.title').text(),
			url:url,
			parentTitle:$('#'+$(t).data('parent-id')).text(),
			parentId:$(t).data('parent-id'),
			id:id,
			count:count
		});
		recentlyArr.sort(function(a,b){
			return b.count-a.count;
	    });
		setCookie('recently',JSON.stringify(recentlyArr));
		createRecently();
		window.open(url);
	}
}
function  scrollToArea(id) {
	$('html, body').animate({
		scrollTop:$('#title_'+id).offset().top+'px'
	},300);
}

function initNotice(){
	//var currTime=getCurDateTime();
	
	var data = [{
			active:"1",
			content:"导航通知1，中华人民共和国，中华人民共和国，中华人民共和国，中华人民共和国，你好！",
			createDate:"2016-07-25 16:14:24",
			createUser:"hanke.lin",
			direction:"left",
			endTime:"2020-03-31 23:40:10",
			intervals:60000,
			noticeId:1,
			operDate:"2018-06-12 17:07:33",
			operUser:"hanke.lin",
			speed:5,
			startTime:"2016-10-01 16:13:54"
	},{
		active:"1",
		content:"导航通知2，中华人民共和国，中华人民共和国，中华人民共和国，中华人民共和国，你好2！",
		createDate:"2016-07-25 16:14:24",
		createUser:"hanke.lin",
		direction:"left",
		endTime:"2020-03-31 23:40:10",
		intervals:60000,
		noticeId:2,
		operDate:"2018-06-12 17:07:33",
		operUser:"hanke.lin",
		speed:5,
		startTime:"2016-10-01 16:13:54"
	}];	
	
	intervals=0;
    if(data.length>0){
    	var noticeStr="";
    	var speed=0;

    	var direction="left";
    	for(var i=0;i<data.length;i++){
    	    //var noticeNum=i+1;
    		noticeStr+='<span style="padding-right:100px;">'+data[i].content+'</span>';
    		if(data[i].speed*1>speed*1){
    			speed=data[i].speed;
    		}
    		if(data[i].intervals*1>intervals*1){
    			intervals=data[i].intervals;
    		}
    		direction=data[i].direction;
    	}
    	var dvMq='<marquee id="mqNotice" direction="'+direction+'" behavior="scroll" scrollamount="'+speed+'" scrolldelay="0" loop="-1"   hspace="0" vspace="0" style="color:#E3007F;font-size:18px;font-weight:bold;" >';
		dvMq+=noticeStr;
		dvMq+='</marquee>';
    	$("#marquee").html(dvMq);
    }
    
	/*$.ajax({
        type : "post",
        url : ctx+"/siteMap/initNoticeList?r="+Math.random(),
        data : {
        	startTime:currTime,
        	endTime:currTime,
            active:"1"
        },
        dataType : "json",
        success : function(data) {
        	intervals=0;
            if(data.length>0){
            	var noticeStr="";
            	var speed=0;

            	var direction="left";
            	for(var i=0;i<data.length;i++){
            	    var noticeNum=i+1;
            		noticeStr+='<span style="padding-right:100px;">'+data[i].content+'</span>';
            		if(data[i].speed*1>speed*1){
            			speed=data[i].speed;
            		}
            		if(data[i].intervals*1>intervals*1){
            			intervals=data[i].intervals;
            		}
            		direction=data[i].direction;
            	}
            	var dvMq='<marquee id="mqNotice" direction="'+direction+'" behavior="scroll" scrollamount="'+speed+'" scrolldelay="0" loop="-1"   hspace="0" vspace="0" style="color:#E3007F;font-size:18px;font-weight:bold;" >';
				dvMq+=noticeStr;
				dvMq+='</marquee>';
            	$("#marquee").html(dvMq);
            }            
        }
    });*/
}

function setCookie(name,value)
{
	var Days = 365;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
