function insert(selector, startText, endText) {
    if(!startText && !endText) {
        throw 'Start-text and/or End-text must be setted';
    }
    
    var aTag = startText;
    var eTag = endText;
    if(!eTag) {
        eTag = '';
    }
    if(!aTag) {
        aTag = '';
    }
	var input = document.querySelector(selector);
	input.focus();
	/* for Internet Explorer */
	if (typeof document.selection != 'undefined') {
		/* Inserting tags */
		var range = document.selection.createRange();
		var insText = range.text;
		range.text = aTag + insText + eTag;
		/* Move to Cursorposition */
		range = document.selection.createRange();
		if (insText.length == 0) {
			range.move('character', -eTag.length);
		} else {
			range.moveStart('character', aTag.length + insText.length + eTag.length);
		}
		range.select();
	}
	/* for new Browsers */
	else if (typeof input.selectionStart != 'undefined') {
		/* inserting of tags */
		var start = input.selectionStart;
		var end = input.selectionEnd;
		var insText = input.value.substring(start, end);
		input.value = input.value.substr(0, start) + aTag + insText + eTag + input.value
			.substr(end);
		/* Move to Cursorposition */
		var pos;
		if (insText.length == 0) {
			pos = start + aTag.length;
		} else {
			pos = start + aTag.length + insText.length + eTag.length;
		}
		input.selectionStart = pos;
		input.selectionEnd = pos;
	}
	/* for other Browsers */
	else {
		/* request the insert position */
		var pos;
		var re = new RegExp('^[0-9]{0,3}$');
		while (!re.test(pos)) {
			pos = prompt("Einfügen an Position (0.." + input.value.length + "):", "0");
		}
		if (pos > input.value.length) {
			pos = input.value.length;
		}
		/* inserting tags */
		var insText = prompt("Bitte geben Sie den zu formatierenden Text ein:");
		input.value = input.value.substr(0, pos) + aTag + insText + eTag + input.value
			.substr(pos);
	}
}
