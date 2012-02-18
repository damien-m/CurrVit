$(function(){

  var CurrVit = Backbone.View.extend({
    el : window,
    
    events : {
      'scroll' : 'titleFix',
      'click a.more-info' : 'showJob',
      'click #backdrop' : 'toggleOverlay'
    },
    
    headerEl : null,
    
    headerFixPoint : null,
    
    wrapperPos: null,
    
    initialize: function(){
      //get the header offset
      var paddingVal = 30;
      this.headerEl = $('div.cv-header');
      this.headerFixPoint = this.headerEl.offset().top,
      this.wrapperPos = $(".cv-wrapper").position().left;
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
      var job = $(e.target).parents('.cv-job').clone(),
          card = $("#card");
      card.html(job);
      card.css({
        'left': this.wrapperPos + 40
      });
      
      
      this.toggleOverlay();
    },
    
    toggleOverlay: function(){
      var bD = $('#backdrop'),
          card = $("#card");
      
      if( bD.css('display') === 'block' ) {
        card.slideUp(500, function(){
          bD.fadeOut(500);
        });
      }else{
        bD.fadeIn(200, function() {
          card.slideDown(500);
        });
      }
    }
  });
  
  window.CurrVit = new CurrVit();
});
