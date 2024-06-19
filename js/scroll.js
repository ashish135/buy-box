class StickyColumn {
    constructor(leftColumnId, rightColumnId, headerSelector) {
        this.leftColumn = document.getElementById(leftColumnId);
        this.rightColumn = document.getElementById(rightColumnId);
        this.headerHeight = document.querySelector(headerSelector).clientHeight;
        this.lastScroll = 0;
        this.isSticky = false;
        this.windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Bind scroll handler to the instance
        this.handleScroll = this.handleScroll.bind(this);
        
        // Add event listener for scroll
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        const leftColumnRect = this.leftColumn.getBoundingClientRect();
        const rightColumnRect = this.rightColumn.getBoundingClientRect();
        
        const bottomVisible = rightColumnRect.bottom <= this.windowHeight;
        const topVisible = rightColumnRect.top > 0;
        const leftColVisible = leftColumnRect.top > 0;
        const leftColBottomVisible = leftColumnRect.bottom <= this.windowHeight;

        if (rightColumnRect.height > this.windowHeight) {
            if (currentScroll > this.lastScroll && bottomVisible) {
                this.stickToBottom(rightColumnRect);
            } else if (currentScroll > this.lastScroll && this.isSticky && rightColumnRect.top === 0) {
                this.unstickFromTop(currentScroll);
            } else if (currentScroll < this.lastScroll && bottomVisible && !leftColBottomVisible) {
                this.adjustPosition(currentScroll, rightColumnRect.top, this.headerHeight);
            }else {
                if (currentScroll < this.lastScroll && topVisible) {
                    this.stickToTop();
                }
                if (currentScroll < this.lastScroll && leftColVisible) {
                    this.unstickFromLeft();
                }
            }

            this.lastScroll = currentScroll;
        }
    }

    stickToBottom(rightColumnRect) {
        this.rightColumn.style.position = 'sticky';
        this.rightColumn.style.top = -parseInt(rightColumnRect.height - this.windowHeight) + 'px';
        this.isSticky = true;
    }

    unstickFromTop(currentScroll) {
        this.rightColumn.style.position = 'relative';
        this.rightColumn.style.top = parseInt(currentScroll - this.headerHeight) + 'px';
        this.isSticky = false;
    }

    adjustPosition(currentScroll, rightColumnTop) {
        console.log("-----")
        this.rightColumn.style.position = 'relative';
        this.rightColumn.style.top = parseInt(currentScroll + rightColumnTop) + 'px';
        this.isSticky = false;
    }

    stickToTop() {
        this.rightColumn.style.position = 'sticky';
        this.rightColumn.style.top = 0;
        this.isSticky = true;
    }

    unstickFromLeft() {
        this.rightColumn.style.position = 'relative';
        this.rightColumn.style.top = 0;
        this.isSticky = false;
    }

    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
// Initialize sticky column behavior
const stickyColumn = new StickyColumn('leftColumn', 'rightColumn', 'header');

class FullYear {
    // Getter for the current year
    get year() {
        return new Date().getFullYear();
    }

    setYear(element){
        const ele = document.getElementById(element);
        ele.innerText = this.year;
    }
}

// Create an instance of FullYear
const year = new FullYear();
year.setYear('year')
