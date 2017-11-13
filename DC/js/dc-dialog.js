// Determines State of Quiz and Displays Dialogs Accordingly.

function start_dc_section() {
   var dc_ques_state = 0;
   var dc_sel_char = 3;

   // Get dc_ques_state from Database i.e. First Login = 0, Resumed from a previous quiz = 1, Quiz over = 2

   if (dc_ques_state == 0) {
      dc_disp_first_login();
   } else if (dc_ques_state == 1) {
      // Fetch Selected Character from Database and store it in dc_sel_char
      // Display Dialogs specific to Selected Character as obtained
      disp_dialog_step_resume(dc_sel_char);
   } else {
      // Fetch Selected Charater from Database and store it in dc_sel_char
      // Display Ending Dialogs
      dc_disp_dialog_char_finished(dc_sel_char);
   }
}

// First Time User Login Dialog

function dc_disp_first_login() {
   document.getElementById('steppenwolf').style.display = 'block';
   document.getElementById('steppenwolf-dialog').style.display = 'block';
   setTimeout('step_first_dialog()', 1800);
   setTimeout('dc_cont()', 4000);
   setTimeout('dc_add_click_cont()', 4520);
}

var stepFirstText = new Array("No protectors here. No Lanterns. No Kryptonian. This world will fall, like all the others.", "Who dares to challenge me?");
var stepFirstSpeed = 10; // time delay of print out
var stepFirstIndex = 0; // start printing array at this posision
var stepFirstArrLength = stepFirstText[0].length; // the length of the text array
var stepFirstScrollAt = 20; // start scrolling up at this many lines
var stepFirstTextPos = 0; // initialise text position
var stepFirstContents = ''; // initialise contents variable
var stepFirstRow; // initialise current row
function step_first_dialog() {
   stepFirstContents = ' ';
   stepFirstRow = Math.max(0, stepFirstIndex - stepFirstScrollAt);
   var destination = document.getElementById("dc-typedtext");
   while (stepFirstRow < stepFirstIndex) {
      stepFirstContents += stepFirstText[stepFirstRow++] + '<br />';
   }
   destination.innerHTML = stepFirstContents + stepFirstText[stepFirstIndex].substring(0, stepFirstTextPos) + "<span class='dc-cursor'>|</span>";
   if (stepFirstTextPos++ == stepFirstArrLength) {
      stepFirstTextPos = 0;
      stepFirstIndex++;
      if (stepFirstIndex != stepFirstText.length) {
         stepFirstArrLength = stepFirstText[stepFirstIndex].length;
         setTimeout("step_first_dialog()", 10);
      }
   } else {
      setTimeout("step_first_dialog()", stepFirstSpeed);
   }
}

// Click Anywhere to Continue text

var dc_contText = new Array("Click Anywhere To Continue");
var dc_contSpeed = 10; // time delay of print out
var dc_contIndex = 0; // start printing array at this posision
var dc_contArrLength = dc_contText[0].length; // the length of the text array
var dc_contScrollAt = 20; // start scrolling up at this many lines
var dc_contTextPos = 0; // initialise text position
var dc_contContents = ''; // initialise contents variable
var dc_contRow; // initialise current row

function dc_cont() {
   dc_contContents = ' ';
   dc_contRow = Math.max(0, dc_contIndex - dc_contScrollAt);
   var dc_contdestination = document.getElementById("dc-continue");
   while (dc_contRow < dc_contIndex) {
      dc_contContents += dc_contText[dc_contRow++] + '<br />';
   }
   dc_contdestination.innerHTML = dc_contContents + dc_contText[dc_contIndex].substring(0, dc_contTextPos) + "<span class='dc-cont-cursor'>_</span>";
   if (dc_contTextPos++ == dc_contArrLength) {
      dc_contTextPos = 0;
      dc_contIndex++;
      if (dc_contIndex != dc_contText.length) {
         dc_contArrLength = dc_contText[dc_contIndex].length;
         setTimeout("dc_cont()", 10);
      }
   } else {
      setTimeout("dc_cont()", dc_contSpeed);
   }
}

// Unknown Character Dialog

var dc_unknText = new Array("I am ........");
var dc_unknSpeed = 10; // time delay of print out
var dc_unknIndex = 0; // start printing array at this posision
var dc_unknArrLength = dc_unknText[0].length; // the length of the text array
var dc_unknScrollAt = 20; // start scrolling up at this many lines
var dc_unknTextPos = 0; // initialise text position
var dc_unknContents = ''; // initialise contents variable
var dc_unknRow; // initialise current row

function dc_unkn_dialog_writer() {
   dc_unknContents = ' ';
   dc_unknRow = Math.max(0, dc_unknIndex - dc_unknScrollAt);
   var dc_unkndestination = document.getElementById("dc-unkn-typedtext");
   while (dc_unknRow < dc_unknIndex) {
      dc_unknContents += dc_unknText[dc_unknRow++] + '<br />';
   }
   dc_unkndestination.innerHTML = dc_unknContents + dc_unknText[dc_unknIndex].substring(0, dc_unknTextPos) + "<span class='dc-cursor'>|</span>";
   if (dc_unknTextPos++ == dc_unknArrLength) {
      dc_unknTextPos = 0;
      dc_unknIndex++;
      if (dc_unknIndex != dc_unknText.length) {
         dc_unknArrLength = dc_unknText[dc_unknIndex].length;
         setTimeout("dc_unkn_writer()", 10);
      }
   } else {
      setTimeout("dc_unkn_dialog_writer()", dc_unknSpeed);
   }
}

//Adds the first onclick to display unknown character dialog

function dc_add_click_cont() {
   document.getElementById('dc-div').setAttribute('onclick', 'dc_click_cont()');
}

//The first onclick to display cards

function dc_click_cont() {
   document.getElementById('dc-continue').innerHTML = '';
   document.getElementById('steppenwolf').style.display = 'none';
   document.getElementById('steppenwolf-dialog').style.display = 'none';
   document.getElementById('dc-unknown').style.display = 'block';
   document.getElementById('dc-unknown-dialog').style.display = 'block';
   setTimeout('dc_unkn_dialog_writer()', 1800);
   setTimeout('dc_disp_cards()', 3000);
}

function dc_disp_cards() {
   swiper.update();
   document.getElementsByClassName('dc-swiper-container')[0].style.setProperty('z-index', 50, 'important');
   document.getElementById('dc-div').removeAttribute('onclick');
   document.getElementById('dc-unknown').style.display = 'none';
   document.getElementById('dc-unknown-dialog').style.display = 'none';
   document.getElementById('dc-confirm-div').style.display = 'block';
}

function dc_hide_cards() {
   document.getElementsByClassName('dc-swiper-container')[0].style.setProperty('z-index', -1, 'important');
   document.getElementById('dc-div').removeAttribute('onclick');
}

// Character Dialogs

var dc_chText = new Array("Display name");
var dc_chName = ["Superman", "Wonder Woman", "Batman", "Green Lantern", "Flash", "Aquaman"];
var dc_chDialog = ["You picked the wrong time pal. If we fight we fight for real. I have Earth covered, This world needs me.", "A beast like you doesn't scare me. You face a goddess of war. You'd be wise to surrender.", "I have had enough of your banter. Crashing into a wall head on will be least painful activity of your evening.", "Beware my Power, Get out of my sector now or you are going to regret this one.", "And You are not getting away with this. Speed is my game so let's see what you got.", "Surrender and I won't break your bones. The Trident is formidable, I will mow you down like seaweed."];
var dc_chSpeed = 10; // time delay of print out
var dc_chIndex = 0; // start printing array at this posision
var dc_chArrLength = dc_chText[0].length; // the length of the text array
var dc_chScrollAt = 20; // start scrolling up at this many lines
var dc_chTextPos = 0; // initialise text position
var dc_chContents = ''; // initialise contents variable
var dc_chRow; // initialise current row

function dc_char_dialog_writer(dc_sel_char) {
   dc_chText = new Array("I am " + dc_chName[dc_sel_char], dc_chDialog[dc_sel_char]);
   dc_chContents = ' ';
   dc_chRow = Math.max(0, dc_chIndex - dc_chScrollAt);
   var dc_chdestination = document.getElementsByClassName('dc-char-typedtext')[dc_sel_char];
   while (dc_chRow < dc_chIndex) {
      dc_chContents += dc_chText[dc_chRow++] + '<br />';
   }
   dc_chdestination.innerHTML = dc_chContents + dc_chText[dc_chIndex].substring(0, dc_chTextPos) + "<span class='dc-cursor'>|</span>";
   if (dc_chTextPos++ == dc_chArrLength) {
      dc_chTextPos = 0;
      dc_chIndex++;
      if (dc_chIndex != dc_chText.length) {
         dc_chArrLength = dc_chText[dc_chIndex].length;
         setTimeout("dc_char_dialog_writer(" + dc_sel_char + ")", 10);
      }
   } else {
      setTimeout("dc_char_dialog_writer(" + dc_sel_char + ")", dc_chSpeed);
   }
}

function dc_disp_dialog_char(dc_sel_char) {
   dc_hide_cards();
   document.getElementsByClassName('dc-char')[dc_sel_char].style.display = 'block';
   document.getElementsByClassName('dc-char-dialog')[dc_sel_char].style.display = 'block';
   setTimeout('dc_char_dialog_writer(' + dc_sel_char + ')', 1800);
   setTimeout('dc_add_cont_2nd(' + dc_sel_char + ')', 3400);
}

// Add Continue after Char Dialog Over in First Login

function dc_add_cont_2nd(dc_sel_char) {
   document.getElementById('dc-div').setAttribute('onclick', 'dc_click_cont_2nd(' + dc_sel_char + ')');
   dc_contText = new Array("Click Anywhere To Continue");
   dc_contSpeed = 10; // time delay of print out
   dc_contIndex = 0; // start printing array at this posision
   dc_contArrLength = dc_contText[0].length; // the length of the text array
   dc_contScrollAt = 20; // start scrolling up at this many lines
   dc_contTextPos = 0; // initialise text position
   dc_contContents = ''; // initialise contents variable
   dc_cont();
}

function dc_click_cont_2nd(dc_sel_char) {
   document.getElementById('dc-continue').innerHTML = '';
   document.getElementsByClassName('dc-char')[dc_sel_char].style.display = 'none';
   document.getElementsByClassName('dc-char-dialog')[dc_sel_char].style.display = 'none';
   document.getElementById('steppenwolf').style.display = 'block';
   document.getElementById('steppenwolf-dialog').style.display = 'block';
   document.getElementById("dc-typedtext").innerHTML = '';
   setTimeout('step_counter_dialog_writer()', 1800);
   setTimeout('dc_add_click_cont_ques(' + dc_sel_char + ')', 3400);
}

// Steppenwolf's Counter Dialog to Selected Character's Threat

var dc_stepText = new Array("Ohh you are gonna regret saying that.", "Your enthusiasm is premature. I will crush you like a nut.");
var dc_stepSpeed = 10; // time delay of print out
var dc_stepIndex = 0; // start printing array at this posision
var dc_stepArrLength = dc_stepText[0].length; // the length of the text array
var dc_stepScrollAt = 20; // start scrolling up at this many lines
var dc_stepTextPos = 0; // initialise text position
var dc_stepContents = ''; // initialise contents variable
var dc_stepRow; // initialise current row
function step_counter_dialog_writer() {
   document.getElementById('dc-div').removeAttribute('onclick');
   dc_stepContents = ' ';
   dc_stepRow = Math.max(0, dc_stepIndex - dc_stepScrollAt);
   var dc_stepdestination = document.getElementById("dc-typedtext");
   while (dc_stepRow < dc_stepIndex) {
      dc_stepContents += dc_stepText[dc_stepRow++] + '<br />';
   }
   dc_stepdestination.innerHTML = dc_stepContents + dc_stepText[dc_stepIndex].substring(0, dc_stepTextPos) + "<span class='dc-cursor'>|</span>";
   if (dc_stepTextPos++ == dc_stepArrLength) {
      dc_stepTextPos = 0;
      dc_stepIndex++;
      if (dc_stepIndex != dc_stepText.length) {
         dc_stepArrLength = dc_stepText[dc_stepIndex].length;
         setTimeout("step_counter_dialog_writer()", 10);
      }
   } else {
      setTimeout("step_counter_dialog_writer()", dc_stepSpeed);
   }
}

// Adds the Click Continue to Display Ques Div.

function dc_add_click_cont_ques(dc_sel_char) {
   document.getElementById('dc-div').setAttribute('onclick', 'dc_click_cont_ques(' + dc_sel_char + ')');
   dc_contText = new Array("Click Anywhere To Continue");
   dc_contSpeed = 10; // time delay of print out
   dc_contIndex = 0; // start printing array at this posision
   dc_contArrLength = dc_contText[0].length; // the length of the text array
   dc_contScrollAt = 20; // start scrolling up at this many lines
   dc_contTextPos = 0; // initialise text position
   dc_contContents = ''; // initialise contents variable
   dc_cont();
}

function dc_click_cont_ques(dc_sel_char) {
   document.getElementById('dc-div').removeAttribute('onclick');
   document.getElementById('dc-continue').innerHTML = '';
   document.getElementById('steppenwolf').style.display = 'none';
   document.getElementById('steppenwolf-dialog').style.display = 'none';
   document.getElementById("dc-typedtext").innerHTML = '';
   alert('Questions Pop Up!!!!');
   alert('Char Selected Index : ' + dc_sel_char);
   // Open Questions Div with dc_sel_char as index of character selected 
}

// Resume Game Dialogs

function disp_dialog_step_resume(dc_sel_char) {
   document.getElementById('steppenwolf').style.display = 'block';
   document.getElementById('steppenwolf-dialog').style.display = 'block';
   setTimeout('resume_step_dialog()', 1800);
   setTimeout('dc_add_cont_resume(' + dc_sel_char + ')', 3400);
}

var dc_resumeText = new Array("Back for some more beating I see.. This will be good hunting.", "Parademons Attack!!");
var dc_resumeSpeed = 10; // time delay of print out
var dc_resumeIndex = 0; // start printing array at this posision
var dc_resumeArrLength = dc_resumeText[0].length; // the length of the text array
var dc_resumeScrollAt = 20; // start scrolling up at this many lines
var dc_resumeTextPos = 0; // initialise text position
var dc_resumeContents = ''; // initialise contents variable
var dc_resumeRow; // initialise current row
function resume_step_dialog() {
   dc_resumeContents = ' ';
   dc_resumeRow = Math.max(0, dc_resumeIndex - dc_resumeScrollAt);
   var dc_resumedestination = document.getElementById("dc-typedtext");
   while (dc_resumeRow < dc_resumeIndex) {
      dc_resumeContents += dc_resumeText[dc_resumeRow++] + '<br />';
   }
   dc_resumedestination.innerHTML = dc_resumeContents + dc_resumeText[dc_resumeIndex].substring(0, dc_resumeTextPos) + "<span class='dc-cursor'>|</span>";
   if (dc_resumeTextPos++ == dc_resumeArrLength) {
      dc_resumeTextPos = 0;
      dc_resumeIndex++;
      if (dc_resumeIndex != dc_resumeText.length) {
         dc_resumeArrLength = dc_resumeText[dc_resumeIndex].length;
         setTimeout("resume_step_dialog()", 10);
      }
   } else {
      setTimeout("resume_step_dialog()", dc_resumeSpeed);
   }
}

function dc_add_cont_resume(dc_sel_char) {
   document.getElementById('dc-div').setAttribute('onclick', 'dc_click_cont_resume(' + dc_sel_char + ')');
   dc_contText = new Array("Click Anywhere To Continue");
   dc_contSpeed = 10; // time delay of print out
   dc_contIndex = 0; // start printing array at this posision
   dc_contArrLength = dc_contText[0].length; // the length of the text array
   dc_contScrollAt = 20; // start scrolling up at this many lines
   dc_contTextPos = 0; // initialise text position
   dc_contContents = ''; // initialise contents variable
   dc_cont();
}

function dc_click_cont_resume(dc_sel_char) {
   document.getElementById('dc-div').removeAttribute('onclick');
   document.getElementById('dc-continue').innerHTML = '';
   document.getElementById('steppenwolf').style.display = 'none';
   document.getElementById('steppenwolf-dialog').style.display = 'none';
   document.getElementById("dc-typedtext").innerHTML = '';
   alert('Questions Pop Up!!!!');
   alert('Char Selected Index : ' + dc_sel_char);
   // Open Questions Div with dc_sel_char as index of character selected 
}

// Finished Game Dialogs

function dc_disp_dialog_char_finished(dc_sel_char) {
   document.getElementsByClassName('dc-char')[dc_sel_char].style.display = 'block';
   document.getElementsByClassName('dc-char-dialog')[dc_sel_char].style.display = 'block';
   setTimeout('dc_char_dialog_finished_writer(' + dc_sel_char + ')', 1800);
   setTimeout('dc_add_cont_finished(' + dc_sel_char + ')', 3400);
}

var dc_finished_chText = new Array("Display name");
var dc_finished_chName = ["Superman", "Wonder Woman", "Batman", "Green Lantern", "Flash", "Aquaman"];
var dc_finished_chDialog = ["I am going to Guard Earth until I die..", "The Daughter of Zeus can't fail.. I have wrestled with the Gods", "What part of Dark Knight don't you get? Let me give you something to fear.", "The Ring will help me protect the Earth from Evil like you.", "I'm Flash, The fastest man alive. You could never keep up with me.", "The Trident never fails. Now leave my people at peace or I won't hesitate to break all your bones."];
var dc_finished_chSpeed = 10; // time delay of print out
var dc_finished_chIndex = 0; // start printing array at this posision
var dc_finished_chArrLength = dc_finished_chText[0].length; // the length of the text array
var dc_finished_chScrollAt = 20; // start scrolling up at this many lines
var dc_finished_chTextPos = 0; // initialise text position
var dc_finished_chContents = ''; // initialise contents variable
var dc_finished_chRow; // initialise current row

function dc_char_dialog_finished_writer(dc_sel_char) {
   dc_finished_chText = new Array("You never stood a chance Stepenwolf.", dc_finished_chDialog[dc_sel_char]);
   dc_finished_chContents = ' ';
   dc_finished_chRow = Math.max(0, dc_finished_chIndex - dc_finished_chScrollAt);
   var dc_finished_chdestination = document.getElementsByClassName('dc-char-typedtext')[dc_sel_char];
   while (dc_finished_chRow < dc_finished_chIndex) {
      dc_finished_chContents += dc_finished_chText[dc_finished_chRow++] + '<br />';
   }
   dc_finished_chdestination.innerHTML = dc_finished_chContents + dc_finished_chText[dc_finished_chIndex].substring(0, dc_finished_chTextPos) + "<span class='dc-cursor'>|</span>";
   if (dc_finished_chTextPos++ == dc_finished_chArrLength) {
      dc_finished_chTextPos = 0;
      dc_finished_chIndex++;
      if (dc_finished_chIndex != dc_finished_chText.length) {
         dc_finished_chArrLength = dc_finished_chText[dc_finished_chIndex].length;
         setTimeout("dc_char_dialog_finished_writer(" + dc_sel_char + ")", 10);
      }
   } else {
      setTimeout("dc_char_dialog_finished_writer(" + dc_sel_char + ")", dc_finished_chSpeed);
   }
}

// Adds Finished Click Continue to Display step's Finished Dialog

function dc_add_cont_finished(dc_sel_char) {
   document.getElementById('dc-div').setAttribute('onclick', 'dc_click_cont_finished(' + dc_sel_char + ')');
   dc_contText = new Array("Click Anywhere To Continue");
   dc_contSpeed = 10; // time delay of print out
   dc_contIndex = 0; // start printing array at this posision
   dc_contArrLength = dc_contText[0].length; // the length of the text array
   dc_contScrollAt = 20; // start scrolling up at this many lines
   dc_contTextPos = 0; // initialise text position
   dc_contContents = ''; // initialise contents variable
   dc_cont();
}

function dc_click_cont_finished(dc_sel_char) {
   document.getElementById('dc-continue').innerHTML = '';
   document.getElementsByClassName('dc-char')[dc_sel_char].style.display = 'none';
   document.getElementsByClassName('dc-char-dialog')[dc_sel_char].style.display = 'none';
   document.getElementById('steppenwolf').style.display = 'block';
   document.getElementById('steppenwolf-dialog').style.display = 'block';
   document.getElementById("dc-typedtext").innerHTML = '';
   setTimeout('step_finished_dialog_writer()', 1800);
   setTimeout('dc_disp_exit_message()', 3400);
}

var finishedstepText = new Array("Darkseid, I have failed you..", "I will soon return to capture Earth once again. Justice League You better be prepared.");
var finishedstepSpeed = 10; // time delay of print out
var finishedstepIndex = 0; // start printing array at this posision
var finishedstepArrLength = finishedstepText[0].length; // the length of the text array
var finishedstepScrollAt = 20; // start scrolling up at this many lines
var finishedstepTextPos = 0; // initialise text position
var finishedstepContents = ''; // initialise contents variable
var finishedstepRow; // initialise current row
function step_finished_dialog_writer() {
   finishedstepContents = ' ';
   finishedstepRow = Math.max(0, finishedstepIndex - finishedstepScrollAt);
   var finishedstepdestination = document.getElementById("dc-typedtext");
   while (finishedstepRow < finishedstepIndex) {
      finishedstepContents += finishedstepText[finishedstepRow++] + '<br />';
   }
   finishedstepdestination.innerHTML = finishedstepContents + finishedstepText[finishedstepIndex].substring(0, finishedstepTextPos) + "<span class='cursor'>|</span>";
   if (finishedstepTextPos++ == finishedstepArrLength) {
      finishedstepTextPos = 0;
      finishedstepIndex++;
      if (finishedstepIndex != finishedstepText.length) {
         finishedstepArrLength = finishedstepText[finishedstepIndex].length;
         setTimeout("step_finished_dialog_writer()", 10);
      }
   } else {
      setTimeout("step_finished_dialog_writer()", finishedstepSpeed);
   }
}

// Display Final Exit Message When All Dialogs are over.

function dc_disp_exit_message() {
   document.getElementById('dc-div').removeAttribute('onclick');
   dc_contText = new Array("Click Back Button To Exit");
   dc_contSpeed = 10; // time delay of print out
   dc_contIndex = 0; // start printing array at this posision
   dc_contArrLength = dc_contText[0].length; // the length of the text array
   dc_contScrollAt = 20; // start scrolling up at this many lines
   dc_contTextPos = 0; // initialise text position
   dc_contContents = ''; // initialise contents variable
   dc_cont();
}