function eventSlickSlide() {
    $(".responsive").slick({
        dots: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1367,
                settings: {
                    dots: true,
                    speed: 300,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                    focusOnSelect: true,
                }
            }
        ]
    });
}
function eventClickItemSlide() {
    $('.a-tabnav li.nav-item a').each(function(){
        $(this).on('click', function () {
            setTimeout(
                function () {
                    $('li.nav-item a.active').each(function(){
                        $(this).removeClass('active');
                    });                
                    $('.slick-slide.slick-current.slick-active li.nav-item a').each(function(){
                        $(this).addClass('active');
                    });                
                    var menuID = "";
                    $('.a-tabnav li.nav-item a.active').each(function(){
                        menuID = $(this).attr('href');
                    })
                    if ($('.slick-slide').length >= 4) {
                        if (menuID != null && menuID != undefined && menuID != "") {
                            $('#app-collapse-on-phone .tab-pane').each(function(){
                                $(this).removeClass('active');
                            });                    
                            $('' + menuID + '').each(function(){
                                $(this).addClass('active');
                            });                    
                        }
                        eventClickDot();
                    }                
                    
                }, 300);
        });
    });    
}
function eventClickDot() {
    $('.slick-dots li button').each(function(){
        $(this).on('click', function () {
            setTimeout(
                function () {                
                    $('li.nav-item a.active').each(function(){
                        $(this).removeClass('active');
                    });                
                    $('.slick-slide.slick-current.slick-active li.nav-item a').each(function(){
                        $(this).addClass('active');
                    });                
                    var menuID = "";
                    $('.a-tabnav li.nav-item a.active').each(function(){
                        $(this).attr('href');
                    });                
                    if (menuID != null && menuID != undefined && menuID != "") {
                        $('#app-collapse-on-phone .tab-pane').each(function(){
                            $(this).removeClass('active');
                        });                    
                        $('' + menuID + '').each(function(){
                            $(this).addClass('active');
                        });                    
                    }
                }, 300);
        });
    });    
}

$(document).ready(function () {
    eventSlickSlide();
    eventClickItemSlide();
});

function sendEmail() {
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var description = document.getElementById("description").value;

    var data = {
        "EmailAddress": email,
        "Subject": subject,
        "Body": description
    };

    $('#sendmailSubmit').attr('disabled', true);
    $.ajax({
        url: "/appvitycore/api/SendEmail",
        type: 'POST',
        dataType: 'json',
        data: data,

        success: function (result) {
            $(".sendmail-success").click();
            $('.cleartext').val('');
            $('#sendmailSubmit').attr('disabled', true);
        },
        error: function (request, status, errorThrown) {
            $(".sendmail-failure").click();
        }
    });
}
function displayButtonSend() {
    $('#sendmailSubmit').attr('disabled', true);
    $(".cleartext").keyup(function () {
        if ($('#email').val().length > 0 && $('#subject').val().length > 0 && $('#description').val().length > 0) {
            $('#sendmailSubmit').attr('disabled', false);
        }
        else if ($('#email').val().length == 0 || $('#subject').val().length == 0 || $('#description').val().length == 0) {
            $('#sendmailSubmit').attr('disabled', true);
        }
    });
}
$(document).ready(function () {
    displayButtonSend();
});