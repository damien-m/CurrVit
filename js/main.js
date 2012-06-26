$(function(){
  Portfolio = Backbone.Model.extend({
    url: 'portfolio.php?company=',
    urlRoot: '/CurrVit/Currvit/portfolio.php?company=',
    
    defaults : {
      "img" : {}
    },
    
    initialize: function(options){
      this.url = this.url + options.id;
    }
  });
  
  Carousel = Backbone.View.extend({
    className: '.cv-job-carousel',
    
    tagName: 'div',
    
    model: null,
    
    events: {
      'click div.carousel-left' : 'moveItem',
      'click div.carousel-right' : 'moveItem'
    },  
    
    carouselTemplate: 	'<div class="carousel-main"><div class="carousel-left">&lt;</div><div class="carousel-holder"><% _.each(images, function( image ) { %><div class="carousel-item"> <img src="<%= image.href %>" /><div class="carousel-info"><h3><%= image.title %></h3><a href="<%= image.link %>"><%= image.link %></a><p><%= image.description%></p></div></div><% }); %></div><div class="carousel-right">&gt;</div></div>',
    
    render : function(){
      var imgs = this.model.get('img');
      var carouselTemplate = _.template(this.carouselTemplate,{images: imgs, total : imgs.length } );
      $(this.el).append(carouselTemplate); //carouselTemplate({images: this.model.attributes.images }) );
    },
    
    initialize: function( options ) {
      var self = this;
      this.model = new Portfolio( options);
      
      this.model.fetch({
        id: this.id,
        success: function( model, response ) {
          self.render( model );
        }
      });
    },
    
    moveItem: function( e ) {
      var direction = e.target.tagName === 'DIV' ? e.target.className.replace(/carousel\-(left|right)/,"$1") : '',
          $carousel = $(this.el).find('div.carousel-holder'),
          margLeft = parseInt( $carousel.css('margin-left'),10),
          imgLen = this.model.get('img').length,
          nextEnd = (imgLen -1)  * 870;
      if( direction === 'left' ){
        if( margLeft !== 0 ){
          this.moveCarousel( '+=' );
        }
      }else {
        if(Math.abs(margLeft) !== nextEnd ){
          this.moveCarousel( '-=' );
        }
      }
    },
    
    moveCarousel: function( dir ){
      $(this.el).find('div.carousel-holder').animate({
        marginLeft: (dir + '870px')
      }, 500);
    }
    
  });
  
  
  var CurrVit = Backbone.View.extend({
    el : window,
    
    events : {
      'scroll' : 'titleFix',
      'click a.more-info' : 'showJob',
      'click #backdrop' : 'toggleOverlay',
      'click .cv-carousel-show': 'toggleCarousel'
    },
    
    headerEl : null,
    
    headerFixPoint : null,
    
    wrapperPos: null,
    
    selectedCompany : null,
    
    carouselEl : null,
    
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
      this.selectedCompany = job.data('company');
      
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
    },
    
    toggleCarousel : function(e){
      var $label = $(e.target),
          carouselDiv = $label.parent('div'),
          cardDivHeight = $label.parents('#card').outerHeight();
          
      if( $label.text() === "View Work" ) {
        carouselDiv.css('position', 'absolute').animate({
          top: '95px',
          bottom: '-5px'
        }, 500);
      
        $label.text('Hide Work');
        
        //get the carousel JSON
        this.carouselEl = new Carousel({id: this.selectedCompany, el: carouselDiv}); 
        
        
      }else {
        
        carouselDiv.animate({
          top: (cardDivHeight - 20) + 'px'
        }, 500);
      
        $label.text('View Work');
        //this.carouselEl.remove();
      }
      
      
    }
  });
  
  window.CurrVit = new CurrVit();
});