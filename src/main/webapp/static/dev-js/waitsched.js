$(document).ready(function() {
	
	var pageNum = $('#pageNum').text();
	var iPageNum = Number(pageNum);
	if(iPageNum <= 1){
		$('#first').addClass('disabled');
		$('#previous').addClass('disabled');
	}
	
	var pageCount = $('#pageCount').text();
	var iPageCount = Number(pageCount);
	if(iPageNum >= iPageCount ){
		$('#next').addClass('disabled');
		$('#last').addClass('disabled');
	}
		
});