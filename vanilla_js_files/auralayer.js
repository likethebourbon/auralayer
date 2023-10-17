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



			// -----------------------------------
			//      TEXTURES
			// -----------------------------------  

				// this.layer_texture_picker = createNewElement({type:"button", classes: ["layer_texture_picker", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {innerText: "texture"}, styles: {display: "none"}});
				// this.layer_texture_picker.addEventListener("click", e=>this.layer_texture_picker_handler(e));
				// this.texture_selector = createNewElement({type:'div', classes: ["texture_selector", "layer_controls_elements"], parent: this.parent_container, styles: {display: "none"}} );

				// this.shape_background_texture_1 = createNewElement({ type: 'button', classes: ['shape_background_texture_1'], parent: this.texture_selector, styles:{background:'url(images/pattern_horizontal_lines.png)'}, properties: {title: "Horizontal_Lines"}});
				// this.shape_background_texture_2 = createNewElement({ type: 'button', classes: ['shape_background_texture_2'], parent: this.texture_selector, styles:{background:'url(images/pattern_dots_1.png)'}, properties: {title: "Dots_1"}});
				// this.shape_background_texture_3 = createNewElement({ type: 'button', classes: ['shape_background_texture_3'], parent: this.texture_selector, styles:{background:'url(images/pattern_dots_2.png)'}, properties: {title: "Dots_2"}});
				// this.shape_background_texture_4 = createNewElement({ type: 'button', classes: ['shape_background_texture_4'], parent: this.texture_selector, styles:{background:'url(images/pattern_vertical_lines_1.png)'}, properties: {title: "Vertical_Lines 1"}});
				// this.shape_background_texture_5 = createNewElement({ type: 'button', classes: ['shape_background_texture_5'], parent: this.texture_selector, styles:{background:'url(images/pattern_vertical_lines_2.png)'}, properties: {title: "Vertical_Lines 2"}});
				// this.shape_background_texture_6 = createNewElement({ type: 'button', classes: ['shape_background_texture_6'], parent: this.texture_selector, styles:{background:'url(images/pattern_diagonal_line_1.png)'}, properties: {title: "Diagonal_Line 1"}});
				// this.shape_background_texture_7 = createNewElement({ type: 'button', classes: ['shape_background_texture_7'], parent: this.texture_selector, styles:{background:'url(images/pattern_diagonal_line_2.png)'}, properties: {title: "Diagonal_Line 2"}});
				// this.shape_background_texture_8 = createNewElement({ type: 'button', classes: ['shape_background_texture_8'], parent: this.texture_selector, styles:{background:'url(images/pattern_circle_1.png)'}, properties: {title: "Circle_1"}});
				// this.shape_background_texture_9 = createNewElement({ type: 'button', classes: ['shape_background_texture_9'], parent: this.texture_selector, styles:{background:'url(images/pattern_circle_2.png)'}, properties: {title: "Circle_2"}});


				// this.shape_background_texture_1.addEventListener('click', e=>this.create_layer_background_texture(e));
				// this.shape_background_texture_2.addEventListener('click', e=>this.create_layer_background_texture(e));
				// this.shape_background_texture_3.addEventListener('click', e=>this.create_layer_background_texture(e));
				// this.shape_background_texture_4.addEventListener('click', e=>this.create_layer_background_texture(e));
				// this.shape_background_texture_5.addEventListener('click', e=>this.create_layer_background_texture(e));
				// this.shape_background_texture_6.addEventListener('click', e=>this.create_layer_background_texture(e));
				// this.shape_background_texture_7.addEventListener('click', e=>this.create_layer_background_texture(e));
				// this.shape_background_texture_8.addEventListener('click', e=>this.create_layer_background_texture(e));
				// this.shape_background_texture_9.addEventListener('click', e=>this.create_layer_background_texture(e));
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
				this.parent.save_state();
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
				this.parent.save_state();
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
						this.segment_array.push(new Segment(this, end, this.layer_data.segments, sent_segment.color, this.layer_segment_holder, this.parent.PresenceSliderStart, this.parent.PresenceSliderEnd, start_presence, end_presence, sent_segment));
					}
				else if(this.mode === "new_layer")
					{
						// this.segment_array.push(new Segment(this, this.parent.file_length, this.layer_data.segments, this.layer_data.color, this.layer_segment_holder, this.parent.PresenceSliderStart, this.parent.PresenceSliderEnd, start_presence, end_presence));
						this.segment_array.push(new Segment(this, this.parent_file_length, this.layer_data.segments, this.layer_data.color, this.layer_segment_holder, this.parent.PresenceSliderStart, this.parent.PresenceSliderEnd, start_presence, end_presence));
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
							
						this.segment_array.push(new Segment(this, old_end_pos_of_current_segment, this.layer_data.segments, this.layer_data.color, this.layer_segment_holder, this.parent.PresenceSliderStart, this.parent.PresenceSliderEnd, start_presence, end_presence));
					}
				this.parent.save_state();				
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
				this.PresenceSliderStart = sent_presence_slider_start;
				this.PresenceSliderEnd = sent_presence_slider_end;

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
				this.parent.parent.save_state();
			}
		click_handler()
			{
				// shift is not being held, then only allow one segment to be selected at a time
				let deselect = false;
				deselect = this.segment.classList.contains("segment_selected");
				if(shift_down === false)
					{
						// this.parent.parent.Body.querySelectorAll(".segment_selected").forEach(each=>each.classList.remove("segment_selected"));
						this.parent.parent.BodyContainer.querySelectorAll(".segment_selected").forEach(each=>each.classList.remove("segment_selected"));
					}

				if(deselect === true)
					{
						this.segment.classList.remove("segment_selected");
						if(this.data.classes.includes("segment_selected"))
							{
								this.data.classes.splice(this.data.classes.indexOf("segment_selected"));
							}
						this.PresenceSliderStart.value = GLOBAL_presence_scale;
						this.PresenceSliderEnd.value = GLOBAL_presence_scale;
					}
				else
					{
						this.segment.classList.add("segment_selected");						
						let first_color_saturation_value = this.data.color.split(", ")[1].slice(-4).slice(0,3);
						let second_color_saturation_value = this.data.color.split(", ")[2].slice(-5).slice(0,3)
						this.PresenceSliderStart.value = parseInt(first_color_saturation_value * GLOBAL_presence_scale); 
						this.PresenceSliderEnd.value = parseInt(second_color_saturation_value * GLOBAL_presence_scale);
						this.data.start_presence = parseInt(this.PresenceSliderStart.value);
						this.data.end_presence = parseInt(this.PresenceSliderEnd.value);
					}
			}
	}
class Auralayer
  {
    constructor()
      {
				this.url_activity_text;
				this.color_count = 0;
				this.layer_id_pos = 0;
				this.undo_now = false;
				this.save_array = [];
				this.save_position = 0;
				this.colors = ["95,70,128","212,129,46","189,88,69","227,177,60","53,103,146","88,164,164","59,131,88","127,174,86"];
				this.layers = [];
				this.example_data = example_data;
				if(Object.keys(this.example_data).length === 0)
					{ this.example_data = { piece_info: { media_type: "none", name: "new_auralayer", layer_id_pos: 0, scale: 1 }, layers: [] }}
				// this.save_state();
				this.scale = 3;
				this.audio_speed = 10;
				this.dragged_layer = -1;
				this.length_padding = GLOBAL_length_padding;
				this.create_activity_selection_interface();
				this.check_for_url_data();				
        this.initialize_interface();				
      }
		create_activity_selection_interface()
			{
				this.ActivitySelectionContainer = createNewElement({type: "div", classes:["ActivitySelectionContainer"], parent: document.body});
				this.ActivitySelectionHeader = createNewElement({type:"div", classes:["ActivitySelectionHeader"], parent: this.ActivitySelectionContainer, properties:{innerText : "Auralayer"}});
				this.ActivitySelectionBody = createNewElement({type:"div", classes:["ActivitySelectionBody"], parent: this.ActivitySelectionContainer });
				this.ActivitySelectionFooter = createNewElement({type:"div", classes:["ActivitySelectionFooter"], parent: this.ActivitySelectionContainer });

				this.NewAuralayerFromYoutubeContainer = createNewElement({type: "div", classes:["NewAuralayerFromYoutubeContainer", "ActivityButtonContainer"], parent: this.ActivitySelectionBody});
				this.NewAuralayerFromYoutubeButton = createNewElement({type: "button", classes:["NewAuralayerFromYoutubeButton", "btn", "btn-outline-primary"], parent: this.NewAuralayerFromYoutubeContainer, properties:{innerText : "Create"}});				
				this.NewAuralayerFromYoutubeDescription = createNewElement({type: "div", classes:["NewAuralayerFromYoutubeDescription"], parent: this.NewAuralayerFromYoutubeContainer, properties:{innerText : "Create a new Auralayer using a YouTube link"}});
				this.NewAuralayerFromYoutubeButton.addEventListener("click", e=>{this.StartYoutubeActivitySetup()});
				
				this.NewAuralayerFromAudioFileContainer = createNewElement({type: "div", classes:["NewAuralayerFromAudioFileContainer", "ActivityButtonContainer"], parent: this.ActivitySelectionBody});
				this.NewAuralayerFromAudioFileButton = createNewElement({type: "button", classes:["NewAuralayerFromAudioFileButton", "btn", "btn-outline-primary"], parent: this.NewAuralayerFromAudioFileContainer, properties:{innerText : "Create"}});
				this.NewAuralayerFromAudioFileDescription = createNewElement({type: "div", classes:["NewAuralayerFromAudioFileDescription"], parent: this.NewAuralayerFromAudioFileContainer, properties:{innerText : "Create a new Auralayer using an audio file on your device"}});
				this.NewAuralayerFromAudioFileButton.addEventListener("click", e=>this.StartAudioFileActivitySetup());

				this.OpenExistingAuralayerFromFileContainer = createNewElement({type: "div", classes:["OpenExistingAuralayerFromFileContainer", "ActivityButtonContainer"], parent: this.ActivitySelectionBody});
				this.OpenExistingAuralayerFromFileButton = createNewElement({type: "button", classes:["OpenExistingAuralayerFromFileButton", "btn", "btn-outline-primary"], parent: this.OpenExistingAuralayerFromFileContainer, properties:{innerText : "Open"}});
				this.OpenExistingAuralayerFromFileDescription = createNewElement({type: "div", classes:["OpenExistingAuralayerFromFileDescription"], parent: this.OpenExistingAuralayerFromFileContainer, properties:{innerText : "Open an existing Auralayer analysis from an auralayer file"}});
				this.OpenExistingAuralayerFromFileButton.addEventListener("click", e => this.ImportFromFile.click());

				this.ImportFromFile = createNewElement({type:'input', classes:["InterfaceButton"], parent: document.body, properties:{type:'file'}, styles:{display:'none'}});
				this.ImportFromFile.addEventListener('change', e=>this.RequestFileFromUser(e));
			
				this.NewAuralayerFromAudioFileWithAbsoluteURL_Container = createNewElement({type: "div", classes:["NewAuralayerFromAudioFileWithAbsoluteURL_Container", "ActivityButtonContainer"], parent: this.ActivitySelectionBody, styles: {display: "none"}});
				this.NewAuralayerFromAudioFileWithAbsoluteURL_Button = createNewElement({type: "button", classes:["NewAuralayerFromAudioFileWithAbsoluteURL_Button", "btn", "btn-outline-primary"], parent: this.NewAuralayerFromAudioFileWithAbsoluteURL_Container, properties:{innerText : "Create"}});
				this.NewAuralayerFromAudioFileWithAbsoluteURL_Description = createNewElement({type: "div", classes:["NewAuralayerFromAudioFileWithAbsoluteURL_Description"], parent: this.NewAuralayerFromAudioFileWithAbsoluteURL_Container, properties:{innerText : "Create a new Auralayer using an absolute URL"}});
				if(location.hostname.includes("localhost")) { this.NewAuralayerFromAudioFileWithAbsoluteURL_Container.style.display = "flex";}
			}
    initialize_interface()
      {
        this.AuralayerProgram = createNewElement({type:"div", classes: ["AuralayerProgram"], parent: document.body});

			// -----------------------------------
			//      MAIN INTERFACE COMPONENTS
			// -----------------------------------        
        this.Header = createNewElement({type:"header", classes: ["Header_al"], parent: this.AuralayerProgram});
        // this.Body = createNewElement({type:"main", classes: ["Body_al", "d-flex", "flex-nowrap"], parent: this.AuralayerProgram});
				this.Body = createNewElement({type:"main", classes: ["Body_al"], parent: this.AuralayerProgram});
        this.Footer = createNewElement({type:"footer", classes: ["Footer_al"], parent: this.AuralayerProgram});
        // this.LeftOuterColumn = createNewElement({type:"div", classes: ["LeftOuterColumn"], parent: this.AuralayerProgram});
				// this.RightOuterColumn = createNewElement({type:"div", classes: ["RightOuterColumn"], parent: this.AuralayerProgram});

			// -----------------------------------
			//      HEADER COMPONENTS
			// -----------------------------------
				this.HeaderContainer = createNewElement({type: "div", classes:["container-xl"], parent: this.Header});
				this.HeaderRow = createNewElement({type: "div", classes:["d-flex", "flex-row", "my-1", "justify-content-stretch"], parent: this.HeaderContainer});
				this.HeaderRowLeft = createNewElement({type: "div", classes:["col-1"], parent: this.HeaderRow});
				this.HeaderRowRight = createNewElement({type: "div", classes:["col-10", "text-center"], parent: this.HeaderRow, properties:{id: "page-header"}});

				this.HeaderTitle = createNewElement({type: "h1", classes:["text-primary", "fw-light"], parent: this.HeaderRowRight, properties:{innerText: "Auralayer"}});

				this.HeaderSettingsGearButton = createNewElement({type:"button", classes: ["btn", "btn-outline-secondary", "border-0"], parent: this.HeaderRowLeft, properties:{innerHTML: `<i class="bi-gear-fill"></i>`, type:"button"}, dataset:{bsToggle: "offcanvas", bsTarget: "#offcanvasExample"}, attributes: {"aria-controls" : "offcanvasExample"}});

				this.HeaderSettingsMenu = createNewElement({type:"div", classes:["offcanvas", "offcanvas-start"], parent: this.HeaderRowLeft, properties:{id:"offcanvasExample", tabIndex: "-1"}, attributes:{"aria-labelledby": "Settings"}});

				this.HeaderSettingsMenuHeader = createNewElement({type:"div", classes:["offcanvas-header"], parent: this.HeaderSettingsMenu});
				this.HeaderSettingsMenuHeaderTitle = createNewElement({type: "h5", classes: ["offcanvas-title"], parent: this.HeaderSettingsMenuHeader, properties:{innerText: "Settings", id: "Settings"}});

				this.HeaderSettingsMenuHeaderCloseButton = createNewElement({type: "button", classes:["btn-close"], parent: this.HeaderSettingsMenuHeader, properties:{type:"button"}, attributes:{"aria-label": "Close"}, dataset:{ bsDismiss: "offcanvas"}});

				this.HeaderSettingsMenuBody = createNewElement({type:"div", classes:["offcanvas-body"], parent: this.HeaderSettingsMenu});


				this.SegmentDecresendoSelectContainer = createNewElement({type: "p", classes:["SegmentDecresendoSelectContainer"], parent: this.HeaderSettingsMenuBody});

				this.SegmentDecresendoSelectLabel = createNewElement({type:"label", classes:[], parent:this.SegmentDecresendoSelectContainer, properties:{innerText: "Segment decrescendo", htmlFor: "decrescendo"}});
				this.SegmentDecresendoSelectBox = createNewElement({type:"select", classes:["form-select"], parent:this.SegmentDecresendoSelectContainer, attributes:{"aria-label": "Segment decrescendo"}});
				this.SegmentDecresendoSelectBoxOption1 = createNewElement({type:"option", classes:[], parent:this.SegmentDecresendoSelectBox, properties:{value:"1", innerText:"Gradient"}, attributes:{selected: true}});
				this.SegmentDecresendoSelectBoxOption2 = createNewElement({type:"option", classes:[], parent:this.SegmentDecresendoSelectBox, properties:{value:"2", innerText:"Slope"}});


				this.SegmentColorPaletteSelectContainer = createNewElement({type: "p", classes:["SegmentColorPaletteSelectContainer"], parent: this.HeaderSettingsMenuBody});
				
				this.SegmentColorPaletteSelectLabel = createNewElement({type:"label", classes:[], parent:this.SegmentColorPaletteSelectContainer, properties:{innerText: "Segment color palette", htmlFor: "palette"}});
				this.SegmentColorPaletteSelectBox = createNewElement({type:"select", classes:["form-select"], parent:this.SegmentColorPaletteSelectContainer, attributes:{"aria-label": "Color palette"}});
				this.SegmentColorPaletteSelectBoxOption1 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"1", innerText:"Bright", selected: true}});
				this.SegmentColorPaletteSelectBoxOption2 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"2", innerText:"Dark"}});
				this.SegmentColorPaletteSelectBoxOption3 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"3", innerText:"Warm"}});
				this.SegmentColorPaletteSelectBoxOption4 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"4", innerText:"Cool"}});
				this.SegmentColorPaletteSelectBoxOption5 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"5", innerText:"Rainbow"}});
				this.SegmentColorPaletteSelectBoxOption6 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"6", innerText:"Rainbow (desaturated)"}});
				this.SegmentColorPaletteSelectBoxOption7 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"7", innerText:"Sunset"}});
				this.SegmentColorPaletteSelectBoxOption8 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"8", innerText:"Green–Black"}});
				this.SegmentColorPaletteSelectBoxOption9 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"9", innerText:"Pink–Blue"}});
				this.SegmentColorPaletteSelectBoxOption10 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"10", innerText:"Cornflower–White"}});
			


			// -----------------------------------
			//      BODY COMPONENTS (not document.body but Auralayer's body)
			// -----------------------------------
				this.BodyContainer = createNewElement({type:"div", classes:["BodyContainer", "container-xl"], parent: this.Body});
				this.UtilitiesContainer = createNewElement({type:"div", classes:["UtilitiesContainer", "row", "mx-md-5", "justify-content-between"],parent: this.BodyContainer, properties:{id:"utilites"}});
				this.AllLayerContainers = createNewElement({type:"div", classes: ["AllLayerContainers"], parent: this.BodyContainer});
				this.AllLayerContainers.addEventListener("dragover", e=> { this.dragging_handler(e) });
				this.SliderContainer = createNewElement({type: "div", classes: ["SliderContainer"], parent: this.BodyContainer});
				this.SegmentEditingContainer = createNewElement({type:"div", classes: ["SegmentEditingContainer","row", "justify-content-md-around", "align-items-center", "g-2"], parent: this.Body, properties:{id:"interface-container"}});

				

			// -----------------------------------
			//       SLIDER CONTAINER COMPONENTS
			// -----------------------------------    
				this.SeekSlider = createNewElement({type: "input", classes: ["slider", "SeekSlider" ], parent: this.SliderContainer, properties:{type: "range" }});
				this.SeekSlider.addEventListener("input", (e) => this.seek_slider_moved_handler(e));					

			// -----------------------------------
			//      LEFT OUTER COLUMN COMPONENTS
			// -----------------------------------       
				this.UndoZoomContainer = createNewElement ( {type:"div", classes:["UndoZoomContainer", "col"], parent: this.UtilitiesContainer, properties:{id: "undo-redo"} } );
				this.UndoButtonGroup = createNewElement ( {type:"div", classes:["UndoButtonGroup", "btn-group"], parent: this.UndoZoomContainer, properties:{role: "group"} } );
				this.ZoomButtonGroup = createNewElement ( {type:"div", classes:["ZoomButtonGroup", "btn-group"], parent: this.UndoZoomContainer, properties:{role: "group"} } );

				this.ZoomInButton = createNewElement({type:"button", classes:["ZoomInButton", "btn", "btn-outline-secondary", "rounded-0", "rounded-top", "border-0"], parent: this.ZoomButtonGroup, properties: {type: "button", title: "Zoom in", innerHTML:`<i class="bi-zoom-in"></i>`}});
				this.ZoomInButton.addEventListener("click", e=>{this.zoom_handler("in")});
				this.ZoomOutButton = createNewElement({type:"button", classes:["ZoomOutButton", "btn", "btn-outline-secondary", "rounded-0", "rounded-top", "border-0"], parent: this.ZoomButtonGroup, properties: {type: "button", innerHTML: `<i class="bi-zoom-out"></i>`}});
				this.ZoomOutButton.addEventListener("click", e=>{this.zoom_handler("out")});

				this.UndoButton = createNewElement({type: "button", classes:["UndoButton", "btn", "btn-outline-secondary", "rounded-0", "rounded-top", "border-0"], parent: this.UndoButtonGroup, properties: {innerText: "Undo", type:"button", title: "Undo", innerHTML: `<i class="bi-arrow-counterclockwise"></i>`}});
				this.UndoButton.addEventListener("click", e=>{this.undo_handler()});
				this.RedoButton = createNewElement({type: "button", classes:["RedoButton", "btn", "btn-outline-secondary", "rounded-0", "rounded-top", "border-0"], parent: this.UndoButtonGroup, properties: {innerText: "Redo", type:"button", title: "Redo", innerHTML: `<i class="bi-arrow-clockwise"></i>`}});
				this.RedoButton.addEventListener("click", e=>{this.redo_handler()});

			// -----------------------------------
			//    LAYER EDITING CONTAINER COMPONENTS
			// -----------------------------------    

				this.LayerEditingContainer = createNewElement({type:"div", classes:["col-md-3", "text-md-start", "text-center"], parent: this.SegmentEditingContainer, properties: {id:"new-layer"}});
				
				this.LayerEditingRow = createNewElement({type:"div", classes:["LayerEditingRow", "row", "align-items-center", "flex-nowrap"], parent: this.LayerEditingContainer, properties:{}});

				this.AddLayerRowContainer = createNewElement({type:"div", classes:["AddLayerRowContainer", "col-4"], parent: this.LayerEditingRow, properties:{}});
				this.AddLayerButton = createNewElement({type:"button", classes: ["AddLayerButton", "btn", "btn-primary"], parent: this.AddLayerRowContainer, properties: {innerHTML: `<i class="bi-plus-lg"></i>`, title: "Add new layer", type: "button"}});
				this.AddLayerButton.addEventListener("click", e=>this.add_layer_handler());			

			// -----------------------------------
			//    SEGMENT EDITING CONTAINER COMPONENTS
			// -----------------------------------        
				
				this.SegmentEditingContainer2 = createNewElement({type:"div", classes:["col-md-4", "text-center", "flex-nowrap"], parent: this.SegmentEditingContainer, properties:{id: "edit-layers"}});

				this.SplitButton = createNewElement({type:"button", classes: ["SplitButton", "btn", "btn-primary"], parent: this.SegmentEditingContainer2, properties: {innerHTML: `<i class="bi-layout-split"></i>`, type: "button", title: "Split"}});
				this.SplitButton.addEventListener('click', e=>this.split_selected_segment(e));

				this.MergeButtonGroup = createNewElement({type:"div", classes:["btn-group"], parent: this.SegmentEditingContainer2, properties:{role: "group"}});

				this.MergeLeftButton = createNewElement({type:"button", classes: ["MergeLeftButton", "btn", "btn-primary"], parent: this.MergeButtonGroup, properties: {innerHTML: `<i class="bi-box-arrow-in-left"></i>`, role: "group", type: "button", title: "Merge left"}});
				this.MergeLeftButton.addEventListener('click', e=>this.merge_segments(e,"left"));

				this.MergeRightButton = createNewElement({type:"button", classes: ["MergeRightButton", "btn", "btn-primary"], parent: this.MergeButtonGroup, properties: {innerHTML: `<i class="bi-box-arrow-in-right"></i>`, role: "group", type: "button", title: "Merge right"}});
				this.MergeRightButton.addEventListener('click', e=>this.merge_segments(e, "right"));				
				
				this.AddMarkerButton = createNewElement({type:"button", classes: ["AddMarkerButton", "btn", "btn-primary"], parent: this.MergeButtonGroup, properties: {innerHTML: `<i class="bi-bookmark-plus-fill"></i>`, role: "group", type: "button", title: "Add Marker"}});
				this.AddMarkerButton.addEventListener('click', e=>this.add_marker(e));

				this.DeleteButton = createNewElement({type:"button", classes: ["DeleteButton", "btn", "btn-danger"], parent: this.SegmentEditingContainer2, properties: {innerText: "Delete", type: "button", title: "Delete layer", innerHTML: `<i class="bi-x-lg"></i>`}});
				this.DeleteButton.addEventListener('click', e=>this.delete_button_handler(e));					

				this.ExportButtonContainer = createNewElement({type:"div", classes:["ExportButtonContainer", "col-md-2", "text-md-end", "text-center", "flex-nowrap"], parent: this.SegmentEditingContainer, properties:{id: "export"}});

				this.SaveToFileButton = createNewElement({type: "button", classes: ["SaveToFileButton", "btn", "btn-secondary"], parent: this.ExportButtonContainer, properties: {innerHTML: `<i class="bi-download"></i>`, type: "button", title:"Save Analysis to File"}, dataset:{bsToggle: "modal", bsTarget: "#download"}});
				this.SaveToFileButton.addEventListener("click", e => { this.save_to_file(); });

				this.ShareAnalysisButton = createNewElement({type:"button", classes:["ShareAnalysisButton", "btn", "btn-secondary"], parent: this.ExportButtonContainer, properties:{innerHTML: `<i class="bi-share-fill"></i>`}, dataset:{bsToggle: "modal", bsTarget: "#share"}});

				this.PresenceSliderContainer = createNewElement({type: "div", classes: ["PresenceSliderContainer", "col-7"], parent: this.LayerEditingRow, properties: {}});
				this.PresenceSliderStartLabel = createNewElement({type:"label", classes:["form-label"], parent: this.PresenceSliderContainer, properties:{for: "presence_start", innerText: "Presence (start)"}});
				this.PresenceSliderStart = createNewElement({type: "input", classes:["PresenceSliderStart", "presence_slider", "form-range"], parent: this.PresenceSliderContainer, properties:{type: "range"  , min: 0, max: GLOBAL_presence_scale, id: "presence_start"} });
				this.PresenceSliderStart.addEventListener("input",e=>this.change_opacity(e,"start"));

				this.PresenceSliderEndLabel = createNewElement({type:"label", classes:["form-label"], parent: this.PresenceSliderContainer, properties:{for: "presence_end", innerText: "Presence (end)"}});
				this.PresenceSliderEnd = createNewElement({type: "input", classes:["PresenceSliderEnd", "presence_slider", "form-range"], parent: this.PresenceSliderContainer, properties:{type: "range" , min: 0, max: GLOBAL_presence_scale, id:"presence_end",disabled: true} });
				this.PresenceSliderEnd.addEventListener("input",e=>this.change_opacity(e,"end"));

				this.PresenceLockContainer = createNewElement({type: "div", classes: ["PresenceLockContainer", "col-1", "align-items-center"], parent: this.LayerEditingRow, properties: {}});
				this.PresenceLockDiv = createNewElement({type:"div", classes:["link-presence", "text-center"], parent: this.PresenceLockContainer});

				this.PresenceSliderIndependentToggle = createNewElement({type:"input", classes: ["PresenceSliderIndependentToggle"], parent: this.PresenceLockDiv, properties: {type: "checkbox"}, styles:{display: "none"}});
				this.PresenceSliderIndependentButton = createNewElement({type:"button", classes: ["PresenceSliderIndependentButton", "btn", "active", "btn-sm"], parent: this.PresenceLockDiv, properties: {innerHTML: `<i class="bi-link-45deg"></i>`}, dataset: {bsToggle: "button"}, attributes:{"aria-pressed": "Segment decrescendo"}});
				this.PresenceSliderIndependentButton.addEventListener("click", ()=>this.PresenceSliderIndependentToggle.click());
								
				this.PresenceSliderIndependentToggle.addEventListener("change",e=>
					{
						if(this.PresenceSliderEnd.disabled === false)
							{
								this.PresenceSliderEnd.disabled = true;
								// this.PresenceSliderIndependentButton.classList.remove("PresenceSliderIndependentButtonSelected");
								
								this.PresenceSliderIndependentButton.children[0].classList.remove("bi-link");
								this.PresenceSliderIndependentButton.children[0].classList.add("bi-link-45deg");
							}
						else
							{
								this.PresenceSliderEnd.disabled = false;
								// this.PresenceSliderIndependentButton.classList.add("PresenceSliderIndependentButtonSelected");
								this.PresenceSliderIndependentButton.children[0].classList.remove("bi-link-45deg");
								this.PresenceSliderIndependentButton.children[0].classList.add("bi-link");
							}
					});

			
				this.AccordionContainer1 = createNewElement({type:"div", classes:["AccordionContainer1", "row", "text-center"], parent: this.SegmentEditingContainer, properties:{id: "collapsing"}});
					this.AccordionContainer2 = createNewElement({type:"div", classes:["AccordionContainer2", "col-md-10", "p-1", "m-auto", "my-3"], parent: this.AccordionContainer1, properties:{}});
						this.AccordionContainer3 = createNewElement({type:"div", classes:["AccordionContainer3", "accordion"], parent: this.AccordionContainer2, properties:{id: "table-video"}});
							this.DataTableContainer1 = createNewElement({type:"div", classes:["DataTableContainer1", "accordion-item"], parent: this.AccordionContainer3, properties:{}});
							this.VideoContainer1 = createNewElement({type:"div", classes:["VideoContainer1", "accordion-item"], parent: this.AccordionContainer3, properties:{}});
								this.VideoAccordionHeader = createNewElement({type:"h2", classes:["VideoAccordionHeader", "accordion-header"], parent: this.VideoContainer1, properties:{}});
									this.VideoAccordionButton = createNewElement({type:"button", classes:["VideoAccordionButton", "accordion-button", "collapsed"], parent: this.VideoAccordionHeader, properties:{type: "button", innerHTML: `<i class="bi-youtube"></i>&emsp; Media`}, dataset:{bsToggle: "collapse", bsTarget: "#collapseTwo"}, attributes:{"aria-expanded": "false", "aria-controls": "collapseTwo"}});
								this.VideoAccordionBody = createNewElement({type:"div", classes:["VideoAccordionBody", "accordion-collapse", "collapse"], parent: this.VideoContainer1, properties:{id: "collapseTwo"}, dataset:{bsParent: "#table-video"}});
									this.VideoAccordionBodyInterior = createNewElement({type:"div", classes:["VideoAccordionBodyInterior", "accordion-body", "text-center"], parent: this.VideoAccordionBody, properties:{}});
									

				// <div class="accordion-item">
				// 		<h2 class="accordion-header">
				// 				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
				// 						<i class="bi-table"></i>&emsp; Data table
				// 				</button>
				// 		</h2>
				// 		<div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#table-video">
				// 				<div class="accordion-body">
				// 						<div class="col-lg-8 offset-lg-2 table-responsive">
				// 								<table class="table">
				// 										<thead>
				// 												<tr>
				// 														<th class="col-1">ID <span style="color:#848586;">▼</span></th>
				// 														<th class="col-2">Timestamp ▼</th>
				// 														<th class="col-5">Layer <span style="color:#848586;">▼</span></th>
				// 														<th class="col-4">Presence<span style="color:#848586;">▼</span></th>
				// 												</tr>
				// 										</thead>
				// 										<tbody>
				// 												<tr>
				// 														<td>1</td>
				// 														<td><input type="number" class="form-control" value="0.0" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Rimshot</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="4"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>2</td>
				// 														<td><input type="number" class="form-control" value="2.0" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Bass Drum</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="4"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>3</td>
				// 														<td><input type="number" class="form-control" value="9.3" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Handclaps</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="4"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>4</td>
				// 														<td><input type="number" class="form-control" value="17.6" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Toms</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="4"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>5</td>
				// 														<td><input type="number" class="form-control" value="25.5" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Hi-hat closed</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="2"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>6</td>
				// 														<td><input type="number" class="form-control" value="30.7" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Rimshot</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="0"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>102</td>
				// 														<td><input type="number" class="form-control" value="30.7" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Bass Drum</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="0"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>103</td>
				// 														<td><input type="number" class="form-control" value="30.7" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Handclaps</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="0"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>104</td>
				// 														<td><input type="number" class="form-control" value="30.7" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Toms</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="0"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>105</td>
				// 														<td><input type="number" class="form-control" value="30.7" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Hi-hat closed</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="0"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>7</td>
				// 														<td><input type="number" class="form-control" value="32.0" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Hi-hat closed</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="2"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>106</td>
				// 														<td><input type="number" class="form-control" value="32.0" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Toms</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="2"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>107</td>
				// 														<td><input type="number" class="form-control" value="32.0" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Handclaps</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="4"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>108</td>
				// 														<td><input type="number" class="form-control" value="32.0" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Bass Drum</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="4"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>109</td>
				// 														<td><input type="number" class="form-control" value="32.0" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Rimshot</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="1"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>8</td>
				// 														<td><input type="number" class="form-control" value="43.2" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Snare</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="4"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>9</td>
				// 														<td><input type="number" class="form-control" value="43.6" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Snare</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="0"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>110</td>
				// 														<td><input type="number" class="form-control" value="43.6" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Hi-hat closed</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="0"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>10</td>
				// 														<td><input type="number" class="form-control" value="44.4" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Bass Drum</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="4"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>11</td>
				// 														<td><input type="number" class="form-control" value="46.5" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Toms</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="4"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>111</td>
				// 														<td><input type="number" class="form-control" value="46.5" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Bass Drum</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="3"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>112</td>
				// 														<td><input type="number" class="form-control" value="46.5" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Rimshot</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="2"></td>
				// 												</tr>
				// 												<tr>
				// 														<td>113</td>
				// 														<td><input type="number" class="form-control" value="46.5" step=".1"></td>
				// 														<td><select class="form-select">
				// 																		<option value="">Handclaps</option>
				// 																</select></td>
				// 														<td><input type="range" class="form-range"  min="0" max="4" value="3"></td>
				// 												</tr>
				// 										</tbody>
				// 								</table>
				// 						</div>
				// 				</div>
				// 		</div>
				// </div>
				// <div class="accordion-item">
				// 		<h2 class="accordion-header">
				// 				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
				// 						<i class="bi-youtube"></i>&emsp; Video
				// 				</button>
				// 		</h2>
				// 		<div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#table-video">
				// 				<div class="accordion-body text-center">
				// 						<iframe id="player" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Yeah Yeah Yeahs - Maps (Official Music Video)" src="https://www.youtube.com/embed/oIIxlgcuQRU?enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A5500&amp;widgetid=1"></iframe>
				// 				</div>
				// 		</div>
				// </div>

      }
		undo_handler()
			{
				if(this.save_position > 0)
					{
						this.undo_now = true;
						this.layers = [];						
						this.save_position--;
						console.log("save_position DECREASED to: " + this.save_position);
						this.AllLayerContainers.innerHTML = "";
						this.example_data.layers = this.save_array[this.save_position];
						console.log( this.save_array);
						this.start_program_after_media_loaded();
						this.undo_now = false;							
					}
			}
		redo_handler()
			{
				if(this.save_position < (this.save_array.length -1) )
					{
						this.undo_now = true;
						this.layers = [];
						this.save_position++;
						console.log("save_position increased to: " + this.save_position);
						this.AllLayerContainers.innerHTML = "";
						this.example_data.layers = this.save_array[this.save_position];
						this.start_program_after_media_loaded();
						this.undo_now = false;
					}				
			}
		save_state()
			{
				if(this.undo_now === false || this.save_array.length === 0)
					{
						if(this.example_data.layers.length > 0)
							{
								// let copy = this.example_data.layers.slice(0);
								let copy = JSON.parse(JSON.stringify(this.example_data.layers));
								console.log(this.example_data.layers);
								if(this.save_array.length > 0)
									{
										this.save_position++;
										console.log("save_position increased to: " + this.save_position);
									}

								if(this.save_position < (this.save_array.length - 1))
									{

									}

								if (this.save_position === this.save_array.length)
									{
										
										console.log(this.save_array);
										this.save_array.push(copy);	
										console.log(this.save_array);	
									}
								else if (this.save_position < this.save_array.length)
									{
										console.log(this.save_array);
										
										this.save_array[this.save_position] = copy;
										console.log(this.save_array);
										this.save_array.splice(this.save_position + 1);
										console.log(this.save_array);
									}
							}
						
						console.log(this.save_array);
					}
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
				const draggable = this.AllLayerContainers.querySelector(".dragging");
				
				if(afterElement === -1)
					{
						this.AllLayerContainers.insertBefore(draggable, this.AllLayerContainers.firstChild);
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
							{ this.AllLayerContainers.appendChild(draggable); }
						else
							{ this.AllLayerContainers.insertBefore(draggable, layers_not_dragging[afterElement + 1].layer_container); }
					}

				this.save_state();
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
				this.SeekSlider.style.width = (this.file_length / this.length_padding) * this.scale + "px";
				this.save_state();
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
										
										if(this.PresenceSliderEnd.disabled === true)
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

				this.save_state();
			}
		StartYoutubeActivitySetup()
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
				this.ActivitySelectionContainer.style.display = "none";
			}
		StartAudioFileActivitySetup(sent_url)
			{
				this.example_data.piece_info.media_type = "audio_file";
				this.activity_type = 'audio_file';
			
				this.open_audio_button = createNewElement({type: 'input', classes: ["open_audio_button"], parent: document.body, properties: {innerText: "Choose Audio File", type: "file", name: "open_audio_button"} });
				this.open_audio_button.addEventListener('change', () => this.get_user_audio_file('nothing') );

				this.open_file_trigger_button = createNewElement({type: "button", classes: ["InterfaceButton"], parent: document.body, properties: {innerText: "Choose Audio File 2"}});
				this.open_file_trigger_button.addEventListener('click', () => this.open_audio_button.click() );
				this.loaded_file_name_label = createNewElement({type: "div", classes: ["loaded_file_name_label", "InterfaceButton"], parent: document.body, properties: {innerText: "(no audio file loaded)"}});

				if ( developing === true && location.hostname.includes("localhost"))
					{
						this.get_user_audio_file('nothing');
						this.open_audio_button.style.display = "none";
						this.open_file_trigger_button.display = "none";
					}
			}
		get_user_audio_file(sent_url)
			{
				this.ActivitySelectionContainer.style.display = "none";
				this.uploaded_audio = createNewElement({type:"audio", classes:["user_audio"], parent: this.VideoAccordionBodyInterior, properties:{controls: true}});
				this.VideoAccordionBody.appendChild(this.loaded_file_name_label);

				if ( developing === true && location.hostname.includes("localhost"))
					{          											
						this.uploaded_audio.src = 'Puccini-Vissi_d_arte_vissi_d_amore_Tosca.mp3';
						// this.uploaded_audio.src = 'http://192.168.1.111/bri_former_server_sample/sheep_may_safely_graze.mp3';
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
				this.undo_now = true;
				let random_color = "rgba(" + this.colors[this.color_count % 8] + ",1.0)";
				this.color_count++;

				this.SeekSlider.max = this.file_length * this.audio_speed;
				this.SeekSlider.value = 0;
				this.SeekSlider.style.width = (this.file_length / this.length_padding) * this.scale + "px";
				this.SeekSlider.style.display = 'block';

				if (this.example_data.layers.length === 0)
					{
						let initial_layer_data =
						{ name: "Layer", color: "linear-gradient(to right, " + random_color + ", " + random_color + ")", segments: [],markers:[], layer_id: 0 }

						this.example_data.layers.push( initial_layer_data );
						this.layers.push(new Layer(this.AllLayerContainers, initial_layer_data, this.file_length, this, "new_layer"));
					}
				else
					{
						this.example_data.layers.forEach((each,index)=> this.layers.push(new Layer(this.AllLayerContainers, each, this.file_length, this, "load_existing_layer")) );
						console.log(this.example_data.layers);
					}

				this.undo_now = false;
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
							this.SeekSlider.value = parseInt(this.uploaded_audio.currentTime * this.audio_speed);		
							break;
						case 'youtube_link':
							this.SeekSlider.value = parseInt(playerx.getCurrentTime() * this.audio_speed);
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
				
				// this.SeekSlider.value = this.slider_position;				
				
				// let current_time;
				// current_time = parseFloat( (this.slider_position / this.length_padding).toFixed(2)) ;
			}
		add_layer_handler()
			{
				this.layer_id_pos++;
				
				this.example_data.piece_info.layer_id_pos = this.layer_id_pos;
			
				let random_color = "rgba(" + this.colors[this.color_count % 8] + ",1.0)";
				this.color_count++;

				let new_initial_layer_data =
					{ name: "Layer", color: "linear-gradient(to right, " + random_color + ", " + random_color + ")", segments: [], markers:[], layer_id: this.layer_id_pos }

				this.example_data.layers.push( new_initial_layer_data );
				this.layers.push(new Layer(this.AllLayerContainers, new_initial_layer_data, this.file_length, this, "new_layer"));
				
				let segment_height = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--segment-height'));
				let segment_margin_top = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--segment-margin-top'));
				let segment_margin_bottom = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--segment-margin-bottom'));
				
				document.documentElement.style.setProperty('--slider_thumb_height', ((segment_height + (segment_margin_top + segment_margin_bottom) ) * this.layers.length) + 50 + "px");
				
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
				this.save_state();
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
				// this.save_state();
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
				this.save_state();
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
				this.save_state();
			}
		add_marker()
			{
				alert("I don't do anything!");
				// this.save_state();
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
		RequestFileFromUser(event)
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
						this.StartYoutubeActivitySetup()
					}
				else if (this.example_data.piece_info.media_type === "audio_file")
					{
						this.StartAudioFileActivitySetup()
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
						// new_element.style.width = "0px";
						// new_element.animate(
						// 	[  // keyframes
						// 			{ width: new_element.style.width  },
						// 			{ width: data.styles[key]}
						// 	], 
						// 	{ duration: 500, iterations: 1 } );  
					}

				new_element.style[key] = data.styles[key];		
      }

		for (const key in data.properties)
      { 
				if(key === "ariaControls")
					{ new_element.setAttribute('aria-controls', data.properties[key]); }
				else
					{ new_element[key] = data.properties[key]; } }
		
		for (const key in data.dataset)
      { new_element.dataset[key] = data.dataset[key]; }
			
		for (const key in data.attributes)
      { new_element.setAttribute( key, data.attributes[key]); }					

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
			height: '195',
			width: '320',
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