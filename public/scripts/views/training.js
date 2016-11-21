define(["jquery", "underscore", "module"], function ($, _, module) {
    return (function (){
        var items = module.config().items; 
        console.log(items);   	
    })();
});