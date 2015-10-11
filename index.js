$(window).load(function(){
	var neurons = [];
	var cur_offset = null;
	var create_link = false;
	//start drag
	var neuron_mousedown = function(e){
		var target = $(e.target);
		if(create_link){
			//create a link from last neuron to current
			create_link = false;
			create_link_func(cur_elem, target);
		}
		//set this as the current element
		cur_elem = target;
		$('neuron').removeClass('highlight');
		cur_elem.addClass('highlight');
		//update offset
		var elem_o = cur_elem.offset();
		cur_offset = {x: elem_o.left - e.pageX, y: elem_o.top - e.pageY};
	};
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
		if(e.which == 110){	//N key
			//insert neuron, bind event
			var id = neurons.push({out: []});
			var elem = $('<neuron id="neuron-'+id+'"><input type="text"/></neuron>');
			$('body').append(elem);
			elem.offset({top: "50%", left: "50%"});
		}else if(e.which == 109){	//M key
			if(cur_elem == null){ return; }
			create_link = true;
		}
	//cancel selection / start selection
	}).on('mousedown', function(e){
		var target = $(e.target);
		if(target.is('neuron')){
			neuron_mousedown(e);
		}else{
			//cancel selection
			cur_elem = null;
			create_link = false;
			$('neuron').removeClass('highlight');
		}
	});
	//create a link between two neurons
	var create_link_func = function(na, nb){
		var na_offset = na.offset();
		var na_center = {left: na_offset.left + na.width() / 2, top: na_offset.top + na.height() / 2};
		var nb_offset = nb.offset();
		var nb_center = {left: nb_offset.left + nb.width() / 2, top: nb_offset.top + nb.height() / 2};
		create_arrow_func(na_center, nb_center);
	};
	var create_arrow_func = function(pa, pb){
		var arrow = $('<arrow></arrow>');
		$('body').append(arrow);
		arrow.offset(pa);
	}
});
