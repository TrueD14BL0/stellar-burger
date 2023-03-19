export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;
    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { init, sendMessage, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === init) {
        socket = new WebSocket(`${wsUrl}/all`);
      }
      if (socket) {

        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          dispatch({ type: onMessage, payload: event.data });
        };

        socket.onclose = event => {
          console.log('on close', event);
        };

        if (type === sendMessage) {
          console.log('on send mess');
        }
      }

      next(action);
    };
  };
};
