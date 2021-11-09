<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
        <AdminPostForm @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import AdminPostFrom from '@/components/Admin/AdminPostForm';
export default {
    layout: 'admin',
   middleware: ['check-auth', 'auth'],
    components : {
        AdminPostFrom,
    },
    
    methods: {
      onSubmitted(postData){
        this.$store.dispatch('addPost', postData)
          .then(() => this.$router.push("/admin"));
      }
    },
    
}
</script>