define(["jquery", "underscore", "module"], function ($, _, module) {
    return (function (){
        var items = module.config().items; 
        var indexedItems = _.indexBy(items, "cs_word");
        var qList = _.sortBy(_.keys(indexedItems), function(){ return _.random(0, items.length-1); });
        console.log(items);   	
        console.log(qList);
        var resultList = [];
        var $resultWrap = $(".resultWrap");
        var $checkBtn = $(".checkBtn");
        var $questionWord = $(".questionWord");
        var $answerWord = $(".answerWord");
        nextQuestion(); 
        $checkBtn.click(function(){
            if ($checkBtn.val() == "Check"){
                checkBtn();     
            }else if ($checkBtn.val() == "Next"){
                nextQuestion();
            }else{
                location.reload();
            }
        });

        function checkBtn(){
            var question = $questionWord.text();
            var answer = $answerWord.val();
            if (indexedItems[question].ru_word == answer){
                resultList.push(indexedItems[question]._id);
                $resultWrap.text("Correct!");
            }else{
                $resultWrap.text("Wrong! Correct answer: " + indexedItems[question].ru_word);
            }
            $checkBtn.val("Next");
        };

        function nextQuestion(){
            if(qList.length){
                $questionWord.text(qList.pop()); 
                $answerWord.val("");
                $checkBtn.val("Check"); 
                $resultWrap.text("");
            }else{
                $resultWrap.text("Training finish!"); //todo: show statistics
                $checkBtn.val("New Training");
                $questionWord.hide();
                $answerWord.hide();
                $.post("/updateRate", { resultList: resultList}, function(data){
                    if (data.error){
                        $resultWrap.text(data.error);
                    }
                })
            }      
        }
    })();
});