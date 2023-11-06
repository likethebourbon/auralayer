let developing = false;
let youtube_player_state = -2;
let GLOBAL_length_padding = 1;
let GLOBAL_presence_scale = 10;
let project;
let playerx;
let ctrl_down = false;
let lastActiveElement = document.activeElement;
let example_data = {};

// -----------------------------------
//      Keyboard Controls
// -----------------------------------
document.addEventListener('keyup', e => {
	if (project.in_text_editor === false || (e.ctrlKey && e.key === 'b') || (e.ctrlKey && e.key === 'i')) {

		// if (e.code === "ControlLeft" )
		if (e.code === "ShiftLeft") {
			e.preventDefault();
			ctrl_down = false;
		}
	}
});
document.addEventListener('keydown', e => {
	//if NOT in a textbox
	// console.log("shift: " + e.shiftKey + " - ctrl: " + e.ctrlKey + " - Key: " + e.key);

	if (project.in_text_editor === false || (e.ctrlKey && e.key === 'b') || (e.ctrlKey && e.key === 'i')) {
		if (e.ctrlKey && e.key === 's') {
			e.preventDefault();
			console.log("Saved: Ctrl + S - Key press");
			project.SaveToFileButton.click();
		}
		else if (e.ctrlKey && e.key === 'z') {

			project.UndoButton.click();
		}
		else if (e.ctrlKey && e.key === 'y') {
			console.log("redo");
			project.RedoButton.click();
		}
		else if (e.key === 'n') {
			e.preventDefault();
			project.AddLayerButton.click();
		}
		else if (e.ctrlKey && e.key === 'b') {
			e.preventDefault();
			console.log("bold");
			project.TextEditingBoldButton.click();
		}
		else if (e.ctrlKey && e.key === 'i') {
			e.preventDefault();
			console.log("italics");
			project.TextEditingItalicButton.click();
		}
		else if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'u') {
			e.preventDefault();
			console.log("underline");
			project.TextEditingUnderlineButton.click();
		}
		else if (e.key === 's') {
			//e.preventDefault();
			if (project.view_mode_slider_top_button === false) {
				project.SplitButton.click();
			}
		}
		else if (e.key === 'g')//g
		{
			// if(project.view_mode_slider_top_button.checked === false)
			// 		{
			// 				project.group_combiner(e);        
			// 		}   
		}
		else if (e.key === 'm') {
			// if(project.view_mode_slider_top_button.checked === false)
			// 		{
			// 				if (project.program_version !== "0_0")
			// 						{
			// 								project.add_marker_location("");
			// 								console.log("add marker");
			// 						}
			// 		}   
		}
		else if (e.key === 'Escape')//escape
		{
			project.deselect_all_layers();
			project.deselect_all_segments();
		}
		else if (e.ctrlKey && e.code === 'Space') {
			e.preventDefault();
			console.log("Control and Space pressed");
			// move playhead to start of selected group
			// if only one group is selected

			project.play_audio_from_beginning_of_current_selection();
		}
		else if (e.key === 'p' || e.code === 'Space') {
			e.preventDefault();
			switch (project.activity_type) {
				case 'audio_file':
					if (!project.uploaded_audio.paused) {
						//Its playing...do your job
						console.log("playing!");
						project.pause_audio();
					}
					else {
						console.log('not playing');
						//Not playing...maybe paused, stopped or never played.
						project.play_audio();
					}
					break;
				case 'youtube_link':
					if (youtube_player_state != YT.PlayerState.PAUSED) {
						playerx.g.classList.remove("small_youtube_video_for_iframes");
						playerx.pauseVideo();
					}
					else {
						playerx.g.classList.remove("small_youtube_video_for_iframes");
						playerx.playVideo();
					}

					break;
				default:
					//default option here
					console.log('the default option has been reached in the switch statement');
			}
		}
		else if (e.shiftKey) {
			// debugger
			e.preventDefault();
			ctrl_down = true;
		}
		else if (e.shiftKey && e.key === 'ArrowRight') {
			//fast forward 1 seconds
			// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
			switch (project.activity_type) {
				case 'audio_file':
					project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + 1;
					break;
				case 'youtube_link':
					player.seekTo(player.getCurrentTime() + 1);
					// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
					break;
				default:
					//default option here
					console.log('the default option has been reached in the switch statement');
			}

		}
		else if (e.shiftKey && e.key === 'ArrowLeft') {
			//fast forward 1 seconds
			// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
			switch (project.activity_type) {
				case 'audio_file':
					project.uploaded_audio.currentTime = project.uploaded_audio.currentTime - 1;
					break;
				case 'youtube_link':
					player.seekTo(player.getCurrentTime() - 1);
					// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
					break;
				default:
					//default option here
					console.log('the default option has been reached in the switch statement');
			}

		}
		else if (e.key === 'ArrowRight') {
			//fast forward 10 seconds
			// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime + project.skip_amount;
			switch (project.activity_type) {
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
		else if (e.key === 'ArrowLeft') {
			//go back 10 seconds
			// project.uploaded_audio.currentTime = project.uploaded_audio.currentTime - project.skip_amount;
			switch (project.activity_type) {
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
		else if ((e.key === 'Delete' && project.analysis_master_embed === false) || ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') && project.analysis_master_embed === false)) {
			// project.DeleteButton.click();	
			// if( document.querySelector(".url_prompt_backdrop") === null || document.querySelector(".url_prompt_backdrop").style.display === "none")
			// 		{
			// 				e.preventDefault();
			// 				project.delete_selected_group(e, 'right');
			// 		}
		}
		else if (e.key === 'Backspace' && project.analysis_master_embed === false) {
			project.DeleteButton.click();
			// if( document.querySelector(".url_prompt_backdrop") === null || document.querySelector(".url_prompt_backdrop").style.display === "none")
			// 		{
			// 				e.preventDefault();
			// 				project.delete_selected_group(e, 'left');
			// 		}
		}
		else if (e.key === '=' && project.analysis_master_embed === false) {
			project.ZoomInButton.click();
		}
		else if (e.key === '-' && project.analysis_master_embed === false) {
			project.ZoomOutButton.click();
		}
	}
});

class Layer {
	constructor(sent_container, sent_layer_data, sent_file_length, sent_parent, sent_mode) {
		this.parent_container = sent_container;
		this.layer_data = sent_layer_data;
		this.parent = sent_parent;
		this.parent_file_length = sent_file_length;
		this.selected = false;
		this.segment_array = [];
		this.mode = sent_mode;
		this.initialize();
	}
	initialize() {
		let [color_value_1, color_value_2, initial_saturation_1, initial_saturation_2, urlText] = ["", "", "", "", ""];
		let initial_value = this.layer_data.color;

		[color_value_1, initial_saturation_1, urlText] = this.parent.GetRGBA_Values({ value: initial_value, num: 0 });
		[color_value_2, initial_saturation_2, urlText] = this.parent.GetRGBA_Values({ value: initial_value, num: 1 });

		// let r = parseInt(this.layer_data.color.split("rgba(")[1].split(",")[0]).toString(16);
		// let g = parseInt(this.layer_data.color.split("rgba(")[1].split(",")[1]).toString(16);
		// let b = parseInt(this.layer_data.color.split("rgba(")[1].split(",")[2]).toString(16);

		let r = parseInt(color_value_1.replace("rgba(", "").replace("rgb(", "").split(",")[0]).toString(16);
		let g = parseInt(color_value_1.replace("rgba(", "").replace("rgb(", "").split(",")[1]).toString(16);
		let b = parseInt(color_value_1.replace("rgba(", "").replace("rgb(", "").split(",")[2]).toString(16);
		let presence_sync = true;

		// this.layer_container = createNewElement({type:"div", classes: ["layer_container", "draggable"], parent: this.parent_container, properties:{draggable: true}});
		this.layer_container = createNewElement({ type: "div", classes: ["layer_container", "draggable"], parent: this.parent_container, properties: { draggable: false } });


		this.layer_controls_holder = createNewElement({ type: "div", classes: ["layer_controls_holder"], parent: this.layer_container });
		// this.layer_controls_holder.addEventListener("click", e=> this.select_box.click());
		let width = ((((this.parent.file_length / this.parent.resolution) * this.parent.scale) - 1) + (this.parent.scale / this.parent.resolution)) + "px";
		// this.layer_segment_holder = createNewElement({type:"div", classes: ["layer_segment_holder"], parent: this.layer_container, styles:{width: ((this.parent_file_length/this.parent.resolution) * this.parent.scale) + "px"}});
		this.layer_segment_holder = createNewElement({ type: "div", classes: ["layer_segment_holder"], parent: this.layer_container, styles: { width: width } });

		this.layer_settings_button = createNewElement({ type: "button", classes: ["layer_settings_button", "btn", "btn-secondary"], parent: this.layer_controls_holder, properties: { innerHTML: `<i class="bi bi-gear"></i>` }, styles: { display: "none" }, events: { click: e => { this.layer_settings_button_handler(e) } } });
		this.layer_settings_container = createNewElement({ type: "div", classes: ["layer_settings_container"], parent: this.layer_container, properties: {}, styles: { display: "none" } });

		this.select_box = createNewElement({ type: "input", classes: ["layer_select", "layer_controls_elements"], parent: this.layer_controls_holder, properties: { type: "checkbox" } });
		// this.select_box_selector_box = createNewElement({type:'div', classes:["select_box_selector_box"], parent: this.layer_controls_holder, properties:{}});
		// this.select_box_selector_box.addEventListener("click",e=>this.select_box.click());
		// this.color_picker = createNewElement({type:"input", classes: ["layer_color_picker", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {type: "color", value: ("#" + r + g + b)}, styles: {display: "none"}});

		// Here we can adjust defaults for all color pickers on page:

		this.color_picker_button = createNewElement({ type: "button", classes: ["layer_color_picker_button", "layer_controls_elements", "btn", "btn-secondary"], parent: this.layer_settings_container, properties: { innerHTML: `<i class="bi bi-brush"></i>` }, styles: { backgroundColor: ("#" + r + g + b) } });
		this.color_picker_button.addEventListener("click", e => { myPicker.show(); })
		// this.color_picker = createNewElement({type:"input", classes: [], parent: this.layer_controls_holder, properties: { value: ("#" + r + g + b)}, styles: {display: "none"} });
		this.color_picker = createNewElement({ type: "input", classes: [], parent: this.layer_controls_holder, properties: { value: ("#" + r + g + b) }, styles: { display: "none" } });

		const rgbToHex = (rgb) => '#' + rgb.map(x => {
			const hex = x.toString(16)
			return hex.length === 1 ? '0' + hex : hex
		}).join('')

		let colors_hex = this.parent.colors.map(each => rgbToHex(each.split(",").map(each => parseInt(each))));
		var myPicker = new JSColor(this.color_picker, { format: 'hex', palette: colors_hex });

		this.color_picker.addEventListener("click", e => { myPicker.show(); });

		myPicker.trigger("show", e => { debugger });


		this.color_picker.addEventListener("change", e => this.color_picker_handler(e));
		// this.color_picker.addEventListener("click", e=>this.color_picker_handler(e));
		this.color_picker.addEventListener("input", e => this.color_picker_handler(e));
		this.color_picker.addEventListener("blur", e => this.parent.save_state());


		this.delete_layer_button = createNewElement({ type: "button", classes: ["delete_layer_button", "layer_controls_elements", "btn", "btn-secondary"], parent: this.layer_settings_container, properties: { innerHTML: `<i class="bi bi-trash"></i>` } });
		this.delete_layer_button.addEventListener("click", e => this.delete_layer_button_handler());
		// this.grip = createNewElement({type:"div", classes: ["layer_grip", "layer_controls_elements"], parent: this.layer_controls_holder, properties: {innerHTML: "⋮⋮"}});
		// this.grip.addEventListener("click",e=>this.select_box.click());
		this.name = createNewElement({ type: "div", classes: ["layer_name", "layer_controls_elements"], parent: this.layer_controls_holder, properties: { innerHTML: this.layer_data.name, draggable: true } });
		this.name.addEventListener("click", e => { this.select_box.click() });
		// this.name.addEventListener("dblclick", e=> this.layer_name_double_click_handler(e));
		this.name.addEventListener("input", e => this.layer_name_input_handler(e));
		this.name.addEventListener("focus", e => { this.parent.in_text_editor = true; });
		this.name.addEventListener("blur", e => {
			this.name.contentEditable = false;
			this.name.classList.remove("layer_name_being_edited");
			this.parent.in_text_editor = false;
		});
		this.name.addEventListener("dragstart", e => { this.layer_container.classList.add("dragging"); });
		this.name.addEventListener("touchstart", e => { this.layer_container.classList.add("dragging"); });
		this.name.addEventListener("dragend", e => {
			this.layer_container.classList.remove("dragging");
			this.parent.save_state();
		});
		this.name.addEventListener("touchend", e => {
			this.layer_container.classList.remove("dragging");
			this.parent.save_state();
		});
		this.name.addEventListener("touchcancel", e => {
			this.layer_container.classList.remove("dragging");
			this.parent.save_state();
		});

		this.name_edit_button = createNewElement({ type: "button", classes: ["name_edit_button", "layer_controls_elements", "btn", "btn-secondary"], parent: this.layer_settings_container, properties: { innerHTML: `<i class="bi bi-pen"></i>` }, events: { click: e => this.layer_name_double_click_handler(e) } });



		this.select_box.addEventListener("change", e => this.select_changed(e));

		if (this.layer_data.segments.length === 0) { this.create_segment(0, -1, GLOBAL_presence_scale, GLOBAL_presence_scale, presence_sync); }
		else { this.layer_data.segments.forEach(each => this.create_segment(each.start_pos, each.end_pos, each.start_presence, each.end_presence, each.presence_sync, each)); }

		this.mode = "editing_layer_mode";

		// -----------------------------------
		//      TEXTURES
		// -----------------------------------  

		this.layer_texture_picker = createNewElement({ type: "button", classes: ["layer_texture_picker", "layer_controls_elements", "btn", "btn-secondary"], parent: this.layer_settings_container, properties: { innerHTML: `<i class="bi bi-bricks"></i>` } });
		this.layer_texture_picker.addEventListener("click", e => this.layer_texture_picker_handler(e));
		this.texture_selector = createNewElement({ type: 'div', classes: ["texture_selector", "layer_controls_elements"], parent: this.layer_container, styles: { display: "none" } });

		this.shape_background_texture_1 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_1'], parent: this.texture_selector, styles: { background: 'url(images/pattern_horizontal_lines.png)' }, properties: { title: "Horizontal_Lines" } });
		this.shape_background_texture_2 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_2'], parent: this.texture_selector, styles: { background: 'url(images/pattern_dots_1.png)' }, properties: { title: "Dots_1" } });
		this.shape_background_texture_3 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_3'], parent: this.texture_selector, styles: { background: 'url(images/pattern_dots_2.png)' }, properties: { title: "Dots_2" } });
		this.shape_background_texture_4 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_4'], parent: this.texture_selector, styles: { background: 'url(images/pattern_vertical_lines_1.png)' }, properties: { title: "Vertical_Lines 1" } });
		this.shape_background_texture_5 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_5'], parent: this.texture_selector, styles: { background: 'url(images/pattern_vertical_lines_2.png)' }, properties: { title: "Vertical_Lines 2" } });
		this.shape_background_texture_6 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_6'], parent: this.texture_selector, styles: { background: 'url(images/pattern_diagonal_line_1.png)' }, properties: { title: "Diagonal_Line 1" } });
		this.shape_background_texture_7 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_7'], parent: this.texture_selector, styles: { background: 'url(images/pattern_diagonal_line_2.png)' }, properties: { title: "Diagonal_Line 2" } });
		this.shape_background_texture_8 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_8'], parent: this.texture_selector, styles: { background: 'url(images/pattern_circle_1.png)' }, properties: { title: "Circle_1" } });
		this.shape_background_texture_9 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_9'], parent: this.texture_selector, styles: { background: 'url(images/pattern_circle_2.png)' }, properties: { title: "Circle_2" } });
		this.shape_background_texture_10 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_10'], parent: this.texture_selector, styles: { background: 'url(images/pattern_blank.png)' }, properties: { title: "Blank" } });
		this.shape_background_texture_11 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_11'], parent: this.texture_selector, styles: { background: 'url(images/pattern_vertical_and_horizontal_1.png)' }, properties: { title: "Vertical and Horizontal Lines" } });

		this.shape_background_texture_1_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_1_white'], parent: this.texture_selector, styles: { background: 'url(images/pattern_horizontal_lines-white.png)' }, properties: { title: "Horizontal_Lines white" } });
		this.shape_background_texture_2_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_2_white'], parent: this.texture_selector, styles: { background: 'url(images/pattern_dots_1-white.png)' }, properties: { title: "Dots_1 white" } });
		this.shape_background_texture_3_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_3_white'], parent: this.texture_selector, styles: { background: 'url(images/pattern_dots_2-white.png)' }, properties: { title: "Dots_2 white" } });
		this.shape_background_texture_4_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_4_white'], parent: this.texture_selector, styles: { background: 'url(images/pattern_vertical_lines_1-white.png)' }, properties: { title: "Vertical_Lines 1 white" } });
		this.shape_background_texture_5_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_5_white'], parent: this.texture_selector, styles: { background: 'url(images/pattern_vertical_lines_2-white.png)' }, properties: { title: "Vertical_Lines 2 white" } });
		this.shape_background_texture_6_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_6_white'], parent: this.texture_selector, styles: { background: 'url(images/pattern_diagonal_line_1-white.png)' }, properties: { title: "Diagonal_Line 1 white" } });
		this.shape_background_texture_7_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_7_white'], parent: this.texture_selector, styles: { background: 'url(images/pattern_diagonal_line_2-white.png)' }, properties: { title: "Diagonal_Line 2 white" } });
		this.shape_background_texture_8_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_8_white'], parent: this.texture_selector, styles: { background: 'url(images/pattern_circle_1-white.png)' }, properties: { title: "Circle_1 white" } });
		this.shape_background_texture_9_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_9_white'], parent: this.texture_selector, styles: { background: 'url(images/pattern_circle_2-white.png)' }, properties: { title: "Circle_2 white" } });
		this.shape_background_texture_10_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_10_white'], parent: this.texture_selector, styles: { background: 'url(images/pattern_blank-white.png)' }, properties: { title: "Blank white" } });
		this.shape_background_texture_11_white = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_11_white'], parent: this.texture_selector, styles: { background: 'url(images/pattern_vertical_and_horizontal_1-white.png)' }, properties: { title: "Vertical and Horizontal Lines white" } });




		// this.shape_background_texture_12 = createNewElement({ type: 'button', classes: ['shape_background_texture', 'shape_background_texture_12'], parent: this.texture_selector, styles:{background:'url(images/2-square-pattern-tiled-graphicsfairy-32.png)'}, properties: {title: "Square pattern 1"}});




		this.shape_background_texture_1.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_2.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_3.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_4.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_5.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_6.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_7.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_8.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_9.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_10.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_11.addEventListener('click', e => this.create_layer_background_texture(e));

		this.shape_background_texture_1_white.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_2_white.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_3_white.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_4_white.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_5_white.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_6_white.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_7_white.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_8_white.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_9_white.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_10_white.addEventListener('click', e => this.create_layer_background_texture(e));
		this.shape_background_texture_11_white.addEventListener('click', e => this.create_layer_background_texture(e));




	}
	layer_settings_button_handler(e) {
		if (this.layer_settings_container.style.display === "flex") {
			this.layer_settings_container.style.display = "none";
			this.texture_selector.style.display = "none";
		}
		else {
			this.layer_settings_container.style.display = "flex";
			this.texture_selector.style.display = "none";
		}
	}
	layer_texture_picker_handler(e) {
		if (this.texture_selector.style.display === "block") {
			this.texture_selector.style.display = "none";
			// this.layer_settings_container.style.display = "none";
		}
		else {
			this.texture_selector.style.display = "block";
			this.layer_settings_container.style.display = "none";
		}
	}
	create_layer_background_texture(e) {
		for (let i = 0; i < this.segment_array.length; i++) {
			let initial_value = this.segment_array[i].segment.style.background;

			// Extract the portion between "linear-gradient(" and "))"
			const gradientText = initial_value.match(/linear-gradient\((.*?)\)\)/)[0];

			this.segment_array[i].segment.style.background = e.target.style.background + " center center, " + gradientText;
			this.layer_data.segments[i].color = e.target.style.background + " center center, " + gradientText;
			this.segment_array[i].data.styles.background = e.target.style.background + " center center, " + gradientText;
			this.layer_data.color = e.target.style.background + " center center, " + gradientText;


			// this.segment_array[i].segment.style.background =  e.target.style.background + " center center, " + initial_value;
			// this.layer_data.segments[i].color = e.target.style.background + " center center, " + initial_value;
			// this.segment_array[i].data.styles.background =  e.target.style.background + " center center, " + initial_value;
			// this.layer_data.color = e.target.style.background + " center center, " + initial_value;
		}

		this.texture_selector.style.display = "none";
		this.parent.save_state();
	}
	delete_layer_button_handler() {
		if (window.confirm("Are you sure you want to delete the entire layer?")) {
			this.parent.delete_layer(this.layer_data.layer_id_pos);
		}

	}
	layer_name_double_click_handler(e) {
		this.name.contentEditable = true;
		this.name.classList.add("layer_name_being_edited");
		this.name.focus();
		window.getSelection().selectAllChildren(this.name);
	}
	layer_name_input_handler(e) {
		this.layer_data.name = e.target.innerText;
		for (let i = 0; i < this.segment_array.length; i++) {
			this.segment_array[i].segment_table_row.querySelector(".SegmentTableName").innerText = this.layer_data.name;
		}

		this.parent.save_state();
	}
	color_picker_handler(e) {

		console.log(e.type);
		if (this.select_box.checked === true) {
			let [color_value_1, color_value_2, initial_saturation_1, initial_saturation_2, urlText] = ["", "", "", "", ""];
			let initial_value = this.layer_data.color;

			[color_value_1, initial_saturation_1, urlText] = this.parent.GetRGBA_Values({ value: initial_value, num: 0 });
			[color_value_2, initial_saturation_2, urlText] = this.parent.GetRGBA_Values({ value: initial_value, num: 1 });

			let current_color = e.target.value;

			// convert hex to rgb
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(current_color);
			let result_rgb = { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
			let formated_color_value_for_layer = "rgba(" + result_rgb.r + "," + result_rgb.g + "," + result_rgb.b + ",1.0)";
			let layer_color_formated = "linear-gradient(to right, " + formated_color_value_for_layer + ", " + formated_color_value_for_layer + ")";

			this.color_picker_button.style.background = urlText + layer_color_formated;

			this.layer_data.color = urlText + layer_color_formated;

			for (let i = 0; i < this.segment_array.length; i++) {
				let starting_saturation_value = (this.segment_array[i].data.start_presence / GLOBAL_presence_scale).toFixed(1);
				let ending_saturation_value = (this.segment_array[i].data.end_presence / GLOBAL_presence_scale).toFixed(1);
				let formated_color_value_start = "rgba(" + result_rgb.r + "," + result_rgb.g + "," + result_rgb.b + "," + starting_saturation_value + ")";
				let formated_color_value_end = "rgba(" + result_rgb.r + "," + result_rgb.g + "," + result_rgb.b + "," + ending_saturation_value + ")";
				let segment_color_formated = "linear-gradient(to right, " + formated_color_value_start + ", " + formated_color_value_end + ")";

				this.segment_array[i].segment.style.background = urlText + segment_color_formated;
				this.layer_data.segments[i].color = urlText + segment_color_formated;
				this.segment_array[i].data.styles.background = urlText + segment_color_formated;
			}
		}

		if (e.type === 'change') {
			this.parent.save_state();
		}

	}
	select_changed(e) {

		if (e.target.checked === true) {
			if (ctrl_down === false) {
				this.parent.deselect_all_layers();
			}

			this.layer_controls_holder.classList.add("layer_selected_controls_holder");
			this.layer_segment_holder.classList.add("layer_selected_segments_holder");
			this.selected = true;
			this.segment_array.forEach(each_segment => each_segment.segment.classList.add("segments_layer_is_selected"));
			this.segment_array.forEach(each_segment => each_segment.segment.classList.remove("segments_layer_is_not_selected"));
			this.layer_settings_button.style.display = "block";
		}
		else if (e.target.checked === false) {
			this.layer_controls_holder.classList.remove("layer_selected_controls_holder");
			this.layer_segment_holder.classList.remove("layer_selected_segments_holder");
			this.selected = false;
			this.segment_array.forEach(each_segment => each_segment.segment.classList.remove("segments_layer_is_selected"));
			this.segment_array.forEach(each_segment => each_segment.segment.classList.add("segments_layer_is_not_selected"));
			this.layer_settings_button.style.display = "none";
			this.layer_settings_container.style.display = "none";
			this.texture_selector.style.display = "none";
		}
	}
	split_segment() {

	}
	create_segment(start, end = -1, start_presence = -1, end_presence = -1, presence_sync, sent_segment = {}) {
		this.current_segment_index = 0;
		this.current_position = start * this.parent.resolution;
		let premature_exit = false;



		// treat loading from a file/undo differently than adding a new segment while doing normal editing
		if (this.mode === "load_existing_layer") {
			this.segment_array.push(new Segment(this, end, this.layer_data.segments, sent_segment.color, this.layer_segment_holder, this.parent.PresenceSliderStart, this.parent.PresenceSliderEnd, start_presence, end_presence, presence_sync, sent_segment));
		}
		else if (this.mode === "new_layer") {
			// this.segment_array.push(new Segment(this, this.parent.file_length, this.layer_data.segments, this.layer_data.color, this.layer_segment_holder, this.parent.PresenceSliderStart, this.parent.PresenceSliderEnd, start_presence, end_presence));
			this.segment_array.push(new Segment(this, this.parent_file_length, this.layer_data.segments, this.layer_data.color, this.layer_segment_holder, this.parent.PresenceSliderStart, this.parent.PresenceSliderEnd, start_presence, end_presence, presence_sync));
		}
		else if (this.mode === "editing_layer_mode") {
			this.layer_data.segments.forEach((each, index) => {
				if (this.current_position === 0) {
					alert("There is already a segment that starts here (0)");
					premature_exit = true;
					return false;
				}
				else if (this.current_position === this.parent_file_length) {
					alert("There is already a segment that ends here (0)");
					premature_exit = true;
					return false;
				}
				else if (this.current_position === each.start_pos) {
					alert("There is already a segment that starts here (1)");
					premature_exit = true;
					return false;
				}
				else if (this.current_position === each.end_pos) {
					alert("There is already a segment that ends here (1)");
					premature_exit = true;
					return false;
				}

				if (premature_exit === false && this.current_position > each.start_pos && this.current_position < each.end_pos) this.current_segment_index = index;
			});

			if (premature_exit === false) {
				let current_position_relative_to_current_start_pos = this.current_position - this.layer_data.segments[this.current_segment_index].start_pos;
				let old_width_of_current_segment = this.layer_data.segments[this.current_segment_index].end_pos - this.layer_data.segments[this.current_segment_index].start_pos;
				let old_end_pos_of_current_segment = this.layer_data.segments[this.current_segment_index].end_pos;
				let width_of_new_segment = old_width_of_current_segment - current_position_relative_to_current_start_pos;
				let new_width_of_current_segment = old_width_of_current_segment - width_of_new_segment;

				// make the current segment shorter
				// the -1 is just so the end position of the current segment and start position of the new segment aren't the same
				this.layer_data.segments[this.current_segment_index].end_pos = this.current_position - 1;
				// this.segment_array[this.current_segment_index].segment.style.width = (((new_width_of_current_segment/this.parent.resolution) * this.parent.scale) - 1) + "px";
				// this.segment_array[this.current_segment_index].segment.style.width = ((((this.layer_data.segments[this.current_segment_index].end_pos-this.layer_data.segments[this.current_segment_index].start_pos)/this.parent.resolution) * this.parent.scale) - 1) + "px";
				this.segment_array[this.current_segment_index].segment.style.width = ((((this.layer_data.segments[this.current_segment_index].end_pos / this.parent.resolution) - (this.layer_data.segments[this.current_segment_index].start_pos / this.parent.resolution)) * this.parent.scale) + (this.parent.scale / this.parent.resolution) - 1) + "px";

				this.segment_array.push(new Segment(this, old_end_pos_of_current_segment, this.layer_data.segments, this.layer_data.color, this.layer_segment_holder, this.parent.PresenceSliderStart, this.parent.PresenceSliderEnd, start_presence, end_presence, presence_sync,));
			}
		}

		if (premature_exit === false) {
			this.parent.save_state();
		}
	}
	delete_segment() {

	}
}
class Segment {
	constructor(sent_parent, sent_old_end_pos_of_current_segment, sent_layer_data_segments, sent_color, sent_layer_segment_holder, sent_presence_slider_start, sent_presence_slider_end, sent_start_presence = -1, sent_end_presence = -1, sent_presence_sync, sent_segment) {
		this.parent = sent_parent;
		this.layer_segment_holder = sent_layer_segment_holder;
		this.PresenceSliderStart = sent_presence_slider_start;
		this.PresenceSliderEnd = sent_presence_slider_end;
		this.tapedTwice = false;

		if (this.parent.mode !== "load_existing_layer") {
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
						inner_text: "",
						styles: {
							textAlign: 'center',
							fontSize: "14px"
						}
					}]
			};
			sent_layer_data_segments.push(this.data);
		}
		else { this.data = sent_segment; }

		this.create_segment();
	}
	create_segment() {
		// width:  (((this.data.end_pos/this.parent.parent.resolution) - (this.data.start_pos/this.parent.parent.resolution)) * this.parent.parent.scale) + (this.parent.parent.scale-1) + "px",
		// width:  ((((this.data.end_pos/this.parent.parent.resolution) - (this.data.start_pos/this.parent.parent.resolution)) * this.parent.parent.scale) - 1) + "px",
		let width = ((((this.data.end_pos / this.parent.parent.resolution) - (this.data.start_pos / this.parent.parent.resolution)) * this.parent.parent.scale) + (this.parent.parent.scale / this.parent.parent.resolution) - 1) + "px";

		this.segment = createNewElement({
			type: "div", classes: this.data.classes, parent: this.layer_segment_holder, styles:
			{
				left: ((this.data.start_pos / this.parent.parent.resolution) * this.parent.parent.scale) + "px",
				width: width,
				background: this.data.color,
				filter: this.data.styles.filter,
				clipPath: this.data.styles.clipPath
			},
			properties: { contentEditable: false }
		});

		// properties: {contentEditable: false, innerText: this.data.text[0].inner_text}

		this.segment_text_1 = createNewElement({ type: "div", classes: ["segment_text_1", "segment_text"], parent: this.segment, properties: { innerText: this.data.text[0].inner_text, contentEditable: false }, styles: this.data.text[0].styles });


		// let time_stamp = Math.floor(this.data.start_pos/60) + ":" + String(Math.floor(this.data.start_pos%60)).padStart(2,'0');

		let time_stamp = Math.floor((this.data.start_pos / 10) / 60) + ":" + String(Math.floor((this.data.start_pos / 10) % 60)).padStart(2, '0') + ":" + String((this.data.start_pos) % 10).padStart(1, '0');

		this.segment_table_row = createNewElement({ type: "tr", classes: ["where"], parent: this.parent.parent.TableBodyTBody, properties: {} });
		// this.SegmentTableId = createNewElement({type:"td", classes:["SegmentTableId"], parent: this.segment_table_row, properties:{innerText: this.parent.parent.example_data.piece_info.layer_id_pos}});
		this.SegmentTimestampInputBox = createNewElement({ type: "td", classes: ["SegmentTimestampInputBox"], parent: this.segment_table_row, properties: { innerText: time_stamp } });
		this.SegmentTableName = createNewElement({ type: "td", classes: ["SegmentTableName"], parent: this.segment_table_row, properties: { innerText: this.parent.name.innerText } });
		this.SegmentTableText = createNewElement({ type: "td", classes: ["SegmentTableText"], parent: this.segment_table_row, properties: {} });
		this.SegmentTextInput = createNewElement({ type: "input", classes: ["SegmentTextInput", "form-control"], parent: this.SegmentTableText, properties: { type: "text", value: this.data.text[0].inner_text }, events: { input: e => this.SegmentTextInput_input_handler(e) }, dataset: { text_value: this.data.text[0].inner_text } });
		this.SegmentPresenceStartTR = createNewElement({ type: "td", classes: ["SegmentPresenceStartTR"], parent: this.segment_table_row, properties: {} });
		this.SegmentPresenceStartRange = createNewElement({ type: "input", classes: ["SegmentPresenceStartRange"], parent: this.SegmentPresenceStartTR, properties: { type: "range", innerText: this.data.start_presence, min: "0", max: GLOBAL_presence_scale, value: this.data.start_presence }, events: { input: e => this.SegmentPresenceStartRangeHandler(e, "start") } });
		this.SegmentPresenceEndTR = createNewElement({ type: "td", classes: ["SegmentPresenceEndTR"], parent: this.segment_table_row, properties: {} });
		this.SegmentPresenceEndRange = createNewElement({ type: "input", classes: ["SegmentPresenceEndRange"], parent: this.SegmentPresenceEndTR, properties: { type: "range", innerText: this.data.end_presence, min: "0", max: GLOBAL_presence_scale, value: this.data.end_presence, disabled: this.data.presence_sync }, events: { input: e => this.SegmentPresenceStartRangeHandler(e, "end") } });


		this.SegmentTextInput.addEventListener("focus", e => this.parent.parent.in_text_editor = true);
		this.SegmentTextInput.addEventListener("blur", e => this.parent.parent.in_text_editor = false);

		// Text Formatting Flyout Menu
		this.TextEditingMenuContainer_SingleSegment = createNewElement({ type: "div", classes: ["TextEditingMenuContainer_SingleSegment"], parent: this.segment, properties: {}, styles: { display: "none" } });
		this.TextEditingLeftAlignButton = createNewElement({ type: "button", classes: ["TextEditingLeftAlignButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties: { innerHTML: `<i class="bi-justify-left"></i>` }, events: { click: e => { this.ChangeTextFormat({ style: "textAlign", value: "left" }) } } });
		this.TextEditingCenterAlignButton = createNewElement({ type: "button", classes: ["TextEditingCenterAlignButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties: { innerHTML: `<i class="bi-justify"></i>` }, events: { click: e => { this.ChangeTextFormat({ style: "textAlign", value: "center" }) } } });
		this.TextEditingRightAlignButton = createNewElement({ type: "button", classes: ["TextEditingRightAlignButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties: { innerHTML: `<i class="bi-justify-right"></i>` }, events: { click: e => { this.ChangeTextFormat({ style: "textAlign", value: "right" }) } } });
		this.TextEditingBoldButton = createNewElement({ type: "button", classes: ["TextEditingBoldButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties: { innerHTML: `<i class="bi-type-bold"></i>` }, events: { click: e => { this.ChangeTextFormat({ style: "fontWeight", value: "bold" }) } } });
		this.TextEditingItalicButton = createNewElement({ type: "button", classes: ["TextEditingItalicButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties: { innerHTML: `<i class="bi-type-italic"></i>` }, events: { click: e => { this.ChangeTextFormat({ style: "fontStyle", value: "italic" }) } } });
		this.TextEditingUnderlineButton = createNewElement({ type: "button", classes: ["TextEditingUnderlineButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties: { innerHTML: `<i class="bi-type-underline"></i>` }, events: { click: e => { this.ChangeTextFormat({ style: "textDecoration", value: "underline" }) } } });
		this.TextEditingStrikeThroughButton = createNewElement({ type: "button", classes: ["TextEditingStrikeThroughButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties: { innerHTML: `<i class="bi-type-strikethrough"></i>` }, events: { click: e => { this.ChangeTextFormat({ style: "textDecoration", value: "line-through" }) } } });
		this.TextEditingFontSizeIncreaseButton = createNewElement({ type: "button", classes: ["TextEditingFontSizeIncreaseButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties: { innerHTML: `A+` }, events: { click: e => { this.ChangeTextFormat({ style: "fontSize", type: "increase" }) } } });
		this.TextEditingFontSizeDecreaseButton = createNewElement({ type: "button", classes: ["TextEditingFontSizeDecreaseButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer_SingleSegment, properties: { innerHTML: `A-` }, events: { click: e => { this.ChangeTextFormat({ style: "fontSize", type: "decrease" }) } } });


		if (this.parent.mode !== "load_existing_layer") { this.segment.classList.add("segments_layer_is_selected"); }

		this.segment_text_1.addEventListener("click", e => { this.click_handler(e); });
		this.segment_text_1.addEventListener("dblclick", e => { this.segment_double_click_handler(); });
		this.segment_text_1.addEventListener("input", e => this.segment_text_input_handler(e));
		this.segment_text_1.addEventListener("focus", e => {
			this.parent.parent.in_text_editor = true;
		});
		this.segment_text_1.addEventListener("blur", e => {
			// this.segment.contentEditable = false;
			this.segment_text_1.contentEditable = false;
			this.parent.parent.in_text_editor = false;
		});
	}
	ChangeTextFormat(sent_style) {

		if (sent_style.style === "fontSize") {
			if (sent_style.type === "increase") {
				this.segment_text_1.style[sent_style.style] = (parseInt(this.segment_text_1.style[sent_style.style]) + 1) + "px";
				this.data.text[0].styles[sent_style.style] = (parseInt(this.segment_text_1.style[sent_style.style]) + 1) + "px";
			}
			else if (sent_style.type === "decrease") {
				this.segment_text_1.style[sent_style.style] = (parseInt(this.segment_text_1.style[sent_style.style]) - 1) + "px";
				this.data.text[0].styles[sent_style.style] = (parseInt(this.segment_text_1.style[sent_style.style]) - 1) + "px";
			}
		}
		else if (this.segment_text_1.style[sent_style.style] === sent_style.value) {
			this.segment_text_1.style[sent_style.style] = "unset";
			this.data.text[0].styles[sent_style.style] = "unset";
		}
		else {
			this.segment_text_1.style[sent_style.style] = sent_style.value;
			this.data.text[0].styles[sent_style.style] = sent_style.value;
		}
	}
	SegmentPresenceStartRangeHandler(e, direction) {
		let new_saturation_value = (e.target.value / GLOBAL_presence_scale).toFixed(1);
		let formated_color_value;
		// set the sliders to the value of the first layer/segment selected

		if (this.parent.parent.PresenceSliderEnd.disabled === true) {
			let color_value = this.data.color.split(", ")[1].slice(0, -4);
			let new_color_value = color_value + new_saturation_value + ")";
			formated_color_value = "linear-gradient(to right, " + new_color_value + ", " + new_color_value + ")";
			this.data.start_presence = parseInt(e.target.value);
			this.data.end_presence = parseInt(e.target.value);
		}
		else {
			if (direction === "start") {
				let color_value = this.data.color.split(", ")[1].slice(0, -4);
				let ending_color = this.data.color.split(", ")[2];
				let new_color_value = color_value + new_saturation_value + ")";
				formated_color_value = "linear-gradient(to right, " + new_color_value + ", " + ending_color;
				this.data.start_presence = parseInt(e.target.value);
			}
			else if (direction === "end") {
				let color_value = this.data.color.split(", ")[2].slice(0, -5);
				let starting_color = this.data.color.split(", ")[1];
				let new_color_value = color_value + new_saturation_value + "))";
				formated_color_value = "linear-gradient(to right, " + starting_color + ", " + new_color_value;
				this.data.end_presence = parseInt(e.target.value);
			}
		}

		this.data.color = formated_color_value;
		this.segment.style.background = formated_color_value;
		this.data.styles.background = formated_color_value;
	}
	SegmentTextInput_input_handler(e) {
		this.parent.parent.in_text_editor = true;
		this.data.text[0].inner_text = e.target.value;
		//  this.segment.innerText = e.target.value;
		this.segment_text_1.innerText = e.target.value;
		this.SegmentTextInput.dataset.text_value = e.target.value;

	}
	segment_double_click_handler() {
		// this.segment.contentEditable = true;
		this.segment_text_1.contentEditable = true;
		this.segment_text_1.focus();
		// this.TextEditingMenuContainer_SingleSegment.style.display = "flex";
		// this.segment.focus();
	}
	tapHandler(event) {
		// iOS doesn't acknowledge double tapping so this is the workaround
		if (!this.tapedTwice) {
			this.tapedTwice = true;
			console.log("tapedTwice = " + this.tapedTwice);
			setTimeout(() => {
				this.tapedTwice = false;
				console.log("tapedTwice = " + this.tapedTwice);
			}, 300);
			return false;
		}
		event.preventDefault();
		//action on double tap goes below
		// alert('You tapped me Twice !!!');
		this.segment_text_1.contentEditable = true;
		this.segment_text_1.focus();
	}
	segment_text_input_handler(e) {
		this.data.text[0].inner_text = e.target.innerText;
		this.SegmentTextInput.value = e.target.innerText;
		this.SegmentTextInput.dataset.text_value = e.target.innerText;
		this.parent.parent.save_state();
	}
	click_handler(e) {
		// left control key is not being held, then only allow one segment to be selected at a time
		let deselect = false;
		deselect = this.segment.classList.contains("segment_selected");
		if (ctrl_down === false) {
			// this.parent.parent.Body.querySelectorAll(".segment_selected").forEach(each=>each.classList.remove("segment_selected"));
			// this.parent.parent.BodyContainer.querySelectorAll(".segment_selected").forEach(each=>{ each.classList.remove("segment_selected");});
		}

		this.parent.parent.hide_all_TextFormattingMenuContainer_SingleSegments();
		// this.parent.parent.TextFormattingMenuContainer.style.display = "none";
		// this.parent.parent.TextFormattingMenuContainer.style.cursor = "not-allowed";
		[...this.parent.parent.TextFormattingMenuContainer.children].forEach(
			(each) => (each.style.cursor = "not-allowed")
		);

		if (deselect === true) {
			// deselect this segment
			this.segment.classList.remove("segment_selected");
			if (this.data.classes.includes("segment_selected")) {
				this.data.classes.splice(
					this.data.classes.indexOf("segment_selected")
				);
			}
			this.PresenceSliderStart.value = GLOBAL_presence_scale;
			this.PresenceSliderEnd.value = GLOBAL_presence_scale;
			this.parent.parent.PresenceSliderStart.disabled = true;
			this.parent.parent.PresenceSliderEnd.disabled = true;
		} else {
			// select this segment
			this.segment.classList.add("segment_selected");
			let first_color_saturation_value = this.data.color
				.split(", ")[1]
				.slice(-4)
				.slice(0, 3);
			let second_color_saturation_value = this.data.color
				.split(", ")[2]
				.slice(-5)
				.slice(0, 3);
			this.PresenceSliderStart.value = parseInt(
				first_color_saturation_value * GLOBAL_presence_scale
			);
			this.PresenceSliderEnd.value = parseInt(
				second_color_saturation_value * GLOBAL_presence_scale
			);
			this.data.start_presence = parseInt(this.PresenceSliderStart.value);
			this.data.end_presence = parseInt(this.PresenceSliderEnd.value);
			this.parent.parent.PresenceSliderStart.disabled = false;

			if (this.parent.select_box.checked === false) {
				this.parent.select_box.click();
				// this.parent.select_box.selected = true;
			}

			if (this.data.presence_sync === true) {
				this.parent.parent.PresenceSliderEnd.disabled = true;
			}
			else {
				this.parent.parent.PresenceSliderEnd.disabled = false;
			}

			// this.parent.parent.TextEditingMenuContainer.style.display = "flex";
			[...this.parent.parent.TextEditingMenuContainer.children].forEach(each => each.style.cursor = "auto");


		}

		this.tapHandler(e);
	}
}
class Auralayer {
	constructor() {
		this.url_activity_text = "";
		this.undo_now = false;
		this.save_array = [];
		this.save_position = 0;
		this.in_text_editor = false;
		this.analysis_master_embed = false;
		this.view_mode_slider_top_button = false;
		this.load_from_file_mode = false;
		this.skip_amount = 10;
		this.resolution = 10;
		this.time_stamp_distance = 30;
		this.colors = ["95,70,128", "212,129,46", "189,88,69", "227,177,60", "53,103,146", "88,164,164", "59,131,88", "127,174,86"];
		this.layers = [];
		this.example_data = example_data;
		if (Object.keys(this.example_data).length === 0) { this.example_data = { piece_info: { media_type: "none", name: "new_auralayer", layer_id_pos: 0, scale: 3, color_count: 0, slider_thumb_offset: 0, slider_thumb_height: 0, segment_decrescendo: "gradient" }, layers: [] } }
		this.scale = this.example_data.piece_info.scale;
		this.color_count = this.example_data.piece_info.color_count;
		this.layer_id_pos = this.example_data.piece_info.layer_id_pos;
		this.slider_thumb_offset = this.example_data.piece_info.slider_thumb_offset;
		this.slider_thumb_height = this.example_data.piece_info.slider_thumb_height;
		this.segment_decrescendo = this.example_data.piece_info.segment_decrescendo;
		// this.segment_height = this.example_data.piece_info.segment_height;
		this.segment_height = parseInt(getComputedStyle(document.documentElement, null).getPropertyValue('--segment-height'));
		this.audio_speed = 10;
		this.dragged_layer = -1;
		this.length_padding = GLOBAL_length_padding;
		this.check_for_url_data();
		this.create_activity_selection_interface();
		this.initialize_interface();
		if (this.url_activity_text !== "") {
			this.load_from_server(this.url_activity_text);
			return false;
		}
		else {
			// this.create_activity_selection_interface();
			// this.initialize_interface();	
		}
		// setTimeout(()=>
		// 	{
		// 		console.log("TimeOUT");
		// 		this.create_activity_selection_interface();
		// 		this.initialize_interface();	
		// 	}, "200");

		// this.create_activity_selection_interface();
		// this.initialize_interface();
		this.prevent_navigation_without_warning();
	}
	prevent_navigation_without_warning() {
		// if embedded for analysis master - don't alert about navigating away
		// if(this.analysis_master_embed = true)
		if (this.analysis_master_embed === false) {
			window.addEventListener('beforeunload', function (e) {
				// Chrome requires returnValue to be set
				e.returnValue = '';
			});
		}
	}
	load_from_server(link_id) {
		// Read file from server given file name
		fetch("saves/" + link_id + ".auralayer")
			.then(response => response.json())
			.then(data_from_file => this.load_mechanism(data_from_file))
			.catch(error => console.log(error));
	}
	load_mechanism(loaded_data) {
		// this.loaded_file = JSON.parse( loaded_data );
		this.loaded_file = loaded_data;
		console.log(this.loaded_file);
		this.load_from_file(this.loaded_file);
	}
	create_activity_selection_interface() {
		this.ActivitySelectionContainer = createNewElement({ type: "div", classes: ["ActivitySelectionContainer"], parent: document.body });
		this.ActivitySelectionHeader = createNewElement({ type: "div", classes: ["ActivitySelectionHeader"], parent: this.ActivitySelectionContainer, properties: { innerHTML: `<h1 class="text-primary fw-light">Auralayer</h1>` } });
		this.ActivitySelectionBody = createNewElement({ type: "div", classes: ["ActivitySelectionBody"], parent: this.ActivitySelectionContainer });
		this.NewAuralayerFromYoutubeContainer = createNewElement({ type: "div", classes: ["NewAuralayerFromYoutubeContainer", "ActivityButtonContainer"], parent: this.ActivitySelectionBody });
		this.NewAuralayerFromYoutubeButton = createNewElement({ type: "button", classes: ["NewAuralayerFromYoutubeButton", "btn", "btn-outline-primary"], parent: this.NewAuralayerFromYoutubeContainer, properties: { innerText: "Create" }, events: { click: e => this.StartYoutubeActivitySetup() } });
		this.NewAuralayerFromYoutubeDescription = createNewElement({ type: "div", classes: ["NewAuralayerFromYoutubeDescription"], parent: this.NewAuralayerFromYoutubeContainer, properties: { innerText: "Create a new Auralayer using a YouTube link" } });
		this.NewAuralayerFromAudioFileContainer = createNewElement({ type: "div", classes: ["NewAuralayerFromAudioFileContainer", "ActivityButtonContainer"], parent: this.ActivitySelectionBody });
		this.NewAuralayerFromAudioFileButton = createNewElement({ type: "button", classes: ["NewAuralayerFromAudioFileButton", "btn", "btn-outline-primary"], parent: this.NewAuralayerFromAudioFileContainer, properties: { innerText: "Create" }, events: { click: e => this.StartAudioFileActivitySetup() } });
		this.NewAuralayerFromAudioFileDescription = createNewElement({ type: "div", classes: ["NewAuralayerFromAudioFileDescription"], parent: this.NewAuralayerFromAudioFileContainer, properties: { innerText: "Create a new Auralayer using an audio file on your device" } });
		this.OpenExistingAuralayerFromFileContainer = createNewElement({ type: "div", classes: ["OpenExistingAuralayerFromFileContainer", "ActivityButtonContainer"], parent: this.ActivitySelectionBody });
		this.OpenExistingAuralayerFromFileButton = createNewElement({ type: "button", classes: ["OpenExistingAuralayerFromFileButton", "btn", "btn-outline-primary"], parent: this.OpenExistingAuralayerFromFileContainer, properties: { innerText: "Open" }, events: { click: e => this.ImportFromFile.click() } });
		this.OpenExistingAuralayerFromFileDescription = createNewElement({ type: "div", classes: ["OpenExistingAuralayerFromFileDescription"], parent: this.OpenExistingAuralayerFromFileContainer, properties: { innerText: "Open an existing Auralayer analysis from an auralayer file" } });
		this.NewAuralayerFromAudioFileWithAbsoluteURL_Container = createNewElement({ type: "div", classes: ["NewAuralayerFromAudioFileWithAbsoluteURL_Container", "ActivityButtonContainer"], parent: this.ActivitySelectionBody, styles: { display: "none" } });
		this.NewAuralayerFromAudioFileWithAbsoluteURL_Button = createNewElement({ type: "button", classes: ["NewAuralayerFromAudioFileWithAbsoluteURL_Button", "btn", "btn-outline-primary"], parent: this.NewAuralayerFromAudioFileWithAbsoluteURL_Container, properties: { innerText: "Create" } });
		this.NewAuralayerFromAudioFileWithAbsoluteURL_Description = createNewElement({ type: "div", classes: ["NewAuralayerFromAudioFileWithAbsoluteURL_Description"], parent: this.NewAuralayerFromAudioFileWithAbsoluteURL_Container, properties: { innerText: "Create a new Auralayer using an absolute URL" } });
		this.ActivitySelectionFooter = createNewElement({ type: "div", classes: ["ActivitySelectionFooter"], parent: this.ActivitySelectionContainer });
		this.ImportFromFile = createNewElement({ type: 'input', classes: ["InterfaceButton"], parent: document.body, properties: { type: 'file' }, styles: { display: 'none' }, events: { change: e => this.RequestFileFromUser(e) } });

		// this.NewAuralayerFromYoutubeButton.addEventListener("click", e=>this.StartYoutubeActivitySetup());
		// this.NewAuralayerFromAudioFileButton.addEventListener("click", e=>this.StartAudioFileActivitySetup());
		// this.OpenExistingAuralayerFromFileButton.addEventListener("click", e => this.ImportFromFile.click());	
		// this.ImportFromFile.addEventListener('change', e=>this.RequestFileFromUser(e));

		if (location.hostname.includes("localhost")) { this.NewAuralayerFromAudioFileWithAbsoluteURL_Container.style.display = "flex"; }
	}
	initialize_interface() {
		this.AuralayerProgram = createNewElement({ type: "div", classes: ["AuralayerProgram"], parent: document.body });

		// -----------------------------------
		//      MAIN INTERFACE COMPONENTS
		// -----------------------------------        
		this.Header = createNewElement({ type: "header", classes: ["Header_al"], parent: this.AuralayerProgram });
		// this.Body = createNewElement({type:"main", classes: ["Body_al", "d-flex", "flex-nowrap"], parent: this.AuralayerProgram});
		this.Body = createNewElement({ type: "main", classes: ["Body_al"], parent: this.AuralayerProgram });
		this.Footer = createNewElement({ type: "footer", classes: ["Footer_al"], parent: this.AuralayerProgram });
		// this.LeftOuterColumn = createNewElement({type:"div", classes: ["LeftOuterColumn"], parent: this.AuralayerProgram});
		// this.RightOuterColumn = createNewElement({type:"div", classes: ["RightOuterColumn"], parent: this.AuralayerProgram});

		// -----------------------------------
		//      HEADER COMPONENTS
		// -----------------------------------
		this.HeaderContainer = createNewElement({
			type: "div",
			classes: ["container-fluid"],
			parent: this.Header,
		});
		this.HeaderRow = createNewElement({
			type: "div",
			classes: ["row", "my-1", "justify-content-between", "flex-nowrap"],
			parent: this.HeaderContainer,
		});
		this.HeaderRowLeft = createNewElement({
			type: "div",
			classes: [
				"HeaderRowLeft",
				"col-auto",
				"col-md-4",
				"d-flex",
				"align-content-center",
			],
			parent: this.HeaderRow,
		});
		this.HeaderRowCenter = createNewElement({
			type: "div",
			classes: [
				"HeaderRowCenter",
				"col-auto",
				"col-md-4",
				"text-center",
				"d-flex",
				"align-content-center",
			],
			parent: this.HeaderRow,
			properties: { id: "page-header" },
		});
		this.HeaderRowRight = createNewElement({
			type: "div",
			classes: [
				"HeaderRowRight",
				"col-auto",
				"col-md-4",
				"d-flex",
				"justify-content-end",
				"align-content-center",
			],
			parent: this.HeaderRow,
			properties: { id: "page-header" },
		});

		this.HeaderTitle = createNewElement({
			type: "h1",
			classes: ["text-primary", "fw-light"],
			parent: this.HeaderRowCenter,
			properties: { innerText: "Auralayer" },
		});

		this.HeaderSettingsGearButton = createNewElement({ type: "button", classes: ["btn", "btn-outline-secondary", "border-0"], parent: this.HeaderRowLeft, properties: { innerHTML: `<i class="bi-gear-fill"></i>`, type: "button" }, dataset: { bsToggle: "offcanvas", bsTarget: "#offcanvasExample" }, attributes: { "aria-controls": "offcanvasExample" } });

		// -----------------------------------
		//      HEADER RIGHT
		// -----------------------------------
		// this.UndoZoomContainer = createNewElement ( {type:"div", classes:["UndoZoomContainer", "col"], parent: this.UtilitiesContainer, properties:{id: "undo-redo"} } );
		this.UndoZoomContainer = createNewElement({
			type: "div",
			classes: ["UndoZoomContainer"],
			parent: this.HeaderRowRight,
			properties: { id: "undo-redo" },
		});
		this.UndoButtonGroup = createNewElement({
			type: "div",
			classes: ["UndoButtonGroup", "btn-group"],
			parent: this.UndoZoomContainer,
			properties: { role: "group" },
		});
		this.ZoomButtonGroup = createNewElement({
			type: "div",
			classes: ["ZoomButtonGroup", "btn-group", "mx-2"],
			parent: this.UndoZoomContainer,
			properties: { role: "group" },
		});

		this.ZoomOutButton = createNewElement({
			type: "button",
			classes: [
				"ZoomOutButton",
				"btn",
				"btn-outline-secondary",
				"border-0",
			],
			parent: this.ZoomButtonGroup,
			properties: {
				type: "button",
				innerHTML: `<i class="bi-zoom-out"></i>`,
			},
		});
		this.ZoomOutButton.addEventListener("click", (e) => {
			this.zoom_handler("out");
		});
		this.ZoomInButton = createNewElement({
			type: "button",
			classes: [
				"ZoomInButton",
				"btn",
				"btn-outline-secondary",
				"border-0",
			],
			parent: this.ZoomButtonGroup,
			properties: {
				type: "button",
				title: "Zoom in",
				innerHTML: `<i class="bi-zoom-in"></i>`,
			},
		});
		this.ZoomInButton.addEventListener("click", (e) => {
			this.zoom_handler("in");
		});

		this.UndoButton = createNewElement({
			type: "button",
			classes: [
				"UndoButton",
				"btn",
				"btn-outline-secondary",
				"border-0",
			],
			parent: this.UndoButtonGroup,
			properties: {
				innerText: "Undo",
				type: "button",
				title: "Undo",
				innerHTML: `<i class="bi-arrow-counterclockwise"></i>`,
			},
		});
		this.UndoButton.addEventListener("click", (e) => {
			this.undo_handler();
		});
		this.RedoButton = createNewElement({
			type: "button",
			classes: [
				"RedoButton",
				"btn",
				"btn-outline-secondary",
				"border-0",
			],
			parent: this.UndoButtonGroup,
			properties: {
				innerText: "Redo",
				type: "button",
				title: "Redo",
				innerHTML: `<i class="bi-arrow-clockwise"></i>`,
			},
		});
		this.RedoButton.addEventListener("click", (e) => {
			this.redo_handler();
		});

		// -----------------------------------
		//      SETTINGS OFFCANVAS MENU
		// -----------------------------------

		this.HeaderSettingsMenu = createNewElement({
			type: "div",
			classes: ["offcanvas", "offcanvas-start"],
			parent: this.HeaderRowLeft,
			properties: { id: "offcanvasExample", tabIndex: "-1" },
			attributes: { "aria-labelledby": "Settings" },
		});

		this.HeaderSettingsMenuHeader = createNewElement({
			type: "div",
			classes: ["offcanvas-header"],
			parent: this.HeaderSettingsMenu,
		});
		this.HeaderSettingsMenuHeaderTitle = createNewElement({
			type: "h5",
			classes: ["offcanvas-title"],
			parent: this.HeaderSettingsMenuHeader,
			properties: { innerText: "Settings", id: "Settings" },
		});

		this.HeaderSettingsMenuHeaderCloseButton = createNewElement({ type: "button", classes: ["btn-close"], parent: this.HeaderSettingsMenuHeader, properties: { type: "button" }, attributes: { "aria-label": "Close" }, dataset: { bsDismiss: "offcanvas" } });

		this.HeaderSettingsMenuBody = createNewElement({ type: "div", classes: ["offcanvas-body"], parent: this.HeaderSettingsMenu });


		this.SegmentDecresendoSelectContainer = createNewElement({ type: "p", classes: ["SegmentDecresendoSelectContainer"], parent: this.HeaderSettingsMenuBody });

		this.SegmentDecresendoSelectLabel = createNewElement({ type: "label", classes: [], parent: this.SegmentDecresendoSelectContainer, properties: { innerText: "Segment decrescendo", htmlFor: "decrescendo" } });
		this.SegmentDecresendoSelectBox = createNewElement({ type: "select", classes: ["form-select"], parent: this.SegmentDecresendoSelectContainer, attributes: { "aria-label": "Segment decrescendo" }, events: { change: e => this.SegmentDecresendoSelectBoxHandler(e) } });
		this.SegmentDecresendoSelectBoxOption1 = createNewElement({ type: "option", classes: [], parent: this.SegmentDecresendoSelectBox, properties: { value: "gradient", innerText: "Gradient" }, attributes: { selected: true } });
		this.SegmentDecresendoSelectBoxOption2 = createNewElement({ type: "option", classes: [], parent: this.SegmentDecresendoSelectBox, properties: { value: "slope", innerText: "Slope" } });


		this.SegmentColorPaletteSelectContainer = createNewElement({ type: "p", classes: ["SegmentColorPaletteSelectContainer"], parent: this.HeaderSettingsMenuBody });

		this.SegmentColorPaletteSelectLabel = createNewElement({ type: "label", classes: [], parent: this.SegmentColorPaletteSelectContainer, properties: { innerText: "Segment color palette", htmlFor: "palette" } });
		this.SegmentColorPaletteSelectBox = createNewElement({ type: "select", classes: ["form-select"], parent: this.SegmentColorPaletteSelectContainer, attributes: { "aria-label": "Color palette" } });
		this.SegmentColorPaletteSelectBoxOption1 = createNewElement({ type: "option", classes: [], parent: this.SegmentColorPaletteSelectBox, properties: { value: "1", innerText: "Bright", selected: true } });
		this.SegmentColorPaletteSelectBoxOption2 = createNewElement({ type: "option", classes: [], parent: this.SegmentColorPaletteSelectBox, properties: { value: "2", innerText: "Dark" } });
		this.SegmentColorPaletteSelectBoxOption3 = createNewElement({ type: "option", classes: [], parent: this.SegmentColorPaletteSelectBox, properties: { value: "3", innerText: "Warm" } });
		this.SegmentColorPaletteSelectBoxOption4 = createNewElement({ type: "option", classes: [], parent: this.SegmentColorPaletteSelectBox, properties: { value: "4", innerText: "Cool" } });
		this.SegmentColorPaletteSelectBoxOption5 = createNewElement({ type: "option", classes: [], parent: this.SegmentColorPaletteSelectBox, properties: { value: "5", innerText: "Rainbow" } });
		this.SegmentColorPaletteSelectBoxOption6 = createNewElement({ type: "option", classes: [], parent: this.SegmentColorPaletteSelectBox, properties: { value: "6", innerText: "Rainbow (desaturated)" } });
		this.SegmentColorPaletteSelectBoxOption7 = createNewElement({ type: "option", classes: [], parent: this.SegmentColorPaletteSelectBox, properties: { value: "7", innerText: "Sunset" } });
		this.SegmentColorPaletteSelectBoxOption8 = createNewElement({ type: "option", classes: [], parent: this.SegmentColorPaletteSelectBox, properties: { value: "8", innerText: "Green–Black" } });
		this.SegmentColorPaletteSelectBoxOption9 = createNewElement({ type: "option", classes: [], parent: this.SegmentColorPaletteSelectBox, properties: { value: "9", innerText: "Pink–Blue" } });
		this.SegmentColorPaletteSelectBoxOption10 = createNewElement({ type: "option", classes: [], parent: this.SegmentColorPaletteSelectBox, properties: { value: "10", innerText: "Cornflower–White" } });



		// -----------------------------------
		//      BODY COMPONENTS (not document.body but Auralayer's body)
		// -----------------------------------
		this.BodyContainer = createNewElement({
			type: "div",
			classes: ["BodyContainer", "container-fluid"],
			parent: this.Body,
		});
		this.UtilitiesContainer = createNewElement({
			type: "div",
			classes: [
				"UtilitiesContainer",
				"row",
				"mx-md-5",
				"justify-content-between",
			],
			parent: this.BodyContainer,
			properties: { id: "utilites" },
		});
		this.AllLayerContainers = createNewElement({
			type: "div",
			classes: ["AllLayerContainers"],
			parent: this.BodyContainer,
		});
		this.LoadingSpinner = createNewElement({ type: "div", classes: ["LoadingSpinner", "spinner-border", "text-primary"], parent: this.AllLayerContainers, properties: { role: "status", innerHTML: `<span class="visually-hidden">Loading...</span>` }, styles: { display: "none" } });

		// <div class="spinner-border text-primary" role="status">
		// 	<span class="visually-hidden">Loading...</span>
		// </div>
		this.AllLayerContainers.addEventListener("dragover", (e) => {
			this.dragging_handler(e);
		});
		this.AllLayerContainers.addEventListener("touchmove", (e) => {
			this.dragging_handler(e);
		});
		this.SliderContainer = createNewElement({
			type: "div",
			classes: ["SliderContainer"],
			parent: this.BodyContainer,
		});
		this.SegmentEditingSuperContainer = createNewElement({
			type: "div",
			classes: ["SegmentEditingSuperContainer", "col-lg-8", "mx-auto"],
			parent: this.Body,
		});
		this.SegmentEditingContainer = createNewElement({
			type: "div",
			classes: [
				"SegmentEditingContainer",
				"row",
				"justify-content-md-around",
				"align-items-center",
				"g-2",
				"my-3",
			],
			parent: this.SegmentEditingSuperContainer,
			properties: { id: "interface-container" },
		});

		// -----------------------------------
		//       SLIDER CONTAINER COMPONENTS
		// -----------------------------------    
		this.SeekSlider = createNewElement({ type: "input", classes: ["slider", "SeekSlider"], parent: this.SliderContainer, properties: { type: "range", value: 0 } });
		this.SeekSlider.addEventListener("input", (e) => this.seek_slider_moved_handler(e));

		// -----------------------------------
		//      LEFT OUTER COLUMN COMPONENTS
		// -----------------------------------       
		// this.UndoZoomContainer = createNewElement ( {type:"div", classes:["UndoZoomContainer", "col"], parent: this.UtilitiesContainer, properties:{id: "undo-redo"} } );
		this.UndoZoomContainer = createNewElement({ type: "div", classes: ["UndoZoomContainer", "col"], parent: this.HeaderContainer, properties: { id: "undo-redo" } });
		this.UndoButtonGroup = createNewElement({ type: "div", classes: ["UndoButtonGroup", "btn-group"], parent: this.UndoZoomContainer, properties: { role: "group" } });
		this.ZoomButtonGroup = createNewElement({ type: "div", classes: ["ZoomButtonGroup", "btn-group"], parent: this.UndoZoomContainer, properties: { role: "group" } });

		this.ZoomOutButton = createNewElement({ type: "button", classes: ["ZoomOutButton", "btn", "btn-outline-secondary", "rounded-0", "rounded-top", "border-0"], parent: this.ZoomButtonGroup, properties: { type: "button", innerHTML: `<i class="bi-zoom-out"></i>` } });
		this.ZoomOutButton.addEventListener("click", e => { this.zoom_handler("out") });
		this.ZoomInButton = createNewElement({ type: "button", classes: ["ZoomInButton", "btn", "btn-outline-secondary", "rounded-0", "rounded-top", "border-0"], parent: this.ZoomButtonGroup, properties: { type: "button", title: "Zoom in", innerHTML: `<i class="bi-zoom-in"></i>` } });
		this.ZoomInButton.addEventListener("click", e => { this.zoom_handler("in") });


		this.UndoButton = createNewElement({ type: "button", classes: ["UndoButton", "btn", "btn-outline-secondary", "rounded-0", "rounded-top", "border-0"], parent: this.UndoButtonGroup, properties: { innerText: "Undo", type: "button", title: "Undo", innerHTML: `<i class="bi-arrow-counterclockwise"></i>` } });
		this.UndoButton.addEventListener("click", e => { this.undo_handler() });
		this.RedoButton = createNewElement({ type: "button", classes: ["RedoButton", "btn", "btn-outline-secondary", "rounded-0", "rounded-top", "border-0"], parent: this.UndoButtonGroup, properties: { innerText: "Redo", type: "button", title: "Redo", innerHTML: `<i class="bi-arrow-clockwise"></i>` } });
		this.RedoButton.addEventListener("click", e => { this.redo_handler() });



		// -----------------------------------
		//      AUDIO CONTROLs
		// -----------------------------------  				

		this.audio_play_button = createNewElement({ type: "button", classes: ["audio_play_button", "btn", "btn-outline-secondary", "rounded-0", "rounded-top", "border-0"], parent: this.UndoZoomContainer, properties: { innerHTML: `<i class="bi-play-circle"></i>` }, events: { click: e => this.play_button_handler(e) } });
		// this.audio_pause_button = createNewElement({type:"button", classes:["audio_pause_button", "btn", "btn-outline-secondary", "rounded-0", "rounded-top", "border-0"], parent: this.UndoZoomContainer, properties: {innerHTML: `<i class="bi-pause-circle"></i>`}});

		// -----------------------------------
		//    LAYER EDITING CONTAINER COMPONENTS
		// -----------------------------------    

		this.LayerEditingContainer = createNewElement({ type: "div", classes: ["col-md-3", "text-md-start", "text-center"], parent: this.SegmentEditingContainer, properties: { id: "new-layer" } });

		this.LayerEditingRow = createNewElement({ type: "div", classes: ["LayerEditingRow", "row", "align-items-center", "flex-nowrap"], parent: this.LayerEditingContainer, properties: {} });

		this.AddLayerRowContainer = createNewElement({ type: "div", classes: ["AddLayerRowContainer", "col-4"], parent: this.LayerEditingRow, properties: {} });
		this.AddLayerButton = createNewElement({ type: "button", classes: ["AddLayerButton", "btn", "btn-primary"], parent: this.AddLayerRowContainer, properties: { innerHTML: `<i class="bi-plus-lg"></i>`, title: "Add new layer", type: "button" } });
		this.AddLayerButton.addEventListener("click", e => this.add_layer_handler());

		// -----------------------------------
		//    SEGMENT EDITING CONTAINER COMPONENTS
		// -----------------------------------        





		this.SegmentEditingContainer2 = createNewElement({ type: "div", classes: ["col-md-4", "text-center", "flex-nowrap"], parent: this.SegmentEditingContainer, properties: { id: "edit-layers" } });

		this.SplitButton = createNewElement({ type: "button", classes: ["SplitButton", "btn", "btn-primary"], parent: this.SegmentEditingContainer2, properties: { innerHTML: `<i class="bi-layout-split"></i>`, type: "button", title: "Split" } });
		this.SplitButton.addEventListener('click', e => this.split_selected_segment(e));

		this.MergeButtonGroup = createNewElement({ type: "div", classes: ["btn-group"], parent: this.SegmentEditingContainer2, properties: { role: "group" } });

		this.MergeLeftButton = createNewElement({ type: "button", classes: ["MergeLeftButton", "btn", "btn-primary"], parent: this.MergeButtonGroup, properties: { innerHTML: `<i class="bi-box-arrow-in-left"></i>`, role: "group", type: "button", title: "Merge left" } });
		this.MergeLeftButton.addEventListener('click', e => this.merge_segments(e, "left"));

		this.MergeRightButton = createNewElement({ type: "button", classes: ["MergeRightButton", "btn", "btn-primary"], parent: this.MergeButtonGroup, properties: { innerHTML: `<i class="bi-box-arrow-in-right"></i>`, role: "group", type: "button", title: "Merge right" } });
		this.MergeRightButton.addEventListener('click', e => this.merge_segments(e, "right"));

		// this.AddMarkerButton = createNewElement({type:"button", classes: ["AddMarkerButton", "btn", "btn-primary"], parent: this.MergeButtonGroup, properties: {innerHTML: `<i class="bi-bookmark-plus-fill"></i>`, role: "group", type: "button", title: "Add Marker"}});
		// this.AddMarkerButton.addEventListener('click', e=>this.add_marker(e));

		this.DeleteButton = createNewElement({ type: "button", classes: ["DeleteButton", "btn", "btn-danger"], parent: this.SegmentEditingContainer2, properties: { innerText: "Delete", type: "button", title: "Delete layer", innerHTML: `<i class="bi-x-lg"></i>` } });
		this.DeleteButton.addEventListener('click', e => this.delete_button_handler(e));

		this.ExportButtonContainer = createNewElement({ type: "div", classes: ["ExportButtonContainer", "col-md-2", "text-md-end", "text-center", "flex-nowrap"], parent: this.SegmentEditingContainer, properties: { id: "export" } });

		this.SaveToFileButton = createNewElement({ type: "button", classes: ["SaveToFileButton", "btn", "btn-secondary"], parent: this.ExportButtonContainer, properties: { innerHTML: `<i class="bi-download"></i>`, type: "button", title: "Save Analysis to File" }, dataset: { bsToggle: "modal", bsTarget: "#download" } });
		// this.SaveToFileButton.addEventListener("click", e => { this.save_to_file(); });
		this.SaveToFileButton.addEventListener("click", e => { download_image(); });

		this.ShareAnalysisButton = createNewElement({ type: "button", classes: ["ShareAnalysisButton", "btn", "btn-secondary"], parent: this.ExportButtonContainer, properties: { innerHTML: `<i class="bi-share-fill"></i>` }, dataset: { bsToggle: "modal", bsTarget: "#share" } });

		this.PresenceSliderContainer = createNewElement({ type: "div", classes: ["PresenceSliderContainer", "col-7"], parent: this.LayerEditingRow, properties: {} });
		this.PresenceSliderStartLabel = createNewElement({ type: "label", classes: ["form-label"], parent: this.PresenceSliderContainer, properties: { for: "presence_start", innerText: "Presence (start)" } });
		this.PresenceSliderStart = createNewElement({ type: "input", classes: ["PresenceSliderStart", "presence_slider", "form-range"], parent: this.PresenceSliderContainer, properties: { type: "range", min: 0, max: GLOBAL_presence_scale, id: "presence_start", disabled: true } });
		this.PresenceSliderStart.addEventListener("input", e => this.change_opacity(e, "start"));

		this.PresenceSliderEndLabel = createNewElement({ type: "label", classes: ["form-label"], parent: this.PresenceSliderContainer, properties: { for: "presence_end", innerText: "Presence (end)" } });
		this.PresenceSliderEnd = createNewElement({ type: "input", classes: ["PresenceSliderEnd", "presence_slider", "form-range"], parent: this.PresenceSliderContainer, properties: { type: "range", min: 0, max: GLOBAL_presence_scale, id: "presence_end", disabled: true } });
		this.PresenceSliderEnd.addEventListener("input", e => this.change_opacity(e, "end"));

		this.PresenceLockContainer = createNewElement({ type: "div", classes: ["PresenceLockContainer", "col-1", "align-items-center"], parent: this.LayerEditingRow, properties: {} });
		this.PresenceLockDiv = createNewElement({ type: "div", classes: ["link-presence", "text-center"], parent: this.PresenceLockContainer });

		this.PresenceSliderIndependentToggle = createNewElement({ type: "input", classes: ["PresenceSliderIndependentToggle"], parent: this.PresenceLockDiv, properties: { type: "checkbox" }, styles: { display: "none" } });
		this.PresenceSliderIndependentButton = createNewElement({ type: "button", classes: ["PresenceSliderIndependentButton", "btn", "active", "btn-sm"], parent: this.PresenceLockDiv, properties: { innerHTML: `<i class="bi-link-45deg"></i>` }, dataset: { bsToggle: "button" }, attributes: { "aria-pressed": "Segment decrescendo" } });
		this.PresenceSliderIndependentButton.addEventListener("click", () => this.PresenceSliderIndependentToggle.click());

		this.PresenceSliderIndependentToggle.addEventListener("change", e => {
			if (this.PresenceSliderEnd.disabled === false) {
				this.PresenceSliderStart.disabled = true;
				this.PresenceSliderEnd.disabled = true;

				// this.PresenceSliderIndependentButton.classList.remove("PresenceSliderIndependentButtonSelected");
				this.presence_slider_toggle_handler();
				this.PresenceSliderIndependentButton.children[0].classList.remove("bi-link");
				this.PresenceSliderIndependentButton.children[0].classList.add("bi-link-45deg");
			}
			else {
				this.PresenceSliderStart.disabled = false;
				this.PresenceSliderEnd.disabled = false;

				this.presence_slider_toggle_handler();
				// this.PresenceSliderIndependentButton.classList.add("PresenceSliderIndependentButtonSelected");
				this.PresenceSliderIndependentButton.children[0].classList.remove("bi-link-45deg");
				this.PresenceSliderIndependentButton.children[0].classList.add("bi-link");
			}
		});

		{/* <th role="columnheader" class="col-1">ID</th> */ }

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

		this.TextFormattingMenuContainer = createNewElement({
			type: "div",
			classes: [
				"TextFormattingMenuContainer",
				"btn-toolbar",
				"justify-content-center",
			],
			parent: this.SegmentEditingSuperContainer,
			properties: {
				role: "toolbar",
			},
		});
		this.AlignmentGroup = createNewElement({
			type: "div",
			classes: ["AlignmentGroup", "btn-group", "btn-group-small"],
			parent: this.TextFormattingMenuContainer,
			properties: {
				role: "group",
			},
		});
		this.TextFormatGroup = createNewElement({
			type: "div",
			classes: [
				"TextFormatGroup",
				"btn-group",
				"btn-group-small",
				"mx-2",
			],
			parent: this.TextFormattingMenuContainer,
			properties: {
				role: "group",
			},
		});
		this.TextSizeGroup = createNewElement({
			type: "div",
			classes: ["TextSizeGroup", "btn-group", "btn-group-small"],
			parent: this.TextFormattingMenuContainer,
			properties: {
				role: "group",
			},
		});

		this.TextEditingLeftAlignButton = createNewElement({
			type: "button",
			classes: [
				"TextEditingButton",
				"TextEditingLeftAlignButton",
				"btn",
				"btn-light",
			],
			parent: this.AlignmentGroup,
			properties: { innerHTML: `<i class="bi-justify-left"></i>` },
			events: {
				click: (e) => {
					this.ChangeTextFormat({
						style: "textAlign",
						value: "left",
					});
				},
			},
		});
		this.TextEditingCenterAlignButton = createNewElement({
			type: "button",
			classes: [
				"TextEditingButton",
				"TextEditingCenterAlignButton",
				"btn",
				"btn-light",
			],
			parent: this.AlignmentGroup,
			properties: { innerHTML: `<i class="bi-justify"></i>` },
			events: {
				click: (e) => {
					this.ChangeTextFormat({
						style: "textAlign",
						value: "center",
					});
				},
			},
		});
		this.TextEditingRightAlignButton = createNewElement({
			type: "button",
			classes: [
				"TextEditingButton",
				"TextEditingRightAlignButton",
				"btn",
				"btn-light",
			],
			parent: this.AlignmentGroup,
			properties: { innerHTML: `<i class="bi-justify-right"></i>` },
			events: {
				click: (e) => {
					this.ChangeTextFormat({
						style: "textAlign",
						value: "right",
					});
				},
			},
		});

		this.TextEditingBoldButton = createNewElement({
			type: "button",
			classes: [
				"TextEditingButton",
				"TextEditingBoldButton",
				"btn",
				"btn-light",
			],
			parent: this.TextFormatGroup,
			properties: { innerHTML: `<i class="bi-type-bold"></i>` },
			events: {
				click: (e) => {
					this.ChangeTextFormat({
						style: "fontWeight",
						value: "bold",
					});
				},
			},
		});
		this.TextEditingItalicButton = createNewElement({
			type: "button",
			classes: [
				"TextEditingButton",
				"TextEditingItalicButton",
				"btn",
				"btn-light",
			],
			parent: this.TextFormatGroup,
			properties: { innerHTML: `<i class="bi-type-italic"></i>` },
			events: {
				click: (e) => {
					this.ChangeTextFormat({
						style: "fontStyle",
						value: "italic",
					});
				},
			},
		});
		this.TextEditingUnderlineButton = createNewElement({ type: "button", classes: ["TextEditingButton", "TextEditingUnderlineButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer, properties: { innerHTML: `<i class="bi-type-underline"></i>` }, events: { click: e => { this.ChangeTextFormat({ style: "textDecoration", value: "underline" }) } } });
		this.TextEditingStrikeThroughButton = createNewElement({
			type: "button",
			classes: [
				"TextEditingButton",
				"TextEditingStrikeThroughButton",
				"btn",
				"btn-light",
			],
			parent: this.TextFormatGroup,
			properties: {
				innerHTML: `<i class="bi-type-strikethrough"></i>`,
			},
			events: {
				click: (e) => {
					this.ChangeTextFormat({
						style: "textDecoration",
						value: "line-through",
					});
				},
			},
		});
		this.TextEditingFontSizeIncreaseButton = createNewElement({
			type: "button",
			classes: [
				"TextEditingButton",
				"TextEditingFontSizeIncreaseButton",
				"btn",
				"btn-light",
			],
			parent: this.TextSizeGroup,
			properties: { innerHTML: `A+` },
			events: {
				click: (e) => {
					this.ChangeTextFormat({
						style: "fontSize",
						type: "increase",
					});
				},
			},
		});
		this.TextEditingFontSizeDecreaseButton = createNewElement({
			type: "button",
			classes: [
				"TextEditingButton",
				"TextEditingFontSizeDecreaseButton",
				"btn",
				"btn-light",
			],
			parent: this.TextSizeGroup,
			properties: { innerHTML: `A-` },
			events: {
				click: (e) => {
					this.ChangeTextFormat({
						style: "fontSize",
						type: "decrease",
					});
				},
			},
		});
		this.AccordionContainer1 = createNewElement({
			type: "div",
			classes: ["AccordionContainer1", "row", "text-center"],
			parent: this.Body,
			properties: { id: "collapsing" },
		});
		this.AccordionContainer2 = createNewElement({
			type: "div",
			classes: [
				"AccordionContainer2",
				"col-md-10",
				"p-1",
				"m-auto",
				"my-3",
			],
			parent: this.AccordionContainer1,
			properties: {},
		});
		this.AccordionContainer3 = createNewElement({
			type: "div",
			classes: ["AccordionContainer3", "accordion"],
			parent: this.AccordionContainer2,
			properties: { id: "table-video" },
		});
		this.DataTableContainer1 = createNewElement({
			type: "div",
			classes: ["DataTableContainer1", "accordion-item"],
			parent: this.AccordionContainer3,
			properties: {},
		});
		this.DataAccordionHeader = createNewElement({
			type: "h2",
			classes: ["DataAccordionHeader", "accordion-header"],
			parent: this.DataTableContainer1,
			properties: {},
		});
		this.DataAccordionButton = createNewElement({
			type: "button",
			classes: [
				"DataAccordionButton",
				"accordion-button",
				"collapsed",
				"ps-5",
			],
			parent: this.DataAccordionHeader,
			properties: {
				type: "button",
				innerHTML: `<i class="bi-table"></i>&emsp; Data table`,
			},
			dataset: { bsToggle: "collapse", bsTarget: "#collapseOne" },
			attributes: {
				"aria-expanded": "false",
				"aria-controls": "collapseOne",
			},
		});
		this.DataAccordionBody = createNewElement({
			type: "div",
			classes: ["DataAccordionBody", "accordion-collapse", "collapse"],
			parent: this.DataTableContainer1,
			properties: { id: "collapseOne" },
			dataset: { bsParent: "#table-video" },
		});
		this.DataAccordionBodyInterior = createNewElement({
			type: "div",
			classes: [
				"DataAccordionBodyInterior",
				"accordion-body",
				"text-center",
			],
			parent: this.DataAccordionBody,
			properties: {},
		});

		this.DataTableWrapper = createNewElement({
			type: "div",
			classes: ["col"],
			parent: this.DataAccordionBodyInterior,
		});
		this.DataTable = createNewElement({
			type: "table",
			classes: ["table", "table-responsive"],
			parent: this.DataTableWrapper,
		});
		this.TableBodyTHead = createNewElement({
			type: "thead",
			classes: ["TableBodyTHead"],
			parent: this.DataTable,
			properties: { innerHTML: data_html },
		});
		this.TableBodyTBody = createNewElement({
			type: "tbody",
			classes: ["TableBodyTBody"],
			parent: this.DataTable,
			properties: {},
		});
		this.DataTableTable = new Tablesort(this.DataTable);
		this.VideoContainer1 = createNewElement({
			type: "div",
			classes: ["VideoContainer1", "accordion-item"],
			parent: this.AccordionContainer3,
			properties: {},
		});
		this.VideoAccordionHeader = createNewElement({
			type: "h2",
			classes: ["VideoAccordionHeader", "accordion-header"],
			parent: this.VideoContainer1,
			properties: {},
		});
		this.VideoAccordionButton = createNewElement({
			type: "button",
			classes: [
				"VideoAccordionButton",
				"accordion-button",
				"collapsed",
				"ps-5",
			],
			parent: this.VideoAccordionHeader,
			properties: {
				type: "button",
				innerHTML: `<i class="bi-youtube"></i>&emsp; Media`,
			},
			dataset: { bsToggle: "collapse", bsTarget: "#collapseTwo" },
			attributes: {
				"aria-expanded": "false",
				"aria-controls": "collapseTwo",
			},
		});
		this.VideoAccordionBody = createNewElement({
			type: "div",
			classes: ["VideoAccordionBody", "accordion-collapse", "collapse"],
			parent: this.VideoContainer1,
			properties: { id: "collapseTwo" },
			dataset: { bsParent: "#table-video" },
		});
		this.VideoAccordionBodyInterior = createNewElement({
			type: "div",
			classes: [
				"VideoAccordionBodyInterior",
				"accordion-body",
				"text-center",
			],
			parent: this.VideoAccordionBody,
			properties: {},
		});
		this.AccordionContainer1 = createNewElement({ type: "div", classes: ["AccordionContainer1", "row", "text-center"], parent: this.SegmentEditingContainer, properties: { id: "collapsing" } });
		this.TextEditingMenuContainer = createNewElement({ type: "div", classes: ["TextEditingMenuContainer"], parent: this.AccordionContainer1, properties: {} });
		this.TextEditingLeftAlignButton = createNewElement({ type: "button", classes: ["TextEditingButton", "TextEditingLeftAlignButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer, properties: { innerHTML: `< i class="bi-justify-left" ></i > ` }, events: { click: e => { this.ChangeTextFormat({ style: "textAlign", value: "left" }) } } });
		this.TextEditingCenterAlignButton = createNewElement({ type: "button", classes: ["TextEditingButton", "TextEditingCenterAlignButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer, properties: { innerHTML: `< i class="bi-justify" ></i > ` }, events: { click: e => { this.ChangeTextFormat({ style: "textAlign", value: "center" }) } } });
		this.TextEditingRightAlignButton = createNewElement({ type: "button", classes: ["TextEditingButton", "TextEditingRightAlignButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer, properties: { innerHTML: `< i class="bi-justify-right" ></i > ` }, events: { click: e => { this.ChangeTextFormat({ style: "textAlign", value: "right" }) } } });
		this.TextEditingBoldButton = createNewElement({ type: "button", classes: ["TextEditingButton", "TextEditingBoldButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer, properties: { innerHTML: `< i class="bi-type-bold" ></i > ` }, events: { click: e => { this.ChangeTextFormat({ style: "fontWeight", value: "bold" }) } } });
		this.TextEditingItalicButton = createNewElement({ type: "button", classes: ["TextEditingButton", "TextEditingItalicButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer, properties: { innerHTML: `< i class="bi-type-italic" ></i > ` }, events: { click: e => { this.ChangeTextFormat({ style: "fontStyle", value: "italic" }) } } });
		this.TextEditingUnderlineButton = createNewElement({ type: "button", classes: ["TextEditingButton", "TextEditingUnderlineButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer, properties: { innerHTML: `< i class="bi-type-underline" ></i > ` }, events: { click: e => { this.ChangeTextFormat({ style: "textDecoration", value: "underline" }) } } });
		this.TextEditingStrikeThroughButton = createNewElement({ type: "button", classes: ["TextEditingButton", "TextEditingStrikeThroughButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer, properties: { innerHTML: `< i class="bi-type-strikethrough" ></i > ` }, events: { click: e => { this.ChangeTextFormat({ style: "textDecoration", value: "line-through" }) } } });
		this.TextEditingFontSizeIncreaseButton = createNewElement({ type: "button", classes: ["TextEditingButton", "TextEditingFontSizeIncreaseButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer, properties: { innerHTML: `A + ` }, events: { click: e => { this.ChangeTextFormat({ style: "fontSize", type: "increase" }) } } });
		this.TextEditingFontSizeDecreaseButton = createNewElement({ type: "button", classes: ["TextEditingButton", "TextEditingFontSizeDecreaseButton", "btn", "btn-outline-secondary", "border-0"], parent: this.TextEditingMenuContainer, properties: { innerHTML: `A - ` }, events: { click: e => { this.ChangeTextFormat({ style: "fontSize", type: "decrease" }) } } });
		this.AccordionContainer2 = createNewElement({ type: "div", classes: ["AccordionContainer2", "col-md-10", "p-1", "m-auto", "my-3"], parent: this.AccordionContainer1, properties: {} });
		this.AccordionContainer3 = createNewElement({ type: "div", classes: ["AccordionContainer3", "accordion"], parent: this.AccordionContainer2, properties: { id: "table-video" } });
		this.DataTableContainer1 = createNewElement({ type: "div", classes: ["DataTableContainer1", "accordion-item"], parent: this.AccordionContainer3, properties: {} });
		this.DataAccordionHeader = createNewElement({ type: "h2", classes: ["DataAccordionHeader", "accordion-header"], parent: this.DataTableContainer1, properties: {} });
		this.DataAccordionButton = createNewElement({ type: "button", classes: ["DataAccordionButton", "accordion-button", "collapsed"], parent: this.DataAccordionHeader, properties: { type: "button", innerHTML: `< i class="bi-table" ></i >& emsp; Data table` }, dataset: { bsToggle: "collapse", bsTarget: "#collapseOne" }, attributes: { "aria-expanded": "false", "aria-controls": "collapseOne" } });
		this.DataAccordionBody = createNewElement({ type: "div", classes: ["DataAccordionBody", "accordion-collapse", "collapse"], parent: this.DataTableContainer1, properties: { id: "collapseOne" }, dataset: { bsParent: "#table-video" } });
		this.DataAccordionBodyInterior = createNewElement({ type: "div", classes: ["DataAccordionBodyInterior", "accordion-body", "text-center"], parent: this.DataAccordionBody, properties: {} });
		this.SearchTableInput = createNewElement({ type: "input", classes: ["table-filter"], parent: this.DataAccordionBodyInterior, properties: { type: "text", placeholder: "Item to filter.." }, dataset: { table: "order-table" } });
		this.DataTable = createNewElement({ type: "table", classes: ["order-table", "table"], parent: this.DataAccordionBodyInterior });
		this.TableBodyTHead = createNewElement({ type: "thead", classes: ["TableBodyTHead"], parent: this.DataTable, properties: { innerHTML: data_html } });
		this.TableBodyTBody = createNewElement({ type: "tbody", classes: ["TableBodyTBody"], parent: this.DataTable, properties: {} });
		this.DataTableTable = new Tablesort(this.DataTable);
		this.VideoContainer1 = createNewElement({ type: "div", classes: ["VideoContainer1", "accordion-item"], parent: this.AccordionContainer3, properties: {} });
		this.VideoAccordionHeader = createNewElement({ type: "h2", classes: ["VideoAccordionHeader", "accordion-header"], parent: this.VideoContainer1, properties: {} });
		this.VideoAccordionButton = createNewElement({ type: "button", classes: ["VideoAccordionButton", "accordion-button", "collapsed"], parent: this.VideoAccordionHeader, properties: { type: "button", innerHTML: `< i class="bi-youtube" ></i >& emsp; Media` }, dataset: { bsToggle: "collapse", bsTarget: "#collapseTwo" }, attributes: { "aria-expanded": "false", "aria-controls": "collapseTwo" } });
		this.VideoAccordionBody = createNewElement({ type: "div", classes: ["VideoAccordionBody", "accordion-collapse", "collapse"], parent: this.VideoContainer1, properties: { id: "collapseTwo" }, dataset: { bsParent: "#table-video" } });
		this.VideoAccordionBodyInterior = createNewElement({ type: "div", classes: ["VideoAccordionBodyInterior", "accordion-body", "text-center"], parent: this.VideoAccordionBody, properties: {} });



		this.SearchTableInput.addEventListener("focus", e => { this.in_text_editor = true });
		this.SearchTableInput.addEventListener("blur", e => { this.in_text_editor = false });

		(function () {
			'use strict';

			var TableFilter = (function () {
				var Arr = Array.prototype;
				var input;

				function onInputEvent(e) {
					input = e.target;
					var table1 = document.getElementsByClassName(input.getAttribute('data-table'));
					Arr.forEach.call(table1, function (table) {
						Arr.forEach.call(table.tBodies, function (tbody) {
							Arr.forEach.call(tbody.rows, filter);
						});
					});
				}

				function filter(row) {
					var text = row.textContent.toLowerCase();



					if (row.querySelector(".SegmentTextInput").hasAttribute("data-text_value")) {
						let input_text_value = row.querySelector(".SegmentTextInput").dataset.text_value;
						if (input_text_value != "") {
							text = text + input_text_value.toLowerCase();
							console.log("NEW: " + text);
						}
					}

					// console.log(row);
					var val = input.value.toLowerCase();

					console.log(val);
					row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
				}

				return {
					init: function () {
						var inputs = document.getElementsByClassName('table-filter');
						Arr.forEach.call(inputs, function (input) { input.oninput = onInputEvent; });
					}
				};

			})();

			/*console.log(document.readyState);
			document.addEventListener('readystatechange', function() {
				if (document.readyState === 'complete') {
					console.log(document.readyState);
					TableFilter.init();
				}
			}); */

			TableFilter.init();
		})();


		// Text Formatting Flyout Menu
		// this.TextFormattingMenuContainer = createNewElement({type:"div", classes:["TextFormattingMenuContainer"], parent: this.SegmentEditingContainer , properties:{}, styles:{display: "none"}});
		// this.TextFormattingMenuContainer = createNewElement({type:"div", classes:["TextFormattingMenuContainer"], parent: this.HeaderContainer , properties:{}, styles:{display: "none"}});
	}
	SegmentDecresendoSelectBoxHandler(e) {
		this.segment_decrescendo = e.target.value;
	}
	undo_handler() {
		if (this.save_position > 0) {
			this.undo_now = true;
			this.DataTable.querySelector(".TableBodyTBody").innerHTML = "";
			this.layers = [];
			this.save_position--;
			this.AllLayerContainers.innerHTML = "";

			let copy = JSON.parse(
				JSON.stringify(this.save_array[this.save_position].layer_data)
			);
			this.example_data.layers = copy;

			this.color_count =
				this.save_array[this.save_position].program_data.color_count;
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
	redo_handler() {
		if (this.save_position < (this.save_array.length - 1)) {
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
	save_state() {
		if (this.undo_now === false || this.save_array.length === 0) {
			if (this.example_data.layers.length > 0) {
				// let copy = this.example_data.layers.slice(0);
				let copy = JSON.parse(JSON.stringify(this.example_data.layers));
				// console.log(this.example_data.layers);
				if (this.save_array.length > 0) {
					this.save_position++;
					console.log("save_position increased to: " + this.save_position);
				}

				// if(this.save_position < (this.save_array.length - 1))
				// 	{

				// 	}

				// this.segment_height = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--segment-height'));

				this.slider_thumb_height = parseInt(getComputedStyle(document.documentElement, null).getPropertyValue('--slider_thumb_height'));
				this.slider_thumb_offset = parseInt(getComputedStyle(document.documentElement, null).getPropertyValue('--slider_thumb_offset'));
				this.example_data.piece_info.slider_thumb_height = this.slider_thumb_height;
				this.example_data.piece_info.slider_thumb_offset = this.slider_thumb_offset;

				// console.log("SAVE");
				// this.save_array.forEach(each=>console.log(each.layer_data[0].segments));


				if (this.save_position === this.save_array.length) {
					// console.log(this.save_array);
					this.save_array.push({ program_data: { color_count: this.color_count, layer_id_pos: this.layer_id_pos, slider_thumb_offset: this.slider_thumb_offset, slider_thumb_height: this.slider_thumb_height }, layer_data: copy });
					// console.log(this.save_array);	
				}
				else if (this.save_position < this.save_array.length) {
					console.log(this.save_array);

					this.save_array[this.save_position] = { program_data: { color_count: this.color_count, layer_id_pos: this.layer_id_pos, slider_thumb_offset: this.slider_thumb_offset, slider_thumb_height: this.slider_thumb_height }, layer_data: copy };
					// console.log(this.save_array);
					this.save_array.splice(this.save_position + 1);
					// console.log(this.save_array);
				}
			}

			console.log("SAVE");
			// this.save_array.forEach(each=>console.log(each.program_data));
			// this.save_array.forEach(each=>console.log(each.layer_data[0].segments));							
			// console.log(this.save_array);
		}
	}
	dragging_handler(e) {
		console.log(e.type);
		// e.preventDefault();
		let touch_event = e.type === "touchmove";
		let mouse_event = e.type === "dragover";
		let dragged_element;

		if (touch_event === true) { dragged_element = e.targetTouches[0]; }
		else if (mouse_event === true) { dragged_element = e; }


		if (dragged_element.target.classList.contains("layer_name") === false && dragged_element.target.classList.contains("layer_controls_holder") === false) {
			return false;
		}

		let draggable_id = -1;
		let draggable_index = -1;
		let layer_order = [];
		let layers_not_dragging = [];

		this.layers.forEach((each_layer, layer_index) => {
			if (each_layer.layer_container.classList.contains("dragging")) {
				draggable_id = each_layer.layer_data.layer_id_pos;
				draggable_index = layer_index;
			}
		});

		this.layers.forEach(each => {
			layer_order.push(each.layer_data.layer_id_pos);
			if (each.layer_data.layer_id_pos !== draggable_id) { layers_not_dragging.push(each); }
		});


		// const afterElement = this.get_drag_after_element(layers_not_dragging, e.clientY);

		const afterElement = this.get_drag_after_element(layers_not_dragging, dragged_element.clientY);
		const draggable = this.AllLayerContainers.querySelector(".dragging");
		if (dragged_element.target.classList.contains("layer_name") === false && dragged_element.target.classList.contains("layer_controls_holder") === false) {
			return false;
		}


		if (afterElement === -1) {
			this.AllLayerContainers.insertBefore(draggable, this.AllLayerContainers.firstChild);
			const element = this.example_data.layers.splice(draggable_index, 1)[0];
			this.example_data.layers.splice(0, 0, element);

			const element2 = this.layers.splice(draggable_index, 1)[0];
			this.layers.splice(0, 0, element2);
			console.log("SPLICE 1");
		}
		else {
			const afterElement_id = layers_not_dragging[afterElement].layer_data.layer_id_pos;
			let afterElement_index = -1;
			const element = this.example_data.layers.splice(draggable_index, 1)[0];
			const element2 = this.layers.splice(draggable_index, 1)[0];

			this.example_data.layers.forEach((each_layer, layer_index) => {
				if (each_layer.layer_id_pos === afterElement_id) { afterElement_index = layer_index; }
			});

			this.example_data.layers.splice(afterElement_index + 1, 0, element);
			this.layers.splice(afterElement_index + 1, 0, element2);

			if (afterElement === layers_not_dragging.length - 1) { this.AllLayerContainers.appendChild(draggable); }
			else { this.AllLayerContainers.insertBefore(draggable, layers_not_dragging[afterElement + 1].layer_container); }
		}
	}
	get_drag_after_element(container, y) {
		let layer_y_offset_positions = [];

		container.forEach(each => {
			const box = each.layer_container.getBoundingClientRect();
			let y_offset = y - box.top - box.height / 2;
			layer_y_offset_positions.push(y - box.top - box.height / 2);
		});

		const smallestPositiveIndex = layer_y_offset_positions.reduce((acc, cur, index) => {
			if (cur > 0 && (acc === -1 || cur < layer_y_offset_positions[acc])) { return index; }
			return acc;
		}, -1);

		return smallestPositiveIndex;
	}
	deselect_all_segments() {
		for (let i = 0; i < this.layers.length; i++) {
			for (let j = 0; j < this.layers[i].segment_array.length; j++) {
				this.layers[i].segment_array[j].segment.classList.remove("segment_selected");
				this.layers[i].segment_array[j].TextEditingMenuContainer_SingleSegment.style.display = "none";
			}
		}
		return smallestPositiveIndex;
	}
	deselect_all_segments() {
		for (let i = 0; i < this.layers.length; i++) {
			for (let j = 0; j < this.layers[i].segment_array.length; j++) {
				this.layers[i].segment_array[j].segment.classList.remove(
					"segment_selected"
				);
				this.layers[i].segment_array[
					j
				].TextFormattingMenuContainer_SingleSegment.style.display =
					"none";
			}
		}

		// this.TextFormattingMenuContainer.style.display = "none";
		// this.TextFormattingMenuContainer.style.cursor = "not-allowed";
		[...this.TextFormattingMenuContainer.children].forEach(
			(each) => (each.style.cursor = "not-allowed")
		);
	}
	deselect_all_layers() {
		for (let i = 0; i < this.layers.length; i++) {
			if (
				this.layers[i].layer_controls_holder.classList.contains(
					"layer_selected_controls_holder"
				)
			) {
				this.layers[i].layer_controls_holder.classList.remove(
					"layer_selected_controls_holder"
				);
				this.layers[i].layer_segment_holder.classList.remove(
					"layer_selected_segments_holder"
				);
				this.layers[i].selected = false;
				this.layers[i].select_box.checked = false;
				this.layers[i].segment_array.forEach((each_segment) =>
					each_segment.segment.classList.remove(
						"segments_layer_is_selected"
					)
				);
				this.layers[i].segment_array.forEach((each_segment) =>
					each_segment.segment.classList.add(
						"segments_layer_is_not_selected"
					)
				);
				this.layers[i].layer_settings_button.style.display = "none";
				this.layers[i].layer_settings_container.style.display = "none";
				this.layers[i].texture_selector.style.display = "none";
			}
		}
	}
	hide_all_TextFormattingMenuContainer_SingleSegments() {
		for (let i = 0; i < this.layers.length; i++) {
			for (let j = 0; j < this.layers[i].segment_array.length; j++) {
				this.layers[i].segment_array[
					j
				].TextFormattingMenuContainer_SingleSegment.style.display =
					"none";

				if (ctrl_down === false) {
					this.layers[i].segment_array[j].segment.classList.remove(
						"segment_selected"
					);
				}
			}
		}
	}
	ChangeTextFormat(sent_style) {
		if (
			this.AllLayerContainers.querySelectorAll(".segment_selected")
				.length > 0
		) {
			let single_selection = this.AllLayerContainers.querySelectorAll(".segment_selected").length === 1;
			console.log("NUM Selected:" + this.AllLayerContainers.querySelectorAll(".segment_selected").length);
			let mixed_values = false;

			if (single_selection === false) {
				let first_style = this.AllLayerContainers.querySelectorAll(".segment_selected")[0].querySelector(".segment_text").style[sent_style.style];
				for (let i = 1; i < this.AllLayerContainers.querySelectorAll(".segment_selected").length; i++) {
					let each = this.AllLayerContainers.querySelectorAll(".segment_selected")[i].querySelector(".segment_text").style[sent_style.style];
					if (each !== first_style) {
						mixed_values = true;
						break;
					}
				}

			}

			for (let i = 0; i < this.layers.length; i++) {
				for (let j = 0; j < this.layers[i].segment_array.length; j++) {
					if (this.layers[i].segment_array[j].segment.classList.contains("segment_selected")) {
						if (sent_style.style === "fontSize") {
							if (sent_style.type === "increase") {
								this.layers[i].segment_array[j].segment_text_1.style[sent_style.style] = (parseInt(this.layers[i].segment_array[j].segment_text_1.style[sent_style.style]) + 1) + "px";
								this.layers[i].segment_array[j].data.text[0].styles[sent_style.style] = (parseInt(this.layers[i].segment_array[j].segment_text_1.style[sent_style.style]) + 1) + "px";
							}
							else if (sent_style.type === "decrease") {
								this.layers[i].segment_array[j].segment_text_1.style[sent_style.style] = (parseInt(this.layers[i].segment_array[j].segment_text_1.style[sent_style.style]) - 1) + "px";
								this.layers[i].segment_array[j].data.text[0].styles[sent_style.style] = (parseInt(this.layers[i].segment_array[j].segment_text_1.style[sent_style.style]) - 1) + "px";
							}
						}
						else if (mixed_values === true) {
							this.layers[i].segment_array[j].segment_text_1.style[sent_style.style] = sent_style.value;
							this.layers[i].segment_array[j].data.text[0].styles[sent_style.style] = sent_style.value;
						}
						else if (this.layers[i].segment_array[j].segment_text_1.style[sent_style.style] === sent_style.value) {
							this.layers[i].segment_array[j].segment_text_1.style[sent_style.style] = "unset";
							this.layers[i].segment_array[j].data.text[0].styles[sent_style.style] = "unset";
						}
						else {
							this.layers[i].segment_array[j].segment_text_1.style[sent_style.style] = sent_style.value;
							this.layers[i].segment_array[j].data.text[0].styles[sent_style.style] = sent_style.value;
						}
					}
				}
			}
		}
	}
	presence_slider_toggle_handler() {
		if (this.AllLayerContainers.querySelectorAll(".segment_selected").length > 0) {
			for (let i = 0; i < this.layers.length; i++) {
				for (let j = 0; j < this.layers[i].segment_array.length; j++) {
					if (this.layers[i].segment_array[j].segment.classList.contains("segment_selected")) {
						if (this.layers[i].segment_array[j].data.presence_sync === true) {
							this.layers[i].segment_array[j].data.presence_sync = false;
							this.layers[i].segment_array[j].SegmentPresenceEndRange.disabled = false;
							// this.segment_table_row
						}
						else {
							this.layers[i].segment_array[j].data.presence_sync = true;
							this.layers[i].segment_array[j].SegmentPresenceEndRange.disabled = true;
						}
					}
				}
			}
		}
	}
	zoom_handler(zoom_type) {
		if (zoom_type === 'in') { this.scale = this.scale + 1; }
		else if (zoom_type === 'out') {
			if (this.scale > 1) { this.scale = this.scale - 1; }
		}

		this.example_data.piece_info.scale = this.scale;

		for (let i = 0; i < this.layers.length; i++) {
			for (let j = 0; j < this.layers[i].segment_array.length; j++) {
				this.layers[i].segment_array[j].segment.style.width = ((((this.layers[i].segment_array[j].data.end_pos / this.resolution) - (this.layers[i].segment_array[j].data.start_pos / this.resolution)) * this.scale) + (this.scale / this.resolution) - 1) + "px";
				this.layers[i].segment_array[j].segment.style.left = ((this.layers[i].segment_array[j].data.start_pos / this.resolution) * this.scale) + "px";
			}

			this.layers[i].layer_segment_holder.style.width = ((((this.file_length / this.resolution) * this.scale) - 1) + (this.scale / this.resolution)) + "px";
		}

		this.timestamp_array.forEach((each, index) => {
			// console.log("current: " + each.style.left + " - new: " + (this.time_stamp_distance * this.scale) + "- this.scale:" + this.scale);
			console.log("LEFT: " + ((this.time_stamp_distance * this.scale) * index));
			each.style.left = ((this.time_stamp_distance * index) * this.scale) + "px";
		});

		this.SeekSlider.style.width = ((((this.file_length / this.resolution) * this.scale) - 1) + (this.scale / this.resolution)) + "px";
		this.AllLayerContainers.style.width = ((((this.file_length / this.resolution) * this.scale) - 1) + (this.scale / this.resolution)) + "px";
		this.save_state();
	}
	change_opacity(e, direction) {
		for (let i = 0; i < this.layers.length; i++) {
			for (let j = 0; j < this.layers[i].segment_array.length; j++) {
				if (this.layers[i].segment_array[j].segment.classList.contains("segment_selected")) {

					this.layers[i].segment_array[j].segment.style.filter = "opacity()";
					this.layers[i].segment_array[j].data.styles.filter = "opacity()";

					let new_saturation_value = (e.target.value / GLOBAL_presence_scale).toFixed(1);
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

					[color_value_1, initial_saturation_1, urlText] = this.GetRGBA_Values({ value: initial_value, num: 0 });
					[color_value_2, initial_saturation_2, urlText] = this.GetRGBA_Values({ value: initial_value, num: 1 });


					if (this.PresenceSliderEnd.disabled === true) {
						let new_color_value = color_value_1 + new_saturation_value + ")";
						formated_color_value = "linear-gradient(to right, " + new_color_value + ", " + new_color_value + ")";

						if (this.segment_decrescendo === "gradient") {
							this.layers[i].segment_array[j].data.start_presence = parseInt(e.target.value);
							this.layers[i].segment_array[j].data.end_presence = parseInt(e.target.value);
							this.layers[i].segment_array[j].SegmentPresenceStartRange.value = this.layers[i].segment_array[j].data.start_presence;
							this.layers[i].segment_array[j].SegmentPresenceEndRange.value = this.layers[i].segment_array[j].data.end_presence;
						}
						else if (this.segment_decrescendo === "slope" && new_saturation_value > 0) {
							console.log(new_saturation_value);
							this.layers[i].segment_array[j].segment.style.clipPath = "polygon(0 " + ((1 - new_saturation_value) * 100) + "%, 100% " + ((1 - new_saturation_value) * 100) + "%, 100% 100%, 0 100%)";
							this.layers[i].segment_array[j].data.styles.clipPath = "polygon(0 " + ((1 - new_saturation_value) * 100) + "%, 100% " + ((1 - new_saturation_value) * 100) + "%, 100% 100%, 0 100%)";
						}
					}
					else {
						let starting_color = "";
						let ending_color = "";
						let new_color_value = "";

						if (direction === "start") {
							if (color_value_1.includes("rgba")) {
								ending_color = color_value_2 + initial_saturation_2 + "))";
								new_color_value = color_value_1 + new_saturation_value + ")";
							}
							else if (color_value_1.includes("rgb(")) {
								ending_color = color_value_2 + initial_saturation_2 + "))";
								new_color_value = color_value_1 + new_saturation_value + ")";
							}

							formated_color_value = "linear-gradient(to right, " + new_color_value + ", " + ending_color;

							if (this.segment_decrescendo === "gradient") {
								this.layers[i].segment_array[j].data.start_presence = parseInt(e.target.value);
								this.layers[i].segment_array[j].SegmentPresenceStartRange.value = this.layers[i].segment_array[j].data.start_presence;
							}
							else if (this.segment_decrescendo === "slope") {

								this.layers[i].segment_array[j].segment.style.clipPath = "polygon(0 " + ((1 - new_saturation_value) * 100) + "%, 100% 0, 100% 100%, 0 100%)";
								this.layers[i].segment_array[j].data.styles.clipPath = "polygon(0 " + ((1 - new_saturation_value) * 100) + "%, 100% 0, 100% 100%, 0 100%)";
							}
						}
						else if (direction === "end") {

							if (color_value_1.includes("rgba")) {
								starting_color = color_value_1 + initial_saturation_1 + ")";
								new_color_value = color_value_2 + new_saturation_value + "))";
							}
							else if (color_value_1.includes("rgb(")) {
								starting_color = color_value_1 + initial_saturation_1 + ")";
								new_color_value = color_value_2 + new_saturation_value + "))";
							}

							formated_color_value = "linear-gradient(to right, " + starting_color + ", " + new_color_value;

							if (this.segment_decrescendo === "gradient") {
								this.layers[i].segment_array[j].data.end_presence = parseInt(e.target.value);
								this.layers[i].segment_array[j].SegmentPresenceEndRange.value = this.layers[i].segment_array[j].data.end_presence;
							}
							else if (this.segment_decrescendo === "slope") {
								this.layers[i].segment_array[j].segment.style.clipPath = "polygon(0 0, 100% " + ((1 - new_saturation_value) * 100) + "%, 100% 100%, 0 100%)";
								this.layers[i].segment_array[j].data.styles.clipPath = "polygon(0 0, 100% " + ((1 - new_saturation_value) * 100) + "%, 100% 100%, 0 100%)";
							}
						}
					}


					if (this.segment_decrescendo === "gradient") {
						this.layers[i].segment_array[j].data.color = urlText + formated_color_value;
						this.layers[i].segment_array[j].segment.style.background = urlText + formated_color_value;
						this.layers[i].segment_array[j].data.styles.background = urlText + formated_color_value;
					}
					else if (this.segment_decrescendo === "slope") {

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
	GetRGBA_Values(sent_data) {
		let urlText = "";
		let initial_saturation = "1.0";
		let color_value = sent_data.value.match(/linear-gradient\((.*?)\)\)/)[0];
		let r = "";
		let g = "";
		let b = "";

		if (sent_data.num === 0) {
			color_value = color_value.split("t, ")[1].split("), ")[sent_data.num] + ")"
		}
		else if (sent_data.num === 1) {
			color_value = color_value.split("t, ")[1].split("), ")[sent_data.num];
		}

		if (color_value.includes("rgba")) {
			r = parseInt(color_value.replaceAll(" ", "").split("rgba(")[1].replace("(", "").replace(")", "").split(",")[0]);
			g = parseInt(color_value.replaceAll(" ", "").split("rgba(")[1].replace("(", "").replace(")", "").split(",")[1]);
			b = parseInt(color_value.replaceAll(" ", "").split("rgba(")[1].replace("(", "").replace(")", "").split(",")[2]);
			initial_saturation = parseFloat(color_value.replaceAll(" ", "").split("rgba(")[1].replace("(", "").replace(")", "").split(",")[3]);
			color_value = "rgba(" + r + "," + g + "," + b + ",";
		}
		else if (color_value.includes("rgb(")) {
			r = parseInt(color_value.replaceAll(" ", "").split("rgb")[1].replaceAll("(", "").replaceAll(")", "").split(",")[0]);
			g = parseInt(color_value.replaceAll(" ", "").split("rgb")[1].replaceAll("(", "").replaceAll(")", "").split(",")[1]);
			b = parseInt(color_value.replaceAll(" ", "").split("rgb")[1].replaceAll("(", "").replaceAll(")", "").split(",")[2]);
			color_value = "rgba(" + r + "," + g + "," + b + ",";
		}

		if (sent_data.value.includes("url")) { urlText = sent_data.value.match(/url\((.*?)( center,)/)[0]; }

		return [color_value, initial_saturation, urlText];
	}
	StartYoutubeActivitySetup() {
		this.LoadingSpinner.style.display = "block";
		this.example_data.piece_info.media_type = "youtube";
		this.activity_type = 'youtube_link';
		let youtube_url = 'Paste URL here';

		this.url_prompt_backdrop = createNewElement({ type: "div", classes: ["url_prompt_backdrop"], parent: document.body });
		this.url_prompt_box_container = createNewElement({ type: "div", classes: ["url_prompt_box_container"], parent: document.body });
		this.url_prompt_box_top = createNewElement({ type: "div", classes: ["url_prompt_box_top"], parent: this.url_prompt_box_container, properties: { innerText: "Paste a YouTube URL below" } });
		this.url_prompt_box_middle = createNewElement({ type: "div", classes: ["url_prompt_box_middle"], parent: this.url_prompt_box_container });
		this.url_prompt_input_box = createNewElement({ type: "input", classes: [], parent: this.url_prompt_box_middle, properties: { id: "url_prompt_input_box", innerText: "Paste a YouTube URL below", type: "text", placeholder: "Paste URL here" } });
		this.url_prompt_submit_button = createNewElement({ type: "button", classes: [], parent: this.url_prompt_box_middle, properties: { id: "url_prompt_submit_button", innerText: "Start" } });
		this.url_prompt_cancel_button = createNewElement({ type: "button", classes: ["url_prompt_cancel_button"], parent: this.url_prompt_box_middle, properties: { innerHTML: "✖️" }, events: { click: e => this.url_prompt_cancel_button_handler() } });
		this.url_prompt_box_bottom = createNewElement({ type: "div", classes: ["url_prompt_box_bottom"], parent: this.url_prompt_box_container });

		if (this.load_from_file_mode === true) {
			youtube_url = this.example_data.piece_info.video_id;
			this.loaded_file_name_label = this.example_data.piece_info.video_id;
			setup_youtube_player();
			this.url_prompt_backdrop.style.display = "none";
			this.url_prompt_box_container.style.display = "none";
		}

		if (developing === true) {
			youtube_url = 'https://youtu.be/oIIxlgcuQRU';
			this.example_data.piece_info.video_id = this.youtube_parser(youtube_url);
			this.loaded_file_name_label = this.example_data.piece_info.video_id;
			setup_youtube_player();

			this.url_prompt_backdrop.style.display = "none";
			this.url_prompt_box_container.style.display = "none";
		}

		this.url_prompt_submit_button.addEventListener('click', e => {
			let breakout = false;
			youtube_url = this.url_prompt_input_box.value;

			if (breakout === false) {
				this.example_data.piece_info.video_id = this.youtube_parser(youtube_url);
				console.log("YouTube ID: " + this.example_data.piece_info.video_id);
				if (this.example_data.piece_info.video_id !== false) { breakout = true; }
				else { alert("That URL was invalid. Please enter a valid YouTube URL. You entered: " + youtube_url); }
			}

			if (breakout === true) {
				this.loaded_file_name_label = this.example_data.piece_info.video_id;
				setup_youtube_player();

				this.url_prompt_backdrop.style.display = "none";
				this.url_prompt_box_container.style.display = "none";
			}
		});

		this.url_prompt_input_box.focus();
		this.ActivitySelectionContainer.style.display = "none";
	}
	url_prompt_cancel_button_handler() {
		this.ActivitySelectionContainer.style.display = "grid";
		this.url_prompt_backdrop.remove();
		this.url_prompt_box_container.remove();
		this.LoadingSpinner.style.display = "none";
	}
	cancel_opening_audio_button_handler() {
		this.ActivitySelectionContainer.style.display = "grid";
		this.ActivitySelectionBody.style.display = "block";
		this.LoadingSpinner.style.display = "none";
		this.open_audio_button.style.display = "none";
		this.cancel_opening_audio_button.style.display = "none";
		this.audio_file_prompt_backdrop.remove();
		this.audio_file_prompt_box_container.remove();
	}
	StartAudioFileActivitySetup(sent_url) {
		this.example_data.piece_info.media_type = "audio_file";
		this.activity_type = 'audio_file';


		this.ActivitySelectionBody.style.display = "none";


		this.audio_file_prompt_backdrop = createNewElement({ type: "div", classes: ["audio_file_prompt_backdrop"], parent: document.body });
		this.audio_file_prompt_box_container = createNewElement({ type: "div", classes: ["audio_file_prompt_box_container"], parent: document.body });
		this.audio_file_prompt_box_top = createNewElement({ type: "div", classes: ["audio_file_prompt_box_top"], parent: this.audio_file_prompt_box_container, properties: { innerText: "Choose Audio File" } });
		this.audio_file_prompt_box_middle = createNewElement({ type: "div", classes: ["audio_file_prompt_box_middle"], parent: this.audio_file_prompt_box_container });
		this.open_audio_button = createNewElement({ type: 'input', classes: ["open_audio_button"], parent: this.audio_file_prompt_box_middle, properties: { innerText: "Choose Audio File", type: "file", name: "open_audio_button" }, styles: { display: "block" }, events: { change: () => this.get_user_audio_file('nothing') } });
		this.cancel_opening_audio_button = createNewElement({ type: "button", classes: ["cancel_opening_audio_button"], parent: this.audio_file_prompt_box_middle, properties: { innerHTML: "✖️" }, events: { click: e => this.cancel_opening_audio_button_handler() } });
		this.audio_file_prompt_box_bottom = createNewElement({ type: "div", classes: ["audio_file_prompt_box_bottom"], parent: this.audio_file_prompt_box_container });



		// this.open_file_trigger_button = createNewElement({type: "button", classes: ["InterfaceButton"], parent: document.body, properties: {innerText: "Choose Audio File 2"}, styles:{zIndex: 2}});
		// this.open_file_trigger_button.addEventListener('click', () => this.open_audio_button.click() );
		// this.loaded_file_name_label = createNewElement({type: "div", classes: ["loaded_file_name_label", "InterfaceButton"], parent: document.body, properties: {innerText: "(no audio file loaded)"}});

		if (developing === true && location.hostname.includes("localhost")) {
			this.get_user_audio_file('nothing');
			this.open_audio_button.style.display = "none";
			// this.open_file_trigger_button.display = "none";
		}
		else {
			// this.open_audio_button.click();
		}
	}
	get_user_audio_file(sent_url) {
		this.ActivitySelectionContainer.style.display = "none";
		this.LoadingSpinner.style.display = "none";
		this.open_audio_button.style.display = "none";
		this.cancel_opening_audio_button.style.display = "none";
		this.audio_file_prompt_backdrop.remove();
		this.audio_file_prompt_box_container.remove();


		this.uploaded_audio = createNewElement({ type: "audio", classes: ["user_audio"], parent: this.VideoAccordionBodyInterior, properties: { controls: true } });
		this.uploaded_audio.addEventListener("play", e => { this.audio_play_button.innerHTML = `< i class="bi-pause-circle" ></i > `; });
		this.uploaded_audio.addEventListener("pause", e => { this.audio_play_button.innerHTML = `< i class="bi-play-circle" ></i > `; });
		// this.VideoAccordionBody.appendChild(this.loaded_file_name_label);

		if (developing === true && location.hostname.includes("localhost")) {
			this.uploaded_audio.src = 'Puccini-Vissi_d_arte_vissi_d_amore_Tosca.mp3';
			// this.uploaded_audio.src = 'http://192.168.1.111/bri_former_server_sample/sheep_may_safely_graze.mp3';
		}
		else if (!this.open_audio_button.files.length) { alert('no file selected'); }
		else {
			this.uploaded_audio.src = URL.createObjectURL(this.open_audio_button.files[0]);
			// don't forget to revoke the blobURI when you don't need it
			this.uploaded_audio.onend = function (e) { URL.revokeObjectURL(this.open_audio_button.src); }
			this.open_audio_button.style.display = 'none';
		}

		this.uploaded_audio.addEventListener('loadedmetadata', () => this.uploaded_audio_loadedmetadata_handler());
		this.timeupdater = setInterval((e) => this.move_seek_slider_with_audio_position('ticking_audio'), 10);
		// originally 1000
		// if this is the initial file load - save the state to local storage

	}
	uploaded_audio_loadedmetadata_handler() {
		// this.file_length = parseInt(this.uploaded_audio.duration * this.scale);

		// this.file_length = parseInt(this.uploaded_audio.duration);
		this.file_length = parseInt(this.uploaded_audio.duration) * this.resolution;

		// this.open_file_trigger_button.style.display = 'none';

		// if(developing === true && location.hostname.includes("localhost"))
		// 	{ this.loaded_file_name_label.innerText = this.uploaded_audio.src; }
		// else
		// 	{ this.loaded_file_name_label.innerText = this.open_audio_button.files[0].name; }

		this.start_program_after_media_loaded();
	}
	timestamp_lines() {
		this.timestamp_container = createNewElement({ type: "div", classes: ["timestamp_container"], parent: this.AllLayerContainers, properties: {} });
		this.timestamp_array = [];


		for (let i = 0; i < (parseInt(parseInt((this.file_length / this.resolution) / this.time_stamp_distance)) + 1); i++) {

			let text = String(parseInt(((this.time_stamp_distance * i) / 60))).padStart(1, "0") + ":" + String(parseInt(((this.time_stamp_distance * i) % 60))).padStart(2, "0");
			let timestamp_outer_div = createNewElement({ type: "div", classes: ["timestamp_outer_div"], parent: this.timestamp_container, properties: {}, styles: { left: ((this.time_stamp_distance * this.scale) * i) + "px" } });
			let timestamp_line = createNewElement({ type: "div", classes: ["timestamp_line"], parent: timestamp_outer_div, properties: {} });
			let timestamp_text = createNewElement({ type: "div", classes: ["timestamp_text"], parent: timestamp_outer_div, properties: { innerText: text } });
			this.timestamp_array.push(timestamp_outer_div);
		}
	}
	play_button_handler() {
		switch (this.activity_type) {
			case 'audio_file':
				if (!this.uploaded_audio.paused) {
					//Its playing...do your job
					console.log("playing!");
					this.pause_audio();
					this.audio_play_button.innerHTML = `< i class="bi-play-circle" ></i > `;
				}
				else {
					console.log('not playing');
					//Not playing...maybe paused, stopped or never played.
					this.play_audio();
					this.audio_play_button.innerHTML = `< i class="bi-pause-circle" ></i > `;
				}
				break;
			case 'youtube_link':
				if (youtube_player_state != YT.PlayerState.PAUSED) {
					playerx.g.classList.remove("small_youtube_video_for_iframes");
					playerx.pauseVideo();
					this.audio_play_button.innerHTML = `< i class="bi-play-circle" ></i > `;
				}
				else {
					playerx.g.classList.remove("small_youtube_video_for_iframes");
					playerx.playVideo();
					this.audio_play_button.innerHTML = `< i class="bi-pause-circle" ></i > `;
				}

				break;
			default:
				//default option here
				console.log('the default option has been reached in the switch statement');
		}
	}
	play_audio() {
		switch (this.activity_type) {
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
	pause_audio() {
		switch (this.activity_type) {
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
	youtube_parser(url) {
		var i, r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

		r = url.match(rx);

		if (r === null) { return false; }
		else { return r[1]; }
	}
	check_for_url_data() {
		let sPageURL = window.location.search.substring(1);
		if (sPageURL == "") return false;
		let sURLVariables = sPageURL.split('&');

		let sParameterName = sURLVariables[0].split('=');
		if (sParameterName[0] == 'load') {
			this.url_activity_text = sParameterName[1];
		}
	}
	setup_youtube_file_info() {
		this.LoadingSpinner.remove();
		// this.file_length = parseInt(playerx.getDuration() * this.scale);
		this.file_length = parseInt(playerx.getDuration()) * this.resolution;
		this.start_program_after_media_loaded();
		this.timeupdater = setInterval((e) => this.move_seek_slider_with_audio_position('ticking_youtube'), 10);
	}
	start_program_after_media_loaded() {
		this.timestamp_lines();
		this.AllLayerContainers.style.width = ((((this.file_length / this.resolution) * this.scale) - 1) + (this.scale / this.resolution)) + "px";


		this.LoadingSpinner.remove();
		this.undo_now = true;

		let random_color = "rgba(" + this.colors[this.color_count] + ",1.0)";

		this.SeekSlider.max = this.file_length * this.audio_speed;
		this.SeekSlider.value = 0;
		let width = ((((this.file_length / this.resolution) * this.scale) - 1) + (this.scale / this.resolution)) + "px";
		this.SeekSlider.style.width = width;
		// this.SeekSlider.style.width = ((this.file_length/this.resolution) / this.length_padding) * this.scale + "px";
		this.SeekSlider.style.display = 'block';

		if (this.example_data.layers.length === 0) {
			this.color_count = (this.color_count + 1) % this.colors.length;
			this.example_data.piece_info.color_count = this.color_count;

			let initial_layer_data =
				{ name: "Layer " + (this.example_data.piece_info.layer_id_pos + 1), color: "linear-gradient(to right, " + random_color + ", " + random_color + ")", segments: [], markers: [], layer_id_pos: 0 }

			this.example_data.layers.push(initial_layer_data);
			this.layers.push(new Layer(this.AllLayerContainers, initial_layer_data, this.file_length, this, "new_layer"));
			this.layers[0].name.click()
		}
		else {
			this.example_data.layers.forEach((each, index) => this.layers.push(new Layer(this.AllLayerContainers, each, this.file_length, this, "load_existing_layer")));
			// console.log(this.example_data.layers);
		}


		this.save_array[this.save_position].program_data.slider_thumb_height = this.slider_thumb_height;
		this.save_array[this.save_position].program_data.slider_thumb_offset = this.slider_thumb_offset;
		this.save_array.forEach(each => console.log(each.program_data));

		this.undo_now = false;


		let segment_margin_bottom = parseInt(getComputedStyle(document.documentElement, null).getPropertyValue('--segment-margin-bottom'));
		document.documentElement.style.setProperty('--slider_thumb_height', ((this.segment_height + segment_margin_bottom) * this.layers.length) + 70 + "px");
		document.documentElement.style.setProperty('--slider_thumb_offset', (((((this.segment_height + segment_margin_bottom) / 2) * this.layers.length) + 25) * -1) + "px");
	}
	seek_slider_moved_handler(e) {
		// this.slider_position = e.target.value / 10;
		this.slider_position = parseInt((e.target.value / this.resolution) / this.audio_speed);

		switch (this.activity_type) {
			case 'audio_file':
				// this.uploaded_audio.currentTime = this.slider_position / this.scale;
				this.uploaded_audio.currentTime = this.slider_position;

				if (this.uploaded_audio.paused) {
					//not sure why this is necessary but on iOS Safari, 
					//the currentTime changes aren't affecting the play point without this

					// Show loading animation.
					let playPromise = this.uploaded_audio.play();

					if (playPromise !== undefined) {
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
	move_seek_slider_with_audio_position(sender, youtube_player_state) {
		// console.log("move");
		// console.log(parseInt(this.uploaded_audio.currentTime * 10));

		switch (this.activity_type) {
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
				if (lastActiveElement !== current_active_element) {
					if (current_active_element.id === "player") { document.getElementById("player").style.boxShadow = "0 0 10px crimson"; }
					else { document.getElementById("player").style.boxShadow = "0 0 10px black"; }
					lastActiveElement = document.activeElement;
				}

				// console.log(youtube_player_state);
				if (typeof youtube_player_state !== "undefined") {
					if (youtube_player_state === 2) {
						console.log("PAUSED");
						this.audio_play_button.innerHTML = `< i class="bi-play-circle" ></i > `;
					}
					else if (youtube_player_state === 1) {
						console.log("PLAYING");
						this.audio_play_button.innerHTML = `< i class="bi-pause-circle" ></i > `;
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
	add_layer_handler() {
		this.layer_id_pos++;

		this.example_data.piece_info.layer_id_pos = this.layer_id_pos;

		let random_color = "rgba(" + this.colors[this.color_count] + ",1.0)";

		this.color_count = (this.color_count + 1) % this.colors.length;
		// console.log("COLOR COUNT: " + this.color_count);
		this.example_data.piece_info.color_count = this.color_count;

		let new_initial_layer_data =
			{ name: "Layer " + (this.example_data.piece_info.layer_id_pos + 1), color: "linear-gradient(to right, " + random_color + ", " + random_color + ")", segments: [], markers: [], layer_id_pos: this.layer_id_pos }

		this.example_data.layers.push(new_initial_layer_data);
		this.layers.push(new Layer(this.AllLayerContainers, new_initial_layer_data, this.file_length, this, "new_layer"));

		this.deselect_all_layers();
		this.deselect_all_segments();

		this.layers[this.layers.length - 1].select_box.click();
		this.layers[this.layers.length - 1].segment_array[0].segment_text_1.click();

		// this.segment_height = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--segment-height'));
		// let segment_margin_top = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--segment-margin-top'));
		let segment_margin_bottom = parseInt(getComputedStyle(document.documentElement, null).getPropertyValue('--segment-margin-bottom'));
		// this.slider_thumb_offset = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--slider_thumb_offset'));

		document.documentElement.style.setProperty('--slider_thumb_height', ((this.segment_height + segment_margin_bottom) * this.layers.length) + 70 + "px");
		document.documentElement.style.setProperty('--slider_thumb_offset', (((((this.segment_height + segment_margin_bottom) / 2) * this.layers.length) + 25) * -1) + "px");

		this.slider_thumb_height = parseInt(getComputedStyle(document.documentElement, null).getPropertyValue('--slider_thumb_height'));
		this.slider_thumb_offset = parseInt(getComputedStyle(document.documentElement, null).getPropertyValue('--slider_thumb_offset'));
		this.example_data.piece_info.slider_thumb_height = this.slider_thumb_height;
		this.example_data.piece_info.slider_thumb_offset = this.slider_thumb_offset;

		this.save_array[this.save_position].program_data.slider_thumb_height = this.slider_thumb_height;
		this.save_array[this.save_position].program_data.slider_thumb_offset = this.slider_thumb_offset;

		// this.timestamp_array.forEach(each=>each.)

		// this.save_array.forEach(each=>console.log(each.program_data));

		// select new layer
		// this.select_box.click();

	}
	delete_layer(sent_layer_id) {
		let layer_id_pos = sent_layer_id;
		let layer_index = -1;
		this.example_data.layers.forEach((each, index) => {
			if (each.layer_id_pos === layer_id_pos) {
				layer_index = index;
			}
		});

		this.example_data.layers.splice(layer_index, 1);
		this.layers[layer_index].layer_container.remove();
		this.layers.splice(layer_index, 1);
		this.save_state();
	}
	split_selected_segment() {
		// let start = this.slider_position * this.scale;
		let start = (this.slider_position / this.resolution);
		let presence_sync = true;
		let num_of_selected_layers = 0;

		console.log("START: " + start);

		this.layers.forEach(each_layer => {
			if (each_layer.selected === true) {
				num_of_selected_layers++
				// this.slider_position / this.scale
				each_layer.create_segment(start, -1, GLOBAL_presence_scale, GLOBAL_presence_scale, presence_sync);
			}
		});
		// this.save_state();
		if (num_of_selected_layers === 0) {
			alert("Select a layer or segment first before splitting")
		}
	}
	merge_segments(e, direction) {
		let left_position_to_search_for = -1;
		let width_to_add_to_merging_segment = -1;

		for (let i = 0; i < this.layers.length; i++) {
			for (let j = 0; j < this.layers[i].segment_array.length; j++) {
				let each_segment = this.layers[i].segment_array[j];

				if (direction === "left") { left_position_to_search_for = this.layers[i].layer_data.segments[j].start_pos; }
				else if (direction === "right") { left_position_to_search_for = this.layers[i].layer_data.segments[j].end_pos; }

				width_to_add_to_merging_segment = this.layers[i].layer_data.segments[j].end_pos - this.layers[i].layer_data.segments[j].start_pos;

				if (each_segment.segment.classList.contains("segment_selected")) {
					if (this.layers[i].layer_data.segments[j].start_pos === 0 && this.layers[i].layer_data.segments[j].end_pos === this.file_length) {
						alert("Layers must have at least 1 segment. You can't delete this one.");
						return false;
					}
					else if (direction === "left" && this.layers[i].layer_data.segments[j].start_pos === 0) {
						alert("There is no layer to the left of this one to merge with.");
						return false;
					}
					else if (direction === "right" && this.layers[i].layer_data.segments[j].end_pos === this.file_length) {
						alert("There is no layer to the right of this one to merge with.");
						return false;
					}

					delete this.layers[i].segment_array[j].data;
					this.layers[i].segment_array[j].segment.remove();
					this.layers[i].segment_array.splice(j, 1);
					this.layers[i].layer_data.segments.splice(j, 1);

					for (let k = 0; k < this.layers[i].segment_array.length; k++) {
						let proceed_with_deletion = false;
						let width_new = -1;

						if (direction === "left") {
							if (this.layers[i].layer_data.segments[k].end_pos === (left_position_to_search_for - 1)) {
								proceed_with_deletion = true;
								// width_new = ((this.layers[i].layer_data.segments[k].end_pos - this.layers[i].layer_data.segments[k].start_pos) + width_to_add_to_merging_segment)/this.resolution + 1;
								width_new = ((this.layers[i].layer_data.segments[k].end_pos - this.layers[i].layer_data.segments[k].start_pos) + width_to_add_to_merging_segment) / this.resolution;
							}
						}
						else if (direction === "right") {
							if (this.layers[i].layer_data.segments[k].start_pos === (left_position_to_search_for + 1)) {
								proceed_with_deletion = true;
								// width_new = ((this.layers[i].layer_data.segments[k].end_pos - this.layers[i].layer_data.segments[k].start_pos) + width_to_add_to_merging_segment)/this.resolution + 1;
								width_new = ((this.layers[i].layer_data.segments[k].end_pos - this.layers[i].layer_data.segments[k].start_pos) + width_to_add_to_merging_segment) / this.resolution;
							}
						}

						if (proceed_with_deletion === true) {
							this.layers[i].segment_array[k].segment.animate(
								[  // keyframes
									{ width: this.layers[i].segment_array[k].segment.style.width },
									{ width: (width_new * this.scale) + "px" }
								],
								{ duration: 500, iterations: 1 });

							this.layers[i].segment_array[k].segment.style.width = (width_new * this.scale) + "px";

							if (direction === "left") {
								this.layers[i].layer_data.segments[k].end_pos = this.layers[i].layer_data.segments[k].end_pos + width_to_add_to_merging_segment + 1;
							}
							else if (direction === "right") {

								this.layers[i].layer_data.segments[k].start_pos = this.layers[i].layer_data.segments[k].start_pos - width_to_add_to_merging_segment - 1;
								this.layers[i].segment_array[k].segment.style.left = ((this.layers[i].layer_data.segments[k].start_pos) / this.resolution) * this.scale + "px";
							}


							this.layers[i].segment_array[k].segment_text_1.click();
						}
					}
				}
			}
		}
		this.save_state();
	}
	delete_button_handler(e) {

		for (let i = 0; i < this.layers.length; i++) {
			for (let j = 0; j < this.layers[i].segment_array.length; j++) {
				if (this.layers[i].segment_array[j].segment.classList.contains("segment_selected")) {

					// let new_saturation_value = (e.target.value/GLOBAL_presence_scale).toFixed(1);
					let formated_color_value;
					let urlText = "";
					let initial_value = this.layers[i].segment_array[j].data.color;
					let color_value_1 = "";
					let color_value_2 = "";
					let initial_saturation_1 = "1.0";
					let initial_saturation_2 = "1.0";

					[color_value_1, initial_saturation_1, urlText] = this.GetRGBA_Values({ value: initial_value, num: 0 });
					[color_value_2, initial_saturation_2, urlText] = this.GetRGBA_Values({ value: initial_value, num: 1 });

					formated_color_value = "linear-gradient(to right, " + (color_value_1 + "0.0), ") + (color_value_2 + "0.0))");

					this.layers[i].segment_array[j].data.start_presence = 0;
					this.layers[i].segment_array[j].data.end_presence = 0;

					this.layers[i].segment_array[j].SegmentPresenceStartRange.value = 0;
					this.layers[i].segment_array[j].SegmentPresenceEndRange.value = 0;

					this.layers[i].segment_array[j].data.color = urlText + formated_color_value
					this.layers[i].segment_array[j].segment.style.background = urlText + formated_color_value;
					this.layers[i].segment_array[j].data.styles.background = urlText + formated_color_value;


					// this.layers[i].segment_array[j].segment.classList.add("segment_deleted");
					// this.layers[i].segment_array[j].data.classes.push("segment_deleted");

					// this.layers[i].segment_array[j].segment.style.filter = "opacity(0)";
					// this.layers[i].segment_array[j].data.styles.filter = "opacity(0)";

					this.layers[i].segment_array[j].segment.style.backgroundImage = "none";
					this.layers[i].segment_array[j].data.styles.backgroundImage = "none";

				}
			}
		}
		this.save_state();
	}
	add_marker() {
		alert("I don't do anything!");
		// this.save_state();
	}
	save_to_file() {
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
	RequestFileFromUser(event) {
		// IMPORT - Read from File
		const input = event.target;

		if ('files' in input && input.files.length > 0) {
			return readFileContent(input.files[0])
				.then(data_from_file => this.load_from_file(JSON.parse(data_from_file)))
				.catch(error => console.log(error)
				);
		}

		function readFileContent(file) {
			const reader = new FileReader();
			return new Promise((resolve, reject) => {
				reader.onload = event => resolve(event.target.result);
				reader.onerror = error => reject(error);
				reader.readAsText(file);
			});
		}
	}
	load_from_file(data) {
		// this.example_data = JSON.parse(data);
		this.example_data = data;
		this.scale = this.example_data.piece_info.scale;
		this.layer_id_pos = this.example_data.piece_info.layer_id_pos;
		this.color_count = this.example_data.piece_info.color_count;
		this.segment_decrescendo = this.example_data.piece_info.segment_decrescendo;
		this.load_from_file_mode = true;

		if (this.example_data.piece_info.media_type === "youtube") {
			this.StartYoutubeActivitySetup()
		}
		else if (this.example_data.piece_info.media_type === "audio_file") {
			this.StartAudioFileActivitySetup()
		}
	}
}

project = new Auralayer();

// function createNewElement(type, classes, parent, props)
function createNewElement(data) {
	const new_element = document.createElement(data.type);
	data.classes.forEach(each => new_element.classList.add(each));

	for (const key in data.styles) {
		if (key === "width" && data.classes.includes("segment")) {
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

	for (const key in data.properties) {
		if (key === "ariaControls") { new_element.setAttribute('aria-controls', data.properties[key]); }
		else { new_element[key] = data.properties[key]; }
	}

	for (const key in data.dataset) { new_element.dataset[key] = data.dataset[key]; }

	for (const key in data.attributes) { new_element.setAttribute(key, data.attributes[key]); }

	for (const key in data.events) { new_element.addEventListener(key, data.events[key]); }

	data.parent.appendChild(new_element);

	return new_element;
}

// eventually, start by loading a pre-existing json file
// or construct a new object with a single layer to start with

// YOUTUBE STUFF

function setup_youtube_player() {
	let tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	let firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}


function download_image() {
	const scriptPromise = new Promise((resolve, reject) => {
		const script = document.createElement('script');
		document.body.appendChild(script);
		script.onload = resolve;
		script.onerror = reject;
		script.async = true;
		script.src = 'scripts/html2canvas.min.js';
	});

	scriptPromise.then(() => {

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

		for (let each of all_shapes) { if (each.getBoundingClientRect().right > right_most) { right_most = each.getBoundingClientRect().right; } }

		if (right_most > element_to_image.scrollWidth) {
			right_most = element_to_image.scrollWidth;
		}
		else {
			right_most = right_most + 20;
		}

		html2canvas(element_to_image,
			{
				scale: 1,
				backgroundColor: null,
				windowWidth: right_most,
				windowHeight: element_to_image.scrollHeight
			}).then(function (canvas) {
				project.SeekSlider.style.display = "block";
				saveAs(canvas.toDataURL(), 'auralayer-diagram.png');
			});
	});
}


function saveAs(uri, filename) {
	var link = document.createElement('a');

	if (typeof link.download === 'string') {
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
	else { window.open(uri); }
}

// if this script was in the HTML file "function onYouTubeIframeAPIReady()" would work, but since it's not
// "window.onYouTubeIframeAPIReady = function()" has to be used instead
// function onYouTubeIframeAPIReady()
window.onYouTubeIframeAPIReady = function () {
	let youtube_player = document.createElement('div');
	youtube_player.id = 'player';

	// document.body.appendChild(youtube_player);
	project.VideoAccordionBodyInterior.appendChild(youtube_player);

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
function onPlayerReady(event) {
	console.log('onPlayerReady called');
	if (event.target.playerInfo.duration === 0) {
		console.log("The YouTube video has a duration of 0 which means there was a problem. The interface will not be loaded in instances like these.");
	}
	else {
		project.setup_youtube_file_info();
	}
}
function onPlayerStateChange(event) {
	youtube_player_state = event.data;
	console.log(event.data);
	project.move_seek_slider_with_audio_position('youtube_statechange', youtube_player_state);

	if (project.iframe_embed === true) {
		playerx.g.classList.remove("small_youtube_video_for_iframes");
	}
} 