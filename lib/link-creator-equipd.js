'use babel';

import { CompositeDisposable } from 'atom'

export default {

	subscriptions: null,

	activate() {
		this.subscriptions = new CompositeDisposable()

		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'link-creator-equipd:parse': () => this.parse()
		}))
	},

	deactivate() {
		this.subscriptions.dispose()
	},
	getSpanishBooks(){
		return [
		    ['Génesis', 'Gé', 'Ge', 'Gé', 'Gene', 'Gen', 'Gén', 'Genesis'],
		    ['Éxodo', 'Éx', 'Ex', 'Exodo', 'Exo'],
		    ['Levítico', 'Le', 'Lev', 'Levítico', 'Levitico'],
		    ['Números', 'Nú', 'Nu', 'Num', 'Numeros'],
		    ['Deuteronomio', 'Dt', 'Deu', 'De'],
		    ['Josué', 'Jos', 'Josue'],
		    ['Jueces', 'Jue'],
		    ['Rut', 'Rut'],
		    ['1 Samuel', '1Sa', '1 Sam'],
		    ['2 Samuel', '2Sa', '2 Sam'],
		    ['1 Reyes', '1Re', '1 Rey'],
		    ['2 Reyes', '2Re', '2 Rey'],
		    ['1 Crónicas', '1Cr', '1 Cro', '1 Cr'],
		    ['2 Crónicas', '2Cr', '2 Cro', '2 Cr'],
		    ['Esdras', 'Esd'],
		    ['Nehemías', 'Ne', 'Neh'],
		    ['Ester', 'Est'],
		    ['Job', 'Job'],
		    ['Salmos', 'Sl', 'Sal', 'Salmo'],
		    ['Proverbios', 'Pr', 'Pro', 'Prov'],
		    ['Eclesiastés', 'Ec', 'Ecl', 'Ecle', 'Eclesiastes'],
		    ['El Cantar de los Cantares', 'Can', 'Cantar', 'Cantar de los Cantares'],
		    ['Isaías', 'Isa', 'Isaias', 'Isa', 'Is'],
		    ['Jeremías', 'Jer', 'Jeremias', 'Jere'],
		    ['Lamentaciones', 'Lam', 'Lament'],
		    ['Ezequiel', 'Eze', 'Ezeq'],
		    ['Daniel', 'Da', 'Dan'],
		    ['Oseas', 'Os', 'Ose'],
		    ['Joel', 'Joe'],
		    ['Amós', 'Am', 'Amos'],
		    ['Abdías', 'Abd', 'Abdias'],
		    ['Jonás', 'Jon', 'Jonas'],
		    ['Miqueas', 'Miq', 'Miquea'],
		    ['Nahúm', 'Na', 'Nah'],
		    ['Habacuc', 'Hab', 'Haba'],
		    ['Sofonías', 'Sof', 'Sofonias'],
		    ['Ageo', 'Ag', 'Age'],
		    ['Zacarías', 'Zac', 'Zacarias'],
		    ['Malaquías', 'Mal', 'Malaquias'],
		    ['Mateo', 'Mt', 'Mat'],
		    ['Marcos', 'Mr', 'Marc', 'Mar'],
		    ['Lucas', 'Lu', 'Luc'],
		    ['Juan', 'Jn'],
		    ['Hechos', 'Hch', 'Hech'],
		    ['Romanos', 'Ro', 'Rom'],
		    ['1 Corintios', '1Co', '1 Cor'],
		    ['2 Corintios', '2Co', '2 Cor'],
		    ['Gálatas', 'Gál', 'Galatas', 'Gal'],
		    ['Efesios', 'Ef', 'Efe'],
		    ['Filipenses', 'Flp', 'Fili'],
		    ['Colosenses', 'Col', 'Colo'],
		    ['1 Tesalonicenses', '1Te', '1 Te', '1 Tes'],
		    ['2 Tesalonicenses', '2Te', '2 Te', '2 Tes'],
		    ['1 Timoteo', '1Ti', '1 Ti', '1 Tim'],
		    ['2 Timoteo', '2Ti', '2 Ti', '2 Tim'],
		    ['Tito', 'Tit'],
		    ['Filemón', 'Flm', 'File', 'Filemon'],
		    ['Hebreos', 'Heb', 'Hebr'],
		    ['Santiago', 'Snt', 'Sant'],
		    ['1 Pedro', '1Pe', '1 Ped', '1 Pe'],
		    ['2 Pedro', '2Pe', '2 Ped', '2 Pe'],
		    ['1 Juan', '1Jn', '1 Jn'],
		    ['2 Juan', '2Jn', '2 Jn'],
		    ['3 Juan', '3Jn', '3 Jn'],
		    ['Judas', 'Jud'],
		    ['Revelación', 'Rev', 'Revelacion', 'Revel', 'Re']
		];
	},
	parse() {
		let editor
		let finalText;
		if (editor = atom.workspace.getActiveTextEditor()) {
			let selection = editor.getText();
			finalText = selection;
			const regex = /([\[=])?([1-3])?(?:\s*)([A-Za-z\u00E0-\u00FC\]]{2,})[.]?(?:\s*)(\d+)(?:\s*)[:]((?:\s*)(?:\d+)(?:(?:[,–,-])?(?:\s*)(?:\d+)?)*)/g;

			let m;

			while ((m = regex.exec(selection)) !== null) {
					// This is necessary to avoid infinite loops with zero-width matches
					if (m.index === regex.lastIndex) {
							regex.lastIndex++;
					}
					var scriptureBefore = m[0].trim();

					var urlToEquipD = this.getBibleUrl(m);
					if (urlToEquipD !== false) {
						finalText = finalText.replace(new RegExp(scriptureBefore, 'g'), urlToEquipD);
					}
			}
		}
		editor.setText(finalText)
	},
	getBibleUrl(search) {
		return this.processMatch(search);
	},
	processMatch(search) {
		part = ''
		book = ''
		abreviation = ''
		chapter = ''
		verses = '';
		if (search[2] !== undefined) {
			part = search[2].trim();
		}
		if (search[3] !== undefined) {
			book = search[3].trim();
		}
		if (search[4] !== undefined) {
			chapter = search[4].trim();
		}
		if (search[5] !== undefined) {
			verses = search[5].trim();
		}
		// console.log('Parte:' + part);
		// console.log('Book:' +book);
		// console.log('Chapter:' +chapter);
		// console.log('Verses:' +verses);
		let libros = this.getBook(part + " " + book);

		if (libros === undefined) {
			return false;
		}

		let libro = libros[0];
		let abreviation = libros[1];
		let replacedString;

		if (search[1] !== undefined) {
			if (search[1] == '[') {
				replacedString = false;
			} else if (search[1] == '='){
				replacedString = false;
			} else {
				replacedString = this.replacer('[{0} {1}:{2}](equipdbible://x-callback-url/lookup?x-source=editorial&language=es&scripture={3}{4}:{5}&x-success=editorial://)', libro.trim(), chapter.trim(), verses, abreviation.trim(), chapter.trim(),verses.trim().replace(' ', ''));
			}
		} else {
			replacedString = this.replacer('[{0} {1}:{2}](equipdbible://x-callback-url/lookup?x-source=editorial&language=es&scripture={3}{4}:{5}&x-success=editorial://)', libro.trim(), chapter.trim(), verses, abreviation.trim(), chapter.trim(),verses.trim().replace(' ', ''));
		}
		return replacedString;

	},
	getBook(book) {
		let bible = this.getSpanishBooks();
		let bookData;
		Array.prototype.forEach.call(bible, list => {
			Array.prototype.forEach.call(list, bookName => {
				if (bookName.toLowerCase().trim() == book.toLowerCase().trim()) {
					bookData = [list[0], list[1]];
				}
			});
		});
		return bookData;
	},
	replacer() {
		var num = arguments.length;
		var oStr = arguments[0];
		for (var i = 1; i < num; i++) {
			var pattern = "\\{" + (i-1) + "\\}";
			var re = new RegExp(pattern, "g");
			oStr = oStr.replace(re, arguments[i]);
		}
		return oStr;
	}
};
