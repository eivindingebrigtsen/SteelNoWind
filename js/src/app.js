(function(){  
  var app = function(options){
    var imageSource = '<ul>{{#currentList}}<li><img src="{{this.url}}" rel="{{this.name}}"></li>{{/currentList}}</ul><div class="word">{{chosenWord}}</div>';
    var imageTemplate = Handlebars.compile( imageSource );
    
    var rand = function(length){
      return Math.floor(Math.random()*length);
    };
    var appMethods = {
      element: null,
      imageList: [
      { 
        name: 'bongotromme',
        url: 'http://www.djembesecrets.com/images/djemberope1.jpg'
      },{
        name: 'jazzfløyte',
        url: 'http://typesofflutes.com/images/flute_recorder.JPG'        
      },{
        name: 'piano',
        url: 'http://www.steinway.com/img/home-hero-model-d.png'
      },{
        name: 'kazoo',
        url: 'http://www.aues21.dsl.pipex.com/images/metalKazoo.jpg'
      },
      {
        name: 'guitar',
        url: 'http://uncrate.com/p/2009/01/warbeast-wireless-guitar-2.jpg'
      },{
        name: 'horse',
        url: 'http://www.horse-wallpaper.com/backgrounds//bavarian-chesnut-horse.jpg'
      }],
      
      
      addQuiz: function(){
        var app = appMethods;
        var content = app.getQuiz();
        app.element.html( imageTemplate( content ) );      
        app.element.find('img').bind('click', function(){
          var myWord = $(this).attr('rel');
          if(myWord === content.chosenWord){
            $('<div class="message">Det var riktig</div>').appendTo('.app');
          }else{
            $('<div class="error">Det var feil</div>').appendTo('.app');
          }
          setTimeout(app.addQuiz, 1000);
      });

      },
      getQuiz: function(){
        var myQuiz = [],
            selectedItems = [],
            correct = undefined;
            
        for(var i = 0, u = 0; i < 3; u++){          
          var randomItem = rand(this.imageList.length);
          if($.inArray(randomItem, selectedItems) !== -1){
            continue;
          }
          selectedItems.push(randomItem);
          myQuiz.push(this.imageList[randomItem]);  
          if(!correct){
            correct = this.imageList[randomItem].name;
          }
          i++;
        }
        return {
          currentList: _.shuffle(myQuiz),
          chosenWord: correct
        };
      },
      
      destroy: function(){
        this.element.find('img').unbind('click');
        this.element.remove();
      }
      
    };
    
    
    var init = function(){      
      if($('div.app').length == 0){
        appMethods.element = $('<div class="app" />');
        appMethods.element.appendTo('body');
      }else{
        appMethods.element = $('div.app');
      }
        appMethods.addQuiz();
    }();
    return appMethods;
  }    
  window.app = app;  
})();



