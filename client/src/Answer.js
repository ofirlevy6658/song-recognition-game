import { set } from "mongoose";
// import { useEffect, useState } from "react";
// import api from "./API/api";

import "./css/answer.css";

const Answer = ({ handleAnswers, answers }) => {
	return (
		<div className="container">
			<div className="answers">
				<div className="upper-answers">
					<div className="a1" onClick={handleAnswers}>
						{answers[0]}
					</div>
					<div className="a2" onClick={handleAnswers}>
						{answers[1]}
					</div>
				</div>
				<div className="lower-answers">
					<div className="a3" onClick={handleAnswers}>
						{answers[2]}
					</div>
					<div className="a4" onClick={handleAnswers}>
						{answers[3]}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Answer;
