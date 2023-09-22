let developing = false;
let youtube_player_state = -2;
let GLOBAL_length_padding = 1;
let project;
let playerx;
let lastActiveElement = document.activeElement;
let example_data = 
    {
			piece_info:
				{
					media_type: "youtube",
					name: "new_auralayer",
					video_id: "sVx1mJDeUjY"
				},
      layers: 
      [
        {
          name: "drums",
          color: "blue",
          segments:
          [
            {
              start_pos: 0,
              end_pos:10,
              start_presence: 50,
              end_presence: 100
            },
            {
              start_pos: 11,
              end_pos:50,
              start_presence: 50,
              end_presence: 100
            },
          ],
        markers:[]
        },
        {
          name: "piano",
          color: "black",
          segments:[],
          markers:[]          
        },
        {
          name: "synth1",
          color: "yellow",
          segments:[],
          markers:[]          
        },
        {
          name: "voice",
          color: "crimson",
          segments:[],
          markers:[]          
        }
      ]
    }

class Layer
  {
    constructor(sent_container, sent_layer_data, sent_file_length)
      {
        this.parent_container = sent_container;
        this.layer_data = sent_layer_data;
				this.parent_file_length = sent_file_length;
				this.selected = false;
				this.segment_array = [];
        this.initialize();
      }
    initialize()
      {
        this.layer_container = createNewElement({type:"div", classes: ["layer_container"], parent: this.parent_container});
        this.layer_controls_holder = createNewElement({type:"div", classes: ["layer_controls_holder"], parent: this.layer_container});
        this.layer_segment_holder = createNewElement({type:"div", classes: ["layer_segment_holder"], parent: this.layer_container, styles:{width: this.parent_file_length + "px"}});
				this.select_box = createNewElement({type:"input", classes: ["layer_select"], parent: this.layer_controls_holder, properties: {type: "checkbox"}});
        this.grip = createNewElement({type:"div", classes: ["layer_grip"], parent: this.layer_controls_holder, properties: {innerHTML: "Grip"}});
        this.name = createNewElement({type:"div", classes: ["layer_name"], parent: this.layer_controls_holder, properties: {innerHTML: this.layer_data.name}});

				this.select_box.addEventListener("change", e => this.select_changed(e));
				this.create_segment(0);
      }
		select_changed(e)
			{
				if(e.target.checked === true)
					{
						this.layer_controls_holder.classList.add("layer_selected_controls_holder");
						this.layer_segment_holder.classList.add("layer_selected_segments_holder");
						this.selected = true;
					}
				else if(e.target.checked === false)
					{
						this.layer_controls_holder.classList.remove("layer_selected_controls_holder");
						this.layer_segment_holder.classList.remove("layer_selected_segments_holder");
						this.selected = false;
					}
			}
		split_segment()
			{

			}
		create_segment(start)
			{
				this.current_segment_index = 0;
				this.current_position = start;

				// if not the first segment, find the current segment
				if(this.segment_array.length > 0)
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
					}

				let new_width = this.layer_data.segments[this.current_segment_index].end_pos - this.current_position;
				let old_width = this.layer_data.segments[this.current_segment_index].end_pos - this.layer_data.segments[this.current_segment_index].start_pos;
				let updated_width = old_width - new_width;
				let random_color = '#'+Math.floor(Math.random()*16777215).toString(16);
				let new_segment = createNewElement({type:"div", classes: ["segment"], parent: this.layer_segment_holder, styles:
						{
							left: this.current_position + "px",
							width:  new_width + "px",
							backgroundColor: random_color
						}					
					});

				new_segment.addEventListener("click",e=>
					{
						e.target.classList.toggle("segment_selected");
					})

				if(this.segment_array.length > 0)
					{
						this.layer_data.segments[this.current_segment_index].end_pos = this.current_position -1 ;
						
						this.segment_array[this.current_segment_index].style.width = updated_width + "px";
					}
				
				this.segment_array.push(new_segment);
				if(this.segment_array.length > 1)
					{
						this.layer_data.segments.push(
							{ start_pos: this.current_position, end_pos: old_width, start_presence: 50, end_presence: 100 });
					}
			}
		delete_segment()
			{

			}
  }
class Auralayer
  {
    constructor()
      {
				this.url_activity_text;
				this.layers = [];
				this.example_data = {};
				this.scale = 5;
				this.length_padding = GLOBAL_length_padding;
				// this.initial_layer_data =
				// 	{
				// 		name: "Layer",
				// 		color: "cornflowerblue",
				// 		segments:
				// 			[ { start_pos: 0, end_pos:this.file_length, start_presence: 50, end_presence: 100 }],
				// 		markers:[]
				// 	}

				this.check_for_url_data();				
        this.initialize_interface();
				this.activity_type_setup();
      }
    initialize_interface()
      {
        this.auralayer_program = createNewElement({type:"div", classes: ["auralayer_program"], parent: document.body});

        this.header = createNewElement({type:"div", classes: ["header_al"], parent: this.auralayer_program});
        this.body = createNewElement({type:"div", classes: ["body_al"], parent: this.auralayer_program});
        this.footer = createNewElement({type:"div", classes: ["footer_al"], parent: this.auralayer_program});

        this.left_outer_column = createNewElement({type:"div", classes: ["left_outer_column"], parent: this.auralayer_program});
				this.add_layer_button = createNewElement({type:"button", classes: ["add_layer_button"], parent: this.left_outer_column, properties: {innerText: "+ Add Layer"}});
				this.add_layer_button.addEventListener("click", e=>this.add_layer_handler());
        this.right_outer_column = createNewElement({type:"div", classes: ["right_outer_column"], parent: this.auralayer_program});

        this.all_layer_containers = createNewElement({type:"div", classes: ["all_layer_containers"], parent: this.body});
        this.editing_container = createNewElement({type:"div", classes: ["editing_container_al"], parent: this.body});
				this.split_button = createNewElement({type:"button", classes: ["split_button"], parent: this.editing_container, properties: {innerText: "Split"}});
				this.split_button.addEventListener('click', e=>this.split_selected_segment(e));

				this.add_marker_button = createNewElement({type:"button", classes: ["add_marker_button"], parent: this.editing_container, properties: {innerText: "Add Marker"}});
				this.add_marker_button.addEventListener('click', e=>this.add_marker(e));
      }
		activity_type_setup()
			{
				// -----------------------------------
				//      Detect Auralayer Activity Type
				// -----------------------------------
				
				switch (this.url_activity_text)
					{
						case 'new_from_audio_file':
							this.activity_type = 'audio_file';
							
							// show audio upload elements
							this.open_audio_container.appendChild(this.open_file_trigger_button);
							this.open_audio_container.appendChild(this.loaded_file_name_label);

							break;
						case 'new_from_youtube_link':
							this.activity_type = 'youtube_link';
							let youtube_url = 'Paste URL here';

							this.example_data =
							{
								piece_info:
									{
										media_type: "youtube",
										name: "new_auralayer"
									},
								layers: []
							}

							const url_prompt_backdrop = createNewElement({type: "div", classes: ["url_prompt_backdrop"], parent: document.body});
							const url_prompt_box_container = createNewElement({type: "div", classes: ["url_prompt_box_container"], parent: document.body});
							const url_prompt_box_top = createNewElement({type: "div", classes: ["url_prompt_box_top"], parent: url_prompt_box_container, properties:{innerText : "Paste a YouTube URL below"}});
							const url_prompt_box_middle = createNewElement({type: "div", classes: ["url_prompt_box_middle"], parent: url_prompt_box_container});
							const url_prompt_input_box = createNewElement({type: "input", classes: [], parent: url_prompt_box_middle,  properties: { id: "url_prompt_input_box", innerText : "Paste a YouTube URL below", type : "text", placeholder: "Paste URL here" }});
							const url_prompt_submit_button = createNewElement({type: "button", classes: [], parent: url_prompt_box_middle,  properties: { id: "url_prompt_submit_button", innerText : "Start" }});
							const url_prompt_box_bottom = createNewElement({type: "div", classes: ["url_prompt_box_bottom"], parent: url_prompt_box_container});

							if (developing === true) 
								{
									youtube_url = 'https://youtu.be/sVx1mJDeUjY';
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
												{
													breakout = true;
												}
											else{alert("That URL was invalid. Please enter a valid YouTube URL. You entered: " + youtube_url);}
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
							
							break;
						case 'open_from_auralayer_file':
							break;
						case 'open_from_web_link_youtube':
							// this where the load from file mechanism needs to be
							this.activity_type = 'youtube_link';
							this.example_data = example_data;
							this.loaded_file_name_label = this.example_data.piece_info.video_id;
							setup_youtube_player();
							break;
						case 'open_from_web_link_audio_file':
							this.activity_type = "audio_file";
							// show audio upload elements
							// this.open_audio_container.appendChild(this.open_file_trigger_button);
							// this.open_audio_container.appendChild(this.loaded_file_name_label);                                    
							break;                                    
						case 'open_from_web_link_audio_file2':
							// Allow for audio files to be referenced by URL for Brian Only.
							if(this.host == 'localhost')
								{
									// document.documentElement.style.setProperty("--primary-color-1", window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color-15'));
									// document.documentElement.style.setProperty("--primary-color-2", window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color-15'));
									
									// this.activity_type = "audio_file";
									// this.tab_save.appendChild(document.createElement('hr'));

									// this.load_local_audio_file_label = document.createElement('label');
									// this.load_local_audio_file_label.innerText = 'Paste URL of Audio File: ';
									// this.tab_save.appendChild(this.load_local_audio_file_label);

									// this.load_local_audio_file_input = document.createElement('input');
									// this.load_local_audio_file_input.type = 'text';
									// this.load_local_audio_file_input.id = 'load_local_audio_file_input';
									// this.load_local_audio_file_input.name = 'load_local_audio_file_input';
									// this.tab_save.appendChild(this.load_local_audio_file_input);

									// this.load_local_audio_file_submit = document.createElement('button');
									// this.load_local_audio_file_submit.innerText = "Submit";
									// this.load_local_audio_file_submit.addEventListener('click',e=> 
									// 	{ 
									// 		this.open_audio_container.appendChild(this.loaded_file_name_label);
									// 		this.get_user_audio_file(this.load_local_audio_file_input.value); 
									// 	});
									// this.tab_save.appendChild(this.load_local_audio_file_submit);
								}                                    
							break;
						case 'load_from_web_link_audio_file':
							// Load audio files automatically with a specific URL for Brian Only.
									
							if(this.host == 'localhost')
								{
									this.activity_type = "audio_file";
									document.documentElement.style.setProperty("--primary-color-1", window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color-14'));
									document.documentElement.style.setProperty("--primary-color-2", window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color-14'));
								}
							else
								{
									this.activity_type = "audio_file";
								}                                  
							break;                                     
						default:
							//default option here
							alert('Please visit the main Auralayer page to start or open a project' + " " + this.url_activity_text);
					}
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
				
				this.initial_layer_data =
					{
						name: "Layer",
						color: "cornflowerblue",
						segments:
							[ { start_pos: 0, end_pos:this.file_length, start_presence: 50, end_presence: 100 }],
						markers:[]
					}				

				if (this.example_data.layers.length === 0)
					{
						this.example_data.layers.push( this.initial_layer_data );
					}
				
				this.example_data.layers.forEach((each,index)=> this.layers.push(new Layer(this.all_layer_containers, each, this.file_length)) );
				
				this.slider_container = createNewElement({type: "div", classes: ["slider_container"], parent: this.body});
				this.seek_slider = createNewElement({type: "input", classes: ["slider", "seek_slider" ], parent: this.slider_container, properties:{type: "range" }});
				this.seek_slider.addEventListener("input", (e) => this.seek_slider_moved_handler(e));		
				
				this.seek_slider.max = this.file_length;
				this.seek_slider.value = 0;

				this.seek_slider.style.width = this.file_length / this.length_padding + "px";
				this.seek_slider.style.display = 'block';
				
				this.timeupdater = setInterval((e) =>  this.move_seek_slider_with_audio_position('ticking_youtube') , 10);				
			}
		seek_slider_moved_handler(e)
			{
				this.slider_position = e.target.value;
				
				switch (this.activity_type)
					{
						case 'audio_file':
							this.uploaded_audio.currentTime = this.slider_position / this.scale;
							
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
							playerx.seekTo(this.slider_position / this.scale);
							break;
						default:
							//default option here
							console.log('the default option has been reached in the switch statement');
					}                    
				// this.uploaded_audio.currentTime = this.slider_position / this.scale;
			}
		move_seek_slider_with_audio_position(sender)
			{
				switch (this.activity_type)
					{
						case 'audio_file':
							this.slider_position = parseInt(this.uploaded_audio.currentTime * this.scale);
							break;
						case 'youtube_link':
							this.slider_position = parseInt(playerx.getCurrentTime() * this.scale);
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
				
				this.seek_slider.value = this.slider_position;				
				
				let current_time;
				current_time = parseFloat( (this.slider_position / this.length_padding).toFixed(2)) ;
			}
		add_layer_handler()
			{
				let new_initial_layer_data =
				{
					name: "Layer",
					color: "cornflowerblue",
					segments:
						[ { start_pos: 0, end_pos:this.file_length, start_presence: 50, end_presence: 100 }],
					markers:[]
				}		
				this.layers.push(new Layer(this.all_layer_containers, new_initial_layer_data, this.file_length));
			}
		split_selected_segment()
			{
				
				let start = this.slider_position;
				this.layers.forEach(each_layer=>
					{
						if(each_layer.selected === true)
							{
								// this.slider_position / this.scale
								each_layer.create_segment(start);
							}
					});
			}
		add_marker()
			{
				alert("I don't do anything!");
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
        new_element.style[key] = data.styles[key];
      }

		for (const key in data.properties)
      {
        new_element[key] = data.properties[key];
      }		

		// for (const key in data.events)
    //   {
		// 		new_element.addEventListener("'" +  + "'", e=>data.events[key]())
    //   }		

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