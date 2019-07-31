// Track DOM for iframe insert event (the description editor is iframe based)
var iframeUpdater = function() { 

	var iframes = document.querySelectorAll('iframe');
	var iframe1;
	for(var i=0; i<iframes.length; i++) {
		if(iframes[i].getAttribute('name')==='ace_outer') {
			iframe1 = iframes[i];
		}
	}

	if(iframe1) {
		var iframe2 = iframe1.contentDocument.querySelector('.ace-inner-iframe');
		if(!iframe2) return;
		if(iframe2.contentDocument.querySelector('.wdt-styles')) return;
		// console.log('####### 2',iframe2, iframe2.contentDocument);
		// var url = chrome.runtime.getURL("editor.css");
		// console.log(url);
		var css = iframe2.contentDocument.createElement('link');
		css.rel = "stylesheet"; 
		css.type = "text/css"; 
		css.className = "wdt-styles"; 
		css.href = chrome.runtime.getURL('editor.css');
		// css.innerHTML = "body { background:#000!important; color:#fff }";
 		// var css = '<style type="text/css">' + '.container{background:blue}; ' + '</style>';
		var head = iframe2.contentDocument.getElementsByTagName('head')[0];
		head.appendChild(css);
	}
}

var observer = new MutationObserver(iframeUpdater);

observer.observe(document.body, { subtree:true, attributes: true, childList: true, attributeOldValue: false })
// document.onload