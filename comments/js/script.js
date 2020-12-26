//функция фильтер, выдает только значение, подходящие под переданный тип
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
//функция для выдачи результата
	hideAllResponseBlocks = () => {
		//собираем все дивы с варинатами результата в массив
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//и скрываем все блоки
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
//функция делающая релевантный блок видимым
//spanSelector - часть блока с тексом успеха или ошибки
//msgText - текст формируемый исходя из введенных данных
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//скрываем все блоки
		hideAllResponseBlocks();
		//нужный блок показываем
		document.querySelector(blockSelector).style.display = 'block';
		//если есть подходящие данные(error/ok) -  выводит нужный текст
		if (spanSelector) {
			//текст передается по результатам ввода
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	// функция, если в массиве данных не подходящий под выбранный тип, передаем div-error
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// функция, если есть данные, которые подходят под выбранный тип, передаем div-ok
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//дефольное поле, если вообще нет данных
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//функция фильтрации введенных данных и вызова нужной функции
	//передаем выборанный тип и введенные данные
	tryFilterByType = (type, values) => {
		//проверяем данные
		try {
			//берем все данные выбранного типа, через запятую
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//если такие данные есть
			const alertMsg = (valuesArray.length) ?
			//формируем текст сообщения
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			//запускаем функцию передавая есть сформированное сообщение
			showResults(alertMsg);
		} catch (e) {
			//если нет подходящих данных вызываем функции с сообщением об ошибке
			showError(`Ошибка: ${e}`);
		}
	};
//берем кнопку для фильтрации
const filterButton = document.querySelector('#filter-btn');

//по кнлику на кнопку фильтр(и атоматически на ентер т.к. это форма)
filterButton.addEventListener('click', e => {
	//берем кнопку для type
	const typeInput = document.querySelector('#type');
	//берем кнопку для ввода данных
	const dataInput = document.querySelector('#data');
	//если данных не ввели вообще
	if (dataInput.value === '') {
		//выдаем кастомное сообщение
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//оставляем дефолтный див
		showNoResults();
	} else {
		//меняем кастомное сообщение на пустое
		dataInput.setCustomValidity('');
		//отменяем перезагрузку
		e.preventDefault();
		//вызываем основную функцию, передаем тип и данные предварительно удалив пробелы
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

