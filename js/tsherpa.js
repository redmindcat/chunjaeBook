
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
				movie_wrap_translateY_out: [0, -20, { start: 0.5, end: 1 }],
				messageA_translateY_out: [0, -20, { start: 0.5, end: 1 }],
			}
		},
		{
			// 1
			type: 'sticky',
			heightNum: 6,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1'),				
				messageA: document.querySelector('#scroll-section-1 .sticky-elem.sec1_st1'),	
				messageB: document.querySelector('#scroll-section-1 .sticky-elem.sec1_st2'),		
				messageC: document.querySelector('#scroll-section-1 .sticky-elem.sec1_st3'),		
			},
			values: {
				messageB_translateY_in: [100, 0, { start: 0, end: 0.17 }],
				messageC_translateY_in: [100, 15, { start: 0, end: 0.17 }],
				messageB_translateY_out: [0, -50, { start: 0.3, end: 0.45 }],
				messageC_translateY_up: [15, 0, { start: 0.3, end: 0.38 }],
				messageC_translateY_out: [0, -100, { start: 0.8, end: 1 }],
			}
		},
		{
			// 2
			type: 'sticky',
			heightNum: 1,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2'),
				messageA: document.querySelector('#scroll-section-2 .sticky-elem.sec2_st1'),
			},
			values: {
			}
		},
		{
			// 3
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3'),
				messageA: document.querySelector('#scroll-section-3 .sticky-elem.sec3_st1'),
			},
			values: {
				messageA_translateY_in: [100, 0, { start: 0, end: 1 }],
				messageB_translateY_in: [100, 0, { start: 0.1, end: 0.15 }],
				messageB_translateY_out: [0, -130, { start: 0.75, end: 1 }],
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
			values: {
			}
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
				messageC_translateY_in: [100, 0, { start: 0.07, end: 0.2 }],
				messageC_translateY_up: [22, 0, { start: 0.45, end: 0.5 }],
				messageC_translateY_up2: [0, -100, { start: 0.55, end: 0.65 }],
				messageD_translateY_in: [100, 0, { start: 0.55, end: 0.65 }],
				messageC_translateY_out: [-30, -100, { start: 0.83, end: 0.93 }],
				messageD_translateY_out: [0, -100, { start: 0.83, end: 0.98 }],
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
			//heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-7'),
				content: document.querySelector('#scroll-section-7 > div'),
				messageA: document.querySelector('#scroll-section-7 .sticky-elem.sec7_st1'),
				messageB: document.querySelector('#scroll-section-7 .sticky-elem.sec7_st2'),
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

		if (movWidthRatio <= movHeightRatio) {
			movieScaleRatio = movHeightRatio;
		} else {
			movieScaleRatio = movWidthRatio;
		}
		sceneInfo[0].objs.movie.style.transform = "scale("+ movieScaleRatio +")";

		sceneInfo[1].objs.messageA.style.height = movHeight +"px";
		sceneInfo[5].objs.messageA.style.height = movHeight +"px";
		sceneInfo[6].objs.messageA.style.height = movHeight +"px";
		sceneInfo[6].objs.messageC.style.height = movHeight +"px";
	}

	function introAniR(){
		introBox_bottom = document.getElementsByClassName("wh bottom")[0];
		introBox_bottom.style.height = (window.innerHeight - 130) + "px";
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
		var sec2_st2_video4 = document.getElementsByClassName("sec2_st2_video4")[0];	
		var sec2_st2_video5_1 = document.getElementsByClassName("sec2_st2_video5_1")[0];
		var sec2_st2_video5_2 = document.getElementsByClassName("sec2_st2_video5_2")[0];
		var sec2_st2_video6 = document.getElementsByClassName("sec2_st2_video6")[0];
		
		switch (currentScene) {
			case 0:
				setDeps();				
				sceneInfo[0].objs.container.style.zIndex = "1";
				objs.movie_wrap.style.transform = "translate3d(0,0%,0)";
				objs.messageA.style.transform = "translate3d(0,0%,0)";

				if (scrollRatio <= 0.1) {
					introBox.style.zIndex = "2";
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
					objs.movie_wrap.style.transform = "translate3d(0, "+ calcValues(values.movie_wrap_translateY_out, currentYOffset) +"%, 0)";
					objs.messageA.style.transform = "translate3d(0, "+ calcValues(values.messageA_translateY_out, currentYOffset) +"%, 0)";
					sceneInfo[1].objs.container.style.zIndex = "2";
				} else {
					sceneInfo[1].objs.messageA.classList.remove('on');
				}

				sceneInfo[1].objs.messageA.classList.remove('on');
				if (yOffset >= (scrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[1].objs.messageA.classList.add('on');
					sceneInfo[1].objs.messageB.style.transform = "translate3d(0, 100%, 0)";
				}

				break;

			case 1:
				
				setDeps();
				introBox.style.zIndex = "-1";
				sceneInfo[0].objs.container.style.zIndex = "-1";
				sceneInfo[1].objs.container.style.zIndex = "1";
				sceneInfo[2].objs.container.style.zIndex = "-1";
				
				if (scrollRatio >= 0 ){
					objs.messageA.classList.add('on');					
					objs.messageB.style.transform = "translate3d(0, "+ calcValues(values.messageB_translateY_in, currentYOffset) +"%, 0)";
					objs.messageC.style.transform = "translate3d(0, "+ calcValues(values.messageC_translateY_in, currentYOffset) +"%, 0)";
				} else {
					objs.messageB.style.transform = "translate3d(0, 100%, 0)";
					objs.messageC.style.transform = "translate3d(0, 100%, 0)";
				}
				if (scrollRatio >= 0.18){			
					objs.messageC.children[0].children[0].classList.add('on');
					objs.messageC.children[0].children[1].classList.remove('on');
					objs.messageC.style.transform = "translate3d(0, 15%, 0)";
				} else {
					objs.messageC.classList.remove('on');
					objs.messageC.children[0].children[0].classList.remove('on');
				}

				if (scrollRatio >= 0.3){
					objs.messageB.style.transform = "translate3d(0, "+ calcValues(values.messageB_translateY_out, currentYOffset) +"%, 0)";
					objs.messageC.style.transform = "translate3d(0, "+ calcValues(values.messageC_translateY_up, currentYOffset) +"%, 0)";
				}

				if (scrollRatio >= 0.45){
					objs.messageC.children[0].children[0].classList.remove('on');	
					objs.messageC.children[0].children[1].classList.add('on');				
				} else {
					objs.messageC.children[0].children[1].classList.remove('on');		
				}
				if (scrollRatio >= 0.55){
					objs.messageC.children[0].children[1].classList.remove('on');	
					objs.messageC.children[0].children[2].classList.add('on');				
				} else {
					objs.messageC.children[0].children[2].classList.remove('on');		
				}
				if (scrollRatio >= 0.65){
					objs.messageC.children[0].children[2].classList.remove('on');	
					objs.messageC.children[0].children[3].classList.add('on');				
				} else {
					objs.messageC.children[0].children[3].classList.remove('on');		
				}
				if (scrollRatio > 0.8){
					objs.messageC.style.transform = "translate3d(0, "+ calcValues(values.messageC_translateY_out, currentYOffset) +"%, 0)";					
				}
				
				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[2].objs.container.style.zIndex = "2";
					sec2all.style.zIndex = "2";
				}
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[2].objs.messageA.children[0].classList.add('on');	
				} else {
					sceneInfo[2].objs.messageA.children[0].classList.remove('on');	
				}

				break;

			case 2:
				
				setDeps();
				introBox.style.zIndex = "-1";
				sec2all.style.zIndex = "1";
				sceneInfo[1].objs.container.style.zIndex = "-1";
				sceneInfo[2].objs.container.style.zIndex = "1";
				sceneInfo[3].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0 ){
					objs.messageA.children[0].classList.add('on');	
				}				
				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[3].objs.container.style.zIndex = "2";
					sceneInfo[3].objs.messageA.style.transform = "translate3d(0, "+ calcValues(sceneInfo[3].values.messageA_translateY_in, currentYOffset) +"%, 0)";
				} else {
					sceneInfo[3].objs.messageA.style.transform = "translate3d(0, 100%, 0)";
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[3].objs.messageA.classList.remove('on');	
					sceneInfo[3].objs.messageA.children[1].children[1].children[0].classList.remove('on');	
				}

				break;

			case 3:
				
				setDeps();
				introBox.style.zIndex = "-1";
				sec2all.style.zIndex = "1";
				sceneInfo[2].objs.container.style.zIndex = "-1";
				sceneInfo[3].objs.container.style.zIndex = "1";
				sceneInfo[4].objs.container.style.zIndex = "-1";
				objs.messageA.style.transform = "translate3d(0, 0, 0)";

				if (scrollRatio >= 0 ){
					objs.messageA.classList.add('on');	
					objs.messageA.children[1].children[1].children[0].classList.add('on');	
				}
				if (scrollRatio >= 0.21 ){
					objs.messageA.children[1].children[1].children[0].classList.remove('on');	
					objs.messageA.children[1].children[1].children[1].classList.add('on');		
				} else {
					objs.messageA.children[1].children[1].children[1].classList.remove('on');	
				}				
				if (scrollRatio >= 0.32 ){
					objs.messageA.children[0].children[0].children[0].classList.add('on');
					objs.messageA.children[1].children[1].children[1].classList.remove('on');	
					objs.messageA.children[1].children[1].children[2].classList.add('on');	
				} else {
					objs.messageA.children[1].children[1].children[2].classList.remove('on');
				}				
				if (scrollRatio >= 0.43 ){
					objs.messageA.children[0].children[0].children[0].classList.remove('on');
					objs.messageA.children[0].children[0].children[1].classList.add('on');
					objs.messageA.children[1].children[1].children[2].classList.remove('on');	
					objs.messageA.children[1].children[1].children[3].classList.add('on');
					sec2_st2_video4.play();
					sec2_st2_video5_1.pause();
				} else {
					objs.messageA.children[0].children[0].children[1].classList.remove('on');
					objs.messageA.children[1].children[1].children[3].classList.remove('on');					
				}
				if (scrollRatio >= 0.54 ){
					objs.messageA.children[0].children[0].children[1].classList.remove('on');
					objs.messageA.children[0].children[0].children[2].classList.add('on');
					objs.messageA.children[1].children[1].children[3].classList.remove('on');	
					objs.messageA.children[1].children[1].children[4].classList.add('on');
					sec2_st2_video5_1.play();
					sec2_st2_video4.pause();
					sec2_st2_video6.pause();
				} else {
					objs.messageA.children[0].children[0].children[2].classList.remove('on');
					objs.messageA.children[1].children[1].children[4].classList.remove('on');					
				}
				if (scrollRatio >= 0.65 ){
					objs.messageA.children[0].children[0].children[2].classList.remove('on');
					objs.messageA.children[0].children[0].children[3].classList.add('on');
					objs.messageA.children[1].children[1].children[4].classList.remove('on');	
					objs.messageA.children[1].children[1].children[5].classList.add('on');
					sec2_st2_video6.play();
					sec2_st2_video5_1.pause();
				} else {
					objs.messageA.children[0].children[0].children[3].classList.remove('on');
					objs.messageA.children[1].children[1].children[5].classList.remove('on');			
				}
				if (scrollRatio >= 0.75 ){
					objs.messageA.style.transform = "translate3d(0, "+ calcValues(values.messageB_translateY_out, currentYOffset) +"%, 0)";
				} else {
					objs.messageA.style.transform = "translate3d(0, 0, 0)";
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){
					sceneInfo[4].objs.container.style.zIndex = "2";
				}
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
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

				if (scrollRatio >= 0.2 ){
					objs.messageB.classList.add('on');	
				} else {
					objs.messageB.classList.remove('on');	
				}
				if (scrollRatio >= 0.45 ){
					objs.messageC.classList.add('on');	
				} else {
					objs.messageC.classList.remove('on');	
				}
				if (scrollRatio >= 0.7 ){
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
				introBox.style.zIndex = "-1";
				sceneInfo[4].objs.container.style.zIndex = "-1";
				sceneInfo[5].objs.container.style.zIndex = "1";
				sceneInfo[6].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0 ){
					objs.messageA.classList.add('on');		
				}
				if (scrollRatio >= 0.07 ){
					objs.messageC.style.transform = "translate3d(0, "+ calcValues(values.messageC_translateY_in, currentYOffset) +"%, 0)";
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
				if (scrollRatio >= 0.65 ){
					objs.messageC.style.transform = "translate3d(0, -100%, 0)";
					objs.messageD.style.transform = "translate3d(0, 0%, 0)";
					objs.messageD.children[0].children[0].classList.add('on');
					objs.messageD.children[0].children[2].classList.add('on');
					objs.messageD.children[0].children[1].classList.remove('on');
				} else {
					objs.messageD.children[0].children[0].classList.remove('on');
					objs.messageD.children[0].children[2].classList.remove('on');
				}
				if (scrollRatio >= 0.75 ){
					objs.messageD.children[0].children[1].classList.add('on');
					objs.messageD.children[0].children[0].classList.remove('on');
				} else {
					objs.messageD.children[0].children[1].classList.remove('on');				
				}
				if (scrollRatio >= 0.83 ){
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
				introBox.style.zIndex = "-1";
				sceneInfo[5].objs.container.style.zIndex = "-1";
				sceneInfo[6].objs.container.style.zIndex = "1";
				sceneInfo[7].objs.container.style.zIndex = "-1";

				if (scrollRatio >= 0){
					objs.messageA.classList.add('on');	
				}
				if (scrollRatio >= 0.26){
					objs.messageC.classList.add('on');	
				} else {
					objs.messageC.classList.remove('on');	
				}
				if (scrollRatio >= 0.55){
					objs.messageD.children[0].children[0].classList.add('on');
					objs.messageD.children[0].children[1].classList.add('on');
					objs.messageD.children[0].children[2].classList.add('on');	
				} else {
					objs.messageD.children[0].children[0].classList.remove('on');
					objs.messageD.children[0].children[1].classList.remove('on');
					objs.messageD.children[0].children[2].classList.remove('on');	
				}

				if (yOffset >= (scrollHeight + prevScrollHeight - window.innerHeight)){					
					sceneInfo[7].objs.container.style.zIndex = "2";
				} else {
					sceneInfo[7].objs.container.style.zIndex = "-1";
				}

				sceneInfo[7].objs.messageA.classList.remove('on');
				sceneInfo[7].objs.messageB.classList.remove('on');
				if (yOffset >= (scrollHeight + prevScrollHeight - (window.innerHeight - (window.innerHeight*0.6)))){
					sceneInfo[7].objs.messageA.classList.add('on');
				}

				break;

			case 7:	
				
				setDeps();
				introBox.style.zIndex = "-1";
				sceneInfo[6].objs.container.style.zIndex = "-1";
				sceneInfo[7].objs.container.style.zIndex = "1";

				objs.messageA.classList.add('on');

				if (scrollRatio >= 0.1){
					objs.messageB.classList.add('on');
				}

				break;
		}		
	}

	function introAniIn(){
		sceneInfo[0].objs.movie_wrap.classList.add('on');
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
		
		setLayout();
        document.body.classList.remove('before-load');
		setLayout();
		introAniR();
		introAniIn();

		var introVideo = document.getElementsByClassName("video1")[0];
		var tempYOffset = yOffset;
        var tempScrollCount = 0;
		if (tempYOffset > 0){			
			var siId = setInterval(function() {
                scrollTo(0, tempYOffset);
                tempYOffset += 5;

				if (tempScrollCount > 20) {
                    clearInterval(siId);
                }
                tempScrollCount++;
            }, 20);

			introBox.style.zIndex = "-1";
			introVideo.currentTime = 3.033333;
			header.classList.remove('hintro');	
			sceneInfo[0].objs.movie_wrap.classList.add('on');

		} else {				
			introVideo.currentTime = 0;
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



