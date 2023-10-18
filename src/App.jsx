// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container } from 'react-bootstrap';
import './App.css';
import AuralayerContainer from './AuralayerContainer';
import { CreateNewElement } from './CreateNewElement';
import Header from './Header';
import InterfaceContainer from './InterfaceContainer';
import Main_Program from './Main_Program';
import { SampleData } from './SampleData';
import Utilities from './Utilities';
import './assets/bootstrap.css';
import './assets/bs_custom.css';

function App() {
	let developing = true;
	return (<>
		<Header />
		<main className="d-flex flex-nowrap">
			<Container fluid='xl'>
				<Utilities />
				<AuralayerContainer />
				<InterfaceContainer />
			</Container>
		</main>
		<Main_Program example_data={SampleData} CreateNewElement={CreateNewElement} developing={developing} />

	</>);
}

export default App;
// nothing