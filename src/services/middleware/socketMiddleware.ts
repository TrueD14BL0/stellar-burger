import { Middleware } from "redux";
import Api from "../../components/Api/Api";
import { deleteCookie, getCookie, setTokenCookies } from "../../utils/utils";
import { RootState, TWSActions } from "../types/types";

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

export const socketMiddleware = (wsUrl: string, wsActions: TWSActions)=> {
  return store => {
    let socket: WebSocket|null = null;
    let userSocket: WebSocket|null = null;
    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { init, onOpen, onClose, close, onError, onMessage,
        initUserOrder, onOpenUserOrder, onCloseUserOrder, closeUserOrder,onErrorUserOrder, onMessageUserOrder } = wsActions;

      const updateToken = () =>{
        Api.getAccessToken(getCookie('refreshToken')||'')
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
          const token:string = getCookie('token')||'Bearer ';
          userSocket = new WebSocket(`${wsUrl}?token=${token.replace(`Bearer `,'')}`);
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
          socket.close(1000, 'work done');
        }
      }

      next(action);
    };
  };
};
