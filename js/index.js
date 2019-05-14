
//body的高度
$(function(){
	
	var $totalcontent = $('body>div:not(:first)')
	var totalheight = 0;
	var Screenheight = Screen.height
	var Screenwidth = Screen.width
	$('body>div').css({
		"height":Screenheight,
		"width":Screenwidth
	})
	
	$totalcontent.each(function(){	
		totalheight = totalheight + $(this).height()		
	})
   $('body').height(totalheight)
   console.log($('body').height())
})

//secend图片蒙版
$(function() {
	/*var $menban1 = $('.mengban1')*/
	var $image = $('.indeximage')
	$image.hover(function() {
		/*$menban1.css('opacity','0')*/
		$(this).animate({
			height: 220,
			width: 300,
			marginLeft: -10,
			marginTop: -10
		})
	}, function() {
		/*$menban1.css('opacity','0.5')*/
		$(this).animate({
			height: 200,
			width: 280,
			marginLeft: 0,
			marginTop: 0
		})
	})
})
//secend图片手动轮换
$(function() {
	var $index1 = $('#index1')
	var $index2 = $('#index2')
	var $index3 = $('#index3')
	var $content = $('.container > .content')
	/*var $menban1 = $('.mengban1')*/
	$index1.hover(function() {
		$index1.css('background-image', 'url(img/index_bac_pic.jpg)')
		$content.animate({
			top: 0
		})
		/*$menban1.animate({
			top:60
		})*/
	}, function() {
		$index1.css('background-image', '')
	})
	$index2.hover(function() {
		$index2.css('background-image', 'url(img/index_bac_pic.jpg)')
		$content.animate({
			top: -330
		})
		/*$menban1.animate({
			top:-270
		})*/
	}, function() {
		$index2.css('background-image', '')
	})
	$index3.hover(function() {
		$index3.css('background-image', 'url(img/index_bac_pic.jpg)')
		$content.animate({
			top: -660
		})
		/*$menban1.animate({
			top:-600
		})*/
	}, function() {
		$index3.css('background-image', '')
	})
})
var getscolltop = 0
//滚动滚动条移动相应高度
$(function() {
	//页面高度
	var itemscolldistance = 700

	var $body = $('body,html')

	$body.scrollTop(getscolltop)
	//监听鼠标滚动事件
	window.addEventListener('mousewheel', function(e) {
		if(e.wheelDelta > 0) {

			console.log('up')
			move_pic('up')
		} else {
			console.log('down')
			move_pic('down')
		}
	})

	//监听键盘
	window.addEventListener('keydown', function(e) {
		if(e.keyCode == 38 || e.keyCode == 37) {
			move_pic('up')
		} else if(e.keyCode == 40 || e.keyCode == 39) {
			move_pic('down')
		}
	})
	//点击小点移动到相应的界面
	$(function() {
		var $point = $('.index_point>ul>li')
		var topdistance = 280
		$.each($point, function() {
			this.style.top = topdistance + 'px'
			topdistance = topdistance + 30
		});
		$point.click(function() {
			var index = $(this).index()
			$(this).attr({
				height: 10 + 'px',

			})
			$body.animate({
				scrollTop: index * itemscolldistance
			})
		})
	})
	var flag = true
	//页面滚动指定移动距离
	function move_pic(direction) {

		var totaltime = 500
		var itemtime = 20
		var itemdistance = itemscolldistance / (totaltime / itemtime)
		var currdistance = 0
		getscolltop = $body.scrollTop()
		if(flag) {
			flag = false
			var intervalId = setInterval(function() {
				currdistance = currdistance + itemdistance
				if(currdistance == itemscolldistance) {
					clearInterval(intervalId)
					flag = true
				}
				if(direction == 'up') {
					if(getscolltop != 0) {
						getscolltop = getscolltop - itemdistance
						$body.scrollTop(getscolltop)
					}
				} else if(direction == 'down') {
					getscolltop = getscolltop + itemdistance
					$body.scrollTop(getscolltop)
				}
			}, itemtime)
		}

	}

})
//二级菜单
$(function() {
	var $title = $('.guide>ul>li')
	var $ul = $('.title>ul')
	var $content = $('.content')
	$title.hover(function() {
		var index = $(this).index()
		$($ul[index]).slideDown()
		$($title[index]).prepend("<div id='line'></div>")
	}, function() {
		var index = $(this).index()
		$($ul[index]).slideUp()
		$('div').remove('#line')
	})
})
//首页图片轮播
//图片轮播
$(function() {
	var $img = $('.images')
	var $point = $('.point>span')
	/*新建循环定时器*/
	var totaldistance = -1400
	var totaltime = 200
	var itemtime = 10
	var itemdistance = totaldistance / (totaltime / itemtime)
	var currdistance = 0
	var pointacount = $('.point>span').length
	var index = 0

	/*点击point图片跳转到相应的位置*/
	$point.hover(function() {
		clearInterval(intervalId1)
		$point[index].style.backgroundColor = 'white'
		var index1 = $(this).index()
		index = index1
		currdistance = totaldistance * index1
		$img.animate({
			left: currdistance
		}, 500)
		$point[index1].style.backgroundColor = 'red'
	}, function() {
		intervalId1 = setInterval(function() {
			index++
			$point[index - 1].style.backgroundColor = 'white'
			if(index > 3) {
				index = 0
			}
			$point[index].style.backgroundColor = 'red'
			change_pic()
		}, 5000)
	})

	/*设置第一个point的颜色为red*/
	$point[index].style.backgroundColor = 'red'
	/*图片轮播*/
	var intervalId1 = setInterval(function() {
		index++
		$point[index - 1].style.backgroundColor = 'white'
		if(index > 3) {
			index = 0
		}
		$point[index].style.backgroundColor = 'red'
		change_pic()
	}, 5000)
	/*图片移动*/
	function change_pic() {
		var intervalId = setInterval(function() {
			currdistance += itemdistance
			console.log(currdistance)
			if(currdistance % totaldistance == 0) {
				clearInterval(intervalId)
			}
			if(currdistance < pointacount * totaldistance) {
				currdistance = 0
			}
			$img.css('left', currdistance)
		}, itemtime)

	}
})
//二维码的显示与隐藏
$(function() {
	var $qq = $('#qq')
	var $weixin = $('#weixin')
	var $qq_pic = $('#qq_pic')
	var $weixin_pic = $('#weixin_pic')

	$qq_pic.hover(function() {
		console.log('enter')
		$qq.get(0).style.display = 'block'
	}, function() {
		$qq.get(0).style.display = 'none'
	})

	$weixin_pic.hover(function() {
		console.log('enter')
		$weixin.get(0).style.display = 'block'
	}, function() {
		$weixin.get(0).style.display = 'none'
	})
})

//third
$(function() {
	var $third_img = $('.third .third_img')
	var $third_td = $('.third td')
	$third_td.find('h4').hide()
	$third_td.css({
		'opacity':'0.8'
	})
	$third_td.hover(function(){
		$(this).css('opacity','1')
		$(this).find('h4').fadeIn(500)
	},function(){
		$(this).css('opacity','0.8')
		$(this).find('h4').fadeOut(500)
	})	
	$third_img.hover(function() {
		/* var index = $(this).index()
		 console.log(index)*/
		$(this).css({
			"transform": "scale(1.5)",
		})

	}, function() {
		$(this).css({
			"transform": "scale(1)",
		})

	})

	/*鼠标移动改变src*/
	var $left_jiantou = $('#left_jiantou')
	var $right_jiantou = $('#right_jiantou')
	var $table_div = $('.table_div')
	$left_jiantou.hover(function() {
		this.setAttribute('src', 'img/double_zuojiantou.png')
	}, function() {
		this.setAttribute('src', 'img/zuojiantou.png')
	})

	$right_jiantou.hover(function() {
		this.setAttribute('src', 'img/double_youjiantou.png')
	}, function() {
		this.setAttribute('src', 'img/youjiantou.png')
	})

	/*鼠标点击轮换table*/
	var offset_left = $table_div.position().left
	var totaldistance = 2520
	var itemdistance = 840
	$left_jiantou.click(function() {
		offset_left = offset_left + itemdistance
		if(offset_left > 0) {
			offset_left = -totaldistance + itemdistance
			$table_div.animate({
				left: offset_left
			})
		} else {
			$table_div.animate({
				left: offset_left
			})
		}
	})
	$right_jiantou.click(function() {
		offset_left = offset_left - itemdistance
		if(offset_left <= -totaldistance) {
			offset_left = 0
			$table_div.animate({
				left: offset_left
			})
		} else {
			$table_div.animate({
				left: offset_left
			})

		}
	})
})