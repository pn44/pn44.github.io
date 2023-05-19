const APIURL = "https://amsdc.helioho.st/stats/api"

function log_pageview(pageid) {
	fetch(APIURL + "/stats/update", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"pageid": pageid,
			"increment": ["views"]
		})
    })
}

function write_content(pageid) {
	fetch(`${APIURL}/stats/update?pageid=${pageid}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    })
	.then((res) => res.json())
	.then((data) => {
		document.getElementById("viewsbar").innerHTML = `
			${data.views} views
			<button class="btn btn-danger" id="likebtn" data-likes="${data.likes}" onclick="incr_like(${pageid})">👍  (${data.likes})</button>
		`
	})
}

function incr_like(pageid) {
	fetch(APIURL + "/stats/update", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"pageid": pageid,
			"increment": ["likes"]
		})
    })
	document.getElementById("likebtn").classList.add("disabled")
	var nl = Number(document.getElementById("likebtn").getAttribute("data-likes"))+1;
	document.getElementById("likebtn").innerHTML = `
		❤️ (${nl})
	`
}

