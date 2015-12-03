(function(angular) {
	
	angular
		.module('abVideoWidget', [])
		.directive('abVideo', videoDirective);
	
	function videoDirective(){
		
		var template = '<video id="video" controls></video>';
		
		return {
			restrict: "EA",
			replace: true,
			link: link,
			template: template,
			controller: controller,
			controllerAs: 'videoVM',
			bindToController: {
				api: '='
			}
		};
		
		function link(scope, elem, attribs, controller) {
			
			var video = elem[0];
			
			video.src = attribs.abSrc;
			controller.native = video;
		}
		
		function controller() {
			
			var vm = this;
			
			vm.native = {};
			
			vm.api = {
				controls: {
					play: play,
					pause: pause,
					changeSource: changeSource
				},
				properties: {
					isPaused: true,
					duration: getDuration,
					isPaused: isPaused
				}
			};
			
			function play() {
				vm.native.play();
				vm.api.properties.isPaused = false;
			}
			
			// src: url, play:Boolean 
			function changeSource(src, play) {
				
				vm.native.src= src;
				
				if(play) {
					vm.native.play();	
				}
			}
			
			function pause() {
				vm.native.pause();
			}
			
			function getDuration() {
				return vm.native.duration;
			}
			
			function isPaused() {
				return vm.native.paused;
			}
		}
		
	}
	
})(window.angular);