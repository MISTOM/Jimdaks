import { getContext, setContext } from "svelte";

class State {
    //create type of user

    user: {id:string; name:string} = $state({id:"", name:""});;
    STATE_ID: string = 'state_id'
    constructor(){
    }

    

}
const state = new State();
export const setStateContext = ()=>{
    setContext(state.STATE_ID, state)
}
export const getStateContext = (state_id:string) => {
    return getContext(state_id)
}