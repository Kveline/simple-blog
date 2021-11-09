import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPost: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPost = posts;
      },

      addPost(state, post) {
        state.loadedPost.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPost.findIndex(post => post.id === editedPost.id);
        state.loadedPost[postIndex] = editedPost;
      },

      setToken(state, token){
        state.token = token;
      },
      
      clearToken(state){
        state.token = null;
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        return axios.get(`${process.env.baseUrl}/posts.json`)
          .then(result => {
            const postsArray = [];
            for (const key in result.data) {
              postsArray.push({
                ...result.data[key],
                id: key
              });
            }
            vuexContext.commit('setPosts', postsArray)
          }).catch(error => {
            console.log(error);
          })
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };
        return axios.post(`https://nuxt-blog-3c79d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json?auth=${vuexContext.state.token}`, createdPost)
          .then(result => {
            vuexContext.commit('addPost', {
              ...createdPost,
              id: result.data.name
            });
          }).catch(error => console.log(error));
      },

      editPost(vuexContext, editedPost) {
        return axios.put(`https://nuxt-blog-3c79d-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`, editedPost)
          .then(result => {
            vuexContext.commit('editPost', editedPost);
          })
          .catch(error => console.log(error));
      },

      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
      },

      authenticatedUser(vuexContext, authdata) {
        let authUrl =
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`;
        if (!authdata.isLogin) {
          authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;
        }
        this.$axios.$post(authUrl, {
            email: authdata.email,
            password: authdata.password,
            returnSecureToken: true
          }).then(result => {
            vuexContext.commit('setToken', result.idToken);
            localStorage.setItem('token', result.idToken);
            localStorage.setItem('tokenExpiration', new Date().getTime() + result.expiresIn*1000);
            vuexContext.dispatch('setLogoutTimer', result.expiresIn*1000)
          })
          .catch(error => console.log(error.response));
      },

      setLogoutTimer(vuexContext, duration){
        setTimeout(() => {
          vuexContext.commit('clearToken');
        }, duration);
      },

      initAuth(vuexContext){
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('tokenExpiration');
        // expired case or no token, add '+' before expirationDate variabel to convert string to number
        if(new Date().getTime() > +expirationDate || !token){
          return;
        }
        vuexContext.dispatch('setLogoutTimer', +expirationDate - new Date().getTime());
        vuexContext.commit('setToken', token);
      }
    },
    getters: {
      loadedPost(state) {
        return state.loadedPost;
      },

      isAuthenticated(state){
        return state.token != null
      }
    }

  });
}

export default createStore;