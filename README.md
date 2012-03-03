yaDatePicker - yet another date picker
========================================================

A lightweight, customizable date picker plugin for jQuery

### Features

 - inline calendar rendering
 - the first day of the week selection
 - custom date format
 - localization
 - themes support
 - date selection restrictions [dates from the past, end date]

How to use
----------

### Step 1 - Setup

yaDatePicker plugin uses the jQuery JavaScript library.
So, in order to use it, include these two javascript files in header of your page:

    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/yaDatePicker-1.0-min.js"></script>

Include the CSS file that contains the theme for the yaDatePicker plugin you want to use:

    <link rel="stylesheet" type="text/css" href="css/default.css" media="screen" />

### Step 2 - Activate

Create an input field or a div element to which you want to attach the date picker:

    <input type="text" id="date" />

or

    <div id="calendar"></div>

Finally, attach a date picker to the created field:

    $("#date").attachDatePicker();

or render it to the created div element:

    $("#calendar").attachDatePicker({inline:true});

### Step 3 - Have fun!

Options
-------

* inline - a boolean parameter that tells if date picker should be attached or rendered as inline calendar

    Default: false

* firstDay - the first day of the week

    Default: 0 (Sunday)

* navigation - a flag to control appearance of the calendar navigation bar

    Default: true

* allowPast - a flag that restricts selection of dates from the past

    Default: true

* endDate - a last date that is allowed to be selected

    Default: -1 (unlimited)

* theme - a name of date picker theme. Two themes are included: dp and dark

    Default: 'dp'

* format - a format of the date. Available options are: d - day, m - month, y - two digit year, Y - four digit year

    Default: 'd.m.Y'

* onSelect - a callback function which is called when the user selects date

    Example:

    function (date) {
        alert(date);
    }

Version History
---------------

Version 1.0 - 01/03/2012
    - first release

License
-------
Copyright (c) 2012 Pavel Prokopenko Released under MIT License.

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