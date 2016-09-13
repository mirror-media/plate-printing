var progressBar, max, value, width;
$(document)
  .ready(function() {

    var getMax = function() {
      return $(document).height() - $(window).height();
    }

    var getValue = function() {
      return $(window).scrollTop();
    }

    progressBar = $('.progress'),
      max = getMax(),
      value, width;

    var getWidth = function() {
      // Calculate width in percentage
      value = getValue();
      width = (value / max) * 100;
      width = width;
      return width;
    }

    var setWidth = function() {
      console.log(width);
      progressBar.progress({
        percent: getWidth()
      });
    }

    $(document).on('scroll', setWidth);
    $(window).on('resize', function() {
      // Need to reset the Max attr
      max = getMax();
      setWidth();
    });

    // fix main menu to page on passing
    $('.main.menu').visibility({
      type: 'fixed'
    });
    $('.overlay').visibility({
      type: 'fixed',
      offset: 80
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
        .sidebar('setting', 'dimPage', false)
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('toggle')
      ;
    });
    $('.closeSidebar').click(function() {
      $(this).parent('.ui.sidebar')
        .sidebar('toggle')
      ;
    });

  });