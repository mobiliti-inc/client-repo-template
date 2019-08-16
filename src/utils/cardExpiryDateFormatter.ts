const cardExpiryDateFormatter = (string: string) =>
	string
		.replace(
			/^([1-9]\/|[2-9])$/g,
			"0$1/" // To handle 3/ > 03/
		)
		.replace(
			/^(0[1-9]{1}|1[0-2]{1})$/g,
			"$1/" // 11 > 11/
		)
		.replace(
			/^([0-1]{1})([3-9]{1})$/g,
			"0$1/$2" // 13 > 01/3
		)
		.replace(
			/^(\d)\/(\d\d)$/g,
			"0$1/$2" // To handle 1/11 > 01/11
		)
		.replace(
			/^(0?[1-9]{1}|1[0-2]{1})([0-9]{2})$/g,
			"$1/$2" // 141 > 01/41
		)
		.replace(
			/^([0]{1,})\/|[0]{1,}$/g,
			"0" // To handle 0/ > 0 and 00 > 0
		)
		.replace(
			/[^\d\/]|^[\/]{0,}$/g,
			"" // To allow only numbers and /
		)
		.replace(
			/\/\//g,
			"/" // Prevent entering more than 1 /
		);

export default cardExpiryDateFormatter;
