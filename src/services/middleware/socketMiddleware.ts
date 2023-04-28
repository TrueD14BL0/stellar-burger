import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState, TWSActions } from "../types/types";

/*
  TODO: Исправить перед следующим спринтом!!!
  Места, в которых можно улучшить проект:

  В socketMiddleware можно объеденить условия когда есть пользователь, и когда его нет (сократить код).
  Для этого стоит сделать общий передаваемый конфиг экшенов с одинаковыми ключами, но разными значениями, и в applyMiddleware
  продублировать третьим параметром вызов socketMiddleware.
  Таким образом applyMiddleware будет иметь два мидлвара сокетов: с персональными экшенами пользователя и общими.
  А внутри socketMiddleware в любом случае будет обращаться к одним и тем же ключам экшенов, где уже более точно
  (в некоторымх моментах) можно проверять какой из двух типов экшенов содержится в данном ключе
*/

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
