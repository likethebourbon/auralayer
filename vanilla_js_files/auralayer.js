let developing = true;
let youtube_player_state = -2;
let GLOBAL_length_padding = 1;
let GLOBAL_presence_scale = 10;
let project;
let playerx;
let shift_down = false;
let lastActiveElement = document.activeElement;

let example_data = {};

class Layer
  {
    constructor(sent_container, sent_layer_data, sent_file_length, sent_parent, sent_mode)
      {
        this.parent_container = sent_container;
        this.layer_data = sent_layer_data;
				this.parent = sent_parent;
				this.parent_file_length = sent_file_length;
				this.selected = false;
				this.segment_array = [];
				this.mode = sent_mode;
        this.initialize();
      }
    initialize()
      {
				let r = parseInt(this.layer_data.color.split("rgba(")[1].split(",")[0]).toString(16);
				let g = parseInt(this.layer_data.color.split("rgba(")[1].split(",")[1]).toString(16);
				let b = parseInt(this.layer_data.color.split("rgba(")[1].split(",")[2]).toString(16);

        this.layer_container = createNewElement({type:"div", classes: ["layer_container", "draggable"], parent: this.parent_container, properties:{draggable: true}});
				this.layer_container.addEventListener("dragstart", e=> { this.layer_container.classList.add("dragging"); });
				this.layer_container.addEventListener("dragend", e=> { this.layer_container.classList.remove("dragging"); });		
					
        this.layer_controls_holder = createNewElement({type:"div", classes: ["layer_controls_holder"], parent: this.layer_container});
        this.layer_segment_holder = createNewElement({type:"div", classes: ["layer_segment_holder"], parent: this.layer_container, styles:{width: (this.parent_file_length * this.parent.scale) + "px"}});
				this.select_box = createNewElement({type:"input", classes: ["layer_select", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {type: "checkbox"}});
				this.select_box_selector_box = createNewElement({type:'div', classes:["select_box_selector_box"], parent: this.layer_controls_holder, properties:{}});
				this.select_box_selector_box.addEventListener("click",e=>this.select_box.click());
				this.color_picker = createNewElement({type:"input", classes: ["layer_color_picker", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {type: "color", value: ("#" + r + g + b)}, styles: {display: "none"}});
				this.color_picker.addEventListener("change", e=>this.color_picker_handler(e));
				this.color_picker.addEventListener("input", e=>this.color_picker_handler(e));
        // this.grip = createNewElement({type:"div", classes: ["layer_grip", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {innerHTML: "⋮⋮"}});
				// this.grip.addEventListener("click",e=>this.select_box.click());
        this.name = createNewElement({type:"div", classes: ["layer_name", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {innerHTML: this.layer_data.name}});
				this.name.addEventListener("dblclick", e=> this.layer_name_double_click_handler(e));
				this.name.addEventListener("input", e=>this.layer_name_input_handler(e));
				this.name.addEventListener("blur", e=> this.name.contentEditable = false);
				this.delete_layer_button = createNewElement({type:"button", classes: ["delete_layer_button", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {innerHTML: "❌"}, styles: {display: "none"}});
				this.delete_layer_button.addEventListener("click", e => this.delete_layer_button_handler());

				this.select_box.addEventListener("change", e => this.select_changed(e));
				
				if(this.layer_data.segments.length === 0)
					{ this.create_segment(0, -1, GLOBAL_presence_scale, GLOBAL_presence_scale); }
				else
					{ this.layer_data.segments.forEach(each=>this.create_segment(each.start_pos, each.end_pos, each.start_presence, each.end_presence, each)); }

				this.mode = "editing_layer_mode";

				this.layer_texture_picker = createNewElement({type:"button", classes: ["layer_texture_picker", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {innerText: "texture"}, styles: {display: "none"}});
				this.layer_texture_picker.addEventListener("click", e=>this.layer_texture_picker_handler(e));
				this.texture_selector = createNewElement({type:'div', classes: ["texture_selector", "layer_controls_elements"], parent: this.parent_container, styles: {display: "none"}} );

			// -----------------------------------
			//      TEXTURES
			// -----------------------------------  
				this.shape_background_texture_1 = createNewElement({ type: 'button', classes: ['shape_background_texture_1'], parent: this.texture_selector, styles:{background:'url(images/pattern_horizontal_lines.png)'}, properties: {title: "Horizontal_Lines"}});
				this.shape_background_texture_2 = createNewElement({ type: 'button', classes: ['shape_background_texture_2'], parent: this.texture_selector, styles:{background:'url(images/pattern_dots_1.png)'}, properties: {title: "Dots_1"}});
				this.shape_background_texture_3 = createNewElement({ type: 'button', classes: ['shape_background_texture_3'], parent: this.texture_selector, styles:{background:'url(images/pattern_dots_2.png)'}, properties: {title: "Dots_2"}});
				this.shape_background_texture_4 = createNewElement({ type: 'button', classes: ['shape_background_texture_4'], parent: this.texture_selector, styles:{background:'url(images/pattern_vertical_lines_1.png)'}, properties: {title: "Vertical_Lines 1"}});
				this.shape_background_texture_5 = createNewElement({ type: 'button', classes: ['shape_background_texture_5'], parent: this.texture_selector, styles:{background:'url(images/pattern_vertical_lines_2.png)'}, properties: {title: "Vertical_Lines 2"}});
				this.shape_background_texture_6 = createNewElement({ type: 'button', classes: ['shape_background_texture_6'], parent: this.texture_selector, styles:{background:'url(images/pattern_diagonal_line_1.png)'}, properties: {title: "Diagonal_Line 1"}});
				this.shape_background_texture_7 = createNewElement({ type: 'button', classes: ['shape_background_texture_7'], parent: this.texture_selector, styles:{background:'url(images/pattern_diagonal_line_2.png)'}, properties: {title: "Diagonal_Line 2"}});
				this.shape_background_texture_8 = createNewElement({ type: 'button', classes: ['shape_background_texture_8'], parent: this.texture_selector, styles:{background:'url(images/pattern_circle_1.png)'}, properties: {title: "Circle_1"}});
				this.shape_background_texture_9 = createNewElement({ type: 'button', classes: ['shape_background_texture_9'], parent: this.texture_selector, styles:{background:'url(images/pattern_circle_2.png)'}, properties: {title: "Circle_2"}});


				this.shape_background_texture_1.addEventListener('click', e=>this.create_layer_background_texture(e));
				this.shape_background_texture_2.addEventListener('click', e=>this.create_layer_background_texture(e));
				this.shape_background_texture_3.addEventListener('click', e=>this.create_layer_background_texture(e));
				this.shape_background_texture_4.addEventListener('click', e=>this.create_layer_background_texture(e));
				this.shape_background_texture_5.addEventListener('click', e=>this.create_layer_background_texture(e));
				this.shape_background_texture_6.addEventListener('click', e=>this.create_layer_background_texture(e));
				this.shape_background_texture_7.addEventListener('click', e=>this.create_layer_background_texture(e));
				this.shape_background_texture_8.addEventListener('click', e=>this.create_layer_background_texture(e));
				this.shape_background_texture_9.addEventListener('click', e=>this.create_layer_background_texture(e));
      }
		layer_texture_picker_handler(e)
			{
				if(this.texture_selector.style.display === "block")
					{
						this.texture_selector.style.display = "none";
					}
				else
					{
						this.texture_selector.style.display = "block";
					}
				
			}
		create_layer_background_texture(e)
			{
				for (let i = 0; i < this.segment_array.length ; i++)
					{
						let initial_value = this.segment_array[i].segment.style.background;
						this.segment_array[i].segment.style.background =  e.target.style.background + " center center, " + initial_value;
						this.layer_data.segments[i].color = e.target.style.background + " center center, " + initial_value;
						this.segment_array[i].data.styles.background =  e.target.style.background + " center center, " + initial_value;
						this.layer_data.color = e.target.style.background + " center center, " + initial_value;
					}
			}   			
		delete_layer_button_handler()
			{
				this.parent.delete_layer(this.layer_data.layer_id);
			}
		layer_name_double_click_handler(e)
			{
				this.name.contentEditable = true;
				this.name.focus();
			}
		layer_name_input_handler(e)
			{
				this.layer_data.name = e.target.innerText;
			}
		color_picker_handler(e)
			{
				if(this.select_box.checked === true)
					{
						let current_color = e.target.value;
						
						// convert hex to rgb
						var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(current_color);
						let result_rgb = { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
						let formated_color_value_for_layer = "rgba(" + result_rgb.r + "," + result_rgb.g + "," + result_rgb.b + ",1.0)";
						let layer_color_formated = "linear-gradient(to right, " + formated_color_value_for_layer + ", " + formated_color_value_for_layer + ")";

						this.layer_data.color = layer_color_formated;
						
						for (let i = 0; i < this.segment_array.length ; i++)
							{
								let starting_saturation_value = (this.segment_array[i].data.start_presence/GLOBAL_presence_scale).toFixed(1);
								let ending_saturation_value = (this.segment_array[i].data.end_presence/GLOBAL_presence_scale).toFixed(1);
								let formated_color_value_start = "rgba(" + result_rgb.r + "," + result_rgb.g + "," + result_rgb.b + "," + starting_saturation_value + ")";
								let formated_color_value_end = "rgba(" + result_rgb.r + "," + result_rgb.g + "," + result_rgb.b + "," + ending_saturation_value + ")";
								let segment_color_formated = "linear-gradient(to right, " + formated_color_value_start + ", " + formated_color_value_end + ")";
								
								this.segment_array[i].segment.style.background = segment_color_formated;
								this.layer_data.segments[i].color = segment_color_formated;
								this.segment_array[i].data.styles.background = segment_color_formated;
							}
						}
			}
		select_changed(e)
			{
				if(e.target.checked === true)
					{
						this.layer_controls_holder.classList.add("layer_selected_controls_holder");
						this.layer_segment_holder.classList.add("layer_selected_segments_holder");
						this.selected = true;
						this.segment_array.forEach(each_segment=>each_segment.segment.classList.add("segments_layer_is_selected"));
						this.segment_array.forEach(each_segment=>each_segment.segment.classList.remove("segments_layer_is_not_selected"));
						this.color_picker.style.display = "block";
						this.delete_layer_button.style.display = "block";
						// this.layer_texture_picker.style.display = "block";
						
					}
				else if(e.target.checked === false)
					{
						this.layer_controls_holder.classList.remove("layer_selected_controls_holder");
						this.layer_segment_holder.classList.remove("layer_selected_segments_holder");
						this.selected = false;
						this.segment_array.forEach(each_segment=>each_segment.segment.classList.remove("segments_layer_is_selected"));
						this.segment_array.forEach(each_segment=>each_segment.segment.classList.add("segments_layer_is_not_selected"));
						this.color_picker.style.display = "none";
						this.delete_layer_button.style.display = "none";
						// this.layer_texture_picker.style.display = "none";
						// this.texture_selector.style.display = "none";
					}
			}
		split_segment()
			{

			}
		create_segment(start, end = -1, start_presence = -1, end_presence = -1, sent_segment = {})
			{
				this.current_segment_index = 0;
				this.current_position = start;
				
				// treat loading from a file/undo differently than adding a new segment while doing normal editing
				if(this.mode === "load_existing_layer")
					{
						this.segment_array.push(new Segment(this, end, this.layer_data.segments, sent_segment.color, this.layer_segment_holder, this.parent.presence_slider_start, this.parent.presence_slider_end, start_presence, end_presence, sent_segment));
					}
				else if(this.mode === "new_layer")
					{
						// this.segment_array.push(new Segment(this, this.parent.file_length, this.layer_data.segments, this.layer_data.color, this.layer_segment_holder, this.parent.presence_slider_start, this.parent.presence_slider_end, start_presence, end_presence));
						this.segment_array.push(new Segment(this, this.parent_file_length, this.layer_data.segments, this.layer_data.color, this.layer_segment_holder, this.parent.presence_slider_start, this.parent.presence_slider_end, start_presence, end_presence));
					}
				else if(this.mode === "editing_layer_mode")
					{
						this.layer_data.segments.forEach((each,index)=>
							{
								if(this.current_position === 0)
									{
										alert("There is already a segment that starts here (0)");
										return false;
									}
								else if(this.current_position === this.parent_file_length)
									{
										alert("There is already a segment that ends here");
										return false;
									}
								else if(this.current_position === each.start_pos)
									{
										alert("There is already a segment that starts here (1)");
										return false;
									}
								else if(this.current_position === each.end_pos)
									{
										alert("There is already a segment that ends here");
										return false;
									}					
		
								if(this.current_position > each.start_pos && this.current_position < each.end_pos) this.current_segment_index = index;
							});
				
						let current_position_relative_to_current_start_pos = this.current_position - this.layer_data.segments[this.current_segment_index].start_pos;
						let old_width_of_current_segment = this.layer_data.segments[this.current_segment_index].end_pos - this.layer_data.segments[this.current_segment_index].start_pos;
						let old_end_pos_of_current_segment = this.layer_data.segments[this.current_segment_index].end_pos;
						let width_of_new_segment = old_width_of_current_segment - current_position_relative_to_current_start_pos;
						let new_width_of_current_segment = old_width_of_current_segment - width_of_new_segment;						
						
						// make the current segment shorter
						// the -1 is just so the end position of the current segment and start position of the new segment aren't the same
						this.layer_data.segments[this.current_segment_index].end_pos = this.current_position - 1 ;
						this.segment_array[this.current_segment_index].segment.style.width = ((new_width_of_current_segment * this.parent.scale) - 1) + "px";
							
						this.segment_array.push(new Segment(this, old_end_pos_of_current_segment, this.layer_data.segments, this.layer_data.color, this.layer_segment_holder, this.parent.presence_slider_start, this.parent.presence_slider_end, start_presence, end_presence));
					}
			}
		delete_segment()
			{

			}
  }
class Segment
	{
		constructor(sent_parent, sent_old_end_pos_of_current_segment, sent_layer_data_segments, sent_color, sent_layer_segment_holder, sent_presence_slider_start, sent_presence_slider_end, sent_start_presence = -1, sent_end_presence = -1, sent_segment)
			{
				this.parent = sent_parent;
				this.layer_segment_holder = sent_layer_segment_holder;
				this.presence_slider_start = sent_presence_slider_start;
				this.presence_slider_end = sent_presence_slider_end;

				if(this.parent.mode !== "load_existing_layer")
					{
						this.data = 
							{
								classes: ["segment"],
								color: sent_color,
								start_pos: sent_parent.current_position,
								end_pos: sent_old_end_pos_of_current_segment,
								start_presence: sent_start_presence,
								end_presence: sent_end_presence,
								styles: {},
								text: [
									{
										inner_text:"",
										styles:[]
									}]
							};						
						sent_layer_data_segments.push(this.data);
					}
				else
					{ this.data = sent_segment; }

				this.create_segment();
			}
		create_segment()
			{
				this.segment = createNewElement({type:"name", classes: this.data.classes, parent: this.layer_segment_holder, styles:
					{
						left: (this.data.start_pos * this.parent.parent.scale) + "px",
						width:  ((this.data.end_pos - this.data.start_pos) * this.parent.parent.scale) + (this.parent.parent.scale-1) + "px",
						background: this.data.color, textAlign: 'center'
					},
					properties: {contentEditable: false, innerText: this.data.text[0].inner_text}
				});

				
				if(this.parent.mode !== "load_existing_layer")
					{ this.segment.classList.add("segments_layer_is_selected"); }
				
				this.segment.addEventListener("click",e=> { this.click_handler();	});
				this.segment.addEventListener("dblclick",e=> { this.segment_double_click_handler();	});
				this.segment.addEventListener("input", e=>this.segment_text_input_handler(e));
				this.segment.addEventListener("blur", e=> this.segment.contentEditable = false);
			}
		segment_double_click_handler()
			{
				this.segment.contentEditable = true;
				this.segment.focus();
			}
		segment_text_input_handler(e)
			{
				this.data.text[0].inner_text = e.target.innerText;
			}
		click_handler()
			{
				// shift is not being held, then only allow one segment to be selected at a time
				let deselect = false;
				deselect = this.segment.classList.contains("segment_selected");
				if(shift_down === false)
					{
						this.parent.parent.body.querySelectorAll(".segment_selected").forEach(each=>each.classList.remove("segment_selected"));
					}

				if(deselect === true)
					{
						this.segment.classList.remove("segment_selected");
						if(this.data.classes.includes("segment_selected"))
							{
								this.data.classes.splice(this.data.classes.indexOf("segment_selected"));
							}
						this.presence_slider_start.value = GLOBAL_presence_scale;
						this.presence_slider_end.value = GLOBAL_presence_scale;
					}
				else
					{
						this.segment.classList.add("segment_selected");						
						let first_color_saturation_value = this.data.color.split(", ")[1].slice(-4).slice(0,3);
						let second_color_saturation_value = this.data.color.split(", ")[2].slice(-5).slice(0,3)
						this.presence_slider_start.value = parseInt(first_color_saturation_value * GLOBAL_presence_scale); 
						this.presence_slider_end.value = parseInt(second_color_saturation_value * GLOBAL_presence_scale);
						this.data.start_presence = parseInt(this.presence_slider_start.value);
						this.data.end_presence = parseInt(this.presence_slider_end.value);
					}
			}
	}
class Auralayer
  {
    constructor()
      {
				this.url_activity_text;
				this.layers = [];
				this.example_data = example_data;
				if(Object.keys(this.example_data).length === 0)
					{ this.example_data = { piece_info: { media_type: "none", name: "new_auralayer", layer_id_pos: 0, scale: 1 }, layers: [] }}
				this.scale = 1;
				this.audio_speed = 10;
				this.dragged_layer = -1;
				this.length_padding = GLOBAL_length_padding;
				this.create_activity_selection_interface()
				this.check_for_url_data();				
        this.initialize_interface();
				this.layer_id_pos = 0;
      }
		create_activity_selection_interface()
			{
				this.activity_selection_container = createNewElement({type: "div", classes:["activity_selection_container"], parent: document.body});
				this.activity_selection_header = createNewElement({type:"div", classes:["activity_selection_header"], parent: this.activity_selection_container, properties:{innerText : "Auralayer"}});
				this.activity_selection_body = createNewElement({type:"div", classes:["activity_selection_body"], parent: this.activity_selection_container });
				this.activity_selection_footer = createNewElement({type:"div", classes:["activity_selection_footer"], parent: this.activity_selection_container });

				this.new_auralayer_from_youtube_container = createNewElement({type: "div", classes:["new_auralayer_from_youtube_container", "activity_button_container"], parent: this.activity_selection_body});
				this.new_auralayer_from_youtube_button = createNewElement({type: "button", classes:["new_auralayer_from_youtube_button"], parent: this.new_auralayer_from_youtube_container, properties:{innerText : "Create"}});				
				this.new_auralayer_from_youtube_description = createNewElement({type: "div", classes:["new_auralayer_from_youtube_description"], parent: this.new_auralayer_from_youtube_container, properties:{innerText : "Create a new Auralayer using a YouTube link"}});
				this.new_auralayer_from_youtube_button.addEventListener("click", e=>{this.start_youtube_activity_setup()});
				
				this.new_auralayer_from_audio_file_container = createNewElement({type: "div", classes:["new_auralayer_from_audio_file_container", "activity_button_container"], parent: this.activity_selection_body});
				this.new_auralayer_from_audio_file_button = createNewElement({type: "button", classes:["new_auralayer_from_audio_file_button"], parent: this.new_auralayer_from_audio_file_container, properties:{innerText : "Create"}});
				this.new_auralayer_from_audio_file_description = createNewElement({type: "div", classes:["new_auralayer_from_audio_file_description"], parent: this.new_auralayer_from_audio_file_container, properties:{innerText : "Create a new Auralayer using an audio file on your device"}});
				this.new_auralayer_from_audio_file_button.addEventListener("click", e=>this.start_audio_file_activity_setup());

				this.open_existing_auralayer_from_file_container = createNewElement({type: "div", classes:["open_existing_auralayer_from_file_container", "activity_button_container"], parent: this.activity_selection_body});
				this.open_existing_auralayer_from_file_button = createNewElement({type: "button", classes:["open_existing_auralayer_from_file_button"], parent: this.open_existing_auralayer_from_file_container, properties:{innerText : "Open"}});
				this.open_existing_auralayer_from_file_description = createNewElement({type: "div", classes:["open_existing_auralayer_from_file_description"], parent: this.open_existing_auralayer_from_file_container, properties:{innerText : "Open an existing Auralayer analysis from an auralayer file"}});
				this.open_existing_auralayer_from_file_button.addEventListener("click", e => this.import_from_file.click());

				this.import_from_file = createNewElement({type:'input', classes:["interface_button"], parent: document.body, properties:{type:'file'}, styles:{display:'none'}});
				this.import_from_file.addEventListener('change', e=>this.request_file_from_user(e));
			
				this.new_auralayer_from_audio_file_with_absolute_URL_container = createNewElement({type: "div", classes:["new_auralayer_from_audio_file_with_absolute_URL_container", "activity_button_container"], parent: this.activity_selection_body, styles: {display: "none"}});
				this.new_auralayer_from_audio_file_with_absolute_URL_button = createNewElement({type: "button", classes:["new_auralayer_from_audio_file_with_absolute_URL_button"], parent: this.new_auralayer_from_audio_file_with_absolute_URL_container, properties:{innerText : "Create"}});
				this.new_auralayer_from_audio_file_with_absolute_URL_description = createNewElement({type: "div", classes:["new_auralayer_from_audio_file_with_absolute_URL_description"], parent: this.new_auralayer_from_audio_file_with_absolute_URL_container, properties:{innerText : "Create a new Auralayer using an absolute URL"}});
				if(location.hostname.includes("localhost")) { this.new_auralayer_from_audio_file_with_absolute_URL_container.style.display = "flex";}
			}
    initialize_interface()
      {
        this.auralayer_program = createNewElement({type:"div", classes: ["auralayer_program"], parent: document.body});

			// -----------------------------------
			//      MAIN INTERFACE COMPONENTS
			// -----------------------------------        
        this.header = createNewElement({type:"div", classes: ["header_al"], parent: this.auralayer_program});
        this.body = createNewElement({type:"div", classes: ["body_al"], parent: this.auralayer_program});
        this.footer = createNewElement({type:"div", classes: ["footer_al"], parent: this.auralayer_program});
        this.left_outer_column = createNewElement({type:"div", classes: ["left_outer_column"], parent: this.auralayer_program});
				this.right_outer_column = createNewElement({type:"div", classes: ["right_outer_column"], parent: this.auralayer_program});

			// -----------------------------------
			//      BODY COMPONENTS (not document.body but Auralayer's body)
			// -----------------------------------
				this.all_layer_containers = createNewElement({type:"div", classes: ["all_layer_containers"], parent: this.body});
				this.all_layer_containers.addEventListener("dragover", e=> { this.dragging_handler(e) });
				this.segment_editing_container = createNewElement({type:"div", classes: ["segment_editing_container"], parent: this.body});
				this.slider_container = createNewElement({type: "div", classes: ["slider_container"], parent: this.body});

			// -----------------------------------
			//       SLIDER CONTAINER COMPONENTS
			// -----------------------------------    
				this.seek_slider = createNewElement({type: "input", classes: ["slider", "seek_slider" ], parent: this.slider_container, properties:{type: "range" }});
				this.seek_slider.addEventListener("input", (e) => this.seek_slider_moved_handler(e));					

			// -----------------------------------
			//      LEFT OUTER COLUMN COMPONENTS
			// -----------------------------------       
				this.add_layer_button = createNewElement({type:"button", classes: ["add_layer_button"], parent: this.left_outer_column, properties: {innerText: "+ Add Layer"}});
				this.add_layer_button.addEventListener("click", e=>this.add_layer_handler());

				this.save_to_file_button = createNewElement({type: "button", classes: ["save_to_file_button"], parent: this.left_outer_column, properties: {innerText: "Save"}});
				this.save_to_file_button.addEventListener("click", e => { this.save_to_file(); });

				this.zoom_in_button = createNewElement({type:"button", classes:["zoom_in_button"], parent: this.left_outer_column, properties: {innerText: "Zoom In"}});
				this.zoom_in_button.addEventListener("click", e=>{this.zoom_handler("in")});
				this.zoom_out_button = createNewElement({type:"button", classes:["zoom_out_button"], parent: this.left_outer_column, properties: {innerText: "Zoom Out"}});
				this.zoom_out_button.addEventListener("click", e=>{this.zoom_handler("out")});				

			// -----------------------------------
			//    SEGMENT EDITING CONTAINER COMPONENTS
			// -----------------------------------        
				this.split_button = createNewElement({type:"button", classes: ["split_button"], parent: this.segment_editing_container, properties: {innerText: "Split"}});
				this.split_button.addEventListener('click', e=>this.split_selected_segment(e));
				this.merge_left_button = createNewElement({type:"button", classes: ["merge_left_button"], parent: this.segment_editing_container, properties: {innerText: "← Merge"}});
				this.merge_left_button.addEventListener('click', e=>this.merge_segments(e,"left"));
				this.delete_button = createNewElement({type:"button", classes: ["delete_button"], parent: this.segment_editing_container, properties: {innerText: "Delete"}});
				this.delete_button.addEventListener('click', e=>this.delete_button_handler(e));	
				this.merge_right_button = createNewElement({type:"button", classes: ["merge_right_button"], parent: this.segment_editing_container, properties: {innerText: "Merge →"}});
				this.merge_right_button.addEventListener('click', e=>this.merge_segments(e, "right"));						

				this.add_marker_button = createNewElement({type:"button", classes: ["add_marker_button"], parent: this.segment_editing_container, properties: {innerText: "Add Marker"}});
				this.add_marker_button.addEventListener('click', e=>this.add_marker(e));

				this.presence_slider_container = createNewElement({type: "div", classes: ["presence_slider_container"], parent: this.segment_editing_container, properties: {}});
				this.presence_slider_start = createNewElement({type: "input", classes:["presence_slider", "presence_slider_start"], parent: this.presence_slider_container, properties:{type: "range"  , min: 0, max: GLOBAL_presence_scale} });
				this.presence_slider_start.addEventListener("input",e=>this.change_opacity(e,"start"));
				this.presence_slider_end = createNewElement({type: "input", classes:["presence_slider", "presence_slider_end"], parent: this.presence_slider_container, properties:{type: "range" , min: 0, max: GLOBAL_presence_scale, disabled: true} });
				this.presence_slider_end.addEventListener("input",e=>this.change_opacity(e,"end"));
				this.presence_slider_independent_toggle = createNewElement({type:"input", classes: ["presence_slider_independent_toggle"], parent: this.presence_slider_container, properties: {type: "checkbox"}});
				this.presence_slider_independent_toggle.addEventListener("change",e=>
					{
						if(this.presence_slider_end.disabled === false)
							{ this.presence_slider_end.disabled = true; }
						else
							{ this.presence_slider_end.disabled = false; }
					});
      }
		dragging_handler(e)
			{
				e.preventDefault();

				let draggable_id = -1;
				let draggable_index = -1;
				let layer_order = [];
				let layers_not_dragging = [];

				this.layers.forEach( (each_layer, layer_index)=>
					{
						if(each_layer.layer_container.classList.contains("dragging"))
							{
								draggable_id = each_layer.layer_data.layer_id;
								draggable_index = layer_index;
							}
					});	

				this.layers.forEach(each=>
					{
						layer_order.push(each.layer_data.layer_id);
						if( each.layer_data.layer_id !== draggable_id )
							{ layers_not_dragging.push(each); }
					});

				const afterElement = this.get_drag_after_element(layers_not_dragging, e.clientY);
				const draggable = this.all_layer_containers.querySelector(".dragging");
				
				if(afterElement === -1)
					{
						this.all_layer_containers.insertBefore(draggable, this.all_layer_containers.firstChild);
						const element = this.example_data.layers.splice(draggable_index, 1)[0];
						this.example_data.layers.splice( 0, 0, element);

						const element2 = this.layers.splice(draggable_index, 1)[0];
						this.layers.splice( 0, 0, element2);						
					}
				else
					{
						const afterElement_id = layers_not_dragging[afterElement].layer_data.layer_id;
						let afterElement_index = -1;
						const element = this.example_data.layers.splice(draggable_index, 1)[0];
						const element2 = this.layers.splice(draggable_index, 1)[0];
						
						this.example_data.layers.forEach( (each_layer, layer_index)=>
							{
								if(each_layer.layer_id === afterElement_id)
									{ afterElement_index = layer_index; }
							});					
						
						this.example_data.layers.splice( afterElement_index + 1, 0, element);
						this.layers.splice( afterElement_index + 1, 0, element2);
						
						if(afterElement === layers_not_dragging.length - 1 )
							{ this.all_layer_containers.appendChild(draggable); }
						else
							{ this.all_layer_containers.insertBefore(draggable, layers_not_dragging[afterElement + 1].layer_container); }
						}
			}
		get_drag_after_element(container, y)
			{
				let layer_y_offset_positions = [];

				container.forEach(each=>
					{
						const box = each.layer_container.getBoundingClientRect();
						let y_offset = y - box.top - box.height / 2 ;
						layer_y_offset_positions.push(y - box.top - box.height / 2 );
					});

					const smallestPositiveIndex = layer_y_offset_positions.reduce((acc, cur, index) =>
						{
							if (cur > 0 && (acc === -1 || cur < layer_y_offset_positions[acc]))
								{ return index; }
							return acc;
						}, -1);

					return(smallestPositiveIndex)
			}
		zoom_handler(zoom_type)
			{
				if(zoom_type === 'in')
					{ this.scale = this.scale + 1; }
				else if(zoom_type === 'out')
					{ if(this.scale > 1)
						{ this.scale = this.scale - 1; }
					}
				
				this.example_data.piece_info.scale = this.scale;

				for (let i = 0; i < this.layers.length ; i++)
					{
						for (let j = 0; j < this.layers[i].segment_array.length ; j++)
							{
								this.layers[i].segment_array[j].segment.style.width = ((this.layers[i].segment_array[j].data.end_pos - this.layers[i].segment_array[j].data.start_pos ) * this.scale) + (this.scale-1) +  "px";
								this.layers[i].segment_array[j].segment.style.left = (this.layers[i].segment_array[j].data.start_pos * this.scale) +  "px";
							}			
					}
				this.seek_slider.style.width = (this.file_length / this.length_padding) * this.scale + "px";
			}	
		change_opacity(e, direction)
			{
				for (let i = 0; i < this.layers.length ; i++)
					{
						for (let j = 0; j < this.layers[i].segment_array.length ; j++)
							{
								if(this.layers[i].segment_array[j].segment.classList.contains("segment_selected"))
									{
										let new_saturation_value = (e.target.value/GLOBAL_presence_scale).toFixed(1);
										let formated_color_value;
										// set the sliders to the value of the first layer/segment selected
										
										if(this.presence_slider_end.disabled === true)
											{
												let color_value = this.layers[i].segment_array[j].data.color.split(", ")[1].slice(0,-4);
												let new_color_value = color_value + new_saturation_value + ")";
												formated_color_value = "linear-gradient(to right, " + new_color_value + ", " + new_color_value + ")";									
												this.layers[i].segment_array[j].data.start_presence = parseInt(e.target.value);
												this.layers[i].segment_array[j].data.end_presence = parseInt(e.target.value);
											}
										else
											{
												if(direction === "start")
													{
														let color_value = this.layers[i].segment_array[j].data.color.split(", ")[1].slice(0,-4);
														let ending_color = this.layers[i].segment_array[j].data.color.split(", ")[2];
														let new_color_value = color_value + new_saturation_value + ")";
														formated_color_value = "linear-gradient(to right, " + new_color_value + ", " + ending_color;
														this.layers[i].segment_array[j].data.start_presence = parseInt(e.target.value);
													}
												else if(direction === "end")
													{	
														let color_value = this.layers[i].segment_array[j].data.color.split(", ")[2].slice(0,-5);
														let starting_color = this.layers[i].segment_array[j].data.color.split(", ")[1];
														let new_color_value = color_value + new_saturation_value + "))";
														formated_color_value = "linear-gradient(to right, " + starting_color + ", " + new_color_value;
														this.layers[i].segment_array[j].data.end_presence = parseInt(e.target.value);
													}		
											}

										this.layers[i].segment_array[j].data.color = formated_color_value;
										this.layers[i].segment_array[j].segment.style.background =  formated_color_value;
										this.layers[i].segment_array[j].data.styles.background = formated_color_value;
									}
							}			
					}
			}
		start_youtube_activity_setup()
			{
				this.example_data.piece_info.media_type = "youtube";
				this.activity_type = 'youtube_link';
				let youtube_url = 'Paste URL here';

				const url_prompt_backdrop = createNewElement({type: "div", classes: ["url_prompt_backdrop"], parent: document.body});
				const url_prompt_box_container = createNewElement({type: "div", classes: ["url_prompt_box_container"], parent: document.body});
				const url_prompt_box_top = createNewElement({type: "div", classes: ["url_prompt_box_top"], parent: url_prompt_box_container, properties:{innerText : "Paste a YouTube URL below"}});
				const url_prompt_box_middle = createNewElement({type: "div", classes: ["url_prompt_box_middle"], parent: url_prompt_box_container});
				const url_prompt_input_box = createNewElement({type: "input", classes: [], parent: url_prompt_box_middle,  properties: { id: "url_prompt_input_box", innerText : "Paste a YouTube URL below", type : "text", placeholder: "Paste URL here" }});
				const url_prompt_submit_button = createNewElement({type: "button", classes: [], parent: url_prompt_box_middle,  properties: { id: "url_prompt_submit_button", innerText : "Start" }});
				const url_prompt_box_bottom = createNewElement({type: "div", classes: ["url_prompt_box_bottom"], parent: url_prompt_box_container});

				if (developing === true) 
					{
						youtube_url = 'https://youtu.be/oIIxlgcuQRU';
						this.example_data.piece_info.video_id = this.youtube_parser(youtube_url);
						this.loaded_file_name_label = this.example_data.piece_info.video_id;
						setup_youtube_player();

						url_prompt_backdrop.style.display = "none";
						url_prompt_box_container.style.display = "none";
					}

				url_prompt_submit_button.addEventListener('click', e=>
					{   
						let breakout = false;
						youtube_url = url_prompt_input_box.value;

						if(breakout === false)
							{
								this.example_data.piece_info.video_id = this.youtube_parser(youtube_url);
								console.log("YouTube ID: " + this.example_data.piece_info.video_id);
								if(this.example_data.piece_info.video_id !== false)
									{ breakout = true; }
								else
									{alert("That URL was invalid. Please enter a valid YouTube URL. You entered: " + youtube_url);}
							}
								
						if(breakout === true)
							{
								this.loaded_file_name_label = this.example_data.piece_info.video_id;
								setup_youtube_player();

								url_prompt_backdrop.style.display = "none";
								url_prompt_box_container.style.display = "none";
							}
					});

				url_prompt_input_box.focus();
				this.activity_selection_container.style.display = "none";
			}
		start_audio_file_activity_setup(sent_url)
			{
				this.example_data.piece_info.media_type = "audio_file";
				this.activity_type = 'audio_file';
			
				this.open_audio_button = createNewElement({type: 'input', classes: ["open_audio_button"], parent: document.body, properties: {innerText: "Choose Audio File", type: "file", name: "open_audio_button"} });
				this.open_audio_button.addEventListener('change', () => this.get_user_audio_file('nothing') );

				this.open_file_trigger_button = createNewElement({type: "button", classes: ["interface_button"], parent: document.body, properties: {innerText: "Choose Audio File 2"}});
				this.open_file_trigger_button.addEventListener('click', () => this.open_audio_button.click() );
				this.loaded_file_name_label = createNewElement({type: "div", classes: ["interface_button"], parent: document.body, properties: {innerText: "(no audio file loaded)"}});

				if ( developing === true && location.hostname.includes("localhost"))
					{
						this.get_user_audio_file('nothing');
						this.open_audio_button.style.display = "none";
						this.open_file_trigger_button.display = "none";
					}
			}
		get_user_audio_file(sent_url)
			{
				this.activity_selection_container.style.display = "none";
				this.uploaded_audio = createNewElement({type:"audio", classes:["user_audio"], parent: document.body, properties:{controls: true}});
				
				if ( developing === true && location.hostname.includes("localhost"))
					{          											
						// this.uploaded_audio.src = 'sheep_may_safely_graze.mp3';
						this.uploaded_audio.src = 'http://192.168.1.111/bri_former_server_sample/sheep_may_safely_graze.mp3';
					}                      
				else if(!this.open_audio_button.files.length)
					{ alert('no file selected'); }
				else
					{
						this.uploaded_audio.src = URL.createObjectURL(this.open_audio_button.files[0]);
						// don't forget to revoke the blobURI when you don't need it
						this.uploaded_audio.onend = function(e) { URL.revokeObjectURL(this.open_audio_button.src); }                                                                        
					}    
						
				this.uploaded_audio.addEventListener('loadedmetadata', () =>this.uploaded_audio_loadedmetadata_handler());						
				this.timeupdater = setInterval((e) =>  this.move_seek_slider_with_audio_position('ticking_audio') , 10);
				// originally 1000
				// if this is the initial file load - save the state to local storage
				
			}
		uploaded_audio_loadedmetadata_handler()
			{
				// this.file_length = parseInt(this.uploaded_audio.duration * this.scale);
				this.file_length = parseInt(this.uploaded_audio.duration);
				this.open_file_trigger_button.style.display = 'none';

				if(developing === true && location.hostname.includes("localhost"))
					{ this.loaded_file_name_label.innerText = this.uploaded_audio.src; }
				else
					{ this.loaded_file_name_label.innerText = this.open_audio_button.files[0].name; }

				this.start_program_after_media_loaded();
			}
		youtube_parser(url)
			{
					var i, r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

					r = url.match(rx);

					if(r === null)
							{ return false; }
					else
							{ return r[1]; }
			}			
		check_for_url_data()
			{
				let sPageURL = window.location.search.substring(1);
				if(sPageURL == "") return false;
				let sURLVariables = sPageURL.split('&');
						
				let sParameterName = sURLVariables[0].split('=');
				if (sParameterName[0] == 'activity_type') 
					{
						this.url_activity_text = sParameterName[1];
					}
			}
		setup_youtube_file_info()
			{
				this.file_length = parseInt(playerx.getDuration() * this.scale);
				this.start_program_after_media_loaded();
				this.timeupdater = setInterval((e) => this.move_seek_slider_with_audio_position('ticking_youtube') , 10);
			}
		start_program_after_media_loaded()
			{
				let random_red = Math.floor(Math.random() * (256 - 0) + 0);
				let random_green = Math.floor(Math.random() * (256 - 0) + 0);
				let random_blue = Math.floor(Math.random() * (256 - 0) + 0);
				let random_color = "rgba(" + random_red + "," + random_green + "," + random_blue + ",1.0)";

				this.seek_slider.max = this.file_length * this.audio_speed;
				this.seek_slider.value = 0;
				this.seek_slider.style.width = (this.file_length / this.length_padding) * this.scale + "px";
				this.seek_slider.style.display = 'block';

				if (this.example_data.layers.length === 0)
					{
						let initial_layer_data =
							{ name: "Layer", color: "linear-gradient(to right, " + random_color + ", " + random_color + ")", segments: [],markers:[], layer_id: 0 }	

						this.example_data.layers.push( initial_layer_data );
						this.layers.push(new Layer(this.all_layer_containers, initial_layer_data, this.file_length, this, "new_layer"));
					}
				else
					{
						this.example_data.layers.forEach((each,index)=> this.layers.push(new Layer(this.all_layer_containers, each, this.file_length, this, "load_existing_layer")) );
					}
			}
		seek_slider_moved_handler(e)
			{
				// this.slider_position = e.target.value / 10;
				this.slider_position = e.target.value / this.audio_speed;
				
				
				switch (this.activity_type)
					{
						case 'audio_file':
							// this.uploaded_audio.currentTime = this.slider_position / this.scale;
							this.uploaded_audio.currentTime = this.slider_position;
							
							if(this.uploaded_audio.paused)
								{
									//not sure why this is necessary but on iOS Safari, 
									//the currentTime changes aren't affecting the play point without this

									// Show loading animation.
									let playPromise = this.uploaded_audio.play();
									
									if (playPromise !== undefined)
										{
											playPromise.then(_ => {
												// Automatic playback started!
												// Show playing UI.
												// We can now safely pause video...
												
												this.uploaded_audio.pause();
											})
											.catch(error => {
												// Auto-play was prevented
												// Show paused UI.
											});
										}                                        
								}
							
							break;
						case 'youtube_link':
							// playerx.seekTo(this.slider_position / this.scale);
							playerx.seekTo(this.slider_position);
							break;
						default:
							//default option here
							console.log('the default option has been reached in the switch statement');
					}                    
				// this.uploaded_audio.currentTime = this.slider_position / this.scale;
			}
		move_seek_slider_with_audio_position(sender)
			{
				// console.log("move");
				// console.log(parseInt(this.uploaded_audio.currentTime * 10));
				switch (this.activity_type)
					{
						case 'audio_file':
							this.slider_position = parseInt(this.uploaded_audio.currentTime);
							this.seek_slider.value = parseInt(this.uploaded_audio.currentTime * this.audio_speed);		
							break;
						case 'youtube_link':
							this.seek_slider.value = parseInt(playerx.getCurrentTime() * this.audio_speed);
							this.slider_position = parseInt(playerx.getCurrentTime());
							console.log("playerx.getCurrentTime(): " + playerx.getCurrentTime());
							console.log("this.slider_position: " + this.slider_position);
							let current_active_element = document.activeElement;
							if(lastActiveElement !== current_active_element)
								{
									if(current_active_element.id === "player")
										{ document.getElementById("player").style.boxShadow = "0 0 10px crimson"; }
									else
										{ document.getElementById("player").style.boxShadow = "0 0 10px black"; }
									lastActiveElement = document.activeElement;
								}
							break;
						default:
							//default option here
							console.log('the default option has been reached in the switch statement');
					}
				
				// this.seek_slider.value = this.slider_position;				
				
				// let current_time;
				// current_time = parseFloat( (this.slider_position / this.length_padding).toFixed(2)) ;
			}
		add_layer_handler()
			{
				let random_red = Math.floor(Math.random() * (256 - 0) + 0);
				let random_green = Math.floor(Math.random() * (256 - 0) + 0);
				let random_blue = Math.floor(Math.random() * (256 - 0) + 0);
				this.layer_id_pos++;
				this.example_data.piece_info.layer_id_pos = this.layer_id_pos;
			
				let random_color = "rgba(" + random_red + "," + random_green + "," + random_blue + ",1.0)";	

				let new_initial_layer_data =
					{ name: "Layer", color: "linear-gradient(to right, " + random_color + ", " + random_color + ")", segments: [], markers:[], layer_id: this.layer_id_pos }

				this.example_data.layers.push( new_initial_layer_data );
				// this.layers.push(new Layer(this.all_layer_containers, new_initial_layer_data, this.file_length/this.scale, this, "new_layer"));
				this.layers.push(new Layer(this.all_layer_containers, new_initial_layer_data, this.file_length, this, "new_layer"));
			}
		delete_layer(sent_layer_id)
			{
				let layer_id = sent_layer_id;
				let layer_index = -1;
				this.example_data.layers.forEach((each,index)=>
					{
						if(each.layer_id === layer_id)
							{
								layer_index = index;
							}
					});

				this.example_data.layers.splice(layer_index,1);
				this.layers[layer_index].layer_container.remove();
				this.layers.splice(layer_index,1);
			}
		split_selected_segment()
			{
				// let start = this.slider_position * this.scale;
				let start = this.slider_position;
				
				this.layers.forEach(each_layer=>
					{
						if(each_layer.selected === true)
							{
								// this.slider_position / this.scale
								each_layer.create_segment(start, -1, GLOBAL_presence_scale, GLOBAL_presence_scale);
							}
					});
			}
		merge_segments(e, direction)
			{
				let left_position_to_search_for = -1;
				let width_to_add_to_merging_segment = -1;

				for (let i = 0; i < this.layers.length ; i++)
					{
						for (let j = 0; j < this.layers[i].segment_array.length ; j++)
							{
								let each_segment = this.layers[i].segment_array[j];
								
								if(direction === "left")
									{ left_position_to_search_for = this.layers[i].layer_data.segments[j].start_pos; }
								else if(direction === "right")
									{ left_position_to_search_for = this.layers[i].layer_data.segments[j].end_pos; }
								
								width_to_add_to_merging_segment = this.layers[i].layer_data.segments[j].end_pos - this.layers[i].layer_data.segments[j].start_pos;
									
								if(each_segment.segment.classList.contains("segment_selected"))
									{
										if(this.layers[i].layer_data.segments[j].start_pos === 0 && this.layers[i].layer_data.segments[j].end_pos === this.file_length)
											{
												alert("Layers must have at least 1 segment. You can't delete this one.");
												return false;
											}
										else if(direction === "left" && this.layers[i].layer_data.segments[j].start_pos === 0)
											{
												alert("There is no layer to the left of this one to merge with.");
												return false;
											}
										else if(direction === "right" && this.layers[i].layer_data.segments[j].end_pos === this.file_length)
											{
												alert("There is no layer to the right of this one to merge with.");
												return false;
											}											

										delete this.layers[i].segment_array[j].data;
										this.layers[i].segment_array[j].segment.remove();
										this.layers[i].segment_array.splice(j,1);
										this.layers[i].layer_data.segments.splice(j,1);

										for (let k = 0; k < this.layers[i].segment_array.length ; k++)
											{
												let proceed_with_deletion = false;
												let width_new = -1;

												if(direction === "left")
													{
														if(this.layers[i].layer_data.segments[k].end_pos === (left_position_to_search_for -1))
															{
																proceed_with_deletion = true;
																width_new = (this.layers[i].layer_data.segments[k].end_pos - this.layers[i].layer_data.segments[k].start_pos) + width_to_add_to_merging_segment + 1;
															}
													}
												else if(direction === "right")
													{
														if(this.layers[i].layer_data.segments[k].start_pos === (left_position_to_search_for + 1))
															{
																proceed_with_deletion = true;
																width_new = (this.layers[i].layer_data.segments[k].end_pos - this.layers[i].layer_data.segments[k].start_pos) + width_to_add_to_merging_segment + 1;
															}
													}

												if(proceed_with_deletion === true)
													{
                            this.layers[i].segment_array[k].segment.animate(
															[  // keyframes
																	{ width: this.layers[i].segment_array[k].segment.style.width  },
																	{ width: (width_new * this.scale) + "px"}
															], 
															{ duration: 500, iterations: 1 } );  

														this.layers[i].segment_array[k].segment.style.width = (width_new * this.scale) + "px";

														if(direction === "left")
															{
																this.layers[i].layer_data.segments[k].end_pos = this.layers[i].layer_data.segments[k].end_pos + width_to_add_to_merging_segment + 1;
															}
														else if(direction === "right")
															{
																this.layers[i].layer_data.segments[k].start_pos = this.layers[i].layer_data.segments[k].start_pos - width_to_add_to_merging_segment - 1;
																this.layers[i].segment_array[k].segment.style.left = this.layers[i].layer_data.segments[k].start_pos + "px";
															}
													}
											}												
									}
							}					
					}
			}
		delete_button_handler(e)
			{
				for (let i = 0; i < this.layers.length ; i++)
					{
						for (let j = 0; j < this.layers[i].segment_array.length ; j++)
							{
								if(this.layers[i].segment_array[j].segment.classList.contains("segment_selected"))
									{
										let new_saturation_value = (e.target.value/GLOBAL_presence_scale).toFixed(1);
										let formated_color_value;										
										let color_value = this.layers[i].segment_array[j].data.color.split(", ")[1].slice(0,-4);
										let new_color_value = color_value + new_saturation_value + ")";
										formated_color_value = "linear-gradient(to right, " + new_color_value + ", " + new_color_value + ")";									
										this.layers[i].segment_array[j].data.start_presence = parseInt(e.target.value);
										this.layers[i].segment_array[j].data.end_presence = parseInt(e.target.value);

										this.layers[i].segment_array[j].data.color = formated_color_value
										this.layers[i].segment_array[j].segment.style.background =  formated_color_value;
										this.layers[i].segment_array[j].data.styles.background = formated_color_value;
									}
							}			
					}
			}
		add_marker()
			{
				alert("I don't do anything!");
			}
		save_to_file()
			{
				// let save_all = JSON.stringify(this.example_data);
				let save_all = this.example_data;
				let file_name = "auralayer_analysis.auralayer";

				// if(project.diagram_title.innerHTML == "") file_name = "untitled_briform_file.auralayer";
				// else file_name = project.diagram_title + ".auralayer";

				let element = document.createElement('a');
				let export_data = JSON.stringify(save_all, null, 2); // put data in me first
				
				element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(export_data));
				element.setAttribute('download', file_name);
				element.style.display = 'none';
				document.body.appendChild(element);
				element.click();
				document.body.removeChild(element);
			}			
		request_file_from_user(event)
			{
				// IMPORT - Read from File
				const input = event.target;

				if('files' in input && input.files.length > 0)
					{ 
						return readFileContent(input.files[0])
						.then( data_from_file => this.load_from_file(data_from_file) ) 
						.catch(error => console.log(error)
						);
					}

				function readFileContent(file)
					{
						const reader = new FileReader();
						return new Promise( (resolve, reject) => {
						reader.onload = event => resolve(event.target.result);
						reader.onerror = error => reject(error);
						reader.readAsText(file);
						});
					}    
			}
		load_from_file(data)
			{
				this.example_data = JSON.parse(data);
				this.scale = this.example_data.piece_info.scale;
				this.layer_id_pos = this.example_data.piece_info.layer_id_pos;
				
				if(this.example_data.piece_info.media_type === "youtube")
					{
						this.start_youtube_activity_setup()
					}
				else if (this.example_data.piece_info.media_type === "audio_file")
					{
						this.start_audio_file_activity_setup()
					}
			}
  }

project = new Auralayer();

// function createNewElement(type, classes, parent, props)
function createNewElement(data)
  {
    const new_element = document.createElement(data.type);
    data.classes.forEach(each=>new_element.classList.add(each));
    
    for (const key in data.styles)
      {
				if(key === "width" && data.classes.includes("segment"))
					{
						new_element.style.width = "0px";
						new_element.animate(
							[  // keyframes
									{ width: new_element.style.width  },
									{ width: data.styles[key]}
							], 
							{ duration: 500, iterations: 1 } );  
					}

				new_element.style[key] = data.styles[key];		
      }

		for (const key in data.properties)
      { new_element[key] = data.properties[key]; }		

		data.parent.appendChild(new_element);

    return new_element;
  }

// eventually, start by loading a pre-existing json file
// or construct a new object with a single layer to start with


// YOUTUBE STUFF

function setup_youtube_player()
	{
		let tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}


// if this script was in the HTML file "function onYouTubeIframeAPIReady()" would work, but since it's not
// "window.onYouTubeIframeAPIReady = function()" has to be used instead
// function onYouTubeIframeAPIReady()
window.onYouTubeIframeAPIReady = function()
	{
		let youtube_player = document.createElement('div');
		youtube_player.id = 'player';

		document.body.appendChild(youtube_player);

		playerx = new YT.Player('player', 
		{
			height: '390',
			width: '640',
			videoId: project.example_data.piece_info.video_id,
			events: 
				{
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange
				},
			origin: 'http://localhost' 
		});
	}       
function onPlayerReady(event)
	{
		console.log('onPlayerReady called');
		if(event.target.playerInfo.duration === 0)
			{
				console.log("The YouTube video has a duration of 0 which means there was a problem. The interface will not be loaded in instances like these.");
			}
		else
			{
				project.setup_youtube_file_info();
			}
	}
function onPlayerStateChange(event)
	{
		youtube_player_state = event.data;
		project.move_seek_slider_with_audio_position('youtube_statechange');
		
		if(project.iframe_embed === true)
			{
				playerx.g.classList.remove("small_youtube_video_for_iframes");
			}
	}  