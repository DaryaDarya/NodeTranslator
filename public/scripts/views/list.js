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
		function deleteItem(){
			var id = $(this).attr("data-item");
            var row = $(this).parents("tr");
			if (!id){
				$(".title").text("Sorry, can't delete item");
				return;	
			}
    		$.post("/delete", { id: id }, function(data){
    			if (data.error){
    				$(".title").text(data.error);
    				return;
    			}
				row.remove();
    		})    
		};


		function changeItem (){

		}

    	$(".deleteBtn").click(deleteItem)
    	
    });
});