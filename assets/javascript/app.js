// Doc ready function to open 

$(document).ready(function(){
    
    // the event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.choices', trivia.guessEval);
    
  })
//set variables  
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 10,
    timerOn: false,
    timerId : '',
    answerChosen: false,

  //multi-choice questions 
    questions: {

      q1: 'What is the name of Ashs female companion?', 
      q2: 'How many orginal Pokemon(Generation 1) are there ?',
      q3: 'Which Pokemon type is effective against water attacks?',
      q4: 'How many gym battle wins are reqiured?',
      q5: 'Which move does the most damage?',
      q6: 'What was the first Pokemon Ash caught in the wild?',
      q7: 'What item makes Jigglypuff evolve into Wigglytuff?',
      q8: 'Magikarps move "Splash" was mistranslated from the Japanese word that means what?',
      q9: 'There is a rumor that Mew is nearly the same as which Pokemon?',
      q10: 'The skull that Cubone wears on its head once belonged to...?'
    },

    choices: {

      q1: ['Luna', 'Misty', 'Sara', 'Michelle'],
      q2: ['7', '1000', '151', '3.14'],
      q3: ['Grass', 'Water', 'Fire', 'Machine'],
      q4: ['0', '7', '1', '8'],
      q5: ['Punch', 'Hyperbeam', 'Defense Curl', 'Faint'],
      q6: ['Pikachu', 'Pidgeotto', 'Caterpie', 'Bulbasaur'],
      q7: ['Moon Stone', 'Dawn Stone', 'Sun Stone', 'Dusk Stone'],
      q8: ['Hop', 'Dive', 'Jump', 'Submerge'],
      q9: ['Meowth', 'Porygon', 'Ditto', 'Chansey'],
      q10: ['its dead mother', 'its dead father', 'its dead sibling', 'its younger self'],
    },
    answers: {

      q1: 'Misty',
      q2: '151',
      q3: 'Grass',
      q4: '8',
      q5: 'Hyperbeam',
      q6: 'Caterpie',
      q7: 'Moon Stone',
      q8: 'Hop',
      q9: 'Ditto',
      q10: 'its dead mother'
    },
    
      startGame: function(){

      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      
      $('#game').show();
      $('#results').html('');
      $('#timer').text(trivia.timer);
      $('#start').hide();
      $('#remaining-time').show();
      
      trivia.nextQuestion();
    },

    //display next questions and next answer choices
    nextQuestion : function(){
      $("#results").empty();
      
      trivia.answerChosen = false,
     
      // set timer to 10 seconds 
      trivia.timer = 10;
      $('#timer').text(trivia.timer);

      //Miliseconds so 1000=10
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      var questionChoices = Object.values(trivia.choices)[trivia.currentSet];
      
      // choices in the html
      $.each(questionChoices, function(index, key){
        
        $('#choices').append($('<button class="choices btn btn-light btn-lg m-1">'+key+'</button>'));
      })
      },

    timerRunning : function(){
      
      // if timer still has time left and there are still questions left to ask
      
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
       $('#timer').text(trivia.timer);
      trivia.timer--;
          
     }
      
      else if(trivia.timer === -1){
        trivia.answerChosen =  true;
        trivia.unanswered++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2500);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        
        $('#results')
          .html('<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>');
        
        
        $('#game').hide();
        $('#start').show();
      }
      
    },
      
    // method to evaluate the choice clicked
    guessEval : function() {
      
      if (!trivia.answerChosen) {
        trivia.answerChosen = true;
        var resultId;
      
        // the answer to the current question being asked
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
        
    
        if($(this).text() === currentAnswer){
          $(this).addClass('btn-success').removeClass('btn-light');
          
          trivia.correct++;
          clearInterval(trivia.timerId);
          resultId = setTimeout(trivia.guessResult, 2000);
          $('#results').html('<h3>Correct Answer!</h3>');
          
        }
      
        else{
          $(this).addClass('btn-danger').removeClass('btn-light');
          
          trivia.incorrect++;
          clearInterval(trivia.timerId);
          resultId = setTimeout(trivia.guessResult, 2000);
          $('#results').html('<h3>NO! The correct answer was: '+ currentAnswer + "." +'</h3>');
        
        }
      }
      
      
    },

    guessResult : function(){
      
      trivia.currentSet++;
      
      $('.choices').remove();
      $('#results h3').remove();
      
      // starts next question
      trivia.nextQuestion();
       
    }

  }