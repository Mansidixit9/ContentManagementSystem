<template>
  <div class="container">
    <!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Delete Blog</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    Are you sure to delete the current blog?
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary" @click="deleteitem" data-bs-dismiss="modal">Yes</button>
    </div>
  </div>
</div>
</div>
   <div style="margin-top: 10px;display: flex;justify-content: end;"> <button type="button" class="btn btn-outline-secondary"  @click="openInNewTab">Preview </button>&nbsp;&nbsp;&nbsp;&nbsp;
    <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
Delete
</button>
    </div>
   <div> 
    <div class="myheader"><h2>Start Writing Your Blog</h2></div>
    <div class="card shadow-lg mycard" style="margin-bottom: 50px;">
<div class="card-body">
  <div class="options"> <h3>Choose options</h3></div>
      <div class="row ">
       
    <div class="col-6 mystyle ">    <div > 
      <div > <label style="margin-bottom: 10px;">Blog Title</label></div>
      <div class="row g-0">
    
      <div class="col-10">
      <input type="text"  v-model="heading" :disabled="headingPending">
    
    </div>
    <div class="col-2">
      <button  type="button" class="btn btn-sm  btn-success mybtn" @click="convertToHeading" :disabled="headingPending">Add</button>
    </div>
    
  </div>
  </div></div>
    <div class="col-6 mystyle"> <div > 
    <div>  <label style="margin-bottom: 10px;">Subheadings</label></div>
    <div class="row g-0">
    
    <div class="col-10">
      <input type="text" v-model="subheading" >
  </div>
  <div class="col-2">
   <button type="button" class="btn btn-sm  btn-success mybtn" @click="convertToSubheading">Add</button>
  </div>
  
</div>
      
    
    
  </div></div> 
  
  
        
      </div>
   <br>
   
  
      <div class="">
        <div style="margin-bottom: 10px;"><label>Paragraph</label></div>
        
        <textarea v-model="inputText" rows="6" cols="50"></textarea>
      <br>
      <div class="d-grid gap-2 col-6 mx-auto">
<button class="btn btn-success" type="button" @click="convertToHtml">Add</button>

</div>
    </div>

 
  </div>
  <div class="styleimage">
    <div style="margin-bottom: 10px;"><label>Image or Video</label></div>
    
  
              <div class="drop-zone" @dragover.prevent @drop="handleDrop">
      <p class="para">Drag and drop an image or video here</p>
      <input type="file" ref="fileInput" style="display: none" @change="handleFileInput">
    <button class="btn btn-success" @click="openFileInput">Browse File</button>
    </div>  </div>
</div>
</div>
  <div style="padding-bottom: 100px;">

    <div v-for="(content, index) in headings" :key="index">
      <div v-html="content"></div>
      <div style="display: flex;justify-content: center;align-items: center;">
      <button  class="btn btn-outline-danger btn-sm newbutton" @click="deleteHeading(index)">Delete</button>
    </div></div>
    <div v-for="(content, index) in contents" :key="index">
      <div v-html="content"></div>
      <div style="display: flex;justify-content: center;align-items: center;">
      <button class="btn btn-outline-info btn-sm m-2 newbutton" @click="moveUp(index)" :disabled="index === 0">Move Up</button>
      <button class="btn btn-outline-primary btn-sm m-2 newbutton" @click="moveDown(index)" :disabled="index === contents.length - 1">Move Down</button>
      <button class="btn btn-outline-danger btn-sm m-2 newbutton" @click="deleteElement(index)">Delete</button>
    </div>
    </div>
  </div> 
  </div>
</template>

<script>

export default {
  data() {
    return {
      heading:'',
      inputText: '',
      convertedHtml: '',
      contents: [],
      headings:[],
      subheading:'',
      headingPending:false,
    };
  },
  watch: {
    headings:{
      handler(newContents) {
      console.log('Content changed!');
      console.log('New contents:', newContents);
      localStorage.setItem('headings', JSON.stringify(newContents));
      // You can perform any custom action or update data here
    },
    deep: true}, // Enable deep watching for changes in the array   }
  contents: {
    handler(newContents) {
      console.log('Content changed!');
      console.log('New contents:', newContents);
      localStorage.setItem('contentData', JSON.stringify(newContents));
      // You can perform any custom action or update data here
    },
    deep: true, // Enable deep watching for changes in the array
  },
},
created() {
    const contentData = localStorage.getItem('contentData');
    const headings = localStorage.getItem('headings')
    if (contentData) {
      this.contents = JSON.parse(contentData);
      if(headings!==[]){
      this.headings = JSON.parse(headings)
      const regex = /<[^>]+>/g;
      // Remove HTML tags using the regex and return the extracted text
      this.heading=this.headings[0].replace(regex, '');
    
      this.headingPending=true
      }
      // Optional: Clear the data from localStorage if not needed anymore
    }
  },

  methods: {
    openInNewTab() {
  
    window.open('/myblog', '_blank');
  },
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.handleFile(files[0]);
      }
    },
    handleFileInput() {
      const files = this.$refs.fileInput.files;
      if (files.length > 0) {
        this.handleFile(files[0]);
      }
    },
    handleFile(file) {
      if (file.type.startsWith('image/')) {
        this.uploadImage(file);
      } else if (file.type.startsWith('video/')) {
        this.uploadVideo(file);
      }
    },
    uploadImage(file) {
      const reader = new FileReader();
      reader.onload = () => {
        const html = `<img src="${reader.result}" alt="Uploaded Image">`;
        const newhtml =`<div class='imagediv'>${html}</div>`
        this.contents.push(newhtml);
      };
      reader.readAsDataURL(file);
    },
    uploadVideo(file) {
      const reader = new FileReader();
      reader.onload = () => {
        const html = `<video controls src="${reader.result}"></video>`;
        this.contents.push(html);
      };
      reader.readAsDataURL(file);
    },
    convertToHtml() {
      const lines = this.inputText.split('\n');
      const tags = lines.map((line) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('<') && trimmedLine.endsWith('>')) {
          return trimmedLine;
        } else {
          return `<p>${trimmedLine}</p>`;
        }
      });

      this.contents.push(...tags);
      this.inputText = '';
    }, 
    convertToSubheading() {
      const lines = this.subheading.split('\n');
      const tags = lines.map((line) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('<') && trimmedLine.endsWith('>')) {
          return trimmedLine;
        } else {
          return `<h3>${trimmedLine}</h3>`;
        }
      });

      this.contents.push(...tags);
      this.subheading = '';
    },
    convertToHeading() {
      const lines = this.heading.split('\n');
      const tags = lines.map((line) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('<') && trimmedLine.endsWith('>')) {
          return trimmedLine;
        } else {
          return `<h1>${trimmedLine}</h1>`;
        }
      });

      this.headings.push(...tags);
      this.headingPending=true
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    deleteElement(index) {
      this.contents.splice(index, 1);
    },
    deleteHeading(index) {
      this.headings.splice(index, 1);
      this.heading = '';
      this.headingPending=false
    },
    moveUp(index) {
      if (index > 0) {
        const temp = this.contents[index];
        this.contents.splice(index, 1);
        this.contents.splice(index - 1, 0, temp);
      }
    },
    moveDown(index) {
      if (index < this.contents.length - 1) {
        const temp = this.contents[index];
        this.contents.splice(index, 1);
        this.contents.splice(index + 1, 0, temp);
      }
    },
    deleteitem(){
         localStorage.removeItem('contentData')
        localStorage.removeItem('headings')
        this.heading=''
      this.inputText= ''
      this.convertedHtml= ''
      this.contents= []
      this.headings=[]
      this.subheading=''
      this.headingPending=false
     this.subheading='',
     this.headingPending=false
    }
  },
};
</script>

<style >

  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=Lora&family=Lumanosimo&family=PT+Serif&family=Raleway:wght@100&family=Tektur&display=swap');

.drop-zone {
  border: 2px dashed #ccc;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  height:200px;
  margin-bottom: 5px;
}
.para{
  text-align: center;
}
input[type="file"],

img{
  max-height: 100%;
  max-width: 100%;
  border:2px solid black;
  border-radius: 10px;
}
textarea {
  width: 100%;
}
.mystyle{
  display: flex;
  justify-content: center;
  align-items: center;
}
p {
text-align: justify;
margin-top:20px;
margin-bottom:20px;
font-family: 'Lora', serif;
}
.imagediv{
margin-top:25px;
margin-bottom: 25px;

display:flex;
align-items: center;
height: 300px;
  
  justify-content: center;
  


}
h1{
display:flex;
align-items: center;

  
  justify-content: center;
  font-family: 'Lora', serif;
  font-weight: bold;
  text-decoration: underline;
  font-size:48px;
  text-align: center;
}
h3{
  font-family: 'Lora', serif;
  font-weight: bold;
}
h2{
  font-size:80px;
}
.myheader{
  display:flex;
align-items: center;


  justify-content: center;
  font-weight: bold;
font-family: 'Tektur', cursive;
margin-bottom: 20px;
}
.styleimage{
margin:15px
}
.options{
display: flex;
justify-content: center;
align-items: center;

padding: 20px;
}
.mybtn{

height: 35px;
margin-left: 10px;
width:75px;
padding: auto;
}
.newbutton{
  width:100px;
}
input{
height: 35px;
width:450px;

}
.mycard{
  background-color: rgb(231, 245, 245);
  font-family: 'PT Serif', serif;
}
</style>
