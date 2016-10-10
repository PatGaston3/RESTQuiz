addEventListener('load', function() {
	console.log('LOADED');
});

var xhr = new XMLHttpRequest();

xhr.open('GET', 'http://localhost:8080/RestQuiz/api/quizzes');

xhr.onreadystatechange = function() {
	if (xhr.status < 400 && xhr.readyState === 4) {
		// convert responseText to JSON
		var data = JSON.parse(xhr.responseText);

		// printout JSON data
		console.log(data);

		// ===========================
		// BUILD TABLE //
		// ===========================
		var table = document.createElement('table');
		table.width = '45%';
		table.id = 'Table';
		table.style.alignContent = 'center';
		var thead = document.createElement('thead');
		var th1 = document.createElement('th');
		var th2 = document.createElement('th');
		var th3 = document.createElement('th');
		var th4 = document.createElement('th');
		var th5 = document.createElement('th');

		th1.textContent = 'Quiz Name';
		th2.textContent = 'View';
		th3.textContent = 'Take';
		th4.textContent = 'Edit';
		th5.textContent = 'Delete';
		th1.style.textAlign = 'left';
		th2.style.textAlign = 'left';
		th3.style.textAlign = 'left';
		th4.style.textAlign = 'left';
		th5.style.textAlign = 'left';
		thead.appendChild(th1);
		thead.appendChild(th2);
		thead.appendChild(th3);
		thead.appendChild(th4);
		thead.appendChild(th5);
		table.appendChild(thead);

		var tbody = document.createElement('tbody');
		var count = 0;

		data
				.forEach(function(value, index, array) {
					var tr = document.createElement('tr');
					var td1 = document.createElement('td');
					var btn1 = document.createElement('button');

					// ===========================
					// VIEW BUTTON //
					// ===========================
					// ON CLICK
					btn1.addEventListener('click', function(e) {
						var counter = 0;
						var table = document.getElementById('Table');
						table.parentElement.removeChild(table);

						var button = document.getElementById('create');
						document.body.removeChild(button);

						var h1 = document.createElement('h1');
						h1.textContent = "Quiz Scores: " + value.name;
						document.body.appendChild(h1);

						var hr = document.createElement('hr');
						document.body.appendChild(hr);

						var scoreTable = document.createElement('table');
						scoreTable.id = "scores";
						scoreTable.width = "30%";
						var thead = document.createElement('thead');
						var th = document.createElement('th');
						th.textContent = 'Username';
						var th2 = document.createElement('th');
						th2.textContent = 'Score';

						thead.appendChild(th);
						thead.appendChild(th2);
						scoreTable.appendChild(thead);
						
						count++;

						var tbody = document.createElement('tbody');
						
						// GET SCORES FOR QUIZ
						
						
						var xhr = new XMLHttpRequest();

						xhr.open('GET', 'http://localhost:8080/RestQuiz/api/quizzes/'+ value.id + '/scores');

						xhr.onreadystatechange = function(){
						    if (xhr.status < 400 && xhr.readyState === 4) {
						        // convert responseText to JSON
						        var data = JSON.parse(xhr.responseText);
						       
						        console.log(data);
						        
						        
						      

						        
						        var obj ={};
						        for (var i = 0; i < data.length; i++) {
						        	var tr = document.createElement('tr');
						        	var td = document.createElement('td');
						        	td.textContent = data[i].user.username;
						        	if (count % 2 == 0) {
										tr.style.backgroundColor = 'grey';
									}
									count++;
						        			
						        	var td2 = document.createElement('td');
						        	td2.textContent = data[i].value;
						        	tr.appendChild(td);
						        	tr.appendChild(td2);
						        	tbody.appendChild(tr);
						        }
						        var spacer = document.createElement('p');
						        spacer.textContent = " ";
						        scoreTable.appendChild(spacer);
						        
						  
						        
						        
						    } else if (xhr.readyState === 4 && xhr.status >= 400) {
						        console.error('ERROR!!!!');
						    }
						};

						xhr.send(null);


						
						
						// /////////
						
						
						
						scoreTable.appendChild(tbody);

						document.body.appendChild(scoreTable);
					})

					var td2 = document.createElement('td');
					// ===========================
					// TAKE QUIZ BUTTON //
					// ===========================
					var btn2 = document.createElement('button');

					// ON CLICK
					btn2.addEventListener('click', function(e) {
						console.log("take clicked!!")

						var table = document.getElementById('Table');
						table.parentElement.removeChild(table);

						var button = document.getElementById('create');
						document.body.removeChild(button);

						var h1 = document.createElement('h1');
						h1.textContent = "Take Quiz " + value.id;
						document.body.appendChild(h1);

						var hr = document.createElement('hr');
						document.body.appendChild(hr);

						var obj = { value
							};
						var jsonString = JSON.stringify(obj);

						var xhr = new XMLHttpRequest();
						xhr.open('GET',
								'http://localhost:8080/RestQuiz/api/quizzes/'
										+ value.id);

						// Let the server
						// know what we are
						// sending it
						xhr
								.setRequestHeader('Content-type',
										'application/json');
						//                	  
						xhr.onreadystatechange = function() {
							if (xhr.readyState === 4 && xhr.status < 400) {
								
								
								
								// MAKE INPUT FIELD
								var prompt = document.createElement('p');
								prompt.textContent = "Please Enter your name:";
								document.body.appendChild(prompt);
								
								var username = document.createElement('input');
								username.type = "text";
								username.value = "Your Name";
								document.body.appendChild(username);
								
								var starter = document.createElement('button');
								starter.id = "startQuiz";
								starter.textContent = "Start Quiz";
								document.body.appendChild(starter);
								
								var hr = document.createElement('hr');
								document.body.appendChild(hr);
								
								
								// START QUIZ
								starter.addEventListener('click', function(e){
									console.log("named!");
									
									document.body.removeChild(prompt);
									document.body.removeChild(username);
									document.body.removeChild(starter);
									document.body.removeChild(hr);
									
									// // CREATE USER 
									var obj = {
											username : username.value,
											password: "quiztaker",
									};

									var jsonString = JSON.stringify(obj);
									
									var xhr = new XMLHttpRequest();
									xhr.open('POST', 'http://localhost:8080/RestQuiz/api/users');
									
									// Let the server know what we are sending it
									xhr.setRequestHeader('Content-type', 'application/json');
									
									xhr.onreadystatechange = function() {
										if (xhr.readyState === 4 && xhr.status < 400) {
										      
										        
										}
										if (xhr.readyState === 4 && xhr.status >= 400) {
											console.error(xhr.status + ': ' + xhr.responseText);
										}
									};
									
									xhr.send(jsonString);
									
									// MAKE FORM
									var form = document.createElement('form');
		
									// BUILD BODY/CONTENT OF FORM!!
									counter = 1;
									for (var i = 0; i < value.questions.length; i++) {
										var p = document.createElement('p');
										p.id = "question";
										p.textContent = (counter++) + " " + value.questions[i].questionText;
										form.appendChild(p);
										for (var answer = 0; answer < 4; answer++){
											var input = document.createElement('input');
											input.type = "radio";
											input.name = value.questions[i].id;
											input.value = value.questions[i].answers[answer].correct; 
											input.id = value.questions[i].answers[answer].id;
											form.appendChild(input);
											var label = document.createElement('label');
											label.htmlFor = input.id;
											label.textContent = value.questions[i].answers[answer].answerText;
											form.appendChild(label);
											var spacer = document.createElement('p');
											spacer.textContent = "    ";
											form.appendChild(spacer);
										} 
						
									}
									
									var submit = document.createElement('input');
									submit.type = 'submit'; 
									submit.textContent = 'submit';
									submit.id = "submitQuiz";
									submit.value = "submit";
									
									
									// SUBMIT FORM CLICK EVENT LISTENER
									submit.addEventListener('click', function(e){
										console.log("Quiz Submitted!!!")
										
										// CALCULATE SCORE!!
										var inputs = [];
										var questions = [];
										var rightAnswers = [];
										
										var inputs = document.getElementsByTagName('input');
										console.log("before purge length: " + inputs.length);
										
										var num = 0;
										for (var i = 0; i < inputs.length; i++) {
											if (inputs[i].value == "true" || inputs[i].value == "false") {
												questions.push(inputs[i]);
											}
										}
										
										var plus = 0;
										for (var i = 0; i < questions.length; i++) {
											console.log( (plus++) + " " + questions[i].value);
											if (questions[i].value == "true"){
												rightAnswers.push(questions[i]);
											}
										}
//										
										console.log(rightAnswers);
										console.log(rightAnswers[0].checked);
										console.log(rightAnswers[1].checked);
										console.log(rightAnswers[2].checked);
										
										var operand1 = 0;
										for (var i = 0; i < rightAnswers.length; i++) {
											console.log(rightAnswers[i].checked);
											if (rightAnswers[i].checked == true) {
												operand1++;
												console.log("true!");
											}
											else { 
												console.log("incorrect!!");
											}
										}
										
										var score = Math.ceil((operand1 / rightAnswers.length) * 100);
										
										console.log(data[0]);
										
										
										// CREATE SCORE WITH NEW USER INFORMATION
										
										// STEP 1. Get newest created User
										
										var xhr = new XMLHttpRequest();
										xhr.open('GET', 'http://localhost:8080/RestQuiz/api/users');
										
										// Let the server know what we are sending it
										xhr.setRequestHeader('Content-type', 'application/json');
										
										xhr.onreadystatechange = function() {
											if (xhr.readyState === 4 && xhr.status < 400) {
												var user = JSON.parse(xhr.responseText);
											    console.log(user);
											    
											    
											    //LAST USER!! 
											    console.log("User length: " + user.length);
											    lastUser = user[user.length - 1];
											    console.log(lastUser.id);
											    console.log(lastUser.username);
												
											    // STEP 2. Create SCORE with USER information
											    
											    var obj = {
											    		"user": {
											    			"id": lastUser.id,
											    			"username": lastUser.username,
											    			"password": "testTaker"
											    		},
											    		"quizId": value.id,
											    		"value": score
											    };

											    var jsonString = JSON.stringify(obj);
											    
											    var newxhr = new XMLHttpRequest();
											    newxhr.open('POST', 'http://localhost:8080/RestQuiz/api/quizzes/' + value.id + '/scores/' + lastUser.id);
											    
											    // Let the server know what we are sending it
											    newxhr.setRequestHeader('Content-type', 'application/json');
											    
											    newxhr.onreadystatechange = function() {
											    	if (newxhr.readyState === 4 && newxhr.status < 400) {
											    		
											    		
											    	}
											    	if (newxhr.readyState === 4 && newxhr.status >= 400) {
											    		console.error(newxhr.status + ': ' + newxhr.responseText);
											    	}
											    };
											    
											    newxhr.send(jsonString);
											}
											
											
											if (xhr.readyState === 4 && xhr.status >= 400) {
												console.error(xhr.status + ': ' + xhr.responseText);
											}
										};
										
										xhr.send(null);
										
										
											
										// RETURN SCORE
										 alert("YOUR SCORE IS: " + score + "%!");
										
										
									})
									form.appendChild(submit);
									document.body.appendChild(form);
									
																	
								});
								
								
							}
							if (xhr.readyState === 4 && xhr.status >= 400) {
								console.error(xhr.status + ': '
										+ xhr.responseText);
							}
						};

						xhr.send(jsonString);

					})

					var td3 = document.createElement('td');
					td1.textContent = value.name;
					td1.id = value.id;
					tr.appendChild(td1);

					var td4 = document.createElement('td');
					var btn3 = document.createElement('button');
					
					
					// ===========================
					// EDIT QUIZ BUTTON //
					// ===========================
					btn3
							.addEventListener(
									'click',
									function(e) {
										document.body.removeChild(createButton);

										var table = document
												.getElementById('Table');
										table.parentElement.removeChild(table);

										var h1 = document.createElement('h1');
										h1.textContent = "Edit Quiz Name";
										document.body.appendChild(h1);

										var hr = document.createElement('hr');
										document.body.appendChild(hr);

										// EDIT QUIZ FORM

										var form = document
												.createElement('form');
										form.id = 'form';
										var input = document
												.createElement('input');
										input.label = "Quiz Name: ";
										input.value = e.target.parentElement.previousSibling.previousSibling.previousSibling.textContent;
										input.id = value.id;
										input.type = "text";

										form.appendChild(input);

										var submit = document
												.createElement('input');
										submit.value = "Edit";
										submit.type = "submit";

										// ON CLICK
										submit
												.addEventListener(
														'click',
														function(e) {
															console
																	.log("Submit Edit!");

															var obj = {
																name : input.value
															};
															var jsonString = JSON
																	.stringify(obj);

															var xhr = new XMLHttpRequest();
															xhr
																	.open(
																			'PUT',
																			'http://localhost:8080/RestQuiz/api/quizzes/'
																					+ value.id);

															// Let the server
															// know what we are
															// sending it
															xhr
																	.setRequestHeader(
																			'Content-type',
																			'application/json');
															//                	  
															xhr.onreadystatechange = function() {
																if (xhr.readyState === 4
																		&& xhr.status < 400) {
																	console
																			.log(xhr.status);
																	console
																			.log(xhr.responseText);
																}
																if (xhr.readyState === 4
																		&& xhr.status >= 400) {
																	console
																			.error(xhr.status
																					+ ': '
																					+ xhr.responseText);
																}
															};

															xhr
																	.send(jsonString);
														})

										form.appendChild(submit);
										document.body.appendChild(form);
									})

									
					// ===========================
					// DELETE QUIZ BUTTON //
					// ===========================
					var td5 = document.createElement('td');
					var btn4 = document.createElement('button');

					// ON CLICK
					btn4
							.addEventListener(
									'click',
									function(e) {

										if (confirm("Are you sure you want to delete this quiz?")) {
											var xhr = new XMLHttpRequest();
											xhr.open('DELETE',
													'http://localhost:8080/RestQuiz/api/quizzes/'
															+ value.id);

											// Let the server know what we are
											// sending it
											xhr.setRequestHeader(
													'Content-type',
													'application/json');

											xhr.onreadystatechange = function() {
												if (xhr.readyState === 4
														&& xhr.status < 400) {
													console.log(xhr.status);
													console
															.log(xhr.responseText);
												}
												if (xhr.readyState === 4
														&& xhr.status >= 400) {
													console.error(xhr.status
															+ ': '
															+ xhr.responseText);
												}
											};

											xhr.send(null);
											location.reload();
										} else {
											location.reload();
										}

									})

					// BUTTON CONTEXT AND APPEND
					btn1.textContent = "View";
					btn1.id = "view";
					td2.appendChild(btn1);
					tr.appendChild(td2);

					btn2.textContent = "Take";
					btn2.id = "take";
					td3.appendChild(btn2);
					tr.appendChild(td3);

					btn3.textContent = "Edit";
					btn3.id = "edit";
					td4.appendChild(btn3);
					tr.appendChild(td4);

					btn4.textContent = "Delete";
					btn4.id = "delete";
					td5.appendChild(btn4);
					tr.appendChild(td5);

					tbody.appendChild(tr);

					if (count % 2 == 0) {
						tr.style.backgroundColor = 'grey';
					}
					count++;
				})
		table.appendChild(tbody);
		document.body.appendChild(table);

		// ===========================
		// CREATE BUTTON //
		// ===========================
		var createButton = document.createElement('button');
		createButton.id = "create";
		createButton.textContent = "Create Quiz";
		document.body.appendChild(createButton);

		// ON CLICK
		createButton.addEventListener('click', function(e) {
			document.body.removeChild(createButton);

			var table = document.getElementById('Table');
			table.parentElement.removeChild(table);

			var h1 = document.createElement('h1');
			h1.textContent = "Create Quiz";
			document.body.appendChild(h1);

			var hr = document.createElement('hr');
			document.body.appendChild(hr);

			// ===========================
			// BUILD FORM //
			// ===========================

			var form = document.createElement('form');
			form.id = 'form';
			var input = document.createElement('input');
			input.label = "Quiz Name: ";
			input.value = "Quiz Name";
			input.type = "text";

			form.appendChild(input);

			var submit = document.createElement('input');
			submit.value = "Create";
			submit.type = "submit";

			// CREATE QUIZ BUTTON
			submit.addEventListener('click', function(e) {
				console.log("SUBMITTED!");
				console.log("quiz name = " + input.value);
				var obj = {
					name : input.value
				};
				var jsonString = JSON.stringify(obj);

				var xhr = new XMLHttpRequest();
				xhr.open('POST', 'http://localhost:8080/RestQuiz/api/quizzes');

				// Let the server know what we are sending it
				xhr.setRequestHeader('Content-type', 'application/json');

				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4 && xhr.status < 400) {
						console.log(xhr.status);
						console.log(xhr.responseText);
					}
					if (xhr.readyState === 4 && xhr.status >= 400) {
						console.error(xhr.status + ': ' + xhr.responseText);
					}
				};

				xhr.send(jsonString);
			})

			form.appendChild(submit);

			document.body.appendChild(form);

		})

	} else if (xhr.readyState === 4 && xhr.status >= 400) {
		console.error('ERROR!!!!');
	}

	var buttons = document.getElementsByTagName('button');
	console.log(buttons.length);

};

xhr.send(null);
