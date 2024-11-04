!function(e){"function"==typeof define&&define.amd?define(["./picker","jquery"],e):"object"==typeof exports?module.exports=e(require("./picker.js"),require("jquery")):e(Picker,jQuery)}(function(e,p){var t,y=e._;function a(t,a){function e(){return r.currentStyle?"rtl"==r.currentStyle.direction:"rtl"==getComputedStyle(t.$root[0]).direction}var n,i=this,r=t.$node[0],o=r.value,s=t.$node.data("value"),o=s||o,s=s?a.formatSubmit:a.format;i.settings=a,i.$node=t.$node,i.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},i.item={},i.item.clear=null,i.item.disable=(a.disable||[]).slice(0),i.item.enable=-(!0===(n=i.item.disable)[0]?n.shift():-1),i.set("min",a.min).set("max",a.max).set("now"),o?i.set("select",o,{format:s,defaultValue:!0}):i.set("select",null).set("highlight",i.item.now),i.key={40:7,38:-7,39:function(){return e()?-1:1},37:function(){return e()?1:-1},go:function(e){var t=i.item.highlight,t=new Date(t.year,t.month,t.date+e);i.set("highlight",t,{interval:e}),this.render()}},t.on("render",function(){t.$root.find("."+a.klass.selectMonth).on("change",function(){var e=this.value;e&&(t.set("highlight",[t.get("view").year,e,t.get("highlight").date]),t.$root.find("."+a.klass.selectMonth).trigger("focus"))}),t.$root.find("."+a.klass.selectYear).on("change",function(){var e=this.value;e&&(t.set("highlight",[e,t.get("view").month,t.get("highlight").date]),t.$root.find("."+a.klass.selectYear).trigger("focus"))})},1).on("open",function(){var e="";i.disabled(i.get("now"))&&(e=":not(."+a.klass.buttonToday+")"),t.$root.find("button"+e+", select").attr("disabled",!1)},1).on("close",function(){t.$root.find("button, select").attr("disabled",!0)},1)}function n(e,t,a){e=e.match(/[^\x00-\x7F]+|\w+/)[0];return a.mm||a.m||(a.m=t.indexOf(e)+1),e.length}function i(e){return e.match(/\w+/)[0].length}a.prototype.set=function(t,a,n){var i=this,e=i.item;return null===a?e[t="clear"==t?"select":t]=a:(e["enable"==t?"disable":"flip"==t?"enable":t]=i.queue[t].split(" ").map(function(e){return a=i[e](t,a,n)}).pop(),"select"==t?i.set("highlight",e.select,n):"highlight"==t?i.set("view",e.highlight,n):t.match(/^(flip|min|max|disable|enable)$/)&&(e.select&&i.disabled(e.select)&&i.set("select",e.select,n),e.highlight)&&i.disabled(e.highlight)&&i.set("highlight",e.highlight,n)),i},a.prototype.get=function(e){return this.item[e]},a.prototype.create=function(e,t,a){var n,i=this;return(t=void 0===t?e:t)==-1/0||t==1/0?n=t:t=p.isPlainObject(t)&&y.isInteger(t.pick)?t.obj:p.isArray(t)?(t=new Date(t[0],t[1],t[2]),y.isDate(t)?t:i.create().obj):y.isInteger(t)||y.isDate(t)?i.normalize(new Date(t),a):i.now(e,t,a),{year:n||t.getFullYear(),month:n||t.getMonth(),date:n||t.getDate(),day:n||t.getDay(),obj:n||t,pick:n||t.getTime()}},a.prototype.createRange=function(e,t){function a(e){return!0===e||p.isArray(e)||y.isDate(e)?n.create(e):e}var n=this;return y.isInteger(e)||(e=a(e)),y.isInteger(t)||(t=a(t)),y.isInteger(e)&&p.isPlainObject(t)?e=[t.year,t.month,t.date+e]:y.isInteger(t)&&p.isPlainObject(e)&&(t=[e.year,e.month,e.date+t]),{from:a(e),to:a(t)}},a.prototype.withinRange=function(e,t){return e=this.createRange(e.from,e.to),t.pick>=e.from.pick&&t.pick<=e.to.pick},a.prototype.overlapRanges=function(e,t){var a=this;return e=a.createRange(e.from,e.to),t=a.createRange(t.from,t.to),a.withinRange(e,t.from)||a.withinRange(e,t.to)||a.withinRange(t,e.from)||a.withinRange(t,e.to)},a.prototype.now=function(e,t,a){return t=new Date,a&&a.rel&&t.setDate(t.getDate()+a.rel),this.normalize(t,a)},a.prototype.navigate=function(e,t,a){var n,i,r,o=p.isArray(t),s=p.isPlainObject(t),l=this.item.view;if(o||s){for(r=s?(n=t.year,i=t.month,t.date):(n=+t[0],i=+t[1],+t[2]),a&&a.nav&&l&&l.month!==i&&(n=l.year,i=l.month),n=(o=new Date(n,i+(a&&a.nav?a.nav:0),1)).getFullYear(),i=o.getMonth();new Date(n,i,r).getMonth()!==i;)--r;t=[n,i,r]}return t},a.prototype.normalize=function(e){return e.setHours(0,0,0,0),e},a.prototype.measure=function(e,t){return y.isInteger(t)?t=this.now(e,t,{rel:t}):t?"string"==typeof t&&(t=this.parse(e,t)):t="min"==e?-1/0:1/0,t},a.prototype.viewset=function(e,t){return this.create([t.year,t.month,1])},a.prototype.validate=function(e,a,t){var n,i,r,o,s=this,l=a,c=t&&t.interval?t.interval:1,d=-1===s.item.enable,u=s.item.min,h=s.item.max,m=d&&s.item.disable.filter(function(e){var t;return p.isArray(e)&&((t=s.create(e).pick)<a.pick?n=!0:t>a.pick&&(i=!0)),y.isInteger(e)}).length;if((!t||!t.nav&&!t.defaultValue)&&(!d&&s.disabled(a)||d&&s.disabled(a)&&(m||n||i)||!d&&(a.pick<=u.pick||a.pick>=h.pick)))for(d&&!m&&(!i&&0<c||!n&&c<0)&&(c*=-1);s.disabled(a)&&(1<Math.abs(c)&&(a.month<l.month||a.month>l.month)&&(a=l,c=0<c?1:-1),a.pick<=u.pick?(r=!0,c=1,a=s.create([u.year,u.month,u.date+(a.pick===u.pick?0:-1)])):a.pick>=h.pick&&(o=!0,c=-1,a=s.create([h.year,h.month,h.date+(a.pick===h.pick?0:1)])),!r||!o);)a=s.create([a.year,a.month,a.date+c]);return a},a.prototype.disabled=function(t){var a=this,e=(e=a.item.disable.filter(function(e){return y.isInteger(e)?t.day===(a.settings.firstDay?e:e-1)%7:p.isArray(e)||y.isDate(e)?t.pick===a.create(e).pick:p.isPlainObject(e)?a.withinRange(e,t):void 0})).length&&!e.filter(function(e){return p.isArray(e)&&"inverted"==e[3]||p.isPlainObject(e)&&e.inverted}).length;return-1===a.item.enable?!e:e||t.pick<a.item.min.pick||t.pick>a.item.max.pick},a.prototype.parse=function(e,n,t){var i=this,r={};return n&&"string"==typeof n?(t&&t.format||((t=t||{}).format=i.settings.format),i.formats.toArray(t.format).map(function(e){var t=i.formats[e],a=t?y.trigger(t,i,[n,r]):e.replace(/^!/,"").length;t&&(r[e]=n.substr(0,a)),n=n.substr(a)}),[r.yyyy||r.yy,+(r.mm||r.m)-1,r.dd||r.d]):n},a.prototype.formats={d:function(e,t){return e?y.digits(e):t.date},dd:function(e,t){return e?2:y.lead(t.date)},ddd:function(e,t){return e?i(e):this.settings.weekdaysShort[t.day]},dddd:function(e,t){return e?i(e):this.settings.weekdaysFull[t.day]},m:function(e,t){return e?y.digits(e):t.month+1},mm:function(e,t){return e?2:y.lead(t.month+1)},mmm:function(e,t){var a=this.settings.monthsShort;return e?n(e,a,t):a[t.month]},mmmm:function(e,t){var a=this.settings.monthsFull;return e?n(e,a,t):a[t.month]},yy:function(e,t){return e?2:(""+t.year).slice(2)},yyyy:function(e,t){return e?4:t.year},toArray:function(e){return e.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(e,t){var a=this;return a.formats.toArray(e).map(function(e){return y.trigger(a.formats[e],a,[0,t])||e.replace(/^!/,"")}).join("")}},a.prototype.isDateExact=function(e,t){return y.isInteger(e)&&y.isInteger(t)||"boolean"==typeof e&&"boolean"==typeof t?e===t:(y.isDate(e)||p.isArray(e))&&(y.isDate(t)||p.isArray(t))?this.create(e).pick===this.create(t).pick:!(!p.isPlainObject(e)||!p.isPlainObject(t))&&this.isDateExact(e.from,t.from)&&this.isDateExact(e.to,t.to)},a.prototype.isDateOverlap=function(e,t){var a=this.settings.firstDay?1:0;return y.isInteger(e)&&(y.isDate(t)||p.isArray(t))?(e=e%7+a)===this.create(t).day+1:y.isInteger(t)&&(y.isDate(e)||p.isArray(e))?(t=t%7+a)===this.create(e).day+1:!(!p.isPlainObject(e)||!p.isPlainObject(t))&&this.overlapRanges(e,t)},a.prototype.flipEnable=function(e){var t=this.item;t.enable=e||(-1==t.enable?1:-1)},a.prototype.deactivate=function(e,t){var n=this,i=n.item.disable.slice(0);return"flip"==t?n.flipEnable():!1===t?(n.flipEnable(1),i=[]):!0===t?(n.flipEnable(-1),i=[]):t.map(function(e){for(var t,a=0;a<i.length;a+=1)if(n.isDateExact(e,i[a])){t=!0;break}t||(y.isInteger(e)||y.isDate(e)||p.isArray(e)||p.isPlainObject(e)&&e.from&&e.to)&&i.push(e)}),i},a.prototype.activate=function(e,t){var r=this,o=r.item.disable,s=o.length;return"flip"==t?r.flipEnable():!0===t?(r.flipEnable(1),o=[]):!1===t?(r.flipEnable(-1),o=[]):t.map(function(e){for(var t,a,n,i=0;i<s;i+=1){if(a=o[i],r.isDateExact(a,e)){n=!(t=o[i]=null);break}if(r.isDateOverlap(a,e)){p.isPlainObject(e)?(e.inverted=!0,t=e):p.isArray(e)?(t=e)[3]||t.push("inverted"):y.isDate(e)&&(t=[e.getFullYear(),e.getMonth(),e.getDate(),"inverted"]);break}}if(t)for(i=0;i<s;i+=1)if(r.isDateExact(o[i],e)){o[i]=null;break}if(n)for(i=0;i<s;i+=1)if(r.isDateOverlap(o[i],e)){o[i]=null;break}t&&o.push(t)}),o.filter(function(e){return null!=e})},a.prototype.nodes=function(o){function e(e){return y.node("div"," ",l.klass["nav"+(e?"Next":"Prev")]+(e&&h.year>=f.year&&h.month>=f.month||!e&&h.year<=p.year&&h.month<=p.month?" "+l.klass.navDisabled:""),"data-nav="+(e||-1)+" "+y.ariaAttr({role:"button",controls:s.$node[0].id+"_table"})+' title="'+(e?l.labelMonthNext:l.labelMonthPrev)+'"')}function t(){var t=l.showMonthsShort?l.monthsShort:l.monthsFull;return l.selectMonths?y.node("select",y.group({min:0,max:11,i:1,node:"option",item:function(e){return[t[e],0,"value="+e+(h.month==e?" selected":"")+(h.year==p.year&&e<p.month||h.year==f.year&&e>f.month?" disabled":"")]}}),l.klass.selectMonth,(o?"":"disabled")+" "+y.ariaAttr({controls:s.$node[0].id+"_table"})+' title="'+l.labelMonthSelect+'"'):y.node("div",t[h.month],l.klass.month)}function a(){var e,t,a,n,i=h.year,r=!0===l.selectYears?5:~~(l.selectYears/2);return r?(a=p.year,e=f.year,t=i+r,(r=i-r)<a&&(t+=a-r,r=a),e<t&&(r-=(n=t-e)<(a=r-a)?n:a,t=e),y.node("select",y.group({min:r,max:t,i:1,node:"option",item:function(e){return[e,0,"value="+e+(i==e?" selected":"")]}}),l.klass.selectYear,(o?"":"disabled")+" "+y.ariaAttr({controls:s.$node[0].id+"_table"})+' title="'+l.labelYearSelect+'"')):y.node("div",i,l.klass.year)}var n,i,s=this,l=s.settings,r=s.item,c=r.now,d=r.select,u=r.highlight,h=r.view,m=r.disable,p=r.min,f=r.max,r=(n=(l.showWeekdaysFull?l.weekdaysFull:l.weekdaysShort).slice(0),i=l.weekdaysFull.slice(0),l.firstDay&&(n.push(n.shift()),i.push(i.shift())),y.node("thead",y.node("tr",y.group({min:0,max:6,i:1,node:"th",item:function(e){return[n[e],l.klass.weekdays,'scope=col title="'+i[e]+'"']}}))));return y.node("div",(l.selectYears?a()+t():t()+a())+e()+e(1),l.klass.header)+y.node("table",r+y.node("tbody",y.group({min:0,max:5,i:1,node:"tr",item:function(e){var t=l.firstDay&&0===s.create([h.year,h.month,1]).day?-7:0;return[y.group({min:7*e-h.day+t+1,max:function(){return this.min+7-1},i:1,node:"td",item:function(e){e=s.create([h.year,h.month,e+(l.firstDay?1:0)]);var t,a=d&&d.pick==e.pick,n=u&&u.pick==e.pick,i=m&&s.disabled(e)||e.pick<p.pick||e.pick>f.pick,r=y.trigger(s.formats.toString,s,[l.format,e]);return[y.node("div",e.date,((t=[l.klass.day]).push(h.month==e.month?l.klass.infocus:l.klass.outfocus),c.pick==e.pick&&t.push(l.klass.now),a&&t.push(l.klass.selected),n&&t.push(l.klass.highlighted),i&&t.push(l.klass.disabled),t.join(" ")),"data-pick="+e.pick+" "+y.ariaAttr({role:"gridcell",label:r,selected:!(!a||s.$node.val()!==r)||null,activedescendant:!!n||null,disabled:!!i||null})),"",y.ariaAttr({role:"presentation"})]}})]}})),l.klass.table,'id="'+s.$node[0].id+'_table" '+y.ariaAttr({role:"grid",controls:s.$node[0].id,readonly:!0}))+y.node("div",y.node("button",l.today,l.klass.buttonToday,"type=button data-pick="+c.pick+(o&&!s.disabled(c)?"":" disabled")+" "+y.ariaAttr({controls:s.$node[0].id}))+y.node("button",l.clear,l.klass.buttonClear,"type=button data-clear=1"+(o?"":" disabled")+" "+y.ariaAttr({controls:s.$node[0].id}))+y.node("button",l.close,l.klass.buttonClose,"type=button data-close=true "+(o?"":" disabled")+" "+y.ariaAttr({controls:s.$node[0].id})),l.klass.footer)},a.defaults={labelMonthNext:"Next month",labelMonthPrev:"Previous month",labelMonthSelect:"Select a month",labelYearSelect:"Select a year",monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],today:"Today",clear:"Clear",close:"Close",closeOnSelect:!0,closeOnClear:!0,updateInput:!0,format:"d mmmm, yyyy",klass:{table:(t=e.klasses().picker+"__")+"table",header:t+"header",navPrev:t+"nav--prev",navNext:t+"nav--next",navDisabled:t+"nav--disabled",month:t+"month",year:t+"year",selectMonth:t+"select--month",selectYear:t+"select--year",weekdays:t+"weekday",day:t+"day",disabled:t+"day--disabled",selected:t+"day--selected",highlighted:t+"day--highlighted",now:t+"day--today",infocus:t+"day--infocus",outfocus:t+"day--outfocus",footer:t+"footer",buttonClear:t+"button--clear",buttonToday:t+"button--today",buttonClose:t+"button--close"}},e.extend("pickadate",a)});
;