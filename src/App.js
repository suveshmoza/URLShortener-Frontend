import React, { useState } from 'react';
import './styles/App.css';
import { BackgroundAnimate, InputShortener, LinkResult } from './component';

const App = () => {
	const [inputValue, setInputValue] = useState('');

	return (
		<div className="container">
			<InputShortener setInputValue={setInputValue} />
			<BackgroundAnimate />
			<LinkResult inputValue={inputValue} />
		</div>
	);
};

export default App;
