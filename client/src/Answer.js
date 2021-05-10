import React from "react";
import "./css/answer.css";

const Answer = ({ handleAnswers, answers }) => {
	return (
		<div className="containerr">
			<div className="answers">
				<div className="upper-answers ">
					<button className="a1 btn btn-primary" onClick={handleAnswers}>
						{answers[0]}
					</button>
					<button className="a2 btn btn-primary" onClick={handleAnswers}>
						{answers[1]}
					</button>
				</div>
				<div className="lower-answers ">
					<button className="a3 btn btn-primary" onClick={handleAnswers}>
						{answers[2]}
					</button>

					<button className="a4 btn btn-primary" onClick={handleAnswers}>
						{answers[3]}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Answer;
