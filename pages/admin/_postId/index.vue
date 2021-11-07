<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost"/>
        </section>
    </div>
</template>

<script>
import AdminPostFrom from '@/components/Admin/AdminPostForm';

export default {
    layout: 'admin',
    components : {
        AdminPostFrom,
    },

    data() {
        return {
            loadedPost : {
                author : 'Yusuf',
                title : 'Hellow world',
                content : 'Supeerrr amazing, thanks',
                thumbnailLink : ''

            }
        }
    },
    
}
</script>