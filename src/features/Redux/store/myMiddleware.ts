interface IAction {
    type?: string;
    [key: string]: any;
}

interface IStore {
    dispatch: IDispatch;
    getState: () => any;
}

type Thunk = (dispatch: IDispatch, getState: () => any) => any;
type IDispatch = (action: IAction | Thunk) => any;

export const myMiddleware = (store: IStore) => (next: (action: IAction) => any) => (action: IAction | Thunk) => {
    console.log('Dispatching action:', action);
    if(typeof action === "function"){
        return action(store.dispatch, store.getState);
    } else {
        next(action);
    }
}