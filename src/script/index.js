window.onload=()=>{
const content=document.querySelector('div.content'),title=document.querySelector('div.title'),blob=new Blob();
const mds="./src/md/",defaultPage="index";

// var dev='# Hello Light\n$123^{2}$\n';

// content.innerHTML=marked.parse(dev);
// MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
// let script=document.createElement("script");
// script.src="https://cdn.bootcss.com/mathjax/3.0.5/es5/tex-mml-chtml.js";
// document.body.append(script);

window.onhashchange=async()=>{
    let link=window.location.hash.slice(1),data,n;
    link=mds+(link==''?defaultPage:link)
    try{
        data=(await get(link)).data,n=data.indexOf('\n');
    }catch(e){
        window.location.hash="#";
        return 0;
    }
    title.innerHTML=data.slice(0,n);
    content.innerHTML=marked.parse(data.slice(n+1));
    hljs.highlightAll();
    MathJax.typeset([content]);
};

window.onhashchange();

function get(link,method='get',data=null){
    return axios({
        url:link,
        method:method,
        data:data
    });
}}
