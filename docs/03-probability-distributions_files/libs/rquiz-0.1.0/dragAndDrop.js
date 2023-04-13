HTMLWidgets.widget({

  name: 'dragAndDrop',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // --------------- Get questions from R function and all other variables --------

        var quizCloze = x.convCloze;
        var quizOptions = x.convOptions;

        // Get ID from htmlwidget container
        var widgetId = document.getElementById(el.id).id;

        // Get title and description
        var title = x.title;
        var descript = x.descript;

        // Get few style params
        var centerWidget = x.center;
        var scrollWidget = x.scroll;
        var fontFamily = x.fontFamily;
        var fontSize = x.fontSize;
        var titleFontSize = x.titleFontSize;
        var descriptFontSize = x.descriptFontSize;
        var titleCol = x.titleCol;
        var titleBg = x.titleBg;
        var mainBg = x.mainBg;
        var clozeCol = x.clozeCol;
        var clozeWidth = x.clozeWidth;
        var clozeHeight = x.clozeHeight;
        var blanksBg = x.blanksBg;
        var blanksWidth = x.blanksWidth;
        var blanksAlign = x.blanksAlign;
        var optionsCol = x.optionsCol;
        var optionsBg = x.optionsBg;


        // ------------ Create all HTML elements -----------------------

        var divWidget = document.getElementById(el.id);

        // var divWidget = document.getElementById(el.id);
        var divWidget = document.getElementById(widgetId);
        console.log(widgetId);

        // QUIZ CONTAINER
        var divQuiz = document.createElement("div");
        divQuiz.classList.add("ddq-quiz");
        // add user-specific CSS
        divQuiz.style.backgroundColor = mainBg;
        divQuiz.style.fontFamily = fontFamily;
        divQuiz.style.fontSize = fontSize+'px';


        // HEADER PART

        var divHeader = document.createElement("div");
        divHeader.classList.add("ddq-header");
        // add user-specific CSS
        divHeader.style.color = titleCol;
        divHeader.style.backgroundColor = titleBg;
        if (title !== "NULL" || descript !== "NULL") {
          divHeader.style.padding = fontSize*0.625+'px 20px';
        } else {
          divHeader.style.padding = '0';
        }
        // Append to divQuiz
        divQuiz.appendChild(divHeader);

        if (title !== "NULL") {
          var pTitle = document.createElement("p");
          pTitle.classList.add("ddq-title");
          pTitle.innerHTML = title;
          // add user-specific CSS
          pTitle.style.color = titleCol;
          pTitle.style.backgroundColor = titleBg;
          pTitle.style.fontFamily = fontFamily;
          pTitle.style.fontSize = titleFontSize+'px';
          pTitle.style.margin = '0 0 '+titleFontSize*0.2+'px 0';
          // Append to divHeader
          divHeader.appendChild(pTitle);
        }
        if (descript !== "NULL") {
          var pDescript = document.createElement("p");
          pDescript.classList.add("ddq-description");
          pDescript.innerHTML = descript;
          // add user-specific CSS
          pDescript.style.color = titleCol;
          pDescript.style.backgroundColor = titleBg;
          pDescript.style.fontFamily = fontFamily;
          pDescript.style.fontSize = descriptFontSize+'px';
          // Append to divHeader
          divHeader.appendChild(pDescript);
        }


        // CLOZE PART
        var divCloze = document.createElement("div");
        divCloze.classList.add("ddq-cloze");
        divCloze.innerHTML = quizCloze;
        // add user-specific CSS
        divCloze.style.color = clozeCol;
        divCloze.style.width = clozeWidth;
        divCloze.style.fontFamily = fontFamily;
        divCloze.style.fontSize = fontSize+'px';
        divCloze.style.lineHeight = fontSize*2.5+'px';
        divCloze.style.margin = '0 0 '+fontSize*0.3+'px 0';
        divCloze.style.marginTop = fontSize*1.25+'px';
        divCloze.style.marginBottom = fontSize*1.25+'px';
        if (clozeHeight !== "NULL") {
          divCloze.style.minHeight = clozeHeight;
        }
        // Append to divQuiz
        divQuiz.appendChild(divCloze);


        // OPTION PART
        var divContainer = document.createElement("div");
        divContainer.classList.add("ddq-options-container");
        // add user-specific CSS
        divContainer.style.backgroundColor = optionsBg;
        divContainer.style.color = optionsCol;
        divContainer.style.paddingTop = fontSize*0.5+'px';
        divContainer.style.paddingBottom = fontSize*0.5+'px';

        var divOptions= document.createElement("div");
        divOptions.classList.add("ddq-options");
        divOptions.innerHTML = quizOptions;
        // add user-specific CSS
        divOptions.style.lineHeight = fontSize*1.5+'px';
        divOptions.style.padding = fontSize*0.3+'px';
        // Append
        divContainer.appendChild(divOptions);
        divQuiz.appendChild(divContainer);


        // FEEDBACK PART
        var divLightbox = document.createElement("div");
        divLightbox.classList.add("ddq-lightbox-bg");
        var divConfirm = document.createElement("div");
        divConfirm.classList.add("ddq-confirm");
        var pConfirm = document.createElement("p");
        pConfirm.classList.add("ddq-confirm-p");
        pConfirm.innerHTML = "Well done!"
        // Append
        divConfirm.appendChild(pConfirm);
        divLightbox.appendChild(divConfirm);
        divQuiz.appendChild(divLightbox);


        // Append final quiz to htmlwidget container
        divWidget.appendChild(divQuiz);

        // Modify parent element (the htmlwidget div)
        divWidget.style.borderRadius = "5px";
        if (centerWidget === "true") {
          divWidget.style.marginLeft = "auto";
          divWidget.style.marginRight = "auto";
        }
        if (scrollWidget === "true") {
          divWidget.style.overflowY = "auto";
          divWidget.style.overflowX = "hidden";
        }




        // ------------ Functions ----------------

        $(document).ready( function() {

          // Set additional CSS style (of elements provided from R)
          $(`#${widgetId} .ddq-target`).css("width", blanksWidth);
          $(`#${widgetId} .ddq-target`).css("background", blanksBg);
          $(`#${widgetId} .ddq-target`).css("text-align", blanksAlign);
          $(`#${widgetId} .ddq-target`).css("line-height", fontSize*2+'px');
          $(`#${widgetId} .ddq-target`).css("margin", '0 '+fontSize*0.0005+'px');
          $(`#${widgetId} .ddq-target`).css("padding", '0 ' + fontSize*0.6+'px');
          $(`#${widgetId} .ddq-option`).css("color", optionsCol);
          $(`#${widgetId} .ddq-option`).css("background", blanksBg);
          $(`#${widgetId} .ddq-option`).css("margin", fontSize*0.5+'px ' + fontSize*0.4+'px');
          $(`#${widgetId} .ddq-option`).css("padding", fontSize*0.2+'px ' + fontSize*0.6+'px');
          // CSS style of elements handed over in the cloze text
          $(`#${widgetId} .ddq-cloze pre`).css("font-size", fontSize);
          $(`#${widgetId} .ddq-cloze pre`).css("color", clozeCol);
          $(`#${widgetId} .ddq-cloze pre`).css("line-height", fontSize*2.5+'px');
          $(`#${widgetId} .ddq-cloze pre`).css("border", "none");
          // $(`#${widgetId} .ddq-cloze pre`).css("background", "none");


          //initialize the quiz options
          var answersLeft = [];


          // $('.ddq-quiz').find('span.ddq-option').each( function(i) {
          $(`#${widgetId} .ddq-quiz`).find('span.ddq-option').each( function(i) {

            var $this = $(this);
            var answerValue = $this.data('target');
            var $target = $(`#${widgetId} .ddq-cloze .ddq-target[data-accept=${answerValue}]`);
            var labelText = $this.html();
            //  folgende 3 Zeilen geben Fehlermeldung wenn ich andere Quizform in Slideshow packe
            $this.draggable( {
              revert: "invalid",
              containment: `#${widgetId} .ddq-quiz`
            });

            if ( $target.length > 0 ) {
            $target.droppable( {
                accept: 'span.ddq-option[data-target="'+answerValue+'"]',
                drop: function( event, ui ) {
                  $this.draggable('destroy');
                  $target.droppable('destroy');
                  $this.html('&nbsp;');
                  $this.css("background", "none");
                  $target.html(labelText);
                  answersLeft.splice( answersLeft.indexOf( answerValue ), 1 );
                }
            });
            answersLeft.push(answerValue);
            } else { }

            // end of loop function
           });

           // Give feedback immediately after last blank is filled
           function checkAnswers () {
             if ( answersLeft.length === 0 ) {
               $(`#${widgetId} .ddq-lightbox-bg`).show();
               $(`#${widgetId} .ddq-confirm`).show();
               $(`#${widgetId} .ddq-lightbox-bg`).click( function() {
                  $(`#${widgetId} .ddq-lightbox-bg`).hide();
                 $(`#${widgetId} .ddq-confirm`).hide();
                 $(`#${widgetId} .ddq-lightbox-bg`).unbind('click');
               });
               clearInterval(constantChecking);
             }
           }
           // Call function constantly for the timing the feedback right
           var constantChecking = setInterval(checkAnswers, 5000);


           // end of wrapper function
        });


      // end of renderValue Function
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
