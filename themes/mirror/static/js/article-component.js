$(document)
  .ready(function() {
  
  	console.log($('article img'));

  	$('article img').each(function(i,img){
  		var alt = img.alt;
  		var classes = $(img).attr('class');
  		var parent = $(img).parent();
  		
  		parent.addClass('img '+classes);
  		parent.append('<div class=\'caption\'>'+alt+'</div>')
  	});



  });