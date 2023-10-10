function Activity_Selection(props)
{
	function ActivitySelectionContainer()
		{ return(<div className={["ActivitySelectionContainer"]}>
			<ActivitySelectionHeader/>
			<ActivitySelectionBody/>
			<ActivitySelectionFooter/>
		</div>); }

	function ActivitySelectionHeader()
		{ return(<div className={"ActivitySelectionHeader"}>Auralayer</div>) }

	function ActivitySelectionBody()
		{	return(<div className={"ActivitySelectionBody"}>
			<NewAuralayerFromYoutubeContainer />
			<NewAuralayerFromAudioFileContainer />
			<StartAudioFileActivitySetup />
			<StartYoutubeActivitySetup />
			</div>) }

	function ActivitySelectionFooter()
		{ return(<div className={"ActivitySelectionFooter"}>Footer</div>) }

	function NewAuralayerFromYoutubeContainer()
		{return(
		<div className={"NewAuralayerFromYoutubeContainer ActivityButtonContainer"}>
			<button className={"NewAuralayerFromYoutubeButton"} onClick={StartYoutubeActivitySetupHandler} >Create</button>
			<div className={"NewAuralayerFromYoutubeDescription"}>Create a new Auralayer using a YouTube link</div>
		</div>) }

	function NewAuralayerFromAudioFileContainer()
		{return(
		<div className={"NewAuralayerFromAudioFileContainer ActivityButtonContainer"}>
			<button className={"NewAuralayerFromAudioFileButton"} onClick={StartAudioFileActivitySetupHandler} >Create</button>		
			<div className={"NewAuralayerFromAudioFileDescription"} >Create a new Auralayer using an audio file on your device</div>
		</div>) }		

	function StartYoutubeActivitySetup()
		{
			return(
				<>
					<div className={"url_prompt_backdrop"} style={{display: 'none'}}></div>
					<div className={"url_prompt_box_container"} style={{display: 'none'}}>
						<div className={"url_prompt_box_top"}>Paste a YouTube URL below</div>
						<div className={"url_prompt_box_middle"}>
							<input id="url_prompt_input_box" type="text" placeholder="Paste URL here"></input>
							<button id="url_prompt_submit_button" onClick={url_prompt_submit_button_handler}>Start</button>
						</div>
						<div className={"url_prompt_box_bottom"}></div>
					</div>
				</>
			);
		}


	function StartAudioFileActivitySetup()
		{
			return(
				<>
					<input className={"OpenAudioButton_GLOBAL"} name="OpenAudioButton_GLOBAL" type="file" onChange={e=> { props.get_user_audio_file('nothing'); }} style={{display: 'none'}} />
					<button className={"OpenFileTriggerButton InterfaceButton"} onClick={() => document.querySelector(".OpenAudioButton_GLOBAL").click()} style={{display: 'none'}}>Choose Audio File 2</button>
					<div className={"InterfaceButton"}>(no audio file loaded)"</div>
				</>
			);
		}

	// function UploadedAudio()
	// 	{
	// 		return( <audio className={"user_audio"} controls></audio>);
	// 	}

	function StartYoutubeActivitySetupHandler()
		{
			props.example_data.piece_info.media_type = "youtube";
			props.example_data.activity_type = 'youtube_link';
			let loaded_file_name_label = "none";
			let youtube_url = 'Paste URL here';

			document.querySelector(".url_prompt_backdrop").style.display = "block";
			document.querySelector(".url_prompt_box_container").style.display = "block";
			document.querySelector("#url_prompt_input_box").focus();
			
			if (props.developing === true) 
				{
					youtube_url = 'https://youtu.be/oIIxlgcuQRU';
					props.example_data.piece_info.video_id = youtube_parser(youtube_url);
					loaded_file_name_label = props.example_data.piece_info.video_id;
					// setup_youtube_player();

					document.querySelector(".url_prompt_backdrop").style.display = "none";
					document.querySelector(".url_prompt_box_container").style.display = "none";
				}
		}

	function url_prompt_submit_button_handler(e)
		{
			let breakout = false;
			let youtube_url = document.querySelector("#url_prompt_input_box").value;
			let loaded_file_name_label = "none";

			if(breakout === false)
				{
					props.example_data.piece_info.video_id = youtube_parser(youtube_url);
					console.log("YouTube ID: " + props.example_data.piece_info.video_id);
					if(props.example_data.piece_info.video_id !== false)
						{ breakout = true; }
					else
						{alert("That URL was invalid. Please enter a valid YouTube URL. You entered: " + youtube_url);}
				}
					
			if(breakout === true)
				{
					loaded_file_name_label = props.example_data.piece_info.video_id;
					// setup_youtube_player();

					document.querySelector(".url_prompt_backdrop").style.display = "none";
					document.querySelector(".url_prompt_box_container").style.display = "none";
					document.querySelector(".ActivitySelectionContainer").style.display = 'none';
				}	
		}

	function StartAudioFileActivitySetupHandler()
		{
			props.example_data.piece_info.media_type = "audio_file";
			props.example_data.activity_type = 'audio_file';

			if ( props.developing === true && window.location.hostname.includes("localhost"))
				{
					props.get_user_audio_file('nothing');
					document.querySelector(".OpenAudioButton_GLOBAL").style.display = "none";
					document.querySelector(".OpenFileTriggerButton").display = "none";
				}

			document.querySelector(".OpenAudioButton_GLOBAL").style.display = "block";
		}

	function youtube_parser(url)
		{
				var i, r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

				r = url.match(rx);

				if(r === null)
						{ return false; }
				else
						{ return r[1]; }
		}		

	return ( <ActivitySelectionContainer/> );
}

export default Activity_Selection;