(function($){

$(document).ready(function() {
  
  $.ajax({
    
    
    url: "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=9470b16874d875b9b759725139ffc448&gallery_id=72157666222357401&per_page=10&format=json&nojsoncallback=1",
    type: "GET",
    success: function(data) {
      console.log("api successfully called")

      let path = data.photos.photo
      //for each photo, I save the different individual ids into variables so that they can be easily plugged into a URL
      for (let i = 0; i < path.length; i++) {
        let obj = path[i];
        let farm_id = data.photos.photo[i].farm
        let server_id = data.photos.photo[i].server
        let photo_id = data.photos.photo[i].id
        let secret = data.photos.photo[i].secret

      //the static address to photos on Flickr is accessed through this address: https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
      //this variable is the direct link to access photos on Flickr, minus the ".jpg" designation that will be added, according to whether we are trying to access the medium picture or the large picture
        let pic_url = "https://farm" + farm_id + ".staticflickr.com/" + server_id + "/" + photo_id + "_" + secret;

        //this is the variable that stores the medium jpeg URL
        let pic_url_m = pic_url + "_m.jpg";

        //this stores an image tag which will be populated with a medium jpeg URL
        let pic_img = ('<img src=\'' + pic_url_m + '\' alt = \"pic\" />');
      
        //this appends the var pic_img to the photo_list div as the function loops through

        //$('.body').append('#frame');
        $('#photo-list').append(pic_img);

        //this appends the class "paginate" to each img tag that is formed, ensuring that the the divs get passed to a later function called customPaginate
      //  $('img').addClass("paginate")
        $('#photo-list img').addClass("paginate");
        
      }

      //this passes all divs with the class "pagination" to the function customPaginate
      $('.pagination').customPaginate({
            itemsToPaginate: ".paginate"
        });

      //when img tags with the class paginate are clicked, the following function is called
      $('.paginate').click(function() {

        //this variable saves the "src" or URL of (this) which is any element with the class "paginate"
        let src = $(this).attr('src');

        //this variable takes the "src" variable, slices the last six characters, and replaces it with "_c.jpg", a large version of the image URL
        let src_l = src.slice(0, -6) + "_c.jpg";

        //ideally, I would also write functions that retrieve the actual height and width of the larger version of the image, and temporarily assign them to the #frame img tag so the user can see the true height and width of the images
        //the below commented code is my attempt to grab this information, but I was not able to get it work successfully
  //   $('#frame img').on('load', function(e) {
  //   e.('#frame img').style.width = e.('#frame img').naturalWidth + 'px';
  //   e.('#frame img').style.height = e.('#frame img').naturalHeight + 'px';
  //   $(this).fadeIn();
  //   $('#overlay').fadeIn();
  // })

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
      let paginationContainer = this;
           
      let defaults = {
        //sets how many items to a page
          itemsPerPage : 10
           };
        
      let settings = {};
      
      //merges defaults and options into one one variable, settings 
      $.extend(settings, defaults, options);
      
      //sets how many items will be on each page     
      let itemsPerPage = settings.itemsPerPage;
       
      //sets which items are going to be 
      let itemsToPaginate = $(settings.itemsToPaginate);

      //determines how many pages to generate based on the amount of items 
      let numberOfItems = Math.ceil((itemsToPaginate.length / itemsPerPage));
          
      //this ul will contain the page numbers
      $("<ul></ul>").prependTo(paginationContainer);
           
      //loops through the ul tag the same number of times as there are pages. in this case, the loop will run 4 times
      for(let index = 0; index < numberOfItems; index++)
      {
        paginationContainer.find('ul').append('<li>'+ (index+1) + '</li>');
      }

      //ensures that the current page only displays the items that should be on the specific page, and hides the others
      itemsToPaginate.filter(":gt(" + (itemsPerPage - 1)  + ")").hide();
           
      //locates the first li element, adds activeClass element to it
      paginationContainer.find("ul li").first().addClass(settings.activeClass).end().on('click', function(){
         
      let $this = $(this);
             
      //gives current page the activeClass setting
      $this.addClass(settings.activeClass);
         
      //takes activeClass setting away from non-current pages
      $this.siblings().removeClass(settings.activeClass);
           
      let pageNumber = $this.text();
              
      //this variable designates that items located on the previous page times the number of items per page should be hidden
      let itemsToHide = itemsToPaginate.filter(":lt(" + ((pageNumber-1) * itemsPerPage)  + ")");

      //this function merges itemsToHide and itemsToPaginate that are greater than the product of the pageNumber and the itemsPerPage minus 1, ensuring that these items are hidden from view
      $.merge(itemsToHide, itemsToPaginate.filter(":gt(" + ((pageNumber * itemsPerPage) - 1)  + ")"));
                
      //designates these items as items that should be shown on the current page
      let itemsToShow = itemsToPaginate.not(itemsToHide);

      //hides items from other pages and shows items from current page
      $("html,body").animate({scrollTop:"0px"}, function(){
          itemsToHide.hide();
          itemsToShow.show();
        });
    });
  }

}(jQuery));