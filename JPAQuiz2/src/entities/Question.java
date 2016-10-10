package entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Question {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	@JoinColumn(name = "quiz_id", referencedColumnName = "id")
	@JsonBackReference(value = "quiz")
	private Quiz quiz;

	private String question_text;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "question_id", referencedColumnName = "id", nullable = false)
	private Set<Answer> answers;

	
	
	// GETS AND SETS
	public Quiz getQuiz() {
		return quiz;
	}
	
	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}
	
	public String getQuestionText() {
		return question_text;
	}
	
	public void setQuestionText(String questionText) {
		this.question_text = questionText;
	}
	
	public Set<Answer> getAnswers() {
		return answers;
	}
	
	public void setAnswers(Set<Answer> answers) {
		this.answers = answers;
	}
	
	public int getId() {
		return id;
	}

	// TO STRING
	@Override
	public String toString() {
		return "Question [id=" + id + ", quiz=" + quiz + ", questionText=" + question_text + ", answers=" + answers
				+ "]";
	}
	

}
