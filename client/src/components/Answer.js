import React from "react";
import "../styles/answer.css";

const Answer = ({ handleAnswers, answers, btnState }) => {
	return (
		<div>
			<div className="answers">
				<div className="upper-answers ">
					<button
						className="a1 btn btn-primary"
						disabled={btnState}
						onClick={handleAnswers}
					>
						{answers[0]}
					</button>
					<button
						disabled={btnState}
						className="a2 btn btn-primary"
						onClick={handleAnswers}
					>
						{answers[1]}
					</button>
				</div>
				<div className="lower-answers ">
					<button
						disabled={btnState}
						className="a3 btn btn-primary"
						onClick={handleAnswers}
					>
						{answers[2]}
					</button>

					<button
						disabled={btnState}
						className="a4 btn btn-primary"
						onClick={handleAnswers}
					>
						{answers[3]}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Answer;
