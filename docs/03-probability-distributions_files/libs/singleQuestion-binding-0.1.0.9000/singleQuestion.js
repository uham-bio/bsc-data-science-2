HTMLWidgets.widget({

  name: 'singleQuestion',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // --------------- Get questions from R function and all other variables --------

        //var qString = x.question;
        //var cleanedString = qString.replace(/'/g, '"');
        var myQuestion = JSON.parse(x.question);
        var nOpt = myQuestion[1].length;

        // Get ID frim htmlwidget container
        var widgetId = document.getElementById(el.id).id;

        // Get title
        title = x.title;

        // Get few style params
        var centerWidget = x.center;
        var scrollWidget = x.scroll;
        var fontFamily = x.fontFamily;
        var fontSize = x.fontSize;
        var titleCol = x.titleCol;
        var titleBg = x.titleBg;
        var titleFontSize = x.titleFontSize;

        // Create vars
        var lettCap = ["A","B","C","D","E","F","G","H","I","J","K",
        	"L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        var lett = [];
        for (let i = 0; i < lettCap.length; i++) {
        	lett[i] = lettCap[i].toLowerCase();
        }

        // ------------ Create all HTML elements -----------------------

        var divWidget = document.getElementById(el.id);

        // QUIZ CONTAINER
        var divQuiz = document.createElement("div");
        divQuiz.classList.add("sqq-quiz");
        if (scrollWidget === "true") {
          divWidget.style.overflowY = "auto";
          divWidget.style.overflowX = "hidden";
        }


        // TITLE
        var qTitle = title;
        if (qTitle !== "NULL") {
          var pTitle = document.createElement("p");
          pTitle.classList.add("sqq-quiz-title");
          pTitle.innerHTML = qTitle;
          // add user-specific CSS
          pTitle.style.color = titleCol;
          pTitle.style.backgroundColor = titleBg;
          pTitle.style.fontFamily = fontFamily;
          pTitle.style.fontSize = titleFontSize+'px';
          pTitle.style.padding = titleFontSize*0.75+ 'px 20px';
          // Set CSS style here as it gets otherwise overwritten from general style
          pTitle.style.fontWeight = '900';
          pTitle.style.margin = '0 auto';
          pTitle.style.textAlign = 'center';
          // Append
				  divQuiz.appendChild(pTitle);
        }

        // QUESTION CONTAINER
        var divQuestion = document.createElement("div");
        divQuestion.classList.add("sqq-question");

        // Actual question text
        var pQuestion = document.createElement("p");
        pQuestion.classList.add("sqq-question-p");
        pQuestion.innerHTML = myQuestion[0];
        // add user-specific CSS
        pQuestion.style.fontFamily = fontFamily;
        pQuestion.style.fontSize = fontSize+'px';
        pQuestion.style.lineHeight = fontSize*1.25+'px';
        pQuestion.style.padding = fontSize*0.9+ 'px 20px';


        // Append above HTML elements to quiz container
        divQuestion.appendChild(pQuestion);
        divQuiz.appendChild(divQuestion);


				// OPTION CONTAINER
        var optionContainer = document.createElement("div");
        optionContainer.classList.add("sqq-options-container");

        // Each question in an individual row.option element
        for (let i = 0; i < nOpt; i++) {

          let rowOption = document.createElement("div");
          rowOption.classList.add("sqq-option-row");
          rowOption.id = `sqq-row-${lett[i]}`;
          // add user-specific CSS
          rowOption.style.minHeight = fontSize*3.75+'px';

					// Create 2 columns inside row
					let colOption1 = document.createElement("div");
					colOption1.classList.add("sqq-option-cols", "sqq-option-col1");
          colOption1.style.width = 40+fontSize*1.25*2*1.25+'px';
          colOption1.style.flex = '0 0 '+ (40+fontSize*1.25*2*1.25)+'px';

					let colOption2 = document.createElement("div");
					colOption2.classList.add("sqq-option-cols", "sqq-option-col2", "sqq-clearfix");

          let divLett = document.createElement("div");
          divLett.classList.add("sqq-div-letter");
          // add user-specific CSS
          divLett.style.height = fontSize*1.25*2+'px';
          divLett.style.width =  fontSize*1.25*2*1.25+'px';

          let pLett = document.createElement("p");
          pLett.classList.add("sqq-p-lett");
          pLett.innerHTML = lettCap[i];
          // add user-specific CSS
          pLett.style.fontFamily = fontFamily;
          pLett.style.fontSize = fontSize*1.25+'px';
          pLett.style.lineHeight = fontSize*1.25+'px';
          pLett.style.paddingTop = fontSize*1.25/2+'px';
          pLett.style.paddingBottom = fontSize*1.25/2+'px';

					let divText = document.createElement("div");
					divText.classList.add("sqq-div-text");

          let pText = document.createElement("p");
          pText.classList.add("sqq-p-text");
          pText.innerHTML = myQuestion[1][i];
          pText.style.fontFamily = fontFamily;
          pText.style.fontSize = fontSize+'px';
          pText.style.lineHeight = fontSize*1.25+'px';
          pText.style.paddingTop = fontSize*1.25+ 'px';
          pText.style.paddingBottom = fontSize*1.25+ 'px';
          pText.style.paddingLeft = '0';
          pText.style.paddingRight = '20px';

          // Now append all the HTML elements belonging to each option
          divLett.appendChild(pLett);
          colOption1.appendChild(divLett);
          divText.appendChild(pText);
          colOption2.appendChild(divText);

          rowOption.appendChild(colOption1);
          rowOption.appendChild(colOption2);
          // in each iteration append row
          optionContainer.appendChild(rowOption);

        }

        // Now append all option container to quiz container
        divQuiz.appendChild(optionContainer);
        // Append final quiz to htmlwidget container
        divWidget.appendChild(divQuiz);


        // Modify parent element (the htmlwidget div)
        divWidget.style.borderRadius = "5px";
        if (centerWidget === "true") {
          divWidget.style.marginLeft = "auto";
          divWidget.style.marginRight = "auto";
        }


        // --------------- Functions -------------------

        // Function to animate mouse hovering over options
        function letterHover(item) {
          $(item).hover(function() {
            $(item + ' .sqq-div-letter').css("background-color", "#2677B6");
          }, function() {
            $(item + ' .sqq-div-letter').css("background-color", "#469BDC");
          });
        }

        // Apply letterHover function to each answer option
        for (let i = 0; i < nOpt; i++) {
          letterHover(`#${widgetId} #sqq-row-${lett[i]}`);
        }

        // Functions for the color changing as feedback
        function isCorrect() {
          $(`#${widgetId} .sqq-question`).css("background-color", "#46a346");
          $(`#${widgetId} .sqq-question-p`).css("color", "white");
        }

        function isWrong() {
          $(`#${widgetId} .sqq-question`).css("background-color", "#CB382F");
          $(`#${widgetId} .sqq-question-p`).css("color", "white");
        }


        // Function to check result
        function answer(item, bool) {
          if (bool === true) {
            $(item).click(function() {
              isCorrect();
            });

          } else if (bool === false) {
            $(item).click(function() {
              isWrong();
            });
          }
        }

        // Apply answer function to each answer option
        for (let j = 0; j < nOpt; j++) {
          let corrAns =  myQuestion[1][j] === myQuestion[2];
          answer(`#${widgetId} #sqq-row-${lett[j]}`, corrAns);
        }


      // end of renderValue Function
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
