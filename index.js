$(window).load(function(){
	var cur_offset = null;
	//start drag
	var neuron_mousedown = function(e){
		var elem_o = $(this).offset();
		cur_offset = {x: elem_o.left - e.pageX, y: elem_o.top - e.pageY};
		//set this as the current element
		cur_elem = $(this);
		$('neuron').removeClass('highlight');
		cur_elem.addClass('highlight');
	};
	$('neuron').on('mousedown', neuron_mousedown);
	//during drag
	$(window).on('mousemove', function(e){
		if(cur_offset == null || cur_elem == null){ return; }
		var elem_o = {left: cur_offset.x + e.pageX, top: cur_offset.y + e.pageY}
		cur_elem.offset(elem_o);
	//end drag
	}).on('mouseup', function(){
		cur_offset = null;
	//keyboard events
	}).on('keypress', function(e){
		console.log(e.which);
		if(e.which == 110){	//N key
			//insert neuron, bind event
			$('neuron').off('mousedown');
			var elem = $('body').append('<neuron><input type="text"/></neuron>');
			elem.offset({top: 0, left: 0});
			$('neuron').on('mousedown', neuron_mousedown);
		}else if(e.which == 109){	//M key

		}
	//cancel selection
	});
});
