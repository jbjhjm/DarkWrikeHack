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
		var css = iframe2.contentDocument.createElement('style')
		css.rel = "stylesheet"; 
		css.type = "text/css"; 
		css.className = "wdt-styles"; 
		// css.url = chrome.runtime.getUrl('editor.css');
		css.innerHTML = "body { background:#000!important; color:#fff }";
		css.innerHTML += "#innerdocbody { padding-top:15px!important; } ";
		css.innerHTML += "#innerdocbody.w3-taskview-editor { color:#fff!important; } ";
		css.innerHTML += "#innerdocbody a, #innerdocbody a:visited { color:#33baff!important; } ";
		css.innerHTML += ".tasklist-done { color:rgba(255,255,255,.7); text-decoration:line-through; } ";
		css.innerHTML += ".tasklist-not-done:not(:hover) { background-image:none; position:relative; } ";
		css.innerHTML += ".tasklist-not-done:not(:hover):before { content:\"\"; width:14px; height:14px; background:#000; border:1px solid #888; position:absolute; left:0; top: 5px; } ";
 		// var css = '<style type="text/css">' + '.container{background:blue}; ' + '</style>';
		var head = iframe2.contentDocument.getElementsByTagName('head')[0];
		head.appendChild(css);
	}
}

var observer = new MutationObserver(iframeUpdater);

observer.observe(document.body, { subtree:true, attributes: true, childList: true, attributeOldValue: false })
// document.onload