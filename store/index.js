import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state :{
            loadedPost : []
        },
        mutations : {
            setPosts(state, posts){
                state.loadedPost = posts;
            }
        },
        actions : {
            setPosts(vuexContext, posts){
                vuexContext.commit('setPosts', posts);
            }
        },
        getters : {
            loadedPost(state){
                return state.loadedPost;
            }
        }
       
    });
}

export default createStore;