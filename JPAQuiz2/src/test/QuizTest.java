package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Quiz;

public class QuizTest {
	private EntityManagerFactory emf;
    private EntityManager em;

	@Before
	public void setUp() throws Exception {
		emf = Persistence.
				createEntityManagerFactory("JPAQuiz2");
		em = emf.createEntityManager();
	}

	@Test
	public void test() {
		  Quiz quiz = em.find(Quiz.class, 1);
	      System.out.println(quiz);
	      assertEquals("sports", quiz.getName());
	}
	
	@After
	public void tearDown() throws Exception {
		em.close();
        emf.close();
	}

}
