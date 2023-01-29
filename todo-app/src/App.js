import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css';
import { Tasks, EditTask } from './pages/index';



function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Tasks/>}/>
				<Route path='/edit-task/:id' element={<EditTask/>}/>
			</Routes>
		</Router>
	);
}

export default App;
