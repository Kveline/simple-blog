<template>
  <div class="post-list">
    <section class="featured-posts">
      <PostPreview v-for="post in posts" :key="post.id" :id="post.id" :is-admin=isAdmin :previewText="post.previewText"
        :title="post.title" :thumbnail="post.thumbnailLink" />
    </section>
  </div>
</template>

<script>
  import PostPreview from '@/components/Posts/PostPreview'

  export default {
    components: {
      PostPreview
    },
    props: {
      isAdmin: {
        type: Boolean,
        default: false,
      },

      posts: {
        type: Array,
        required: true
      }
    }

  }
</script>

<style scoped>
  .posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .intro {
    height: 300px;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    background-position: center;
    background-size: cover;
    background-image: url('~assets/images/main-page-background.jpg');
  }

  .intro h1 {
    position: absolute;
    top: 10%;
    left: 5%;
    width: 90%;
    font-size: 1.5rem;
    color: black;
    background-color: rgb(211, 211, 211);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px black;
    box-sizing: border-box;
    border: 1px solid black;
  }

  @media (min-width: 768px) {
    .intro h1 {
      font-size: 2rem;
    }
  }

  .featured-posts {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>