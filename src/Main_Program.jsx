import Activity_Selection from './Activity_Selection';
// import Header from './Header';

function Main_Program(props) {
	function ProgramX() {
		return (<UploadedAudio />)
	}

	// function Header()
	// 	{
	// 		// return(this.auralayer_program = createNewElement({type:"div", classes: ["auralayer_program"], parent: document.body}););
	// 	}


	function UploadedAudio() {
		return (
			<div>
				{/* <Header /> */}
				<audio className={"uploaded_audio"} controls={true}></audio>
			</div>
		);
	}
	function get_user_audio_file(sent_url) {
		// this.ActivitySelectionContainer.style.display = "none";

		document.querySelector(".ActivitySelectionContainer").style.display = 'none';
		// uploaded_audio_GLOBAL = props.CreateNewElement({type:"audio", classes:["user_audio"], parent: document.body, properties:{controls: true}});
		let OpenAudioButton = document.querySelector(".OpenAudioButton_GLOBAL");

		if (props.developing === true && window.location.hostname.includes("localhost")) {
			// this.uploaded_audio_GLOBAL.src = 'sheep_may_safely_graze.mp3';
			document.querySelector(".uploaded_audio").src = 'http://192.168.1.111/bri_former_server_sample/sheep_may_safely_graze.mp3';
		}
		else if (!OpenAudioButton.files.length) { alert('no file selected'); }
		else {
			document.querySelector(".uploaded_audio").src = URL.createObjectURL(OpenAudioButton.files[0]);
			// don't forget to revoke the blobURI when you don't need it
			document.querySelector(".uploaded_audio").onend = function (e) { URL.revokeObjectURL(OpenAudioButton.src); }
		}

		document.querySelector(".uploaded_audio").addEventListener('loadedmetadata', () => uploaded_audio_loadedmetadata_handler());
		const timeupdater = setInterval((e) => move_seek_slider_with_audio_position('ticking_audio'), 10);
		// originally 1000
		// if this is the initial file load - save the state to local storage
	}

	function uploaded_audio_loadedmetadata_handler() {

	}

	function move_seek_slider_with_audio_position() {

	}




	return (
		<>
			<Activity_Selection example_data={props.example_data} CreateNewElement={props.CreateNewElement} get_user_audio_file={get_user_audio_file} developing={props.developing} />
			<ProgramX />
		</>);
}

export default Main_Program;