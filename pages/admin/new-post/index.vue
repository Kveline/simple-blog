<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
        <AdminPostForm/>
    </section>
  </div>
</template>

<script>
import AdminPostFrom from '@/components/Admin/AdminPostForm';

export default {
    layout: 'admin',
    components : {
        AdminPostFrom,
    }
    
}
</script>