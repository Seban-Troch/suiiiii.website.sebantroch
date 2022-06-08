$(document).ready(function() {


    $(window).on('load', function() {
        $('.preloader').addClass('complete')
    });

    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        console.log(scroll);
        if (scroll >= 50) {
            $(".sticky").addClass("stickyadd");
        } else {
            $(".sticky").removeClass("stickyadd");
        }
    });

    // progress bars

    var waypoint = new Waypoint({
        element: document.getElementById('experience'),
        handler: function() {

            var p = document.querySelectorAll('.progress-bar');
            p[0].setAttribute("style", "width:100%;transition:1s all;");
            p[1].setAttribute("style", "width:95%;transition:1.5s all;");
            p[2].setAttribute("style", "width:85%;transition:1.7s all;");
            p[3].setAttribute("style", "width:99%;transition:2s all;");
            p[4].setAttribute("style", "width:85%;transition:2.3s all;");
            p[5].setAttribute("style", "width:95%;transition:2.5s all;");


        },
        offset: '90%'
    });

    // adding fadeInUp animation to child of div with class .way-col
    var $child = $('.way-fade-up').children();
    $child.each(function() {
        var self = $(this);
        $(this).waypoint(function() {
            self.addClass('animated fadeInUp');
        }, { offset: '90%' });
    });

    var $child = $('.way-fade-left').children();
    $child.each(function() {
        var self = $(this);
        $(this).waypoint(function() {
            self.addClass('animated fadeInLeft');
        }, { offset: '90%' });
    });

    var $child = $('.way-fade-right').children();
    $child.each(function() {
        var self = $(this);
        $(this).waypoint(function() {
            self.addClass('animated fadeInRight');
        }, { offset: '90%' });
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        // margin:10,   // since one item ou can remove it
        nav: false,
        // dots:true,
        autoplay: true,
        autoplayTimeout: 4000,
        items: 1,
        // animateOut : "fadeOut",
        animateIn: "fadeInRight"

    });
    $('a').smoothScroll({

        speed: 2000,
    });

});

! function($) {
    var defaults = {
        sectionContainer: "> section",
        angle: 50,
        opacity: true,
        scale: true,
        outAnimation: true,
        pageContainer: '.page_container',
        pageOpacity: true
    };
    $.fn.tiltedpage_scroll = function(options) {
        var settings = $.extend({}, defaults, options),
            el = $(this);
        el.find(settings.sectionContainer).addClass("tps-section");
        el.find('.tps-section').each(function() {
            var el2 = $(this);
            el2.wrapInner("<div class='tps-wrapper'></div>");
        });

        function isElementInViewport(el3) {
            var docViewTop = $(window).scrollTop(),
                docViewBottom = docViewTop + $(window).height(),
                elemTop = el3.offset().top,
                elemBottom = elemTop + el3.outerHeight(true);
            return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
        }

        function elementVisibilityMayChange(el4) {
            if (isElementInViewport(el4)) {
                el4.addClass("tps-inview")
            } else {
                el4.removeClass("tps-inview")
            }
        }
        $(window).on('DOMContentLoaded load resize scroll', function() {
            el.find(settings.sectionContainer).each(function() {
                elementVisibilityMayChange($(this));
            });
            el.find('.tps-section.tps-inview > .tps-wrapper').each(function(index) {
                var el2 = $(this),
                    elc = el2.find(settings.pageContainer),
                    opacity = 0,
                    opacity2 = 0,
                    st = $(window).scrollTop(),
                    deg = ((el2.parent().offset().top - el2.parent().height()) - st) / $(window).height() * (settings.angle * 3),
                    scale = ((st + $(window).height() - (el2.parent().offset().top - el2.parent().height())) / ($(window).height()));
                if (scale > 1) scale = 1;
                if (deg < 0) deg = 0;
                if (st > el2.parent().offset().top) {
                    if (settings.outAnimation == false) {
                        opacity = 1;
                        opacity2 = 1;
                        if (opacity < 0) {
                            opacity = 0;
                            opacity2 = 0;
                        }
                        if (deg < 0) deg = 0;
                    } else {
                        opacity = ((el2.parent().offset().top + ($(window).height() * 1.2) - st)) / ($(window).height());
                        opacity2 = opacity;
                        opacity = Math.pow(opacity, 25);
                        opacity2 = Math.pow(opacity2, 25);
                        //console.log('- '+opacity2);
                        deg = (el2.parent().offset().top - st) / $(window).height() * (settings.angle * 3);
                        scale = ((st + $(window).height() - el2.parent().offset().top) / ($(window).height()));
                    }
                } else {
                    if (index != 0) {
                        opacity = ((st + $(window).height() - el2.parent().offset().top + (el2.height() / 2)) / $(window).height());
                        opacity2 = opacity / 2;
                        opacity2 = opacity2 < 0.4 ? opacity2 / 2 : opacity2;
                        //console.log(opacity2);
                        if (opacity > 1) {
                            opacity = 1;
                            opacity2 = 1;
                        }
                    } else {
                        opacity = 1;
                        opacity2 = 1;
                        deg = 0;
                        scale = 1;
                    }
                }
                if (settings.scale == false) scale = 1;
                if (settings.angle == false) deg = 0;
                if (settings.opacity == false) {
                    opacity = 1;
                    opacity2 = 1;
                }
                el2.css({
                    'transform': 'rotateX(' + deg + 'deg) scale(' + scale + ', ' + scale + ')',
                    opacity: opacity
                });
                elc.css({ opacity: opacity2 });
            });
        });
    }
}(window.jQuery);

$(document).ready(function() {
    $(".main").tiltedpage_scroll({
        angle: 20
    });
});

async function init() {
    const node = document.querySelector("#type-text")

    await sleep(1000)
    node.innerText = ""
    await node.type('Ik ben ')

    while (true) {
        await node.type('Seban!')
        await sleep(2000)
        await node.delete('Seban!')
        await node.type('student multimedia!')
        await sleep(2000)
        await node.delete('student multimedia')
    }
}


// Source code 🚩

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

class TypeAsync extends HTMLSpanElement {
    get typeInterval() {
        const randomMs = 100 * Math.random()
        return randomMs < 50 ? 10 : randomMs
    }

    async type(text) {
        for (let character of text) {
            this.innerText += character
            await sleep(this.typeInterval)
        }
    }

    async delete(text) {
        for (let character of text) {
            this.innerText = this.innerText.slice(0, this.innerText.length - 1)
            await sleep(this.typeInterval)
        }
    }
}

customElements.define('type-async', TypeAsync, { extends: 'span' })


init()

/*Gallery*/