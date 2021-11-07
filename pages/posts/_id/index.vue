<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{loadedPost.title}}</h1>
      <div class="post-details">
        <div class="post-detail">Last update on {{loadedPost.updatedDate}}</div>
        <div class="post-detail">written by {{loadedPost.author}}</div>
      </div>
      <p class="post-content">{{loadedPost.content}}</p>
    </section>
    <section class="post-feedback">
      <p>let me know... <a href="">yusuf@mail.com</a> </p>
    </section>
  </div>
</template>

<script>
  export default {
    asyncData(context, callback) {
      setTimeout(() => {
        callback(null, {
          loadedPost: {
            id: '1',
            title: "Hello world! (ID : " + context.params.id + ") ",
            previewText: "Hope you enjoy it as much as i do",
            author : "Yusuf",
            updatedDate : new Date(),
            content : 'Mayor Jenderal Mamlouk diangkat sebagai Kepala Keamanan Nasional, untuk menggantikan Hisham Ikhtiar yang tewas dalam pemboman sepekan sebelumnya.', 
            thumbnail: "https://i.ibb.co/t26TSBb/Capture.png"
          }
        });
      }, 1000);
    },
  }
</script>

<style scoped>
  .single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
  }

  .post {
    width: 100%;
  }

  @media (min-width: 768px) {
    .post {
      width: 600px;
      margin: auto;
    }
  }

  .post-title {
    margin: 0;
  }

  .post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .post-details {
      flex-direction: row;
    }
  }

  .post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
  }

  .post-feedback a {
    color: red;
    text-decoration: none;
  }

  .post-feedback a:hover,
  .post-feedback a:active {
    color: salmon;
  }
</style>