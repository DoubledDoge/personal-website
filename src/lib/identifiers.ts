export const toPascalCase = (value: string): string =>
	value
		.replace(/&/g, " And ")
		.replace(/[^\p{L}\p{N}]+/gu, " ")
		.trim()
		.split(/\s+/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");

export const toCamelCase = (value: string): string => {
	const pascalCase = toPascalCase(value);
	return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
};
