'use strict';

var achBatchCount = 0,
	achBatchContainer,
	addBatchButton,
	achBindie,
	achFile,
	achFileOutput,
	achForbject,
	batchEntryTemplate,
	Bindie = require('bindie'),
	classie = require('classie'),
	expandButton,
	ejs = require('ejs'),
	forbject = require('forbject'),
	loadNachieFile,
	tsACHFileContainer,
	tsACHFileContainerTopPos,
	moment = require('moment'),
	nach = require('nach'),
	newACHBatch,
	newACHEntry,
	notification,
	optionalButton,
	optionalInputs,
	saveAs = require('filesaver.js'),
	StylieNotification = require('stylie.notifications'),
	utils = nach.Utils;

ejs.delimiter = '?';

var showNotification = function (e) {
	notification = new StylieNotification({
		wrapper: document.querySelector('#ach'),
		message: e.type + ': ' + e.message,
		ttl: 6000,
		layout: 'growl',
		effect: 'jelly',
		type: 'notice'
	});
	notification.show();
};

var downloadACH = function () {
	var blob = new Blob([achFileOutput.innerHTML], {
		type: 'text/plain;charset=utf-8'
	});
	saveAs(blob, 'nACHa.txt');
	showNotification({
		type: 'File Saved',
		message: 'nACHa file saved'
	});
};
var saveACH = function () {
	console.log('achFile', achFile);
	// var saveACHObject = {},
	// 	saveACHBatches = [],
	// 	getEntryValues = function(entryObject){
	// 		var returnEntryObject={};
	// 		for (var entryFieldProp in entryObject.fields) {
	// 			returnEntryObject[entryFieldProp] = entryObject.fields[entryFieldProp].value;
	// 		}
	// 		return returnEntryObject;
	// 	},
	// 	getBatchValues = function (batchObject) {
	// 		console.log('batchObject', batchObject);
	// 		var returnBatchObject = {};
	// 		for (var batchHeaderProp in batchObject.header) {
	// 			returnBatchObject[batchHeaderProp] = batchObject.header[batchHeaderProp].value;
	// 		}
	// 		if(batchObject._entries.length>0){
	// 			returnBatchObject.entries=[];
	// 			for (var d = 0; d < batchObject._entries.length; d++) {
	// 				returnBatchObject.entries[d] = getEntryValues(batchObject._entries[d]);
	// 			}
	// 		}
	// 		return returnBatchObject;
	// 	};
	// for (var headerprop in achFile.header) {
	// 	saveACHObject[headerprop] = achFile.header[headerprop].value;
	// }
	// for (var c = 0; c < achFile._batches.length; c++) {
	// 	saveACHBatches[c] = getBatchValues(achFile._batches[c]);
	// }
	// saveACHObject.batches = saveACHBatches;
	// console.log('saveACHObject', saveACHObject);
	var blob = new Blob([JSON.stringify(achFile, null, '  ')], {
		type: 'application/json;charset=utf-8'
	});
	saveAs(blob, 'nachie.json');
	showNotification({
		type: 'File Saved',
		message: 'Nachie file saved'
	});
};

var showOptionalInput = function () {
	if (classie.has(optionalButton, 'showing-optional')) {
		classie.remove(optionalButton, 'showing-optional');
		optionalButton.innerHTML = 'show optional';
		for (var x = 0; x < optionalInputs.length; x++) {
			classie.remove(optionalInputs[x], 'ts-show-optional');
		}
	}
	else {
		classie.add(optionalButton, 'showing-optional');
		optionalButton.innerHTML = 'hide optional';
		for (var y = 0; y < optionalInputs.length; y++) {
			classie.add(optionalInputs[y], 'ts-show-optional');
		}
	}
};

var expandACHOutput = function () {
	if (classie.has(tsACHFileContainer, 'expanded')) {
		classie.remove(tsACHFileContainer, 'expanded');
		expandButton.innerHTML = 'expand';
	}
	else {
		classie.add(tsACHFileContainer, 'expanded');
		expandButton.innerHTML = 'collapse';
	}
};

var addACHBatch = function () {
	achForbject.refresh();
	achBindie.update({
		data: {
			achBatchCount: {
				batchIndex: achBatchCount,
				forbjectData: {
					formdata: achForbject.getObject()
				}
			},
		}
	});
	achForbject.refresh();
	achBatchCount++;
};

var updateNachieOutput = function (achFile) {
	try {
		achFile.generateFile(function (fileString) {
			achFileOutput.innerHTML = fileString;
		});
	}
	catch (e) {
		showNotification(e);
		console.error(e);
	}
};

var updateNach = function (data) {
	try {
		// console.log('updateNach data', data);
		achFile = new nach.File(data.file);

		if (data.batches) {
			for (var z in data.batches) {
				// console.log('data.batches[z]', data.batches[z]);
				data.batches[z].effectiveEntryDate = moment(data.batches[z].effectiveEntryDate, 'YYMMDD').toDate();
				newACHBatch = new nach.Batch(data.batches[z]);

				if (data.batches[z].entries) {
					// console.log('data.batches[z].entries', data.batches[z].entries);
					for (var y in data.batches[z].entries) {
						newACHEntry = new nach.Entry(data.batches[z].entries[y]);
						newACHBatch.addEntry(newACHEntry);
					}
				}
				// console.log('achFile.addBatch', achFile.addBatch);
				achFile.addBatch(newACHBatch);
			}
		}
		// console.log('achFile', achFile);
		updateNachieOutput();
	}
	catch (e) {
		showNotification(e);
		console.error(e);
	}
};

var initDefaultValues = function () {
	document.querySelector('#fileCreationDate').value = utils.formatDate(new Date());
	document.querySelector('#fileCreationTime').value = utils.formatTime(new Date());
};

var updateOptionalInputs = function () {
	optionalInputs = document.querySelectorAll('.ts-form-optional');
};

var achBatchContainerClickHandler = function (e) {
	var clickTarget = e.target,
		batchIndex, entryIndex, entryhtml, batchElement, elementsInBatch, entryHtmlElement = document.createElement('section');

	if (classie.has(clickTarget, 'remove-batch-button')) {
		batchIndex = clickTarget.getAttribute('data-batchIndex');
		achBatchContainer.removeChild(document.querySelector('#ach-batch-' + batchIndex));
		achBatchCount--;
		achForbject.refresh();
	}
	else if (classie.has(clickTarget, 'remove-batchentry-button')) {
		batchIndex = clickTarget.getAttribute('data-batchIndex');
		entryIndex = clickTarget.getAttribute('data-entryIndex');
		document.querySelector('#ach-batch-entrycontainer-' + batchIndex).removeChild(document.querySelector('#ach-batchentry-' + batchIndex + '-' + entryIndex));
		achForbject.refresh();
	}
	else if (classie.has(clickTarget, 'add-batch-entry-button')) {
		batchIndex = clickTarget.getAttribute('data-batchIndex');
		batchElement = document.querySelector('#ach-batch-' + batchIndex);
		// console.log('batchElement', batchElement);
		elementsInBatch = batchElement.querySelectorAll('.ach-batchentry');
		// entryIndex = (elementsInBatch.length > 0) ? (elementsInBatch.length - 1) : 0;
		entryIndex = elementsInBatch.length;
		console.log('entryIndex', entryIndex);
		console.log('elementsInBatch', elementsInBatch);
		console.log('elementsInBatch.length', elementsInBatch.length);
		entryhtml = ejs.render(batchEntryTemplate, {
			batchIndex: batchIndex,
			entryIndex: entryIndex,
			entriesCount: elementsInBatch.length + 1,
			forbjectData: {
				formdata: achForbject.getObject()
			}
		});
		entryHtmlElement.setAttribute('class', 'ach-batchentry ts-form-row');
		entryHtmlElement.setAttribute('id', 'ach-batchentry-' + batchIndex + '-' + entryIndex);
		entryHtmlElement.setAttribute('data-batchIndex', batchIndex);
		entryHtmlElement.setAttribute('data-entryIndex', entryIndex);
		//id="ach-batchentry-<?-batchIndex?>-<?-entryIndex?>"
		entryHtmlElement.innerHTML = entryhtml;
		// document.querySelector('#ach-batch-entrycontainer-' + batchIndex).appendChild(entryHtmlElement);
		document.querySelector('#ach-batch-entrycontainer-' + batchIndex).innerHTML = '<section class="ach-batchentry ts-form-row" id="ach-batchentry-' + batchIndex + '-' + entryIndex + '" data-batchindex="' + batchIndex + '" data-entryindex="' + entryIndex + '">' + entryhtml + '</section>';
		achForbject.refresh();
	}
};

var moveACHFileOutput = function () {
	if (window.scrollY > tsACHFileContainerTopPos && !classie.has(tsACHFileContainer, 'ach-fix-top')) {
		classie.add(tsACHFileContainer, 'ach-fix-top');
	}
	else if (window.scrollY < tsACHFileContainerTopPos && classie.has(tsACHFileContainer, 'ach-fix-top')) {
		classie.remove(tsACHFileContainer, 'ach-fix-top');
	}
};

var loadNachieFromObject = function (nachie) {
	// console.log('nachie', nachie);
	var data = {},
		getEntryValues = function (entryObject) {
			var returnEntryObject = {};
			for (var entryFieldProp in entryObject.fields) {
				returnEntryObject[entryFieldProp] = entryObject.fields[entryFieldProp].value;
			}
			return returnEntryObject;
		},
		getBatchValues = function (batchObject) {
			var returnBatchObject = {};
			for (var batchHeaderProp in batchObject.header) {
				returnBatchObject[batchHeaderProp] = batchObject.header[batchHeaderProp].value;
			}
			if (batchObject._entries.length > 0) {
				returnBatchObject.entries = [];
				for (var d = 0; d < batchObject._entries.length; d++) {
					returnBatchObject.entries[d] = getEntryValues(batchObject._entries[d]);
				}
			}
			return returnBatchObject;
		};

	try {
		//createfile
		for (var headerprop in nachie.header) {
			data[headerprop] = nachie.header[headerprop].value;
		}
		achFile = new nach.File(data);

		if (nachie._batches) {
			for (var z = 0; z < nachie._batches.length; z++) {
				nachie._batches[z] = getBatchValues(nachie._batches[z]);
				nachie._batches[z].effectiveEntryDate = moment(nachie._batches[z].effectiveEntryDate, 'YYMMDD').toDate();
				//createbatches
				newACHBatch = new nach.Batch(nachie._batches[z]);
				console.log('newACHBatch', newACHBatch);
				if (nachie._batches[z].entries) {
					// console.log('nachie._batches[z].entries', nachie._batches[z].entries);
					for (var y in nachie._batches[z].entries) {
						//createentries
						newACHEntry = new nach.Entry(nachie._batches[z].entries[y]);
						console.log('newACHEntry', newACHEntry);
						//addentriestobatch
						newACHBatch.addEntry(newACHEntry);
					}
				}
				//addbatchtofile
				achFile.addBatch(newACHBatch);
			}
		}

		//updateoutput
		updateNachieOutput(achFile);
	}
	catch (e) {
		showNotification(e);
		console.error(e);
	}
};

var loadNachieFileHandler = function () {
	var file = loadNachieFile.files[0],
		filereader = new FileReader(),
		fileJSON;
	filereader.readAsText(file);
	filereader.onload = function () {
		try {
			fileJSON = JSON.parse(filereader.result);
			loadNachieFromObject(fileJSON);

			showNotification({
				type: 'File Loaded',
				message: 'nACHa file loaded'
			});
		}
		catch (e) {
			showNotification(e);
			console.error(e);
		}
	};
};

window.addEventListener('load', function () {
	achBindie = new Bindie({
		ejsdelimiter: '?',
		strictbinding: true
	});
	achBindie.addBinder({
		prop: 'achBatchCount',
		elementSelector: '#ach-file-batches',
		binderType: 'template',
		binderTemplate: document.querySelector('#ach-batch-template').innerHTML,
		binderCallback: function ( /*cbdata*/ ) {
			updateOptionalInputs();
			achForbject.refresh();
			// console.log('binderCallback cbdata', cbdata);
		}
	});
	achFileOutput = document.querySelector('#ach-file-output');
	achForbject = new forbject('#ach', {
		autorefresh: true,
		valuefilter: function (val) {
			if (typeof val === 'string') {
				return val.toUpperCase();
			}
			else {
				return val;
			}
		}
	});
	achForbject.on('autoRefreshOnValChange', updateNach);
	addBatchButton = document.querySelector('#add-batch-button');
	addBatchButton.addEventListener('click', addACHBatch, false);
	achBatchContainer = document.querySelector('#ach-file-batches');
	achBatchContainer.addEventListener('click', achBatchContainerClickHandler, false);
	batchEntryTemplate = document.querySelector('#ach-batch-entrytemplate').innerHTML;
	expandButton = document.querySelector('#expand-button');
	expandButton.addEventListener('click', expandACHOutput, false);
	loadNachieFile = document.querySelector('#load-button');
	loadNachieFile.addEventListener('change', loadNachieFileHandler, false);
	optionalButton = document.querySelector('#optional-button');
	optionalButton.addEventListener('click', showOptionalInput, false);
	optionalInputs = document.querySelectorAll('.ts-form-optional');
	tsACHFileContainer = document.querySelector('#ts-ach-file-container');
	tsACHFileContainerTopPos = tsACHFileContainer.getBoundingClientRect().top;
	initDefaultValues();
	document.querySelector('#download-button').addEventListener('click', downloadACH, false);
	document.querySelector('#save-button').addEventListener('click', saveACH, false);
	window.achForbject = achForbject;
	window.achFile = achFile;
	window.addEventListener('scroll', moveACHFileOutput, false);
}, false);
