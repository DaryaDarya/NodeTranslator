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
    				return $(".title").val(data.title);
    			}
				$("#translationText").val(data.translate)
    		})
		};
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
    	})
    	
    });
});