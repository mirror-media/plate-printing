$(document)
  .ready(function() {
  
  	$('article img').each(function(i, img){
  		var alt = img.alt;
  		var classes = $(img).attr('class');
  		var parent = $(img).parent();
  		
  		parent.addClass('img '+classes);
  		parent.append('<div class=\'caption\'>'+alt+'</div>')
  	});

  	$('blockquote').each(function(i, blockquote){
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

  	$('.info-box-container').each(function(i, infobox){
  		var parent = $(infobox).parent();
  		$(infobox).append('<div class=\'info-box\'></div>')
  	});

  	$('abbr').each(function(i, abbr){
  		var title = abbr.title;
  		var parent = $(abbr).parent();
  		$(abbr).after('<div class=\'annotation-box\'>'+title+'</div>');
  		$(abbr).after('<div class=\'annotation-btn\'></div>')
  	});

  	function toMMSS(seconds) {
  		seconds = parseInt(seconds, 10);
		var minutes = parseInt( seconds / 60 ) % 60;
		var seconds = seconds % 60;

		return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
  	}

  	$('.audio-container').each(function(i, audiobox){
  		var parent = $(audiobox).parent();
  		var audioObj = $(audiobox).children('audio')[0];

  		parent.addClass('audio-box');
  		parent.append('<div class=\'audio-cover\'><div class=\'audio-btn pause\'></div></div>')

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

  	});

  });