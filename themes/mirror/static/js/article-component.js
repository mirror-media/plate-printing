$(document)
  .ready(function() {
  
  	$('div.font-larger').click(function(){
  		$('article').removeClass('small');
  		$('article').addClass('large');
  	});
  	$('div.font-medium').click(function(){
  		$('article').removeClass('large');
  		$('article').removeClass('small');
  	});
  	$('div.font-small').click(function(){
  		$('article').removeClass('large');
  		$('article').addClass('small');
  	});

  	$('article div > img').each(function(i, img){
  		var alt = img.alt;
  		var classes = $(img).attr('class');
  		var parent = $(img).parent();
  		
  		parent.addClass('img '+classes);
  		parent.append('<div class=\'caption\'>'+alt+'</div>')
  	});

  	$('article blockquote').each(function(i, blockquote){
  		var divCnt = $(blockquote).children('div').length;

  		if( divCnt == 2) {
  			$(blockquote).addClass('blockquote');
  			var quoteBody = $(blockquote).find('div:nth-child(1)');
  			var quoteBy = $(blockquote).find('div:nth-child(2)');
  			quoteBody.addClass('quote-body');
  			quoteBy.addClass('quote-by');
  		} else {
  			$(blockquote).addClass('quote');
  		}
  	});

  	$('article .info-box-container').each(function(i, infobox){
  		var parent = $(infobox).parent();
  		$(infobox).append('<div class=\'info-box\'></div>')
  	});

  	$('article abbr').each(function(i, abbr){
  		var title = abbr.title;
  		var parent = $(abbr).parent();
  		$(abbr).after('<div class=\'annotation-box\'>'+title+'</div>');
  		$(abbr).after('<div class=\'annotation-btn\'></div>')
  	});

  	$('article iframe').each(function(i, iframe){
  		var parent = $(iframe).parent();
  		parent.addClass('aspect-ratio');
  	});

  	function toMMSS(seconds) {
  		seconds = parseInt(seconds, 10);
		var minutes = parseInt( seconds / 60 ) % 60;
		var seconds = seconds % 60;

		return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
  	}

  	$('article .audio-container').each(function(i, audiobox){
  		var parent = $(audiobox).parent();
  		var audioObj = $(audiobox).children('audio')[0];

  		parent.addClass('audio-box');
  		parent.prepend('<div class=\'audio-cover\'><div class=\'audio-btn pause\'></div></div>')

  		var audioBtn = parent.find('.audio-btn')[0];

		$(audioObj).bind('play',function() {
		  $(audioBtn).removeClass('pause');
		  $(audioBtn).addClass('play');
		}).bind('pause ended', function() {
		  $(audioBtn).removeClass('play');
		  $(audioBtn).addClass('pause');
		});

		parent.find('.audio-cover').click(function() {
		  if (audioObj.paused) { audioObj.play(); }
		  else { audioObj.pause(); }
		});

  		$(audioObj).bind("loadeddata", function() {
	  		$(audiobox).prepend('<div class=\'audio-progress\'><div class=\'bar\'></div></div>')
			$(audiobox).prepend('<div class=\'audio-time\'><span class=\'left\'>00:00</span> / '+toMMSS(audioObj.duration)+'</div>');
		});
  		$(audioObj).bind("timeupdate", function() {
  			var left = $(audiobox).find('.left')[0];
  			var progressBar = $(audiobox).find('.audio-progress .bar')[0];
  			if (left) {
  				var rem = parseInt(audioObj.duration - audioObj.currentTime, 10),
  				pos = (audioObj.currentTime / audioObj.duration) * 100;

  				$(left).html(toMMSS(audioObj.currentTime));
  				$(progressBar).width(pos+'%');
  			}
		});
  	});

  	$('article .slideshow-container').each(function(i, slideshow) {
  		var parent = $(slideshow).parent();
  		parent.addClass('slideshow-box');

  		parent.prepend('<div class=\'slideshow-indicator\'><span class=\'cur\'></span>/<span class=\'total\'></span></div>')
  		$(slideshow).find('li').each(function(i, li) {
  			$(li).replaceWith( "<div class='slideshow-slide'>" + $( this ).html() + "</div>" );
  		});
  		$(slideshow).replaceWith( "<div class='slideshow-container'>" + $( this ).html() + "</div>" );
  		parent.append('<div class=\'slideshow-thumbs\'></div>');
  		parent.find('.slideshow-thumbs').replaceWith( "<div class='slideshow-thumbs'>" + $( this ).html() + "</div>" );
  		parent.append('<div class=\'slideshow-caption\'></div>');


			var $sync1 = parent.children(".slideshow-box .slideshow-container"),
			$sync2 = parent.children(".slideshow-box .slideshow-thumbs"),
			flag = false,
			duration = 300;

		$sync1
			.on('initialized.owl.carousel', function() {
                total = $sync1.find('.owl-stage > div');
				parent.find('.slideshow-indicator span.total').html(total.length);
				parent.find('.slideshow-indicator span.cur').html('1');
				target = $sync1.find('.owl-item img').get(0);
				parent.find('.slideshow-caption').html($(target).attr('alt'));
            })
			.owlCarousel({
				items: 1,
				margin: 10,
				nav: false,
				dots: true
			})
			.on('changed.owl.carousel', function (e) {
				if (!flag) {
					flag = true;
					$sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
					$sync2.find('.owl-stage .displaying').removeClass('displaying');
					target = $sync2.find('.owl-stage > div').get(e.item.index);
					$(target).children('div').addClass('displaying');
					flag = false;
				}
			})
			.on('translated.owl.carousel', function(e) {
				target = $sync2.find('.owl-item img').get(e.item.index);
				parent.find('.slideshow-caption').html($(target).attr('alt'));
				parent.find('.slideshow-indicator span.cur').html(e.item.index+1);
			});

		$sync2
			.on('initialized.owl.carousel', function() {
                target = $sync2.find('.owl-stage > div').get(0);
				$(target).children('div').addClass('displaying');
            })
			.owlCarousel({
				margin: 10,
				items: 5,
                center: true,
				nav: true,
				dots: false,
				navText: ['', '']
			})
			.on('click', '.owl-item', function () {
				$sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
				$sync2.find('.owl-stage .displaying').removeClass('displaying');
				target = $sync2.find('.owl-stage > div').get($(this).index());
				$(target).children('div').addClass('displaying');
			})
			.on('changed.owl.carousel', function (e) {
				if (!flag) {
					flag = true;		
					$sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
					$sync2.find('.owl-stage .displaying').removeClass('displaying');
					target = $sync2.find('.owl-stage > div').get(e.item.index);
					$(target).children('div').addClass('displaying');
					flag = false;
				}
			});
  	});
  });