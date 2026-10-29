
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var player;
	function onYouTubeIframeAPIReady() {
		player = new YT.Player('video1', {			
			videoId: 'BL-F7A_9Eys',
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
	var introBox_bottom;
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
				image_wrap: document.querySelector('#scroll-section-0 .image_wrap'),
				messageA: document.querySelector('#scroll-section-0 .sticky-elem'),
			},
			values: {
				messageA_translateY_out: [0, -100, { start: 0.5, end: 1 }],
				image_wrap_translateY_out: [0, -100, { start: 0.5, end: 1 }],
			}
		},
		{
			// 1
			type: 'sticky',
			heightNum: 1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1'),
				movie_wrap: document.querySelector('#scroll-section-1 .movie_wrap'),
				movie: document.querySelector('#scroll-section-1 .movie_wrap .video1'),
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
				bgimg: document.querySelector('#scroll-section-2 .image_wrap'),
				messageA: document.querySelector('#scroll-section-2 .sticky-elem.titlebox'),
				messageB: document.querySelector('#scroll-section-2 .sticky-elem.sec2_st2'),
			},
			values: {
				bgimg_translateY_in: [100, 0, { start: 0, end: 1 }],	
				messageA_translateY_in: [100, 0, { start: 0.5, end: 1 }],
				messageA_translateY_out: [0, -100, { start: 0.04, end: 0.1 }],
				bgimg1_translateY_in: [50, 0, { start: 0.04, end: 0.1 }],
				messageB_translateY_in: [100, 0, { start: 0.04, end: 0.1 }],
				bgimg1_translateY_right: [0, 21.4, { start: 0.1, end: 0.15 }],							
				bgimg1_translateY_up: [73, 0, { start: 0.05, end: 0.1 }],				
				bgimg1_translateY_up2: [0, -30, { start: 0.2, end: 0.3 }],
				bgimg2_translateY_up: [100, 0, { start: 0.2, end: 0.3 }],
				bgimg2_translateY_up2: [0, -30, { start: 0.4, end: 0.5 }],
				bgimg3_translateY_up: [100, 0, { start: 0.4, end: 0.5 }],
				bgimg3_translateY_up2: [0, -30, { start: 0.6, end: 0.7 }],
				bgimg4_translateY_up: [100, 0, { start: 0.6, end: 0.7 }],
				bgimg4_translateY_up2: [0, -100, { start: 0.8, end: 1 }],
				messageB_translateY_out: [0, -100, { start: 0.8, end: 1 }],
				bgimg2_bgposition_up: [0, -230, { start: 0.2, end: 0.3 }],
				bgimg3_bgposition_up: [0, -230, { start: 0.4, end: 0.5 }],
				bgimg4_bgposition_up: [0, -270, { start: 0.6, end: 0.7 }],
			}
		},
		{
			// 3
			type: 'sticky',
			heightNum: 3.1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3'),
				messageA: document.querySelector('#scroll-section-3 .sticky-elem.sec3_st1'),
				messageB: document.querySelector('#scroll-section-3 .sticky-elem.sec3_st2'),
				messageC: document.querySelector('#scroll-section-3 .sticky-elem.sec3_st3'),
			},
			values: {		
				messageA_scale_in: [1.5, 1, { start: 0, end: 0.04 }],
				messageA_translateY_out: [0, -100, { start: 0.05, end: 0.1 }],
				messageB_translateY_in: [100, 0, { start: 0.05, end: 0.1 }],
				messageB_translateY_Hout: [0, -28, { start: 0.2, end: 0.25 }],
				messageB_translateY_out: [-28, -74, { start: 0.75, end: 0.8 }],
				messageB_translateY_out2: [-74, -100, { start: 0.93, end: 1 }],
				messageC_translateY_in: [100, 50, { start: 0.2, end: 0.25 }],
				messageC_translateY_in2: [50, 0, { start: 0.75, end: 0.8 }],
				messageC_translateY_out: [0, -20, { start: 0.93, end: 1 }],
				messageC_rotate_in: [0, 30, { start: 0.45, end: 1 }],
			}
		},
		{
			// 4
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-4'),
				bgimg: document.querySelector('#scroll-section-4 .image_wrap'),
				messageA: document.querySelector('#scroll-section-4 .sticky-elem.sec4_st1'),
				messageB: document.querySelector('#scroll-section-4 .sticky-elem.sec4_st2'),
				messageC: document.querySelector('#scroll-section-4 .sticky-elem.sec4_st3'),
				messageD: document.querySelector('#scroll-section-4 .sticky-elem.sec4_st4'),
			},
			values: {
				bgimg_translateY_in: [100, 0, { start: 0.96, end: 1 }],
				messageA_translateY_in: [100, 0, { start: 0.98, end: 1 }],		
				bgimg2_translateY: [0, -5, { start: 0, end: 1 }],
				bgimg3_translateY: [0, -15, { start: 0, end: 1 }],
				messageA_translateY_up: [0, -100, { start: 0.1, end: 0.2 }],
				messageB_translateY_in: [100, 0, { start: 0.1, end: 0.2 }],
				messageC_translateY_in: [100, 20, { start: 0.1, end: 0.2 }],
				messageB_translateY_out: [60, -101, { start: 0.25, end: 0.3 }],
				messageC_translateY_up: [20, 0, { start: 0.25, end: 0.3 }],
				messageC_translateY_up2: [0, -100, { start: 0.7, end: 0.9 }],
			}
		},
		{
			// 5
			type: 'sticky',
			heightNum: 1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-5'),
				messageA: document.querySelector('#scroll-section-5 .sticky-elem'),
			}
		},
		{
			// 6
			type: 'normal',
			heightNum: 1.5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-6'),
				messageA: document.querySelector('#scroll-section-6 .sticky-elem.sec6_st1'),
				messageB: document.querySelector('#scroll-section-6 .sticky-elem.sec6_st2'),
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
				sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.children[0].offsetHeight;
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

		sceneInfo[1].objs.movie_wrap.style.height = movHeight +"px";
		sceneInfo[1].objs.movie.style.height = movHeight +"px";
		sceneInfo[1].objs.movie.style.width = movWidth +"px";

		if (movWidthRatio <= movHeightRatio) {
			movieScaleRatio = movHeightRatio;
		} else {
			movieScaleRatio = movWidthRatio;
		}
		sceneInfo[1].objs.movie.style.transform = "scale("+ movieScaleRatio +")";

		sceneInfo[2].objs.messageA.style.height = movHeight +"px";
		sceneInfo[3].objs.messageA.style.height = movHeight +"px";
		sceneInfo[4].objs.messageA.style.height = movHeight +"px";
		sceneInfo[4].objs.messageD.style.height = movHeight +"px";
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
		var introBox = document.getElementsByClassName("intro")[0];
		var header = document.getElementsByClassName("header")[0];
		var values = sceneInfo[currentScene].values;

		switch (currentScene) {
			case 0:

				setDeps();
				introBox.style.zIndex = "2";
				sceneInfo[0].objs.container.style.zIndex = "1";
				objs.image_wrap.style.transform = "translate3d(0,0%,0)";

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

				if (yOffset >= (scrollHeight - window.innerHeight)){
					objs.messageA.style.transform = "translate3d(0, "+ calcValues(values.messageA_translateY_out, currentYOffset) +"%, 0)";
					objs.image_wrap.style.transform = "translate3d(0, "+ calcValues(values.messageA_translateY_out, currentYOffset) +"%, 0)";
					sceneInfo[1].objs.movie.play();
					sceneInfo[1].objs.container.style.zIndex = "2";
				}

				sceneInfo[1].objs.movie_wrap.classList.remove('on');
				sceneInfo[1].objs.messageA.classList.remove('on');
				if (yOffset >= (scrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[1].objs.movie_wrap.classList.add('on');
					sceneInfo[1].objs.messageA.classList.add('on');
				}

				break;

			case 1:

				setDeps();
				sceneInfo[0].objs.container.style.zIndex = "-1";
				sceneInfo[1].objs.container.style.zIndex = "2";
				sceneInfo[2].objs.container.style.zIndex = "-1";
				introBox.style.zIndex = "-1";
				sceneInfo[1].objs.movie.play();

				if (yOffset >= (scrollHeight - window.innerHeight)){
					sceneInfo[2].objs.container.style.zIndex = "1";
					sceneInfo[2].objs.bgimg.style.transform = "translate3d(0, "+ calcValues(sceneInfo[2].values.bgimg_translateY_in, currentYOffset) +"%, 0)";
				}
				sceneInfo[2].objs.messageA.classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[2].objs.messageA.classList.add('on');
				}

				break;

			case 2:
	
				setDeps();
				introBox.style.zIndex = "-1";
				sceneInfo[1].objs.container.style.zIndex = "-1";
				sceneInfo[2].objs.container.style.zIndex = "1";
				sceneInfo[3].objs.container.style.zIndex = "-1";
				sceneInfo[1].objs.movie.pause();	
				objs.bgimg.children[0].style.transform = "translate3d(0, 100%, 0)";
				objs.bgimg.children[1].style.transform = "translate3d(0, 100%, 0)";
				objs.bgimg.children[2].style.transform = "translate3d(0, 100%, 0)";
				objs.bgimg.children[3].style.transform = "translate3d(0, 100%, 0)";

				if (scrollRatio >= 0){
					objs.bgimg.style.transform = "translate3d(0, 0, 0)";
					objs.messageA.classList.add('on');					
				}
				if (scrollRatio >= 0.04){					
					objs.messageB.style.transform = "translate3d(0, "+ calcValues(values.messageB_translateY_in, currentYOffset) +"%, 0)";
					objs.bgimg.children[0].style.transform = "translate3d(0, "+ calcValues(values.bgimg1_translateY_in, currentYOffset) +"%, 0)";
				}
				if (scrollRatio >= 0.1){
					objs.messageB.style.transform = "translate3d(0, 0%, 0)";
					objs.bgimg.children[0].style.transform = "translate3d("+ calcValues(values.bgimg1_translateY_right, currentYOffset) +"%, 0, 0)";
				}
				if (scrollRatio >= 0.15){
					objs.bgimg.children[0].style.transform = "translate3d(21.4%, 0, 0)";
					objs.bgimg.children[1].style.transform = "translate3d(0, 100%, 0)";
					objs.bgimg.children[1].style.backgroundPosition = "center 0";
					objs.messageB.children[0].children[2].children[0].innerHTML = "01";
					objs.messageB.classList.add('on');
				} else {
					objs.messageB.classList.remove('on');
				}
				if (scrollRatio >= 0.2){
					objs.bgimg.children[0].style.transform = "translate3d(21.4%, "+ calcValues(values.bgimg1_translateY_up2, currentYOffset) +"%, 0)";
					objs.bgimg.children[1].style.transform = "translate3d(0, "+ calcValues(values.bgimg2_translateY_up, currentYOffset) +"%, 0)";
					objs.bgimg.children[1].style.backgroundPosition = "center "+ calcValues(values.bgimg2_bgposition_up, currentYOffset) +"px";
				}
				if (scrollRatio >= 0.3){
					objs.bgimg.children[0].style.transform = "translate3d(21.4%, -100%, 0)";
					objs.bgimg.children[1].style.transform = "translate3d(0, 0, 0)";
					objs.bgimg.children[2].style.transform = "translate3d(0, 100%, 0)";
					objs.bgimg.children[2].style.backgroundPosition = "center 0";
					objs.messageB.children[0].children[2].children[0].innerHTML = "02";
				}
				if (scrollRatio >= 0.4){
					objs.bgimg.children[1].style.transform = "translate3d(0, "+ calcValues(values.bgimg2_translateY_up2, currentYOffset) +"%, 0)";
					objs.bgimg.children[2].style.transform = "translate3d(0, "+ calcValues(values.bgimg3_translateY_up, currentYOffset) +"%, 0)";
					objs.bgimg.children[2].style.backgroundPosition = "center "+ calcValues(values.bgimg3_bgposition_up, currentYOffset) +"px";
				}

				if (scrollRatio >= 0.5){
					objs.bgimg.children[1].style.transform = "translate3d(0, -100%, 0)";
					objs.bgimg.children[2].style.transform = "translate3d(0, 0, 0)";
					objs.bgimg.children[3].style.transform = "translate3d(0, 100%, 0)";
					objs.bgimg.children[3].style.backgroundPosition = "center 0";
					objs.messageB.children[0].children[2].children[0].innerHTML = "03";
				}
				if (scrollRatio >= 0.6){
					objs.bgimg.children[2].style.transform = "translate3d(0, "+ calcValues(values.bgimg3_translateY_up2, currentYOffset) +"%, 0)";
					objs.bgimg.children[3].style.transform = "translate3d(0, "+ calcValues(values.bgimg4_translateY_up, currentYOffset) +"%, 0)";
					objs.bgimg.children[3].style.backgroundPosition = "center "+ calcValues(values.bgimg4_bgposition_up, currentYOffset) +"px";
				}
				if (scrollRatio >= 0.7){
					objs.bgimg.children[2].style.transform = "translate3d(0, -100%, 0)";
					objs.bgimg.children[3].style.transform = "translate3d(0, 0, 0)";
					objs.messageB.children[0].children[3].children[3].classList.add('on');
					objs.messageB.children[0].children[2].children[0].innerHTML = "04";
				} else {
					objs.messageB.children[0].children[3].children[3].classList.remove('on');
				}
				if (scrollRatio >= 0.8){
					objs.bgimg.children[3].style.transform = "translate3d(0, "+ calcValues(values.bgimg4_translateY_up2, currentYOffset) +"%, 0)";
					objs.messageB.style.transform = "translate3d(0, "+ calcValues(values.messageB_translateY_out, currentYOffset) +"%, 0)";
				}
				if (scrollRatio >= 0.15 && scrollRatio < 0.3 ){
					objs.messageB.children[0].children[3].children[0].classList.add('on');
				} else {
					objs.messageB.children[0].children[3].children[0].classList.remove('on');
				}

				if (scrollRatio >= 0.3 && scrollRatio < 0.5 ){
					objs.messageB.children[0].children[3].children[1].classList.add('on');
				} else {
					objs.messageB.children[0].children[3].children[1].classList.remove('on');
				}

				if (scrollRatio >= 0.5 && scrollRatio < 0.7 ){
					objs.messageB.children[0].children[3].children[2].classList.add('on');
				} else {
					objs.messageB.children[0].children[3].children[2].classList.remove('on');
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[3].objs.container.style.zIndex = "2";
				}

				sceneInfo[3].objs.messageA.classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[3].objs.messageA.classList.add('on');
				}

				break;

			case 3:

				setDeps();
				introBox.style.zIndex = "-1";
				sceneInfo[2].objs.container.style.zIndex = "-1";
				sceneInfo[3].objs.container.style.zIndex = "1";
				sceneInfo[4].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0){
					objs.messageA.classList.add('on');
				}

				if (scrollRatio >= 0.1){
					objs.messageB.classList.add('on');
				} else {
					objs.messageB.classList.remove('on');
				}
				if (scrollRatio >= 0.3){
					objs.messageB.children[0].children[2].classList.add('on');	
				} else {
					objs.messageB.children[0].children[2].classList.remove('on');	
				}
				if (scrollRatio >= 0.4){					
					objs.messageC.children[0].classList.add('on');					
				} else {
					objs.messageC.children[0].classList.remove('on');					
				}
				if (scrollRatio >= 0.45){
					objs.messageC.children[0].children[0].style.transform =  "rotate("+ Math.floor(calcValues(values.messageC_rotate_in, currentYOffset)) +"deg)";
				}
				if (scrollRatio >= 0.5){
					objs.messageC.children[1].classList.add('on');
					objs.messageC.children[1].children[0].classList.add('on');
				} else {
					objs.messageC.children[1].classList.remove('on');
					objs.messageC.children[1].children[0].classList.remove('on');
				}
				if (scrollRatio >= 0.6){
					objs.messageC.children[1].children[0].classList.remove('on');
					objs.messageC.children[1].children[1].classList.add('on');
				} else {
					objs.messageC.children[1].children[1].classList.remove('on');					
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[4].objs.container.style.zIndex = "2";
					sceneInfo[4].objs.bgimg.classList.remove('on');
					sceneInfo[4].objs.bgimg.children[0].style.transform = "translate3d(0, 0%, 0)";
					sceneInfo[4].objs.bgimg.children[1].style.transform = "translate3d(0, 0%, 0)";
					sceneInfo[4].objs.bgimg.children[2].style.transform = "translate3d(0, 0%, 0)";
				} else {
					sceneInfo[4].objs.container.style.zIndex = "-1";
				}

				sceneInfo[4].objs.messageA.classList.remove('on');
				sceneInfo[4].objs.messageB.classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[4].objs.messageA.classList.add('on');
				}

				break;

			case 4:				
				setDeps();
				introBox.style.zIndex = "-1";
				sceneInfo[3].objs.container.style.zIndex = "-1";
				sceneInfo[4].objs.container.style.zIndex = "1";				

				if (scrollRatio >= 0){
					objs.messageA.classList.add('on');
					objs.bgimg.classList.add('on');
					objs.bgimg.style.transform =  "translate3d(0, 0%, 0)";					
					objs.bgimg.children[1].style.transform = "translate3d(0, "+ calcValues(values.bgimg2_translateY, currentYOffset) +"%, 0)";
					objs.bgimg.children[2].style.transform = "translate3d(0, "+ calcValues(values.bgimg3_translateY, currentYOffset) +"%, 0)";
				}

				if (scrollRatio >= 0.1){
					objs.messageB.classList.add('on');					
				} else {
					objs.messageB.classList.remove('on');
				}

				if (scrollRatio >= 0.15){
					objs.messageC.style.transform =  "translate3d(0, 20%, 0)";	
					objs.messageC.classList.add('on');
					objs.messageC.children[0].children[1].classList.add('on');
					objs.messageC.children[0].children[2].classList.remove('on');
					objs.messageC.children[0].children[0].children[0].innerHTML = "01";
				} else {
					objs.messageC.classList.remove('on');
					objs.messageC.children[0].children[1].classList.remove('on');
				}

				if (scrollRatio >= 0.25){
					objs.messageB.style.transform = "translate3d(0, "+ calcValues(values.messageB_translateY_out, currentYOffset) +"%, 0)";
					objs.messageC.style.transform = "translate3d(0, "+ calcValues(values.messageC_translateY_up, currentYOffset) +"%, 0)";			
				} else {
					objs.messageB.style.transform =  "translate3d(0, 60%, 0)";	
				}

				if (scrollRatio >= 0.3){
					objs.messageC.children[0].children[1].classList.remove('on');
					objs.messageC.children[0].children[2].classList.add('on');
					objs.messageC.children[0].children[0].children[0].innerHTML = "02";
				} else {
					objs.messageC.children[0].children[2].classList.remove('on');
				}

				if (scrollRatio >= 0.4){
					objs.messageC.children[0].children[2].classList.remove('on');					
					objs.messageC.children[0].children[3].classList.add('on');
					objs.messageC.children[0].children[0].children[0].innerHTML = "03";
				} else {
					objs.messageC.children[0].children[3].classList.remove('on');
				}

				if (scrollRatio >= 0.5){
					objs.messageC.children[0].children[3].classList.remove('on');
					objs.messageC.children[0].children[4].classList.add('on');
					objs.messageC.children[0].children[0].children[0].innerHTML = "04";
					objs.messageC.children[0].children[0].style.margin = "-220px 0 0 0";
				} else {
					objs.messageC.children[0].children[4].classList.remove('on');
					objs.messageC.children[0].children[0].style.margin = "-170px 0 0 0";
				}

				if (scrollRatio >= 0.7){
					objs.messageC.style.transform = "translate3d(0, "+ calcValues(values.messageC_translateY_up2, currentYOffset) +"%, 0)";			
					objs.messageD.classList.add('on');				
				} else {
					objs.messageD.classList.remove('on');
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					objs.bgimg.classList.remove('on');
					sceneInfo[5].objs.container.style.zIndex = "2";				
				} else {
					sceneInfo[5].objs.container.style.zIndex = "-1";
				}

				sceneInfo[5].objs.messageA.classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[5].objs.messageA.classList.add('on');
				}

				break;

			case 5:	

				setDeps();
				introBox.style.zIndex = "-1";
				sceneInfo[4].objs.container.style.zIndex = "-1";
				sceneInfo[5].objs.container.style.zIndex = "1";
				
				objs.messageA.classList.add('on');

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){					
					sceneInfo[6].objs.container.style.zIndex = "2";
				} else {
					sceneInfo[6].objs.container.style.zIndex = "-1";
				}

				sceneInfo[6].objs.messageA.classList.remove('on');
				sceneInfo[6].objs.messageB.classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[6].objs.messageA.classList.add('on');
				}

				break;

			case 6:	
				
				setDeps();
				introBox.style.zIndex = "-1";
				sceneInfo[5].objs.container.style.zIndex = "-1";
				sceneInfo[6].objs.container.style.zIndex = "1";

				objs.messageA.classList.add('on');

				if (scrollRatio >= 0.1){
					objs.messageB.classList.add('on');
				}

				break;
		}
		
	}

	function introAniIn(){
		var introBox = document.getElementsByClassName("intro")[0];
		setTimeout(function() {
			introBox.classList.add('aniin');
			introBox_bottom.style.height = "80px";
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
		introAniR()
		introAniIn();

		if (yOffset > 0) {
			setTimeout(function() {
				yOffset += 5;
				scrollTo(0, yOffset);						
			}, 20);
		}

		if ((document.body.offsetHeight - window.innerHeight) - delayedYOffset < 1) {
            scrollTo(0, yOffset - 1);
        }

		if (yOffset > 0){			
			header.classList.remove('hintro');	
		} else {
			$(".container").on('scroll touchmove mousewheel', function(e){
				e.preventDefault();
				e.stopPropagation(); 
				return false;
			});
			setTimeout(function() {
				$(".container").off('scroll touchmove mousewheel');
			}, 2000);				
		}

		if (yOffset > sceneInfo[0].scrollHeight){
			document.getElementsByClassName("header")[0].classList.remove('hintro');
			introBox.style.zIndex = "-1";
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

  		document.querySelector('.loading').addEventListener('transitionend', function(e){
  			document.body.removeChild(e.currentTarget);
  		});

		window.addEventListener("mousemove", mouseFunc, false);
		function mouseFunc(e){
			x = (e.clientX - window.innerWidth / 2);
			y = (e.clientY - window.innerHeight / 2);
		}
		mouseloop();
	});

	var x = 0;
	var y = 0;
	var mx = 0;
	var my = 0;
	var speed = 0.009;

	var section1_imgw = document.getElementsByClassName("sec0");
	section1_imgw = section1_imgw[0].children[0];	
	var section1_imgw1 = section1_imgw.children[0];
	var section1_imgw2 = section1_imgw.children[1];
	var section1_imgw3 = section1_imgw.children[2];

	function mouseloop(){
		mx += (x - mx) * speed;
		my += (y - my) * speed;
		section1_imgw3.style.transform = "translate("+ -(mx/10) +"px, " + -(my/10) +"px)";
		section1_imgw2.style.transform = "translate("+ -(mx/30) +"px, " + -(my/30) +"px)";
		section1_imgw1.style.transform = "translate("+ -(mx/50) +"px, " + -(my/50) +"px)";
		window.requestAnimationFrame(mouseloop);
	}




