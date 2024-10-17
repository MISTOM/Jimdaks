// Match parameter to integer
export function match(param): boolean {
	//return boolean if param is integer
	return RegExp(/^\d+$/).test(param);
}
