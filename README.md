# Flickr Picture Gallery

## Description

This is a simple gallery that utilizes the Flickr API.

## Technologies

*   HTML
*   CSS
*   JavaScript/jQuery 3-1.1
*   Flickr API

## Features

*   AJAX call to Flickr API pulls down images
*   the images paginate, with 10 images to a page. If there are less than 10 images left, only the remaining images show up on the last page
*   when a user clicks on a page number, the next page should load automatically
*   when a user clicks on an image, an overlay will pop up. A white frame with a larger .jpg version of the image will also pop up in the center of the page
*   while the frame and overlay are up, if a user clicks on the overlay, the overlay and frame will hide themselves and the user will return to the main gallery

## Issues to debug

*   When a user clicks on an image, they are shown a larger version of that image. The larger versions look fine when the image is horizontally-oriented, but vertically-oriented images are slightly distorted. I suspect that I can solve this problem by changing the height and width attribute of the '#frame img' tag to pull the css attributes of the actual image URL I am calling from. In the meantime, I discovered a slight fix by giving the '#frame img' tag a new CSS attribute: height: auto. This partially solves the problem, but the bottoms of some pictures are still slightly cut off.

## Writing Process

The least difficult part for me was calling down the API from Flickr. After signing up for an API key, I was able to obtain an API key that did not expire. Saving the image URLs and data in variables and appending new img tags to a div was fairly easy.

Pagination was a topic that I did some research on before deciding to write my own code for it. I experimented with different jQuery plugins such as easyPaginate.js and simplePagination.js, but I ultimately decided that I would rather write code that I understood myself before using a plugin.

Implementing the overlay and the frame was not too difficult. Thankfully Flickr had different sized versions of the image to choose from, so that when a user clicks on an image, they are presented with a larger version of that image.

One minor bug I had was that, at first, the "paginate" class was being added to every img tag on the page, including the blank img tag inside the div with the class "frame". This was causing issues with pagination, since my function "customPaginate" was including that blank img tag as part of the images to be paginated. It took me some to figure out that all I had to do was specify which images to paginate ("#frame img") and the pages loaded correctly.

## Future Improvements

*   give users the option to select which size of images they want to see
*   allow users to search for key terms, return the images relevant to their search items
*   implementation of CSS framework to help with styling
