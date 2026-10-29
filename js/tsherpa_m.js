	
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
	var sec2all = document.getElementsByClassName("sec2all")[0];
	var sec2_st2_video4 = document.getElementsByClassName("sec2_st2_video4")[0];	
	var sec2_st2_video5 = document.getElementsByClassName("sec2_st2_video5")[0];
	var sec2_st2_video6 = document.getElementsByClassName("sec2_st2_video6")[0];

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
				movie_wrap_translateY_out: [0, -100, { start: 0.5, end: 1 }],
				messageA_translateY_out: [0, -100, { start: 0.5, end: 1 }],
			}
		},
		{
			// 1
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1'),				
				messageA: document.querySelector('#scroll-section-1 .sticky-elem.sec1_st1'),		
				messageC: document.querySelector('#scroll-section-1 .sticky-elem.sec1_st3'),		
			},
			values: {
				messageB_translateY_in: [100, 65, { start: 0.85, end: 1 }],
				messageB_translateY_up: [65, 0, { start: 0, end: 0.1 }],
				messageC_translateY_in: [100, 15, { start: 0, end: 0.1 }],
				messageB_translateY_out: [0, -80, { start: 0.25, end: 0.4 }],
				messageC_translateY_up: [15, 0, { start: 0.25, end: 0.3 }],
				messageC_translateY_out: [0, -100, { start: 0.8, end: 1 }],
			}
		},
		{
			// 2
			type: 'normal',
			//heightNum: 1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2'),
				content: document.querySelector('#scroll-section-2 .sticky-elem.sec2_st1'),
			},
		},
		{
			// 3
			type: 'sticky',
			heightNum: 5.2,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3'),
				messageA: document.querySelector('#scroll-section-3 .sticky-elem.sec3_st1'),
			},
			values: {
				messageA_translateY_in: [100, 0, { start: 0, end: 1 }],
				messageA_translateY_up: [0, 0, { start: 0, end: 0.1 }],
				messageB_translateY_in: [100, 0, { start: 0.1, end: 0.15 }],
				messageB_translateY_out: [0, -112, { start: 0.77, end: 1 }],
			}
		},
		{
			// 4
			type: 'normal',
			//heightNum: 30,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-4'),
				content: document.querySelector('#scroll-section-4 > div'),
				messageA: document.querySelector('#scroll-section-4 .sticky-elem.sec4_st1'),
				messageB: document.querySelector('#scroll-section-4 .sticky-elem.sec4_st2'),
				messageC: document.querySelector('#scroll-section-4 .sticky-elem.sec4_st3'),
				messageD: document.querySelector('#scroll-section-4 .sticky-elem.sec4_st4'),
			},
		},
		{
			// 5
			type: 'sticky',
			heightNum: 6,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-5'),
				content: document.querySelector('#scroll-section-5 > div'),
				messageA: document.querySelector('#scroll-section-5 .sticky-elem.sec5_st1'),
				messageB: document.querySelector('#scroll-section-5 .sticky-elem.sec5_st2'),
				messageC: document.querySelector('#scroll-section-5 .sticky-elem.sec5_st3'),
				messageD: document.querySelector('#scroll-section-5 .sticky-elem.sec5_st4'),
			},
			values: {
				messageC_translateY_in: [100, 0, { start: 0, end: 0.17 }],
				messageC_translateY_up: [22, 0, { start: 0.45, end: 0.5 }],
				messageC_translateY_up2: [0, -35, { start: 0.55, end: 0.6 }],
				messageD_translateY_in: [100, 58, { start: 0.55, end: 0.6 }],
				messageC_translateY_out: [-35, -100, { start: 0.83, end: 0.93 }],
				messageD_translateY_out: [58, -50, { start: 0.83, end: 0.98 }],
			}
		},
		{
			// 6
			type: 'normal',
			//heightNum: 15,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-6'),
				content: document.querySelector('#scroll-section-6 > div'),
				messageA: document.querySelector('#scroll-section-6 .sticky-elem.sec6_st1'),
				messageB: document.querySelector('#scroll-section-6 .sticky-elem.sec6_st2'),
				messageC: document.querySelector('#scroll-section-6 .sticky-elem.sec6_st3'),
				messageD: document.querySelector('#scroll-section-6 .sticky-elem.sec6_st4'),
			},
		},
		{
			// 7
			type: 'normal',
			//heightNum: 3,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-7'),
				content: document.querySelector('#scroll-section-7 > div'),
				messageA: document.querySelector('#scroll-section-7 .sec7_st1'),
				messageB: document.querySelector('#scroll-section-7 .sec7_st2'),
			},
		}
	];

	var sceneInfoR = [
		{
			// 0
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-0'),
				content: document.querySelector('#scroll-section-0 .sticky-elem'),
				movie_wrap: document.querySelector('#scroll-section-0 .movie_wrap'),
			},
		},
		{
			// 1
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1'),	
				content: document.querySelector('#scroll-section-1 > div'),
				messageA: document.querySelector('#scroll-section-1 .sticky-elem.sec1_st1'),	
				messageC: document.querySelector('#scroll-section-1 .sticky-elem.sec1_st3'),		
			},
		},
		{
			// 2
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2'),
				content: document.querySelector('#scroll-section-2 .sticky-elem.sec2_st1'),
			},
		},
		{
			// 3
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3'),
				content: document.querySelector('#scroll-section-3 .sticky-elem.sec3_st1'),
			},
		},
		{
			// 4
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-4'),
				content: document.querySelector('#scroll-section-4 > div'),
				messageA: document.querySelector('#scroll-section-4 .sticky-elem.sec4_st1'),
				messageB: document.querySelector('#scroll-section-4 .sticky-elem.sec4_st2'),
				messageC: document.querySelector('#scroll-section-4 .sticky-elem.sec4_st3'),
				messageD: document.querySelector('#scroll-section-4 .sticky-elem.sec4_st4'),
			},
		},
		{
			// 5
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-5'),
				content: document.querySelector('#scroll-section-5 > div'),
				messageA: document.querySelector('#scroll-section-5 .sticky-elem.sec5_st1'),
				messageB: document.querySelector('#scroll-section-5 .sticky-elem.sec5_st2'),
				messageC: document.querySelector('#scroll-section-5 .sticky-elem.sec5_st3'),
				messageD: document.querySelector('#scroll-section-5 .sticky-elem.sec5_st4'),
			},
		},
		{
			// 6
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-6'),
				content: document.querySelector('#scroll-section-6 > div'),
				messageA: document.querySelector('#scroll-section-6 .sticky-elem.sec6_st1'),
				messageB: document.querySelector('#scroll-section-6 .sticky-elem.sec6_st2'),
				messageC: document.querySelector('#scroll-section-6 .sticky-elem.sec6_st3'),
				messageD: document.querySelector('#scroll-section-6 .sticky-elem.sec6_st4'),
			},
		},
		{
			// 7
			type: 'normal',
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-7'),
				content: document.querySelector('#scroll-section-7 > div'),
				messageA: document.querySelector('#scroll-section-7 .sec7_st1'),
				messageB: document.querySelector('#scroll-section-7 .sec7_st2'),
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

		sceneInfo[1].objs.messageC.style.height = window.innerHeight + "px";
		sceneInfo[3].objs.messageA.style.height = window.innerHeight + (window.innerHeight * 0.2) + "px";
		sceneInfo[1].objs.messageC.style.top = sceneInfo[1].objs.messageA.offsetHeight + "px"
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
		sec2all.style.zIndex = "-1";
		sceneInfo[0].objs.container.style.zIndex = "-1";
		sceneInfo[1].objs.container.style.zIndex = "-1";
		sceneInfo[2].objs.container.style.zIndex = "-1";
		sceneInfo[3].objs.container.style.zIndex = "-1";
		sceneInfo[4].objs.container.style.zIndex = "-1";
		sceneInfo[5].objs.container.style.zIndex = "-1";
		sceneInfo[6].objs.container.style.zIndex = "-1";
		sceneInfo[7].objs.container.style.zIndex = "-1";
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
				sceneInfo[0].objs.container.style.zIndex = "1";
				objs.messageA.style.transform = "translate3d(0,0%,0)";
				objs.movie_wrap.style.transform = "translate3d(0,0%,0)";
				sceneInfo[1].objs.messageC.classList.remove('fix');
				sceneInfo[1].objs.messageC.classList.remove('out');	

				if (scrollRatio < 0.1) {
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

				if (yOffset >= (scrollHeight - window.innerHeight)){					
					objs.movie_wrap.style.transform = "translate3d(0, "+ calcValues(values.movie_wrap_translateY_out, currentYOffset) +"%, 0)";
					objs.messageA.style.transform = "translate3d(0, "+ calcValues(values.messageA_translateY_out, currentYOffset) +"%, 0)";
					sceneInfo[1].objs.container.style.zIndex = "2";
				} else {
					sceneInfo[1].objs.messageA.classList.remove('on');
				}

				if (yOffset >= (scrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[1].objs.messageA.classList.add('on');					
				} else {
					sceneInfo[1].objs.messageA.classList.remove('on');
				}

				break;

			case 1:

				setDeps();
				sceneInfo[2].objs.container.style.zIndex = "-1";
				sceneInfo[1].objs.container.style.zIndex = "1";

				if (scrollRatio >= 0 ){
					objs.container.style.background = "#164a83";
					objs.messageA.classList.add('on');					
				}
				if (yOffset >= (prevScrollHeight + objs.messageA.offsetHeight)){
					objs.messageC.style.top = "0";
					objs.messageC.classList.add('fix');
				} else {
					objs.messageC.style.top = sceneInfo[1].objs.messageA.offsetHeight + "px";
					objs.messageC.classList.remove('fix');
				}
				if (scrollRatio >= 0.1){			
					objs.messageC.children[1].children[0].classList.add('on');
					objs.messageC.children[1].children[1].classList.remove('on');
				} else {
					objs.messageC.classList.remove('on');
					objs.messageC.children[1].children[0].classList.remove('on');
				}
				if (scrollRatio >= 0.4){
					objs.messageC.children[1].children[0].classList.remove('on');	
					objs.messageC.children[1].children[1].classList.add('on');				
				} else {
					objs.messageC.children[1].children[1].classList.remove('on');		
				}
				if (scrollRatio >= 0.5){
					objs.messageC.children[1].children[1].classList.remove('on');	
					objs.messageC.children[1].children[2].classList.add('on');				
				} else {
					objs.messageC.children[1].children[2].classList.remove('on');		
				}
				if (scrollRatio >= 0.6){
					objs.messageC.children[1].children[2].classList.remove('on');	
					objs.messageC.children[1].children[3].classList.add('on');				
				} else {
					objs.messageC.children[1].children[3].classList.remove('on');		
				}
				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[2].objs.container.style.zIndex = "2";
					sec2all.style.zIndex = "2";					
					objs.messageC.style.top = "auto";
					objs.messageC.classList.remove('fix');
					objs.messageC.classList.add('out');	
				} else {
					objs.messageC.classList.remove('out');
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[2].objs.content.children[0].classList.add('on');	
				} else {
					sceneInfo[2].objs.content.children[0].classList.remove('on');	
				}

				break;

			case 2:

				setDeps();
				introBox.style.zIndex = "-1";
				sec2all.style.zIndex = "1";
				sceneInfo[1].objs.container.style.zIndex = "-1";
				sceneInfo[2].objs.container.style.zIndex = "1";
				sceneInfo[3].objs.container.style.zIndex = "-1";
				sceneInfo[1].objs.messageC.classList.remove('fix');
				sceneInfo[1].objs.messageC.classList.add('out');	
				sceneInfo[3].objs.messageA.classList.remove('fix');
				sceneInfo[3].objs.messageA.classList.remove('out');					

				if (scrollRatio >= 0 ){
					objs.content.children[0].classList.add('on');	
				}
				sceneInfo[3].objs.messageA.children[1].children[0].classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[3].objs.container.style.zIndex = "2";
					sceneInfo[3].objs.messageA.classList.add('on');
				} else {
					sceneInfo[3].objs.messageA.classList.remove('on');
				}
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[3].objs.messageA.children[1].children[0].classList.remove('on');
					sceneInfo[3].objs.messageA.children[2].children[0].children[0].classList.add('on');
				}

				break;

			case 3:

				setDeps();
				introBox.style.zIndex = "-1";
				sec2all.style.zIndex = "1";
				sceneInfo[2].objs.container.style.zIndex = "-1";
				sceneInfo[3].objs.container.style.zIndex = "1";
				sceneInfo[4].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0 ){
					objs.messageA.classList.add('on');	
					objs.messageA.children[1].children[0].classList.add('on');
					objs.messageA.children[2].children[0].children[0].classList.add('on');
					objs.messageA.classList.add('fix');	
				} else {
					objs.messageA.classList.remove('fix');	
				}

				if (scrollRatio >= 0.1 ){
					objs.messageA.children[1].children[0].classList.remove('on');	
					objs.messageA.children[1].children[1].classList.add('on');		
				} else {
					objs.messageA.children[1].children[1].classList.remove('on');	
				}
				if (scrollRatio >= 0.2 ){
					objs.messageA.children[1].children[1].classList.remove('on');	
					objs.messageA.children[1].children[2].classList.add('on');
					objs.messageA.children[2].children[0].children[0].classList.add('on');
				} else {
					objs.messageA.children[1].children[2].classList.remove('on');	
				}	
				if (scrollRatio >= 0.35 ){
					objs.messageA.children[1].children[2].classList.remove('on');	
					objs.messageA.children[1].children[3].classList.add('on');
					objs.messageA.children[2].children[0].children[1].classList.add('on');
					objs.messageA.children[2].children[0].children[0].classList.remove('on');
					sec2_st2_video4.play();
				} else {
					objs.messageA.children[1].children[3].classList.remove('on');
					objs.messageA.children[2].children[0].children[1].classList.remove('on');
				}				
				if (scrollRatio >= 0.5 ){
					objs.messageA.children[1].children[3].classList.remove('on');	
					objs.messageA.children[1].children[4].classList.add('on');
					objs.messageA.children[2].children[0].children[2].classList.add('on');
					sec2_st2_video5.play();
				} else {
					objs.messageA.children[1].children[4].classList.remove('on');
					objs.messageA.children[2].children[0].children[2].classList.remove('on');
				}
				if (scrollRatio >= 0.65 ){
					objs.messageA.children[1].children[4].classList.remove('on');	
					objs.messageA.children[1].children[5].classList.add('on');
					objs.messageA.children[2].children[0].children[3].classList.add('on');
					sec2_st2_video6.play();
				} else {
					objs.messageA.children[1].children[5].classList.remove('on');
					objs.messageA.children[2].children[0].children[3].classList.remove('on');
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight + (window.innerHeight * 0.2)))){
					objs.messageA.classList.remove('fix');	
					objs.messageA.classList.add('out');	
				} else {
					objs.messageA.classList.remove('out');
				}
				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[4].objs.container.style.zIndex = "2";
				}
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.2)))){
					sceneInfo[4].objs.messageA.classList.add('on');	
				} else {
					sceneInfo[4].objs.messageA.classList.remove('on');	
				}

				break;

			case 4:		
				
				setDeps();
				introBox.style.zIndex = "-1";
				sec2all.style.zIndex = "1";
				sceneInfo[3].objs.container.style.zIndex = "-1";
				sceneInfo[4].objs.container.style.zIndex = "1";
				sceneInfo[5].objs.container.style.zIndex = "-1";
				sceneInfo[3].objs.messageA.classList.remove('fix');
				sceneInfo[3].objs.messageA.classList.add('out');	

				if (scrollRatio >= 0.03 ){
					objs.messageB.classList.add('on');	
				} else {
					objs.messageB.classList.remove('on');	
				}
				if (scrollRatio >= 0.3 ){
					objs.messageC.classList.add('on');	
				} else {
					objs.messageC.classList.remove('on');	
				}
				if (scrollRatio >= 0.55 ){
					objs.messageD.classList.add('on');	
				} else {
					objs.messageD.classList.remove('on');	
				}
				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[5].objs.container.style.zIndex = "2";
				} 
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[5].objs.messageA.classList.add('on');	
				} else {
					sceneInfo[5].objs.messageA.classList.remove('on');	
				}

				break;

			case 5:

				setDeps();
				sceneInfo[4].objs.container.style.zIndex = "-1";
				sceneInfo[5].objs.container.style.zIndex = "1";
				sceneInfo[6].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0 ){
					objs.messageA.classList.add('on');	
					objs.messageC.style.transform = "translate3d(0, "+ calcValues(values.messageC_translateY_in, currentYOffset) +"%, 0)";
				}
				if (scrollRatio >= 0.1 ){					
					objs.messageC.children[0].classList.add('on');
				} else {
					objs.messageC.children[0].classList.remove('on');
					objs.messageC.style.transform = "translate3d(0, 100%, 0)";
				}
				if (scrollRatio >= 0.15 ){
					objs.messageC.children[1].children[0].classList.add('on');
					objs.messageC.children[1].children[1].classList.remove('on');
				} else {
					objs.messageC.children[1].children[0].classList.remove('on');
				}
				if (scrollRatio >= 0.25 ){
					objs.messageC.children[1].children[0].classList.remove('on');
					objs.messageC.children[1].children[1].classList.add('on');
				} else {
					objs.messageC.children[1].children[1].classList.remove('on');
				}
				if (scrollRatio >= 0.35){
					objs.messageC.children[1].children[1].classList.remove('on');
					objs.messageC.children[1].children[2].classList.add('on');
				} else {
					objs.messageC.children[1].children[2].classList.remove('on');				
				}
				if (scrollRatio >= 0.45 ){
					objs.messageC.children[1].children[2].classList.remove('on');
					objs.messageC.children[1].children[3].classList.add('on');
				} else {
					objs.messageC.children[1].children[3].classList.remove('on');				
				}
				if (scrollRatio >= 0.55 ){
					objs.messageC.style.transform = "translate3d(0, "+ calcValues(values.messageC_translateY_up2, currentYOffset) +"%, 0)";
					objs.messageD.style.transform = "translate3d(0, "+ calcValues(values.messageD_translateY_in, currentYOffset) +"%, 0)";
					objs.messageD.children[0].children[0].classList.remove('on');
					objs.messageD.children[0].children[2].classList.remove('on');
				} else {
					objs.messageD.style.transform = "translate3d(0, 100%, 0)";
				}
				if (scrollRatio >= 0.6 ){
					objs.messageC.style.transform = "translate3d(0, -32%, 0)";
					objs.messageD.style.transform = "translate3d(0, 58%, 0)";
					objs.messageD.children[0].children[0].classList.add('on');
					objs.messageD.children[0].children[2].classList.add('on');
					objs.messageD.children[0].children[1].classList.remove('on');
				} else {
					objs.messageD.children[0].children[0].classList.remove('on');
					objs.messageD.children[0].children[2].classList.remove('on');
				}
				if (scrollRatio >= 0.7 ){
					objs.messageD.children[0].children[1].classList.add('on');
					objs.messageD.children[0].children[0].classList.remove('on');
				} else {
					objs.messageD.children[0].children[1].classList.remove('on');				
				}
				if (scrollRatio >= 0.83 ){
					objs.messageC.style.transform = "translate3d(0, "+ calcValues(values.messageC_translateY_out, currentYOffset) +"%, 0)";
					objs.messageD.style.transform = "translate3d(0, "+ calcValues(values.messageD_translateY_out, currentYOffset) +"%, 0)";
				}
				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[6].objs.container.style.zIndex = "2";
				} 
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[6].objs.messageA.classList.add('on');	
				} else {
					sceneInfo[6].objs.messageA.classList.remove('on');	
				}

				break;

			case 6:	

				setDeps();
				sceneInfo[5].objs.container.style.zIndex = "-1";
				sceneInfo[6].objs.container.style.zIndex = "1";
				sceneInfo[7].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0){
					objs.messageA.classList.add('on');	
				}
				if (scrollRatio >= 0.1){
					objs.messageC.children[0].children[0].classList.add('on');	
				} else {
					objs.messageC.children[0].children[0].classList.remove('on');
				}
				if (scrollRatio >= 0.25){
					objs.messageC.children[0].children[1].classList.add('on');
				} else {
					objs.messageC.children[0].children[1].classList.remove('on');
				}
				if (scrollRatio >= 0.4){
					objs.messageC.children[0].children[2].classList.add('on');
				} else {
					objs.messageC.children[0].children[2].classList.remove('on');
				}
				if (scrollRatio >= 0.55){
					objs.messageD.classList.add('on');
				} else {
					objs.messageD.classList.remove('on');
				}
				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){					
					sceneInfo[7].objs.container.style.zIndex = "2";
				} else {
					sceneInfo[7].objs.container.style.zIndex = "-1";
				}
				
				sceneInfo[7].objs.messageB.children[0].classList.remove('on');
				sceneInfo[7].objs.messageB.children[1].classList.remove('on');
				sceneInfo[7].objs.messageB.children[2].classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[7].objs.messageA.classList.add('on');
				} else {
					sceneInfo[7].objs.messageA.classList.remove('on');
				}

				break;

			case 7:	
				
				setDeps();
				sceneInfo[6].objs.container.style.zIndex = "-1";
				sceneInfo[7].objs.container.style.zIndex = "1";

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

				sceneInfo[0].objs.container.style.zIndex = "1";
				break;
			case 1:

				break;
			case 2:
				sec2all.style.zIndex = "1";
			
				break;
			case 3:

				break;
			case 4:

				break;
			case 5:
				sceneInfo[5].objs.container.style.zIndex = "1";

				break;
			case 6:

				break;
			case 7:

				break;
		}		
	}

	function introAniIn(){
		sceneInfo[0].objs.movie_wrap.classList.add('on');
		setTimeout(function() {
			introBox.classList.add('aniin');
		}, 100);	
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
            scrollTo(0, tempYOffset - 1);
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
			sceneInfo[0].objs.container.style.zIndex = "1";
			introVideo.currentTime = 3.0333;
			introVideo.play();

			setTimeout(function() {
				yOffset += 5;
				scrollTo(0, yOffset);	
			}, 20);

		} else {				
			setLayout();

			var tempYOffset = yOffset;
			var tempScrollCount = 0;

			if (yOffset >= sceneInfo[0].scrollHeight){
				introVideo.currentTime = 3.0333;
				introVideo.pause();
				sceneInfo[0].objs.container.style.zIndex = "-1";
				header.classList.remove('hintro');	
				sceneInfo[0].objs.movie_wrap.classList.add('on');

				setTimeout(function() {
					yOffset += 5;
					scrollTo(0, yOffset);	
				}, 20);

			} else {

				sceneInfo[0].objs.container.style.zIndex = "1";
				introVideo.currentTime = 0;
				introVideo.play();
				introVideo.addEventListener('ended', function() {
					introVideo.currentTime = 3.033333;
				},false);	

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
					introBox.style.zIndex = "-1";

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





