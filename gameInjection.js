function until(domStr, callback, condition) {
	let count = 0, maxTrySec = 30
	let intervalId = setInterval(function() {
		doIfExist()
	}, 500)
	let doIfExist = function() {
		console.log("interval #" + intervalId + " callback " + count + " " + condition)
		if (count > maxTrySec * 1000 / 500) {
			clearInterval(intervalId)
		}
		count++;
		let dom = document.querySelectorAll(domStr);
	    if (dom.length > 0 && (condition == undefined || condition())) {
	    	callback(dom[0])
	    	clearInterval(intervalId)
	    }
	}
	doIfExist()
}

function repeat(callback) {
	let count = 0, maxTrySec = 30
	callback()
	setTimeout(function foo() {
		// console.log("interval #" + "0" + " callback " + count)
		callback()
		if (count < maxTrySec * 1000 / 500) {
			setTimeout(foo, 500)
			count++
		}
	}, 500)
}

let flag = false

until(".fg-click2play", function(dom) {
	let event = new Event("pointerup");
	dom.dispatchEvent(event);
	console.log(flag)
}, ()=>{return flag})

until("#fg-clip", function(dom) {
	dom.remove()
})

repeat(function() {
	if (typeof(fg_api) != "undefined") {
		fg_api.prototype.getMoreGamesButtonImage = function(forceAbsolute) {return '/html5games/branding/default/More_Games600x253_transparent.png'}
		flag = true
	}
})

// until("", function(dom) {
	
// })