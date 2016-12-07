var progressBar, max, value, width;
$(document)
  .ready(function() {

    /* Reading Progress Indicator */
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

    /* toggle logo when scroll */
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

    /* fix main menu to page on passing */
    $('.main.menu').visibility({
      type: 'fixed',
      silent: true
    });
    $('.overlay').visibility({
      type: 'fixed',

      silent: true
    });

    /* lazy load images */
    $('.image').visibility({
      type: 'image',
      transition: 'vertical flip in',
      duration: 500
    });

    /* bind menu button */
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

    /* Header Menu */

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

    /* Load Latest */
    var latestTopTemplate = $.templates("#latest-top-tempalte");
    var latestBottomTemplate = $.templates("#latest-bottom-tempalte");
    var categoryTopTemplate = $.templates("#category-top-tempalte");
    var categoryBottomTemplate = $.templates("#category-bottom-tempalte");

    var sectionId = $('meta[name="section-id"]').attr('content')
    var categoryId = $('meta[name="category-id"]').attr('content')
    var topicId = $('meta[name="topic-id"]').attr('content')

    if ( sectionId ) {
      $.getJSON( "/story/json/latest-sections-"+sectionId+".json", function( data ) {

        if( data._items.length > 5 ){
          $("<div class=\"latest-bottom\" style=\"width: 300px;  background-color: #ffffff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1); padding:20px; margin-bottom:2px;\"><ul class=\"latest\"></ul></div>")
            .insertAfter('div[class="latest-top"]');
        }

        function isEmpty(str) {
          return (!str || 0 === str.length);
        }

        for (var i = 0; i < data._items.length; i++) {
          data._items[i].idx = i+1;
          data._items[i].catName = (data._items[i].categories.length > 0) ? data._items[i].categories[0].title : "";
          data._items[i].url = (data._items[i].style=='projects') ? '/projects/'+data._items[i].slug+'/' : '/story/'+data._items[i].slug+'/'

          if ( !isEmpty(data._items[i].og_image) )
            data._items[i].preview = data._items[i].og_image.image.resizedTargets.mobile.url
          else
            if ( !isEmpty(data._items[i].heroImage) )
              data._items[i].preview = data._items[i].heroImage.image.resizedTargets.mobile.url
            else
              data._items[i].preview = "/asset/review.png";

          if ( i < 5) {
            var htmlOutput = latestTopTemplate.render(data._items[i]);
            $(".latest-top").append(htmlOutput)
          } else {
            var htmlOutput = latestBottomTemplate.render(data._items[i]);
            $(".latest-bottom ul").append(htmlOutput)
          }
        }

        if (data._items.length == 0) {
          $('.article-sidebar .latest-top').hide();
        }

      }).fail(function() {
        $('.article-sidebar .latest-top').hide();
      })
    }

    if ( topicId ) {
      $.getJSON( "/api/posts?where={\"topics\":\""+topicId+"\"}", function( data ) {

        if ( data._items.length > 0 ) {
          $('.choice .article-main h2.hot-topic span').each(function(){
            $(this).html(data._items[0].topics.name);
          });
        }

        function isEmpty(str) {
          return (!str || 0 === str.length);
        }
        function formatDate(d) {

          var dd = d.getDate()
          if ( dd < 10 ) dd = '0' + dd

          var mm = d.getMonth()+1
          if ( mm < 10 ) mm = '0' + mm

          var yy = d.getFullYear()

          return yy+'.'+mm+'.'+dd
        }
        function stripHTML(dirtyString) {
          return $("<div/>").html(dirtyString).text(); // innerHTML will be a xss safe string
        }

        for (var i = 0; i < data._items.length; i++) {
          data._items[i].idx = i+1;
          data._items[i].date = formatDate(new Date(data._items[i].publishedDate));
          data._items[i].catName = (data._items[i].categories.length > 0) ? data._items[i].categories[0].title : "";
          data._items[i].url = (data._items[i].style=='projects') ? '/projects/'+data._items[i].slug+'/' : '/story/'+data._items[i].slug+'/'

          if(data._items[i].brief)
            data._items[i].brief.html = stripHTML(data._items[i].brief.html).substring(0, (i<3)? 200 : 70)+"...";
          else
            data._items[i].brief = { html: "" };

          if(data._items[i].brief.length == 0) {
            data._items[i].emptyBrief = "hide";
          }

          if ( data._items[i].idx % 2 ) {
            data._items[i].Right = "right";
            data._items[i].Left = "left";
          }

          if ( !isEmpty(data._items[i].og_image) )
            data._items[i].preview = data._items[i].og_image.image.resizedTargets.mobile.url;
          else
            if ( !isEmpty(data._items[i].heroImage) )
              data._items[i].preview = data._items[i].heroImage.image.resizedTargets.mobile.url;
            else
              data._items[i].preview = "/asset/review.png";

          if ( i < 3) {
            var htmlOutput = categoryTopTemplate.render(data._items[i]);
            $(".category-top").append(htmlOutput);
          } else {
            var htmlOutput = categoryBottomTemplate.render(data._items[i]);
            $(".category-bottom").append(htmlOutput);
          }
        }

        if (data._items.length == 0) {
          $('.choice').hide();
        }

      }).fail(function() {
        $('.choice').hide();
      })
    } else {
      if ( categoryId ) {
        $.getJSON( "/story/json/latest-categories-"+categoryId+".json", function( data ) {

          function isEmpty(str) {
            return (!str || 0 === str.length);
          }
          function formatDate(d) {

            var dd = d.getDate()
            if ( dd < 10 ) dd = '0' + dd

            var mm = d.getMonth()+1
            if ( mm < 10 ) mm = '0' + mm

            var yy = d.getFullYear()

            return yy+'.'+mm+'.'+dd
          }
          function stripHTML(dirtyString) {
            return $("<div/>").html(dirtyString).text(); // innerHTML will be a xss safe string
          }

          for (var i = 0; i < data._items.length; i++) {
            data._items[i].idx = i+1;
            data._items[i].date = formatDate(new Date(data._items[i].publishedDate));
            data._items[i].url = (data._items[i].style=='projects') ? '/projects/'+data._items[i].slug+'/' : '/story/'+data._items[i].slug+'/'
            data._items[i].catName = (data._items[i].categories.length > 0) ? data._items[i].categories[0].title : "";

            if(data._items[i].brief)
              data._items[i].brief.html = stripHTML(data._items[i].brief.html).substring(0, (i<3)? 200 : 70)+"...";
            else
              data._items[i].brief = { html: "" };

            if(data._items[i].brief.length == 0) {
              data._items[i].emptyBrief = "hide";
            }

            if ( data._items[i].idx % 2 ) {
              data._items[i].Right = "right";
              data._items[i].Left = "left";
            }

            if ( !isEmpty(data._items[i].og_image) )
              data._items[i].preview = data._items[i].og_image.image.resizedTargets.mobile.url;
            else
              if ( !isEmpty(data._items[i].heroImage) )
                data._items[i].preview = data._items[i].heroImage.image.resizedTargets.mobile.url;
              else
                data._items[i].preview = "/asset/review.png";

            if ( i < 3) {
              var htmlOutput = categoryTopTemplate.render(data._items[i]);
              $(".category-top").append(htmlOutput);
            } else {
              var htmlOutput = categoryBottomTemplate.render(data._items[i]);
              $(".category-bottom").append(htmlOutput);
            }
          }

          if (data._items.length == 0) {
            $('.choice').hide();
          }

        }).fail(function() {
          $('.choice').hide();
        })
      }
    }

    /* send GA event when category-latest is visible. */
    $('.pusher > div.choice').visibility({
      onTopVisible: function(calculations) {
        ga('send', 'event', 'article', 'visible', 'category-latest');
      }
    });

    /* silent debug messages */
    $.site('change setting', 'silent', true);
  });
