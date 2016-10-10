package data;

import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Quiz;
import entities.Score;
import entities.User;

@Transactional
public class QuizDAO {
	@PersistenceContext
	private EntityManager em;

	public List<Quiz> index() {
		String query = "Select q from Quiz q";
		return em.createQuery(query, Quiz.class).getResultList();
	}

	public Quiz show(int id) {
		return em.find(Quiz.class, id);
	}

	public Quiz create(Quiz quiz) {
		em.persist(quiz);
		em.flush();

		return em.find(Quiz.class, quiz.getId());
	}

	public void update(int id, Quiz quiz) {
		Quiz updatedquiz = em.find(Quiz.class, id);
		updatedquiz.setName(quiz.getName());
		em.persist(updatedquiz);
		em.flush();
	}

	public void destroy(int id) {
		Quiz quiz = em.find(Quiz.class, id);
		em.remove(quiz);
	}
	
	public Collection<Score> showScores(int id) {
		String query = "Select s from Score s where s.quizId = ?1";
		Collection<Score> results = em.createQuery(query, Score.class).setParameter(1, id).getResultList();
		return results;
	}
	
	public void createScore(Score score, int id, int userid) {
		Quiz quiz = em.find(Quiz.class, id);
		User user = em.find(User.class, userid);
		int quizId =  quiz.getId();
		System.out.println("quiz ID = " + quizId);
		System.out.println("user ID = " + user.getId());
		System.out.println(score);
		score.setQuizId(quizId);
		score.setUser(user);
		em.persist(score);
		em.flush();
	}

}
