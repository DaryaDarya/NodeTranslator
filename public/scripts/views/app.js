require.config({
    baseUrl: "/scripts",
    paths: {
        "jquery": "foreign/jquery",
        "underscore": "foreign/underscore"
    },
    waitSeconds: 15
  });

require(["jquery", "underscore"], function ($, _) {
    $(function () {
		function sendText(){
			var text = $("#text").val();
			if (!text){
				$("#translationText").val("");
				return;	
			}
    		$.post("/", { text: text, lang: $(".changeDirection").attr("data-direction") }, function(data){
    			if (data.error || !data.translate){
    				return $(".title").text(data.title);
    			}
				$("#translationText").val(data.translate)
    		})
		};


		function saveWordsPair (){
			var currentDirection = $(this).attr("data-direction");
			//todo: move logic to server
    		if (currentDirection == "ru-cs"){
    			$.post("/saveWordsPair", { ru_word: $("#translationText").val(), cs_word: $("#text").val()}, function(data){
	    			if (data.error){
	    				return $(".title").val(data.title);
	    			}
    			})	
    		}else{
  				$.post("/saveWordsPair", { cs_word:  $("#translationText").val(), ru_word: $("#text").val()}, function(data){		
	    			if (data.error){
	    				return $(".title").val(data.title);
	    			}
    			})
    		}		
		}

		var debouncedSend = _.debounce(sendText, 400);
    	$("#text").on("input", debouncedSend);
    	$(".changeDirection").click(function(){
    		var currentDirection = $(this).attr("data-direction");
    		if (currentDirection == "ru-cs"){
    			$(this).attr("data-direction", "cs-ru");	
    			$(this).val("CS <-> RU");	
    		}else{
    			$(this).attr("data-direction", "ru-cs");
    			$(this).val("RU <-> CS");
    		}
    		sendText();
    	});
    	$(".saveBtn").click(function(){
    		saveWordsPair();	
    	})
    	
    });
});