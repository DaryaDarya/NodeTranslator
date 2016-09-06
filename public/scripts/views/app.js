require.config({
    baseUrl: "/scripts",
    paths: {
        "jquery": "foreign/jquery"
    },
    waitSeconds: 15
  });
require(["jquery"], function ($) {
    $(function () {
    	$("#translateBtn").click(function(){
    		$.post("/", { text: $("#text").val(), lang: $("input:checked").val() }, function(data){
    			if (data.error || !data.translate){
    				return $("h2").val(data.title);
    			}
				$("#translationText").val(data.translate)
    		})
    	})
    });
});