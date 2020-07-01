var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var catRange = document.querySelector('.example__range-control');
var photoBefore = document.querySelector('.example__photo_before');
var photoAfter = document.querySelector('.example__photo_after');
var photoAfterWidth = photoAfter.clientWidth;
var photoBeforeWidth = photoBefore.clientWidth;
var photoAfterPicture = document.querySelector('.example__photo_after > picture');

navMain.classList.remove('main-nav_nojs');
navMain.classList.remove('main-nav_opened');
navMain.classList.add('main-nav_closed'); 

navToggle.addEventListener('click',function(){
    if (navMain.classList.contains('main-nav_closed')){
        navMain.classList.remove('main-nav_closed');
        navMain.classList.add('main-nav_opened');
    }
    else {
        navMain.classList.remove('main-nav_opened');
        navMain.classList.add('main-nav_closed'); 
    }
});

photoBefore.style.width = 0.5*photoBeforeWidth + 'px';
photoAfter.style.width = 0.5*photoBeforeWidth + 'px';
photoAfterPicture.style.marginLeft = 0.5*photoAfterWidth - photoAfterWidth + 'px';
photoAfter.style.marginLeft = -(0.5*photoAfterWidth - photoAfterWidth) + 'px';

catRange.addEventListener('change',function(){
    photoBefore.style.width = ((100 - this.value)/100)*photoBeforeWidth + 'px';
    // photoAfter.style.width = this.value + '%';
    photoAfter.style.width = ((this.value)/100)*photoBeforeWidth + 'px';
    photoAfterPicture.style.marginLeft = (photoAfterWidth*this.value)/100 - photoAfterWidth + 'px';
    photoAfter.style.marginLeft = -((photoAfterWidth*this.value)/100 - photoAfterWidth) + 'px';
});


