$(window).load(function(){
	var cur_offset = null;
	var cur_elem = null;
	var neuron_mousedown = function(e){
		var elem_o = $(this).offset();
		cur_offset = {x: elem_o.left - e.pageX, y: elem_o.top - e.pageY};
		cur_elem = $(this);
	};
	$('neuron').on('mousedown', neuron_mousedown);
	$(window).on('mousemove', function(e){
		if(cur_offset == null || cur_elem == null){ return; }
		var elem_o = {left: cur_offset.x + e.pageX, top: cur_offset.y + e.pageY}
		cur_elem.offset(elem_o);
	}).on('mouseup', function(){
		cur_offset = null;
		cur_elem = null;
	}).on('keypress', function(e){
		if(e.which == 110){	//N key
			//insert neuron, bind event
			$('neuron').off('mousedown');
			var elem = $('body').append('<neuron><input type="text"/></neuron>');
			elem.offset({top: 0, left: 0});
			$('neuron').on('mousedown', neuron_mousedown);
		}
	});
});
