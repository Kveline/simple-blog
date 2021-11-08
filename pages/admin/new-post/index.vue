<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
        <AdminPostForm @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import AdminPostFrom from '@/components/Admin/AdminPostForm';
import axios from 'axios';

export default {
    layout: 'admin',
    components : {
        AdminPostFrom,
    },
    
    methods: {
      onSubmitted(postData){
        axios.post('https://nuxt-blog-3c79d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', postData)
          .then(result => {
            console.log(result);
          }).catch(error => console.log(error));
      }
    },
    
}
</script>