let developing = true;
let youtube_player_state = -2;
let GLOBAL_length_padding = 1;
let GLOBAL_presence_scale = 10;
let project;
let playerx;
let shift_down = false;
let alt_down = false;
let ctrl_down = false;
let metakey_down = false;
let lastActiveElement = document.activeElement;
let example_data = {};

// -----------------------------------
//      Keyboard Controls
// -----------------------------------
document.addEventListener('keyup', e =>
	{
		if(project.in_text_editor === false || ( e.ctrlKey && e.key === 'b') || ( e.ctrlKey && e.key === 'i'))
			{
				// if (e.code === "ControlLeft" )
				if (e.code === "ShiftLeft")
					{
						e.preventDefault();
						shift_down = false;
					}
			}
		if (e.altKey || e.key === "Alt") {
			e.preventDefault();
			alt_down = false;
		}

		if (e.metaKey || e.key === "Meta") {
			e.preventDefault();
			metakey_down = false;
		}

		if (e.ctrlKey || e.key === "Control") {
			e.preventDefault();
			ctrl_down = false;
		}

		if (e.shiftKey || e.key === "Shift") {
			e.preventDefault();
			shift_down = false;
		}
	});
document.addEventListener('keydown', e => 
	{
		//if NOT in a textbox
				// console.log("shift: " + e.shiftKey + " - ctrl: " + e.ctrlKey + " - Key: " + e.key);
		console.log(e);
				
		if(project.in_text_editor === false || ( e.ctrlKey && e.key === 'b') || ( e.ctrlKey && e.key === 'i'))
			{
				if (e.ctrlKey && e.key === 's')
					{
						e.preventDefault();
						console.log("Saved: Ctrl + S - Key press");
						project.SaveToFileButton.click();
					}                    
				else if (  e.ctrlKey && e.key === 'z') 
					{
							
						project.UndoButton.click();
					}
				else if (  e.ctrlKey && e.key === 'y' )
					{
						console.log("redo");
						project.RedoButton.click();
					}     
				else if ( e.key === 'n')
					{
						e.preventDefault();
						project.AddLayerButton.click();
					}
				else if ( e.ctrlKey && e.key === 'b')
					{
						e.preventDefault();
						console.log("bold");
						project.TextEditingBoldButton.click();
					}
				else if ( e.ctrlKey && e.key === 'i')
					{
						e.preventDefault();
						console.log("italics");
						project.TextEditingItalicButton.click();
					}
				else if ( e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'u')
					{
						e.preventDefault();
						console.log("underline");
						project.TextEditingUnderlineButton.click();
					}    					               
				else if( e.key === 's')
					{       
						//e.preventDefault();
						if(project.view_mode_slider_top_button === false)
							{
								project.SplitButton.click();		
							}                         
					}
				else if( e.key === 'g')//g
					{       
							// if(project.view_mode_slider_top_button.checked === false)
							// 		{
							// 				project.group_combiner(e);        
							// 		}   
					}
				else if (  e.key === 'm' )
					{
							// if(project.view_mode_slider_top_button.checked === false)
							// 		{
							// 				if (project.program_version !== "0_0")
							// 						{
							// 								project.add_marker_location("");
							// 								console.log("add marker");
							// 						}
							// 		}   
					}                       
				else if( e.key === 'Escape')//escape
					{       
						project.deselect_all_layers();
						project.deselect_all_segments();
					}
				else if( e.ctrlKey && e.code === 'Space')
					{
						e.preventDefault();
						console.log("Control and Space pressed");
						// move playhead to start of selected group
						// if only one group is selected

						project.play_audio_from_beginning_of_current_selection();
					}                    
				else if( e.key === 'p' || e.code === 'Space')
					{  
						e.preventDefault();
						switch (project.activity_type)
							{
								case 'audio_file':
									if ( !project.uploaded_audio.paused   ) 
										{
											//Its playing...do your job
											console.log("playing!");
											project.pause_audio();
										} 
									else 
										{
											console.log('not playing');
											//Not playing...maybe paused, stopped or never played.
											project.play_audio();
										}    
									break;
								case 'youtube_link':
									if (youtube_player_state != YT.PlayerState.PAUSED)
										{
											playerx.g.classList.remove("small_youtube_video_for_iframes");
											playerx.pauseVideo();
										}
									else
										{
											playerx.g.classList.remove("small_youtube_video_for_iframes");
											playerx.playVideo();
										}
									
									break;
								default:
									//default option here
									console.log('the default option has been reached in the switch statement');
							}    
					}
				else if(e.metaKey && e.shiftKey) {
					e.preventDefault();
					metakey_down = true;
					shift_down = true;
				}
				else if (e.shiftKey)
					{
						e.preventDefault();
						shift_down = true;
					}
				else if (e.metaKey)
					{
						e.preventDefault();
						metakey_down = true;
						if(e.key.toLowerCase() === "a") {
							project.select_all_segments_in_layer()
						}

						if (e.shiftKey) {
							shift_down = true;
						}
						
						if (e.altKey) {
							alt_down = true;
						}
						
						if  (e.ctrlKey) {
							ctrl_down = true;
						}
					}
				else if (shift_down === true && e.key === 'ArrowRight')
						{
								//fast forward 1 seconds
								// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
								switch (project.activity_type)
												{
														case 'audio_file':
																project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + 1;
																break;
														case 'youtube_link':
																playerx.seekTo(player.getCurrentTime() + 1);
																// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
																break;
														default:
																//default option here
																console.log('the default option has been reached in the switch statement');
												}  

						}
				else if (shift_down === true && e.key === 'ArrowLeft')
						{
								//fast forward 1 seconds
								// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
								switch (project.activity_type)
												{
														case 'audio_file':
																project.uploaded_audio.currentTime = project.uploaded_audio.currentTime - 1;
																break;
														case 'youtube_link':
																playerx.seekTo(player.getCurrentTime() - 1);
																// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
																break;
														default:
																//default option here
																console.log('the default option has been reached in the switch statement');
												}  

						}                                                          
				else if (e.key === 'ArrowRight')
						{
								//fast forward 10 seconds
								// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
								switch (project.activity_type)
												{
														case 'audio_file':
																project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
																break;
														case 'youtube_link':
																playerx.seekTo(playerx.getCurrentTime() + project.skip_amount);
																// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
																break;
														default:
																//default option here
																console.log('the default option has been reached in the switch statement');
												}  

						}
				else if (e.key === 'ArrowLeft')
						{
								//go back 10 seconds
								// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime - project.skip_amount;
								switch (project.activity_type)
												{
														case 'audio_file':
																project.uploaded_audio.currentTime = project.uploaded_audio.currentTime - project.skip_amount;
																break;
														case 'youtube_link':
																playerx.seekTo(playerx.getCurrentTime() - project.skip_amount);
																// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
																break;
														default:
																//default option here
																console.log('the default option has been reached in the switch statement');
												}                  
						}            
				else if( (e.key === 'Delete' && project.analysis_master_embed === false) || (( e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') && project.analysis_master_embed === false) )
						{
								// project.DeleteButton.click();	
								// if( document.querySelector(".url_prompt_backdrop") === null || document.querySelector(".url_prompt_backdrop").style.display === "none")
								// 		{
								// 				e.preventDefault();
								// 				project.delete_selected_group(e, 'right');
								// 		}
						}
				else if( e.key === 'Backspace' && project.analysis_master_embed === false )
						{
							project.DeleteButton.click();	
								// if( document.querySelector(".url_prompt_backdrop") === null || document.querySelector(".url_prompt_backdrop").style.display === "none")
								// 		{
								// 				e.preventDefault();
								// 				project.delete_selected_group(e, 'left');
								// 		}
						}                    
				else if (e.key === '=' && project.analysis_master_embed === false)
					{
						project.ZoomInButton.click();
					}
				else if (e.key === '-' && project.analysis_master_embed === false)
					{
						project.ZoomOutButton.click();
					}
			}
	});

class Layer
  {
    constructor(sent_container, sent_layer_data, sent_file_length, sent_parent, sent_mode)
      {
        this.parent_container = sent_container;
        this.layer_data = sent_layer_data;
				this.parent = sent_parent;
				this.parent_file_length = sent_file_length;
				this.selected = false;

				if(typeof this.layer_data.show_in_table === "undefined") {this.layer_data.show_in_table = true;	}

				if(typeof this.layer_data.hide_name_in_diagram === "undefined") {this.layer_data.hide_name_in_diagram = false;	}

				this.segment_array = [];
				this.mode = sent_mode;
        this.initialize();
      }
    initialize()
      {
				let [color_value_1, color_value_2, initial_saturation_1, initial_saturation_2, urlText] = ["","","","",""];
				let initial_value = this.layer_data.color;
				
				[color_value_1, initial_saturation_1, urlText] = this.parent.GetRGBA_Values({value: initial_value, num:0});
				[color_value_2, initial_saturation_2, urlText] = this.parent.GetRGBA_Values({value: initial_value, num:1});			

				// let r = parseInt(this.layer_data.color.split("rgba(")[1].split(",")[0]).toString(16);
				// let g = parseInt(this.layer_data.color.split("rgba(")[1].split(",")[1]).toString(16);
				// let b = parseInt(this.layer_data.color.split("rgba(")[1].split(",")[2]).toString(16);

				let r = parseInt(color_value_1.replace("rgba(","").replace("rgb(","").split(",")[0]).toString(16);
				let g = parseInt(color_value_1.replace("rgba(","").replace("rgb(","").split(",")[1]).toString(16);
				let b = parseInt(color_value_1.replace("rgba(","").replace("rgb(","").split(",")[2]).toString(16);
				let presence_sync = true;

        // this.layer_container = createNewElement({type:"div", classes: ["layer_container", "draggable"], parent: this.parent_container, properties:{draggable: true}});
				this.layer_container = createNewElement({type:"div", classes: ["layer_container", "draggable"], parent: this.parent_container, properties:{draggable: false}});
						
					
        this.layer_controls_holder = createNewElement({type:"div", classes: ["layer_controls_holder"], parent: this.layer_container});
				// this.layer_controls_holder.addEventListener("click", e=> this.select_box.click());
				let width = ((((this.parent.file_length/this.parent.resolution) * this.parent.scale) - 1 ) + (this.parent.scale/this.parent.resolution) ) + "px";
        // this.layer_segment_holder = createNewElement({type:"div", classes: ["layer_segment_holder"], parent: this.layer_container, styles:{width: ((this.parent_file_length/this.parent.resolution) * this.parent.scale) + "px"}});
				this.layer_segment_holder = createNewElement({type:"div", classes: ["layer_segment_holder"], parent: this.layer_container, styles:{width: width}});

				this.layer_settings_button = createNewElement({type:"button", classes:["layer_settings_button", "btn", "btn-secondary"], parent: this.layer_controls_holder, properties:{ innerHTML: `<i class="bi bi-gear"></i>`}, styles:{display: "none"}, attributes: {title: "Layer Settings"}, events:{click: e=>{this.layer_settings_button_handler(e)}}});
				this.layer_settings_container = createNewElement({type:"div", classes:["layer_settings_container"], parent: this.layer_container, properties:{}, styles:{display: "none"}});

				this.select_box = createNewElement({type:"input", classes: ["layer_select", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {type: "checkbox"}});
				// this.select_box_selector_box = createNewElement({type:'div', classes:["select_box_selector_box"], parent: this.layer_controls_holder, properties:{}});
				// this.select_box_selector_box.addEventListener("click",e=>this.select_box.click());
				// this.color_picker = createNewElement({type:"input", classes: ["layer_color_picker", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {type: "color", value: ("#" + r + g + b)}, styles: {display: "none"}});
				
				// Here we can adjust defaults for all color pickers on page:
				
				this.color_picker_button = createNewElement({type:"button", classes: ["layer_color_picker_button", "layer_controls_elements", "btn", "btn-secondary"], parent: this.layer_settings_container, properties: { innerHTML: `<i class="bi bi-brush"></i>`}, styles: {backgroundColor: ("#" + r + g + b)}, attributes: {title: "Color Picker"}});
				this.color_picker_button.addEventListener("click",e=>{myPicker.show();})
				// this.color_picker = createNewElement({type:"input", classes: [], parent: this.layer_controls_holder, properties: { value: ("#" + r + g + b)}, styles: {display: "none"} });
				this.color_picker = createNewElement({type:"input", classes: [], parent: this.layer_controls_holder, properties: { value: ("#" + r + g + b)}, styles: {display: "none"} });

				const rgbToHex = (rgb) => '#' + rgb.map(x =>
					{
						const hex = x.toString(16)
						return hex.length === 1 ? '0' + hex : hex
					}).join('')

				let colors_hex = this.parent.colors.map(each=>rgbToHex(each.split(",").map(each=>parseInt(each))));
				var myPicker = new JSColor(this.color_picker, {format:'hexa',	palette: colors_hex});
				// var myPicker = new JSColor(this.color_picker, { paletteSetsAlpha: true, palette: colors_hex});
				
				this.color_picker.addEventListener("click", e=> { myPicker.show(); });

				// myPicker.trigger("show", e=>{debugger});

		 
				this.color_picker.addEventListener("change", e=>this.color_picker_handler(e));
				// this.color_picker.addEventListener("click", e=>this.color_picker_handler(e));
				this.color_picker.addEventListener("input", e=>this.color_picker_handler(e));
				this.color_picker.addEventListener("blur", e=> this.parent.save_state());

				this.duplicate_layer_button = createNewElement({type:"button", classes:["duplicate_layer_button", "layer_controls_elements", "btn", "btn-secondary"], parent: this.layer_settings_container, properties:{innerHTML: `<i class="bi bi-copy"></i>`}, attributes: {title: "Duplicate Layer"}});

				this.duplicate_layer_button.addEventListener("click", this.duplicate_layer.bind(this))
				

				this.delete_layer_button = createNewElement({type:"button", classes: ["delete_layer_button", "layer_controls_elements", "btn", "btn-secondary"], parent: this.layer_settings_container, properties: {innerHTML: `<i class="bi bi-trash"></i>`}, attributes: {title: "Delete Layer"}});
				this.delete_layer_button.addEventListener("click", e => this.delete_layer_button_handler());				
        // this.grip = createNewElement({type:"div", classes: ["layer_grip", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {innerHTML: "⋮⋮"}});
				// this.grip.addEventListener("click",e=>this.select_box.click());
        this.name = createNewElement({type:"div", classes: ["layer_name", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {innerHTML: this.layer_data.name, draggable: true}});
				this.name.addEventListener("dblclick", e=>{this.layer_name_double_click_handler(e)})
				this.name.addEventListener("click", e=> {	 this.select_box.click() });
				// this.name.addEventListener("dblclick", e=> this.layer_name_double_click_handler(e));
				this.name.addEventListener("input", e=> this.layer_name_input_handler(e));
				this.name.addEventListener("focus", e=>
					{
						console.log(e);
						this.name.tabIndex = 0;
						this.parent.in_text_editor = true; 
						// window.getSelection().selectAllChildren(this.name);
					});
				this.name.addEventListener("blur", e=>
					{
						this.name.contentEditable = false;
						this.name.classList.remove("layer_name_being_edited");
						this.parent.in_text_editor = false;
						if(this.layer_data.hide_name_in_diagram === false) {
							this.name.style.color = "initial";
						} else {
							this.name.style.color = "transparent";
						}
					});
				this.name.addEventListener("dragstart", e=> { this.layer_container.classList.add("dragging");	});
				this.name.addEventListener("touchstart", e=> { this.layer_container.classList.add("dragging"); });
				this.name.addEventListener("dragend", e=> 
					{
						this.layer_container.classList.remove("dragging");
						this.parent.save_state();
					});
				this.name.addEventListener("touchend", e=> 
					{
						this.layer_container.classList.remove("dragging");
						this.parent.save_state();
					});	
				this.name.addEventListener("touchcancel", e=> 
					{
						this.layer_container.classList.remove("dragging");
						this.parent.save_state();
					});		

				this.name_edit_button = createNewElement({type:"button", classes:["name_edit_button", "layer_controls_elements", "btn", "btn-secondary"], parent: this.layer_settings_container, properties:{innerHTML: `<i class="bi bi-pen"></i>`}, attributes: {title: "Edit Name"}, events:{click: e=>this.layer_name_double_click_handler(e)}});



				this.select_box.addEventListener("change", e => this.select_changed(e));

				if(this.layer_data.segments.length === 0)
					{ this.create_segment(0, -1, GLOBAL_presence_scale, GLOBAL_presence_scale, presence_sync, {}); }
				else
					{
						this.layer_data.segments.forEach(each=>this.create_segment(each.start_pos, each.end_pos, each.start_presence, each.end_presence, each.presence_sync, each)); 
						// this.layer_data.segments.forEach(each=>this.create_segment(each.start_pos, each.end_pos, each.start_presence, each.end_presence, each.presence_sync)); 
					}

				this.mode = "editing_layer_mode";

				// -----------------------------------
				//      TEXTURES
				// -----------------------------------  

					this.layer_texture_picker = createNewElement({type:"button", classes: ["layer_texture_picker", "layer_controls_elements", "btn", "btn-secondary"], parent: this.layer_settings_container, properties: {innerHTML: `<i class="bi bi-bricks"></i>`}, attributes: {title: "Texture Picker"}});
					this.layer_texture_picker.addEventListener("click", e=>this.layer_texture_picker_handler(e));
					this.texture_selector = createNewElement({type:'div', classes: ["texture_selector", "layer_controls_elements"], parent: this.layer_container, styles: {display: "none"}} );

					let textures = {
						"Horizontal_Lines" :"pattern_horizontal_lines.png",
						"Dots_1" :"pattern_dots_1.png",
						"Dots_2" :"pattern_dots_2.png",
						"Vertical_Lines 1" :"pattern_vertical_lines_1.png",
						"Vertical_Lines 2" :"pattern_vertical_lines_2.png",
						"Diagonal_Line 1" :"pattern_diagonal_line_1.png",
						"Diagonal_Line 2" :"pattern_diagonal_line_2.png",
						"Circle_1" :"pattern_circle_1.png",
						"Circle_2" :"pattern_circle_2.png",
						"Blank" :"pattern_blank.png",
						"Vertical and Horizontal Lines" :"pattern_vertical_and_horizontal_1.png",
						"Divider Black" :"pattern_single_horizontal_line_black.png",
						"Divider Gray" :"pattern_single_horizontal_line_gray.png",
						"Horizontal_Lines white": "pattern_horizontal_lines-white.png",
						"Dots_1 white": "pattern_dots_1-white.png",
						"Dots_2 white": "pattern_dots_2-white.png",
						"Vertical_Lines 1 white": "pattern_vertical_lines_1-white.png",
						"Vertical_Lines 2 white": "pattern_vertical_lines_2-white.png",
						"Diagonal_Line 1 white": "pattern_diagonal_line_1-white.png",
						"Diagonal_Line 2 white": "pattern_diagonal_line_2-white.png",
						"Circle_1 white": "pattern_circle_1-white.png",
						"Circle_2 white": "pattern_circle_2-white.png",
						"Vertical and Horizontal Lines white": "pattern_vertical_and_horizontal_1-white.png",
					}

					this.textures_buttons = [];
					for (let i = 0; i < Object.keys(textures).length ; i++) {
						let each_key = Object.keys(textures)[i];
						let each_value = Object.values(textures)[i];
						let texture = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_' + (i + 1)], parent: this.texture_selector, styles:{background:'url(images/' + each_value + ')'}, properties: {title: each_key}});
						this.textures_buttons.push(texture);
						texture.addEventListener('click', e=>this.create_layer_background_texture(e));
						if(each_key === "Divider Black" || each_key === "Divider Gray") {
							texture.style.backgroundRepeat = "repeat-x";
						}
					}
					

					// this.shape_background_texture_1 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_1'], parent: this.texture_selector, styles:{background:'url(images/pattern_horizontal_lines.png)'}, properties: {title: "Horizontal_Lines"}});
					// this.shape_background_texture_2 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_2'], parent: this.texture_selector, styles:{background:'url(images/pattern_dots_1.png)'}, properties: {title: "Dots_1"}});
					// this.shape_background_texture_3 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_3'], parent: this.texture_selector, styles:{background:'url(images/pattern_dots_2.png)'}, properties: {title: "Dots_2"}});
					// this.shape_background_texture_4 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_4'], parent: this.texture_selector, styles:{background:'url(images/pattern_vertical_lines_1.png)'}, properties: {title: "Vertical_Lines 1"}});
					// this.shape_background_texture_5 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_5'], parent: this.texture_selector, styles:{background:'url(images/pattern_vertical_lines_2.png)'}, properties: {title: "Vertical_Lines 2"}});
					// this.shape_background_texture_6 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_6'], parent: this.texture_selector, styles:{background:'url(images/pattern_diagonal_line_1.png)'}, properties: {title: "Diagonal_Line 1"}});
					// this.shape_background_texture_7 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_7'], parent: this.texture_selector, styles:{background:'url(images/pattern_diagonal_line_2.png)'}, properties: {title: "Diagonal_Line 2"}});
					// this.shape_background_texture_8 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_8'], parent: this.texture_selector, styles:{background:'url(images/pattern_circle_1.png)'}, properties: {title: "Circle_1"}});
					// this.shape_background_texture_9 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_9'], parent: this.texture_selector, styles:{background:'url(images/pattern_circle_2.png)'}, properties: {title: "Circle_2"}});
					// this.shape_background_texture_10 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_10'], parent: this.texture_selector, styles:{background:'url(images/pattern_blank.png)'}, properties: {title: "Blank"}});
					// this.shape_background_texture_11 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_11'], parent: this.texture_selector, styles:{background:'url(images/pattern_vertical_and_horizontal_1.png)'}, properties: {title: "Vertical and Horizontal Lines"}});
					// this.shape_background_texture_12 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_12'], parent: this.texture_selector, styles:{background:'url(images/pattern_single_horizontal_line_black.png)'}, properties: {title: "Divider Black"}});
					// this.shape_background_texture_13 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_13'], parent: this.texture_selector, styles:{background:'url(images/pattern_single_horizontal_line_gray.png)'}, properties: {title: "Divider Gray"}});

					// this.shape_background_texture_1_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_1_white'], parent: this.texture_selector, styles:{background:'url(images/pattern_horizontal_lines-white.png)'}, properties: {title: "Horizontal_Lines white"}});
					// this.shape_background_texture_2_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_2_white'], parent: this.texture_selector, styles:{background:'url(images/pattern_dots_1-white.png)'}, properties: {title: "Dots_1 white"}});
					// this.shape_background_texture_3_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_3_white'], parent: this.texture_selector, styles:{background:'url(images/pattern_dots_2-white.png)'}, properties: {title: "Dots_2 white"}});
					// this.shape_background_texture_4_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_4_white'], parent: this.texture_selector, styles:{background:'url(images/pattern_vertical_lines_1-white.png)'}, properties: {title: "Vertical_Lines 1 white"}});
					// this.shape_background_texture_5_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_5_white'], parent: this.texture_selector, styles:{background:'url(images/pattern_vertical_lines_2-white.png)'}, properties: {title: "Vertical_Lines 2 white"}});
					// this.shape_background_texture_6_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_6_white'], parent: this.texture_selector, styles:{background:'url(images/pattern_diagonal_line_1-white.png)'}, properties: {title: "Diagonal_Line 1 white"}});
					// this.shape_background_texture_7_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_7_white'], parent: this.texture_selector, styles:{background:'url(images/pattern_diagonal_line_2-white.png)'}, properties: {title: "Diagonal_Line 2 white"}});
					// this.shape_background_texture_8_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_8_white'], parent: this.texture_selector, styles:{background:'url(images/pattern_circle_1-white.png)'}, properties: {title: "Circle_1 white"}});
					// this.shape_background_texture_9_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_9_white'], parent: this.texture_selector, styles:{background:'url(images/pattern_circle_2-white.png)'}, properties: {title: "Circle_2 white"}});
					// this.shape_background_texture_10_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_10_white'], parent: this.texture_selector, styles:{background:'url(images/pattern_vertical_and_horizontal_1-white.png)'}, properties: {title: "Vertical and Horizontal Lines white"}});



					// this.shape_background_texture_1.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_2.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_3.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_4.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_5.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_6.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_7.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_8.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_9.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_10.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_11.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_12.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_13.addEventListener('click', e=>this.create_layer_background_texture(e));

					// this.shape_background_texture_1_white.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_2_white.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_3_white.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_4_white.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_5_white.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_6_white.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_7_white.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_8_white.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_9_white.addEventListener('click', e=>this.create_layer_background_texture(e));
					// this.shape_background_texture_10_white.addEventListener('click', e=>this.create_layer_background_texture(e));

				// -----------------------------------
				//      VISIBLE IN TABLE TOGGLE
				// -----------------------------------  

				this.hide_layer_from_data_table_container = createNewElement({type:"div", classes: ["hide_layer_from_data_table_container", "form-check", "form-switch"], parent: this.layer_settings_container, properties: {}, attributes: {title: "Hide from data table toggle"}});
					this.hide_layer_from_data_table_input = createNewElement({type:"input", classes:["hide_layer_from_data_table_input", "form-check-input"], parent: this.hide_layer_from_data_table_container, properties:{}, attributes:{type: "checkbox", role: "switch", id:"hide_layer_from_data_table_input", checked: true}});
					this.hide_layer_from_data_table_label = createNewElement({type:"label", classes:["hide_layer_from_data_table_label", "form-check-label"], parent: this.hide_layer_from_data_table_container, properties:{innerText: "Data Table"}, attributes:{for: "hide_layer_from_data_table_input"}});

				this.hide_layer_from_data_table_input.addEventListener("change", this.hide_layer_from_data_table_input_handler.bind(this));


				if(this.layer_data.show_in_table === false) {	this.hide_layer_from_data_table_input.checked = false;}

			// -----------------------------------
			//      NAME ON DIAGRAM TOGGLE
			// -----------------------------------  
				this.hide_name_on_diagram_toggle = createNewElement({type:"div", classes: ["hide_name_on_diagram_toggle", "form-check", "form-switch"], parent: this.layer_settings_container, properties: {}, attributes: {title: "Hide name in diagram toggle"}});
					this.hide_name_on_diagram_input = createNewElement({type:"input", classes:["hide_name_on_diagram_input", "form-check-input"], parent: this.hide_name_on_diagram_toggle, properties:{}, attributes:{type: "checkbox", role: "switch", id:"hide_name_on_diagram_input", checked: false}});
					this.hide_name_on_diagram_label = createNewElement({type:"label", classes:["hide_name_on_diagram_label", "form-check-label"], parent: this.hide_name_on_diagram_toggle, properties:{innerText: "Hide Name"}, attributes:{for: "hide_name_on_diagram_input"}});

				this.hide_name_on_diagram_input.addEventListener("change", this.hide_name_on_diagram_input_handler.bind(this));

				if(this.layer_data.hide_name_in_diagram === false){	
					this.hide_name_on_diagram_input.checked = false;
					this.name.style.color = "initial";
				} else {
					this.hide_name_on_diagram_input.checked = true;
					this.name.style.color = "transparent";
				}

      }
		hide_name_on_diagram_input_handler() {
			this.layer_data.hide_name_in_diagram = !this.layer_data.hide_name_in_diagram;

			if(this.layer_data.hide_name_in_diagram === false) {
				this.name.style.color = "initial";
			} else {
				this.name.style.color = "transparent";
			}

			this.parent.save_state();
		}
		hide_layer_from_data_table_input_handler() {
			this.layer_data.show_in_table = !this.layer_data.show_in_table;

			if (this.layer_data.show_in_table === false) {
				this.segment_array.forEach(each=>{
					each.segment_table_row.style.display = "none";
					each.segment_table_row.classList.add("row_hidden_from_table");
				});
			} else {
				this.segment_array.forEach(each=>{
					each.segment_table_row.style.display = "table-row";
					each.segment_table_row.classList.remove("row_hidden_from_table");
				});
			}

			this.parent.save_state();
		}
		layer_settings_button_handler(e)
			{
				if(this.layer_settings_container.style.display === "flex")
					{
						this.layer_settings_container.style.display = "none";
						this.texture_selector.style.display = "none";
					}
				else
					{
						this.layer_settings_container.style.display = "flex";
						this.texture_selector.style.display = "none";
					}				
			}
		layer_texture_picker_handler(e)
			{
				if(this.texture_selector.style.display === "block")
					{
						this.texture_selector.style.display = "none";
						// this.layer_settings_container.style.display = "none";
					}
				else
					{
						this.texture_selector.style.display = "block";
						this.layer_settings_container.style.display = "none";
					}
			}
		create_layer_background_texture(e)
			{
				for (let i = 0; i < this.segment_array.length ; i++)
					{
						let initial_value = this.segment_array[i].segment.style.background;
						
						// Extract the portion between "linear-gradient(" and "))"
						const gradientText = initial_value.match(/linear-gradient\((.*?)\)\)/)[0];

						this.segment_array[i].segment.style.background =  e.target.style.background + " center center, " + gradientText;
						this.layer_data.segments[i].color = e.target.style.background + " center center, " + gradientText;
						this.segment_array[i].data.styles.background =  e.target.style.background + " center center, " + gradientText;
						this.layer_data.color = e.target.style.background + " center center, " + gradientText;						


						// this.segment_array[i].segment.style.background =  e.target.style.background + " center center, " + initial_value;
						// this.layer_data.segments[i].color = e.target.style.background + " center center, " + initial_value;
						// this.segment_array[i].data.styles.background =  e.target.style.background + " center center, " + initial_value;
						// this.layer_data.color = e.target.style.background + " center center, " + initial_value;
					}

				this.texture_selector.style.display = "none";
				this.parent.save_state();
			}   			
		delete_layer_button_handler()
			{
				if(window.confirm("Are you sure you want to delete the entire layer?"))
					{
						this.parent.delete_layer(this.layer_data.layer_id_pos);
					}
				
			}
		layer_name_double_click_handler(e)
			{
				this.name.contentEditable = true;
				this.name.classList.add("layer_name_being_edited");
				this.name.focus();
				this.name.style.color = "initial";
				window.getSelection().selectAllChildren(this.name);
			}
		layer_name_input_handler(e)
			{
				console.log(e);
				this.layer_data.name = e.target.innerText;
				for (let i = 0; i < this.segment_array.length ; i++)
					{
						this.segment_array[i].segment_table_row.querySelector(".SegmentTableName").innerText = this.layer_data.name;
					}

				this.parent.save_state();
			}
		color_picker_handler(e)
			{
				
				console.log(e.type);
				if(this.select_box.checked === true)
					{
						let [color_value_1, color_value_2, initial_saturation_1, initial_saturation_2, urlText] = ["","","","",""];
						let initial_value = this.layer_data.color;

						[color_value_1, initial_saturation_1, urlText] = this.parent.GetRGBA_Values({value: initial_value, num:0});
						[color_value_2, initial_saturation_2, urlText] = this.parent.GetRGBA_Values({value: initial_value, num:1});		

						let current_color = e.target.value;
						
						// convert hex to rgb
						let result;
						let result_rgb;
						let formated_color_value_for_layer;

						debugger
						if(current_color.length === 7) {
							result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(current_color);
							result_rgb = { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16),  }
							formated_color_value_for_layer = "rgba(" + result_rgb.r + "," + result_rgb.g + "," + result_rgb.b + ",1.0)";
						} else if(current_color.length === 9) {
							result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(current_color);
							result_rgb = { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16), a: parseInt(result[4], 16),  }
							formated_color_value_for_layer = "rgba(" + result_rgb.r + "," + result_rgb.g + "," + result_rgb.b + "," + result_rgb.a + ")";
						} else {
							alert("Brian, there's something wrong with this color")
						}

						// let result_rgb = { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
						let layer_color_formated = "linear-gradient(to right, " + formated_color_value_for_layer + ", " + formated_color_value_for_layer + ")";
						
						this.color_picker_button.style.background = urlText + layer_color_formated;

						this.layer_data.color = urlText + layer_color_formated;
						
						for (let i = 0; i < this.segment_array.length ; i++)
							{
								let starting_saturation_value = (this.segment_array[i].data.start_presence/GLOBAL_presence_scale).toFixed(1);
								let ending_saturation_value = (this.segment_array[i].data.end_presence/GLOBAL_presence_scale).toFixed(1);
								let formated_color_value_start = "rgba(" + result_rgb.r + "," + result_rgb.g + "," + result_rgb.b + "," + starting_saturation_value + ")";
								let formated_color_value_end = "rgba(" + result_rgb.r + "," + result_rgb.g + "," + result_rgb.b + "," + ending_saturation_value + ")";
								let segment_color_formated = "linear-gradient(to right, " + formated_color_value_start + ", " + formated_color_value_end + ")";
								
								this.segment_array[i].segment.style.background = urlText + segment_color_formated;
								this.layer_data.segments[i].color = urlText + segment_color_formated;
								this.segment_array[i].data.styles.background = urlText + segment_color_formated;
							}
					}

				if(e.type === 'change')
					{
						this.parent.save_state();
					}
				
			}
		duplicate_layer(e) {
			let this_layer_index = this.parent.example_data.layers.findIndex(item=>item.layer_id_pos===this.layer_data.layer_id_pos);
			// this.example_data.layers.forEach((each,index)=> 

			this.parent.layer_id_pos++;


			// this.parent.layers.push(new Layer(this.parent.AllLayerContainers, JSON.parse(JSON.stringify(this.parent.example_data.layers[this_layer_index])), this.parent.file_length, this.parent, "load_existing_layer"));
			this.parent.layers.splice(this_layer_index + 1, 0, new Layer(this.parent.AllLayerContainers, JSON.parse(JSON.stringify(this.parent.example_data.layers[this_layer_index])), this.parent.file_length, this.parent, "load_existing_layer"))
			// let new_layer_index = this.parent.layers.length - 1;
			// let new_layer = this.parent.layers[this.parent.layers.length - 1];
			let new_layer = this.parent.layers[this_layer_index + 1];
			
			new_layer.layer_data.color = this.layer_data.color;
			let new_data = JSON.parse(JSON.stringify(this.layer_data));

			this.parent.example_data.layers.splice( this_layer_index + 1, 0, new_data);
			new_data.layer_id_pos = this.parent.layer_id_pos;
			new_data.name = JSON.parse(JSON.stringify(this.layer_data.name));

			new_layer.layer_data.layer_id_pos = parseInt(JSON.parse(JSON.stringify(this.parent.layer_id_pos)));
			new_layer.layer_data.name = JSON.parse(JSON.stringify(this.layer_data.name));
					

			this.parent_container.insertBefore(new_layer.layer_container, this.layer_container.nextSibling);

			let segment_margin_bottom = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--segment-margin-bottom'));
			
			document.documentElement.style.setProperty('--slider_thumb_height', ((this.parent.segment_height + segment_margin_bottom ) * this.parent.layers.length) + 70 + "px");
			document.documentElement.style.setProperty('--slider_thumb_offset', ( ((((this.parent.segment_height + segment_margin_bottom)/2) * this.parent.layers.length) + 25) * -1) + "px");

			this.parent.slider_thumb_height = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--slider_thumb_height'));
			this.parent.slider_thumb_offset = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--slider_thumb_offset'));
			this.parent.example_data.piece_info.slider_thumb_height = this.parent.slider_thumb_height;
			this.parent.example_data.piece_info.slider_thumb_offset = this.parent.slider_thumb_offset;

			this.parent.save_array[this.parent.save_position].program_data.slider_thumb_height = this.parent.slider_thumb_height;
			this.parent.save_array[this.parent.save_position].program_data.slider_thumb_offset = this.parent.slider_thumb_offset;		

			this.parent.save_state();
		}
		select_changed(e)
			{
				
				if(e.target.checked === true)
					{
						if(shift_down === false)
							{
								this.parent.deselect_all_layers();
							}
						
						// this.parent.deselect_all_layers();
						this.layer_controls_holder.classList.add("layer_selected_controls_holder");
						this.layer_segment_holder.classList.add("layer_selected_segments_holder");
						this.selected = true;
						this.segment_array.forEach(each_segment=>each_segment.segment.classList.add("segments_layer_is_selected"));
						this.segment_array.forEach(each_segment=>each_segment.segment.classList.remove("segments_layer_is_not_selected"));
						this.layer_settings_button.style.display = "block";
					}
				else if(e.target.checked === false)
					{
						this.layer_controls_holder.classList.remove("layer_selected_controls_holder");
						this.layer_segment_holder.classList.remove("layer_selected_segments_holder");
						this.selected = false;
						this.segment_array.forEach(each_segment=>each_segment.segment.classList.remove("segments_layer_is_selected"));
						this.segment_array.forEach(each_segment=>each_segment.segment.classList.add("segments_layer_is_not_selected"));
						this.layer_settings_button.style.display = "none";
						this.layer_settings_container.style.display = "none";
						this.texture_selector.style.display = "none";
					}
			}
		select_contiguous_segments(clicked_segment) {
				
			
			let start_positions = []
			for (let i = 0; i < this.segment_array.length ; i++) {
				let each_segment = this.segment_array[i];
				start_positions.push({
					index: i,
					start_pos: each_segment.data.start_pos,
					end_pos: each_segment.data.end_pos,
					selected: each_segment.segment.classList.contains("segment_selected"),
					segment: each_segment
				})
			}
			
			start_positions.sort((a,b)=> a.start_pos - b.start_pos);
			let clicked_segment_index_and_positions = start_positions.filter(each=>each.index === clicked_segment.segment_index)[0];


			if(this.parent.current_recent_layer_and_segment.layer === this.parent.previous_recent_layer_and_segment.layer) {
				if(this.parent.current_recent_layer_and_segment.segment !== this.parent.previous_recent_layer_and_segment.segment) {
					let previous = start_positions.filter(each=>each.index === this.parent.previous_recent_layer_and_segment.segment)[0];
					let current = start_positions.filter(each=>each.index === this.parent.current_recent_layer_and_segment.segment)[0];
					let segments_in_between;
					if(previous.start_pos > current.start_pos) {
						segments_in_between = start_positions.filter(each=>each.start_pos < previous.start_pos && each.end_pos > current.end_pos);
					} else if (previous.start_pos < current.start_pos) {
						segments_in_between = start_positions.filter(each=>each.start_pos > previous.start_pos && each.end_pos < current.end_pos);
					}

					segments_in_between.forEach(each=>{
						if(each.segment.segment.classList.contains("segment_selected") === false && each.segment.data.start_presence > 0 && each.segment.data.end_presence > 0) {
							each.segment.segment_text_1.click()
						}
					})

				}
			}
			
					// this.layers[i].segment_array.forEach(each=>{
					// 	each.segment.classList.add("segment_selected");
					// 	each.segment_table_row.classList.add("segment_row_selected");
					// });
		}
		split_segment()
			{

			}
		create_segment(start, end = -1, start_presence = -1, end_presence = -1, presence_sync, sent_segment = {})
			{

				this.current_segment_index = 0;
				this.current_segment_index_2 = this.segment_array.length;
				this.current_position = start * this.parent.resolution;
				let premature_exit = false;
				
				
				
				// treat loading from a file/undo differently than adding a new segment while doing normal editing
				if(this.mode === "load_existing_layer")
					{
						this.segment_array.push(new Segment(this, this.current_segment_index_2, end, JSON.parse(JSON.stringify(this.layer_data.segments)), sent_segment.color, this.layer_segment_holder, this.parent.PresenceSliderStart, this.parent.PresenceSliderEnd, start_presence, end_presence, presence_sync, sent_segment));
					}
				else if(this.mode === "new_layer")
					{
						// this.segment_array.push(new Segment(this, this.parent.file_length, this.layer_data.segments, this.layer_data.color, this.layer_segment_holder, this.parent.PresenceSliderStart, this.parent.PresenceSliderEnd, start_presence, end_presence));
						this.segment_array.push(new Segment(this, this.current_segment_index_2, this.parent_file_length, this.layer_data.segments, this.layer_data.color, this.layer_segment_holder, this.parent.PresenceSliderStart, this.parent.PresenceSliderEnd, start_presence, end_presence, presence_sync));
					}
				else if(this.mode === "editing_layer_mode")
					{
						this.layer_data.segments.forEach((each,index)=>
							{
								if(this.current_position === 0)
									{
										alert("There is already a segment that starts here (0)");
										premature_exit = true;
										return false;
									}
								else if(this.current_position === this.parent_file_length)
									{
										alert("There is already a segment that ends here (0)");
										premature_exit = true;
										return false;
									}
								else if(this.current_position === each.start_pos)
									{
										alert("There is already a segment that starts here (1)");
										premature_exit = true;
										return false;
									}
								else if(this.current_position === each.end_pos)
									{
										alert("There is already a segment that ends here (1)");
										premature_exit = true;
										return false;
									}					

								if(premature_exit === false && this.current_position > each.start_pos && this.current_position < each.end_pos) this.current_segment_index = index;
							});
				
						if(premature_exit === false)
							{
								let current_position_relative_to_current_start_pos = this.current_position - this.layer_data.segments[this.current_segment_index].start_pos;
								let old_width_of_current_segment = this.layer_data.segments[this.current_segment_index].end_pos - this.layer_data.segments[this.current_segment_index].start_pos;
								let old_end_pos_of_current_segment = this.layer_data.segments[this.current_segment_index].end_pos;
								let width_of_new_segment = old_width_of_current_segment - current_position_relative_to_current_start_pos;
								let new_width_of_current_segment = old_width_of_current_segment - width_of_new_segment;						
								
								// make the current segment shorter
								// the -1 is just so the end position of the current segment and start position of the new segment aren't the same
								this.layer_data.segments[this.current_segment_index].end_pos = this.current_position - 1 ;
								// this.segment_array[this.current_segment_index].segment.style.width = (((new_width_of_current_segment/this.parent.resolution) * this.parent.scale) - 1) + "px";
								// this.segment_array[this.current_segment_index].segment.style.width = ((((this.layer_data.segments[this.current_segment_index].end_pos-this.layer_data.segments[this.current_segment_index].start_pos)/this.parent.resolution) * this.parent.scale) - 1) + "px";
								this.segment_array[this.current_segment_index].segment.style.width = ((((this.layer_data.segments[this.current_segment_index].end_pos/this.parent.resolution) - (this.layer_data.segments[this.current_segment_index].start_pos/this.parent.resolution)) * this.parent.scale) + (this.parent.scale/this.parent.resolution) -1) +  "px";
							
								this.segment_array.push(new Segment(this, this.current_segment_index_2, old_end_pos_of_current_segment, this.layer_data.segments, this.layer_data.color, this.layer_segment_holder, this.parent.PresenceSliderStart, this.parent.PresenceSliderEnd, start_presence, end_presence, presence_sync));
							}
					}
				
				if(premature_exit === false)
					{
						this.parent.save_state();	
					}
			}
		delete_segment()
			{

			}
  }
class Segment
	{
		constructor(sent_parent, sent_segment_index, sent_old_end_pos_of_current_segment, sent_layer_data_segments, sent_color, sent_layer_segment_holder, sent_presence_slider_start, sent_presence_slider_end, sent_start_presence = -1, sent_end_presence = -1, sent_presence_sync, sent_segment)
			{
				this.parent = sent_parent;
				this.segment_index = sent_segment_index;
				this.layer_segment_holder = sent_layer_segment_holder;
				this.PresenceSliderStart = sent_presence_slider_start;
				this.PresenceSliderEnd = sent_presence_slider_end;
				this.tapedTwice = false;

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
								presence_sync: sent_presence_sync,
								styles: {},
								text: [
									{
										inner_text:"",
										styles:{
											textAlign: 'center',
											fontSize: "14px"
										}
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
				// width:  (((this.data.end_pos/this.parent.parent.resolution) - (this.data.start_pos/this.parent.parent.resolution)) * this.parent.parent.scale) + (this.parent.parent.scale-1) + "px",
				// width:  ((((this.data.end_pos/this.parent.parent.resolution) - (this.data.start_pos/this.parent.parent.resolution)) * this.parent.parent.scale) - 1) + "px",

				// Brian, I don't know why this is needed: (this.parent.parent.scale/this.parent.parent.resolution) -1) 
				let width = ((((this.data.end_pos/this.parent.parent.resolution) - (this.data.start_pos/this.parent.parent.resolution)) * this.parent.parent.scale) + (this.parent.parent.scale/this.parent.parent.resolution) -1) +  "px";
				
				
				if(typeof this.data.styles.background !== "undefined")
					{
						this.data.color = this.data.styles.background;
					}

				this.segment = createNewElement({type:"div", classes: this.data.classes, parent: this.layer_segment_holder, styles:
					{
						left: ((this.data.start_pos/this.parent.parent.resolution) * this.parent.parent.scale) + "px",
						width:  width,
						background: this.data.color,
						filter: this.data.styles.filter,
						clipPath: this.data.styles.clipPath
					},
					properties: {contentEditable: false}
				});

				// properties: {contentEditable: false, innerText: this.data.text[0].inner_text}

				this.segment_text_1 = createNewElement({type:"div", classes:["segment_text_1", "segment_text"], parent: this.segment, properties:{innerText: this.data.text[0].inner_text, contentEditable: false}, styles: this.data.text[0].styles});
				
				
				// let time_stamp = Math.floor(this.data.start_pos/60) + ":" + String(Math.floor(this.data.start_pos%60)).padStart(2,'0');
				
				let time_stamp = Math.floor((this.data.start_pos/10)/60) + ":" + String(Math.floor((this.data.start_pos/10)%60)).padStart(2,'0') + ":" + String((this.data.start_pos)%10).padStart(1,'0');


				this.segment_table_row = createNewElement({type:"tr", classes:["segment_table_row"], parent: this.parent.parent.TableBodyTBody, properties:{}});
					// this.SegmentTableId = createNewElement({type:"td", classes:["SegmentTableId"], parent: this.segment_table_row, properties:{innerText: this.parent.parent.example_data.piece_info.layer_id_pos}});

					this.SegmentTimestampInputBox = createNewElement({type:"td", classes:["SegmentTimestampInputBox"], parent: this.segment_table_row, properties:{}});
					this.SegmentTimestampInputBoxButtonIncreaseBeginning = createNewElement({type:"button", classes:["SegmentTimestampInputBoxButtonIncreaseBeginning", "btn", "btn-primary"], parent: this.SegmentTimestampInputBox, properties:{innerText: "↑"}});
					this.SegmentTimestampInputBox.insertBefore(this.SegmentTimestampInputBoxButtonIncreaseBeginning, this.SegmentTimestampInputBox.firstChild);
					this.SegmentTimestampInputBoxButtonDecreaseBegining = createNewElement({type:"button", classes:["SegmentTimestampInputBoxButtonDecreaseBegining", "btn", "btn-primary"], parent: this.SegmentTimestampInputBox, properties:{innerText: "↓"}});
					this.SegmentTimestampInputBox.insertBefore(this.SegmentTimestampInputBoxButtonDecreaseBegining, this.SegmentTimestampInputBox.firstChild);
					this.SegmentTimestampInputBoxText = createNewElement({type:"td", classes:["SegmentTimestampInputBoxText"], parent: this.SegmentTimestampInputBox, properties:{innerText: time_stamp}});
					this.SegmentTimestampInputBoxButtonIncreaseEnding = createNewElement({type:"button", classes:["SegmentTimestampInputBoxButtonIncreaseEnding", "btn", "btn-primary"], parent: this.SegmentTimestampInputBox, properties:{innerText: "↑"}});
					this.SegmentTimestampInputBoxButtonDecreaseEnding = createNewElement({type:"button", classes:["SegmentTimestampInputBoxButtonDecreaseEnding", "btn", "btn-primary"], parent: this.SegmentTimestampInputBox, properties:{innerText: "↓"}});
					this.SegmentTableName = createNewElement({type:"td", classes:["SegmentTableName"], parent: this.segment_table_row, properties:{innerText: this.parent.name.innerText}});
					this.SegmentTableText = createNewElement({type:"td", classes:["SegmentTableText"], parent: this.segment_table_row, properties:{} });
						this.SegmentTextInput = createNewElement({type:"input", classes:["SegmentTextInput", "form-control"], parent: this.SegmentTableText, properties:{type: "text", value: this.data.text[0].inner_text}, events:{input:e=>this.SegmentTextInput_input_handler(e)}, dataset:{text_value:this.data.text[0].inner_text}});
					this.SegmentPresenceStartTR = createNewElement({type:"td", classes:["SegmentPresenceStartTR"], parent: this.segment_table_row, properties:{}});
						this.SegmentPresenceStartRange = createNewElement({type:"input", classes:["SegmentPresenceStartRange"], parent: this.SegmentPresenceStartTR, properties:{type: "range", innerText: this.data.start_presence, min: "0", max: GLOBAL_presence_scale, value: this.data.start_presence}, events:{input: e=>this.SegmentPresenceStartRangeHandler(e,"start")}});
					this.SegmentPresenceEndTR = createNewElement({type:"td", classes:["SegmentPresenceEndTR"], parent: this.segment_table_row, properties:{}});
						this.SegmentPresenceEndRange = createNewElement({type:"input", classes:["SegmentPresenceEndRange"], parent: this.SegmentPresenceEndTR, properties:{type: "range", innerText: this.data.end_presence, min: "0", max: GLOBAL_presence_scale, value: this.data.end_presence, disabled: this.data.presence_sync}, events:{input: e=>this.SegmentPresenceStartRangeHandler(e,"end")}});					
					

				this.SegmentTimestampInputBoxText.addEventListener("click", this.ChangeTimeStampDataTable.bind(this));

				this.SegmentTextInput.addEventListener("focus", e=>this.parent.parent.in_text_editor = true);
				this.SegmentTextInput.addEventListener("blur", e=>this.parent.parent.in_text_editor = false);

				this.SegmentTimestampInputBoxButtonIncreaseBeginning.addEventListener("click", this.AdjustTimeStamp.bind(this, "increase", "beginning"));
				this.SegmentTimestampInputBoxButtonDecreaseBegining.addEventListener("click", this.AdjustTimeStamp.bind(this, "decrease", "beginning"));
				this.SegmentTimestampInputBoxButtonIncreaseEnding.addEventListener("click", this.AdjustTimeStamp.bind(this, "increase", "ending"));
				this.SegmentTimestampInputBoxButtonDecreaseEnding.addEventListener("click", this.AdjustTimeStamp.bind(this, "decrease", "ending"));


				if(this.parent.layer_data.show_in_table === false) {
					this.segment_table_row.style.display = "none";
					this.segment_table_row.classList.add("row_hidden_from_table");
				}

				

				// Text Formatting Flyout Menu
				this.TextEditingMenuContainer_SingleSegment = createNewElement({type:"div", classes:["TextEditingMenuContainer_SingleSegment"], parent: this.segment , properties:{}, styles:{display: "none"}});
				this.TextEditingLeftAlignButton = createNewElement({type:"button", classes:["TextEditingLeftAlignButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties:{innerHTML:`<i class="bi-justify-left"></i>`}, events:{click:e=>{this.ChangeTextFormat({style: "textAlign", value: "left"})}}});
				this.TextEditingCenterAlignButton = createNewElement({type:"button", classes:["TextEditingCenterAlignButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties:{innerHTML:`<i class="bi-justify"></i>`}, events:{click:e=>{this.ChangeTextFormat({style: "textAlign", value: "center"})}}});
				this.TextEditingRightAlignButton = createNewElement({type:"button", classes:["TextEditingRightAlignButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties:{innerHTML:`<i class="bi-justify-right"></i>`}, events:{click:e=>{this.ChangeTextFormat({style: "textAlign", value: "right"})}}});
				this.TextEditingBoldButton = createNewElement({type:"button", classes:["TextEditingBoldButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties:{innerHTML:`<i class="bi-type-bold"></i>`}, events:{click:e=>{this.ChangeTextFormat({style: "fontWeight", value: "bold"})}}});
				this.TextEditingItalicButton = createNewElement({type:"button", classes:["TextEditingItalicButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties:{innerHTML:`<i class="bi-type-italic"></i>`}, events:{click:e=>{this.ChangeTextFormat({style: "fontStyle", value: "italic"})}}});
				this.TextEditingUnderlineButton = createNewElement({type:"button", classes:["TextEditingUnderlineButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties:{innerHTML:`<i class="bi-type-underline"></i>`}, events:{click:e=>{this.ChangeTextFormat({style: "textDecoration", value: "underline"})}}});
				this.TextEditingStrikeThroughButton = createNewElement({type:"button", classes:["TextEditingStrikeThroughButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties:{innerHTML:`<i class="bi-type-strikethrough"></i>`}, events:{click:e=>{this.ChangeTextFormat({style: "textDecoration", value: "line-through"})}}});
				this.TextEditingFontSizeIncreaseButton = createNewElement({type:"button", classes:["TextEditingFontSizeIncreaseButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties:{innerHTML:`A+`}, events:{click:e=>{this.ChangeTextFormat({style: "fontSize", type: "increase"})}}});
				this.TextEditingFontSizeDecreaseButton = createNewElement({type:"button", classes:["TextEditingFontSizeDecreaseButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties:{innerHTML:`A-`}, events:{click:e=>{this.ChangeTextFormat({style: "fontSize", type: "decrease"})}}});
			

				if(this.parent.mode !== "load_existing_layer")
					{ this.segment.classList.add("segments_layer_is_selected"); }
				
				this.segment_text_1.addEventListener("click",e=> { this.segment_text_click_handler(e);	});
				this.segment_text_1.addEventListener("dblclick",e=> { this.segment_double_click_handler();	});
				this.segment_text_1.addEventListener("input", this.segment_text_input_handler.bind(this));
				this.segment_text_1.addEventListener("focus", e=>
					{
						this.parent.parent.in_text_editor = true;
					});				
				this.segment_text_1.addEventListener("blur", e=>
					{
						// this.segment.contentEditable = false;
						this.segment_text_1.contentEditable = false;
						this.parent.parent.in_text_editor = false;						
					});
			}
		ChangeTimeStampDataTable(e) {
			let index_of_left_segment = -1;
			let index_of_right_segment = -1;
			let left_segment;
			let right_segment;
			let adjust_value = 10;
			let location = "beginning"
			let direction;

			let current_start_pos = this.data.start_pos;
			let current_end_pos = this.data.end_pos;

			if(current_start_pos === 0) {
				alert("This starting value is already at the beginning. It cannot be changed.");
				return false;
			}


			for (let i = 0; i < this.parent.segment_array.length ; i++) {
				let each = this.parent.segment_array[i];

				if(location === "beginning") {
					if ( (this.data.start_pos - 1) === each.data.end_pos) {
						left_segment = each;
						right_segment = this;
					}
				} else if (location === "ending") {
					if (this.data.end_pos === (each.data.start_pos - 1)) {
						left_segment = this;
						right_segment = each;
					}
				}
			}

			let min_new_start_pos = left_segment.data.start_pos + adjust_value;
			let max_new_start_pos = right_segment.data.end_pos - adjust_value;
			
			let time_stamp_hour = Math.floor((this.data.start_pos/adjust_value)/60);
			let time_stamp_minute = String(Math.floor((this.data.start_pos/adjust_value)%60)).padStart(2,'0');
			let time_stamp_seconds = String((this.data.start_pos)%adjust_value).padStart(1,'0');
			let time_stamp = time_stamp_hour + ":" + time_stamp_minute + ":" + time_stamp_seconds;

			let min_time_stamp_hour = Math.floor((min_new_start_pos/adjust_value)/60);
			let min_time_stamp_minute = String(Math.floor((min_new_start_pos/adjust_value)%60)).padStart(2,'0');
			let min_time_stamp_seconds = String((min_new_start_pos)%adjust_value).padStart(1,'0');
			let min_time_stamp = min_time_stamp_hour + ":" + min_time_stamp_minute + ":" + min_time_stamp_seconds;

			let max_time_stamp_hour = Math.floor((max_new_start_pos/adjust_value)/60);
			let max_time_stamp_minute = String(Math.floor((max_new_start_pos/adjust_value)%60)).padStart(2,'0');
			let max_time_stamp_seconds = String((max_new_start_pos)%adjust_value).padStart(1,'0');
			let max_time_stamp = max_time_stamp_hour + ":" + max_time_stamp_minute + ":" + max_time_stamp_seconds;


			let users_new_time_stamp = prompt("Enter the new timestamp. Format: minutes:seconds:tenths of seconds (current: " + time_stamp + ")");

			if(users_new_time_stamp === null) {
				return false;
			}

			if( (users_new_time_stamp.split(":").length - 1) !== 2) {
				alert("Incorrect format. There must be at least 2 colons in the new timestamp. Format: minutes:seconds:tenths of seconds (current: " + time_stamp + "). You entered: " + users_new_time_stamp);
				return false;
			}

			if( users_new_time_stamp.includes("-")) {
				alert("Incorrect format. All values must be positive. Format: minutes:seconds:tenths of seconds (current: " + time_stamp + "). You entered: " + users_new_time_stamp);
				return false;
			}


			if(users_new_time_stamp.split(":")[1].length === 1) {
				users_new_time_stamp = users_new_time_stamp.split(":")[0] + ":" + users_new_time_stamp.split(":")[1].padStart(2,"0") + ":" + users_new_time_stamp.split(":")[2];
			}

			if(users_new_time_stamp.split(":")[2].length > 1) {
				users_new_time_stamp = users_new_time_stamp.split(":")[0] + ":" + users_new_time_stamp.split(":")[1] + ":" + parseInt(users_new_time_stamp.split(":")[2]);
			}

			let users_minute = parseInt(users_new_time_stamp.split(":")[0]);
			let users_seconds = parseInt(users_new_time_stamp.split(":")[1]);
			let users_tenths = parseInt(users_new_time_stamp.split(":")[2]);
			if(isNaN(users_minute) || isNaN(users_seconds) || isNaN(users_tenths)) {
				alert("Incorrect format. Format: minutes:seconds:tenths of seconds (current: " + time_stamp + "). You entered: " + users_new_time_stamp);
				return false;
			}

			if(users_minute < 0 || users_seconds < 0 || users_tenths < 0) {
				alert("Incorrect format. Values must be positive. Format: minutes:seconds:tenths of seconds (current: " + time_stamp + "). You entered: " + users_new_time_stamp);
				return false;
			}


			if( users_seconds >= 60) {
				alert("Incorrect format. Seconds value must be less than 60. Format: minutes:seconds:tenths of seconds (current: " + time_stamp + "). You entered: " + users_new_time_stamp);
				return false;
			}

			if( users_tenths >= 10) {
				alert("Incorrect format. Tenths value  must be less than 10. Format: minutes:seconds:tenths of seconds (current: " + time_stamp + "). You entered: " + users_new_time_stamp);
				return false;
			}

			if(users_seconds) {

			}


			let users_new_start_pos = (users_minute * 600) + (users_seconds * 10) + users_tenths;

			if(users_new_start_pos < min_new_start_pos) {
				alert("This is too close to the beginning of the previous segment. It must be >= " + min_time_stamp);
				return false;
			}

			if(users_new_start_pos >= (right_segment.data.end_pos - adjust_value)) {
				alert("This is too close to or past the end of the current segment. It must be < " + max_time_stamp);
				return false;
			}

			right_segment.data.start_pos = users_new_start_pos;
			left_segment.data.end_pos = users_new_start_pos - 1;


			right_segment.SegmentTimestampInputBoxText.innerText = users_new_time_stamp;
			//below is for a future ending timestamp box
			// left_segment.SegmentTimestampInputBoxText.innerText = users_new_time_stamp -1;

			[left_segment, right_segment].forEach((each, index)=>{
				let new_width_of_current_segment = ((((each.data.end_pos/each.parent.parent.resolution) - (each.data.start_pos/each.parent.parent.resolution)) * each.parent.parent.scale) + (each.parent.parent.scale/each.parent.parent.resolution) -1) +  "px";
				// Brian, I don't know why this is needed: (this.parent.parent.scale/this.parent.parent.resolution) -1) 

				if(index === 0) { // LEFT
					each.segment.style.right = ((each.data.end_pos/each.parent.parent.resolution) * each.parent.parent.scale) + "px";
				} else if (index === 1) { // RIGHT
					each.segment.style.left = ((each.data.start_pos/each.parent.parent.resolution) * each.parent.parent.scale) + "px";
				}
				each.segment.style.width =  new_width_of_current_segment;
			})
			
		}
		AdjustTimeStamp(sent_direction, sent_location) {

			let direction = sent_direction;
			let location = sent_location;

			let index_of_left_segment = -1;
			let index_of_right_segment = -1;
			let left_segment;
			let right_segment;
			let adjust_value = 10;

			for (let i = 0; i < this.parent.segment_array.length ; i++) {
				let each = this.parent.segment_array[i];

				if(location === "beginning") {
					if ( (this.data.start_pos - 1) === each.data.end_pos) {
						left_segment = each;
						right_segment = this;
					}
				} else if (location === "ending") {
					if (this.data.end_pos === (each.data.start_pos - 1)) {
						left_segment = this;
						right_segment = each;
					}
				}
			}

			
			if( typeof left_segment === "undefined" || typeof right_segment === "undefined") {
				alert(`The ${location} position of the first segment cannot be changed.`)
				return false;
			}
			
			let left_segment_current_width = left_segment.data.end_pos - left_segment.data.start_pos;
			let right_segment_current_width = right_segment.data.end_pos - right_segment.data.start_pos;

			if( ((left_segment_current_width <= adjust_value) && direction === "decrease" )) {
				alert("The left segment is the minimum width and can't get any smaller")
				return false;
			}

			if( ((right_segment_current_width <= adjust_value) && direction === "increase" )) {
				alert("The right segment is the minimum width and can't get any smaller")
				return false;
			}

			if(direction === "increase") {
				right_segment.data.start_pos += adjust_value;
				left_segment.data.end_pos += adjust_value;
			} else if(direction === "decrease") {
				left_segment.data.end_pos -= adjust_value;
				right_segment.data.start_pos -= adjust_value;
			}


			if (left_segment.data.start_pos < 0) {	left_segment.data.start_pos = 0;	}
			if (right_segment.data.end_pos > this.parent.parent_file_length) {right_segment.data.end_pos = this.parent.parent_file_length}

			let time_stamp_hour = Math.floor((right_segment.data.start_pos/adjust_value)/60);
			let time_stamp_minute = String(Math.floor((right_segment.data.start_pos/adjust_value)%60)).padStart(2,'0');
			let time_stamp_seconds = String((right_segment.data.start_pos)%adjust_value).padStart(1,'0');
			let time_stamp = time_stamp_hour + ":" + time_stamp_minute + ":" + time_stamp_seconds;
			right_segment.SegmentTimestampInputBoxText.innerText = time_stamp;

			// Brian, you need to update the starting timestamp of the right segment if increase

			[left_segment, right_segment].forEach((each, index)=>{
				let new_width_of_current_segment = ((((each.data.end_pos/each.parent.parent.resolution) - (each.data.start_pos/each.parent.parent.resolution)) * each.parent.parent.scale) + (each.parent.parent.scale/each.parent.parent.resolution) -1) +  "px";
				// Brian, I don't know why this is needed: (this.parent.parent.scale/this.parent.parent.resolution) -1) 

				if(index === 0) { // LEFT
					each.segment.style.right = ((each.data.end_pos/each.parent.parent.resolution) * each.parent.parent.scale) + "px";
				} else if (index === 1) { // RIGHT
					each.segment.style.left = ((each.data.start_pos/each.parent.parent.resolution) * each.parent.parent.scale) + "px";
				}
				each.segment.style.width =  new_width_of_current_segment;
			})
		}
		ChangeTextFormat(sent_style)
			{
				if(sent_style.style === "fontSize")
					{
						if (sent_style.type === "increase")
							{
								this.segment_text_1.style[sent_style.style] = (parseInt(this.segment_text_1.style[sent_style.style]) + 1) + "px";
								this.data.text[0].styles[sent_style.style] = (parseInt(this.segment_text_1.style[sent_style.style]) + 1) + "px";
							}
						else if(sent_style.type === "decrease")
							{
								this.segment_text_1.style[sent_style.style] = (parseInt(this.segment_text_1.style[sent_style.style]) - 1) + "px";
								this.data.text[0].styles[sent_style.style] = (parseInt(this.segment_text_1.style[sent_style.style]) - 1) + "px";								
							}
					}
				else if(this.segment_text_1.style[sent_style.style] === sent_style.value)
					{
						this.segment_text_1.style[sent_style.style] = "unset";
						this.data.text[0].styles[sent_style.style] = "unset";	
					}
				else
					{
						this.segment_text_1.style[sent_style.style] = sent_style.value;
						this.data.text[0].styles[sent_style.style] = sent_style.value;	
					}
			}					
		SegmentPresenceStartRangeHandler(e, direction)
			{
				
				let new_saturation_value = (e.target.value/GLOBAL_presence_scale).toFixed(1);
				let formated_color_value;

				let first_color_saturation_value;
				let second_color_saturation_value;
				try
					{ first_color_saturation_value = 10 - parseInt(this.data.styles.clipPath.replace("polygon(","").replace(")","").split(", ")[1].split(" ")[1])/10; }
				catch(error)
					{ first_color_saturation_value = 10; }						
					
				try
					{ second_color_saturation_value = 10 - parseInt(this.data.styles.clipPath.replace("polygon(","").replace(")","").split(", ")[0].split(" ")[1])/10; }
				catch(error)
					{ second_color_saturation_value = 10; }							
				// set the sliders to the value of the first layer/segment selected



				let urlText = "";
				let initial_value = this.data.color;
				let color_value_1 = "";
				let color_value_2 = "";
				let initial_saturation_1 = "1.0";
				let initial_saturation_2 = "1.0";

				[color_value_1, initial_saturation_1, urlText] = this.parent.parent.GetRGBA_Values({value: initial_value, num:0});
				[color_value_2, initial_saturation_2, urlText] = this.parent.parent.GetRGBA_Values({value: initial_value, num:1});

				
				// if(this.parent.parent.PresenceSliderEnd.disabled === true)
				if(this.data.presence_sync === true)
					{
						if (this.parent.parent.segment_decrescendo === "gradient")
							{
								// let color_value = this.data.color.split(", ")[1].slice(0,-4);
								// let new_color_value = color_value + new_saturation_value + ")";
								let new_color_value = color_value_1 + new_saturation_value + ")";
								formated_color_value = "linear-gradient(to right, " + new_color_value + ", " + new_color_value + ")";									
								this.data.start_presence = parseInt(e.target.value);
								this.data.end_presence = parseInt(e.target.value);
							}
						else if (this.parent.parent.segment_decrescendo === "slope" && new_saturation_value > 0)
							{
								this.segment.style.clipPath = "polygon(0 " + parseInt((10 - (new_saturation_value * 10)) * 10) + "%, 100% " + parseInt((10 - new_saturation_value * 10) * 10) + "%, 100% 100%, 0 100%)";
								this.data.styles.clipPath =  "polygon(0 " + parseInt((10 - (new_saturation_value * 10)) * 10) + "%, 100% " + parseInt((10 - new_saturation_value * 10) * 10) + "%, 100% 100%, 0 100%)";
								this.SegmentPresenceEndRange.value = this.SegmentPresenceStartRange.value;
							}						
					}
				else
					{
						console.log("first_color_saturation_value: " + first_color_saturation_value);
						if(direction === "start")
							{
								if (this.parent.parent.segment_decrescendo === "gradient")
								{
									// let color_value = this.data.color.split(", ")[1].slice(0,-4);
									// let ending_color = this.data.color.split(", ")[2];
									// let new_color_value = color_value + new_saturation_value + ")";
									
									let new_color_value = color_value_1 + new_saturation_value + ")";
									let new_color_value_2 = color_value_2 + initial_saturation_2 + "))";
									// formated_color_value = "linear-gradient(to right, " + new_color_value + ", " + ending_color;
									formated_color_value = "linear-gradient(to right, " + new_color_value + ", " + new_color_value_2;
									this.data.start_presence = parseInt(e.target.value);
								}
							else if (this.parent.parent.segment_decrescendo === "slope" && (first_color_saturation_value > 0 || new_saturation_value > 0 ))
								{
									this.segment.style.clipPath = "polygon(0 " + parseInt((10 - (new_saturation_value * 10)) * 10) + "%, 100% " + parseInt((10 - (first_color_saturation_value )) * 10) + "%, 100% 100%, 0 100%)";
									this.data.styles.clipPath = "polygon(0 " + parseInt((10 - (new_saturation_value * 10)) * 10) + "%, 100% " + parseInt((10 - (first_color_saturation_value )) * 10) + "%, 100% 100%, 0 100%)";
								}
							}
						else if(direction === "end")
							{	
								if (this.parent.parent.segment_decrescendo === "gradient")
								{
									let color_value = this.data.color.split(", ")[2].slice(0,-5);
									let starting_color = this.data.color.split(", ")[1];
									let new_color_value = color_value_1 + new_saturation_value + "))";
									let new_color_value_2 = color_value_2 + initial_saturation_1 + ")";
									// formated_color_value = "linear-gradient(to right, " + starting_color + ", " + new_color_value;
									formated_color_value = "linear-gradient(to right, " + new_color_value_2 + ", " + new_color_value;
									this.data.end_presence = parseInt(e.target.value);
								}
							else if (this.parent.parent.segment_decrescendo === "slope" && (second_color_saturation_value > 0 || new_saturation_value > 0 ))
								{
									this.segment.style.clipPath = "polygon(0 " + parseInt((10 - (second_color_saturation_value )) * 10) + "%, 100% " + parseInt((10 - (new_saturation_value * 10)) * 10) + "%, 100% 100%, 0 100%)";
									this.data.styles.clipPath =  "polygon(0 " + parseInt((10 - (second_color_saturation_value )) * 10) + "%, 100% " + parseInt((10 - (new_saturation_value * 10)) * 10) + "%, 100% 100%, 0 100%)";
								}
							}		
					}

				
				if(typeof formated_color_value !== "undefined")
					{
						this.data.color = urlText + formated_color_value;
						this.segment.style.background =  urlText + formated_color_value;
						this.data.styles.background = urlText + formated_color_value;
					}

					// console.log("this.data.start_presence: " + this.data.start_presence);
					// console.log("this.data.end_presence: " + this.data.end_presence);

			}
		SegmentTextInput_input_handler(e)
			{
				this.parent.parent.in_text_editor = true;
				 this.data.text[0].inner_text = e.target.value;
				//  this.segment.innerText = e.target.value;
				this.segment_text_1.innerText = e.target.value;
				this.SegmentTextInput.dataset.text_value = e.target.value;
				
			}
		segment_double_click_handler()
			{
				// this.segment.contentEditable = true;
				this.segment_text_1.contentEditable = true;
				this.segment_text_1.focus();
				// this.TextEditingMenuContainer_SingleSegment.style.display = "flex";
				// this.segment.focus();
			}
		tapHandler(event)
			{
				// iOS doesn't acknowledge double tapping so this is the workaround
				if(!this.tapedTwice)
					{
						this.tapedTwice = true;
						// console.log("tapedTwice = " + this.tapedTwice);
						setTimeout( () =>
							{
								this.tapedTwice = false;
								// console.log("tapedTwice = " + this.tapedTwice);
							}, 300 );
						return false;
					}
					event.preventDefault();
					//action on double tap goes below
					// alert('You tapped me Twice !!!');
					this.segment_text_1.contentEditable = true;
					this.segment_text_1.focus();
			}
		segment_text_input_handler(e)
			{
				this.data.text[0].inner_text = e.target.innerText;
				this.SegmentTextInput.value = e.target.innerText;
				this.SegmentTextInput.dataset.text_value = e.target.innerText;
				this.parent.parent.example_data.layers[this.parent.layer_data.layer_id_pos].segments[this.segment_index].text[0].inner_text = e.target.innerText;
				this.parent.parent.save_state();
			}
		segment_text_click_handler(e)
			{

				// left control key is not being held, then only allow one segment to be selected at a time
				let deselect = false;
				deselect = this.segment.classList.contains("segment_selected");
				if(shift_down === false)
					{}

				this.parent.parent.hide_all_TextEditingMenuContainer_SingleSegments();

				
				if (deselect === false) {
					this.parent.parent.store_most_recent_layer_and_segment(this);
				}


				if (metakey_down === true && shift_down === true) {
					this.parent.select_contiguous_segments(this);
				}

				[...this.parent.parent.TextEditingMenuContainer.children].forEach(each=>each.style.cursor = "not-allowed");
				
				if(deselect === true)
					{
						// deselect this segment
						this.segment.classList.remove("segment_selected");
						this.segment_table_row.classList.remove("segment_row_selected");
						if(this.data.classes.includes("segment_selected"))
							{
								this.data.classes.splice(this.data.classes.indexOf("segment_selected"));
							}
						this.PresenceSliderStart.value = GLOBAL_presence_scale;
						this.PresenceSliderEnd.value = GLOBAL_presence_scale;
						this.parent.parent.PresenceSliderStart.disabled = true;
						this.parent.parent.PresenceSliderEnd.disabled = true;
					}
				else
					{
						// select this segment
						this.segment.classList.add("segment_selected");
						this.segment_table_row.classList.add("segment_row_selected");

						let first_color_saturation_value;
						let second_color_saturation_value;
						try
							{
								first_color_saturation_value = 10 - parseInt(this.data.styles.clipPath.replace("polygon(","").replace(")","").split(", ")[1].split(" ")[1])/10;
							}
						catch(error)
							{ first_color_saturation_value = 10; }

							try
							{
								second_color_saturation_value = 10 - parseInt(this.data.styles.clipPath.replace("polygon(","").replace(")","").split(", ")[0].split(" ")[1])/10;
							}
						catch(error)
							{ second_color_saturation_value = 10; }							

						if(first_color_saturation_value === second_color_saturation_value)
							{
								this.parent.parent.PresenceSliderIndependentButton.children[0].classList.remove("bi-unlock");
								this.parent.parent.PresenceSliderIndependentButton.children[0].classList.add("bi-lock");
							}
						else
							{
								this.parent.parent.PresenceSliderIndependentButton.children[0].classList.remove("bi-lock");
								this.parent.parent.PresenceSliderIndependentButton.children[0].classList.add("bi-unlock");								
							}

						if (this.parent.parent.segment_decrescendo === "gradient")
							{

								this.PresenceSliderStart.value = this.data.start_presence; 
								this.PresenceSliderEnd.value = this.data.end_presence;
								// this.PresenceSliderStart.value = parseInt(this.data.start_presence * GLOBAL_presence_scale); 
								// this.PresenceSliderEnd.value = parseInt(this.data.end_presence * GLOBAL_presence_scale);
							}
						else if(this.parent.parent.segment_decrescendo === "slope")
							{
								this.PresenceSliderStart.value = second_color_saturation_value; 
								this.PresenceSliderEnd.value = first_color_saturation_value;
							}



						// this.data.start_presence = parseInt(this.PresenceSliderStart.value);
						// this.data.end_presence = parseInt(this.PresenceSliderEnd.value);
						this.parent.parent.PresenceSliderStart.disabled = false;
						
						if(this.parent.select_box.checked === false)
							{ this.parent.select_box.click(); }

							
						if(this.data.presence_sync === true)
							{ this.parent.parent.PresenceSliderEnd.disabled = true; }
						else
							{
								this.parent.parent.PresenceSliderEnd.disabled = false;
								this.parent.parent.PresenceSliderIndependentButton.children[0].classList.remove("bi-lock");
								this.parent.parent.PresenceSliderIndependentButton.children[0].classList.add("bi-unlock");									
							}

						[...this.parent.parent.TextEditingMenuContainer.children].forEach(each=>each.style.cursor = "auto");

					}
					
				this.tapHandler(e);					
			}
	}
class Auralayer
  {
    constructor()
      {
				this.url_activity_text = "";
				this.current_recent_layer_and_segment = {layer: -1, segment: -1}
				this.previous_recent_layer_and_segment = {layer: -1, segment: -1}
				this.undo_now = false;
				this.save_array = [];
				this.save_position = 0;
				this.in_text_editor = false;
				this.analysis_master_embed = false;
				this.view_mode_slider_top_button = false;
				this.load_from_file_mode = false;
				this.default_font_name = 'Cabin';
				this.skip_amount = 10;
				this.resolution = 10;
				this.program_version = "0_0";
				this.loaded_file_name_label = "";
				this.time_stamp_distance = 30;
				// this.colors = ["rgba(0,0,0,0)", "rgb(95,70,128)","rgb(212,129,46)","rgb(189,88,69)","rgb(227,177,60)","rgb(53,103,146)","rgb(88,164,164)","rgb(59,131,88)","rgb(127,174,86)"];
				this.colors = [ "95,70,128","212,129,46","189,88,69","227,177,60","53,103,146","88,164,164","59,131,88","127,174,86"];
				this.layers = [];
				this.example_data = example_data;
				if(Object.keys(this.example_data).length === 0)
					{ this.example_data = { piece_info: { media_type: "none", name: "new_auralayer", layer_id_pos: 0, scale: 3, color_count: 0, slider_thumb_offset: 0, slider_thumb_height: 0, segment_decrescendo: "slope" }, layers: [] }}
				this.scale = this.example_data.piece_info.scale;
				this.color_count = this.example_data.piece_info.color_count;
				this.layer_id_pos = this.example_data.piece_info.layer_id_pos;
				this.slider_thumb_offset = this.example_data.piece_info.slider_thumb_offset;
				this.slider_thumb_height = this.example_data.piece_info.slider_thumb_height;
				this.segment_decrescendo = this.example_data.piece_info.segment_decrescendo;
				// this.segment_height = this.example_data.piece_info.segment_height;
				this.segment_height = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--segment-height'));
				this.audio_speed = 10;
				this.dragged_layer = -1;
				this.length_padding = GLOBAL_length_padding;
				this.check_for_url_data();
				this.create_activity_selection_interface();
				this.initialize_interface();
				if(developing === false) {
					this.prevent_navigation_without_warning();
				}
				if(this.url_activity_text !== "")
				{
					this.load_from_server(this.url_activity_text);	
					return false;
				}
      }
		store_most_recent_layer_and_segment(clicked_segment) {
			this.previous_recent_layer_and_segment.segment = this.current_recent_layer_and_segment.segment;
			this.previous_recent_layer_and_segment.layer = this.current_recent_layer_and_segment.layer;

			this.current_recent_layer_and_segment.segment = clicked_segment.segment_index;
			this.current_recent_layer_and_segment.layer = clicked_segment.parent.layer_data.layer_id_pos;
		}
		prevent_navigation_without_warning()
			{				
				if(this.analysis_master_embed === false)
					{
							// Enable navigation prompt
							window.onbeforeunload = function() {
								return true;
							};   
					}
			}	
		load_from_server(link_id)
			{
					// Read file from server given file name
					fetch("saves/" + link_id + ".auralayer")
					.then(response => response.json())
					.then(data_from_file => this.load_mechanism(data_from_file))
					.catch(error => console.log(error) );
			}
		load_mechanism(loaded_data)
			{
				this.loaded_file = loaded_data;
				console.log(this.loaded_file);
				this.load_from_file(this.loaded_file);
			}
		create_activity_selection_interface()
			{
				this.ActivitySelectionContainer = createNewElement({type: "div", classes:["ActivitySelectionContainer", "container-fluid"], parent: document.body});
				this.ActivitySelectionBody = createNewElement({type:"div", classes:["ActivitySelectionBody", "d-grid", "col-md-4", "col-10", "mx-auto", "justify-items-center", "gap-2"], parent: this.ActivitySelectionContainer });
			
					this.NewAuralayerFromYoutubeContainer = createNewElement({type: "div", classes:["NewAuralayerFromYoutubeContainer", "ActivityButtonContainer"], parent: this.ActivitySelectionBody});
						this.NewAuralayerFromYoutubeButton = createNewElement({type: "button", classes:["NewAuralayerFromYoutubeButton", "btn", "btn-primary"], parent: this.ActivitySelectionBody, properties:{innerText : "Create with YouTube link"}, events:{click: e=>this.StartYoutubeActivitySetup()}});
					this.NewAuralayerFromAudioFileContainer = createNewElement({type: "div", classes:["NewAuralayerFromAudioFileContainer", "ActivityButtonContainer"], parent: this.ActivitySelectionBody});
						this.NewAuralayerFromAudioFileButton = createNewElement({type: "button", classes:["NewAuralayerFromAudioFileButton", "btn", "btn-primary"], parent: this.ActivitySelectionBody, properties:{innerText : "Create with local audio file"}, events:{click: e=>this.StartAudioFileActivitySetup("nothing")}});
					this.OpenExistingAuralayerFromFileContainer = createNewElement({type: "div", classes:["OpenExistingAuralayerFromFileContainer", "ActivityButtonContainer"], parent: this.ActivitySelectionBody});
						this.OpenExistingAuralayerFromFileButton = createNewElement({type: "button", classes:["OpenExistingAuralayerFromFileButton", "btn", "btn-primary"], parent: this.ActivitySelectionBody, properties:{innerText : "Load .auralayer file"}, events:{click: e => this.ImportFromFile.click()}});						
					this.NewAuralayerFromAudioFileWithAbsoluteURL_Container = createNewElement({type: "div", classes:["NewAuralayerFromAudioFileWithAbsoluteURL_Container", "ActivityButtonContainer"], parent: this.ActivitySelectionBody, styles: {display: "none"}});
						this.NewAuralayerFromAudioFileWithAbsoluteURL_Button = createNewElement({type: "button", classes:["NewAuralayerFromAudioFileWithAbsoluteURL_Button", "btn", "btn-primary"], parent: this.ActivitySelectionBody, properties:{innerText : "Create with absolute URL"}, events:{click:() => this.StartAudioFileActivitySetup()}});					
				this.ActivitySelectionFooter = createNewElement({type:"div", classes:["ActivitySelectionFooter"], parent: this.ActivitySelectionContainer });

				this.ImportFromFile = createNewElement({type:'input', classes:["InterfaceButton"], parent: document.body, properties:{type:'file'}, styles:{display:'none'}, events:{change: e=>this.RequestFileFromUser(e)}});
			
				if(location.hostname.includes("localhost")) { this.NewAuralayerFromAudioFileWithAbsoluteURL_Container.style.display = "flex";}
			}
    initialize_interface()
      {
        // this.AuralayerProgram = createNewElement({type:"div", classes: ["AuralayerProgram"], parent: document.body});
				this.AuralayerProgram = document.querySelector(".AuralayerProgram");

			// -----------------------------------
			//      MAIN INTERFACE COMPONENTS
			// -----------------------------------        
        // this.Header = createNewElement({type:"header", classes: ["Header_al"], parent: this.AuralayerProgram});
				this.Header = document.querySelector(".Header_al");

        // this.Body_al = createNewElement({type:"main", classes: ["Body_al", "d-flex", "flex-nowrap"], parent: this.AuralayerProgram});

				// this.Body_al = createNewElement({type:"main", classes: ["Body_al"], parent: this.AuralayerProgram});
				this.Body_al = document.querySelector(".Body_al");

        // this.Footer = createNewElement({type:"footer", classes: ["Footer_al"], parent: this.AuralayerProgram});
				this.Footer = document.querySelector(".Footer_al");
        // this.LeftOuterColumn = createNewElement({type:"div", classes: ["LeftOuterColumn"], parent: this.AuralayerProgram});
				// this.RightOuterColumn = createNewElement({type:"div", classes: ["RightOuterColumn"], parent: this.AuralayerProgram});

			// -----------------------------------
			//      HEADER COMPONENTS
			// -----------------------------------
				// this.HeaderContainer = createNewElement({type: "div", classes:["HeaderContainer", "container-fluid"], parent: this.Header});
				this.HeaderContainer = document.querySelector(".HeaderContainer");
					// this.HeaderRow = createNewElement({type: "div", classes: ["HeaderRow", "row", "my-1", "justify-content-between", "flex-nowrap"], parent: this.HeaderContainer});
					this.HeaderRow = document.querySelector(".HeaderRow");

						// this.HeaderRowLeft = createNewElement({type: "div", classes: ["HeaderRowLeft", "col-auto", "col-md-4", "d-flex", "align-content-center"], parent: this.HeaderRow});

						this.HeaderRowLeft = document.querySelector(".HeaderRowLeft");
							// this.HeaderSettingsGearButton = createNewElement({type:"button", classes: ["HeaderSettingsGearButton", "btn", "btn-outline-secondary", "border-0"], parent: this.HeaderRowLeft, properties:{innerHTML: `<i class="bi-gear-fill"></i>`, type:"button", title: "Header settings gear button"}, dataset:{bsToggle: "offcanvas", bsTarget: "#offcanvasExample"}, attributes: {"aria-controls" : "offcanvasExample"}});
							this.HeaderSettingsGearButton = document.querySelector(".HeaderSettingsGearButton");

							// this.HeaderSettingsMenu = createNewElement({type:"div", classes:["HeaderSettingsMenu", "offcanvas", "offcanvas-start"], parent: this.HeaderRowLeft, properties:{id:"offcanvasExample", tabIndex: "-1"}, attributes:{"aria-labelledby": "Settings"}});
							this.HeaderSettingsMenu = document.querySelector(".HeaderSettingsMenu");

								// this.HeaderSettingsMenuHeader = createNewElement({type:"div", classes:["offcanvas-header"], parent: this.HeaderSettingsMenu});
								this.HeaderSettingsMenuHeader = document.querySelector(".HeaderSettingsMenuHeader");

									// this.HeaderSettingsMenuHeaderTitle = createNewElement({type: "h5", classes: ["offcanvas-title"], parent: this.HeaderSettingsMenuHeader, properties:{innerText: "Settings", id: "Settings"}});
									this.HeaderSettingsMenuHeaderTitle = document.querySelector(".HeaderSettingsMenuHeaderTitle");

									// this.HeaderSettingsMenuHeaderCloseButton = createNewElement({type: "button", classes:["HeaderSettingsMenuHeaderCloseButton", "btn-close"], parent: this.HeaderSettingsMenuHeader, properties:{type:"button"}, attributes:{"aria-label": "Close"}, dataset:{ bsDismiss: "offcanvas"}});
									this.HeaderSettingsMenuHeaderCloseButton = document.querySelector(".HeaderSettingsMenuHeaderCloseButton");

								// this.HeaderSettingsMenuBody = createNewElement({type:"div", classes:["offcanvas-body"], parent: this.HeaderSettingsMenu});
								this.HeaderSettingsMenuBody = document.querySelector(".HeaderSettingsMenuBody");

									// this.SegmentDecresendoSelectContainer = createNewElement({type: "p", classes:["SegmentDecresendoSelectContainer"], parent: this.HeaderSettingsMenuBody});
									this.SegmentDecresendoSelectContainer = document.querySelector(".SegmentDecresendoSelectContainer");

										// this.SegmentDecresendoSelectLabel = createNewElement({type:"label", classes:[], parent:this.SegmentDecresendoSelectContainer, properties:{innerText: "Segment decrescendo", htmlFor: "decrescendo"}});
										this.SegmentDecresendoSelectLabel = document.querySelector(".SegmentDecresendoSelectLabel");
										
										// this.SegmentDecresendoSelectBox = createNewElement({type:"select", classes:["form-select"], parent:this.SegmentDecresendoSelectContainer, attributes:{"aria-label": "Segment decrescendo"}, events:{change:e=>this.SegmentDecresendoSelectBoxHandler(e)}});
										this.SegmentDecresendoSelectBox = document.querySelector(".SegmentDecresendoSelectBox");
										this.SegmentDecresendoSelectBox.addEventListener("change", e=>this.SegmentDecresendoSelectBoxHandler(e));

											// this.SegmentDecresendoSelectBoxOption2 = createNewElement({type:"option", classes:[], parent:this.SegmentDecresendoSelectBox, properties:{value:"slope", innerText:"Slope"}, attributes:{selected: true}});
											this.SegmentDecresendoSelectBoxOption2 = document.querySelector(".SegmentDecresendoSelectBoxOption2");

											// this.SegmentDecresendoSelectBoxOption1 = createNewElement({type:"option", classes:[], parent:this.SegmentDecresendoSelectBox, properties:{value:"gradient", innerText:"Gradient"}});
											this.SegmentDecresendoSelectBoxOption1 = document.querySelector(".SegmentDecresendoSelectBoxOption1");

									// this.SegmentColorPaletteSelectContainer = createNewElement({type: "p", classes:["SegmentColorPaletteSelectContainer"], parent: this.HeaderSettingsMenuBody});
									this.SegmentColorPaletteSelectContainer = document.querySelector(".SegmentColorPaletteSelectContainer" );

									// this.SegmentColorPaletteSelectLabel = createNewElement({type:"label", classes:[], parent:this.SegmentColorPaletteSelectContainer, properties:{innerText: "Segment color palette (coming soon)", htmlFor: "palette"}});
									this.SegmentColorPaletteSelectLabel = document.querySelector(".SegmentColorPaletteSelectLabel");

										// this.SegmentColorPaletteSelectBox = createNewElement({type:"select", classes:["form-select"], parent:this.SegmentColorPaletteSelectContainer, attributes:{"aria-label": "Color palette"}, properties:{disabled: true}});
										this.SegmentColorPaletteSelectBox = document.querySelector(".SegmentColorPaletteSelectBox");
										
											// this.SegmentColorPaletteSelectBoxOption1 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"1", innerText:"Bright", selected: true}});
											// this.SegmentColorPaletteSelectBoxOption2 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"2", innerText:"Dark"}});
											// this.SegmentColorPaletteSelectBoxOption3 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"3", innerText:"Warm"}});
											// this.SegmentColorPaletteSelectBoxOption4 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"4", innerText:"Cool"}});
											// this.SegmentColorPaletteSelectBoxOption5 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"5", innerText:"Rainbow"}});
											// this.SegmentColorPaletteSelectBoxOption6 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"6", innerText:"Rainbow (desaturated)"}});
											// this.SegmentColorPaletteSelectBoxOption7 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"7", innerText:"Sunset"}});
											// this.SegmentColorPaletteSelectBoxOption8 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"8", innerText:"Green–Black"}});
											// this.SegmentColorPaletteSelectBoxOption9 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"9", innerText:"Pink–Blue"}});
											// this.SegmentColorPaletteSelectBoxOption10 = createNewElement({type:"option", classes:[], parent:this.SegmentColorPaletteSelectBox, properties:{value:"10", innerText:"Cornflower–White"}});
										
											this.SegmentColorPaletteSelectBoxOption1 = document.querySelector(".SegmentColorPaletteSelectBoxOption1");
											this.SegmentColorPaletteSelectBoxOption2 = document.querySelector(".SegmentColorPaletteSelectBoxOption2");
											this.SegmentColorPaletteSelectBoxOption3 = document.querySelector(".SegmentColorPaletteSelectBoxOption3");
											this.SegmentColorPaletteSelectBoxOption4 = document.querySelector(".SegmentColorPaletteSelectBoxOption4");
											this.SegmentColorPaletteSelectBoxOption5 = document.querySelector(".SegmentColorPaletteSelectBoxOption5");
											this.SegmentColorPaletteSelectBoxOption6 = document.querySelector(".SegmentColorPaletteSelectBoxOption6");
											this.SegmentColorPaletteSelectBoxOption7 = document.querySelector(".SegmentColorPaletteSelectBoxOption7");
											this.SegmentColorPaletteSelectBoxOption8 = document.querySelector(".SegmentColorPaletteSelectBoxOption8");
											this.SegmentColorPaletteSelectBoxOption9 = document.querySelector(".SegmentColorPaletteSelectBoxOption9");
											this.SegmentColorPaletteSelectBoxOption10 = document.querySelector(".SegmentColorPaletteSelectBoxOption10");

						// this.HeaderRowCenter = createNewElement({ type: "div", classes: [ "HeaderRowCenter", "col-auto", "col-md-4", "text-center", "d-flex", "align-content-center"], parent: this.HeaderRow, properties: { id: "page-header" }, });
						this.HeaderRowCenter = document.querySelector(".HeaderRowCenter");
						// this.HeaderRowRight = createNewElement({type: "div", classes: ["HeaderRowRight","col-auto","col-md-4","d-flex","justify-content-end","align-content-center"], parent: this.HeaderRow, properties:{id: "page-header"}});
						this.HeaderRowRight = document.querySelector(".HeaderRowRight");			

			

			// -----------------------------------
			//      BODY COMPONENTS (not document.body but Auralayer's body)
			// -----------------------------------

				// this.BodyContainer = createNewElement({type:"div", classes:["BodyContainer", "container-fluid"], parent: this.Body_al});
				this.BodyContainer = document.querySelector(".BodyContainer");
					this.UtilitiesContainer = document.querySelector(".UtilitiesContainer");
					// this.AllLayerContainers = createNewElement({type:"div", classes: ["AllLayerContainers"], parent: this.BodyContainer});
					this.AllLayerContainers = document.querySelector(".AllLayerContainers");
					this.AllLayerContainers.addEventListener("dragover", e=> { this.dragging_handler(e) });
					this.AllLayerContainers.addEventListener("touchmove", e=> { this.dragging_handler(e) });
						// this.LoadingSpinner = createNewElement({type:"div", classes:["LoadingSpinner", "spinner-border", "text-primary"], parent: this.AllLayerContainers, properties:{role: "status", innerHTML: `<span class="visually-hidden">Loading...</span>`}, styles:{display: "none"}});
						this.LoadingSpinner = document.querySelector(".LoadingSpinner");
					// this.SliderContainer = createNewElement({type: "div", classes: ["SliderContainer"], parent: this.BodyContainer});
					this.SliderContainer = document.querySelector(".SliderContainer");

				// this.SegmentEditingSuperContainer = createNewElement({type: "div",classes: ["SegmentEditingSuperContainer", "col-lg-8", "mx-auto"],parent: this.Body_al,});
				this.SegmentEditingSuperContainer = document.querySelector(".SegmentEditingSuperContainer");
				// this.SegmentEditingContainer = createNewElement({type:"div", classes: ["SegmentEditingContainer","row", "justify-content-md-around", "align-items-center", "g-2", "my-3"], parent: this.SegmentEditingSuperContainer, properties:{id:"interface-container"}});
				this.SegmentEditingContainer = document.querySelector(".SegmentEditingContainer");

				

			// -----------------------------------
			//       SLIDER CONTAINER COMPONENTS
			// -----------------------------------    

				// this.SeekSlider = createNewElement({type: "input", classes: ["slider", "SeekSlider" ], parent: this.SliderContainer, properties:{type: "range", value: 0 }});
				this.SeekSlider = document.querySelector(".SeekSlider");
				this.SeekSlider.addEventListener("input", (e) => this.seek_slider_moved_handler(e));


			// -----------------------------------
			//      LEFT OUTER COLUMN COMPONENTS
			// -----------------------------------       
				// this.UndoZoomContainer = createNewElement ( {type:"div", classes:["UndoZoomContainer", "col"], parent: this.UtilitiesContainer, properties:{id: "undo-redo"} } );


				// this.UndoZoomContainer = createNewElement ( {type:"div", classes:["UndoZoomContainer"], parent: this.HeaderRowRight, properties:{id: "undo-redo"} } );
				this.UndoZoomContainer = document.querySelector(".UndoZoomContainer");

					// this.UndoButtonGroup = createNewElement ( {type:"div", classes:["UndoButtonGroup", "btn-group"], parent: this.UndoZoomContainer, properties:{role: "group"} } );
					this.UndoButtonGroup = document.querySelector(".UndoButtonGroup" );

						// this.UndoButton = createNewElement({type: "button", classes:["UndoButton", "btn", "btn-outline-secondary", "border-0"], parent: this.UndoButtonGroup, properties: {innerText: "Undo", type:"button", title: "Undo", innerHTML: `<i class="bi-arrow-counterclockwise"></i>`}});
						this.UndoButton = document.querySelector(".UndoButton");
						this.UndoButton.addEventListener("click", e=>{this.undo_handler()});
						// this.RedoButton = createNewElement({type: "button", classes:["RedoButton", "btn", "btn-outline-secondary", "border-0"], parent: this.UndoButtonGroup, properties: {innerText: "Redo", type:"button", title: "Redo", innerHTML: `<i class="bi-arrow-clockwise"></i>`}});
						this.RedoButton = document.querySelector(".RedoButton");
						this.RedoButton.addEventListener("click", e=>{this.redo_handler()});


					// this.ZoomButtonGroup = createNewElement ( {type:"div", classes:["ZoomButtonGroup", "btn-group", "mx-2"], parent: this.UndoZoomContainer, properties:{role: "group"} } );
					this.ZoomButtonGroup = document.querySelector(".ZoomButtonGroup" );

						// this.ZoomOutButton = createNewElement({type:"button", classes:["ZoomOutButton", "btn", "btn-outline-secondary", "border-0"], parent: this.ZoomButtonGroup, properties: {type: "button", title: "Zoom out", innerHTML: `<i class="bi-zoom-out"></i>`}});
						this.ZoomOutButton = document.querySelector(".ZoomOutButton" );
						this.ZoomOutButton.addEventListener("click", e=>{this.zoom_handler("out")});				
						// this.ZoomInButton = createNewElement({type:"button", classes:["ZoomInButton", "btn", "btn-outline-secondary", "border-0"], parent: this.ZoomButtonGroup, properties: {type: "button", title: "Zoom in", innerHTML:`<i class="bi-zoom-in"></i>`}});
						this.ZoomInButton = document.querySelector(".ZoomInButton");
						this.ZoomInButton.addEventListener("click", e=>{this.zoom_handler("in")});


			// -----------------------------------
			//      AUDIO CONTROLs
			// -----------------------------------  				

					// this.audio_play_button = createNewElement({type:"button", classes:["audio_play_button", "btn", "btn-outline-secondary", "border-0"], parent: this.UndoZoomContainer, properties: {innerHTML: `<i class="bi-play-circle"></i>`, title: "Play Audio Button"}, events: {click: e=>this.play_button_handler(e)}});
					this.audio_play_button = document.querySelector(".audio_play_button");
					this.audio_play_button.addEventListener( "click",  e=> this.play_button_handler(e) );
					// this.audio_pause_button = createNewElement({type:"button", classes:["audio_pause_button", "btn", "btn-outline-secondary", "rounded-0", "rounded-top", "border-0"], parent: this.UndoZoomContainer, properties: {innerHTML: `<i class="bi-pause-circle"></i>`}});

			// -----------------------------------
			//    LAYER EDITING CONTAINER COMPONENTS
			// -----------------------------------    

				// this.LayerEditingContainer = createNewElement({type:"div", classes:["col-md-3", "text-md-start", "text-center"], parent: this.SegmentEditingContainer, properties: {id:"new-layer"}});
				this.LayerEditingContainer = document.querySelector(".LayerEditingContainer");
				
					// this.LayerEditingRow = createNewElement({type:"div", classes:["LayerEditingRow", "row", "align-items-center", "flex-nowrap"], parent: this.LayerEditingContainer, properties:{}});	
					this.LayerEditingRow = document.querySelector(".LayerEditingRow");	

						// this.AddLayerRowContainer = createNewElement({type:"div", classes:["AddLayerRowContainer", "col-4"], parent: this.LayerEditingRow, properties:{}});
						this.AddLayerRowContainer = document.querySelector(".AddLayerRowContainer");

							// this.AddLayerButton = createNewElement({type:"button", classes: ["AddLayerButton", "btn", "btn-primary"], parent: this.AddLayerRowContainer, properties: {innerHTML: `<i class="bi-plus-lg"></i>`, title: "Add new layer", type: "button"}});
							this.AddLayerButton = document.querySelector(".AddLayerButton");
							this.AddLayerButton.addEventListener("click", e=>this.add_layer_handler());			

			// -----------------------------------
			//    SEGMENT EDITING CONTAINER COMPONENTS
			// -----------------------------------        
						


				// this.SegmentEditingSubContainer = createNewElement({type:"div", classes:["col-md-4", "text-center", "flex-nowrap"], parent: this.SegmentEditingContainer, properties:{id: "edit-layers"}});
				this.SegmentEditingSubContainer = document.querySelector(".SegmentEditingSubContainer");

					// this.SplitButton = createNewElement({type:"button", classes: ["SplitButton", "btn", "btn-primary"], parent: this.SegmentEditingSubContainer, properties: {innerHTML: `<i class="bi-layout-split"></i>`, type: "button", title: "Split"}});
					this.SplitButton = document.querySelector(".SplitButton");
					this.SplitButton.addEventListener('click', e=>this.split_selected_segment(e));

					// this.MergeButtonGroup = createNewElement({type:"div", classes:["btn-group"], parent: this.SegmentEditingSubContainer, properties:{role: "group"}});
					this.MergeButtonGroup = document.querySelector(".MergeButtonGroup");

						// this.MergeLeftButton = createNewElement({type:"button", classes: ["MergeLeftButton", "btn", "btn-primary"], parent: this.MergeButtonGroup, properties: {innerHTML: `<i class="bi-box-arrow-in-left"></i>`, role: "group", type: "button", title: "Merge left"}});
						this.MergeLeftButton = document.querySelector(".MergeLeftButton");
						this.MergeLeftButton.addEventListener('click', e=>this.merge_segments(e,"left"));

						// this.MergeRightButton = createNewElement({type:"button", classes: ["MergeRightButton", "btn", "btn-primary"], parent: this.MergeButtonGroup, properties: {innerHTML: `<i class="bi-box-arrow-in-right"></i>`, role: "group", type: "button", title: "Merge right"}});
						this.MergeRightButton = document.querySelector(".MergeRightButton");
						this.MergeRightButton.addEventListener('click', e=>this.merge_segments(e, "right"));				
				
						// this.AddMarkerButton = createNewElement({type:"button", classes: ["AddMarkerButton", "btn", "btn-primary"], parent: this.MergeButtonGroup, properties: {innerHTML: `<i class="bi-bookmark-plus-fill"></i>`, role: "group", type: "button", title: "Add Marker"}});
						// this.AddMarkerButton.addEventListener('click', e=>this.add_marker(e));

					// this.DeleteButton = createNewElement({type:"button", classes: ["DeleteButton", "btn", "btn-danger"], parent: this.SegmentEditingSubContainer, properties: {innerText: "Delete", type: "button", title: "Zero Presence", innerHTML: `<i class="bi-x-lg"></i>`}});
					this.DeleteButton = document.querySelector(".DeleteButton");
					this.DeleteButton.addEventListener('click', e=>this.delete_button_handler(e));					

				// this.ExportButtonContainer = createNewElement({type:"div", classes:["ExportButtonContainer", "col-md-2", "text-md-end", "text-center", "flex-nowrap"], parent: this.SegmentEditingContainer, properties:{id: "export"}});
				this.ExportButtonContainer = document.querySelector(".ExportButtonContainer");

					// this.SaveToFileButton = createNewElement({type: "button", classes: ["SaveToFileButton", "btn", "btn-secondary"], parent: this.ExportButtonContainer, properties: {innerHTML: `<i class="bi-download"></i>`, type: "button", title:"Save Analysis to File"}, dataset:{bsToggle: "modal", bsTarget: "#download"}});
					this.SaveToFileButton = document.querySelector(".SaveToFileButton");
					this.SaveToFileButton.addEventListener("click", e => { this.save_to_file(); });
					// this.SaveToFileButton.addEventListener("click", e => { download_image(); });

					// this.ShareAnalysisButton = createNewElement({type:"button", classes:["ShareAnalysisButton", "btn", "btn-secondary"], parent: this.ExportButtonContainer, properties:{innerHTML: `<i class="bi-share-fill"></i>`}, dataset:{bsToggle: "modal", bsTarget: "#share"}, events:{click: e=>this.create_shareable_link()}});
					// this.ShareAnalysisButton = createNewElement({type:"button", classes:["ShareAnalysisButton", "btn", "btn-secondary"], parent: this.ExportButtonContainer, properties:{innerHTML: `<i class="bi-share-fill"></i>`}, attributes:{title: "Share analysis button"}, events:{click: e=>this.create_shareable_link()}});
					this.ShareAnalysisButton = document.querySelector(".ShareAnalysisButton");
					this.ShareAnalysisButton.addEventListener("click", e=> this.create_shareable_link());

				// this.PresenceSliderContainer = createNewElement({type: "div", classes: ["PresenceSliderContainer", "col-7"], parent: this.LayerEditingRow, properties: {}});
				this.PresenceSliderContainer = document.querySelector(".PresenceSliderContainer");

					// this.PresenceSliderStartLabel = createNewElement({type:"label", classes:["form-label"], parent: this.PresenceSliderContainer, properties:{for: "presence_start", innerText: "Presence (start)"}});
					this.PresenceSliderStartLabel = document.querySelector(".PresenceSliderStartLabel");
					// this.PresenceSliderStart = createNewElement({type: "input", classes:["PresenceSliderStart", "presence_slider", "form-range"], parent: this.PresenceSliderContainer, properties:{type: "range"  , min: 0, max: GLOBAL_presence_scale, id: "presence_start", disabled: true}, attributes:{title: "Presence Slider Start"}});
					this.PresenceSliderStart = document.querySelector(".PresenceSliderStart");
					this.PresenceSliderStart.max = GLOBAL_presence_scale;
					this.PresenceSliderStart.addEventListener("input",e=>this.change_opacity(e,"start"));

					// this.PresenceSliderStartValueText = createNewElement({type:"div", classes:["PresenceSliderStartValueText"], parent: this.PresenceSliderContainer, properties:{innerText: this.PresenceSliderStart.value}});
					this.PresenceSliderStartValueText = document.querySelector(".PresenceSliderStartValueText");
					this.PresenceSliderStartValueText.innerText = this.PresenceSliderStart.value;


					// this.PresenceSliderEndLabel = createNewElement({type:"label", classes:["form-label"], parent: this.PresenceSliderContainer, properties:{for: "presence_end", innerText: "Presence (end)"}});
					this.PresenceSliderEndLabel = document.querySelector(".PresenceSliderEndLabel");
					// this.PresenceSliderEnd = createNewElement({type: "input", classes:["PresenceSliderEnd", "presence_slider", "form-range"], parent: this.PresenceSliderContainer, properties:{type: "range" , min: 0, max: GLOBAL_presence_scale, id:"presence_end",disabled: true} , attributes:{title: "Presence Slider End"}});
					this.PresenceSliderEnd = document.querySelector(".PresenceSliderEnd");
					this.PresenceSliderEnd.max = GLOBAL_presence_scale;
					this.PresenceSliderEnd.addEventListener("input",e=>this.change_opacity(e,"end"));

					// this.PresenceSliderEndValueText = createNewElement({type:"div", classes:["PresenceSliderEndValueText"], parent: this.PresenceSliderContainer, properties:{innerText: this.PresenceSliderEnd.value}});
					this.PresenceSliderEndValueText = document.querySelector(".PresenceSliderEndValueText");
					this.PresenceSliderEndValueText.innerText = this.PresenceSliderEnd.value;

				// this.PresenceLockContainer = createNewElement({type: "div", classes: ["PresenceLockContainer", "col-1", "align-items-center"], parent: this.LayerEditingRow, properties: {}});
				this.PresenceLockContainer = document.querySelector(".PresenceLockContainer");
					// this.PresenceLockDiv = createNewElement({type:"div", classes:["link-presence", "text-center"], parent: this.PresenceLockContainer});
					this.PresenceLockDiv = document.querySelector(".PresenceLockDiv");

						// this.PresenceSliderIndependentToggle = createNewElement({type:"input", classes: ["PresenceSliderIndependentToggle"], parent: this.PresenceLockDiv, properties: {type: "checkbox"}, styles:{display: "none"}});
						this.PresenceSliderIndependentToggle = document.querySelector(".PresenceSliderIndependentToggle");
						// this.PresenceSliderIndependentButton = createNewElement({type:"button", classes: ["PresenceSliderIndependentButton", "btn", "active", "btn-sm"], parent: this.PresenceLockDiv, properties: {innerHTML: `<i class="bi-link-45deg"></i>`}, dataset: {bsToggle: "button"}, attributes:{"aria-pressed": "Segment decrescendo"}});
						// this.PresenceSliderIndependentButton = createNewElement({type:"button", classes: ["PresenceSliderIndependentButton", "btn", "active", "btn-sm"], parent: this.PresenceLockDiv, properties: {innerHTML: `<i class="bi-lock"></i>`}, dataset: {bsToggle: "button"}, attributes:{"aria-pressed": "Segment decrescendo", title: "Presence slider indepenence toggle button"}});
						this.PresenceSliderIndependentButton = document.querySelector(".PresenceSliderIndependentButton");
						this.PresenceSliderIndependentButton.addEventListener("click", ()=>this.PresenceSliderIndependentToggle.click());
								
						this.PresenceSliderIndependentToggle.addEventListener("change",e=>
							{
								
								if(this.PresenceSliderEnd.disabled === false)
									{
										this.PresenceSliderStart.disabled = false;
										this.PresenceSliderEnd.disabled = true;
										
										// this.PresenceSliderIndependentButton.classList.remove("PresenceSliderIndependentButtonSelected");
										this.presence_slider_toggle_handler();
										// this.PresenceSliderIndependentButton.children[0].classList.remove("bi-link");
										// this.PresenceSliderIndependentButton.children[0].classList.add("bi-link-45deg");
										
										this.PresenceSliderIndependentButton.children[0].classList.remove("bi-unlock");
										this.PresenceSliderIndependentButton.children[0].classList.add("bi-lock");
									}
								else
									{
										
										this.PresenceSliderStart.disabled = false;
										this.PresenceSliderEnd.disabled = false;
										
										this.presence_slider_toggle_handler();
										// this.PresenceSliderIndependentButton.classList.add("PresenceSliderIndependentButtonSelected");
										// this.PresenceSliderIndependentButton.children[0].classList.remove("bi-link-45deg");
										// this.PresenceSliderIndependentButton.children[0].classList.add("bi-link");

										this.PresenceSliderIndependentButton.children[0].classList.remove("bi-lock");
										this.PresenceSliderIndependentButton.children[0].classList.add("bi-unlock");
									}
							});

					{/* <th role="columnheader" class="col-1">ID</th> */}

				let data_html = `
						<tr> 
								<th role="columnheader" class="col-1" data-sort-method="number">Time</th>
								<th role="columnheader" class="col-2">Layer</th>
								<th role="columnheader" class="col-5">Text</th>
								<th role="columnheader" class="col-2">Starting Presence</th>
								<th role="columnheader" class="col-2">Ending Presence</th>
						</tr>
				`; // These are supposed to add up to 12 ^^

				//data-sort-method="number"

				// this.TextEditingMenuContainer = createNewElement({type: "div",classes: ["TextEditingMenuContainer","btn-toolbar","justify-content-center"], parent: this.SegmentEditingSuperContainer,properties: {role: "toolbar",},});
				this.TextEditingMenuContainer = document.querySelector(".TextEditingMenuContainer");
					// this.AlignmentGroup = createNewElement({type: "div",classes: ["AlignmentGroup", "btn-group", "btn-group-small"],parent: this.TextEditingMenuContainer,properties: {role: "group"}});
					this.AlignmentGroup = document.querySelector(".AlignmentGroup");
					// this.TextFormatGroup = createNewElement({type: "div",classes: ["TextFormatGroup","btn-group","btn-group-small","mx-2"], parent: this.TextEditingMenuContainer,properties: {role: "group"}});
					this.TextFormatGroup = document.querySelector(".TextFormatGroup");
					// this.TextSizeGroup = createNewElement({type: "div",classes: ["TextSizeGroup", "btn-group", "btn-group-small"],parent: this.TextEditingMenuContainer,properties: {role: "group"}});
					this.TextSizeGroup = document.querySelector(".TextSizeGroup");

				// this.TextEditingLeftAlignButton = createNewElement({type: "button",classes: ["TextEditingButton","TextEditingLeftAlignButton","btn","btn-light",],parent: this.AlignmentGroup, properties:{ innerHTML: `<i class="bi-justify-left"></i>` }, attributes:{title: "Text editing left align button"}, events: {click: (e) => {this.ChangeTextFormat({style: "textAlign",value: "left"});}}});
				this.TextEditingLeftAlignButton = document.querySelector(".TextEditingLeftAlignButton");
				this.TextEditingLeftAlignButton.addEventListener( "click", (e) => {this.ChangeTextFormat({style: "textAlign",value: "left"})});

				// this.TextEditingCenterAlignButton = createNewElement({type: "button",classes: ["TextEditingButton","TextEditingCenterAlignButton","btn","btn-light",],parent: this.AlignmentGroup, properties:{ innerHTML: `<i class="bi-justify"></i>` }, attributes:{title: "Text editing center align button"}, events: {click: (e) => {this.ChangeTextFormat({style: "textAlign",value: "center"});}}});
				this.TextEditingCenterAlignButton = document.querySelector(".TextEditingCenterAlignButton");
				this.TextEditingCenterAlignButton.addEventListener("click", (e) => {this.ChangeTextFormat({style: "textAlign",value: "center"})});

				// this.TextEditingRightAlignButton = createNewElement({type: "button",classes: ["TextEditingButton","TextEditingRightAlignButton","btn","btn-light",],parent: this.AlignmentGroup, properties:{ innerHTML: `<i class="bi-justify-right"></i>` }, attributes:{title: "Text editing right align button"}, events: {click: (e) => {this.ChangeTextFormat({style: "textAlign",value: "right"});}}});
				this.TextEditingRightAlignButton = document.querySelector(".TextEditingRightAlignButton");
				this.TextEditingRightAlignButton.addEventListener("click", (e) => {this.ChangeTextFormat({style: "textAlign",value: "right"})});

				// this.TextEditingBoldButton = createNewElement({type: "button",classes: ["TextEditingButton","TextEditingBoldButton","btn","btn-light",],parent: this.TextFormatGroup, properties:{ innerHTML: `<i class="bi-type-bold"></i>` }, attributes:{title: "Text editing bold button"}, events: {click: (e) => {this.ChangeTextFormat({style: "fontWeight",value: "bold"});}}});
				this.TextEditingBoldButton = document.querySelector(".TextEditingBoldButton");
				this.TextEditingBoldButton.addEventListener("click", (e) => {this.ChangeTextFormat({style: "fontWeight",value: "bold"})});

				// this.TextEditingItalicButton = createNewElement({type: "button",classes: ["TextEditingButton","TextEditingItalicButton","btn","btn-light",],parent: this.TextFormatGroup,properties: { innerHTML: `<i class="bi-type-italic"></i>` }, attributes:{title: "Text editing italic button"}, events: {click: (e) => {this.ChangeTextFormat({style: "fontStyle",value: "italic"});}}});
				this.TextEditingItalicButton = document.querySelector(".TextEditingItalicButton");
				this.TextEditingItalicButton.addEventListener("click", (e) => {this.ChangeTextFormat({style: "fontStyle",value: "italic"})});

				// this.TextEditingStrikeThroughButton = createNewElement({type: "button",classes: ["TextEditingButton","TextEditingStrikeThroughButton","btn","btn-light",],parent: this.TextFormatGroup, properties:{innerHTML: `<i class="bi-type-strikethrough"></i>`,}, attributes:{title: "Text editing strike through button"}, events: {click: (e) => {this.ChangeTextFormat({style: "textDecoration", value: "line-through"});}}});
				this.TextEditingStrikeThroughButton = document.querySelector(".TextEditingStrikeThroughButton");
				this.TextEditingStrikeThroughButton.addEventListener("click", (e) => {this.ChangeTextFormat({style: "textDecoration", value: "line-through"})});


				// this.TextEditingFontSizeIncreaseButton = createNewElement({type: "button",classes: ["TextEditingButton","TextEditingFontSizeIncreaseButton","btn","btn-light",],parent: this.TextSizeGroup, properties:{ innerHTML: `A+` }, attributes:{title: "Text editing font size increase button"}, events: {click: (e) => {this.ChangeTextFormat({style: "fontSize",type: "increase"});}}});
				this.TextEditingFontSizeIncreaseButton = document.querySelector(".TextEditingFontSizeIncreaseButton");
				this.TextEditingFontSizeIncreaseButton.addEventListener("click", (e) => {this.ChangeTextFormat({style: "fontSize",type: "increase"})});

				// this.TextEditingFontSizeDecreaseButton = createNewElement({type: "button",classes: ["TextEditingButton","TextEditingFontSizeDecreaseButton","btn","btn-light",],parent: this.TextSizeGroup, properties:{ innerHTML: `A-` }, attributes:{title: "Text editing font size decrease button"}, events: {click: (e) => {this.ChangeTextFormat({style: "fontSize",type: "decrease"});}}});
				this.TextEditingFontSizeDecreaseButton = document.querySelector(".TextEditingFontSizeDecreaseButton");
				this.TextEditingFontSizeDecreaseButton.addEventListener("click", (e) => {this.ChangeTextFormat({style: "fontSize",type: "decrease"})});


				// this.AccordionContainer1 = createNewElement({type:"div", classes:["AccordionContainer1", "row", "text-center", "px-4"], parent: this.Body_al, properties:{id: "collapsing"}});
				this.AccordionContainer1 = document.querySelector(".AccordionContainer1");
					// this.AccordionContainer2 = createNewElement({type:"div", classes:["AccordionContainer2", "col-md-10", "col-xxl-8", "p-1", "m-auto"], parent: this.AccordionContainer1, properties:{}});
					this.AccordionContainer2 = document.querySelector(".AccordionContainer2");
						// this.AccordionContainer3 = createNewElement({type:"div", classes:["AccordionContainer3", "accordion"], parent: this.AccordionContainer2, properties:{id: "table-video"}});
						this.AccordionContainer3 = document.querySelector(".AccordionContainer3");
							// this.DataTableContainer1 = createNewElement({type:"div", classes:["DataTableContainer1", "accordion-item"], parent: this.AccordionContainer3, properties:{}});
							this.DataTableContainer1 = document.querySelector(".DataTableContainer1");
								// this.DataAccordionHeader = createNewElement({type:"h2", classes:["DataAccordionHeader", "accordion-header"], parent: this.DataTableContainer1, properties:{}});
								this.DataAccordionHeader = document.querySelector(".DataAccordionHeader");
									// this.DataAccordionButton = createNewElement({type:"button", classes:["DataAccordionButton", "accordion-button", "collapsed", "ps-5"], parent: this.DataAccordionHeader, properties:{type: "button", innerHTML: `<i class="bi-table"></i>&emsp; Data table`}, dataset:{bsToggle: "collapse", bsTarget: "#collapseOne"}, attributes:{"aria-expanded": "false", "aria-controls": "collapseOne"}});
									this.DataAccordionButton = document.querySelector(".DataAccordionButton");
								// this.DataAccordionBody = createNewElement({type:"div", classes:["DataAccordionBody", "accordion-collapse", "collapse"], parent: this.DataTableContainer1, properties:{id: "collapseOne"}, dataset:{bsParent: "#table-video"}});
								this.DataAccordionBody = document.querySelector(".DataAccordionBody");
									// this.DataAccordionBodyInterior = createNewElement({type:"div", classes:["DataAccordionBodyInterior", "accordion-body", "text-center"], parent: this.DataAccordionBody, properties:{}});
									this.DataAccordionBodyInterior = document.querySelector(".DataAccordionBodyInterior");
										// this.SearchTableInput = createNewElement({type:"input", classes:["table-filter"], parent: this.DataAccordionBodyInterior, properties:{type: "text", placeholder: "Item to filter.."}, dataset: {table: "order-table"}});
										this.SearchTableInput = document.querySelector(".SearchTableInput");
										// this.DataTableWrapper = createNewElement({type: "div",classes: ["col"],parent: this.DataAccordionBodyInterior});
										this.DataTableWrapper = document.querySelector(".DataTableWrapper");
											// this.DataTable = createNewElement({type: "table",classes: ["order-table", "table", "table-responsive"],parent: this.DataTableWrapper,});
											this.DataTable = document.querySelector(".DataTable");
												// this.TableBodyTHead = createNewElement({type:"thead", classes:["TableBodyTHead"], parent: this.DataTable, properties:{innerHTML: data_html}});
												this.TableBodyTHead = document.querySelector(".TableBodyTHead"); 
												// this.TableBodyTBody = createNewElement({type:"tbody", classes:["TableBodyTBody"], parent: this.DataTable, properties:{}});
												this.TableBodyTBody = document.querySelector(".TableBodyTBody");
										this.DataTableTable = new Tablesort(this.DataTable);
							// this.VideoContainer1 = createNewElement({type:"div", classes:["VideoContainer1", "accordion-item"], parent: this.AccordionContainer3, properties:{}});
							this.VideoContainer1 = document.querySelector(".VideoContainer1");
								// this.VideoAccordionHeader = createNewElement({type:"h2", classes:["VideoAccordionHeader", "accordion-header"], parent: this.VideoContainer1, properties:{}});
								this.VideoAccordionHeader = document.querySelector(".VideoAccordionHeader");
									// this.VideoAccordionButton = createNewElement({type:"button", classes:["VideoAccordionButton", "accordion-button", "collapsed","ps-5"], parent: this.VideoAccordionHeader, properties:{type: "button", innerHTML: `<i class="bi-youtube"></i>&emsp; Media`}, dataset:{bsToggle: "collapse", bsTarget: "#collapseTwo"}, attributes:{"aria-expanded": "false", "aria-controls": "collapseTwo"}});
									this.VideoAccordionButton = document.querySelector(".VideoAccordionButton");
								// this.VideoAccordionBody = createNewElement({type:"div", classes:["VideoAccordionBody", "accordion-collapse", "collapse"], parent: this.VideoContainer1, properties:{id: "collapseTwo"}, dataset:{bsParent: "#table-video"}});
								this.VideoAccordionBody = document.querySelector(".VideoAccordionBody");
									// this.VideoAccordionBodyInterior = createNewElement({type:"div", classes:["VideoAccordionBodyInterior", "accordion-body", "text-center"], parent: this.VideoAccordionBody, properties:{}});
									this.VideoAccordionBodyInterior = document.querySelector(".VideoAccordionBodyInterior");



			this.SearchTableInput.addEventListener("focus",e=> {this.in_text_editor = true});
			this.SearchTableInput.addEventListener("blur",e=>{this.in_text_editor = false});
			
			(function() {
				'use strict';
			
				
			var TableFilter = (function()
				{
					var Arr = Array.prototype;
					var input;
				
					function onInputEvent(e)
						{
							input = e.target;
							var table1 = document.getElementsByClassName(input.getAttribute('data-table'));
							Arr.forEach.call(table1, function(table)
								{
									Arr.forEach.call(table.tBodies, function(tbody)
										{
											Arr.forEach.call(tbody.rows, filter);
										});
								});
						}
			
					function filter(row)
						{
							var text = row.textContent.toLowerCase();

							if(row.querySelector(".SegmentTextInput").hasAttribute("data-text_value"))
								{
									let input_text_value = row.querySelector(".SegmentTextInput").dataset.text_value;
									if(input_text_value != "")
										{													
											text = text + input_text_value.toLowerCase();
											console.log("NEW: " + text);
										}
								}

							var val = input.value.toLowerCase();
							
							console.log(val);
							if(row.classList.contains("row_hidden_from_table") === false) {
								row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
							}
						}
			
					return{
						init: function()
							{
								var inputs = document.getElementsByClassName('table-filter');
								Arr.forEach.call(inputs, function(input) { input.oninput = onInputEvent; });
							}
						};
					
					})();
			
				console.log(document.readyState);
				document.addEventListener('readystatechange', function() {
					if (document.readyState === 'complete') {
						console.log(document.readyState);
						TableFilter.init();
					}
				}); 
				
				TableFilter.init(); 
			})();
			

			// Text Formatting Flyout Menu
			// this.TextEditingMenuContainer = createNewElement({type:"div", classes:["TextEditingMenuContainer"], parent: this.SegmentEditingContainer , properties:{}, styles:{display: "none"}});
			// this.TextEditingMenuContainer = createNewElement({type:"div", classes:["TextEditingMenuContainer"], parent: this.HeaderContainer , properties:{}, styles:{display: "none"}});
			
			if(this.iframe_embed === true)
				{
					this.SegmentEditingSuperContainer.style.display = "none";
					this.AccordionContainer1.style.display = "none";
					this.HeaderSettingsGearButton.style.display = "none";

					document.getElementsByTagName("header")[0].style.display = "none";
					this.HeaderRowCenter.innerHTML = `<h2><a class="nav-link" href="about.html" target="_blank">Auralayer</a></h2>`
				}
      }
		SegmentDecresendoSelectBoxHandler(e)
			{
				this.segment_decrescendo = e.target.value;
			}
		undo_handler()
			{
				if(this.save_position > 0)
					{
						this.undo_now = true;
						this.DataTable.querySelector(".TableBodyTBody").innerHTML = "";
						this.layers = [];						
						this.save_position--;
						this.AllLayerContainers.innerHTML = "";
						
						let copy = JSON.parse(JSON.stringify(this.save_array[this.save_position].layer_data));
						this.example_data.layers = copy;
						
						this.color_count = this.save_array[this.save_position].program_data.color_count;
						this.example_data.piece_info.color_count = this.color_count;

						this.layer_id_pos = this.save_array[this.save_position].program_data.layer_id_pos;
						this.example_data.piece_info.layer_id_pos = this.layer_id_pos;
						
						this.slider_thumb_height = this.save_array[this.save_position].program_data.slider_thumb_height;						
						this.slider_thumb_offset = this.save_array[this.save_position].program_data.slider_thumb_offset;

						document.documentElement.style.setProperty('--slider_thumb_height', this.slider_thumb_height + "px");
						document.documentElement.style.setProperty('--slider_thumb_offset', this.slider_thumb_offset + "px");
						this.example_data.piece_info.slider_thumb_height = this.slider_thumb_height;
						this.example_data.piece_info.slider_thumb_offset = this.slider_thumb_offset;

						console.log("UNDO");
						
						this.start_program_after_media_loaded();
						this.undo_now = false;							
					}
			}
		redo_handler()
			{
				if(this.save_position < (this.save_array.length -1) )
					{
						this.undo_now = true;
						this.DataTable.querySelector(".TableBodyTBody").innerHTML = "";
						this.layers = [];
						this.save_position++;
						this.AllLayerContainers.innerHTML = "";
						
						let copy = JSON.parse(JSON.stringify(this.save_array[this.save_position].layer_data));
						this.example_data.layers = copy;

						this.color_count = this.save_array[this.save_position].program_data.color_count;
						this.example_data.piece_info.color_count = this.color_count;

						this.layer_id_pos = this.save_array[this.save_position].program_data.layer_id_pos;
						this.example_data.piece_info.layer_id_pos = this.layer_id_pos;

						this.slider_thumb_height = this.save_array[this.save_position].program_data.slider_thumb_height;						
						this.slider_thumb_offset = this.save_array[this.save_position].program_data.slider_thumb_offset;

						document.documentElement.style.setProperty('--slider_thumb_height', this.slider_thumb_height + "px");
						document.documentElement.style.setProperty('--slider_thumb_offset', this.slider_thumb_offset + "px");
						this.example_data.piece_info.slider_thumb_height = this.slider_thumb_height;
						this.example_data.piece_info.slider_thumb_offset = this.slider_thumb_offset;	

						console.log("REDO");

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
								// console.log(this.example_data.layers);
								if(this.save_array.length > 0)
									{
										this.save_position++;
										// console.log("save_position increased to: " + this.save_position);
									}

								// if(this.save_position < (this.save_array.length - 1))
								// 	{
										
								// 	}

								// this.segment_height = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--segment-height'));
								
								this.slider_thumb_height = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--slider_thumb_height'));
								this.slider_thumb_offset = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--slider_thumb_offset'));
								this.example_data.piece_info.slider_thumb_height = this.slider_thumb_height;
								this.example_data.piece_info.slider_thumb_offset = this.slider_thumb_offset;		
								
								// console.log("SAVE");
								// this.save_array.forEach(each=>console.log(each.layer_data[0].segments));
								

								if (this.save_position === this.save_array.length)
									{
										// console.log(this.save_array);
										this.save_array.push( {program_data: {color_count: this.color_count, layer_id_pos: this.layer_id_pos, slider_thumb_offset: this.slider_thumb_offset, slider_thumb_height: this.slider_thumb_height }, layer_data: copy});	
										// console.log(this.save_array);	
									}
								else if (this.save_position < this.save_array.length)
									{
										console.log(this.save_array);
										
										this.save_array[this.save_position] = {program_data: {color_count: this.color_count, layer_id_pos: this.layer_id_pos, slider_thumb_offset: this.slider_thumb_offset, slider_thumb_height: this.slider_thumb_height}, layer_data: copy};
										// console.log(this.save_array);
										this.save_array.splice(this.save_position + 1);
										// console.log(this.save_array);
									}
							}
						
						// console.log("SAVE");
						// this.save_array.forEach(each=>console.log(each.program_data));
						// this.save_array.forEach(each=>console.log(each.layer_data[0].segments));							
						// console.log(this.save_array);
					}
			}
		dragging_handler(e)
			{
				// console.log(e.type);
				// e.preventDefault();
				let touch_event = e.type === "touchmove";
				let mouse_event = e.type === "dragover";
				let dragged_element;

				if(touch_event === true)
					{ dragged_element = e.targetTouches[0]; }
				else if(mouse_event === true)
					{ dragged_element = e; }


				if(dragged_element.target.classList.contains("layer_name") === false && dragged_element.target.classList.contains("layer_controls_holder") === false)
					{
						return false;
					}					

				let draggable_id = -1;
				let draggable_index = -1;
				let layer_order = [];
				let layers_not_dragging = [];

				this.layers.forEach( (each_layer, layer_index)=>
					{
						if(each_layer.layer_container.classList.contains("dragging"))
							{
								draggable_id = each_layer.layer_data.layer_id_pos;
								draggable_index = layer_index;
							}
					});	

				this.layers.forEach(each=>
					{
						layer_order.push(each.layer_data.layer_id_pos);
						if( each.layer_data.layer_id_pos !== draggable_id )
							{ layers_not_dragging.push(each); }
					});

					// console.log(layers_not_dragging.map(each=>each.layer_data.layer_id_pos));
					// console.log(layer_order);
				
				// const afterElement = this.get_drag_after_element(layers_not_dragging, e.clientY);
				
				const afterElement = this.get_drag_after_element(layers_not_dragging, dragged_element.clientY);
				// console.log(afterElement);

				const draggable = this.AllLayerContainers.querySelector(".dragging");
				if(dragged_element.target.classList.contains("layer_name") === false && dragged_element.target.classList.contains("layer_controls_holder") === false)
					{
						return false;
					}

				
				if(afterElement === -1)
					{
						this.AllLayerContainers.insertBefore(draggable, this.AllLayerContainers.firstChild);
						const element = this.example_data.layers.splice(draggable_index, 1)[0];
						this.example_data.layers.splice( 0, 0, element);

						const element2 = this.layers.splice(draggable_index, 1)[0];
						this.layers.splice( 0, 0, element2);			
						console.log("SPLICE 1");
					}
				else
					{
						const afterElement_id = layers_not_dragging[afterElement].layer_data.layer_id_pos;
						let afterElement_index = -1;
						const element = this.example_data.layers.splice(draggable_index, 1)[0];
						const element2 = this.layers.splice(draggable_index, 1)[0];
						
						this.example_data.layers.forEach( (each_layer, layer_index)=>
							{
								if(each_layer.layer_id_pos === afterElement_id)
									{ afterElement_index = layer_index; }
							});					
						
						this.example_data.layers.splice( afterElement_index + 1, 0, element);
						this.layers.splice( afterElement_index + 1, 0, element2);
						
						if(afterElement === layers_not_dragging.length - 1 )
							{ this.AllLayerContainers.appendChild(draggable); }
						else
							{ this.AllLayerContainers.insertBefore(draggable, layers_not_dragging[afterElement + 1].layer_container); }
					}
					
			}
		get_drag_after_element(container, y)
			{
				let layer_y_offset_positions = [];

				console.log(container.map(each=>each.layer_data.layer_id_pos));


				container.forEach(each=>
					{
						const box = each.layer_container.getBoundingClientRect();
						let y_offset = y - box.top - box.height / 2 ;
						layer_y_offset_positions.push(y - box.top - box.height / 2 );
					});
					// layer_y_offset_positions.sort((a,b)=>b - a)
					console.log(layer_y_offset_positions);

					const smallestPositiveIndex = layer_y_offset_positions.reduce((acc, cur, index) =>
						{
							if (cur > 0 && (acc === -1 || cur < layer_y_offset_positions[acc]))
								{ return index; }
							return acc;
						}, -1);

					return(smallestPositiveIndex);
			}
		deselect_all_segments()
			{
				for (let i = 0; i < this.layers.length ; i++)
					{
						for (let j = 0; j < this.layers[i].segment_array.length ; j++)
							{				
								this.layers[i].segment_array[j].segment.classList.remove("segment_selected");
								this.layers[i].segment_array[j].segment_table_row.classList.remove("segment_row_selected");
								this.layers[i].segment_array[j].TextEditingMenuContainer_SingleSegment.style.display = "none";
							}
					}

				// this.TextEditingMenuContainer.style.display = "none";
				// this.TextEditingMenuContainer.style.cursor = "not-allowed";
				[...this.TextEditingMenuContainer.children].forEach(each=>each.style.cursor = "not-allowed");
			}
		deselect_all_layers()
			{
				
				for (let i = 0; i < this.layers.length ; i++)
					{
						if(this.layers[i].layer_controls_holder.classList.contains("layer_selected_controls_holder"))
							{
								this.layers[i].layer_controls_holder.classList.remove("layer_selected_controls_holder");
								this.layers[i].layer_segment_holder.classList.remove("layer_selected_segments_holder");
								this.layers[i].selected = false;
								this.layers[i].select_box.checked = false;
								this.layers[i].segment_array.forEach(each_segment=>each_segment.segment.classList.remove("segments_layer_is_selected"));
								this.layers[i].segment_array.forEach(each_segment=>each_segment.segment.classList.add("segments_layer_is_not_selected"));
								this.layers[i].layer_settings_button.style.display = "none";
								this.layers[i].layer_settings_container.style.display = "none";
								this.layers[i].texture_selector.style.display = "none";
							}
					}		
			}
		select_all_segments_in_layer(){

			let indexes_of_selected_layer = this.layers.map((each,index)=>each.selected === true ? index : -1).filter(each=> each !== -1 );
			for (let i = 0; i < indexes_of_selected_layer.length ; i++) {
				let each_index = indexes_of_selected_layer[i];
				this.layers[each_index].segment_array.forEach(each=>{
					if(each.segment.classList.contains("segment_selected") === false) {
						// only select segments if their presence isn't 0
						if(each.data.start_presence > 0 && each.data.end_presence > 0) {
							each.segment_text_1.click();
						}
					}
				})
			}
		}
		hide_all_TextEditingMenuContainer_SingleSegments()
			{
				for (let i = 0; i < this.layers.length ; i++)
					{
						for (let j = 0; j < this.layers[i].segment_array.length ; j++)
							{
								this.layers[i].segment_array[j].TextEditingMenuContainer_SingleSegment.style.display = "none";

								if(shift_down === false && metakey_down === false)
									{
										this.layers[i].segment_array[j].segment.classList.remove("segment_selected")
										this.layers[i].segment_array[j].segment_table_row.classList.remove("segment_row_selected");
									}
							}
					}				
			}
		ChangeTextFormat(sent_style)
			{
				if(this.AllLayerContainers.querySelectorAll(".segment_selected").length > 0)
					{
						let single_selection = this.AllLayerContainers.querySelectorAll(".segment_selected").length === 1;
						console.log("NUM Selected:" + this.AllLayerContainers.querySelectorAll(".segment_selected").length);
						let mixed_values = false;

						if(single_selection === false)
							{
								let first_style = this.AllLayerContainers.querySelectorAll(".segment_selected")[0].querySelector(".segment_text").style[sent_style.style];
								for (let i = 1; i < this.AllLayerContainers.querySelectorAll(".segment_selected").length ; i++)
									{
										let each = this.AllLayerContainers.querySelectorAll(".segment_selected")[i].querySelector(".segment_text").style[sent_style.style];
										if(each !== first_style)
											{
												mixed_values = true;
												break;
											}
									}
							}

						for (let i = 0; i < this.layers.length ; i++)
							{
								for (let j = 0; j < this.layers[i].segment_array.length ; j++)
									{
										if(this.layers[i].segment_array[j].segment.classList.contains("segment_selected"))
											{
												if(sent_style.style === "fontSize")
													{
														if (sent_style.type === "increase")
															{
																this.layers[i].segment_array[j].segment_text_1.style[sent_style.style] = (parseInt(this.layers[i].segment_array[j].segment_text_1.style[sent_style.style]) + 1) + "px";
																this.layers[i].segment_array[j].data.text[0].styles[sent_style.style] = (parseInt(this.layers[i].segment_array[j].segment_text_1.style[sent_style.style]) + 1) + "px";
															}
														else if(sent_style.type === "decrease")
															{
																this.layers[i].segment_array[j].segment_text_1.style[sent_style.style] = (parseInt(this.layers[i].segment_array[j].segment_text_1.style[sent_style.style]) - 1) + "px";
																this.layers[i].segment_array[j].data.text[0].styles[sent_style.style] = (parseInt(this.layers[i].segment_array[j].segment_text_1.style[sent_style.style]) - 1) + "px";								
															}
													}
												else if(mixed_values === true)
													{
														this.layers[i].segment_array[j].segment_text_1.style[sent_style.style] = sent_style.value;
														this.layers[i].segment_array[j].data.text[0].styles[sent_style.style] = sent_style.value;	
													}
												else if(this.layers[i].segment_array[j].segment_text_1.style[sent_style.style] === sent_style.value)
													{
														this.layers[i].segment_array[j].segment_text_1.style[sent_style.style] = "unset";
														this.layers[i].segment_array[j].data.text[0].styles[sent_style.style] = "unset";	
													}
												else
													{
														this.layers[i].segment_array[j].segment_text_1.style[sent_style.style] = sent_style.value;
														this.layers[i].segment_array[j].data.text[0].styles[sent_style.style] = sent_style.value;	
													}
											}
									}
							}
					}				
			}			
		presence_slider_toggle_handler()
			{
				if(this.AllLayerContainers.querySelectorAll(".segment_selected").length > 0)
					{
						for (let i = 0; i < this.layers.length ; i++)
							{
								for (let j = 0; j < this.layers[i].segment_array.length ; j++)
									{
										if(this.layers[i].segment_array[j].segment.classList.contains("segment_selected"))
											{
												if(this.layers[i].segment_array[j].data.presence_sync === true)
													{
														this.layers[i].segment_array[j].data.presence_sync = false;	
														this.layers[i].segment_array[j].SegmentPresenceEndRange.disabled = false;
														// this.segment_table_row
													}
												else
													{
														this.layers[i].segment_array[j].data.presence_sync = true;
														this.layers[i].segment_array[j].SegmentPresenceEndRange.disabled = true;
													}
											}
									}
							}
					}
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
								this.layers[i].segment_array[j].segment.style.width = ((((this.layers[i].segment_array[j].data.end_pos/this.resolution) - (this.layers[i].segment_array[j].data.start_pos/this.resolution)) * this.scale) + (this.scale/this.resolution) -1) +  "px";
								this.layers[i].segment_array[j].segment.style.left = ((this.layers[i].segment_array[j].data.start_pos/this.resolution) * this.scale) +  "px";
							}
							
						this.layers[i].layer_segment_holder.style.width = ((((this.file_length/this.resolution) * this.scale) - 1 ) + (this.scale/this.resolution) ) + "px";
					}

				this.timestamp_array.forEach((each,index)=>
					{
						// console.log("current: " + each.style.left + " - new: " + (this.time_stamp_distance * this.scale) + "- this.scale:" + this.scale);
						console.log("LEFT: " + ((this.time_stamp_distance * this.scale) * index) ) ;	
						each.style.left = ((this.time_stamp_distance * index) * this.scale) +  "px";
					});
				
				this.SeekSlider.style.width = ((((this.file_length/this.resolution) * this.scale) - 1 ) + (this.scale/this.resolution) ) + "px";
				this.AllLayerContainers.style.width = ((((this.file_length/this.resolution) * this.scale) - 1 ) + (this.scale/this.resolution) ) + "px";
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
										
										// this.layers[i].segment_array[j].segment.style.filter = "opacity()";
										// this.layers[i].segment_array[j].data.styles.filter = "opacity()";

										let new_saturation_value = (e.target.value/GLOBAL_presence_scale).toFixed(1);
										let formated_color_value;
										let urlText = "";
										let initial_value = this.layers[i].segment_array[j].data.color;
										let r = "";
										let g = "";
										let b = "";
										let color_value_1 = "";
										let color_value_2 = "";
										let initial_saturation_1 = "1.0";
										let initial_saturation_2 = "1.0";

										let first_color_saturation_value;
										let second_color_saturation_value;
										try
											{ first_color_saturation_value = 10 - parseInt(this.layers[i].segment_array[j].data.styles.clipPath.replace("polygon(","").replace(")","").split(", ")[1].split(" ")[1])/10; }
										catch(error)
											{ first_color_saturation_value = 10; }						
											
										try
											{ second_color_saturation_value = 10 - parseInt(this.layers[i].segment_array[j].data.styles.clipPath.replace("polygon(","").replace(")","").split(", ")[0].split(" ")[1])/10; }
										catch(error)
											{ second_color_saturation_value = 10; }													
																				
										// console.log("first_color_saturation_value: " + first_color_saturation_value);

										[color_value_1, initial_saturation_1, urlText] = this.GetRGBA_Values({value: initial_value, num:0});
										[color_value_2, initial_saturation_2, urlText] = this.GetRGBA_Values({value: initial_value, num:1});

										console.log("initial_saturation_1: " + initial_saturation_1);
										console.log("initial_saturation_2: " + initial_saturation_2);

										this.PresenceSliderStartValueText.style.display = "block";
										this.PresenceSliderEndValueText.style.display = "block";
										setTimeout(e=>
											{
												this.PresenceSliderStartValueText.style.display = "none";
												this.PresenceSliderEndValueText.style.display = "none";
											}, 1000);

										
										if(this.PresenceSliderEnd.disabled === true)
											{
												
												let new_color_value = color_value_1 + new_saturation_value + ")";
												formated_color_value = "linear-gradient(to right, " + new_color_value + ", " + new_color_value + ")";
												
												if (this.segment_decrescendo === "gradient")
													{
														this.layers[i].segment_array[j].data.start_presence = parseInt(e.target.value);
														this.layers[i].segment_array[j].data.end_presence = parseInt(e.target.value);														
														this.layers[i].segment_array[j].SegmentPresenceStartRange.value = this.layers[i].segment_array[j].data.start_presence;
														this.layers[i].segment_array[j].SegmentPresenceEndRange.value = this.layers[i].segment_array[j].data.end_presence;	
													}
												else if (this.segment_decrescendo === "slope" && new_saturation_value > 0)
													{
														
														this.layers[i].segment_array[j].data.start_presence = parseInt(initial_saturation_1 * GLOBAL_presence_scale);
														this.layers[i].segment_array[j].data.end_presence = parseInt(initial_saturation_2 * GLOBAL_presence_scale);
														this.layers[i].segment_array[j].segment.style.clipPath = "polygon(0 " + parseInt((10 - (new_saturation_value * 10)) * 10) + "%, 100% " + parseInt((10 - new_saturation_value * 10) * 10) + "%, 100% 100%, 0 100%)";
														this.layers[i].segment_array[j].data.styles.clipPath =  "polygon(0 " + parseInt((10 - (new_saturation_value * 10)) * 10) + "%, 100% " + parseInt((10 - new_saturation_value * 10) * 10) + "%, 100% 100%, 0 100%)";
														// this.PresenceSliderEnd.value = this.PresenceSliderStart.value;
													}

													this.PresenceSliderEnd.value = this.PresenceSliderStart.value;
											}
										else
											{
												let starting_color = "";
												let ending_color = "";
												let new_color_value = "";

												if(direction === "start")
													{	
														
														if(color_value_1.includes("rgba"))
															{
																ending_color = color_value_2 + initial_saturation_2 + "))";
																new_color_value = color_value_1 + new_saturation_value + ")";
															}
														else if(color_value_1.includes("rgb("))
															{
																ending_color = color_value_2 + initial_saturation_2 + "))";
																new_color_value = color_value_1 + new_saturation_value + ")";
															}

														formated_color_value = "linear-gradient(to right, " + new_color_value + ", " + ending_color;

														if (this.segment_decrescendo === "gradient")
															{
																this.layers[i].segment_array[j].data.start_presence = parseInt(e.target.value);
																this.layers[i].segment_array[j].SegmentPresenceStartRange.value = this.layers[i].segment_array[j].data.start_presence;
															}
														else if (this.segment_decrescendo === "slope" && (first_color_saturation_value > 0 || new_saturation_value > 0 ))
															{																
																this.layers[i].segment_array[j].segment.style.clipPath = "polygon(0 " + parseInt((10 - (new_saturation_value * 10)) * 10) + "%, 100% " + parseInt((10 - (first_color_saturation_value )) * 10) + "%, 100% 100%, 0 100%)";
																this.layers[i].segment_array[j].data.styles.clipPath = "polygon(0 " + parseInt((10 - (new_saturation_value * 10)) * 10) + "%, 100% " + parseInt((10 - (first_color_saturation_value )) * 10) + "%, 100% 100%, 0 100%)";
															}
													}
												else if(direction === "end")
													{	

														if(color_value_1.includes("rgba"))
															{
																starting_color = color_value_1 + initial_saturation_1 + ")";
																new_color_value = color_value_2 + new_saturation_value + "))";
															}
														else if(color_value_1.includes("rgb("))
															{
																starting_color = color_value_1 + initial_saturation_1 + ")";
																new_color_value = color_value_2 + new_saturation_value + "))";
															}

														formated_color_value = "linear-gradient(to right, " + starting_color + ", " + new_color_value;

														if (this.segment_decrescendo === "gradient")
															{
																this.layers[i].segment_array[j].data.end_presence = parseInt(e.target.value);
																this.layers[i].segment_array[j].SegmentPresenceEndRange.value = this.layers[i].segment_array[j].data.end_presence;
															}
														else if (this.segment_decrescendo === "slope" && (second_color_saturation_value > 0 || new_saturation_value > 0 ))
															{
																this.layers[i].segment_array[j].segment.style.clipPath = "polygon(0 " + parseInt((10 - (second_color_saturation_value )) * 10) + "%, 100% " + parseInt((10 - (new_saturation_value * 10)) * 10) + "%, 100% 100%, 0 100%)";
																this.layers[i].segment_array[j].data.styles.clipPath =  "polygon(0 " + parseInt((10 - (second_color_saturation_value )) * 10) + "%, 100% " + parseInt((10 - (new_saturation_value * 10)) * 10) + "%, 100% 100%, 0 100%)";
															}
													}		
											}

										this.layers[i].segment_array[j].SegmentPresenceStartRange.value = this.PresenceSliderStart.value;											
										this.layers[i].segment_array[j].SegmentPresenceEndRange.value = this.PresenceSliderEnd.value;
										this.PresenceSliderStartValueText.innerText = this.PresenceSliderStart.value;
										this.PresenceSliderEndValueText.innerText = this.PresenceSliderEnd.value;
										

										if (this.segment_decrescendo === "gradient")
											{
												this.layers[i].segment_array[j].data.color = urlText + formated_color_value;
												this.layers[i].segment_array[j].segment.style.background = urlText + formated_color_value;
												this.layers[i].segment_array[j].data.styles.background = urlText + formated_color_value;
											}
										else if( this.segment_decrescendo === "slope")
											{
												
												let starting_color = color_value_1 + initial_saturation_1 + ")";
												let ending_color = color_value_2 + initial_saturation_2 + "))";
												
												formated_color_value = "linear-gradient(to right, " + starting_color + ", " + ending_color;
												
												this.layers[i].segment_array[j].data.color = urlText + formated_color_value;
												this.layers[i].segment_array[j].segment.style.background = urlText + formated_color_value;
												this.layers[i].segment_array[j].data.styles.background = urlText + formated_color_value;
											}
									}
							}			
					}

				this.save_state();
			}
		GetRGBA_Values(sent_data)
			{
				let urlText = "";
				let initial_saturation = "1.0";
				let color_value = sent_data.value.match(/linear-gradient\((.*?)\)\)/)[0];
				let r = "";
				let g = "";
				let b = "";

				if(sent_data.num === 0)
					{
						color_value = color_value.split("t, ")[1].split("), ")[sent_data.num] + ")"
					}
				else if(sent_data.num === 1)
					{
						color_value = color_value.split("t, ")[1].split("), ")[sent_data.num];
					}

				if(color_value.includes("rgba"))
					{
						r = parseInt(color_value.replaceAll(" ", "").split("rgba(")[1].replace("(","").replace(")","").split(",")[0]);
						g = parseInt(color_value.replaceAll(" ", "").split("rgba(")[1].replace("(","").replace(")","").split(",")[1]);
						b = parseInt(color_value.replaceAll(" ", "").split("rgba(")[1].replace("(","").replace(")","").split(",")[2]);
						initial_saturation = parseFloat(color_value.replaceAll(" ", "").split("rgba(")[1].replace("(","").replace(")","").split(",")[3]);
						color_value = "rgba(" + r + "," + g + "," + b + ",";
					}
				else if(color_value.includes("rgb("))
					{
						r = parseInt(color_value.replaceAll(" ", "").split("rgb")[1].replaceAll("(", "").replaceAll(")", "").split(",")[0]);
						g = parseInt(color_value.replaceAll(" ", "").split("rgb")[1].replaceAll("(", "").replaceAll(")", "").split(",")[1]);
						b = parseInt(color_value.replaceAll(" ", "").split("rgb")[1].replaceAll("(", "").replaceAll(")", "").split(",")[2]);
						color_value = "rgba(" + r + "," + g + "," + b + ",";																
					}

				if(sent_data.value.includes("url"))
					{ urlText = sent_data.value.match(/url\((.*?)( center,)/)[0]; }									

				return [color_value, initial_saturation, urlText];
			}
		StartYoutubeActivitySetup()
			{
				this.AuralayerProgram.style.display = "block";
				this.LoadingSpinner.style.display = "block";
				this.example_data.piece_info.media_type = "youtube";
				this.activity_type = 'youtube_link';
				let youtube_url = 'Paste URL here';

					// {
					// 	this.audio_file_prompt_backdrop = createNewElement({type: "div", classes: ["audio_file_prompt_backdrop"], parent: document.body});
					// 	this.audio_file_prompt_box_container = createNewElement({type: "div", classes: ["audio_file_prompt_box_container", "border-rounded"], parent: document.body});
					// 		this.audio_file_prompt_box_top = createNewElement({type: "div", classes: ["audio_file_prompt_box_top", "modal-header", "d-flex", "justify-content-between"], parent: this.audio_file_prompt_box_container, properties:{innerHTML : "<h5 class='modal-title'>Create with local audio file</h5>"}});
					// 		this.audio_file_prompt_box_middle = createNewElement({type: "div", classes: ["audio_file_prompt_box_middle"], parent: this.audio_file_prompt_box_container});
					// 			this.open_audio_button = createNewElement({type: 'input', classes: ["open_audio_button"], parent: this.audio_file_prompt_box_middle, properties: {innerText: "Choose Audio File", type: "file", name: "open_audio_button"}, styles:{display: "block"}, events:{change:() => this.get_user_audio_file('nothing') } });
					// 			this.cancel_opening_audio_button = createNewElement({type:"button", classes:["cancel_opening_audio_button", "btn-close"], parent: this.audio_file_prompt_box_top, events:{click: e=>this.cancel_opening_audio_button_handler()}});
					// 		this.audio_file_prompt_box_bottom = createNewElement({type: "div", classes: ["audio_file_prompt_box_bottom"], parent: this.audio_file_prompt_box_container});
					// }

				this.url_prompt_backdrop = createNewElement({type: "div", classes: ["url_prompt_backdrop"], parent: document.body});
				this.url_prompt_box_container = createNewElement({type: "div", classes: ["url_prompt_box_container", "border-rounded"], parent: document.body});
					this.url_prompt_box_top = createNewElement({type: "div", classes: ["url_prompt_box_top",  "modal-header", "d-flex", "justify-content-between", "mb-4"], parent: this.url_prompt_box_container, properties:{innerHTML : "<h5 class='modal-title'>Create with Youtube link</h5>"}});
						this.url_prompt_cancel_button = createNewElement({type:"button", classes:["url_prompt_cancel_button", "btn-close"], parent: this.url_prompt_box_top, events:{click: e=>this.url_prompt_cancel_button_handler()}});
					this.url_prompt_box_middle = createNewElement({type: "div", classes: ["url_prompt_box_middle", "input-group", "mb-3"], parent: this.url_prompt_box_container});
						this.url_prompt_input_box = createNewElement({type: "input", classes: ["form-control"], parent: this.url_prompt_box_middle,  properties: { id: "url_prompt_input_box", innerText : "Paste a YouTube URL below", type : "text", placeholder: "Paste URL here" }});
						this.url_prompt_submit_button = createNewElement({type: "button", classes: ["btn", "btn-primary"], parent: this.url_prompt_box_middle,  properties: { id: "url_prompt_submit_button", innerText : "Start" }});
					this.url_prompt_box_bottom = createNewElement({type: "div", classes: ["url_prompt_box_bottom"], parent: this.url_prompt_box_container});

				if(this.load_from_file_mode === true)
					{
						youtube_url = this.example_data.piece_info.video_id;
						this.loaded_file_name_label = this.example_data.piece_info.video_id;
						setup_youtube_player();					
						this.url_prompt_backdrop.style.display = "none";
						this.url_prompt_box_container.style.display = "none";
					}

				if (developing === true) 
					{
						youtube_url = 'https://youtu.be/oIIxlgcuQRU';
						this.example_data.piece_info.video_id = this.youtube_parser(youtube_url);
						this.loaded_file_name_label = this.example_data.piece_info.video_id;
						setup_youtube_player();

						this.url_prompt_backdrop.style.display = "none";
						this.url_prompt_box_container.style.display = "none";
					}

				this.url_prompt_submit_button.addEventListener('click', e=>
					{   
						// this.AuralayerProgram.style.display = "block";
						let breakout = false;
						youtube_url = this.url_prompt_input_box.value;

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

								this.url_prompt_backdrop.style.display = "none";
								this.url_prompt_box_container.style.display = "none";
							}
					});

				this.url_prompt_input_box.focus();
				this.ActivitySelectionContainer.style.display = "none";
			}
		url_prompt_cancel_button_handler()
			{
				this.AuralayerProgram.style.display = "none";
				// this.ActivitySelectionContainer.style.display = "grid";
				this.ActivitySelectionContainer.style.display = "block";
				this.url_prompt_backdrop.remove();
				this.url_prompt_box_container.remove();
				this.LoadingSpinner.style.display = "none";
			}
		cancel_opening_audio_button_handler()
			{
				// this.ActivitySelectionContainer.style.display = "grid";
				this.ActivitySelectionContainer.style.display = "block";
				this.ActivitySelectionBody.style.display = "block";
				this.LoadingSpinner.style.display = "none";
				this.open_audio_button.style.display = "none";
				this.cancel_opening_audio_button.style.display = "none";
				this.audio_file_prompt_backdrop.remove();
				this.audio_file_prompt_box_container.remove();
			}
		StartAudioFileActivitySetup(sent_url)
			{
				
				this.example_data.piece_info.media_type = "audio_file";
				this.activity_type = 'audio_file';
			
				
				this.ActivitySelectionBody.style.display = "none";

				if(sent_url === "nothing")
					{
						this.audio_file_prompt_backdrop = createNewElement({type: "div", classes: ["audio_file_prompt_backdrop"], parent: document.body});
						this.audio_file_prompt_box_container = createNewElement({type: "div", classes: ["audio_file_prompt_box_container", "border-rounded"], parent: document.body});
							this.audio_file_prompt_box_top = createNewElement({type: "div", classes: ["audio_file_prompt_box_top", "modal-header", "d-flex", "justify-content-between", "mb-4"], parent: this.audio_file_prompt_box_container, properties:{innerHTML : "<h5 class='modal-title'>Create with local audio file</h5>"}});
							this.audio_file_prompt_box_middle = createNewElement({type: "div", classes: ["audio_file_prompt_box_middle"], parent: this.audio_file_prompt_box_container});
								this.open_audio_button = createNewElement({type: 'input', classes: ["open_audio_button", "form-control"], parent: this.audio_file_prompt_box_middle, properties: {type: "file", name: "open_audio_button"}, styles:{display: "block"}, events:{change:() => this.get_user_audio_file('nothing') } });
								this.cancel_opening_audio_button = createNewElement({type:"button", classes:["cancel_opening_audio_button", "btn-close"], parent: this.audio_file_prompt_box_top, events:{click: e=>this.cancel_opening_audio_button_handler()}});
							this.audio_file_prompt_box_bottom = createNewElement({type: "div", classes: ["audio_file_prompt_box_bottom"], parent: this.audio_file_prompt_box_container});
					}

				
				// this.open_file_trigger_button = createNewElement({type: "button", classes: ["InterfaceButton"], parent: document.body, properties: {innerText: "Choose Audio File 2"}, styles:{zIndex: 2}});
				// this.open_file_trigger_button.addEventListener('click', () => this.open_audio_button.click() );
				// this.loaded_file_name_label = createNewElement({type: "div", classes: ["loaded_file_name_label", "InterfaceButton"], parent: document.body, properties: {innerText: "(no audio file loaded)"}});

				if ( developing === true && location.hostname.includes("localhost"))
					{
						this.get_user_audio_file('nothing');
						this.open_audio_button.style.display = "none";
						// this.open_file_trigger_button.display = "none";
					}
				else
					{
						// this.open_audio_button.click();
					}

				if(sent_url !== "nothing")
					{
						this.get_user_audio_file(sent_url);
					}
			}
		get_user_audio_file(sent_url)
			{
				this.AuralayerProgram.style.display = "block";
				this.ActivitySelectionContainer.style.display = "none";
				this.LoadingSpinner.style.display = "none";

				if(sent_url === "nothing")
					{
						this.open_audio_button.style.display = "none";
						this.cancel_opening_audio_button.style.display = "none";
						this.audio_file_prompt_backdrop.remove();
						this.audio_file_prompt_box_container.remove();
					}

				this.uploaded_audio = createNewElement({type:"audio", classes:["user_audio"], parent: this.VideoAccordionBodyInterior, properties:{controls: true}});
				this.uploaded_audio.addEventListener("play", e=> { this.audio_play_button.innerHTML = `<i class="bi-pause-circle"></i>`; });
				this.uploaded_audio.addEventListener("pause", e=> { this.audio_play_button.innerHTML = `<i class="bi-play-circle"></i>`; });					
				// this.VideoAccordionBody.appendChild(this.loaded_file_name_label);

				if ( developing === true && location.hostname.includes("localhost"))
					{          											
						this.uploaded_audio.src = 'Puccini-Vissi_d_arte_vissi_d_amore_Tosca.mp3';
						// this.uploaded_audio.src = 'http://192.168.1.111/bri_former_server_sample/sheep_may_safely_graze.mp3';
					} 
				else if(sent_url !== "nothing")
					{
						this.uploaded_audio.src = sent_url;
						// don't forget to revoke the blobURI when you don't need it
						this.uploaded_audio.onend = function(e) { URL.revokeObjectURL(this.open_audio_button.src); }
						// this.open_audio_button.style.display = 'none';
					}					                     
				else if(!this.open_audio_button.files.length)
					{ alert('no file selected'); }
				else
					{
						this.uploaded_audio.src = URL.createObjectURL(this.open_audio_button.files[0]);
						// don't forget to revoke the blobURI when you don't need it
						this.uploaded_audio.onend = function(e) { URL.revokeObjectURL(this.open_audio_button.src); }
						this.open_audio_button.style.display = 'none';
					}    
						
				this.uploaded_audio.addEventListener('loadedmetadata', () =>this.uploaded_audio_loadedmetadata_handler());						
				this.timeupdater = setInterval((e) =>  this.move_seek_slider_with_audio_position('ticking_audio') , 10);
				// originally 1000
				// if this is the initial file load - save the state to local storage
				
			}
		uploaded_audio_loadedmetadata_handler()
			{
				// this.file_length = parseInt(this.uploaded_audio.duration * this.scale);
				
				// this.file_length = parseInt(this.uploaded_audio.duration);
				this.file_length = parseInt(this.uploaded_audio.duration) * this.resolution;
				
				// this.open_file_trigger_button.style.display = 'none';

				// if(developing === true && location.hostname.includes("localhost"))
				// 	{ this.loaded_file_name_label.innerText = this.uploaded_audio.src; }
				// else
				// 	{ this.loaded_file_name_label.innerText = this.open_audio_button.files[0].name; }

				this.start_program_after_media_loaded();

				if (this.iframe_embed === true)
				{
					this.uploaded_audio.classList.add("small_iframe_mp3");
					this.Body_al.appendChild(this.uploaded_audio);

				}
			else
				{
					this.VideoAccordionBodyInterior.appendChild(this.uploaded_audio);		
				}
			}
		timestamp_lines()
			{
				this.timestamp_container = createNewElement({type:"div", classes:["timestamp_container"], parent: this.AllLayerContainers, properties:{}});
				this.timestamp_array = [];

				
				for (let i = 0; i < (parseInt( parseInt((this.file_length / this.resolution)/this.time_stamp_distance) ) + 1) ; i++)
					{
						
						let text = String(parseInt(((this.time_stamp_distance * i)/60))).padStart(1,"0")  + ":" + String(parseInt(((this.time_stamp_distance * i)%60))).padStart(2,"0");
						let timestamp_outer_div = createNewElement({type:"div", classes:["timestamp_outer_div"], parent: this.timestamp_container, properties:{}, styles:{left: ((this.time_stamp_distance*this.scale)*i) + "px"}});
						let timestamp_line = createNewElement({type:"div", classes:["timestamp_line"], parent: timestamp_outer_div, properties:{}});
						let timestamp_text = createNewElement({type:"div", classes:["timestamp_text"], parent: timestamp_outer_div, properties:{innerText: text }});
						this.timestamp_array.push(timestamp_outer_div);
					}
			}
		play_button_handler()
			{
				switch (this.activity_type)
				{
					case 'audio_file':
						if ( !this.uploaded_audio.paused   ) 
							{
								//Its playing...do your job
								console.log("playing!");
								this.pause_audio();
								this.audio_play_button.innerHTML = `<i class="bi-play-circle"></i>`;
							} 
						else 
							{
								console.log('not playing');
								//Not playing...maybe paused, stopped or never played.
								this.play_audio();
								this.audio_play_button.innerHTML = `<i class="bi-pause-circle"></i>`;
							}    
						break;
					case 'youtube_link':
						if (youtube_player_state != YT.PlayerState.PAUSED)
							{
							
								if(this.iframe_embed === true)
									{
										playerx.g.classList.remove("small_youtube_video_for_iframes");
										playerx.g.classList.add("small_iframe_youtube_after_clicking");
									}

								playerx.pauseVideo();
								this.audio_play_button.innerHTML = `<i class="bi-play-circle"></i>`;
							}
						else
							{
								
								if(this.iframe_embed === true)
									{
										playerx.g.classList.remove("small_youtube_video_for_iframes");
										playerx.g.classList.add("small_iframe_youtube_after_clicking");
									}								

								
								playerx.playVideo();
								this.audio_play_button.innerHTML = `<i class="bi-pause-circle"></i>`;
							}
						
						break;
					default:
						//default option here
						console.log('the default option has been reached in the switch statement');
				}  
			}
		play_audio()
			{
					switch (this.activity_type)
							{
									case 'audio_file':
											this.uploaded_audio.play();
											break;
									case 'youtube_link':
										
											// player.play();
											playerx.g.classList.remove("small_youtube_video_for_iframes");

											playerx.playVideo();
											
											break;
									default:
											//default option here
											console.log('the default option has been reached in the switch statement');
							}                    
					// this.uploaded_audio.play();
			}
		pause_audio()
				{
						switch (this.activity_type)
								{
										case 'audio_file':
												this.uploaded_audio.pause();
												break;
										case 'youtube_link':
											
												playerx.g.classList.remove("small_youtube_video_for_iframes");
												playerx.pauseVideo();
												break;
										default:
												//default option here
												console.log('the default option has been reached in the switch statement');
								}                        
						// this.uploaded_audio.pause();
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
				
				
				if (sParameterName[0] == 'load') 
					{
						this.url_activity_text = sParameterName[1];
					}

				if(sURLVariables.length == 2)
					{
						sParameterName = sURLVariables[1].split('=');
						if (sParameterName[0] == 'iframe') 
							{
								if(sParameterName[1] == "true")
									{
										this.iframe_embed = true;
									}
								else
									{
										this.iframe_embed = false;
									}
							}		
					}
			}
		setup_youtube_file_info()
			{
				this.LoadingSpinner.remove();
				// this.file_length = parseInt(playerx.getDuration() * this.scale);
				this.file_length = parseInt(playerx.getDuration()) * this.resolution;
				this.start_program_after_media_loaded();
				this.timeupdater = setInterval((e) => this.move_seek_slider_with_audio_position('ticking_youtube') , 10);

				if(this.iframe_embed === true)
					{
						playerx.g.classList.add("small_youtube_video_for_iframes");
					}
			}
		start_program_after_media_loaded()
			{
				this.timestamp_lines();
				this.AllLayerContainers.style.width = ((((this.file_length/this.resolution) * this.scale) - 1 ) + (this.scale/this.resolution) ) + "px";


				this.LoadingSpinner.remove();
				this.undo_now = true;
				
				let random_color = "rgba(" + this.colors[this.color_count] + ",1.0)";
				
				this.SeekSlider.max = this.file_length * this.audio_speed;
				this.SeekSlider.value = 0;
				let width = ((((this.file_length/this.resolution) * this.scale) - 1 ) + (this.scale/this.resolution) ) + "px";
				this.SeekSlider.style.width = width;
				// this.SeekSlider.style.width = ((this.file_length/this.resolution) / this.length_padding) * this.scale + "px";
				this.SeekSlider.style.display = 'block';

				if (this.example_data.layers.length === 0)
					{
						this.color_count = (this.color_count + 1) % this.colors.length;
						this.example_data.piece_info.color_count = this.color_count;

						let initial_layer_data =
						{ name: "Layer " + (this.example_data.piece_info.layer_id_pos + 1), color: "linear-gradient(to right, " + random_color + ", " + random_color + ")", segments: [],markers:[], layer_id_pos: 0 , show_in_table: true, hide_name_in_diagram: false}

						this.example_data.layers.push( initial_layer_data );
						this.layers.push(new Layer(this.AllLayerContainers, initial_layer_data, this.file_length, this, "new_layer"));						
						this.layers[0].name.click()
					}
				else
					{
						this.example_data.layers.forEach((each,index)=> this.layers.push(new Layer(this.AllLayerContainers, each, this.file_length, this, "load_existing_layer")) );
						// console.log(this.example_data.layers);
					}

			
				this.save_array[this.save_position].program_data.slider_thumb_height = this.slider_thumb_height;
				this.save_array[this.save_position].program_data.slider_thumb_offset = this.slider_thumb_offset;
				this.save_array.forEach(each=>console.log(each.program_data));					

				this.undo_now = false;

				
				let segment_margin_bottom = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--segment-margin-bottom'));
				document.documentElement.style.setProperty('--slider_thumb_height', ((this.segment_height + segment_margin_bottom ) * this.layers.length) + 70 + "px");
				document.documentElement.style.setProperty('--slider_thumb_offset', ( ((((this.segment_height + segment_margin_bottom)/2) * this.layers.length) + 25) * -1) + "px");	
			}
		seek_slider_moved_handler(e)
			{
				// this.slider_position = e.target.value / 10;
				this.slider_position = parseInt((e.target.value/this.resolution) / this.audio_speed);
				
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
		move_seek_slider_with_audio_position(sender, youtube_player_state)
			{
				// console.log("move");
				// console.log(parseInt(this.uploaded_audio.currentTime * 10));
				
				switch (this.activity_type)
					{
						case 'audio_file':
							this.slider_position = parseInt((this.uploaded_audio.currentTime * this.resolution));
							this.SeekSlider.value = parseInt((this.uploaded_audio.currentTime * this.resolution) * this.audio_speed);		
							break;
						case 'youtube_link':
							this.slider_position = parseInt((playerx.getCurrentTime() * this.resolution));
							this.SeekSlider.value = parseInt((playerx.getCurrentTime() * this.resolution) * this.audio_speed);
							// console.log("playerx.getCurrentTime(): " + playerx.getCurrentTime());
							// console.log("this.slider_position: " + this.slider_position);
							let current_active_element = document.activeElement;
							if(lastActiveElement !== current_active_element)
								{
									if(current_active_element.id === "player")
										{ document.getElementById("player").style.boxShadow = "0 0 10px crimson"; }
									else
										{ document.getElementById("player").style.boxShadow = "0 0 10px black"; }
									lastActiveElement = document.activeElement;
								}

							// console.log(youtube_player_state);
							if(typeof youtube_player_state !== "undefined")
								{
									if(youtube_player_state === 2)
										{
											console.log("PAUSED");
											this.audio_play_button.innerHTML = `<i class="bi-play-circle"></i>`;
										}
									else if(youtube_player_state === 1)
										{
											console.log("PLAYING");
											this.audio_play_button.innerHTML = `<i class="bi-pause-circle"></i>`;
										}
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
				let random_color = "rgba(" + this.colors[this.color_count] + ",1.0)";
				this.color_count =  (this.color_count + 1) % this.colors.length;
				this.example_data.piece_info.color_count = this.color_count;

					if(typeof this.show_in_table === "undefined") {
						this.show_in_table = true;
					}

					if(typeof this.hide_name_in_diagram === "undefined") {
						this.hide_name_in_diagram = false;
					}

				let new_initial_layer_data =
					{ name: "Layer " + (this.example_data.piece_info.layer_id_pos + 1), color: "linear-gradient(to right, " + random_color + ", " + random_color + ")", segments: [], markers:[], layer_id_pos: this.layer_id_pos, show_in_table: this.show_in_table, hide_name_in_diagram: this.hide_name_in_diagram}


				this.example_data.layers.push( new_initial_layer_data );
				this.layers.push(new Layer(this.AllLayerContainers, new_initial_layer_data, this.file_length, this, "new_layer"));

				this.deselect_all_layers();
				this.deselect_all_segments();

				this.layers[this.layers.length - 1].select_box.click();
				this.layers[this.layers.length -1].segment_array[0].segment_text_1.click();
				
				let segment_margin_bottom = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--segment-margin-bottom'));
				
				document.documentElement.style.setProperty('--slider_thumb_height', ((this.segment_height + segment_margin_bottom ) * this.layers.length) + 70 + "px");
				document.documentElement.style.setProperty('--slider_thumb_offset', ( ((((this.segment_height + segment_margin_bottom)/2) * this.layers.length) + 25) * -1) + "px");

				this.slider_thumb_height = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--slider_thumb_height'));
				this.slider_thumb_offset = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--slider_thumb_offset'));
				this.example_data.piece_info.slider_thumb_height = this.slider_thumb_height;
				this.example_data.piece_info.slider_thumb_offset = this.slider_thumb_offset;

				this.save_array[this.save_position].program_data.slider_thumb_height = this.slider_thumb_height;
				this.save_array[this.save_position].program_data.slider_thumb_offset = this.slider_thumb_offset;				
			}
		delete_layer(sent_layer_id)
			{
				let layer_id_pos = sent_layer_id;
				let layer_index = -1;
				this.example_data.layers.forEach((each,index)=>
					{
						if(each.layer_id_pos === layer_id_pos)
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
				let start = (this.slider_position/this.resolution);
				let presence_sync = true;
				let num_of_selected_layers = 0;

				console.log("START: " + start);
				
				this.layers.forEach(each_layer=>
					{
						if(each_layer.selected === true)
							{
								num_of_selected_layers++
								// this.slider_position / this.scale
								each_layer.create_segment(start, -1, GLOBAL_presence_scale, GLOBAL_presence_scale, presence_sync, {});
							}
					});
				// this.save_state();
				if(num_of_selected_layers === 0)
					{
						alert("Select a layer or segment first before splitting")
					}
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
																// width_new = ((this.layers[i].layer_data.segments[k].end_pos - this.layers[i].layer_data.segments[k].start_pos) + width_to_add_to_merging_segment)/this.resolution + 1;
																width_new = ((this.layers[i].layer_data.segments[k].end_pos - this.layers[i].layer_data.segments[k].start_pos) + width_to_add_to_merging_segment)/this.resolution;
															}
													}
												else if(direction === "right")
													{
														if(this.layers[i].layer_data.segments[k].start_pos === (left_position_to_search_for + 1))
															{
																proceed_with_deletion = true;
																// width_new = ((this.layers[i].layer_data.segments[k].end_pos - this.layers[i].layer_data.segments[k].start_pos) + width_to_add_to_merging_segment)/this.resolution + 1;
																width_new = ((this.layers[i].layer_data.segments[k].end_pos - this.layers[i].layer_data.segments[k].start_pos) + width_to_add_to_merging_segment)/this.resolution;
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
																this.layers[i].segment_array[k].segment.style.left = ((this.layers[i].layer_data.segments[k].start_pos)/this.resolution) * this.scale + "px";
															}

															
														this.layers[i].segment_array[k].segment_text_1.click();
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
										
										// let new_saturation_value = (e.target.value/GLOBAL_presence_scale).toFixed(1);
										let formated_color_value;
										let urlText = "";
										let initial_value = this.layers[i].segment_array[j].data.color;
										let color_value_1 = "";
										let color_value_2 = "";
										let initial_saturation_1 = "1.0";
										let initial_saturation_2 = "1.0";
										

										
																				
										[color_value_1, initial_saturation_1, urlText] = this.GetRGBA_Values({value: initial_value, num:0});
										[color_value_2, initial_saturation_2, urlText] = this.GetRGBA_Values({value: initial_value, num:1});														
										
										formated_color_value = "linear-gradient(to right, " + (color_value_1 + "0.0), ") + (color_value_2 + "0.0))");

										this.layers[i].segment_array[j].data.start_presence = 0;
										this.layers[i].segment_array[j].data.end_presence = 0;						
										
										this.PresenceSliderStart.value = 0;
										this.PresenceSliderEnd.value = 0;		

										this.layers[i].segment_array[j].SegmentPresenceStartRange.value = 0;
										this.layers[i].segment_array[j].SegmentPresenceEndRange.value = 0;																			

										// this.layers[i].segment_array[j].data.color = urlText + formated_color_value
										// this.layers[i].segment_array[j].segment.style.background = urlText + formated_color_value;
										// this.layers[i].segment_array[j].data.styles.background = urlText + formated_color_value;

										// this.layers[i].segment_array[j].data.color = formated_color_value
										this.layers[i].segment_array[j].segment.style.background = formated_color_value;
										this.layers[i].segment_array[j].data.styles.background = formated_color_value;					
										this.layers[i].segment_array[j].segment.style.clipPath = "";

										// this.layers[i].segment_array[j].segment.classList.add("segment_deleted");
										// this.layers[i].segment_array[j].data.classes.push("segment_deleted");
										
										// this.layers[i].segment_array[j].segment.style.filter = "opacity(0)";
										// this.layers[i].segment_array[j].data.styles.filter = "opacity(0)";
										
										// this.layers[i].segment_array[j].segment.style.backgroundImage = "none";
										// this.layers[i].segment_array[j].data.styles.backgroundImage = "none";
										
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
						.then( data_from_file => this.load_from_file(JSON.parse(data_from_file)) ) 
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
				// this.example_data = JSON.parse(data);
				
				this.example_data = data;
				
				
				if(typeof this.example_data.piece_info.loaded_file_name_label !== "undefined")
					{
						if(this.example_data.piece_info.loaded_file_name_label !== "")
							{
								this.loaded_file_name_label = this.example_data.piece_info.loaded_file_name_label;
							}
						
					}

				this.scale = this.example_data.piece_info.scale;
				this.layer_id_pos = this.example_data.piece_info.layer_id_pos;
				this.color_count = this.example_data.piece_info.color_count;
				this.segment_decrescendo = this.example_data.piece_info.segment_decrescendo;
				this.load_from_file_mode = true;

				
				
				if(this.example_data.piece_info.media_type === "youtube")
					{
						this.StartYoutubeActivitySetup()
					}
				else if (this.example_data.piece_info.media_type === "audio_file")
					{
						if(this.loaded_file_name_label === "")
							{
								this.StartAudioFileActivitySetup("nothing")
							}
						else
							{
								this.StartAudioFileActivitySetup(this.loaded_file_name_label)
							}
						
					}				
			}
		create_shareable_link()
			{
				let qr_code_script = document.createElement('script');
				qr_code_script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js";
				document.body.append(qr_code_script);
				qr_code_script.addEventListener('load', () =>
					{
						this.modal_background = document.createElement('div');
						this.modal_background.classList.add("modal_background");
						this.modal_background.style.display = "none";
						document.body.appendChild(this.modal_background);
						this.modal_background.addEventListener( 'click' , () => 
								{
										this.modal_background.style.display = "none"; 
										this.shareable_link_modal.style.display = "none";
										this.copy_to_clipboard_button.style.display = "none";
										this.shareable_link_modal_close.style.display = "none";
								} );
						
						
						
						this.shareable_link_modal = document.createElement('div');
						this.shareable_link_modal.title = "Copy and share this link";
						this.shareable_link_modal.id = "shareable_link_modal";
						this.shareable_link_modal.style.display = "none";
						this.shareable_link_modal.classList.add("interface_button");
						document.body.appendChild(this.shareable_link_modal);
						//this.shareable_link_modal.addEventListener( 'click' , () => {this.shareable_link_modal.style.display = "none"; this.modal_background.style.display = "none";} );


						this.shareable_link_modal_close = document.createElement('div');
						this.shareable_link_modal_close.title = "Copy and share this link";
						this.shareable_link_modal_close.id = "shareable_link_modal_close";
						this.shareable_link_modal_close.classList.add("interface_button");
						this.shareable_link_modal_close.style.display = "none";
						this.shareable_link_modal_close.addEventListener("click", () =>
								{
										this.shareable_link_modal_close.style.display = "none";
										this.modal_background.style.display = "none";
								});
						document.body.appendChild(this.shareable_link_modal_close);

						this.share_url_text = document.createElement("input");
						this.share_url_text.type = 'text';
						// this.share_url_text.isContentEditable = false;
						this.share_url_text.id = "share_url_text";
						this.share_url_text.classList.add("interface_button");
						this.share_url_text.style.display = "none";
						this.shareable_link_modal.appendChild(this.share_url_text);

						this.share_url_copied_text = document.createElement("span");
						this.share_url_copied_text.id = "share_url_copied_text";
						this.share_url_copied_text.classList.add("interface_button");
						this.share_url_copied_text.style.display = "none";
						this.shareable_link_modal_close.appendChild(this.share_url_copied_text);


						this.copy_to_clipboard_button = document.createElement('button');
						this.copy_to_clipboard_button.innerText = "Copy Link to Clipboard";
						this.copy_to_clipboard_button.title = "Copy URL to clipboard";
						this.copy_to_clipboard_button.id = "copy_to_clipboard_button";
						this.copy_to_clipboard_button.classList.add("interface_button");
						this.copy_to_clipboard_button.style.display = "block";
						this.copy_to_clipboard_button.addEventListener('click', () =>
								{
										this.share_url_text.focus();
										this.share_url_text.select();
										document.execCommand('copy');
										this.share_url_text.style.display = "none";
										this.shareable_link_modal.style.display = "none";
										this.shareable_link_modal_close.style.display = "block";
										this.copy_to_clipboard_button.style.display = "none";
										this.share_url_copied_text.style.display = "block";
										this.share_url_copied_text.innerHTML = "Link has been copied to your clipboard!📋";
								});
						this.shareable_link_modal.appendChild(this.copy_to_clipboard_button);

						let horizontal_rule_link = document.createElement("hr");                    
						this.shareable_link_modal.appendChild(document.createElement("hr"));

						this.copy_to_qrcode_button = document.createElement('button');
						this.copy_to_qrcode_button.innerText = "Download QR code";
						this.copy_to_qrcode_button.title = "Download QR code";
						this.copy_to_qrcode_button.id = "copy_to_qrcode_button";
						this.copy_to_qrcode_button.classList.add("interface_button");
						this.copy_to_qrcode_button.style.display = "block";
						this.copy_to_qrcode_button.addEventListener('click', () =>
								{
										// create temporary link
										this.tmpLink = document.createElement( 'a' );  
										this.tmpLink.download = 'auralayer_qr_code.png'; // set the name of the download file 
										this.tmpLink.href = this.imageData;  
										this.shareable_link_modal.appendChild(this.tmpLink);
								
										// temporarily add link to body and initiate the download  
										document.body.appendChild( this.tmpLink );  
										this.tmpLink.click();  
										document.body.removeChild( this.tmpLink );  
								});
						this.shareable_link_modal.appendChild(this.copy_to_qrcode_button);

						// let save_all = this.save_mechanism();
						let save_all = this.example_data;
						let file_name = "auralayer_file.auralayer";
						let activity_type_for_link = "";
						let primary_url;

						// if(this.diagram_title.innerHTML == "") file_name = "auralayer_file.auralayer";
						// else file_name = this.diagram_title + ".auralayer";

						let element = document.createElement('a');
						let export_data = JSON.stringify(save_all, null, 2); // put data in me first   

						//do stuff with the file at this point
						let date = new Date();
						let time_stamp = date.getUTCFullYear() + "_" + 
														(date.getUTCMonth() + 1) + "_" + 
														date.getUTCDate() + "_" +
														date.getUTCHours() + "_" + 
														date.getUTCMinutes() + "_" +
														date.getUTCMilliseconds();

						let random_bit = Math.random().toString(36).substr(2, 5);
						let unique_file_name = time_stamp + "_" + random_bit;

						console.log(time_stamp);
						

						if( this.activity_type == "audio_file" && !(this.url_activity_text == "load_from_web_link_audio_file" == "load_from_web_link_audio_file" || this.url_activity_text == "open_from_web_link_audio_file2"))
							{ activity_type_for_link = "load";}
						else if(this.activity_type == "youtube_link" || this.activity_type == "open_from_web_link_youtube")
							{ activity_type_for_link = "open_from_web_link_youtube"; }
						else if (this.url_activity_text == "load_from_web_link_audio_file" || this.url_activity_text == "load")
							{ activity_type_for_link = "load_from_web_link_audio_file"; }
						else
							{ console.error("the activity has not been accounted for"); }

						if(location.href.includes("localhost"))
							{ primary_url = 'http://localhost/auralayer/vanilla_js_files/auralayer.html?load='; }
						else
							{ primary_url = 'https://brianedwardjarvis.com/auralayer/auralayer.html?load='; }

						// this.current_share_url = primary_url + activity_type_for_link + "&shared_briform_id=" + "v_" + this.program_version + "/" + unique_file_name;
						this.current_share_url = primary_url + "v_" + this.program_version + "/" + unique_file_name;

						console.log(  this.activity_type);

						let my_data = '{"file_name" : "' + "v_" + this.program_version + "/" + unique_file_name + '","file_content" : ' + export_data + '}';
						
						fetch(
							"upload.php", 
							{
								method: "post",
								headers: {'Content-Type':'application/json'}, // this line is important, if this content-type is not set it wont work
								body: my_data
							})
							.then(result => result.text())
							.then(text => create_shareable_url.call(this, text) )
							.catch(console.error);		

						function create_shareable_url(returned_text_from_php)
							{
								this.share_url_copied_text.style.display = "none";
								this.shareable_link_modal.style.display = "block";
								this.modal_background.style.display = "block";
								this.copy_to_clipboard_button.style.display = "block";
								this.share_url_text.value = this.current_share_url;
								this.share_url_text.style.display = "block";
								this.share_url_text.contentEditable = false;
								this.share_url_text.focus();
								this.share_url_text.select();
								if(document.querySelectorAll("#qrcode").length > 0)
									{ document.querySelectorAll("#qrcode").forEach(each=>each.remove()); }

								this.qr_canvas = document.createElement("canvas");
								this.qr_canvas.id = "qrcode";
								const ctx = this.qr_canvas.getContext('2d');

								
								this.qr = new QRious({ element: this.qr_canvas, background: 'white', foreground: '#000', level: 'H', padding: 42, size: 300, value: this.current_share_url});

								ctx.font = "italic bold 30px " + this.default_font_name;
								ctx.fillStyle = "#000";
								ctx.fillText("Auralayer", 90, 30);

								ctx.font = "italic bold 20px " + this.default_font_name;
								ctx.fillStyle = "#000";
								ctx.fillText("Layer Graph", 94, 285);  
								

								const image = new Image(); // width, height values are optional params 
								image.src = 'icons/favicon.png';
								ctx.drawImage(image, 5, 5, 30, 30);
								image.addEventListener("load", (e) => {
									ctx.drawImage(image, 5, 5, 30, 30);
									this.imageData = this.qr_canvas.toDataURL("image/png");
									this.shareable_link_modal.appendChild(this.qr_canvas);
								});								

								// this.imageData = this.qr_canvas.toDataURL("image/png");
								// this.shareable_link_modal.appendChild(this.qr_canvas);
							}
						});
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

		for (const key in data.events)
      { new_element.addEventListener(key, data.events[key]); }			

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


function download_image()
  {      
    const scriptPromise = new Promise((resolve, reject) => 
			{
				const script = document.createElement('script');
				document.body.appendChild(script);
				script.onload = resolve;
				script.onerror = reject;
				script.async = true;
				script.src = 'scripts/html2canvas.min.js';
			});

    scriptPromise.then(() =>
			{
				
				project.SeekSlider.style.display = "none";
				// document.documentElement.style.setProperty("--primary-color-8", "transparent");

				// let element_to_image = document.getElementById('editor');
				let element_to_image = project.BodyContainer;
				// let element_to_image = document.body;

				// find the right-most position on the diagram and make the space that wide for the image
				let all_shapes = document.getElementsByClassName('segment');

				let right_most = 0;
				// let editor_height = document.getElementById("editor").getBoundingClientRect().height + 10;
				let editor_height = project.BodyContainer.getBoundingClientRect().height + 10;

				for( let each of all_shapes) { if (each.getBoundingClientRect().right > right_most) {right_most = each.getBoundingClientRect().right;}}

				if(right_most > element_to_image.scrollWidth)
					{
						right_most = element_to_image.scrollWidth;
					}
				else
					{
						right_most = right_most + 20;
					}

				html2canvas(element_to_image, 
					{ 
						scale: 1,
						backgroundColor: null,
						windowWidth: right_most,
						windowHeight: element_to_image.scrollHeight
					}).then(function(canvas) { 
						project.SeekSlider.style.display = "block";
						saveAs(canvas.toDataURL(), 'auralayer-diagram.png');
					});               
			});
  }


function saveAs(uri, filename) 
  {
      var link = document.createElement('a');

      if (typeof link.download === 'string') 
        {
          link.href = uri;
          link.download = filename;

          //Firefox requires the link to be in the body
          document.body.appendChild(link);

          //simulate click
          link.click();

          //remove the link when done
          document.body.removeChild(link);
        //   project.editor_seek_slider.style.display = "block";
        // project.SeekSlider.style.backgroundColor = "var(--primary-color-9)";
        
        
        // document.documentElement.style.setProperty("--primary-color-8", window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color-1'));
        // document.documentElement.style.setProperty("--primary-color-8", '--primary-color-1');
        
          
        } 
      else{ window.open(uri); }
  }	

// if this script was in the HTML file "function onYouTubeIframeAPIReady()" would work, but since it's not
// "window.onYouTubeIframeAPIReady = function()" has to be used instead
// function onYouTubeIframeAPIReady()
window.onYouTubeIframeAPIReady = function()
	{
		let youtube_player = document.createElement('div');
		youtube_player.id = 'player';

		// document.body.appendChild(youtube_player);
		
		if (project.iframe_embed === true)
			{
				project.Body.appendChild(youtube_player);
			}
		else
			{
				project.VideoAccordionBodyInterior.appendChild(youtube_player);		
			}
		
		

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
		// if(event.target.playerInfo.duration === 0)
		if(event.target.getDuration() === 0)
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
		console.log(event.data);
		project.move_seek_slider_with_audio_position('youtube_statechange', youtube_player_state);
		
		if(project.iframe_embed === true)
			{
				playerx.g.classList.remove("small_youtube_video_for_iframes");
				playerx.g.classList.add("small_iframe_youtube_after_clicking");
			}
	}  