	
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var player;
	function onYouTubeIframeAPIReady() {
		player = new YT.Player('video2', {			
			videoId: 'es4w_8W36Rc',
		});
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
				movie_wrap_translateY_out: [0, -100, { start: 0.5, end: 1 }],
				messageA_translateY_out: [0, -100, { start: 0.5, end: 1 }],
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
			type: 'sticky',
			heightNum: 6,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2'),
				messageA: document.querySelector('#scroll-section-2 .sticky-elem'),
			},
			values: {
				messageA_translateX_in_p: [0, -20, { start: 0, end: 1 }],
				messageA_translateX_in: [-20, -110, { start: 0, end: 0.7 }],
				messageA_translateY_out: [0, -100, { start: 0.75, end: 1 }],				
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
			type: 'sticky',
			heightNum: 1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-4'),
				movie_wrap: document.querySelector('#scroll-section-4 .movie_wrap'),
				movie: document.querySelector('#scroll-section-4 .movie_wrap .video2'),
				messageA: document.querySelector('#scroll-section-4 .sticky-elem'),				
			},
			values: {
				movie_wrap_scale: [1, 0.6, { start: 0, end: 1 }],
				movie_wrap_translateY_up: [0, -8, { start: 0, end: 1 }],
				messageA_translateY_in: [50, 0, { start: 0.1, end: 0.5 }],
				movie_wrap_translateY_out: [-8, -100, { start: 0.75, end: 1 }],
				messageA_translateY_out: [0, -92, { start: 0.75, end: 1 }],
			}
		},
		{
			// 5
			type: 'sticky',
			heightNum: 3,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-5'),
				messageA: document.querySelector('#scroll-section-5 .sticky-elem'),				
			},
			values: {
				messageA_translateY_in: [100, 0, { start: 0, end: 1 }],
				messageA_translateY_out: [0, -100, { start: 0.6, end: 1 }],
			}
		},
		{
			// 6
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-6'),
				messageA: document.querySelector('#scroll-section-6 .sticky-elem.sec6_st1'),
				messageB: document.querySelector('#scroll-section-6 .sticky-elem.sec6_st2'),	
				sec6_st2_video1: document.querySelector('#scroll-section-6 .sec6_st2_video1'),
				sec6_st2_video2: document.querySelector('#scroll-section-6 .sec6_st2_video2'),
				sec6_st2_video3: document.querySelector('#scroll-section-6 .sec6_st2_video3'),
				sec6_st2_video4: document.querySelector('#scroll-section-6 .sec6_st2_video4'),
			},
			values: {
				messageB_translateY_in: [100, 60, { start: 0.88, end: 1 }],
				messageB_translateY_in2: [60, 0, { start: 0, end: 0.12 }],
				messageB_translateY_out: [0, -140, { start: 0.75, end: 1 }],
			}
		},
		{
			// 7
			type: 'sticky',
			heightNum: 3,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-7'),
				messageA: document.querySelector('#scroll-section-7 .sticky-elem.sec7_st1'),		
				messageB: document.querySelector('#scroll-section-7 .sticky-elem.sec7_st2'),
				movie_wrap: document.querySelector('#scroll-section-7 .movie_wrap'),
				movie: document.querySelector('#scroll-section-7 .movie_wrap .video3'),
				sec7_st2_video1: document.querySelector('#scroll-section-7 .sec7_st2_video1'),
				sec7_st2_video2: document.querySelector('#scroll-section-7 .sec7_st2_video2'),
				sec7_st2_video3: document.querySelector('#scroll-section-7 .sec7_st2_video3'),
				sec7_st2_video4: document.querySelector('#scroll-section-7 .sec7_st2_video4'),
			},
			values: {
				messageB_translateY_in: [100, 50, { start: 0.9, end: 1 }],
				messageB_translateY_in2: [50, 0, { start: 0, end: 0.1 }],
				messageB_translateY_out: [0, -100, { start: 0.67, end: 1 }],
			}
		},
		{
			// 8
			type: 'normal',
			//heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-8'),
				content: document.querySelector('#scroll-section-8 > div'),
				messageA: document.querySelector('#scroll-section-8 .sticky-elem.sec8_st1'),
				messageB: document.querySelector('#scroll-section-8 .sticky-elem.sec8_st2'),
			},
			values: {
				messageA_translateY_in: [100, 0, { start: 0.9, end: 1 }],	
				messageA_translateY_out: [0, -100, { start: 0.3, end: 0.6 }],	
				messageB_translateY_in: [100, 0, { start: 0.3, end: 0.6 }],
				messageB_translateY_out: [0, -100, { start: 0.8, end: 1 }],					
			}
		}
	];

	var movWidth = window.innerHeight * 1.77777;
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
		sceneInfo[4].objs.movie_wrap.style.height = movHeight +"px";
		sceneInfo[4].objs.movie.style.height = movHeight +"px";
		sceneInfo[4].objs.movie.style.width = movWidth +"px";

		if (movWidthRatio <= movHeightRatio) {
			movieScaleRatio = movHeightRatio;
		} else {
			movieScaleRatio = movWidthRatio;
		}
		sceneInfo[0].objs.movie.style.transform = "scale("+ movieScaleRatio +")";
		sceneInfo[4].objs.movie.style.transform = "scale("+ movieScaleRatio +")";
	}

	function introAniR(){
		introBox_bottom = document.getElementsByClassName("wh bottom")[0];
		introBox_bottom.style.height = (window.innerHeight - 130) + "px";
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
				introBox.style.zIndex = "2";
				sceneInfo[0].objs.container.style.zIndex = "1";
				sceneInfo[0].objs.movie.play();
				objs.movie_wrap.style.transform = "translate3d(0,0%,0)";
				objs.messageA.style.transform = "translate3d(0,0%,0)";

				if (scrollRatio <= 0.1) {
					introBox.classList.remove('aniout');
					introBox_bottom.style.height = "80px";	
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
				}

				if (scrollRatio > 0.5){
					objs.movie_wrap.style.transform = "translate3d(0, "+ calcValues(values.movie_wrap_translateY_out, currentYOffset) +"%, 0)";		
					objs.messageA.style.transform = "translate3d(0, "+ calcValues(values.messageA_translateY_out, currentYOffset) +"%, 0)";						
				}

				if (yOffset >= (scrollHeight - window.innerHeight)){					
					introBox.style.zIndex = "-1";
					sceneInfo[1].objs.container.style.zIndex = "2";
				}
				sceneInfo[1].objs.messageA.classList.remove('on');
				if (yOffset >= (scrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[1].objs.messageA.classList.add('on');
				}

				break;

			case 1:
				setDeps();
				introBox.style.zIndex = "-1";
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

				sceneInfo[2].objs.messageA.children[0].style.transform = "translate3d(0,0,0)";
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.5)))){
					sceneInfo[2].objs.messageA.children[0].style.transform = "translate3d("+ calcValues(sceneInfo[2].values.messageA_translateX_in_p, currentYOffset) +"%,0, 0)";
					sceneInfo[2].objs.messageA.children[0].children[0].classList.remove('on');
				}

				break;

			case 2:
				setDeps();
				sceneInfo[0].objs.movie.pause();
				sceneInfo[1].objs.container.style.zIndex = "-1";
				sceneInfo[2].objs.container.style.zIndex = "1";
				sceneInfo[3].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0){
					objs.messageA.children[0].style.transform = "translate3d("+ calcValues(values.messageA_translateX_in, currentYOffset) +"%,0, 0)";
					objs.messageA.children[0].children[0].classList.add('on');
				} else {
					objs.messageA.children[0].children[0].classList.remove('on');	
				}
				if (scrollRatio >= 0.15){
					objs.messageA.children[0].children[1].classList.add('on');
				} else {
					objs.messageA.children[0].children[1].classList.remove('on');				
				}
				if (scrollRatio >= 0.25){
					objs.messageA.children[0].children[0].classList.add('mov');
					objs.messageA.children[0].children[1].classList.add('mov');
				} else {
					objs.messageA.children[0].children[0].classList.remove('mov');	
					objs.messageA.children[0].children[1].classList.remove('mov');		
				}
				if (scrollRatio >= 0.35){
					objs.messageA.children[0].children[2].classList.add('on');
				} else {
					objs.messageA.children[0].children[2].classList.remove('on');				
				}
				if (scrollRatio >= 0.45){
					objs.messageA.children[0].children[1].classList.remove('mov');
					objs.messageA.children[0].children[2].classList.add('mov');
				} else {
					objs.messageA.children[0].children[2].classList.remove('mov');		
				}
				if (scrollRatio >= 0.55){
					objs.messageA.children[0].children[3].classList.add('on');
				} else {
					objs.messageA.children[0].children[3].classList.remove('on');				
				}
				if (scrollRatio >= 0.65){
					objs.messageA.children[0].children[2].classList.remove('mov');
					objs.messageA.children[0].children[2].classList.add('mov2');
					objs.messageA.children[0].children[3].classList.add('mov');
				} else {
					objs.messageA.children[0].children[3].classList.remove('mov');
					objs.messageA.children[0].children[2].classList.remove('mov2');
				}
				if (scrollRatio >= 0.75){
					objs.messageA.style.transform = "translate3d(0, "+ calcValues(values.messageA_translateY_out, currentYOffset) +"%, 0)";
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[3].objs.container.style.zIndex = "2";
				}

				if (yOffset >= (scrollHeight - (window.innerHeight - (window.innerHeight*3.8)))){
					sceneInfo[3].objs.messageA.classList.add('on');
				} else {
					sceneInfo[3].objs.messageA.classList.remove('on');
				}

				break;

			case 3:
				setDeps();
				sceneInfo[0].objs.movie.pause();
				sceneInfo[2].objs.container.style.zIndex = "-1";
				sceneInfo[3].objs.container.style.zIndex = "1";
				sceneInfo[4].objs.container.style.zIndex = "-1";
				sceneInfo[2].objs.messageA.style.transform = "translate3d(0, -100%, 0)";	

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[4].objs.container.style.zIndex = "2";
					sceneInfo[4].objs.messageA.classList.remove('on');
					sceneInfo[4].objs.movie.play();
					sceneInfo[4].objs.movie_wrap.style.transform = "translate3d(0,"+ calcValues(sceneInfo[4].values.movie_wrap_translateY_up, currentYOffset) +"%, 0) scale("+ calcValues(sceneInfo[4].values.movie_wrap_scale, currentYOffset) +")";
				} else {
					sceneInfo[4].objs.movie.pause();
					sceneInfo[4].objs.movie_wrap.style.transform = "translate3d(0, 100%, 0) scale(1)";
				}

				break;

			case 4:
				setDeps();
				sceneInfo[0].objs.movie.pause();
				sceneInfo[3].objs.container.style.zIndex = "-1";
				sceneInfo[4].objs.container.style.zIndex = "1";
				sceneInfo[5].objs.container.style.zIndex = "-1";
				sceneInfo[4].objs.movie.play();

				if (scrollRatio >= 0) {
					objs.movie_wrap.style.transform = "translate3d(0, -8%, 0) scale(0.6)";
					objs.messageA.classList.add('on');
				} else {
					objs.messageA.classList.remove('on');
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[5].objs.container.style.zIndex = "2";
					sceneInfo[5].objs.messageA.style.transform = "translate3d(0,"+ calcValues(sceneInfo[5].values.messageA_translateY_in, currentYOffset) +"%, 0)";
					sceneInfo[5].objs.messageA.children[1].children[0].classList.remove('on');
				}
				sceneInfo[5].objs.messageA.children[0].classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[5].objs.messageA.children[0].classList.add('on');
				}

				break;

			case 5:
				setDeps();
				sceneInfo[0].objs.movie.pause();
				sceneInfo[4].objs.movie.pause();
				sceneInfo[4].objs.container.style.zIndex = "-1";
				sceneInfo[5].objs.container.style.zIndex = "1";
				sceneInfo[6].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0) {
					objs.messageA.style.transform =  "translate3d(0, 0, 0)";
					objs.messageA.children[0].classList.add('on');
					objs.messageA.children[1].children[0].classList.add('on');
				}
				if (scrollRatio >= 0.3) {
					objs.messageA.children[1].children[0].classList.remove('on');		
					objs.messageA.children[1].children[1].classList.add('on');
				} else {
					objs.messageA.children[1].children[1].classList.remove('on');
				}
				if (scrollRatio >= 0.6) {
					objs.messageA.style.transform = "translate3d(0,"+ calcValues(values.messageA_translateY_out, currentYOffset) +"%, 0)";
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[6].objs.container.style.zIndex = "2";
				}

				sceneInfo[6].objs.messageB.style.transform =  "translate3d(0, 100%, 0)";
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[6].objs.messageB.style.transform = "translate3d(0, "+ calcValues(sceneInfo[6].values.messageB_translateY_in, currentYOffset) +"%, 0)";
				}

				break;

			case 6:
				setDeps();
				sceneInfo[5].objs.container.style.zIndex = "-1";
				sceneInfo[6].objs.container.style.zIndex = "1";
				sceneInfo[7].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0) {					
					objs.messageB.children[0].children[0].children[0].classList.add('on');
					objs.messageB.style.transform = "translate3d(0, "+ calcValues(values.messageB_translateY_in2, currentYOffset) +"%, 0)";
				}
				if (scrollRatio >= 0.15) {
					objs.messageB.style.transform =  "translate3d(0, 0, 0)";
					objs.messageB.children[1].children[0].classList.add('on');
					objs.messageB.children[0].children[0].children[0].classList.remove('on');
					objs.messageB.children[0].children[0].children[1].classList.add('on');
					objs.sec6_st2_video1.play();
				} else {
					objs.messageB.children[1].children[0].classList.remove('on');
					objs.messageB.children[0].children[0].children[1].classList.remove('on');
					objs.sec6_st2_video1.pause();				
				}

				if (scrollRatio >= 0.3) {
					objs.messageB.children[1].children[0].classList.remove('on');
					objs.messageB.children[1].children[1].classList.add('on');
					objs.messageB.children[0].children[0].children[1].classList.remove('on');
					objs.messageB.children[0].children[0].children[2].classList.add('on');
					objs.sec6_st2_video1.pause();	
					objs.sec6_st2_video2.play();
				} else {
					objs.messageB.children[1].children[1].classList.remove('on');
					objs.messageB.children[0].children[0].children[2].classList.remove('on');
					objs.sec6_st2_video2.pause();				
				}

				if (scrollRatio >= 0.45) {
					objs.messageB.children[1].children[1].classList.remove('on');
					objs.messageB.children[1].children[2].classList.add('on');
					objs.messageB.children[0].children[0].children[2].classList.remove('on');
					objs.messageB.children[0].children[0].children[3].classList.add('on');
					objs.sec6_st2_video2.pause();	
					objs.messageB.children[0].children[0].classList.add('ani');
					objs.sec6_st2_video3.play();

				} else {
					objs.messageB.children[1].children[2].classList.remove('on');
					objs.messageB.children[0].children[0].children[3].classList.remove('on');
					objs.messageB.children[0].children[0].classList.remove('ani');
					objs.sec6_st2_video3.pause();	
					objs.sec6_st2_video3.currentTime = 0;
				}

				if (scrollRatio >= 0.6) {
					objs.messageB.children[0].children[0].classList.remove('ani');					
					objs.messageB.children[1].children[2].classList.remove('on');
					objs.messageB.children[1].children[3].classList.add('on');
					objs.messageB.children[0].children[0].children[3].classList.remove('on');
					objs.messageB.children[0].children[0].children[4].classList.add('on');
					objs.sec6_st2_video3.currentTime = 0;
					objs.sec6_st2_video4.play();
				} else {
					objs.messageB.children[1].children[3].classList.remove('on');
					objs.messageB.children[0].children[0].children[4].classList.remove('on');
					objs.sec6_st2_video4.pause();				
				}

				if (scrollRatio >= 0.75) {
					objs.messageB.style.transform = "translate3d(0, "+ calcValues(values.messageB_translateY_out, currentYOffset) +"%, 0)";
				} 

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){	
					sceneInfo[7].objs.container.style.zIndex = "2";
					sceneInfo[7].objs.messageB.style.transform = "translate3d(0, "+ calcValues(sceneInfo[7].values.messageB_translateY_in, currentYOffset) +"%, 0)";
				} else {
					sceneInfo[7].objs.messageB.style.transform = "translate3d(0, 100%, 0)";
				}

				sceneInfo[7].objs.messageB.children[0].children[0].children[0].classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[7].objs.messageB.children[0].children[0].children[0].classList.add('on');
				}

				break;

			case 7:
				setDeps();
				sceneInfo[6].objs.container.style.zIndex = "-1";
				sceneInfo[7].objs.container.style.zIndex = "1";
				sceneInfo[8].objs.container.style.zIndex = "-1";
				sceneInfo[6].objs.messageB.style.transform =  "translate3d(0, -140%, 0)";

				if (scrollRatio >= 0) {					
					objs.messageB.children[0].children[0].children[0].classList.add('on');
					objs.messageB.style.transform = "translate3d(0, "+ calcValues(values.messageB_translateY_in2, currentYOffset) +"%, 0)";
				} 

				if (scrollRatio >= 0.1) {	
					objs.messageB.style.transform =  "translate3d(0, 0, 0)";
					objs.messageB.children[0].children[0].children[1].classList.add('on');
					objs.sec7_st2_video1.play();
				} else {
					objs.messageB.children[0].children[0].children[1].classList.remove('on');
					objs.sec7_st2_video1.pause();
				}

				if (scrollRatio >= 0.2) {	
					objs.messageB.children[0].children[0].children[0].classList.remove('on');
					objs.messageB.children[0].children[0].children[1].classList.remove('on');
					objs.messageB.children[0].children[1].children[0].classList.add('on');
					objs.messageB.children[0].children[1].children[1].classList.add('on');
					objs.sec7_st2_video1.pause();
					objs.sec7_st2_video2.play();
				} else {
					objs.messageB.children[0].children[1].children[0].classList.remove('on');
					objs.messageB.children[0].children[1].children[1].classList.remove('on');
					objs.sec7_st2_video2.pause();
				}

				if (scrollRatio >= 0.3) {	
					objs.messageB.children[0].children[1].children[0].classList.remove('on');
					objs.messageB.children[0].children[1].children[1].classList.remove('on');
					objs.messageB.children[0].children[2].children[0].classList.add('on');
					objs.messageB.children[0].children[2].children[1].classList.add('on');
					objs.sec7_st2_video2.pause();
					objs.sec7_st2_video3.play();
				} else {
					objs.messageB.children[0].children[2].children[0].classList.remove('on');
					objs.messageB.children[0].children[2].children[1].classList.remove('on');
					objs.sec7_st2_video3.pause();
				}

				if (scrollRatio >= 0.4) {	
					objs.messageB.children[0].children[2].children[0].classList.remove('on');
					objs.messageB.children[0].children[2].children[1].classList.remove('on');
					objs.messageB.children[0].children[3].children[0].classList.add('on');
					objs.messageB.children[0].children[3].children[1].classList.add('on');
					objs.sec7_st2_video3.pause();
					objs.sec7_st2_video4.play();
				} else {
					objs.messageB.children[0].children[3].children[0].classList.remove('on');
					objs.messageB.children[0].children[3].children[1].classList.remove('on');
					objs.sec7_st2_video4.pause();
				}
				
				if (scrollRatio >= 0.6) {
					objs.messageB.style.transform = "translate3d(0, "+ calcValues(values.messageB_translateY_out, currentYOffset) +"%, 0)";
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){	
					sceneInfo[8].objs.container.style.zIndex = "2";
				}
				sceneInfo[8].objs.messageA.classList.remove('on');
				sceneInfo[8].objs.messageB.classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[8].objs.messageA.classList.add('on');
				}

				break;

			case 8:	
				
				setDeps();
				sceneInfo[7].objs.container.style.zIndex = "-1";
				sceneInfo[8].objs.container.style.zIndex = "1";

				objs.messageA.classList.add('on');

				if (scrollRatio >= 0.1){
					objs.messageB.classList.add('on');
				}

				break;
		}
		
	}

	function introAniIn(){
		setTimeout(function() {
			introBox_bottom.style.height = "80px";
		}, 100);	
	}

	function scrollLoop() {
		enterNewScene = false;
		prevScrollHeight = 0;

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

	function loop() {
		delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

        if (delayedYOffset < 1) {
            scrollLoop();

			setTimeout(function() {
				yOffset += 5;
				scrollTo(0, yOffset);						
			}, 20);
        }

		if ((document.body.offsetHeight - window.innerHeight) - delayedYOffset < 1) {
            var tempYOffset = yOffset;
            scrollTo(0, tempYOffset - 1);
        }

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

		$(".movclick").click(function(){			
			$(".videopop").show();
			$(".videopop").on('scroll touchmove mousewheel', function(e){
				e.preventDefault();
				e.stopPropagation(); 
				return false;
			});
		});
		$(".videopop .closebtn").click(function(){				
			$(".videopop").hide();
			player.pauseVideo();
			$(".videopop").off('scroll touchmove mousewheel'); 
		});	
		
		setLayout(); 
        document.body.classList.remove('before-load');
		setLayout();
		setDeps();
		introAniR();
		introAniIn();

		var introVideo = document.getElementsByClassName("video1")[0];
        var tempYOffset = yOffset;
        var tempScrollCount = 0;
        if (tempYOffset > 0) {
            var siId = setInterval(function() {
                scrollTo(0, tempYOffset);
                tempYOffset += 5;

				if (tempScrollCount > 20) {
                    clearInterval(siId);
                }
                tempScrollCount++;
            }, 20);

			introBox.style.zIndex = "-1";
			header.classList.remove('hintro');	
			sceneInfo[0].objs.movie_wrap.classList.add('on');
			introVideo.play();

        } else {
			introVideo.play();
			sceneInfo[0].objs.container.style.zIndex = "1";			
			sceneInfo[0].objs.movie_wrap.classList.add('on');
			setTimeout(function() {
				introBox.classList.add('aniin');
			}, 100);	
		}

        window.addEventListener('scroll', function(){
			yOffset = window.pageYOffset;
			scrollLoop();
  			checkMenu();			

  			if (!rafState) {
  				rafId = requestAnimationFrame(loop);
  				rafState = true;
  			}
  		});

  		window.addEventListener('resize', function(){
			yOffset = window.pageYOffset;
			movWidth = window.innerHeight * 1.77777;
			movHeight = window.innerHeight;
			movWidthRatio = window.innerWidth / movWidth;
			movHeightRatio = window.innerHeight / movHeight;
			movieScaleRatio;
			setLayout();

  			if (yOffset > 0) {
				setTimeout(function() {
					yOffset += 5;
					scrollTo(0, yOffset);						
				}, 20);
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





