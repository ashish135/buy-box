let lastScroll = 0;
let isSticky = false;
  // JavaScript to make the right column sticky when scrolling
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const leftColumn = document.getElementById('leftColumn');
    const rightColumn = document.getElementById('rightColumn');
    const leftColumnRect = leftColumn.getBoundingClientRect();
    const rightColumnRect = rightColumn.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const bottomVisible = rightColumnRect.bottom <= windowHeight;
    const topVisible = rightColumnRect.top > 0;
    const leftColVisible = leftColumnRect.top > 0;
  
    if( currentScroll > lastScroll && bottomVisible){
        rightColumn.style.position = 'sticky'
        isSticky = true;
        rightColumn.style.top = -parseInt(rightColumnRect.height-windowHeight)+'px'
    }
    if( currentScroll > lastScroll && isSticky && rightColumnRect.top === 0){
        rightColumn.style.position = 'relative'
        isSticky = false
        rightColumn.style.top = parseInt(currentScroll)+'px'
    }
    if( currentScroll < lastScroll && bottomVisible) {
        rightColumn.style.position = 'relative'
        isSticky = false
        rightColumn.style.top = parseInt(currentScroll+rightColumnRect.top)+'px'
    } else {
        if(currentScroll < lastScroll && topVisible){
          rightColumn.style.position = 'sticky'
          rightColumn.style.top = 0
          isSticky = true;
      }if(currentScroll < lastScroll && leftColVisible){
          rightColumn.style.position = 'relative'
          rightColumn.style.top = 0
          isSticky = false;
      }
    }

    lastScroll = currentScroll;
  });