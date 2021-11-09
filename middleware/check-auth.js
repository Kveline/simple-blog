// check auth from local storage
export default function (context) {
   console.log('[Middleware] Check auth from local storage');
   if(context.hasOwnProperty('ssrContext')) {
    context.store.dispatch('initAuth', context.ssrContext.req);
  } else {
    context.store.dispatch('initAuth', null);
  }
   
   
}