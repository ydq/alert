/**
 * jQuery/Zepto 弹窗插件
 * 调用方法（中括号的为可选参数）：
 * $.alert(string[,function])
 * $.confirm(string[,function])
 * $.tips(string[,number])
 * version:2016-11-30
 */
!function($){
	//所有的css，可以自定义，css和Dom结构请参考 https://github.com/ydq/alert
	var css='.alert_overlay{position:fixed;width:100%;height:100%;top:0;left:0;z-index:1000;background:rgba(0,0,0,.05);-webkit-backdrop-filter:blur(3px)}.pc .alert_msg{width:320px}.mob .alert_msg{width:260px;border-radius:4px}.alert_msg{box-sizing:border-box;position:absolute;left:50%;top:30%;border:1px solid #ccc;box-shadow:0 2px 15px rgba(0,0,0,.3);background:#fff;transition:all .2s cubic-bezier(.8,.5,.2,1.4);-webkit-transform:translate(-50%,-50%) scale(.5);opacity:0;transform:translate(-50%,-50%) scale(.5)}.alert_show .alert_msg{opacity:1;transform:translate(-50%,-50%) scale(1);-webkit-transform:translate(-50%,-50%) scale(1)}.alert_content{padding:20px 15px;font-size:14px;text-align:left}.alert_tips{position:fixed;z-index:10176523}.pc .alert_buttons{padding:6px;border-top:1px solid #ccc;text-align:right;box-shadow:0 1px 0 #fff inset;background:#eee;-webkit-user-select:none}.pc .alert_buttons .alert_btn{padding:4px 8px;margin:0 2px;border:1px solid #ccc;background:#eee;cursor:pointer;border-radius:2px;font-size:14px;outline:0;-webkit-appearance:none}.pc .alert_buttons .alert_btn:hover{border-color:#ccc;box-shadow:0 1px 2px #ccc;background:#eaeaea}.pc .alert_buttons .alert_btn:active{box-shadow:0 1px 2px #ccc inset;background:#e6e6e6}.pc.alert_tips{top:50px;right:50px}.pc.alert_tips div{background:rgba(0,0,0,.7);position:relative;color:#fff;font-size:16px;padding:10px 15px;border-radius:2px;margin-bottom:20px;box-shadow:0 0 3px #000;display:none;float:right;clear:both}.mob .alert_buttons{text-align:center;border-top:1px solid #ccc;-webkit-user-select:none}.mob .alert_buttons .alert_btn{display:inline-block;width:50%;border:0;height:40px;font-size:14px;outline:0;-webkit-appearance:none;background:#fff;-webkit-tap-highlight-color:transparent;border-radius:0 0 4px 4px}.mob .alert_buttons .alert_btn:only-child{width:100%}.mob .alert_buttons .alert_btn:first-child+.alert_btn{border-left:1px solid #ccc;border-radius:0 0 4px 0}.mob.alert_tips{width:100%;top:55%;pointer-events:none;text-align:center}.mob.alert_tips div{box-sizing:border-box;display:inline-block;padding:15px;border-radius:10px;background:rgba(0,0,0,.7);min-width:50px;max-width:230px;text-align:center;color:#fff;animation:tipsshow 3s .01s ease;-webkit-animation:tipsshow 3s .01s ease;opacity:0}@keyframes tipsshow{0%{opacity:0;transform:scale(1.4) rotateX(-360deg)}20%,80%{opacity:1;transform:scale(1) rotateX(0deg)}to{transform:scale(1.4) rotateX(360deg)}}@-webkit-keyframes tipsshow{0%,to{opacity:0}0%{-webkit-transform:scale(1.4) rotateX(-360deg)}20%,80%{opacity:1;-webkit-transform:scale(1) rotateX(0deg)}to{opacity:0;-webkit-transform:scale(1.4) rotateX(360deg)}}';
	$('head').append('<style type="text/css">'+css+'</style>');
	$._ismob=/i(Phone|Pod)|Android|phone/i.test(navigator.userAgent)
	$._isalert=$._isload=0
	$.alert=function(){
		if(arguments.length){
			$._isalert=1;
			return $.confirm.apply($,arguments);
		}
	}
	$.confirm=function(){
		var args=arguments,d;
		if(args.length){
			var fn=args[1],_click = function(e){typeof fn=='function'?(fn.call(d,e.data.r)!=!1&&d.close()):d.close()};
			d = $('<div class="alert_overlay '+($._ismob?'mob':'pc')+'"><div class="alert_msg"><div class="alert_content">'+args[0]+'</div><div class="alert_buttons"><button class="alert_btn alert_btn_cancel">取消</button><button class="alert_btn alert_btn_ok">确定</button></div></div></div>')
			.on('contextmenu',!1)
			.on('click','.alert_btn_ok',{r:!0},_click)
			.on('click','.alert_btn_cancel',{r:!1},_click)
			$._isload?d.find('.alert_content').css('text-align','center').parent().css({width:'auto',borderRadius:'4px'}).find('.alert_buttons').remove():($._isalert&&d.find('.alert_btn_cancel').remove())
			d.appendTo('body').find('.alert_btn_ok').focus();//让对话框打开后支持直接键盘回车触发确定按钮点击
			d.ok =  function(t){d.find('.alert_btn_ok').text(t||'确定');return d}
			d.cancel = function(t){d.find('.alert_btn_cancel').text(t||'取消');return d}
			d.content = function(t){t&&d.find('.alert_content').html(t);return d}
			d.close = function(){d.one('webkitTransitionEnd transitionEnd',function(){d.remove();}).removeClass('alert_show')}
			d.addClass('alert_show')
		}
		$._isalert=$._isload=0;
		return d;
	},
	$.tips=function(m,t){
		if(m){
			if($._ismob){
				$('.alert_tips').remove();
				$('<div class="alert_tips mob"><div>'+m+'</div></div>').appendTo('body').one('webkitAnimationEnd animationEnd',function(){$(this).remove()})
			}else{
				var tipsContainer = $('.alert_tips');
				tipsContainer.length||(tipsContainer=$('<div class="alert_tips pc"></div>').appendTo('body'));
				$('<div>'+m+'</div>').appendTo(tipsContainer).fadeIn('fast').delay(t||2e3).slideUp('fast',function(){$(this).remove();});
			}
		}
	}
	$.load=function(){
		$('.alert_overlay').remove();
		$._isload =1;
		var d = $.confirm.call($,arguments[0]||"加载中，请稍后...");
		$.loaded = d.close;
		return d;
	}
}($)