package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

@Entity
public class Answer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
//	@JoinColumn(name="question_id", referencedColumnName="id",  nullable =false)
//	private int question_id;
//	
	
	private String answer_text;
	private boolean is_correct;
	
	
	// GETS AND SETS
//	public int getQuestionId() {
//		return question_id;
//	}
//	public void setQuestionId(int questionId) {
//		this.question_id = questionId;
//	}
	public String getAnswerText() {
		return answer_text;
	}
	public void setAnswerText(String answerText) {
		this.answer_text = answerText;
	}
	public boolean isCorrect() {
		return is_correct;
	}
	public void setCorrect(boolean isCorrect) {
		this.is_correct = isCorrect;
	}
	public int getId() {
		return id;
	}
	
	
	// TO STRING
	@Override
	public String toString() {
		return "Answer [id=" + id + ", answerText=" + answer_text + ", isCorrect="
				+ is_correct + "]";
	}
	
	
	
	

	

	
	
}
