// Determines State of Quiz and Displays Dialogs Accordingly.

function start_marvel_section() {
   var marvel_ques_state = 0;
   var marvel_sel_char = 3;

   // Get marvel_ques_state from Database i.e. First Login = 0, Resumed from a previous quiz = 1, Quiz over = 2

   if (marvel_ques_state == 0) {
      marv_disp_first_login();
   } else if (marvel_ques_state == 1) {
      // Fetch Selected Character from Database and store it in mavel_sel_char
      // Display Dialogs specific to Selected Character as obtained
      disp_dialog_nick_resume(marvel_sel_char);
   } else {
      // Fetch Selected Charater from Database and store it in mavel_sel_char
      // Display Ending Dialogs
      disp_dialog_char_finished(marvel_sel_char);
   }
}

// First Time User Login Dialog

function marv_disp_first_login() {
   document.getElementById('nick-fury').style.display = 'block';
   document.getElementById('nick-dialog').style.display = 'block';
   setTimeout('nick_first_dialog()', 1800);
   setTimeout('cont()', 4000);
   setTimeout('add_click_cont()', 4520);
}

var nickFirstText = new Array("Who the hell are you?", "State your purpose for coming here.");
var nickFirstSpeed = 10; // time delay of print out
var nickFirstIndex = 0; // start printing array at this posision
var nickFirstArrLength = nickFirstText[0].length; // the length of the text array
var nickFirstScrollAt = 20; // start scrolling up at this many lines
var nickFirstTextPos = 0; // initialise text position
var nickFirstContents = ''; // initialise contents variable
var nickFirstRow; // initialise current row
function nick_first_dialog() {
   nickFirstContents = ' ';
   nickFirstRow = Math.max(0, nickFirstIndex - nickFirstScrollAt);
   var destination = document.getElementById("typedtext");
   while (nickFirstRow < nickFirstIndex) {
      nickFirstContents += nickFirstText[nickFirstRow++] + '<br />';
   }
   destination.innerHTML = nickFirstContents + nickFirstText[nickFirstIndex].substring(0, nickFirstTextPos) + "<span class='cursor'>|</span>";
   if (nickFirstTextPos++ == nickFirstArrLength) {
      nickFirstTextPos = 0;
      nickFirstIndex++;
      if (nickFirstIndex != nickFirstText.length) {
         nickFirstArrLength = nickFirstText[nickFirstIndex].length;
         setTimeout("nick_first_dialog()", 10);
      }
   } else {
      setTimeout("nick_first_dialog()", nickFirstSpeed);
   }
}

// Click Anywhere to Continue text

var contText = new Array("Click Anywhere To Continue");
var contSpeed = 10; // time delay of print out
var contIndex = 0; // start printing array at this posision
var contArrLength = contText[0].length; // the length of the text array
var contScrollAt = 20; // start scrolling up at this many lines
var contTextPos = 0; // initialise text position
var contContents = ''; // initialise contents variable
var contRow; // initialise current row

function cont() {
   contContents = ' ';
   contRow = Math.max(0, contIndex - contScrollAt);
   var contdestination = document.getElementById("continue");
   while (contRow < contIndex) {
      contContents += contText[contRow++] + '<br />';
   }
   contdestination.innerHTML = contContents + contText[contIndex].substring(0, contTextPos) + "<span class='cont-cursor'>_</span>";
   if (contTextPos++ == contArrLength) {
      contTextPos = 0;
      contIndex++;
      if (contIndex != contText.length) {
         contArrLength = contText[contIndex].length;
         setTimeout("cont()", 10);
      }
   } else {
      setTimeout("cont()", contSpeed);
   }
}

// Unknown Character Dialog

var unknText = new Array("I am ........");
var unknSpeed = 10; // time delay of print out
var unknIndex = 0; // start printing array at this posision
var unknArrLength = unknText[0].length; // the length of the text array
var unknScrollAt = 20; // start scrolling up at this many lines
var unknTextPos = 0; // initialise text position
var unknContents = ''; // initialise contents variable
var unknRow; // initialise current row

function unkn_dialog_writer() {
   unknContents = ' ';
   unknRow = Math.max(0, unknIndex - unknScrollAt);
   var unkndestination = document.getElementById("unkn-typedtext");
   while (unknRow < unknIndex) {
      unknContents += unknText[unknRow++] + '<br />';
   }
   unkndestination.innerHTML = unknContents + unknText[unknIndex].substring(0, unknTextPos) + "<span class='cursor'>|</span>";
   if (unknTextPos++ == unknArrLength) {
      unknTextPos = 0;
      unknIndex++;
      if (unknIndex != unknText.length) {
         unknArrLength = unknText[unknIndex].length;
         setTimeout("unkn_writer()", 10);
      }
   } else {
      setTimeout("unkn_dialog_writer()", unknSpeed);
   }
}

//Adds the first onclick to display unknown character dialog

function add_click_cont() {
   document.getElementById('marvel-div').setAttribute('onclick', 'click_cont()');
}

//The first onclick to display cards

function click_cont() {
   document.getElementById('continue').innerHTML = '';
   document.getElementById('nick-fury').style.display = 'none';
   document.getElementById('nick-dialog').style.display = 'none';
   document.getElementById('unknown').style.display = 'block';
   document.getElementById('unknown-dialog').style.display = 'block';
   setTimeout('unkn_dialog_writer()', 1800);
   setTimeout('disp_cards()', 3000);
}

function disp_cards() {
   swiper.update();
   document.getElementsByClassName('marvel-swiper-container')[0].style.setProperty('z-index', 50, 'important');
   document.getElementById('marvel-div').removeAttribute('onclick');
   document.getElementById('unknown').style.display = 'none';
   document.getElementById('unknown-dialog').style.display = 'none';
   document.getElementById('confirm-div').style.display = 'block';
}

function hide_cards() {
   document.getElementsByClassName('marvel-swiper-container')[0].style.setProperty('z-index', -1, 'important');
   document.getElementById('marvel-div').removeAttribute('onclick');
}

// Character Dialogs

var chText = new Array("Display name");
var chName = ["Magneto", "Dr. Doom", "Kingpin", "Thanos", "Red Skull", "Venom"];
var chDialog = ["Does the trainer explain his reasons to the dog? I tire of this idiotic banter.", "And you S.H.I.E.L.D Agent, you have some learning to do before you dare to confront Viktor von Doom.", "And You're a child playing at being a hero. Your part ends tonight.", "Your politics bore me. Your demeanor is that of a pouty child. Earth. That is my price.", "Achtung, S.H.I.E.L.D.! I have returned! I'm glad that I did not destroy this city earlier. It'll be much more pleasant to rule it.", "We create our own chaos where we find none. We have realized... with great power comes hunger for greater power..."];
var chSpeed = 10; // time delay of print out
var chIndex = 0; // start printing array at this posision
var chArrLength = chText[0].length; // the length of the text array
var chScrollAt = 20; // start scrolling up at this many lines
var chTextPos = 0; // initialise text position
var chContents = ''; // initialise contents variable
var chRow; // initialise current row

function char_dialog_writer(sel_char) {
   chText = new Array("I am " + chName[sel_char], chDialog[sel_char]);
   chContents = ' ';
   chRow = Math.max(0, chIndex - chScrollAt);
   var chdestination = document.getElementsByClassName('char-typedtext')[sel_char];
   while (chRow < chIndex) {
      chContents += chText[chRow++] + '<br />';
   }
   chdestination.innerHTML = chContents + chText[chIndex].substring(0, chTextPos) + "<span class='cursor'>|</span>";
   if (chTextPos++ == chArrLength) {
      chTextPos = 0;
      chIndex++;
      if (chIndex != chText.length) {
         chArrLength = chText[chIndex].length;
         setTimeout("char_dialog_writer(" + sel_char + ")", 10);
      }
   } else {
      setTimeout("char_dialog_writer(" + sel_char + ")", chSpeed);
   }
}

function disp_dialog_char(sel_char) {
   hide_cards();
   document.getElementsByClassName('char')[sel_char].style.display = 'block';
   document.getElementsByClassName('char-dialog')[sel_char].style.display = 'block';
   setTimeout('char_dialog_writer(' + sel_char + ')', 1800);
   setTimeout('add_cont_2nd(' + sel_char + ')', 3400);
}

// Add Continue after Char Dialog Over in First Login

function add_cont_2nd(sel_char) {
   document.getElementById('marvel-div').setAttribute('onclick', 'click_cont_2nd(' + sel_char + ')');
   contText = new Array("Click Anywhere To Continue");
   contSpeed = 10; // time delay of print out
   contIndex = 0; // start printing array at this posision
   contArrLength = contText[0].length; // the length of the text array
   contScrollAt = 20; // start scrolling up at this many lines
   contTextPos = 0; // initialise text position
   contContents = ''; // initialise contents variable
   cont();
}

function click_cont_2nd(sel_char) {
   document.getElementById('continue').innerHTML = '';
   document.getElementsByClassName('char')[sel_char].style.display = 'none';
   document.getElementsByClassName('char-dialog')[sel_char].style.display = 'none';
   document.getElementById('nick-fury').style.display = 'block';
   document.getElementById('nick-dialog').style.display = 'block';
   document.getElementById("typedtext").innerHTML = '';
   setTimeout('nick_counter_dialog_writer()', 1800);
   setTimeout('add_click_cont_ques(' + sel_char + ')', 3400);
}

// Nick's Counter Dialog to Selected Character's Threat

var nickText = new Array("You threatened my world with war. You might not be glad that you did.");
var nickSpeed = 10; // time delay of print out
var nickIndex = 0; // start printing array at this posision
var nickArrLength = nickText[0].length; // the length of the text array
var nickScrollAt = 20; // start scrolling up at this many lines
var nickTextPos = 0; // initialise text position
var nickContents = ''; // initialise contents variable
var nickRow; // initialise current row
function nick_counter_dialog_writer() {
   document.getElementById('marvel-div').removeAttribute('onclick');
   nickContents = ' ';
   nickRow = Math.max(0, nickIndex - nickScrollAt);
   var nickdestination = document.getElementById("typedtext");
   while (nickRow < nickIndex) {
      nickContents += nickText[nickRow++] + '<br />';
   }
   nickdestination.innerHTML = nickContents + nickText[nickIndex].substring(0, nickTextPos) + "<span class='cursor'>|</span>";
   if (nickTextPos++ == nickArrLength) {
      nickTextPos = 0;
      nickIndex++;
      if (nickIndex != nickText.length) {
         nickArrLength = nickText[nickIndex].length;
         setTimeout("nick_counter_dialog_writer()", 10);
      }
   } else {
      setTimeout("nick_counter_dialog_writer()", nickSpeed);
   }
}

// Adds the Click Continue to Display Ques Div.

function add_click_cont_ques(sel_char) {
   document.getElementById('marvel-div').setAttribute('onclick', 'click_cont_ques(' + sel_char + ')');
   contText = new Array("Click Anywhere To Continue");
   contSpeed = 10; // time delay of print out
   contIndex = 0; // start printing array at this posision
   contArrLength = contText[0].length; // the length of the text array
   contScrollAt = 20; // start scrolling up at this many lines
   contTextPos = 0; // initialise text position
   contContents = ''; // initialise contents variable
   cont();
}

function click_cont_ques(sel_char) {
   document.getElementById('marvel-div').removeAttribute('onclick');
   document.getElementById('continue').innerHTML = '';
   document.getElementById('nick-fury').style.display = 'none';
   document.getElementById('nick-dialog').style.display = 'none';
   document.getElementById("typedtext").innerHTML = '';
   alert('Questions Pop Up!!!!');
   alert('Char Selected Index : ' + sel_char);
   // Open Questions Div with sel_char as index of character selected 
}

// Resume Game Dialogs

function disp_dialog_nick_resume(sel_char) {
   document.getElementById('nick-fury').style.display = 'block';
   document.getElementById('nick-dialog').style.display = 'block';
   setTimeout('resume_nick_dialog()', 1800);
   setTimeout('add_cont_resume(' + sel_char + ')', 3400);
}

var resumeText = new Array("So you have returned coward!", "It was a really stupid-ass decision by you.");
var resumeSpeed = 10; // time delay of print out
var resumeIndex = 0; // start printing array at this posision
var resumeArrLength = resumeText[0].length; // the length of the text array
var resumeScrollAt = 20; // start scrolling up at this many lines
var resumeTextPos = 0; // initialise text position
var resumeContents = ''; // initialise contents variable
var resumeRow; // initialise current row
function resume_nick_dialog() {
   resumeContents = ' ';
   resumeRow = Math.max(0, resumeIndex - resumeScrollAt);
   var resumedestination = document.getElementById("typedtext");
   while (resumeRow < resumeIndex) {
      resumeContents += resumeText[resumeRow++] + '<br />';
   }
   resumedestination.innerHTML = resumeContents + resumeText[resumeIndex].substring(0, resumeTextPos) + "<span class='cursor'>|</span>";
   if (resumeTextPos++ == resumeArrLength) {
      resumeTextPos = 0;
      resumeIndex++;
      if (resumeIndex != resumeText.length) {
         resumeArrLength = resumeText[resumeIndex].length;
         setTimeout("resume_nick_dialog()", 10);
      }
   } else {
      setTimeout("resume_nick_dialog()", resumeSpeed);
   }
}

function add_cont_resume(sel_char) {
   document.getElementById('marvel-div').setAttribute('onclick', 'click_cont_resume(' + sel_char + ')');
   contText = new Array("Click Anywhere To Continue");
   contSpeed = 10; // time delay of print out
   contIndex = 0; // start printing array at this posision
   contArrLength = contText[0].length; // the length of the text array
   contScrollAt = 20; // start scrolling up at this many lines
   contTextPos = 0; // initialise text position
   contContents = ''; // initialise contents variable
   cont();
}

function click_cont_resume(sel_char) {
   document.getElementById('marvel-div').removeAttribute('onclick');
   document.getElementById('continue').innerHTML = '';
   document.getElementById('nick-fury').style.display = 'none';
   document.getElementById('nick-dialog').style.display = 'none';
   document.getElementById("typedtext").innerHTML = '';
   alert('Questions Pop Up!!!!');
   alert('Char Selected Index : ' + sel_char);
   // Open Questions Div with sel_char as index of character selected 
}

// Finished Game Dialogs

function disp_dialog_char_finished(sel_char) {
   document.getElementsByClassName('char')[sel_char].style.display = 'block';
   document.getElementsByClassName('char-dialog')[sel_char].style.display = 'block';
   setTimeout('char_dialog_finished_writer(' + sel_char + ')', 1800);
   setTimeout('add_cont_finished(' + sel_char + ')', 3400);
}

var finished_chText = new Array("Display name");
var finished_chName = ["Magneto", "Dr. Doom", "Kingpin", "Thanos", "Red Skull", "Venom"];
var finished_chDialog = ["Your courage does you credit, But this is a mutants' world now.", "Greetings S.H.I.E.L.D! You Arrive just in time to see a great performance!", "You don't get to be the man on top without enemies looking to tear you down.", "Fun really isn't something one considers when balancing the universe. But this... does put a smile on my face.", "Untermensch, you and all your kind will soon know what is meant by a Tausendjahriges Reich!", "Well then why don't you listen to the sounds of my shredding you into little teeny bits. It's your funeral! Enjoy!"];
var finished_chSpeed = 10; // time delay of print out
var finished_chIndex = 0; // start printing array at this posision
var finished_chArrLength = finished_chText[0].length; // the length of the text array
var finished_chScrollAt = 20; // start scrolling up at this many lines
var finished_chTextPos = 0; // initialise text position
var finished_chContents = ''; // initialise contents variable
var finished_chRow; // initialise current row

function char_dialog_finished_writer(sel_char) {
   finished_chText = new Array("You are nothing to " + finished_chName[sel_char] + ".", finished_chDialog[sel_char]);
   finished_chContents = ' ';
   finished_chRow = Math.max(0, finished_chIndex - finished_chScrollAt);
   var finished_chdestination = document.getElementsByClassName('char-typedtext')[sel_char];
   while (finished_chRow < finished_chIndex) {
      finished_chContents += finished_chText[finished_chRow++] + '<br />';
   }
   finished_chdestination.innerHTML = finished_chContents + finished_chText[finished_chIndex].substring(0, finished_chTextPos) + "<span class='cursor'>|</span>";
   if (finished_chTextPos++ == finished_chArrLength) {
      finished_chTextPos = 0;
      finished_chIndex++;
      if (finished_chIndex != finished_chText.length) {
         finished_chArrLength = finished_chText[finished_chIndex].length;
         setTimeout("char_dialog_finished_writer(" + sel_char + ")", 10);
      }
   } else {
      setTimeout("char_dialog_finished_writer(" + sel_char + ")", finished_chSpeed);
   }
}

// Adds Finished Click Continue to Display Nick's Finished Dialog

function add_cont_finished(sel_char) {
   document.getElementById('marvel-div').setAttribute('onclick', 'click_cont_finished(' + sel_char + ')');
   contText = new Array("Click Anywhere To Continue");
   contSpeed = 10; // time delay of print out
   contIndex = 0; // start printing array at this posision
   contArrLength = contText[0].length; // the length of the text array
   contScrollAt = 20; // start scrolling up at this many lines
   contTextPos = 0; // initialise text position
   contContents = ''; // initialise contents variable
   cont();
}

function click_cont_finished(sel_char) {
   document.getElementById('continue').innerHTML = '';
   document.getElementsByClassName('char')[sel_char].style.display = 'none';
   document.getElementsByClassName('char-dialog')[sel_char].style.display = 'none';
   document.getElementById('nick-fury').style.display = 'block';
   document.getElementById('nick-dialog').style.display = 'block';
   document.getElementById("typedtext").innerHTML = '';
   setTimeout('nick_finished_dialog_writer()', 1800);
   setTimeout('disp_exit_message()', 3400);
}

var finishedNickText = new Array("Well let me know if 'real power' wants a magazine, or something.");
var finishedNickSpeed = 10; // time delay of print out
var finishedNickIndex = 0; // start printing array at this posision
var finishedNickArrLength = finishedNickText[0].length; // the length of the text array
var finishedNickScrollAt = 20; // start scrolling up at this many lines
var finishedNickTextPos = 0; // initialise text position
var finishedNickContents = ''; // initialise contents variable
var finishedNickRow; // initialise current row
function nick_finished_dialog_writer() {
   finishedNickContents = ' ';
   finishedNickRow = Math.max(0, finishedNickIndex - finishedNickScrollAt);
   var finishedNickdestination = document.getElementById("typedtext");
   while (finishedNickRow < finishedNickIndex) {
      finishedNickContents += finishedNickText[finishedNickRow++] + '<br />';
   }
   finishedNickdestination.innerHTML = finishedNickContents + finishedNickText[finishedNickIndex].substring(0, finishedNickTextPos) + "<span class='cursor'>|</span>";
   if (finishedNickTextPos++ == finishedNickArrLength) {
      finishedNickTextPos = 0;
      finishedNickIndex++;
      if (finishedNickIndex != finishedNickText.length) {
         finishedNickArrLength = finishedNickText[finishedNickIndex].length;
         setTimeout("nick_finished_dialog_writer()", 10);
      }
   } else {
      setTimeout("nick_finished_dialog_writer()", finishedNickSpeed);
   }
}

// Display Final Exit Message When All Dialogs are over.

function disp_exit_message() {
   document.getElementById('marvel-div').removeAttribute('onclick');
   contText = new Array("Click Back Button To Exit");
   contSpeed = 10; // time delay of print out
   contIndex = 0; // start printing array at this posision
   contArrLength = contText[0].length; // the length of the text array
   contScrollAt = 20; // start scrolling up at this many lines
   contTextPos = 0; // initialise text position
   contContents = ''; // initialise contents variable
   cont();
}