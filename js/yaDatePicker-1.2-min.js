(function(c){c.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];c.daysNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];c.prevLink="←";c.nextLink="→";var b=0;function i(l,p){var j=l.getMonth();var q=l.getDate();var r=l.getFullYear();var o=p.split(""),k;for(var n=0;n<o.length;n++){k=o[n];switch(o[n]){case"d":k=(q<10)?("0"+q):q;break;case"m":k=(j<9)?("0"+(1+j)):(1+j);break;case"y":k=(""+r).substr(2,2);break;case"Y":k=r;break}o[n]=k}return o.join("")}function f(j,k){return new Date(j.getFullYear(),j.getMonth()+k,0)>new Date()}function h(j){return new Date(j.getFullYear(),j.getMonth(),j.getDate())}function a(k){var j=[];var m=c.daysNames;for(var l=m.length-1;l>=0;l--){if(l>=k){j.unshift(m[l])}else{j.push(m[l])}}return j}function d(j){c("#"+j.id).slideUp(200)}function g(k){var A=new Date();var v=k.currentDate.getMonth();var u=a(k.firstDay);var m="";for(var y=0;y<7;y++){m+='<td class="@@-cell">'+u[y]+"</td>"}var l='<tr class="@@-days">'+m+"</tr>";var j=new Date(k.currentDate);j.setDate(0);j.setDate(j.getDate()+k.firstDay-j.getDay());if(j.getMonth()==v){j.setDate(j.getDate()-7)}var o,p,z,n;for(var q=0;q<6;q++){m="";for(y=0;y<7;y++){var B=j.getDate();var x=j.getDay();o=(j.getMonth()==v)?" @@-on-month":" @@-off-month";p=(x==0||x==6)?" @@-weekend":"";z=((!k.allowPast&&j<=A)||(k.endDate!=-1&&j>k.endDate))?" @@-no-day":" @@-yes-day";n=j.getTime()==k.selectedDate.getTime()?" @@-selected-day":"";j.setDate(j.getDate()+1);m+='<td class="@@-cell'+o+p+z+n+'">'+B+"</td>"}l+='<tr class="@@-week">'+m+"</tr>"}var r="";if(k.navigation){var s='<div class="@@-prev-link">'+c.prevLink+"</div>";var t='<div class="@@-next-link">'+c.nextLink+"</div>";if(!k.allowPast&&!f(k.currentDate,0)){s=""}if(k.endDate!=-1&&k.endDate.getMonth()==v){t=""}r='<tr class="@@-links"><td colspan="1">'+s+'</td><td colspan="5"><div class="@@-current">'+c.monthNames[k.currentDate.getMonth()]+" "+k.currentDate.getFullYear()+'</div></td><td colspan="1">'+t+"</td></tr>"}return('<table cellpadding="0" cellspacing="0">'+r+l+"</table>").replace(/@{2}/gi,k.theme)}function e(n,k){if(!k.allowPast){if(!f(k.currentDate,1)){var j=new Date(k.currentDate);j.setMonth(j.getMonth()+1);k.currentDate=j}}var l=g(k);var m=c("#"+k.id);if(m.length==0){m=c('<div id="'+k.id+'" class="'+k.theme+'"/>');if(k.inline){n.empty().append(m.addClass("inline"))}else{n.after(m.css({position:"absolute",display:"none"}))}}m.html(l);c("."+k.theme+"-links [class*=-link]",m).hover(function(){c(this).addClass(k.theme+"-link-hover")},function(){c(this).removeClass(k.theme+"-link-hover")}).click(function(p){p.stopPropagation();var o=new Date(k.currentDate);o.setMonth(o.getMonth()+(c(this).attr("class").indexOf("-prev-link")!=-1?-1:1));k.currentDate=o;e(n,k)});c("."+k.theme+"-yes-day",m).hover(function(){c(this).addClass(k.theme+"-cell-hover")},function(){c(this).removeClass(k.theme+"-cell-hover")}).click(function(){var p=c(this);var q=p.html();var o=new Date(k.currentDate);if(p.hasClass(k.theme+"-off-month")){o.setDate(1);o.setMonth(o.getMonth()+(q>15?-1:1))}o.setDate(q);k.currentDate=o;k.selectedDate=o;if(k.onSelect){k.onSelect(o)}else{if(!k.inline){n.val(i(o,k.format))}}if(!k.inline){d(k)}e(n,k)})}c.fn.attachDatePicker=function(j){return this.each(function(){var r=c(this);var m=h(new Date());var o=c.extend({},{inline:false,firstDay:0,navigation:true,allowPast:true,endDate:-1,theme:"dp",format:"d.m.Y",initial:-1,onSelect:null},j);o.id="dp-"+b++;var n=o.initial;if(n!=-1){if(typeof n=="string"){try{n=new Date(n)}finally{}}}if(Object.prototype.toString.call(n)!=="[object Date]"||isNaN(n.getTime())){n=m}o.currentDate=n;o.selectedDate=n;if(!o.allowPast){o.selectedDate.setDate(n.getDate()+1)}var l=o.endDate;if(l!=-1){if(typeof l=="number"){var q=new Date(n);q.setDate(q.getDate()+l);o.endDate=q}else{if(!(l instanceof Date)){o.endDate=-1}}}e(r,o);if(!o.inline){var p=function(s){s.stopPropagation();c("#"+o.id).css({left:r.offset().left,top:r.offset().top+r.outerHeight(false)}).slideDown(200);c("div[id^=dp-]").not(".inline").not("#"+o.id).slideUp(200)};var k=function(s){s.stopPropagation();d(o)};r.focus(p).click(p);c(document).click(k)}})}})(jQuery);