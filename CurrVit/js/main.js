$(function(){

  var CurrVit = Backbone.View.extend({
    el : window,
    
    events : {
      'scroll' : 'titleFix',
      'click div.cv-job a' : 'showJob'
    },
    
    headerEl : null,
    
    headerFixPoint : null,
    
    
    initialize: function(){
      //get the header offset
      var paddingVal = 30;
      this.headerEl = $('div.cv-header');
      this.headerFixPoint = this.headerEl.offset().top;
    },
  
    titleFix: function(e){
      var scrollPos = this.el.pageYOffset;
  
      
      if( scrollPos > this.headerFixPoint){
        $("div.cv-wrapper").css('paddingTop', this.headerEl.height() + 'px');
        this.headerEl.css({
        'position':'fixed',
        'top': '0',
        });
        
      }else{
        $("div.cv-wrapper").css('paddingTop', '0');
        this.headerEl.css({
          'position': 'relative'
        })
      }
    },
    
    showJob : function(e){
      e.preventDefault();
    }
  });
  
  window.CurrVit = new CurrVit();
});
