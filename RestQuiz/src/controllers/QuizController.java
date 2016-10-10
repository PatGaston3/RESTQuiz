package controllers;

import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.QuizDAO;
import entities.Quiz;
import entities.Score;

@RestController
public class QuizController {
	@Autowired
	private QuizDAO quizDAO;

	@RequestMapping(path = "pingQuiz", method = RequestMethod.GET)
	public String ping() {
		return "Pong Quiz!!";
	}

	// LIST ALL Quizzes
	@RequestMapping(path = "quizzes", method = RequestMethod.GET)
	public List<Quiz> index() {
		return quizDAO.index();
	}

	// LIST Quiz BY ID
	@RequestMapping(path = "quizzes/{id}", method = RequestMethod.GET)
	public Quiz show(@PathVariable int id) {
		return quizDAO.show(id);
	}

	// CREATE Quiz
	@RequestMapping(path = "quizzes", method = RequestMethod.POST)
	public void create(@RequestBody String quizJSON, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();

		try {
			Quiz quiz = mapper.readValue(quizJSON, Quiz.class);
			quizDAO.create(quiz);
			res.setStatus(422);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(422);
		}
	}

	// UPDATE QUIZ
	@RequestMapping(path = "quizzes/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable int id, @RequestBody String quizJSON, HttpServletResponse response) {
		ObjectMapper mapper = new ObjectMapper();
		Quiz quiz = null;
		try {
			quiz = mapper.readValue(quizJSON, Quiz.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		response.setStatus(202);
		quizDAO.update(id, quiz);
	}
	
	// DELETE QUIZ
	@RequestMapping(path = "quizzes/{id}", method = RequestMethod.DELETE)
	public void destroy(@PathVariable int id, HttpServletResponse response) {
		quizDAO.destroy(id);
		response.setStatus(202);
	}
	
	// SHOW SCORE BY ID 
	@RequestMapping(path = "quizzes/{id}/scores", method = RequestMethod.GET)
	public Collection<Score> showScores(@PathVariable int id, HttpServletResponse response) {
		
		
		response.setStatus(202);
		return quizDAO.showScores(id);
	}
	
	// UPDATE SCORE 
	@RequestMapping(path="quizzes/{id}/scores/{userid}", method = RequestMethod.PUT)
	public void createScore(@PathVariable int id, @PathVariable int userid, @RequestBody String scoreJSON, HttpServletResponse response){
		ObjectMapper mapper = new ObjectMapper();
		Score score = null;
		try {
			score = mapper.readValue(scoreJSON,  Score.class);
			} catch(Exception e) {
				e.printStackTrace();
			}
		response.setStatus(201);
		quizDAO.createScore(score, id, userid);
	}
	
	// CREATE SCORE
	@RequestMapping(path = "quizzes/{id}/scores/{userid}", method = RequestMethod.POST)
	public void createScore(@RequestBody String scoreJSON, @PathVariable int id, @PathVariable int userid, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();

		try {
			Score score = mapper.readValue(scoreJSON, Score.class);
			quizDAO.createScore(score, id, userid);
			res.setStatus(422);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(422);
		}
	}
	
	

}
