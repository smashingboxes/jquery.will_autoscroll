// ------------------------------------- //
// jQuery Will_Autoscroll
// ------------------------------------- //
//
// Description: An autoscroll plugin
//              specifically designed for
//              will_paginate
//
// Version: 0.0.1
// Author: Nate Hunzaker
// ------------------------------------- //

;(function ( $, window, document, undefined ) {
    
    var pluginName = 'will_autoscroll',
    defaults = {
        callback    : function() { return false; },
        delay       : 250,
        end_html    : "<div class='will_autoscroll_end'>No more information could be loaded</div>",
        leniency    : 125,
        latency     : 1000,
        pagination  : ".pagination",
        repeat_item : "li"
    };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options);
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {
        
        var fn          = this
        ,   $el         = $(this.element)
        ,   $pagination = $(this.options.pagination).first()
        ,   repeat_item   = fn.options.repeat_item
        ,   leniency    = this.options.leniency
        ,   callback    = this.options.callback
        ;
        
        // Prevent autoscroll on pages without a pagination element
        if ($pagination.length === 0) { return false; }
        
        // Hide the pagination menu
        $pagination.fadeOut();

        // Add the will_autoscroll class for style references
        $el.addClass("will_autoscroll");
        
        // Setup event listeners
        $(window).one("scroll", function autoscroll() {

            var scroll     = $(window).scrollTop()
            ,   height     = $(document).height()
            ,   $next      = $pagination.find(".current").next("a")
            ;
            
            // Basic flow control, basically we don't want the
            // autoscroll even to fire too quickly
            function ret(delay) {
                setTimeout(function() { $(window).one("scroll", autoscroll); }, delay || fn.options.latency);
            }
            
            if ( height - scroll < leniency ) { return ret(); }

            // Have we hit the end of the line?
            if ( $next.length === 0 ) {
                // yes : append an element to declare the pagination
                // has finished
                return $el.after(fn.options.end_html);
            }

            $pagination.find(".current").removeClass("current");
            $next.addClass("current");

            return $.ajax({

                url        : $next.attr("href"),
                
                beforeSend : function() {
                    $el.after("<div class='will_autoscroll_loader'></div>");
                },
                
                success: function(data) {

                    var $items = $(data).find(".items.group " + repeat_item)
                    ,   delay = ($items.length / 2) * fn.options.delay
                    ,   height = $el.height() + ( Math.round($items.length / 3) * 314)
                    ;
                    
                    $(".will_autoscroll_loader").remove();
                    
                    $el.css({ overflow: "hidden", height: $($el).height() }).animate({ height: height}, delay / 2);

                    $items.each(function(i) {
                        $(this).hide().appendTo($el).delay(i * fn.options.delay).fadeIn();
                    });
                    
                    callback();
                    ret(delay);
                }

            });
        });

    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

})(jQuery, window, document);
