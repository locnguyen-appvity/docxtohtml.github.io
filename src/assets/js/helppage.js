var indexNavItem = null;

function nodeActiveNav() {
    var currentURL = $(location).attr("href");
    var pathname = window.location.pathname;
    var pageName = pathname.substring(pathname.lastIndexOf("/") + 1).toLowerCase();
    var hashTagValue = window.location.hash.substr(1);
    if (hashTagValue) {
        hashTagValue = hashTagValue.toLowerCase();
    }
    // active when access website
    // left menu
    $("#sidenav a[href='" + pageName + "']").each(function() {
        $(this).addClass("menu-item-active");
    });
    $("#sidenav a.menu-item-active").each(function() {
        $(this).parents(".collapsible-body").css("display", "block");
        $(this).parents(".parent-collapsible-header").addClass("active");
    });
    $(".parent-collapsible-header.active > .collapsible-header").each(function() {
        $(this).addClass("active");
    });
    // right menu
    var strURL = currentURL.indexOf("#");
    if (strURL == -1) {
        $("#BlogToc li:first-child").each(function() {
            $(this).addClass("menu-item-active");
        });
    }
	else {
        $("#BlogToc a[href='#" + hashTagValue + "']").each(function() {
            $(this).parent().addClass("menu-item-active");
        });
    }
}

function buttonPreviousNext() {
    $('a.menu-item-active').each(function() {
        var currID = $(this).attr('id');
        if (currID != undefined) {
            indexNavItem = $(".app-menu-item").index($("#" + currID + ""));
        }
        if (indexNavItem === 0) {
            $("#btnPrevious").attr("disabled", true);
        }
		else if (indexNavItem === ($(".app-menu-item").length - 1)) {
            $("#btnNext").attr("disabled", true);
        }
    });
    $("#btnPrevious").each(function() {
        $(this).click(function() {
            var preIndex = indexNavItem - 1;
            var prePage = "#app-menu-item-" + preIndex;
            var url = $(prePage).attr("href");
            window.location = url;
        });
    });
    $("#btnNext").each(function() {
        $(this).click(function() {
            var nextIndex = indexNavItem + 1;
            var nextPage = "#app-menu-item-" + nextIndex;
            var url = $(nextPage).attr("href");
            window.location = url;
        });
    });
}

function saveFeedback() {
    $("#btnYes").each(function() {
        $(this).click(function() {
            $(".app-feedback-wrap").css("visibility", "hidden");
            $(".app-feedback-text").css("visibility", "visible");
            document.cookie = 'Was Infor Helpful = Yes';
        });
    });

    $("#btnNo").each(function() {
        $(this).click(function() {
            $(".app-feedback-wrap").css("visibility", "hidden");
            $(".app-feedback-text").css("visibility", "visible");
            document.cookie = 'Was Infor Helpful = No';
        });
    });
    // $("#btnGet").each(function () {
    //   $(this).click(function () {
    //     const cookieValue = document.cookie
    //     .split('; ')
    //     .find(row => row.startsWith('displayName'))
    //     .split('=')[1];
    //     console.log(cookieValue);
    //   });
    // });
}

function moveTop() {
    var moveTop = $('#btnMoveTop');

    $(window).each(function() {
        if ($(this).scrollTop() > 300) {
            moveTop.addClass('app-movetop-show');
        }
    })

    $(window).each(function() {
        $(this).scroll(function() {
            if ($(this).scrollTop() > 300) {
                moveTop.addClass('app-movetop-show');
                moveTopShowHide();
            } else {
                moveTop.removeClass('app-movetop-show');
            }
        });
    })

    moveTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 2000);
    });
}

function moveTopShowHide() {
    $(window).each(function() {
        $(this).scroll(function() {
            $('.app-movetop-show').show();
            clearTimeout($.data(this, "scrollCheck"));
            $.data(this, "scrollCheck", setTimeout(function() {
                $('.app-movetop-show').hide();
            }, 1300));
        });
    })
}

function clickActiveNav() {
    // active onclick right menu
    $("#BlogToc li").each(function() {
        $(this).click(function() {
            $("#BlogToc li").removeClass("menu-item-active");
            $(this).addClass("menu-item-active");
        });
    });
}

function scrollActiveNav() {
    $(window)
        .scroll(function() {
            var scrollHeight = $(document).height();
            var scrollPosition = $(window).height() + $(window).scrollTop();
            var scrollDistance = $(window).scrollTop() + 1;
            // Assign active class to nav links while scolling
            $(".appRightContent .page-section h4").each(function(i) {
                if ((scrollHeight - scrollPosition) / scrollHeight !== 0) {
                    // if scroll in last page no effect
                    if ($(this).position().top <= scrollDistance) {
                        $("#BlogToc li.menu-item-active").removeClass("menu-item-active");
                        $("#BlogToc li").eq(i).addClass("menu-item-active");
                    }
                }
            });
            var scrollTop = $(this).scrollTop();
            if (scrollTop > 56) {
                $(".app-side-nav-blog-category").each(function() {
                    $(this).css("top", 0);
                });
                $(".app-side-nav-blog-search").each(function() {
                    $(this).css("top", 0);
                });
            }
			else {
                $(".app-side-nav-blog-category").each(function() {
                    $(this).css("top", 56 - scrollTop);
                });
                $(".app-side-nav-blog-search").each(function() {
                    $(this).css("top", 56 - scrollTop);
                });
            }
        })
        .scroll();
}

function displayTocTitle() {
    if ($("#BlogToc li").length == 0) {
        $(".toc-title").css("display", "none");
    }
}

function filterTool() {
    $("#autocomplete-input").bind("input", function() {
        var searchInputVal = $(this).val().toLowerCase(); // get the current value of the input field.

        var isBlankValue = true;
        $(".collapsible").each(function() {
            var parentItem = $(this).find(".collapsible-header a");
            var childItem = $(this).find(".collapsible-body a");
            var titleLeftNav = parentItem.text().toLowerCase().trim();
            var isChildShow = false;

            if (searchInputVal == "" &&
                $(this).find(".menu-item-active").length == 0) {
                $(this).show();
                $(this).children().removeClass("active");
                $(this).find(".collapsible-body").css("display", "none");
                childItem.each(function() {
                    $(this).parent("li").show();
                });
            }
			else {
                childItem.each(function() {
                    var titleChildLeftNav = $(this).text().toLowerCase().trim();
                    if (titleChildLeftNav.indexOf(searchInputVal) == -1) {
                        $(this).parent("li").hide();
                    } else {
                        $(this).parent("li").show();
                        isChildShow = true;
                        isBlankValue = false;
                    }
                });
                if (isChildShow == false) {
                    if (titleLeftNav.indexOf(searchInputVal) == -1) {
                        $(this).hide();
                    }
					else {
                        $(this).show();
                        $(this).children().removeClass("active");
                        $(this).find(".collapsible-body").css("display", "none");
                        childItem.each(function() {
                            $(this).parent("li").show();
                        });
                        isBlankValue = false;
                    }
                }
				else {
                    $(this).show();
                    $(this).children().addClass("active");
                    $(this).collapsible({ accordion: false });
                }
            }
        });
        if (isBlankValue) {
            $(".app-blank-result").show();
        }
		else {
            $(".app-blank-result").hide();
        }
    });
}
$(document).ready(function() {
    /*$("div[w3-include-html]").each(function () {
      var elment = $(this);
      var fileName = $(this).attr("w3-include-html");
      $.ajax({
        async: false,
        url: fileName,
        type: "get",
        dataType: "html",
        success: function (data) {
          var _html = jQuery(data);
          $(elment).html(_html);
        },
      });
    });*/
    $("#BlogToc").toc({ content: ".appRightContent", headings: "h4" });
    displayTocTitle();
    $(".blog-category-button-collapse").sideNav({
        menuWidth: 300, // Default is 240
        edge: "left", // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    $(".blog-search-button-collapse").sideNav({
        menuWidth: 300, // Default is 240
        edge: "right", // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    $(".a-topmenu .button-collapse").sideNav();
    $(".a-topuser .button-collapse").sideNav({ edge: "right" });
    $(".dropdown-button").dropdown();
    $(".collapsible").collapsible({ accordion: false });
    nodeActiveNav();
    scrollActiveNav();
    clickActiveNav();
    filterTool();
    moveTop();
    buttonPreviousNext();
    saveFeedback();
});