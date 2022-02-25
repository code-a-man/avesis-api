# avesis-api

<div align="center">
  <br/>
  <br/>
  <p>
	<a href="https://www.npmjs.com/package/avesis-api"><img src="https://badgen.net/npm/dt/avesis-api"/></a>
	<a href="https://www.npmjs.com/package/avesis-api"><img src="https://badgen.net/packagephobia/install/avesis-api"></a>
  </p>
	  <a href="https://npmjs.org/package/avesis-api"><img src="https://nodei.co/npm/avesis-api.png?downloads=true&downloadRank=true&stars=true"></a>
</div>

## 📥 Install

```
$ npm install avesis-api
```

## ⚙️ How to use

```js
const { getDocuments } = require("avesis-api");
// Example URL: https://avesis.aaa.edu.tr/bbb
const options = {
  university: "aaa", // required, University name in URL
  teacher: "bbb", // required, Teacher name in URL required
  limit: 1, // optional, Number of documents to return from last. default = Infinity
  html: false, // optional, return description as HTML string. default = false
};
getDocuments(options).then(function (response) {
  console.log(response);
});
```
## 📤 Example Output
```js
{
	
	teacher: {
		name: 'Asst. Prof. Aaa',
		img: 'https://avesis.aaa.edu.tr/user/image/123123'
  	},
  	list: [
		{
			title: "Last Announcement",
			type: "Duyuru",
			date: "23.02.2022",
			description: 'Description',
  		},
  		{
			title: "Announcement with File",
			type: "Ders Notu",
			date: "20.02.2022",
			description: "Description\nwith\nmultiline",
			link: "https://avesis.aaa.edu.tr/resume/downloadfile/bbb?key=1231231-1231-1231-1231-123123123123",
  		},
	]
}
```
Copyright (c) 2022 Code a Man
