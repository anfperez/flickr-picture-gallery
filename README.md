<h1> Flickr Picture Gallery </h1>

<h2> Description </h2> 
<p> This is a simple gallery that utilizes the Flickr API. </p>

<h2> Features </h2>
<ul>
<li> AJAX call to Flickr API pulls down images </li>
<li> the images paginate, with 10 images to a page. If there are less than 10 images left, only the remaining images show up on the last page </li>
<li> when a user clicks on a page number, the next page should load automatically </li>
<li> when a user clicks on an image, an overlay will pop up. A white frame with a larger .jpg version of the image will also pop up in the center of the page </li>
<li> while the frame and overlay are up, if a user clicks on the overlay, the overlay and frame will hide themselves and the user will return to the main gallery </li>
</ul>

<h2> Issues to debug </h2>
<ul>
<li> When a user clicks on an image, they are shown a larger version of that image. The larger versions look fine when the image is horizontally-oriented, but vertically-oriented images are slightly distorted. I suspect that by changing the height and width attribute of the clicked-on image will fix this distortion </li>
</ul>

<h2> Writing Process </h2>
<p> The least difficult part for me was calling down the API from Flickr. After signing up for an API key, I was able to obtain an API key that did not expire. Saving the image URLs in variables and appending them to a div was also not difficult for me.<p>
<p> Pagination was a topic that I did some research on before deciding to write my own code for it. I experimented with different jQuery plugins such as easyPaginate.js and simplePagination.js, but I ultimately decided that I would rather write code that I understood myself before using a plugin.</p>
<p> Implementing the overlay and the frame was not too difficult. Thankfully Flickr had different sized versions of the image to choose from. </p>
<p> One minor bug I had was that, at first, the "paginate" class was being added to every img tag on the page, including the blank img tag inside the div with the class "frame". This was causing issues with pagination, since my function "customPaginate" was including that blank img tag as part of the images to be paginated. It took me some to figure out that all I had to do was specify which images to paginate ("#frame img") and the pages loaded correctly.</p>

<h2> Improvements </h2>
<ul>
<li> give users the option to select which size of images they want to see </li>
<li> allow users to search for key terms, return the images relevant to their search items</li>
</ul>
