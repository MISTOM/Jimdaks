class State {
	//create type of user

	user: { id: string; name: string } = $state({ id: '', name: '' });
	STATE_ID: symbol = Symbol('state_id');
	constructor() {}
}
const state = $state(new State());
export default state;
