	
	var mbTarget;
	function getMobileDevice() {
		var target = '';
		var useragent = navigator.userAgent.toLowerCase();
		var devices = ['iphone', 'ipod', 'ipad', 'android', 'blackberry', 'windows ce', 'nokia', 'webos', 'opera mini', 'samsung', 'lg', 'mi', 'sonyericsson', 'opera mobi', 'iemobile', 'huawei', 'oppo', 'mot'];
		devices.forEach(function(device){
			if(useragent.indexOf(device) >= 0){
				target = device;
			}
		});
		return mbTarget = target; 
	}

	var yOffset = 0; 
	var prevScrollHeight = 0;
	var currentScene = 0; 
	var enterNewScene = false; 
	var acc = 0.2;
	var delayedYOffset = 0;
	var rafId;
	var rafState;
	var introBox_bottom = document.getElementsByClassName("wh bottom")[0];
	var introBox = document.getElementsByClassName("intro")[0];
	var header = document.getElementsByClassName("header")[0];

	var sceneInfo = [
		{
			// 0
			type: 'sticky',
			heightNum: 2,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-0'),
				movie_wrap: document.querySelector('#scroll-section-0 .movie_wrap'),
				movie: document.querySelector('#scroll-section-0 .movie_wrap .video1'),
				messageA: document.querySelector('#scroll-section-0 .sticky-elem'),
			},
			values: {
				movie_wrap_translateY_out: [0, -100, { start: 0.51, end: 1 }],
				messageA_translateY_out: [0, -100, { start: 0.51, end: 1 }],
				next_translateY_in: [100, 0, { start: 0.75, end: 1 }],
				next_opacity_in: [0, 1, { start: 0.75, end: 1 }],
			}
		},
		{
			// 1
			type: 'sticky',
			heightNum: 1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1'),
				messageA: document.querySelector('#scroll-section-1 .sticky-elem'),				
			},
		},
		{
			// 2
			type: 'normal',
			heightNum: 6,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2'),
				content: document.querySelector('#scroll-section-2 .sticky-elem'),

			},
			values: {
			}
		},
		{
			// 3
			type: 'sticky',
			heightNum: 1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3'),
				messageA: document.querySelector('#scroll-section-3 .sticky-elem'),				
			},
		},
		{
			// 4
			type: 'normal',
			//heightNum: 1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-4'),
				content: document.querySelector('#scroll-section-4 > div'),
				movie_wrap: document.querySelector('#scroll-section-4 .movie_wrap'),
				movie: document.querySelector('#scroll-section-4 .movie_wrap .video2'),
				messageA: document.querySelector('#scroll-section-4 .sticky-elem'),				
			},
		},
		{
			// 5
			type: 'normal',
			//heightNum: 3,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-5'),
				content: document.querySelector('#scroll-section-5 .sticky-elem'),				
			},
		},
		{
			// 6
			type: 'sticky',
			heightNum: 2,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-6'),
				messageA: document.querySelector('#scroll-section-6 .sticky-elem'),				
			},
			values: {
				messageA_translateY_in: [100, 0, { start: 0.37, end: 1 }],
				messageA_translateY_out: [0, -100, { start: 0.5, end: 1 }],
			}
		},		
		{
			// 7
			type: 'sticky',
			heightNum: 4,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-7'),
				messageB: document.querySelector('#scroll-section-7 .sticky-elem.sec7_st2'),	
				sec7_st2_video1: document.querySelector('#scroll-section-7 .sec7_st2_video1'),
				sec7_st2_video2: document.querySelector('#scroll-section-7 .sec7_st2_video2'),
				sec7_st2_video3: document.querySelector('#scroll-section-7 .sec7_st2_video3'),
				sec7_st2_video4: document.querySelector('#scroll-section-7 .sec7_st2_video4'),
			},
			values: {
				messageB_translateY_in: [100, 40, { start: 0.7, end: 1 }],
				messageB_translateY_in2: [40, 0, { start: 0, end: 0.07 }],
				messageB_translateY_out: [0, -100, { start: 0.75, end: 1 }],
			}
		},		
		{
			// 8
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-8'),
				messageB: document.querySelector('#scroll-section-8 .sticky-elem.sec8_st2'),
				sec8_st2_video1: document.querySelector('#scroll-section-8 .sec8_st2_video1'),
				sec8_st2_video2: document.querySelector('#scroll-section-8 .sec8_st2_video2'),
				sec8_st2_video3: document.querySelector('#scroll-section-8 .sec8_st2_video3'),
				sec8_st2_video4: document.querySelector('#scroll-section-8 .sec8_st2_video4'),
			},
			values: {
				messageB_translateY_in: [100, 45, { start: 0.86, end: 1 }],
				messageB_translateY_in2: [45, 0, { start: 0, end: 0.09 }],
				messageB_translateY_out: [0, -100, { start: 0.8, end: 1 }],
			}
		},
		{
			// 9
			type: 'normal',
			//heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-9'),
				content: document.querySelector('#scroll-section-9 > div'),
				messageA: document.querySelector('#scroll-section-9 .sticky-elem.sec9_st1'),
				messageB: document.querySelector('#scroll-section-9 .sticky-elem.sec9_st2'),
			},
			values: {
				messageA_translateY_in: [100, 0, { start: 0.9, end: 1 }],	
				messageA_translateY_out: [0, -100, { start: 0.3, end: 0.6 }],	
				messageB_translateY_in: [100, 0, { start: 0.3, end: 0.6 }],
				messageB_translateY_out: [0, -100, { start: 0.8, end: 1 }],					
			}
		}
	];

	var sceneInfoR = [
		{
			// 0
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-0'),
				movie_wrap: document.querySelector('#scroll-section-0 .movie_wrap'),
				movie: document.querySelector('#scroll-section-0 .movie_wrap .video1'),
				content: document.querySelector('#scroll-section-0 .sticky-elem'),
			},
		},
		{
			// 1
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1'),
				content: document.querySelector('#scroll-section-1 .sticky-elem'),				
			},
		},
		{
			// 2
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2'),
				content: document.querySelector('#scroll-section-2 .sticky-elem'),
			},
		},
		{
			// 3
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3'),
				content: document.querySelector('#scroll-section-3 .sticky-elem'),				
			},
		},
		{
			// 4
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-4'),
				content: document.querySelector('#scroll-section-4 > div'),
				movie_wrap: document.querySelector('#scroll-section-4 .movie_wrap'),
				movie: document.querySelector('#scroll-section-4 .movie_wrap .video2'),
				messageA: document.querySelector('#scroll-section-4 .sticky-elem'),				
			},
		},
		{
			// 5
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-5'),
				content: document.querySelector('#scroll-section-5 .sticky-elem'),				
			},
		},
		{
			// 6
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-6'),
				content: document.querySelector('#scroll-section-6 .sticky-elem'),				
			},
		},		
		{
			// 7
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-7'),
				content: document.querySelector('#scroll-section-7 .sticky-elem.sec7_st2'),	
				sec7_st2_video1: document.querySelector('#scroll-section-7 .sec7_st2_video1'),
				sec7_st2_video2: document.querySelector('#scroll-section-7 .sec7_st2_video2'),
				sec7_st2_video3: document.querySelector('#scroll-section-7 .sec7_st2_video3'),
				sec7_st2_video4: document.querySelector('#scroll-section-7 .sec7_st2_video4'),
			},
		},		
		{
			// 8
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-8'),
				content: document.querySelector('#scroll-section-8 .sticky-elem.sec8_st2'),
			},
		},
		{
			// 9
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-9'),
				content: document.querySelector('#scroll-section-9 > div'),
				messageA: document.querySelector('#scroll-section-9 .sticky-elem.sec9_st1'),
				messageB: document.querySelector('#scroll-section-9 .sticky-elem.sec9_st2'),
			},
		}
	];

	var movWidth = window.innerHeight * 0.591;
	var movHeight = window.innerHeight;
	var movWidthRatio = window.innerWidth / movWidth;
	var movHeightRatio = window.innerHeight / movHeight;
	var movieScaleRatio;
	function setLayout() {
		for (let i = 0; i < sceneInfo.length; i++) {
			if (sceneInfo[i].type === 'sticky') {
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			} else if (sceneInfo[i].type === 'normal')  {
				sceneInfo[i].scrollHeight = sceneInfo[i].objs.content.offsetHeight;
			}
            sceneInfo[i].objs.container.style.height = sceneInfo[i].scrollHeight +"px";
		}

		yOffset = window.pageYOffset;

		var totalScrollHeight = 0;
		for (var i = 0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
		document.body.setAttribute('id', "show-scene-"+ currentScene);

		sceneInfo[0].objs.movie_wrap.style.height = movHeight +"px";
		sceneInfo[0].objs.movie.style.height = movHeight +"px";
		sceneInfo[0].objs.movie.style.width = movWidth +"px";

		if (movWidthRatio <= movHeightRatio) {
			movieScaleRatio = movHeightRatio;
		} else {
			movieScaleRatio = movWidthRatio;
		}
		sceneInfo[0].objs.movie.style.transform = "scale("+ movieScaleRatio +")";

		sceneInfo[7].objs.messageB.style.height = window.innerHeight + "px";
		sceneInfo[8].objs.messageB.style.height = window.innerHeight + "px";
	}

	function setLayoutR() {

		for (let i = 0; i < sceneInfoR.length; i++) {
			sceneInfoR[i].scrollHeight = sceneInfoR[i].objs.content.offsetHeight;
		}

		yOffset = window.pageYOffset;

		var totalScrollHeight = 0;
		for (var i = 0; i < sceneInfoR.length; i++) {
			totalScrollHeight += sceneInfoR[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
		document.body.setAttribute('id', "show-scene-"+ currentScene);
	}

	function setDeps() {
		document.getElementsByClassName("footer")[0].style.zIndex = "10";
		sceneInfo[0].objs.container.style.zIndex = "-1";
		sceneInfo[1].objs.container.style.zIndex = "-1";
		sceneInfo[2].objs.container.style.zIndex = "-1";
		sceneInfo[3].objs.container.style.zIndex = "-1";
		sceneInfo[4].objs.container.style.zIndex = "-1";
		sceneInfo[5].objs.container.style.zIndex = "-1";
		sceneInfo[6].objs.container.style.zIndex = "-1";
		sceneInfo[7].objs.container.style.zIndex = "-1";
		sceneInfo[8].objs.container.style.zIndex = "-1";
		sceneInfo[9].objs.container.style.zIndex = "-1";
	}

	var lastScroll = 0;
	function checkMenu() {
		if (yOffset > sceneInfo[0].scrollHeight) {
			var st = $(this).scrollTop();
			if (st > lastScroll){
				document.getElementsByClassName("header")[0].classList.add('off');
			}
			else {
				document.getElementsByClassName("header")[0].classList.remove('off');
			}
			lastScroll = st;	
			
		} else {
			document.getElementsByClassName("header")[0].classList.remove('off');			
		}
	}

	function calcValues(values, currentYOffset) {
		var rv;
		var scrollHeight = sceneInfo[currentScene].scrollHeight;
		var scrollRatio = currentYOffset / scrollHeight;		
		
		if (values.length === 3) {
			var partScrollStart = values[2].start * scrollHeight;
			var partScrollEnd = values[2].end * scrollHeight;
			var partScrollHeight = partScrollEnd - partScrollStart;

			if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
				rv = Math.floor(((currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0]) * 100) / 100;
			} else if (currentYOffset < partScrollStart) {
				rv = values[0];
			} else if (currentYOffset > partScrollEnd) {
				rv = values[1];
			}
		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0];
		}
		return rv;
	}

	function playAnimation() {
		var objs = sceneInfo[currentScene].objs;
		var values = sceneInfo[currentScene].values;
		var currentYOffset = yOffset - prevScrollHeight;
		var scrollHeight = sceneInfo[currentScene].scrollHeight;
		var scrollRatio = currentYOffset / scrollHeight;

		switch (currentScene) {
			case 0:
				setDeps();
				sceneInfo[7].objs.container.style.zIndex = "-1";
				sceneInfo[8].objs.container.style.zIndex = "-1";
				sceneInfo[0].objs.container.style.zIndex = "1";
				sceneInfo[0].objs.movie.play();
				objs.movie_wrap.style.transform = "translate3d(0,0%,0)";
				objs.messageA.style.transform = "translate3d(0,0%,0)";

				if (scrollRatio <= 0.1) {
					introBox.style.zIndex = "2";
					introBox.classList.remove('aniout');
					introBox_bottom.style.height = "5.319vw";	
					setTimeout(function() {
						introBox.classList.add('aniin');											
					}, 100);	
					setTimeout(function() {
						header.classList.add('hintro');
						objs.messageA.children[0].classList.remove('on');
					}, 200);	
				} else {				
					introBox.classList.add('aniout');
					introBox_bottom.style.height = "0px";		
					setTimeout(function() {
						header.classList.remove('hintro');
						objs.messageA.children[0].classList.add('on');
					}, 200);	
					sceneInfo[0].objs.movie_wrap.classList.add('on');
				}

				if (scrollRatio > 0.51){
					objs.movie_wrap.style.transform = "translate3d(0, "+ calcValues(values.movie_wrap_translateY_out, currentYOffset) +"%, 0)";		
					objs.messageA.style.transform = "translate3d(0, "+ calcValues(values.messageA_translateY_out, currentYOffset) +"%, 0)";						
				}

				if (yOffset >= (scrollHeight - window.innerHeight)){					
					introBox.style.zIndex = "-1";
					sceneInfo[1].objs.container.style.zIndex = "2";
				}
				sceneInfo[1].objs.messageA.classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[1].objs.messageA.classList.add('on');
				}

				break;

			case 1:
				setDeps();
				introBox.style.zIndex = "-1";
				sceneInfo[7].objs.container.style.zIndex = "-1";
				sceneInfo[8].objs.container.style.zIndex = "-1";
				sceneInfo[0].objs.container.style.zIndex = "-1";
				sceneInfo[1].objs.container.style.zIndex = "1";
				sceneInfo[2].objs.container.style.zIndex = "-1";
				sceneInfo[0].objs.movie.pause();
				sceneInfo[0].objs.movie_wrap.style.transform = "translate3d(0,-100%,0)";
				sceneInfo[0].objs.messageA.style.transform = "translate3d(0,-100%,0)";
				
				if (scrollRatio >= 0) {
					objs.messageA.classList.add('on');
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					introBox.style.zIndex = "-1";
					sceneInfo[2].objs.container.style.zIndex = "2";
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.5)))){
					sceneInfo[2].objs.content.children[0].classList.add('on');
				} else {
					sceneInfo[2].objs.content.children[0].classList.remove('on');
				}

				break;

			case 2:
				setDeps();
				sceneInfo[0].objs.movie.pause();
				sceneInfo[7].objs.container.style.zIndex = "-1";
				sceneInfo[8].objs.container.style.zIndex = "-1";
				sceneInfo[1].objs.container.style.zIndex = "-1";
				sceneInfo[2].objs.container.style.zIndex = "1";
				sceneInfo[3].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0.1){
					objs.content.children[1].classList.add('on');
				} else {
					objs.content.children[1].classList.remove('on');		
				}

				if (scrollRatio >= 0.3){
					objs.content.children[2].classList.add('on');
				} else {
					objs.content.children[2].classList.remove('on');		
				}

				if (scrollRatio >= 0.5){
					objs.content.children[3].classList.add('on');
				} else {
					objs.content.children[3].classList.remove('on');		
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[3].objs.container.style.zIndex = "2";
				}

				sceneInfo[3].objs.messageA.classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.8)))){
					sceneInfo[3].objs.messageA.classList.add('on');
				}

				break;

			case 3:
				setDeps();
				sceneInfo[0].objs.movie.pause();
				sceneInfo[7].objs.container.style.zIndex = "-1";
				sceneInfo[8].objs.container.style.zIndex = "-1";
				sceneInfo[2].objs.container.style.zIndex = "-1";
				sceneInfo[3].objs.container.style.zIndex = "1";
				sceneInfo[4].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0) {
					objs.messageA.classList.add('on');
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[4].objs.container.style.zIndex = "2";
					sceneInfo[4].objs.movie.play();
				} else {
					sceneInfo[4].objs.movie.pause();
				}

				break;

			case 4:
				setDeps();
				sceneInfo[0].objs.movie.pause();
				sceneInfo[7].objs.container.style.zIndex = "-1";
				sceneInfo[8].objs.container.style.zIndex = "-1";
				sceneInfo[3].objs.container.style.zIndex = "-1";
				sceneInfo[4].objs.container.style.zIndex = "1";
				sceneInfo[5].objs.container.style.zIndex = "-1";
				sceneInfo[4].objs.movie.play();

				if (scrollRatio >= 0.2) {
					objs.messageA.classList.add('on');
				} else {
					objs.messageA.classList.remove('on');
				}
				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[5].objs.container.style.zIndex = "2";
				}							
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[5].objs.content.children[0].classList.add('on');
				} else {
					sceneInfo[5].objs.content.children[1].classList.remove('on');
					sceneInfo[5].objs.content.children[0].classList.remove('on');	
				}

				break;

			case 5:
				setDeps();
				sceneInfo[7].objs.container.style.zIndex = "-1";
				sceneInfo[8].objs.container.style.zIndex = "-1";
				sceneInfo[0].objs.movie.pause();
				sceneInfo[4].objs.movie.pause();
				sceneInfo[4].objs.container.style.zIndex = "-1";
				sceneInfo[5].objs.container.style.zIndex = "1";
				sceneInfo[6].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0) {
					objs.content.children[1].classList.add('on');
				}

				if (scrollRatio >= 0.25) {
					objs.content.children[2].classList.add('on');
				} else {
					objs.content.children[2].classList.remove('on');
				}

				if (scrollRatio >= 0.4) {
					objs.content.children[3].classList.add('on');
				} else {
					objs.content.children[3].classList.remove('on');
				}

				sceneInfo[6].objs.messageA.style.transform =  "translate3d(0, 100%, 0)";
				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[6].objs.container.style.zIndex = "2";
					sceneInfo[6].objs.messageA.style.transform = "translate3d(0, "+ calcValues(sceneInfo[6].values.messageA_translateY_in, currentYOffset) +"%, 0)";					
				}
				sceneInfo[6].objs.messageA.children[0].classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.3)))){
					sceneInfo[6].objs.messageA.children[0].classList.add('on');
				}

				break;

			case 6:
				setDeps();
				sceneInfo[5].objs.container.style.zIndex = "-1";
				sceneInfo[6].objs.container.style.zIndex = "1";
				sceneInfo[7].objs.container.style.zIndex = "-1";
				sceneInfo[8].objs.container.style.zIndex = "-1";
				sceneInfo[7].objs.messageB.classList.remove('fix');
				sceneInfo[7].objs.messageB.classList.remove('out');	

				if (scrollRatio >= 0) {
					objs.messageA.style.transform =  "translate3d(0, 0, 0)";
					objs.messageA.children[0].classList.add('on');
				}
				if (scrollRatio >= 0.25) {
					objs.messageA.children[0].classList.remove('on');
					objs.messageA.children[1].classList.add('on');
				} else {
					objs.messageA.children[1].classList.remove('on');
				}

				if (scrollRatio >= 0.5) {
					objs.messageA.style.transform = "translate3d(0, "+ calcValues(values.messageA_translateY_out, currentYOffset) +"%, 0)";
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[7].objs.container.style.zIndex = "2";
					sceneInfo[7].objs.messageB.children[1].children[0].classList.add('on');
				}

				break;
			
			case 7:
				setDeps();
				sceneInfo[6].objs.container.style.zIndex = "-1";
				sceneInfo[7].objs.container.style.zIndex = "1";
				sceneInfo[8].objs.container.style.zIndex = "-1";
				sceneInfo[8].objs.messageB.classList.remove('fix');
				sceneInfo[8].objs.messageB.classList.remove('out');	

				if (scrollRatio >= 0) {					
					objs.messageB.children[1].children[0].children[0].classList.add('on');
					objs.messageB.children[2].children[0].classList.add('on');
					objs.messageB.classList.add('fix');
				} else {
					objs.messageB.classList.remove('fix');
				}
				if (scrollRatio >= 0.15) {
					objs.messageB.children[1].children[0].children[0].classList.remove('on');
					objs.messageB.children[1].children[0].children[1].classList.add('on');
					objs.sec7_st2_video1.play();
				} else {
					objs.messageB.children[1].children[0].children[1].classList.remove('on');		
				}
				if (scrollRatio >= 0.3) {
					objs.messageB.children[2].children[0].classList.remove('on');
					objs.messageB.children[2].children[1].classList.add('on');
					objs.messageB.children[1].children[0].children[1].classList.remove('on');
					objs.messageB.children[1].children[0].children[2].classList.add('on');
					objs.sec7_st2_video2.play();
				} else {
					objs.messageB.children[2].children[1].classList.remove('on');
					objs.messageB.children[1].children[0].children[2].classList.remove('on');		
				}
				if (scrollRatio >= 0.45) {
					objs.messageB.children[2].children[1].classList.remove('on');
					objs.messageB.children[2].children[2].classList.add('on');
					objs.messageB.children[1].children[0].children[2].classList.remove('on');
					objs.messageB.children[1].children[0].children[3].classList.add('on');
					objs.messageB.children[1].children[0].classList.add('ani');
					objs.sec7_st2_video3.play();
				} else {
					objs.messageB.children[2].children[2].classList.remove('on');
					objs.messageB.children[1].children[0].children[3].classList.remove('on');
					objs.messageB.children[1].children[0].classList.remove('ani');
					objs.sec7_st2_video3.currentTime = 0;
				}

				if (scrollRatio >= 0.6) {
					objs.messageB.children[1].children[0].classList.remove('ani');					
					objs.messageB.children[2].children[2].classList.remove('on');
					objs.messageB.children[2].children[3].classList.add('on');
					objs.messageB.children[1].children[0].children[3].classList.remove('on');
					objs.messageB.children[1].children[0].children[4].classList.add('on');
					objs.sec7_st2_video3.currentTime = 0;
					objs.sec7_st2_video4.play();
				} else {
					objs.messageB.children[2].children[3].classList.remove('on');
					objs.messageB.children[1].children[0].children[4].classList.remove('on');
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					objs.messageB.classList.remove('fix');
					objs.messageB.classList.add('out');	
					sceneInfo[8].objs.container.style.zIndex = "2";
				} else {
					objs.messageB.classList.remove('out');	
				}

				sceneInfo[8].objs.messageB.children[1].children[0].classList.remove('on');
				sceneInfo[8].objs.messageB.children[1].children[4].classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.9)))){
					sceneInfo[8].objs.messageB.children[1].children[0].classList.add('on');
					sceneInfo[8].objs.messageB.children[1].children[4].classList.add('on');
				}

				break;				
			
			case 8:
				setDeps();
				sceneInfo[7].objs.container.style.zIndex = "-1";
				sceneInfo[8].objs.container.style.zIndex = "1";
				sceneInfo[9].objs.container.style.zIndex = "-1";
				sceneInfo[7].objs.messageB.classList.remove('fix');
				sceneInfo[7].objs.messageB.classList.add('out');	

				if (scrollRatio >= 0) {
					objs.messageB.children[1].children[4].classList.add('on');
					objs.messageB.children[1].children[0].children[0].classList.add('on');
					objs.messageB.children[1].children[0].children[1].classList.add('on');
					objs.sec8_st2_video1.play();
					objs.messageB.classList.add('fix');
				} else {
					objs.messageB.children[1].children[0].children[1].classList.remove('on');
					objs.messageB.classList.remove('fix');
				}
				if (scrollRatio >= 0.25) {	
					objs.messageB.children[1].children[0].children[0].classList.remove('on');
					objs.messageB.children[1].children[0].children[1].classList.remove('on');
					objs.messageB.children[1].children[1].children[0].classList.add('on');
					objs.messageB.children[1].children[1].children[1].classList.add('on');
					objs.sec8_st2_video2.play();
				} else {
					objs.messageB.children[1].children[1].children[0].classList.remove('on');
					objs.messageB.children[1].children[1].children[1].classList.remove('on');
				}
				if (scrollRatio >= 0.4) {	
					objs.messageB.children[1].children[1].children[0].classList.remove('on');
					objs.messageB.children[1].children[1].children[1].classList.remove('on');
					objs.messageB.children[1].children[2].children[0].classList.add('on');
					objs.messageB.children[1].children[2].children[1].classList.add('on');
					objs.sec8_st2_video3.play();
				} else {
					objs.messageB.children[1].children[2].children[0].classList.remove('on');
					objs.messageB.children[1].children[2].children[1].classList.remove('on');
				}
				if (scrollRatio >= 0.65) {	
					objs.messageB.children[1].children[2].children[0].classList.remove('on');
					objs.messageB.children[1].children[2].children[1].classList.remove('on');
					objs.messageB.children[1].children[3].children[0].classList.add('on');
					objs.messageB.children[1].children[3].children[1].classList.add('on');
					objs.sec8_st2_video4.play();
				} else {
					objs.messageB.children[1].children[3].children[0].classList.remove('on');
					objs.messageB.children[1].children[3].children[1].classList.remove('on');
				}
				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){	
					sceneInfo[9].objs.container.style.zIndex = "2";
					objs.messageB.classList.remove('fix');
					objs.messageB.classList.add('out');	
				} else {
					objs.messageB.classList.remove('out');
				}

				sceneInfo[9].objs.messageB.children[0].classList.remove('on');
				sceneInfo[9].objs.messageB.children[1].classList.remove('on');
				sceneInfo[9].objs.messageB.children[2].classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[9].objs.messageA.classList.add('on');
				} else {
					sceneInfo[9].objs.messageA.classList.remove('on');
				}

				break;			

			case 9:	
				
				setDeps();
				sceneInfo[7].objs.container.style.zIndex = "-1";
				sceneInfo[8].objs.container.style.zIndex = "-1";
				sceneInfo[9].objs.container.style.zIndex = "1";
				sceneInfo[8].objs.messageB.classList.remove('fix');
				sceneInfo[8].objs.messageB.classList.add('out');	

				if (scrollRatio >= 0){
					objs.messageA.classList.add('on');
					objs.messageB.children[0].classList.add('on');
				}
				if (scrollRatio >= 0.2){
					objs.messageB.children[1].classList.add('on');
				}
				if (scrollRatio >= 0.3){
					objs.messageB.children[2].classList.add('on');
				} 

				break;
		}
	}

	function playAnimationR() {
		var objs = sceneInfoR[currentScene].objs;
		var values = sceneInfoR[currentScene].values;
		var currentYOffset = yOffset - prevScrollHeight;
		var scrollHeight = sceneInfoR[currentScene].scrollHeight;
		var scrollRatio = currentYOffset / scrollHeight;

		switch (currentScene) {
			case 0:
				sceneInfoR[0].objs.movie.play();
				objs.container.style.zIndex = "1";

				break;
			case 1:
				objs.container.style.zIndex = "1";
				break;
			case 2:
				objs.container.style.zIndex = "1";
				break;
			case 3:
				objs.container.style.zIndex = "1";
				break;
			case 4:
				objs.container.style.zIndex = "1";
				sceneInfoR[4].objs.movie.play();
				break;
			case 5:
				objs.container.style.zIndex = "1";
				break;
			case 6:
				objs.container.style.zIndex = "1";
				break;
			case 7:
				objs.container.style.zIndex = "1";
				break;
		}		
	}

	function scrollLoop() {
		enterNewScene = false;
		prevScrollHeight = 0;
		delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;		

		for (var i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight;			
		}

		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			enterNewScene = true;			
			if (currentScene < sceneInfo.length - 1) {
				currentScene++;
			} 
			document.body.setAttribute('id', "show-scene-"+ currentScene);
		}

		if (yOffset < prevScrollHeight) {
			enterNewScene = true;
			if (currentScene === 0) return;
			currentScene--;
			document.body.setAttribute('id', "show-scene-"+ currentScene);
		}

		if (enterNewScene) return;
		playAnimation();
	}

	function scrollLoopR() {
		enterNewScene = false;
		prevScrollHeight = 0;
		delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;		

		for (var i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfoR[i].scrollHeight;			
		}

		if (yOffset > prevScrollHeight + sceneInfoR[currentScene].scrollHeight) {
			enterNewScene = true;			
			if (currentScene < sceneInfoR.length - 1) {
				currentScene++;
			} 
			document.body.setAttribute('id', "show-scene-"+ currentScene);
		}

		if (yOffset < prevScrollHeight) {
			enterNewScene = true;
			if (currentScene === 0) return;
			currentScene--;
			document.body.setAttribute('id', "show-scene-"+ currentScene);
		}

		if (enterNewScene) return;
		playAnimationR();
	}

	function loop() {
		delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

        if (delayedYOffset < 1) {
            scrollLoop();
			scrollLoopR();
			
			setTimeout(function() {
				scrollTo(0, 2);					
			}, 20);
        }
		
		/*       
        if ((document.body.offsetHeight - window.innerHeight) - delayedYOffset < 1) {
            var tempYOffset = yOffset;
            scrollTo(0, tempYOffset + 10);
        }*/ 

		rafId = requestAnimationFrame(loop);

		if (Math.abs(yOffset - delayedYOffset) < 1) {
			cancelAnimationFrame(rafId);
			rafState = false;
		}
	}
	
	window.addEventListener('load', function(){	

		$(".header .right_link .btn").click(function(){			
			$(".sub_nav").addClass("on");
			$(".sub_nav").on('scroll touchmove mousewheel', function(e){
				e.preventDefault();
				e.stopPropagation(); 
				return false;
			});
		});
		$(".sub_nav .closebtn").click(function(){		
			$(".sub_nav").removeClass("on");
			$(".sub_nav").off('scroll touchmove mousewheel'); 
		});

		getMobileDevice();
		document.body.classList.remove('before-load');

		var introVideo = document.getElementsByClassName("video1")[0];
		introBox.style.zIndex = "-1";

		if (window.matchMedia("(orientation: landscape)").matches){
			setLayoutR();

			introBox.style.zIndex = "-1";
			introBox.style.display = "none";	
			header.classList.remove('hintro');	
			sceneInfo[0].objs.movie_wrap.classList.add('on');
			sceneInfo[0].objs.messageA.children[0].classList.add('on');
			sceneInfo[0].objs.container.style.zIndex = "1";

			if (yOffset > sceneInfo[0].scrollHeight){
				introVideo.pause();
			} else {
				introVideo.play();
			}

			setTimeout(function() {
				yOffset += 5;
				scrollTo(0, yOffset);	
			}, 20);

		} else {	
			setLayout();

			var tempYOffset = yOffset;
			var tempScrollCount = 0;
			
			if (yOffset >= sceneInfo[0].scrollHeight){				
				introVideo.pause();
				sceneInfo[0].objs.container.style.zIndex = "-1";
				header.classList.remove('hintro');	
				sceneInfo[0].objs.movie_wrap.classList.add('on');

				setTimeout(function() {
					yOffset += 5;
					scrollTo(0, yOffset);	
				}, 20);

			} else {

				introVideo.play();	
				sceneInfo[0].objs.container.style.zIndex = "1";

				if (tempYOffset < 10) {
					
					if (mbTarget == "iphone"){			
						scrollTo(0, 5000);	
						setTimeout(function() {
							scrollTo(0, 0);	
						},500);
						setTimeout(function() {
							header.classList.add('hintro');
						},1);	
					} else {
						setTimeout(function() {
							scrollTo(0, 0);	
							header.classList.add('hintro');
						},1);	
					}

					introBox.style.zIndex = "2";
					introBox_bottom.style.height = "100%";
					header.classList.remove('off');

					setTimeout(function() {
						introBox_bottom.style.height = "5.319vw";
					}, 100);	
					setTimeout(function() {
						introBox.classList.add('aniin');
						sceneInfo[0].objs.movie_wrap.classList.add('on');
					}, 3000);		
				} else {
					header.classList.remove('hintro');	
					sceneInfo[0].objs.movie_wrap.classList.add('on');

					setTimeout(function() {
						yOffset += 5;
						scrollTo(0, yOffset);	
					}, 20);
				}
			}
		}

		if ((document.body.offsetHeight - window.innerHeight) - delayedYOffset < 1) {
            scrollTo(0, yOffset - 1);
        }

		window.addEventListener('resize', function(){

			if (window.matchMedia("(orientation: landscape)").matches){			
			} else {
				yOffset = window.pageYOffset;
				movWidth = window.innerHeight * 0.591;
				movHeight = window.innerHeight;
				movWidthRatio = window.innerWidth / movWidth;
				movHeightRatio = window.innerHeight / movHeight;
				movieScaleRatio;

				sceneInfo[0].objs.movie_wrap.style.height = movHeight +"px";
				sceneInfo[0].objs.movie.style.height = movHeight +"px";
				sceneInfo[0].objs.movie.style.width = movWidth +"px";

				if (movWidthRatio <= movHeightRatio) {
					movieScaleRatio = movHeightRatio;
				} else {
					movieScaleRatio = movWidthRatio;
				}
				sceneInfo[0].objs.movie.style.transform = "scale("+ movieScaleRatio +")";		

				sceneInfo[7].objs.messageB.style.height = window.innerHeight + "px";
				sceneInfo[8].objs.messageB.style.height = window.innerHeight + "px";
			}			

			if (yOffset > 0) {
				setTimeout(function() {
					yOffset += 5;
					scrollTo(0, yOffset);						
				}, 20);
			}
  		});	

		window.addEventListener('scroll', function(){
			yOffset = window.pageYOffset;
			checkMenu();	

			if (!rafState) {
				rafId = requestAnimationFrame(loop);
				rafState = true;
			}

			if (window.matchMedia("(orientation: landscape)").matches){
				scrollLoopR();	 
			} else {				
				scrollLoop();
			}			
		});
		
		window.addEventListener('orientationchange', function(){
			scrollTo(0, 0);
			setTimeout(function() {
				window.location.reload();
			}, 500);
		});
		
  		document.querySelector('.loading').addEventListener('transitionend', function(e){
  			document.body.removeChild(e.currentTarget);
  		});
	});





