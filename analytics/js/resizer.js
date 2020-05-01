    $(document).ready(function() {
        $(window).resize(function() {
            viewportwidth = getViewPort()[0]
            viewportheight = getViewPort()[1]
            // viewportheight = viewportwidth * (15/24)
            $(".iframe-container").css({
                "width": viewportwidth + 'px',
                "height": viewportheight + 'px'
            })
            $(".tableauPlaceholder").css({
                "width": viewportwidth + 'px',
                "height": viewportheight + 'px'
            })
            $(".tableauViz").css({
                "width": viewportwidth + 'px',
                "height": viewportheight + 'px'
            })
            console.log("aaasd")
        });
    });
    function getViewPort(){
        var viewportwidth;
        var viewportheight;
        // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
        if (typeof window.innerWidth != 'undefined') {
            viewportwidth = window.innerWidth,
                viewportheight = window.innerHeight
        }
        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        else if (typeof document.documentElement != 'undefined' &&
            typeof document.documentElement.clientWidth !=
            'undefined' && document.documentElement.clientWidth != 0) {
            viewportwidth = document.documentElement.clientWidth,
                viewportheight = document.documentElement.clientHeight
        }
        // older versions of IE
        else {
            viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
                viewportheight = document.getElementsByTagName('body')[0].clientHeight
        }
        viewportwidth = viewportwidth - 30
        viewportheight = viewportheight - 40
        return Array(viewportwidth, viewportheight)
    }