import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState, TWSActions } from "../types/types";

export const socketMiddleware = (wsUrl: string, wsActions: TWSActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket|null = null;
    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { init, onOpen, onClose, close, onError, onMessage } = wsActions;

      if (type === init) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      };

      if (socket) {

        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          dispatch({ type: onMessage, payload: event });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };

        if (type === close) {
          socket.close(1000, 'work done');
        }
      }

      next(action);
    };
  };
};
