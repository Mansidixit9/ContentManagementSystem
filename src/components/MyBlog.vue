<!-- TargetPage.vue -->
<template>
  <div class="container" style="margin-top: 50px;">
    <div v-for="(contents, index) in headings" :key="index">
        <div v-html="contents"></div>
       
      </div>
    
    <div v-for="(contents, index) in content" :key="index">
        <div v-html="contents"></div>
       
      </div>
    </div>
 
</template>

<script>
export default {
  data() {
    return {
      content: [],
      headings:[]
    };
  },
  created() {
    const contentData = localStorage.getItem('contentData');
    const headings = localStorage.getItem('headings')
    if (contentData) {
      this.content = JSON.parse(contentData);
      this.headings = JSON.parse(headings)
      // Optional: Clear the data from localStorage if not needed anymore
    }
  },
};
</script>
<style scoped>
  .drop-zone {
    border: 2px dashed #ccc;
    padding: 25px;
    text-align: center;
    cursor: pointer;
  }
  
  input[type="file"],
  button {
    margin-top: 10px;
  }
  img{
    /* max-height: 100%; */
    max-width: 100%;
    border:2px solid black;
    border-radius: 10px;
  }
  textarea {
    width: 100%;
  }
  .mystyle{
    
  }
  p {
  text-align: justify;
}
.imagediv{
  margin-top:10px;

  display:flex;
  align-items: center;
  max-height: 400px;
    
    justify-content: center;
    

  
}
h1{
  display:flex;
  align-items: center;
  
    
    justify-content: center;
}
  </style>
  