module.exports = {
    options:{
        globals:{

            // public.js中需要改首页路径
            // RootUrl:"http://abei.casinodev.com",//Ajax 请求地址

            // imgpath:"http://10.10.2.108:12345/uedfile/dist",
            // csspath:"http://10.10.2.108:12345/uedfile/dist",
            // jspath:"http://10.10.2.108:12345/uedfile/dist",
            // index:"",
            // helpimg:"http://10.10.2.108:12345/uedfile/dist",
            // views:"http://10.10.2.108:12345/uedfile/dist/views/",
            /*决对路径打包时不会自动更换为md5格式文件名*/
            
            // imgpath:"http://127.0.0.1:12345/uedfile/dist",
            // csspath:"http://127.0.0.1:12345/uedfile/dist",
            // jspath:"http://127.0.0.1:12345/uedfile/dist",
            // RootUrl:"http://abei.casinodev.com",
            // index:"http://127.0.0.1:12345/uedfile/dist/views",
            // helpimg:"http://127.0.0.1:12345/uedfile/dist",

            // imgpath:"http://localhost:12345/uedfile/dist",
            // csspath:"http://localhost:12345/uedfile/dist",
            // jspath:"http://localhost:12345/uedfile/dist",
            // RootUrl:"http://abei.casinodev.com",
            // index:"",
            // helpimg:"http://localhost:12345/uedfile/dist",
            // views:"http://localhost:12345/uedfile/dist/views/",

            // imgpath:"..",
            // csspath:"..",
            // jspath:"..", 
            // helpimg:"../..",
            // index:"/",

            
            imgpath:"",
            csspath:"",
            jspath:"",
            index:"http://www.uedk28.com",
            helpimg:"",
            RootUrl:"http://www.uedk18.com",
            views:"/views/",
            keywords:"",
            description:""
        }, 
        ncon:true
    },
    html: {
        cwd: 'app/views/',
        expand: true,
        src: ['**/*.html'],
        dest: 'dist/views/'
    }

};
