<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
  import AdminPostFrom from '@/components/Admin/AdminPostForm';
  import axios from 'axios';

  export default {
    layout: 'admin',
    components: {
      AdminPostFrom,
    },

    asyncData(context) {
      return axios.get(
          `https://nuxt-blog-3c79d-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${context.params.postId}.json`)
        .then(response => {
          return {
            loadedPost: {...response.data, id : context.params.postId}
          }
        })
        .catch(error => console.log(error));
    },

    methods: {
        onSubmitted(editedPost){
            this.$store.dispatch('editPost', editedPost)
                .then(() => this.$router.push('/admin'));
        }
    },

  }
</script>