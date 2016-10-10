package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import entities.User;

@Transactional
public class UserDAO {
	 @PersistenceContext
	 private EntityManager em;
	 
	 @Autowired
	 BCryptPasswordEncoder passwordEncoder;
	 
	 public List<User> index(){
		  String query = "Select u from User u";
		  return em.createQuery(query, User.class).getResultList();
		}
	 
	 public User show(int id){
		  return em.find(User.class, id);
		}
	 
	
	 public User create(User user){
		 String rawPassword = user.getPassword();
		 String encodedPassword = passwordEncoder.encode(rawPassword);
		 user.setPassword(encodedPassword);
		  em.persist(user);
		  em.flush();
		  

		  return em.find(User.class, user.getId());
		}
	 
	 public void update(int id, User user) {
	        User updateduser = em.find(User.class, id);
	        updateduser.setUsername(user.getUsername());
	        updateduser.setPassword(user.getPassword());
	        em.persist(updateduser);
	        em.flush();
	    }
	 
	 public void destroy(int id) {
	        User user = em.find(User.class, id);
	        em.remove(user);
	    }
}
