package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String username;
	private String password;
//	
//	
//	@OneToMany(mappedBy="user", fetch=FetchType.EAGER)
//	@JsonBackReference(value="user")
//	private List<Score> scores;
//
//	
	// GET AND SETS
	public String getUsername() {
		return username;
	}
	
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	
	public String getPassword() {
		return password;
	}
	
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	
//	public List<Score> getScores() {
//		return scores;
//	}
//	
//	
//	public void setScores(List<Score> scores) {
//		this.scores = scores;
//	}
//	
	
	public int getId() {
		return id;
	}

	
	// TO STRING
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + "]";
	}
	
	
	
}
