$(window).load(function(){
	var neurons = [];
	var links = [];
	var cur_offset = null;
	var cur_elem = null;
	var create_link = false;
	//start drag
	var neuron_mousedown = function(e){
		var target = $(e.target);
		if(create_link){
			//create a link from last neuron to current
			create_link = false;
			create_link_func(neurons[cur_elem-1].elem, target);
		}
		//set this as the current element
		cur_elem = parseInt(target.attr('id').replace('neuron-', ''));
		$('neuron').removeClass('highlight');
		neurons[cur_elem-1].elem.addClass('highlight');
		//update offset
		var elem_o = neurons[cur_elem-1].elem.offset();
		cur_offset = {x: elem_o.left - e.pageX, y: elem_o.top - e.pageY};
	};
	//during drag
	$(window).on('mousemove', function(e){
		if(cur_offset == null || cur_elem == null){ return; }
		var id = cur_elem;
		var elem_o = {left: cur_offset.x + e.pageX, top: cur_offset.y + e.pageY}
		neurons[id-1].elem.offset(elem_o);
		//update outgoing arrow position
		for (var i = 0; i < neurons[id-1].out.length; i++) {
			update_arrow_func(neurons[id-1].out[i]);
		}
	//end drag
	}).on('mouseup', function(){
		cur_offset = null;
	//keyboard events
	}).on('keypress', function(e){
		if(e.which == 110){	//N key
			//insert neuron, bind event
			var id = neurons.push({out: [], elem: null});
			var elem = $('<neuron id="neuron-'+id+'"><input type="text"/></neuron>');
			$('body').append(elem);
			neurons[id-1].elem = elem;
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
		//add link to array
		var aid = parseInt(na.attr('id').replace('neuron-', ''));
		var bid = parseInt(nb.attr('id').replace('neuron-', ''));
		var id = links.push({elem: null, a: aid, b: bid});
		neurons[aid-1].out.push(id);
		//add an arrow between elements
		var arrow = $('<arrow id="arrow-'+id+'"></arrow>');
		$('body').append(arrow);
		//add element to array
		links[id-1].elem = arrow;
		//update position
		update_arrow_func(id);
	};
	var update_arrow_func = function(id){
		//get elements
		var arrow = links[id-1].elem;
		var na = neurons[links[id-1].a-1].elem;
		var nb = neurons[links[id-1].b-1].elem;
		//get centers
		var na_offset = na.offset();
		var na_center = {left: na_offset.left + na.width() / 2, top: na_offset.top + na.height() / 2};
		var nb_offset = nb.offset();
		var nb_center = {left: nb_offset.left + nb.width() / 2, top: nb_offset.top + nb.height() / 2};
		var pa = na_center;
		var pb = nb_center;
		//update arrow position
		var xdiff = pb.left - pa.left;
		var ydiff = pb.top - pa.top;
		var angle = Math.atan2(ydiff, xdiff);
		var mag = Math.sqrt(xdiff*xdiff+ydiff*ydiff);
		var a_offset = {
			left: pa.left + xdiff/2 - Math.abs((mag/2)*Math.cos(angle)),
			top:  pa.top  + ydiff/2 - Math.abs((mag/2)*Math.sin(angle))
		}
		console.log(angle, (mag/2)*Math.cos(angle));
		arrow.offset(a_offset);
		arrow.width(mag);
		arrow.rotate(angle);
	}
});

//rotate function
jQuery.fn.rotate = function(radians) {
    $(this).css({'-webkit-transform' : 'rotate('+ radians +'rad)',
                 '-moz-transform' : 'rotate('+ radians +'rad)',
                 '-ms-transform' : 'rotate('+ radians +'rad)',
                 'transform' : 'rotate('+ radians +'rad)'});
    return $(this);
};
