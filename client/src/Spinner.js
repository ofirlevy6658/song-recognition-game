import React from "react";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./css/spinner.css";

const Spinner = () => {
	const [loading, setLoading] = useState(true);

	return (
		<div className="container d-flex flex-column">
			<div className="vynil vynil__round">
				<div className="shade"></div>
				<div className="vynil vynil__border vynil__border-1"></div>
				<div className="vynil vynil__border vynil__border-3"></div>
				<div className="vynil label label__content spin">t</div>
				<div className="vynil hole"></div>
			</div>
			<div className="mx-auto mt-5">
				<CountdownCircleTimer
					isPlaying
					duration={4.5}
					colors={[
						["#004777", 0.25],
						["#F7B801", 0.25],
						["#A30000", 0.25],
						["#ffffff", 0.25],
					]}
				>
					{({ remainingTime }) => {
						setLoading(false);
						return remainingTime;
					}}
				</CountdownCircleTimer>
			</div>
		</div>
	);
};

export default Spinner;
