import Api from "../../components/Api/Api";
import { deleteCookie, getCookie, setTokenCookies } from "../../utils/utils";

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;
    let userSocket = null;
    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { init, onOpen, onClose, close, onError, onMessage,
        initUserOrder, onOpenUserOrder, onCloseUserOrder, closeUserOrder,onErrorUserOrder, onMessageUserOrder } = wsActions;

      const updateToken = () =>{
        Api.getAccessToken(getCookie('refreshToken'))
          .then((data)=>{
            setTokenCookies(data.accessToken, data.refreshToken)
            dispatch({ type: initUserOrder, payload:`` });
          })
          .catch((err)=>{
            deleteCookie('token');
            deleteCookie('refreshToken');
            dispatch({ type: onErrorUserOrder, payload: err });
          }
        );
      }

      if (type === init) {
        socket = new WebSocket(`${wsUrl}/all`);
      };
      if(type === initUserOrder){
        if(getCookie('token')){
          userSocket = new WebSocket(`${wsUrl}?token=${getCookie('token').replace(`Bearer `,'')}`);
        }else{
          updateToken();
        }
      }

      if (userSocket) {

        userSocket.onopen = event => {
          dispatch({ type: onOpenUserOrder, payload: event });
        };

        userSocket.onerror = event => {
          if(event==='401'){
            updateToken();
          }else{
            dispatch({ type: onErrorUserOrder, payload: event });
          }
        };

        userSocket.onmessage = event => {
          const message = JSON.parse(event.data);
          if(message.success){
            dispatch({ type: onMessageUserOrder, payload: message });
          }else{
            updateToken();
          }
        };

        userSocket.onclose = event => {
          dispatch({ type: onCloseUserOrder, payload: event.data });
        };

        if (type === closeUserOrder) {
          userSocket.close(1000, 'work done');
        }
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
          dispatch({ type: onClose, payload: event.data });
        };

        if (type === close) {
          console.log('try to close');
          socket.close(1000, 'work done');
        }
      }

      next(action);
    };
  };
};
