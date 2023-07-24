import { createRouter, createWebHistory } from 'vue-router';
import CreateBlog from './components/CreateBlog'
import MyBlog from './components/MyBlog'


const routes =[
    {path:'/',name:'createBlog',component:CreateBlog},
 {path:'/myblog' ,name:'myBlog',component:MyBlog}
]




const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  export default router;