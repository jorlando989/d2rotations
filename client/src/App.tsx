import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Calendar from "./components/Calendar";
import Daily from "./components/Daily/Daily";
import Dashboard from "./components/Dashboard";
import { BlockingDefsProvider } from "./components/DefsProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Nightfall from "./components/Weekly/Nightfall";
import RaidDungeon from "./components/Weekly/RaidDungeon";
import Weekly from "./components/Weekly/Weekly";

function App() {
	function renderRoutes() {
		return (
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/weekly' element={<Weekly />} />
				<Route path='/daily' element={<Daily />} />
				<Route path='/nightfall' element={<Nightfall />} />
				<Route path='/raiddungeon' element={<RaidDungeon />} />
				{/* <Route path="/other" element={<Other />}/> */}
				<Route path='/calendar' element={<Calendar />} />
			</Routes>
		);
	}
  
	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<div className='content-wrap'>
					<BlockingDefsProvider>
						{renderRoutes()}
					</BlockingDefsProvider>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
