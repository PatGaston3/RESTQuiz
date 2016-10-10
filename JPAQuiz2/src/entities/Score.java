package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Score {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	
	@ManyToOne
	@JoinColumn(name="user_id")
//	@JsonManagedReference(value="user")
	private User user;
	
	@JoinColumn(name="quiz_id")
	@Column(name="quiz_id")
	private int quizId;
	
	private int value;

	
	
	// GETS AND SETS
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	

	
	public int getValue() {
		return value;
	}
	
	public void setValue(int value) {
		this.value = value;
	}
	
	public int getId() {
		return id;
	}


	public int getQuizId() {
		return quizId;
	}

	public void setQuizId(int quizId) {
		this.quizId = quizId;
	}
	
	// TO STRING
	
	@Override
	public String toString() {
		return "Score [id=" + id + ", user = " + user + ", value=" + value + "]";
	}
	
	
	
}
