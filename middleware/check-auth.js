// check auth from local storage
export default function (context) {
   console.log('[Middleware] Check auth from local storage');
   if(process.client){
    context.store.dispatch('initAuth');
   }
   
}