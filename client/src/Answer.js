import React from "react";

import "./css/answer.css";
const Answer = ({ handleAnswers }) => {
	return (
		<div className="container">
			<div className="answers">
				<div className="upper-answers">
					<div className="a1" onClick={handleAnswers}>
						a1
					</div>
					<div className="a2" onClick={handleAnswers}>
						a2
					</div>
				</div>
				<div className="lower-answers">
					<div className="a3" onClick={handleAnswers}>
						a3
					</div>
					<div className="a4" onClick={handleAnswers}>
						a4
					</div>
				</div>
			</div>
		</div>
	);
};

export default Answer;
