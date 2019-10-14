obj = {}
Array.from(document.querySelectorAll('.speaker')).map((spkr, index) => {
	return {
		id: index,
		name: spkr.querySelector('h2').innerText.substr(0) 
	}
}).forEach(item => { obj[item.id] = item.name })
JSON.stringify(obj, null, 2)