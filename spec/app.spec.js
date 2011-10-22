describe("app", function(){
  var myApp;
  beforeEach(function(){
    myApp = app();
  });
  afterEach(function(){
    myApp.destroy();
  });
  
  it("should be an app", function(){
    expect(app).toBeDefined();    
    expect(typeof app).toBe('function');
  });
  
  it('should construct itself', function(){
    expect($('div.app').length).toBeGreaterThan(0);    
  });


  describe('image list', function(){
        
    it('should contain list', function(){
      expect(myApp).toBeDefined();
      expect(myApp.imageList).toBeDefined();
      expect(myApp.imageList.length).toBeGreaterThan(2);
    });

    for(var i in myApp.imageList){      
      describe('image item '+ i, function(){
        var image = myApp.imageList[i];
        it('should contain name and url properties', function(){
          expect(image.url).toBeDefined();
          expect(image.name).toBeDefined();
        });
      });
    }    
  });

  
  describe('initial page', function(){
    beforeEach(function(){
      myApp = app();
    });

    it("should show a list with three images", function(){
      var con = $('div.app');
      expect(con.find('li').length).toBe(3);
    });
    it("should show a word", function(){
      var con = $('div.app');
      expect(con.find('div.word').text().length).toBeGreaterThan(0);
    });
    
    it("should show three different images", function(){
      var con = $('div.app');
      var uniqueImages = [];
      var images = con.find('img').each(function(){
        var src = $(this).attr('rel');
        if($.inArray(src, uniqueImages) === -1){
          uniqueImages.push(src);
        }
      });
      expect(images.length).toBe(3);
      expect(uniqueImages.length).toBe(3);
    });
    
    
    it('should show a message when I click the right word', function(){
      var con = $('div.app');
      var word = $('div.word').text();            
      var image = $('img[rel="'+word+'"]').trigger('click');
      expect($('div.message').length).toBe(1);
      expect($('div.message').text()).toBe('Det var riktig');            
    });

    it('should show a message when I click the right word', function(){
      var con = $('div.app');
      var word = $('div.word').text();            
      var image = $('img:not([rel="'+word+'"])').trigger('click');
      expect($('div.error').length).toBe(2);
      expect($('div.error:first').text()).toBe('Det var feil');            
    });
    
    
  });
  
});