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
    $(window).scroll(updateProgress);

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
    $('article img').visibility({
      type: 'image',
      // transition: 'vertical flip in',
      // duration: 500
      onTopPassed: function(calculations) {
        max = getMax();
        setWidth();
      }
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

    // silent debug messages
    $.site('change setting', 'silent', true);
  });