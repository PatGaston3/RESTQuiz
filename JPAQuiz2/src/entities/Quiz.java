package entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Quiz {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;

	@OneToMany(mappedBy="quiz", cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Question> questions;

	
	// GETS AND SETS
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
//	public List<Score> getScores() {
//		return scores;
//	}
//	
//	public void setScores(ArrayList<Score> scores) {
//		this.scores = scores;
//	}
	
	public Set<Question> getQuestions() {
		return questions;
	}
	
	public void setQuestions(Set<Question> questions) {
		this.questions = questions;
	}
	
	public int getId() {
		return id;
	}

	
	// TO STRING
	@Override
	public String toString() {
		return "Quiz [id=" + id + ", name=" + name + ", questions=" + questions + "]";
	}
	
	
	
	
}
