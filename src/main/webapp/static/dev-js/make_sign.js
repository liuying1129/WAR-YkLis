/*
 * 依赖于md5-min.js
 */
function make_sign(params,token){
	//生成签名sign
    var sort_params="";   
    var sort_keys=Object.keys(params).sort();   
    for(var sk in sort_keys){                     
    	if(!params[sort_keys[sk]])continue;
    	if(typeof params[sort_keys[sk]].valueOf()=='string' && params[sort_keys[sk]].length<=0)continue;
    	sort_params = sort_params + sort_keys[sk] + params[sort_keys[sk]];
 	}		
	//计算md5之前确保接口与接入方的字符串编码一致
	//utf-8编码
	sort_params = encodeURI(sort_params);
	sort_params = sort_params.replace(/\+/g,'%2B');//
	sort_params = sort_params.replace(/%20/g,'+');
	sort_params = sort_params.replace(/!/g,'%21');
	sort_params = sort_params.replace(/#/g,'%23');//
	sort_params = sort_params.replace(/'/g,'%27');
	sort_params = sort_params.replace(/\(/g,'%28');
	sort_params = sort_params.replace(/\)/g,'%29');
	sort_params = sort_params.replace(/,/g,'%2C');//
	sort_params = sort_params.replace(/\//g,'%2F');//
	sort_params = sort_params.replace(/:/g,'%3A');
	sort_params = sort_params.replace(/;/g,'%3B');//
	sort_params = sort_params.replace(/=/g,'%3D');
	sort_params = sort_params.replace(/~/g,'%7E');
	//alert(sort_params);
	var sign;
	if(token && typeof token=='string' && token.length>0){
		sign = hex_md5(token+sort_params);
	}else{
		sign = hex_md5(sort_params);
	}
    sort_params = null;
    
    return sign;
}
