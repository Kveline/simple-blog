import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPost: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPost = posts;
      },

      addPost(state, post){
          state.loadedPost.push(post); 
      },
      editPost(state, editedPost){
         const postIndex = state.loadedPost.findIndex(post => post.id === editedPost.id);
         state.loadedPost[postIndex] = editedPost; 
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxt-blog-3c79d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
            .then(result => {
                const postsArray = [];
                for(const key in result.data){
                    postsArray.push({...result.data[key], id : key});
                }
                vuexContext.commit('setPosts', postsArray)
            }).catch(error => { 
                console.log(error);
            })
      },
      addPost(vuexContext, post){
        const createdPost = {...post, updatedDate : new Date()};
        return axios.post('https://nuxt-blog-3c79d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', createdPost)
          .then(result => {
            vuexContext.commit('addPost', {...createdPost, id: result.data.name});
          }).catch(error => console.log(error));
      },

      editPost(vuexContext, editedPost){
        return axios.put(`https://nuxt-blog-3c79d-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${editedPost.id}.json`, editedPost)
            .then(result => {
                vuexContext.commit('editPost', editedPost);
            })
            .catch(error => console.log(error));
      },

      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
      }
    },
    getters: {
      loadedPost(state) {
        return state.loadedPost;
      }
    }

  });
}

export default createStore;