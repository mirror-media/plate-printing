var progressBar, max, value, width;
$(document)
  .ready(function() {

    // var getMax = function() {
    //   return $(document).height() - $(window).height();
    // }

    // var getValue = function() {
    //   return $(window).scrollTop();
    // }

    // progressBar = $('.progress'),
    //   max = getMax(),
    //   value, width;

    // var getWidth = function() {
    //   // Calculate width in percentage
    //   value = getValue();
    //   width = (value / max) * 100;
    //   width = width;
    //   return width;
    // }

    // var setWidth = function() {
    //   console.log(width);
    //   progressBar.progress({
    //     percent: getWidth()
    //   });
    // }

    // $(document).on('scroll', setWidth);
    // $(window).on('resize', function() {
    //   // Need to reset the Max attr
    //   max = getMax();
    //   setWidth();
    // });

    // Reading Progress Indicator
    var updateProgress = function () {
      // calculate values
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var percent = Math.round(scroll * 100 / height);

      // update progress count
      $('.progress').progress({
        percent: percent
      });
    }
    updateProgress();

    // toggle logo when scroll
    if($(document).scrollTop() > 140){
      $('.logo.centered').css('display','none');
      $('.logo.item').css('display','flex');
      $('.sharing.item').css('display','flex');
    }else{
      $('.logo.centered').css('display','block');
      $('.logo.item').css('display','none');
      $('.sharing.item').css('display','none');
    }

    $(window).scroll(function(){
      updateProgress();

      // toggle logo when scroll
      if($(document).scrollTop() > 140){
        $('.logo.centered').css('display','none');
        $('.logo.item').css('display','flex');
        $('.sharing.item').css('display','flex');
      }else{
        $('.logo.centered').css('display','block');
        $('.logo.item').css('display','none');
        $('.sharing.item').css('display','none');
      }
    });

    // fix main menu to page on passing
    $('.main.menu').visibility({
      type: 'fixed',
      silent: true
    });
    $('.overlay').visibility({
      type: 'fixed',

      silent: true
    });

    // lazy load images
    $('.image').visibility({
      type: 'image',
      transition: 'vertical flip in',
      duration: 500
    });

    // bind menu button
    $('.openSidebar').click(function() {
      var direction = $(this).data('direction');
      $('.ui.'+direction+'.sidebar')
        .sidebar({
          dimPage: false,
          exclusive: true,
          scrollLock: true,
          transition: 'overlay',
          mobileTransition: 'overlay',
          onVisible: function() {
            $('.ui.'+direction+'.sidebar').scrollLock();
          },
          onHidden: function() {
            $('.ui.'+direction+'.sidebar').scrollLock();
          }
        })
        .sidebar('toggle')
      ;

    });
    $('.closeSidebar').click(function() {
      $(this).parent('.ui.sidebar')
        .sidebar('toggle')
      ;
    });

    // Header Menu 

    var current = null;

    /* Search */
    $('.openSearchbar').click(function() {
      if(current !== null) {
        current[0].css('display','none');
        current[1].css('display','flex');
        current[2].css('display','none');
      }
      $('.second-menu').css('display','block');
      $('.second-menu .searchbar').css('display','block');
      current = [$('.second-menu .searchbar'), $('.openSearchbar'), $('.closeSearchbar')];
      $('.openSearchbar').css('display','none');
      $('.closeSearchbar').css('display','flex');
    });
    $('.closeSearchbar').click(function() {
      $('.second-menu').css('display','none');
      $('.second-menu .searchbar').css('display','none');
      current = null;
      $('.openSearchbar').css('display','flex');
      $('.closeSearchbar').css('display','none');
    });

    /* Font Size */
    $('.openFontsize').click(function() {
      $('.openFontsize').css('display','none');
      $('.closeFontsize').css('display','flex');
      $('.chooseFontsize').css('display','flex');
    });
    $('.closeFontsize').click(function() {
      $('.openFontsize').css('display','flex');
      $('.closeFontsize').css('display','none');
      $('.chooseFontsize').css('display','none');
    });

    /* Font Size Mobile*/
    $('.openFontsize-mobile').click(function() {
      if(current !== null) {
        current[0].css('display','none');
        current[1].css('display','flex');
        current[2].css('display','none');
      }
      $('.second-menu').css('display','block');
      $('.second-menu .fontsize').css('display','flex');
      current = [$('.second-menu .fontsize'), $('.openFontsize-mobile'), $('.closeFontsize-mobile')];
      $('.openFontsize-mobile').css('display','none');
      $('.closeFontsize-mobile').css('display','flex');
      
    });
    $('.closeFontsize-mobile').click(function() {
      $('.second-menu').css('display','none');
      $('.second-menu .fontsize').css('display','none');
      current = null;
      $('.openFontsize-mobile').css('display','flex');
      $('.closeFontsize-mobile').css('display','none');
    });

    /* Sharing */
    $('.openSharing').click(function() {
      $('.openSharing').css('display','none');
      $('.closeSharing').css('display','flex');
      $('.chooseSharing').css('display','flex');
    });
    $('.closeSharing').click(function() {
      $('.openSharing').css('display','flex');
      $('.closeSharing').css('display','none');
      $('.chooseSharing').css('display','none');
    });

    /* Sharing Mobile*/
    $('.openSharing-mobile').click(function() {
      if(current !== null) {
        current[0].css('display','none');
        current[1].css('display','flex');
        current[2].css('display','none');
      }
      $('.second-menu').css('display','block');
      $('.second-menu .sharing').css('display','flex');
      current = [$('.second-menu .sharing'), $('.openSharing-mobile'), $('.closeSharing-mobile')];
      $('.openSharing-mobile').css('display','none');
      $('.closeSharing-mobile').css('display','flex');
      
    });
    $('.closeSharing-mobile').click(function() {
      $('.second-menu').css('display','none');
      $('.second-menu .sharing').css('display','none');
      current = null;
      $('.openSharing-mobile').css('display','flex');
      $('.closeSharing-mobile').css('display','none');
    });

    // silent debug messages
    $.site('change setting', 'silent', true);
  });