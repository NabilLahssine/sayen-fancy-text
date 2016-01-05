/* 
* Plugin Name : Sayen Fancy Text
* Plugin Author : Nabil Lahssine
* Contact : nabil.lahssine@gmail.com
* Feel free to do anything with Sayen Fancy Text Plugin 
*/
(function(window, $) {
    var sayenft = function(el, options) {
        var $this = this;
        $this.el = el;
        $this.$el = $(el);
        $this.options = options;
        $this.$el.append('<span class="sy-w-container"></span>');        
        $this.$ctn = $(this.$el.children('.sy-w-container'));
        $this.$wc = ''; $this.reverse = false;
        $this.i = $this.c = 0; $this.acWord = '';
    };

    sayenft.prototype = {
        defaults: {
           'holdTime': 500,
           'typeSpeed': 80,
           'cursor' : true,
           'words': [],
           'typing' : false,
           'typeAnimation' : 'fade'
        },
        init : function() {
            var $this = this;
            $this.cf = $.extend({}, $this.defaults, $this.options);                        
            if($this.cf.cursor === true){
                $this.$el.append('<span class="cursor">|</span>');  
                $this.$cursor = $(this.$el.children('.cursor'));
                setInterval(function(){
                    $this.$cursor.fadeOut(300,function(){
                        $this.$cursor.fadeIn(300);   
                    });
                },620);
            }
            if($this.cf.typing == true){
                $this.$ctn.attr({'data-style':$this.cf.typeAnimation});
                $this.fancyTextTyping();                
            }else{
                $this.$ctn.html('<span class="sy-wc" data-sit="hidden" data-word=""></span>');
                $this.$wc = $this.$ctn.children('.sy-wc');
                $this.fancyText();
            }

            return $this;            
        },
        fancyText : function() { 
        var $this = this;                    
            var word = $this.cf.words[$this.i];
            var self = this;
            $this.changeWord(word);                
            var timeout = setTimeout(function(){
                $this.$wc .attr('data-sit','hidden');
                $this.i += 1;
                if($this.i < $this.cf.words.length)
                   $this.changeWord(word);
                if($this.i >= $this.cf.words.length){ 
                    clearInterval(timeout);             
                    $this.i = 0;                         
                }
                $this.fancyText();                         
            },$this.cf.holdTime);
        },
        changeWord : function(word){ 
        var $this = this;           
            $this.$wc.attr('data-sit','hidden');
            setTimeout(function() {               
                $this.$wc.css({"color":word.color}).html(word.content).attr({'data-sit':'way','data-word':word.content});               
                setTimeout(function() {               
                    $this.$wc.attr({'data-sit':'shown'});
                 },200);
            },200);
        },
        fancyTextTyping : function(){
            var $this = this;
            var word = $this.cf.words[$this.i];
            var self = this;
            var chars = word.content.split(""); 
            $this.$ctn.css({'color':word.color});
            if(!$this.reverse){
                var timeout = setTimeout(function(){
                    if($this.c < chars.length){
                        $this.$ctn.append('<span class="sy-c" data-at="false">'+chars[$this.c]+'</span>');
                        setTimeout(function(){
                            $this.$ctn.children('.sy-c').attr({'data-at':'true'});
                        },50);
                        $this.fancyTextTyping();
                        $this.c += 1;
                    }                               
                }, $this.cf.typeSpeed);                              
            }
            
            if($this.c + 1 == chars.length){ 
                if($this.i + 1 == $this.cf.words.length)
                    $this.i = 0;
                else
                    $this.i += 1;
                     
                
                clearInterval(timeout);               
                setTimeout(function(){
                    $this.acWord = word.content;    
                    $this.fancyCharReverse(); 
                },$this.cf.holdTime);               
            }
        },
        fancyCharReverse : function(){    
        var $this = this;            
            var timeout = setTimeout(function(){
                if($this.acWord.length != 0){
                    $this.acWord = $this.acWord.slice(0, -1);
                    $this.$ctn.html($this.acWord); 
                    $this.fancyCharReverse();                   
                }else{
                    clearInterval(timeout);
                    $this.c = 0;
                    $this.fancyTextTyping();
                }
            }, 80);
        }
    };

    sayenft.defaults = sayenft.prototype.defaults;
    $.fn.sayenft = function(options) {
        return this.each(function() {
            new sayenft(this, options).init();
        });
    };

    window.sayenft = sayenft;
})(window, jQuery);
