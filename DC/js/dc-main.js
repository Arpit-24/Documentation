// --------------- Gets the Selected Character when Choose is clicked --------------

function dc_choose_char() {
   var dc_hero_id = document.getElementsByClassName('swiper-slide-active')[0].getAttribute('id');
   var dc_hero_card = document.getElementsByClassName('swiper-slide-active')[0];
   dc_hero_card.style.transform = 'rotateY(180deg)';
   dc_hero_card.style.transitionDuration = '1s';
   document.getElementById('dc-confirm-div').style.display = 'none';
   var dc_sel_char;
   if (dc_hero_id == 'superman') {
      dc_sel_char = 0;
   } else if (dc_hero_id == 'wonderwoman') {
      dc_sel_char = 1;
   } else if (dc_hero_id == 'batman') {
      dc_sel_char = 2;
   } else if (dc_hero_id == 'greenlantern') {
      dc_sel_char = 3;
   } else if (dc_hero_id == 'flash') {
      dc_sel_char = 4;
   } else if (dc_hero_id == 'aquaman') {
      dc_sel_char = 5;
   } else {
      dc_sel_char = -1;
   }

   // Display Dialog of the Selected Character

   dc_disp_dialog_char(dc_sel_char);
}

// Loads the Images using PreLoad.js that will be used in this section

load_dc_images();

function load_dc_images() {
   document.getElementsByTagName('body')[0].style.overflow = 'hidden';
   var dc_queue = new createjs.LoadQueue(false);
   dc_queue.on("complete", dc_handleComplete, this);
   dc_queue.loadManifest([
      "./images/cards/Aquaman.svg",
      "./images/cards/Batman.svg",
      "./images/cards/Flash.svg",
      "./images/cards/Lantern.svg"
   ]);

   function dc_handleComplete() {
      document.getElementById('dc-loading-content').style.display = 'none';
      start_dc_section();
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
   }
}