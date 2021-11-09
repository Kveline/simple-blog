import Vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';

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
            localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.expiresIn)*1000);
            Cookie.set('jwt', result.idToken);
            Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(result.expiresIn)*1000);
          })
          return this.$axios.$post('http://localhost:3000/api/track-data', {data: 'Authenticated'})
          .catch(error => console.log(error.response));
      },

      setLogoutTimer(vuexContext, duration){
        setTimeout(() => {
          vuexContext.commit('clearToken');
        }, duration);
      },

      initAuth(vuexContext, req){
        let token;
        let expirationDate;
        if(req){
          if(!req.headers.cookie){
            return;
          }
          const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
          if(!jwtCookie) return;
          token = jwtCookie.split('=')[1];
          expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).
          split('=')[1];
        }else if (process.client){
          token = localStorage.getItem('token');
          expirationDate = localStorage.getItem('tokenExpiration');
        }else{
          token = null;
          expirationDate = null;
        }
         // expired case or no token, add '+' before expirationDate variabel to convert string to number
         if(new Date().getTime() > +expirationDate || !token){
          console.log("No token or invalid token!");
          vuexContext.dispatch('logout');
          return;
        }
        vuexContext.commit('setToken', token);
      },

      logout(vuexContext){
        vuexContext.commit('clearToken');
        Cookie.remove('jwt');
        Cookie.remove('expirationDate');
        if(process.client){
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
        }
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