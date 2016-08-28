(function($){

$(document).ready(function() {
  
  $.ajax({
    
    
    url: "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=9470b16874d875b9b759725139ffc448&gallery_id=72157666222357401&per_page=10&format=json&nojsoncallback=1",
    type: "GET",
    success: function(data) {
      console.log("api successfully called")

      var path = data.photos.photo
      //for each photo, I save the different individual ids into variables so that they can be easily plugged into a URL
      for (var i = 0; i < path.length; i++) {
        var obj = path[i];
        var farm_id = data.photos.photo[i].farm
        var server_id = data.photos.photo[i].server
        var photo_id = data.photos.photo[i].id
        var secret = data.photos.photo[i].secret

      //the static address to photos on Flickr is accessed through this address: https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
      //this is the direct link to access photos on Flickr, minus the ".jpg" designation that will be added, according to whether we are trying to access the medium picture or the large picture
        var pic_url = "https://farm" + farm_id + ".staticflickr.com/" + server_id + "/" + photo_id + "_" + secret

        //this is the variable that stores the medium jpeg URL
        var pic_url_m = pic_url + "_m.jpg"

        //this stores an image tag which will be populated with a medium jpeg URL
        var pic_img = ('<img src=\'' + pic_url_m + '\' alt = \"pic\" />')
      
        //this appends the var pic_img to the photo_list div as the function loops through

        //$('.body').append('#frame');
        $('#photo-list').append(pic_img)

        //this appends the class "paginate" to each img tag that is formed, ensuring that the the divs get passed to a later function called customPaginate
      //  $('img').addClass("paginate")
        $('#photo-list img').addClass("paginate")
        
      }

      //this passes all divs with the class "pagination" to the function customPaginate
      $('.pagination').customPaginate({
            itemsToPaginate: ".paginate"
        });

      //when img tags with the class paginate are clicked, the following function is called
      $('.paginate').click(function() {

        //this variable saves the attribute of the the attr attribute
        var src = $(this).attr('src')

        //this variable takes the "src" variable, slices the last six characters, and replaces it with "_c.jpg", a large version of the image URL
        var src_l = src.slice(0, -6) + "_c.jpg"

        //gives the "frame img" element a new attribute, which is the large image URL
        $('#frame img').attr('src', src_l);

        //allows the the "frame img" element to fade into the screen
        $('#frame img').fadeIn();

        //allows the "overlay" element to fade onto the screen
        $('#overlay').fadeIn();

        //when the "overlay" element is clicked, both the "overlay" and "frame img" elements 
        $('#overlay').click(function() {
          $(this).fadeOut();
          $('#frame img').fadeOut();

        //removes the "src" attribute from "frame img", allowing it to be populated by other image URLs next time an image is clicked 
          $('#frame img').removeAttr('src');
          });
        });
      }
    });
  });

//this function generates the customPaginate function, which paginates the images 10 to a page
  $.fn.customPaginate = function(options)
    {
      var paginationContainer = this;
      var itemsToPaginate; 
           
      var defaults = {
        //sets how many items to a page
          itemsPerPage : 10
           };
        
      var settings = {};
          
      $.extend(settings, defaults, options);
           
      var itemsPerPage = settings.itemsPerPage;
        
      itemsToPaginate = $(settings.itemsToPaginate);

      //determines how many pages to generate based on the amount of items 
      var numberOfItems = Math.ceil((itemsToPaginate.length / itemsPerPage));
          
      //this ul will contain the page numbers
      $("<ul></ul>").prependTo(paginationContainer);
           
      //loops through the ul tag the same number of times as there are pages. in this case, the loop will run 4 times
      for(var index = 0; index < numberOfItems; index++)
      {
        paginationContainer.find('ul').append('<li>'+ (index+1) + '</li>');
      }

      //ensures that the current page only displays the items that should be on the specific page, and hides the others
      itemsToPaginate.filter(":gt(" + (itemsPerPage - 1)  + ")").hide();
           
      //locates the first li element, adds activeClass element to it
      paginationContainer.find("ul li").first().addClass(settings.activeClass).end().on('click', function(){
         
      var $this = $(this);
             
      //gives current page the activeClass setting
      $this.addClass(settings.activeClass);
         
      //takes activeClass setting away from non-current pages
      $this.siblings().removeClass(settings.activeClass);
           
      var pageNumber = $this.text();
              
      //this variable designates that items located on the previous page times the number of items per page should be hidden
      var itemsToHide = itemsToPaginate.filter(":lt(" + ((pageNumber-1) * itemsPerPage)  + ")");

      //this function merges itemsToHide and itemsToPaginate that are greater than the product of the pageNumber and the itemsPerPage minus 1, ensuring that these items are hidden from view
      $.merge(itemsToHide, itemsToPaginate.filter(":gt(" + ((pageNumber * itemsPerPage) - 1)  + ")"));
                
      //designates these items as items that should be shown on the current page
      var itemsToShow = itemsToPaginate.not(itemsToHide);

      //hides items from other pages and shows items from current page
      $("html,body").animate({scrollTop:"0px"}, function(){
          itemsToHide.hide();
          itemsToShow.show();
        });
    });
  }

}(jQuery));