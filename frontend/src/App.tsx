import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
	interface timeline {
		current_location: string;
		description: string;
		highlights: string;
		history: string;
		id: number;
		image: string;
		original_location: string;
		period: string;
		timeline: string;
		__createdtime__: number;
		__updatedtime__: number;
	}

	useEffect(() => {
		const getApi = () => {
			const API = 'https://functions-cloud-1-abaisden.harperdbcloud.com/api';

			fetch(API)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					setLoading(false);
					setData(data);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		getApi();
	}, []);
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<timeline[]>([]);
	return (
		<>
			<header>
				<h1>Human Civilization</h1>
				<p>An Ancient Civilizations Timeline for 8 of the most influential cultures in human history</p>
			</header>

			<div className="container">
				{loading ? (
					<div>
						<h1>Loading...</h1>
					</div>
				) : (
					<div>
						{data.map((civilisation) => (
							<div className="civilisation-container" key={civilisation.id}>
								<div className="civilisation">
									<h1>{civilisation.timeline}</h1>
									<img src={civilisation.image} alt={civilisation.timeline} />
									<ul>
										<li>
											<strong>Period: </strong>
											{civilisation.period}
										</li>
										<li>
											<strong>Original Location:</strong> {civilisation.original_location}
										</li>
										<li>
											<strong>Current Location:</strong> {civilisation.current_location}
										</li>
										<li>
											<strong>Highlights: </strong>
											{civilisation.highlights}
										</li>
									</ul>
									<p>{civilisation.description}</p>
								</div>
								<div className="timeline-line"></div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default App;
