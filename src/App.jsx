import './App.css';
import Main_Program from './Main_Program';
import { SampleData  } from './SampleData';
import { CreateNewElement } from './CreateNewElement';

function App()
{
	let developing = false;
	return (<Main_Program  example_data={SampleData} CreateNewElement={CreateNewElement} developing={developing}/> );
}

export default App;
// nothing