// Initialize your app
var myApp = new Framework7({
    modalTitle: 'My App',
    swipePanel: 'left'

});

// Export selectors engine
var $$ = Dom7;

$$('.open-login').on('click', function () {
  myApp.loginScreen();
});
        

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

var mySwiper = myApp.swiper('.swiper-container', {
    pagination:'.swiper-pagination'
});

//var myPicker = $$('.picker-inline')[0].f7Picker;

var pickerDevice = myApp.picker({
    input: '#picker-device',
    cols: [
        {
            textAlign: 'center',
            values: ['GSO', 'CLT', 'RDU']
        }
    ]
});

//- One group, three buttons
$$('.ac-1').on('click', function () {
    var buttons = [
        {
            text: 'Departing',
        },
        {
            text: 'Returning'
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
});

var today = new Date();
 
var pickerInline = myApp.picker({
    input: '#picker-date',
    container: '#picker-date-container',
    toolbar: false,
    rotateEffect: true,
 
    value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
 
    onChange: function (picker, values, displayValues) {
        var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
        if (values[1] > daysInMonth) {
            picker.cols[1].setValue(daysInMonth);
        }
    },
 
    formatValue: function (p, values, displayValues) {
        return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
    },
 
    cols: [
        // Months
        {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('January February March April May June July August September October November December').split(' '),
            textAlign: 'left'
        },
        // Days
        {
            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        },
        // Years
        {
            values: (function () {
                var arr = [];
                for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                return arr;
            })(),
        },
        // Space divider
        {
            divider: true,
            content: '  '
        },
        // Hours
        {
            values: (function () {
                var arr = [];
                for (var i = 0; i <= 23; i++) { arr.push(i); }
                return arr;
            })(),
        },
        // Divider
        {
            divider: true,
            content: ':'
        },
        // Minutes
        {
            values: (function () {
                var arr = [];
                for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                return arr;
            })(),
        }
    ]
}); 

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
 
var calendarInline = myApp.calendar({
    container: '#calendar-inline-container',
    value: [new Date()],
    weekHeader: false,
    toolbarTemplate: 
        '<div class="toolbar calendar-custom-toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left">' +
                    '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                '</div>' +
                '<div class="center"></div>' +
                '<div class="right">' +
                    '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                '</div>' +
            '</div>' +
        '</div>',
    onOpen: function (p) {
        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
        $$('.calendar-custom-toolbar .left .link').on('click', function () {
            calendarInline.prevMonth();
        });
        $$('.calendar-custom-toolbar .right .link').on('click', function () {
            calendarInline.nextMonth();
        });
    },
    onMonthYearChangeStart: function (p) {
        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
    }
});          

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}