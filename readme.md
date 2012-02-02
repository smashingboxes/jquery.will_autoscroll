```                                                                                                                                                     
          _  _  _                        _                                   _  _ 
          (_)| || |                      | |                                 | || |
__      __ _ | || |          __ _  _   _ | |_   ___   ___   ___  _ __   ___  | || |
\ \ /\ / /| || || |         / _` || | | || __| / _ \ / __| / __|| '__| / _ \ | || |
 \ V  V / | || || |        | (_| || |_| || |_ | (_) |\__ \| (__ | |   | (_) || || |
  \_/\_/  |_||_||_|         \__,_| \__,_| \__| \___/ |___/ \___||_|    \___/ |_||_|
                    ______                                                         
                   |______|          
```

**jquery.will_autoscroll** is a autoscroll plugin designed specifically for use with the will_paginate ruby gem. 
The plugin was developed for the Tagget project and was designed to allow for easy implementation of autoscroll for
a list of thumbnails.

## Usage:

``` javascript

// Current defaults
$("#container").will_autoscroll({
    delay       : 250,
    pagination  : ".pagination",
    leniency    : 125,
    latency     : 1000,
    list_group  : "ul.will_autoscroll",
    repeat_item : "li",
    end_html    : "<div class='will_autoscroll_end'>No more information could be loaded</div>",
    callback    : function() { return false; }
});
```
---
1. **delay:** `will_autoscroll` fades elements on to the page upon receiving content. This sets the interval at which elements will fade on to the page
2. **pagination:** The pagination container, defaults to `.pagination`
3. **leniency:** The pixel height dictacting the required space from the bottom of the page before autoscroll occurs
4. **latency:** The delay after new content is loaded in which scroll triggers will not occur
5. **repeat_item:** The item in the container list which is being repeated, this is to filter loaded content
6. **end_html:** What is displayed at the bottom of the container after the final page has been loaded
7. **callback:** The function which is fired after each successful pagination load
8. **list_group:** The list which is targeted for autoscroll