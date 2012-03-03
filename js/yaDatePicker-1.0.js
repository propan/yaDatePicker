/*

 yaDatePicker - yet another date picker - a lightweight, customizable date picker plugin for jQuery

 Copyright (c) 2012 Pavel Prokopenko

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */
(function ($) {

    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var daysNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var prevLink = '←';
    var nextLink = '→';

    function formatDate(date, format) {
        var m = date.getMonth();
        var d = date.getDate();
        var y = date.getFullYear();
        var parts = format.split(''), part;
        for (var i = 0; i < parts.length; i++) {
            part = parts[i];
            switch (parts[i]) {
                case 'd':
                    part = (d < 10) ? ("0" + d) : d;
                    break;
                case 'm':
                    part = (m < 9) ? ("0" + (1 + m)) : (1 + m);
                    break;
                case 'y':
                    part = ('' + y).substr(2, 2);
                    break;
                case 'Y':
                    part = y;
                    break;
            }
            parts[i] = part;
        }
        return parts.join('');
    }

    function hasAvailableDays(date, offset) {
        return new Date(date.getFullYear(), date.getMonth() + offset, 0) > new Date();
    }

    function resetHours(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function orderDays(firstDay) {
        var result = [];
        for (var i = 0; i < daysNames.length; i++) {
            if (i > firstDay) {
                result.unshift(daysNames[i]);
            } else {
                result.push(daysNames[i]);
            }
        }
        return result;
    }

    function hide(options) {
        $('#'+options.id).slideUp(200);
    }

    function generateDatepicker(options) {
        var today = new Date();
        var currentMonth = options.currentDate.getMonth();

        var daysNames = orderDays(options.firstDay);

        var row = '';
        for (var i = 0; i < 7; i++) {
            row += '<td class="@@-cell">' + daysNames[i] + '</td>';
        }
        var days = '<tr class="@@-days">' + row + '</tr>';
        var slidingDate = new Date(options.currentDate);
        slidingDate.setDate(0);
        slidingDate.setDate(slidingDate.getDate() + options.firstDay - slidingDate.getDay() + 1);
        if (slidingDate.getMonth() == currentMonth) {
            // that means we over-jumped one week
            slidingDate.setDate(slidingDate.getDate() - 7);
        }
        var monthClass, weekendClass, dayClass, selectedClass;
        for (var w = 0, d = 0; w < 6; w++) {
            row = '';
            for (i = 0; i < 7; i++) {
                var date = slidingDate.getDate(); var day = slidingDate.getDay();
                monthClass = (slidingDate.getMonth() == currentMonth) ? ' @@-on-month' : ' @@-off-month';
                weekendClass = (day == 0 || day == 6) ? ' @@-weekend' : '';
                dayClass = ((!options.allowPast && slidingDate <= today) || (options.endDate!=-1 && slidingDate > options.endDate)) ? ' @@-no-day' : ' @@-yes-day';
                selectedClass = slidingDate.getTime() ==  options.selectedDate.getTime() ? ' @@-selected-day' : '';
                slidingDate.setDate(slidingDate.getDate() + 1);
                row += '<td class="@@-cell' + monthClass + weekendClass + dayClass + selectedClass + '">' + date + '</td>';
            }
            days += '<tr class="@@-week">' + row + '</tr>';
        }
        var navigationLinks = '';
        if (options.navigation) {
            var prev = '<div class="@@-prev-link">'+prevLink+'</div>';
            var next = '<div class="@@-next-link">'+nextLink+'</div>';
            if (!options.allowPast && !hasAvailableDays(options.currentDate, 0)) {
                prev = '';
            }
            if (options.endDate!=-1 && options.endDate.getMonth() == currentMonth){
                next = '';
            }
            navigationLinks = '<tr class="@@-links"><td colspan="1">'+prev+'</td><td colspan="5"><div class="@@-current">'+monthNames[options.currentDate.getMonth()] + ' ' + options.currentDate.getFullYear()+'</div></td><td colspan="1">'+next+'</td></tr>';
        }
        return ('<table cellpadding="0" cellspacing="0">' + navigationLinks + days + '</table>').replace(/@{2}/gi, options.theme);
    }

    function updateDataPicker(target, options) {

        if (!options.allowPast) {
            // set current date to next month if old selection is forbidden and current month doesn't have available days
            if (!hasAvailableDays(options.currentDate, 1)) {
                var newDate = new Date(options.currentDate);
                newDate.setMonth(newDate.getMonth() + 1);
                options.currentDate = newDate;
            }
        }

        var html = generateDatepicker(options);
        var calendar = $('#'+options.id);
        if(calendar.length == 0) {
            // hasn't been created yet
            calendar = $('<div id="' + options.id + '" class="' + options.theme + '"/>');
            if (options.inline) {
                target.empty().append(calendar.addClass('inline'));
            } else {
                target.after(calendar.css(
                    {
                        'position':'absolute',
                        'display':'none'
                    }));
            }
        }
        calendar.html(html);

        $('.' + options.theme + '-links [class*=-link]', calendar).hover(
            function () {
                $(this).addClass(options.theme + '-link-hover');
            },
            function () {
                $(this).removeClass(options.theme + '-link-hover');
            }).click(function (e) {
                e.stopPropagation();
                var newDate = new Date(options.currentDate);
                newDate.setMonth(newDate.getMonth() + ($(this).attr('class').indexOf('-prev-link') != -1 ? -1 : 1));
                options.currentDate = newDate;
                updateDataPicker(target, options);
            });

        $('.' + options.theme + '-yes-day', calendar).hover(
            function () {
                $(this).addClass(options.theme + '-cell-hover');
            },
            function () {
                $(this).removeClass(options.theme + '-cell-hover');
            }).click(function () {
                var dayElem = $(this);
                var selectedDay = dayElem.html();
                var newDate = new Date(options.currentDate);
                if (dayElem.hasClass(options.theme + '-off-month')) {
                    // That means that we picked up a day of not current month.
                    // If that day belongs to the last part of the month, it is previous month, otherwise it's next month.
                    newDate.setMonth(newDate.getMonth() + (selectedDay > 15 ? -1 : 1));
                }
                newDate.setDate(selectedDay);
                options.currentDate = newDate;
                options.selectedDate = newDate;

                if (!options.inline) {
                    target.val(formatDate(newDate, options.format));
                    hide(options);
                }
                updateDataPicker(target, options);

                if (options.onSelect) {
                    options.onSelect(newDate);
                }
            });
    }

    $.fn.attachDatePicker = function (options) {

        return this.each(function(){
            var target = $(this);
            var today = resetHours(new Date());
            var settings = $.extend({}, { inline:false, firstDay:0, navigation: true, allowPast: true, endDate: -1, theme: 'dp', format: 'd.m.Y', onSelect: function(date){}}, options);
            settings.id = 'dp-' + $('div[id^=dp-]').length;
            settings.currentDate = today;
            settings.selectedDate = today;
            if (!settings.allowPast) {
                settings.selectedDate.setDate(today.getDate() + 1);
            }
            var x = settings.endDate;
            if (x != -1) {
                if (typeof x == "number") {
                    var endDate = new Date(today);
                    endDate.setDate(endDate.getDate() + x);
                    settings.endDate = endDate;
                } else if (!(x instanceof Date)) {
                    settings.endDate = -1;
                }
            }

            updateDataPicker(target, settings);

            if (!settings.inline) {
                var fnShow = function (e) {
                    e.stopPropagation();
                    $('#' + settings.id).css({'left':target.offset().left, 'top':target.offset().top + target.outerHeight(false)}).slideDown(200);
                    $('div[id^=dp-]').not('.inline').not('#'+settings.id).slideUp(200);
                };
                var fnHide = function (e) {
                    e.stopPropagation();
                    hide(settings);
                };
                target.focus(fnShow).click(fnShow);
                $(document).click(fnHide);
            }

        });

    }

})(jQuery);