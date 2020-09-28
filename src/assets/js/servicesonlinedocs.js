$(document).ready(function() {
    if (window.location.hash) {
        var hashTag = window.location.hash;
        var hashTagCardHeader = hashTag + "> .card-header > a[data-toggle='collapse']";
        var tabPaneCardHeader = ".tab-pane > .card-header > a[data-toggle='collapse']";
        if (hashTag.indexOf("#project") > -1) {
            if (hashTag != "#project1") {
                var linkHashTag = ".nav-link[href='" + hashTag + "']";
                $(".tab-pane").each(function() {
                    $(this).removeClass("active show");
                });
                $(".nav-link").each(function() {
                    $(this).removeClass("active show");
                });
                //Remove for mobile
                $(".tab-pane > .collapse").each(function() {
                    $(this).removeClass("show");
                });
                $(tabPaneCardHeader).each(function() {
                    $(this).addClass("collapsed");
                    $(this).attr("aria-expanded", "false");
                });
                //Add
                $(hashTag).each(function() {
                    $(this).addClass("active show");
                });
                $(linkHashTag).each(function() {
                    $(this).addClass("active show");
                });
                //Add for mobile
                $(hashTag + "> .collapse").each(function() {
                    $(this).addClass("show");
                });

                $(hashTagCardHeader).each(function() {
                    $(this).removeClass("collapsed");
                    $(this).attr("aria-expanded", "true");
                });
                window.location.replace = window.location.href.split("#")[0];
            } else {
                window.location.replace = window.location.href.split("#")[0];
            }
        }
    }
});