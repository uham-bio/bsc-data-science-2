HTMLWidgets.widget({

  name: 'multiQuestions',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // --------------- Get questions from R function and all other variables --------

        var quizQuestions = JSON.parse(x.questions);

        // Get ID from htmlwidget container
        var widgetId = document.getElementById(el.id).id;

        // Get title
        title = x.title;

        // Get few style params
        var centerWidget = x.center;
        var scrollWidget = x.scroll;
        var inclTimer = x.inclTimer;
        var fontFamily = x.fontFamily;
        var fontSize = x.fontSize;
        var titleFontSize = x.titleFontSize;
        var questionFontSize = x.questionFontSize;
        var titleCol = x.titleCol;
        var titleBg = x.titleBg;
        var mainCol = x.mainCol;
        var mainBg = x.mainBg;
        var answersCol = x.answersCol;
        var answersBg = x.answersBg;
        var hoverBg = x.hoverBg;
        var timerCol = x.timerCol;


        // ------------ Create all HTML elements -----------------------

        var divWidget = document.getElementById(el.id);

        // QUIZ CONTAINER
        var divQuiz = document.createElement("div");
        divQuiz.classList.add("mqq-quiz");
        // add user-specific CSS
        divQuiz.style.height = divWidget.style.height * 0.99;
        divQuiz.style.backgroundColor = mainBg;
        divQuiz.style.fontFamily = fontFamily;
        divQuiz.style.fontSize = fontSize+'px';
        divQuiz.style.lineHeight = fontSize*1.5+'px';

        // HEADER PART
        var divHeader = document.createElement("div");
        divHeader.classList.add("mqq-header");
        // add user-specific CSS
        divHeader.style.backgroundColor = titleBg;

        var divTitle = document.createElement("div");
        divTitle.classList.add("mqq-left-title");
        divTitle.innerHTML = title;
        // add user-specific CSS
        divTitle.style.color = titleCol;
        divTitle.style.fontFamily = fontFamily;
        divTitle.style.fontSize = titleFontSize+'px';
        divTitle.style.lineHeight = titleFontSize*1.2+'px';

        var divSubtitle = document.createElement("div");
        divSubtitle.classList.add("mqq-right-title");
        divSubtitle.innerHTML = "Total Questions: ";
        // add user-specific CSS
        divSubtitle.style.color = titleCol;
        divSubtitle.style.fontFamily = fontFamily;
        divSubtitle.style.fontSize = titleFontSize+'px';
        divSubtitle.style.lineHeight = titleFontSize*1.2+'px';
        divSubtitle.style.marginRight = titleFontSize*2.2+'px';
        divSubtitle.style.flex = '0 0 '+ titleFontSize*11+'px';

        var spanTque = document.createElement("span");
        spanTque.classList.add("mqq-tque");

        var divClear= document.createElement("div");
        divClear.classList.add("mqq-clearfix");

        // Append all header elements to quiz divContainer
        divSubtitle.appendChild(spanTque);
        divHeader.appendChild(divTitle);
        divHeader.appendChild(divSubtitle);
        divHeader.appendChild(divClear);
        divQuiz.appendChild(divHeader);



        // QUIZ CONTENT PART
        var divContent = document.createElement("div");
        divContent.classList.add("mqq-content");

        var divContainer = document.createElement("div");
        divContainer.classList.add("mqq-container-fluid");

        var divRow = document.createElement("div");
        divRow.classList.add("mqq-row");

        var divCol = document.createElement("div");
        divCol.classList.add("mqq-col");

        var divQuizBody = document.createElement("div");
        divQuizBody.classList.add("mqq-quiz-body");

        var divForm = document.createElement("form");
        divForm.name = "quizForm";

        var divFieldset= document.createElement("fieldset");
        divFieldset.classList.add("mqq-form-group");

        var hQuestion = document.createElement("h4");
        hQuestion.classList.add("mqq-question-header");
        // add user-specific CSS
        hQuestion.style.color = mainCol;
        hQuestion.style.fontFamily = fontFamily;
        hQuestion.style.fontSize = questionFontSize+'px';
        hQuestion.style.lineHeight = questionFontSize*1.5+'px';

        var spanQid = document.createElement("span");
        spanQid.classList.add("mqq-question-qid");
        var spanQuestion = document.createElement("span");
        spanQuestion.classList.add("mqq-question-span");

        var divOption = document.createElement("div");
        divOption.classList.add("mqq-option-block-container");

        var divButtons =  document.createElement("div");
        divButtons.classList.add("mqq-button-container");

        var buttonPrev = document.createElement("button");
        buttonPrev.name = "previous";
        buttonPrev.classList.add("mqq-btn", "mqq-previous");
        buttonPrev.innerHTML = "Previous";
        // add user-specific CSS
        buttonPrev.style.fontFamily = fontFamily;
        buttonPrev.style.fontSize = fontSize+'px';
        buttonPrev.style.lineHeight = fontSize*1.375+'px';
        buttonPrev.style.padding = fontSize*0.375+'px ' + fontSize*0.75+'px';
        buttonPrev.style.borderRadius = fontSize*0.25+'px';

        var buttonNext = document.createElement("button");
        buttonNext.name = "next";
        buttonNext.classList.add("mqq-btn", "mqq-next");
        buttonNext.innerHTML = "Next";
        // add user-specific CSS
        buttonNext.style.fontFamily = fontFamily;
        buttonNext.style.fontSize = fontSize+'px';
        buttonNext.style.lineHeight = fontSize*1.375+'px';
        buttonNext.style.padding = fontSize*0.375+'px ' + fontSize*0.75+'px';
        buttonNext.style.borderRadius = fontSize*0.25+'px';

        var timer = document.createElement("input");
        timer.classList.add("mqq-timer");
        timer.type = "text";
        timer.value = "0:00";
        // add user-specific CSS
        timer.style.color = timerCol;
        timer.style.fontFamily = fontFamily;
        timer.style.fontSize = fontSize+'px';
        timer.style.lineHeight = fontSize*1.25+'px';
        timer.style.width = fontSize*5+'px';


        // Append all the quiz content elements
        hQuestion.appendChild(spanQid);
        hQuestion.appendChild(spanQuestion);
        divButtons.appendChild(buttonPrev);
        divButtons.appendChild(buttonNext);
        if (inclTimer === "true") {
          divButtons.appendChild(timer);
        }

        divFieldset.appendChild(hQuestion);
        divFieldset.appendChild(divOption);
        divFieldset.appendChild(divButtons);

        divForm.appendChild(divFieldset);
        divQuizBody.appendChild(divForm);
        divCol.appendChild(divQuizBody);
        divRow.appendChild(divCol);
        divContainer.appendChild(divRow);
        divContent.appendChild(divContainer);
        divQuiz.appendChild(divContent);

        // Append final quiz to htmlwidget container
        divWidget.appendChild(divQuiz);

        // Modify parent element (the htmlwidget div)
        // divWidget.style.border = "1px solid #999999";
        divWidget.style.borderRadius = "5px";
        if (centerWidget === "true") {
          divWidget.style.marginLeft = "auto";
          divWidget.style.marginRight = "auto";
        }
        if (scrollWidget === "true") {
          divWidget.style.overflowY = "auto";
          divWidget.style.overflowX = "hidden";
        }



        // --------------- Functions -------------------

        var quizApp = function() {

        	this.score = 0;
        	this.qno = 1;
        	this.currentque = 0;
        	var totalque = quizQuestions.length;

          // Function that generates the questions
        	this.displayQuiz = function(cque) {

        		this.currentque = cque;

        		if(this.currentque <  totalque) {
        			$(`#${widgetId} .mqq-tque`).html(totalque);
        			$(`#${widgetId} .mqq-previous`).attr("disabled", false);
        			$(`#${widgetId} .mqq-next`).attr("disabled", false);
        			$(`#${widgetId} .mqq-question-qid`).html(quizQuestions[this.currentque].id + '. ');

        			$(`#${widgetId} .mqq-question-span`).html(quizQuestions[this.currentque].question);
        			$(`#${widgetId} .mqq-option-block-container`).html("");

        			for (var key in quizQuestions[this.currentque].options[0]) {
        			  if (quizQuestions[this.currentque].options[0].hasOwnProperty(key)) {
          				$(`#${widgetId} .mqq-option-block-container`).append(
          					"<div class='mqq-option-block'>" +
          					"<label class='mqq-form-check-label'>" +
          							  "<input type='radio' class='mqq-form-check-input' name='option'   id='q"+
          							  key+"' value='"+quizQuestions[this.currentque].options[0][key]+
                          "'><span class='optionval'>" +
          								  quizQuestions[this.currentque].options[0][key] +
          							 "</span></label>");
        			  }
        			}
              // add user-specific CSS
              $(".mqq-option-block").css("color", answersCol);
              $(".mqq-option-block").css("background-color", answersBg);
              $(".mqq-option-block").hover(function(){
                $(this).css("background-color", hoverBg);
                }, function(){
                $(this).css("background-color", answersBg);
              });
              $(".optionval").css("font-size", fontSize+'px');
              $(".optionval").css("line-height", fontSize*1.5+'px');
              $(".optionval").css("margin-left", fontSize*0.875+10+'px');
              $(".mqq-form-check-input").css("width", fontSize*0.875+'px');
              $(".mqq-form-check-input").css("height", fontSize*0.875+'px');
              $(".mqq-form-check-input").css("margin-top", (fontSize*1.5-fontSize*0.875)/1.7+'px');


        		}
        		if(this.currentque <= 0) {
        			$(`#${widgetId} .mqq-previous`).attr("disabled", true);
        		}
        		if(this.currentque >= totalque) {
        				$(`#${widgetId} .mqq-next`).attr('disabled', true);
        				for(var i = 0; i < totalque; i++) {
        					this.score = this.score + quizQuestions[i].score;
        				}
        			return this.showResult(this.score);
        		}
        	};


          // Function that shows the results
        	this.showResult = function(scr) {

            // First stop timer
            if (inclTimer === "true") {
              clearInterval(timeInt);
            }

            // Replace content in the quiz-body div
        		$(`#${widgetId} .mqq-quiz-body`).addClass('result');
        		$(`#${widgetId} .mqq-quiz-body`).html("<h3 class='mqq-res-header'>Total Score: &nbsp;" +
            scr  + '/' + totalque + "</h3>");

        		for(var j = 0; j < totalque; j++) {
        			var res;
        			if(quizQuestions[j].score === 0) {
        					res = '<span class="mqq-wrong">' + quizQuestions[j].score;
        			} else {
        				res = '<span class="mqq-correct">' + quizQuestions[j].score;
        			}
        			$(`#${widgetId} .mqq-quiz-body`).append(
        			'<div class="mqq-result-question"><span>Q ' + quizQuestions[j].id + '</span> &nbsp;' + quizQuestions[j].question + '</div>' +
        			'<div class="mqq-result-answer">Correct answer: &nbsp;<span>' + quizQuestions[j].answer + '</span></div>' +
        			'<div class="mqq-last-row">Score: &nbsp;' + res + '</span></div>');
        		}

            // add user-specific CSS
            $(".mqq-res-header").css("color", mainCol);
            $(".mqq-res-header").css("font-family", fontFamily);
            $(".mqq-res-header").css("font-size", fontSize*1.75+'px');
            $(".mqq-res-header").css("line-height", fontSize*1.75+'px');
            $(".mqq-res-header").css("margin-bottom", fontSize*0.9375+'px');
            $(".mqq-res-header").css("padding-bottom", fontSize*0.9375+'px');
            $(".mqq-result-question").css("color", mainCol);
            $(".mqq-result-question").css("font-size", fontSize+'px');
            $(".mqq-result-question").css("line-height", fontSize*1.25+'px');
            $(".mqq-result-answer").css("color", mainCol);
            $(".mqq-result-answer").css("font-size", fontSize+'px');
            $(".mqq-result-answer").css("line-height", fontSize*1.25+'px');
            $(".mqq-last-row").css("color", mainCol);
            $(".mqq-last-row").css("font-size", fontSize+'px');
            $(".mqq-last-row").css("line-height", fontSize*1.25+'px');
            $(".mqq-last-row").css("color", mainCol);
            $(".mqq-last-row").css("margin-bottom", fontSize*0.9375+'px');
            $(".mqq-last-row").css("padding-bottom", fontSize*0.9375+'px');
            $(".mqq-wrong").css("margin-left", fontSize*1.25+'px');
            $(".mqq-correct").css("margin-left", fontSize*1.25+'px');



            // Add reload button (in JS instead of jQuery to have button element and not input el)
            var buttonTryagain = document.createElement("button");
            buttonTryagain.name = "tryagain";
            buttonTryagain.id = "tryagain";
            buttonTryagain.classList.add("mqq-btn", "mqq-tryagain");
            buttonTryagain.innerHTML = "Try again";
            // add user-specific CSS
            buttonTryagain.style.fontFamily = fontFamily;
            buttonTryagain.style.fontSize = fontSize+'px';
            buttonTryagain.style.lineHeight = fontSize*1.375+'px';
            buttonTryagain.style.padding = fontSize*0.375+'px ' + fontSize*0.75+'px';
            buttonTryagain.style.borderRadius = fontSize*0.25+'px';
            // Append
            $(`#${widgetId} .mqq-quiz-body`).append(buttonTryagain);
            $("#tryagain").click(function () {
                location.reload(true);
            });

          };


          // Function that starts the timer (taken from w3schools website directly)
          if (inclTimer === "true") {
            var timeInt;  // need to set global variable for clearInterval
            this.startTimer = function() {
              var tobj = document.querySelector(`#${widgetId} .mqq-timer`);
              var t = "0:00";
              var s = 00;
              var d = new Date();
              timeInt = setInterval(function () {
                s += 1;
                d.setMinutes("0");
                d.setSeconds(s);
                min = d.getMinutes();
                sec = d.getSeconds();
                if (sec < 10) sec = "0" + sec;
                document.querySelector(`#${widgetId} .mqq-timer`).value = min + ":" + sec;
              }, 1000);
              tobj.value = t;
            }
            if (window.addEventListener) {
              window.addEventListener("load", this.startTimer);
            } else if (window.attachEvent) {
              window.attachEvent("onload", this.startTimer);
            }
          }


          // Function that checks the answers
        	this.checkAnswer = function(option) {
        		var answer = quizQuestions[this.currentque].answer;
        		option = option.replace(/\</g,"&lt;");   //for <
        		option = option.replace(/\>/g,"&gt;");   //for >
        		option = option.replace(/"/g, "&quot;");

        		if(option ==  quizQuestions[this.currentque].answer) {
        			if(quizQuestions[this.currentque].score == "") {
        				quizQuestions[this.currentque].score = 1;
        				quizQuestions[this.currentque].status = "correct";
        		}
        		} else {
        			quizQuestions[this.currentque].status = "wrong";
        		}
        	};


          // Function that changes slides
        	this.changeQuestion = function(cque) {
        			this.currentque = this.currentque + cque;
        			this.displayQuiz(this.currentque);
        	};


        // end of quizApp wrapper function
        };


        var jsq = new quizApp();

        var selectedopt;
        $(document).ready(function() { // loads document fully before this jQuery code is run
            jsq.displayQuiz(0);
        	   $(`#${widgetId} .mqq-option-block-container`).on('change', 'input[type=radio][name=option]', function(e) {
        	      $(this).prop("checked", true);
        		    selectedopt = $(this).val();
        		});
        	});

      	$(`#${widgetId} .mqq-next`).click(function(e) {
      			e.preventDefault();
      			if(selectedopt) {
      				jsq.checkAnswer(selectedopt);
      			}
            // clear variable in case next question is not answered
            selectedopt = "";
      			jsq.changeQuestion(1);
      	});

      	$(`#${widgetId} .mqq-previous`).click(function(e) {
      		e.preventDefault();
      		if(selectedopt) {
      			jsq.checkAnswer(selectedopt);
      		}
      			jsq.changeQuestion(-1);
      	});


      // end of renderValue Function
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
