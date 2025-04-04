import{c as e,o as t,a as s,d as a,r as l,b as i,F as o,e as r,t as n,n as c,f as d,g as p,h as m,i as u,j as g,k as f,w as b,l as h,v as x}from"./vendor-DyC_z4BE.js";const v=e=>new Promise(((t,s)=>{const a=new Image;a.onload=()=>t(e),a.onerror=()=>{s(new Error(`Failed to load image: ${e}`))},a.src=e})),w=async e=>{try{await Promise.all(e.map(v))}catch(t){}};class y{constructor(e=0,t="Network Error"){this.status=e,this.text=t}}const k={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:(()=>{if("undefined"!=typeof localStorage)return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}})()},j=e=>e?"string"==typeof e?{publicKey:e}:"[object Object]"===e.toString()?e:{}:{},S=async(e,t,s={})=>{const a=await fetch(k.origin+e,{method:"POST",headers:s,body:t}),l=await a.text(),i=new y(a.status,l);if(a.ok)return i;throw i},_=(e,t,s)=>{if(!e||"string"!=typeof e)throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||"string"!=typeof t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!s||"string"!=typeof s)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},P=e=>e.webdriver||!e.languages||0===e.languages.length,D=()=>new y(451,"Unavailable For Headless Browser"),M=(e,t)=>{if((e=>{var t;return!(null==(t=e.list)?void 0:t.length)||!e.watchVariable})(e))return!1;((e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if("string"!=typeof t)throw"The BlockList watchVariable has to be a string"})(e.list,e.watchVariable);const s=(a=t,l=e.watchVariable,a instanceof FormData?a.get(l):a[l]);var a,l;return"string"==typeof s&&e.list.includes(s)},L=()=>new y(403,"Forbidden"),C=async(e,t,s)=>{if(!t.throttle||!s)return!1;((e,t)=>{if("number"!=typeof e||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&"string"!=typeof t)throw"The LimitRate ID has to be a non-empty string"})(t.throttle,t.id);const a=t.id||e,l=await(async(e,t,s)=>{const a=Number(await s.get(e)||0);return t-Date.now()+a})(a,t.throttle,s);return l>0||(await s.set(a,Date.now().toString()),!1)},T=()=>new y(429,"Too Many Requests"),A={init:(e,t="https://api.emailjs.com")=>{if(!e)return;const s=j(e);k.publicKey=s.publicKey,k.blockHeadless=s.blockHeadless,k.storageProvider=s.storageProvider,k.blockList=s.blockList,k.limitRate=s.limitRate,k.origin=s.origin||t},send:async(e,t,s,a)=>{const l=j(a),i=l.publicKey||k.publicKey,o=l.blockHeadless||k.blockHeadless,r=l.storageProvider||k.storageProvider,n={...k.blockList,...l.blockList},c={...k.limitRate,...l.limitRate};if(o&&P(navigator))return Promise.reject(D());if(_(i,e,t),(e=>{if(e&&"[object Object]"!==e.toString())throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"})(s),s&&M(n,s))return Promise.reject(L());if(await C(location.pathname,c,r))return Promise.reject(T());const d={lib_version:"4.4.1",user_id:i,service_id:e,template_id:t,template_params:s};return S("/api/v1.0/email/send",JSON.stringify(d),{"Content-type":"application/json"})},sendForm:async(e,t,s,a)=>{const l=j(a),i=l.publicKey||k.publicKey,o=l.blockHeadless||k.blockHeadless,r=k.storageProvider||l.storageProvider,n={...k.blockList,...l.blockList},c={...k.limitRate,...l.limitRate};if(o&&P(navigator))return Promise.reject(D());const d=(e=>"string"==typeof e?document.querySelector(e):e)(s);_(i,e,t),(e=>{if(!e||"FORM"!==e.nodeName)throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"})(d);const p=new FormData(d);return M(n,p)?Promise.reject(L()):await C(location.pathname,c,r)?Promise.reject(T()):(p.append("lib_version","4.4.1"),p.append("service_id",e),p.append("template_id",t),p.append("user_id",i),S("/api/v1.0/email/send-form",p))},EmailJSResponseStatus:y},z={class:"flex justify-center items-center h-full"};const I=((e,t)=>{const s=e.__vccOpts||e;for(const[a,l]of t)s[a]=l;return s})({},[["render",function(a,l){return t(),e("div",z,l[0]||(l[0]=[s('<svg class="animate-spin h-16 w-16 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f59e0b"></stop><stop offset="100%" stop-color="#ec4899"></stop></linearGradient></defs><circle class="opacity-25" cx="12" cy="12" r="10" stroke="url(#gradient1)" stroke-width="4" fill="none"></circle><path fill="#f59e0b" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>',1)]))}]]),E="/personal-website/assets/img/top_picture-Dwp2L5Ms.png",B="/personal-website/assets/img/personal-website-D6LJAsFJ.png",O={class:"flex justify-between items-center p-6 bg-opacity -50 relative z-20"},R={class:"md:hidden z-30"},H={key:0,class:"text-5xl"},V={key:1,class:"text-5xl"},U={class:"flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0"},F=["href","onClick"],q=a({__name:"NavBar",setup(s){const a=l([{name:"Services",href:"#services"},{name:"About Me",href:"#about"},{name:"Skills",href:"#skills"},{name:"Projects",href:"#projects"},{name:"Contact",href:"#contact"}]),d=l(!1);return(s,l)=>(t(),e("header",O,[l[3]||(l[3]=i("div",{class:"text-white text-3xkl font-bold"},"Dihan Britz",-1)),i("div",R,[i("button",{type:"button",class:"block - focus:outline-hidden",onClick:l[0]||(l[0]=e=>d.value=!d.value)},[d.value?(t(),e("span",H,l[1]||(l[1]=[i("img",{src:"https://img.icons8.com/ios-filled/100/ffffff/delete-sign.png",alt:"Close",width:"50",height:"50"},null,-1)]))):(t(),e("span",V,l[2]||(l[2]=[i("img",{src:"https://img.icons8.com/ios-filled/100/ffffff/menu--v6.png",alt:"Menu",width:"50",height:"50"},null,-1)])))])]),i("nav",{class:c(["fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#111827] md:relative md:bg-transparent md:flex md:justify-between md:flex-row",d.value?"block":"hidden"])},[i("ul",U,[(t(!0),e(o,null,r(a.value,(s=>(t(),e("li",{key:s.name},[i("a",{href:s.href,class:"block text-white transition hover:text-primary ease linear text-2xl md:text-lg",onClick:e=>(e=>{d.value=!1;const t=document.querySelector(e);t&&t.scrollIntoView({behavior:"smooth"})})(s.href)},n(s.name),9,F)])))),128))])],2)]))}}),N=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"})),G={class:"relative w-full","data-aos":"zoom-in-up"},W={class:"w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-(--breakpoint-lg) lg:max-w-(--breakpoint-xl) mx-auto relative"},K={class:"grid lg:grid-cols-2 gap-10 xl:gap-14 relative pt-24 lg:max-w-none max-w-2xl md:max-w-3xl mx-auto"},J={class:"lg:h-full md:flex"},Q={class:"flex w-full h-96 min-h-[24rem] lg:min-h-[none] lg:w-full lg:h-full items-center relative"},$={class:"absolute h-full z-10 p-2 -translate-y-1/2 top-1/2 lg:right-3 md:right-40 sm:right-16 rounded-full shadow-lg border border-primary"},Y={key:0,class:"w-full h-full rounded-full bg-gray-700 animate-pulse"},X=["src"],Z=a({__name:"HeroSection",setup(a){const o=l(""),r=l(!0);return d((async()=>{try{const e=await v(E);o.value=e}catch(e){}finally{r.value=!1}})),(a,l)=>(t(),e("section",G,[l[2]||(l[2]=i("div",{class:"absolute top-0 inset-x-0 h-64 flex items-start"},[i("div",{class:"h-24 w-2/3 bg-linear-to-br from-[#570cac] blur-2xl invisible opacity-40"}),i("div",{class:"h-20 w3/5 bg-linear-to-r from-[#670ccf] blur-2xl opacity-40"})],-1)),i("div",W,[i("div",K,[l[1]||(l[1]=s('<div class="lg:py-6"><div class="text-center lg:text-left"><h1 class="pt-4 text-white font-bold text-4xl md:text-5xl lg:text-6xl"> Hi, I&#39;m <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-pink-500"> Dihan </span>😊 </h1></div><p class="text-gray-300 pt-8 text-center lg:text-left mx-auto max-w-wl"> I&#39;m an aspiring Software Engineer and Information Technology student at Eduvos, focusing on C# development and database design. With a strong foundation in desktop applications and a growing interest in web technologies, I&#39;m passionate about creating efficient, maintainable solutions while continuously expanding my technical expertise. </p><div class="flex items-center gap-3 pt-9 flex-col sm:flex-row sm:w-max sm:mx-auto lg:mx-0"><button class="px-6 md:px-7 py-3 rounded-full relative group w-full sm:w-max flex justify-center"><span class="absolute inset-0 rounded-3xl group-hover:scale-105 origin-center transition-all ease-in-out bg-primary border-2 border-transparent"></span><span class="relative flex items-center justify-center text-white">Hire Me</span></button><button class="border border-primary px-6 md:px-7 py-3 rounded-full relative group w-full sm:w-max flex justify-center"><div class="hover:scale-105 transition-all ease-in-out flex justify-center items-center relative"><div class="svg-container"><svg class="download-icon" width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="download-arrow" d="M9 1v12M13 9L9 13L5 9" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 17V18C1 18.7956 1.31607 19.5587 1.87868 20.1213C2.44129 20.6839 3.20435 21 4 21H14C14.7956 21 15.5587 20.6839 16.1213 20.1213C16.6839 19.5587 17 18.7956 17 18V17" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><div class="download-loader text-white hidden"></div></div><a href="./assets/resume.pdf" download="resume.pdf" class="pl-2 text-primary"> Download resume</a></div></button></div></div>',1)),i("div",J,[i("div",Q,[l[0]||(l[0]=i("div",{class:"absolute z-0 top-1/2 -translate-y-1/2 w-5/6 right-0 h-[calc(80%+20px)] bg-linear-to-tr opacity-25 from-[#570cac] to-primary blur-2xl"},null,-1)),i("div",$,[r.value?(t(),e("div",Y)):(t(),e("img",{key:1,src:o.value,alt:"Hero Picture",width:"500",height:"auto",class:"w-full h-full rounded-full object-cover"},null,8,X))])])])])])]))}}),ee=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"})),te={class:"text-white mt-20",id:"services"},se={class:c(["py-8","xl:px-16","px-4","sm:py-16","grid","grid-cols-1","gap-6","pt-10","sm:grid-cols-2","md:gap-10","md:pt-12","lg:grid-cols-3"])},ae={class:"mx-auto h-24 w-24 xl:h-28 xl:w-28 flex items-center justify-center"},le=["src"],ie={class:"text-center"},oe={class:"pt-8 text-lg font-semibold uppercase text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary lg:text-xl"},re={class:"text-gray pt-4 text-sm group-hover:text-white md:text-base"},ne=a({__name:"ServicesSection",setup(s){const a=l([{id:1,icon:"https://img.icons8.com/ios-filled/50/ffffff/c-sharp-logo.png",name:"C# Development",description:"Development of desktop applications and basic software solutions using C# and .NET framework. Specializing in Windows Forms applications and console-based programs."},{id:2,icon:"https://img.icons8.com/ios-filled/50/ffffff/database.png",name:"Database Design",description:"Design and implementation of SQL databases, including data modeling, basic query optimization, and database management using Microsoft SQL Server."},{id:3,icon:"https://img.icons8.com/ios-filled/50/ffffff/code.png",name:"Academic Projects",description:"Collaboration on software engineering projects, with experience in version control (Git), documentation, and implementing solutions based on academic requirements."}]);return(s,l)=>(t(),e("section",te,[l[0]||(l[0]=i("div",{class:"px-4 xl:pl-16"},[i("h2",{class:"text-4xl font-bold text-white mb-4"},"My Services")],-1)),i("div",se,[(t(!0),e(o,null,r(a.value,(s=>(t(),e("div",{key:s.id,"data-aos":"fade-up",class:"px-8 py-12 rounded-xl bg-[#111a3e] shadow-lg border border-[#1f1641]"},[i("div",ae,[i("div",null,[i("img",{src:s.icon,alt:"Service Icon",class:"w-20 h-20"},null,8,le)])]),i("div",ie,[i("h3",oe,n(s.name),1),i("p",re,n(s.description),1)])])))),128))])]))}}),ce=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"})),de={class:"text-white mt-18",id:"about"},pe={class:"md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 z-1"},me={"data-aos":"flip-right"},ue={class:"space-y-8 py-8"},ge={class:"w-3/4 pl-4"},fe={class:"text-2xl font-semibold uppercase text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary lg:text-xl"},be={class:"text-white"},he={class:"text-white"},xe=a({__name:"AboutSection",setup(a){const c=l([{id:1,School:"Eduvos",Degree:"Bachelor of Science in Information Technology",Year:"2024 - Present"}]);return(a,l)=>(t(),e("section",de,[l[3]||(l[3]=i("div",{class:"absolute z-0 top-[93rem] inset-x-0 h-64 flex items-start"},[i("div",{class:"h-24 w-64 bg-linear-to-br from-primary via-secondary blur-2xl to-[#570cac] opacity-20"})],-1)),i("div",pe,[i("div",me,[l[1]||(l[1]=i("h2",{class:"text-4xl font-bold text-white text-left md-8"}," My Education ",-1)),i("div",ue,[(t(!0),e(o,null,r(c.value,(s=>(t(),e("div",{key:s.id,class:"flex items-center md:w-[80%] w-full rounded-xl bg-[#111a3e] shadow-lg border border-[#1f1641]"},[l[0]||(l[0]=i("div",{class:"w-1/4"},[i("img",{src:"https://img.icons8.com/ios-glyphs/60/ffffff/graduation-cap--v1.png",alt:"Graduation Cap"})],-1)),i("div",ge,[i("h3",fe,n(s.School),1),i("p",be,n(s.Degree),1),i("p",he,n(s.Year),1)])])))),128))])]),l[2]||(l[2]=s('<div class="mt-4 md:mt-0 text-left flex flex-col z-10 h-full" data-aos="flip-right"><h2 class="text-4xl font-bold text-white md:text-center text-left md-4"> More <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">About</span> Me </h2><p class="text-base lg:text-lg mt-4 mb-2"> As you can see from the website already, I am still only a university student at a highly acclaimed private university called Eduvos. There, I am pursuing my lifelong dream of becoming a Software Engineer by studying for my Bachelor&#39;s degree in Information Technology. </p><p class="text-base lg:text-lg mt-4 mb-2"> My journey began with the programming language of C++, however this year I&#39;ve switched over to C#, which remains my primary language for everything to do with desktop application development. I have also developed a particular interest in database design and enjoys creating efficient data solutions using SQL Server. </p><p class="text-base lg:text-lg mt-4 mb-2"> Outside of my coursework, I undertake some other personal hobbies such as video games, hiking and camping. At the same time, I also like to actively work on some personal projects to expand my programming knowledge as you can see in my projects section, where I&#39;m recently learning about web development through the use of Vue.js, Typescript, TailwindCSS and more. </p><p class="text-base lg:text-lg mt-4 mb-2"> I firmly believe in writing clean and maintainable code as I&#39;m constantly seeking to improve my problem-solving skills through practical applications of my learning. In the end, my goal is to develop into a well-rounded software engineer who can contribute meaningfully to challenging projects while continuing to learn and grow in this ever-evolving field. </p><div class="grid grid-cols-3 gap-4 max-w-lg pt-8"><div class="text-center rounded-xl bg-[#111a3e] shadow-lg border border-[#1f1641] pt-3"><h3 class="text-white font-bold text-xl sm:text-2xl lg:text-3xl"> 82.25% </h3><p class="text-sm sm:text-base text-gray-300"> Average Mark </p></div><div class="text-center rounded-xl bg-[#111a3e] shadow-lg border border-[#1f1641] pt-3"><h3 class="text-white font-bold text-xl sm:text-2xl lg:text-3xl"> 4 </h3><p class="text-sm sm:text-base text-gray-300"> Programming Projects </p></div><div class="text-center rounded-xl bg-[#111a3e] shadow-lg border border-[#1f1641] pt-3"><h3 class="text-white font-bold text-xl sm:text-2xl lg:text-3xl"> 6 </h3><p class="text-sm sm:text-base text-gray-300"> Programming Languages </p></div></div></div>',1))])]))}}),ve=Object.freeze(Object.defineProperty({__proto__:null,default:xe},Symbol.toStringTag,{value:"Module"})),we={class:"text-white mt-18",id:"skills"},ye={class:"md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 xl:px-16"},ke={class:"mt-4 md:mt-0 text-left flex flex-col z-10 h-full w-[80%]"},je={class:"flex items-end justify-between"},Se={class:"font-semibold uppercase text-white"},_e={class:"text-2xl font-bold text-white"},Pe={class:"mt-2 h-1 w-full bg-[#131d30] rounded-full"},De={"data-aos":"flip-left"},Me={class:"space-y-8 py-8","data-aos":"fade-left"},Le={class:"w-3/4 pl-4"},Ce={class:"text-2xl font-semibold uppercase text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary"},Te={class:"text-white"},Ae={class:"text-white"},ze=a({__name:"SkillsAndExperience",setup(s){const a=l([{id:1,name:"HTML & CSS",width:"55%"},{id:3,name:"C# & .NET",width:"80%"},{id:4,name:"JavaScript & TypeScript",width:"45%"},{id:5,name:"C++",width:"70%"}]),c=l([{id:1,role:"None",company:"",date:""}]);return(s,l)=>(t(),e("section",we,[l[3]||(l[3]=i("div",{class:"absolute right-0 top-[110rem] h-full w-full justify-end"},[i("span",{class:"flex opacity-20"},[i("span",{class:"w-16 h-32 rounded-l-full flex bg-primary blur-2xl"}),i("span",{class:"w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"})])],-1)),i("div",ye,[i("div",ke,[l[0]||(l[0]=i("h2",{class:"text-4xl font-bold text-white text-left mb-4"},[p(" My "),i("span",{class:"text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary"},"Skills")],-1)),(t(!0),e(o,null,r(a.value,(s=>(t(),e("div",{class:"mt-8",key:s.id},[i("div",je,[i("h4",Se,n(s.name),1),i("h3",_e,n(s.width),1)]),i("div",Pe,[i("div",{class:"h-1 rounded-full bg-primary",style:m(`width: ${s.width}`)},null,4)])])))),128))]),i("div",De,[l[2]||(l[2]=i("h2",{class:"text-4xl font-bold text-white text-left mb-8 md:text-center md:mt-0 mt-8"}," My Experiences ",-1)),i("div",Me,[(t(!0),e(o,null,r(c.value,(s=>(t(),e("div",{key:s.id,class:"flex items-center rounded-xl p-4 bg-[#111a3e] shadow-lg border border-[#1f1641]"},[l[1]||(l[1]=i("div",{class:"w-1/4"},[i("img",{src:"https://img.icons8.com/ios-filled/100/ffffff/lawyer.png",alt:"Business Worker"})],-1)),i("div",Le,[i("h3",Ce,n(s.role),1),i("p",Te,n(s.company),1),i("p",Ae,n(s.date),1)])])))),128))])])])]))}}),Ie=Object.freeze(Object.defineProperty({__proto__:null,default:ze},Symbol.toStringTag,{value:"Module"})),Ee="/personal-website/assets/img/calculator-website-BhlBdfyj.png",Be="/personal-website/assets/img/cSharp-university-_QyLFhtG.png",Oe="/personal-website/assets/img/cPlusPlus-university-CWO0tev2.png",Re={class:"text-white mt-20",id:"projects"},He={class:"px-4 xl:pl-16"},Ve={class:"mb-4md:flex md:justify-between xl:pr-16"},Ue={class:"flex space-x-4 mb-4 mt-5 md:mt-0"},Fe=["onClick"],qe={key:0,class:"flex justify-center items-center py-20"},Ne={key:1},Ge={class:"px-4 sm:py-16 xl:pr-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3","data-aos":"fade-right"},We={class:"group relative"},Ke={class:"absolute inset-0 bg-[#181818] opacity-0 group-hover:opacity-80 transition-all duration-500 flex items-center justify-center"},Je={class:"flex space-x-4"},Qe=["href"],$e=["href"],Ye={class:"text-white rounded-b-xl bg-[#111a3e] shadow-lg border border-[#1f1641] py-6 px-4"},Xe={class:"text-lg font-semibold uppercase lg:text-xl"},Ze={class:"text-[#ADB7BE]"},et={class:"flex flex-wrap p-2.5"},tt={class:"px-1 py-2"},st=a({__name:"ProjectsSection",setup(s){const a=l(new Map),p=l(!0);d((async()=>{try{const e=[B,Ee,Be,Oe];await Promise.all(e.map((async e=>{const t=await v(e);a.value.set(e,t)})))}catch(e){}finally{p.value=!1}}));const b=l([{id:1,category:"Web Development",image:B,title:"Personal Website",description:"My very own website made from scratch using various modern web technologies. Also, the website you are currently on!",technologies:["Vue","Tailwind CSS","TypeScript"],gitURL:"https://github.com/DoubledDoge/personal-website",webURL:"https://doubleddoge.github.io/personal-website/"},{id:2,category:"Web Development",image:Ee,title:"Calculator Website",description:"Its a extremely simplistic website that is meant to function as a calculator. Previously it served me as an introduction into web development as a whole.",technologies:["Svelte","SCSS","TypeScript"],gitURL:"https://github.com/DoubledDoge/just-another-calculator-website",webURL:"https://doubleddoge.github.io/just-another-calculator-website/"},{id:3,category:"Desktop Application",image:Be,title:"C# University Project",description:"This project was strictly meant as an representation of the work I've done on my own university assignment. It is still highly incomplete, and rests in my GitHub page waiting for me to eventually complete it. Even though parts of it is perfectly refined to fit my own vision of the applications contained within, it is important to know that these aren't meant to be seen as enterprise quality or anything.",technologies:["C#",".NET","SQL"],gitURL:"https://github.com/DoubledDoge/itpca2-formative",webURL:""},{id:4,category:"Desktop Application",image:Oe,title:"C++ University Project",description:"My very first programming project as a whole. This currently lies archived in my GitHub repository, with absolutely no major changes planned for it. Please note that there are quite a few things that I could change as it is very much created from the mindset of a programmer just starting out, so please don't take this project too seriously.",technologies:["C++"],gitURL:"https://github.com/DoubledDoge/itppa1-formative",webURL:""}]),h=l("All"),x=u((()=>"All"===h.value?b.value:b.value.filter((e=>e.category===h.value))));return(s,l)=>(t(),e("section",Re,[i("div",He,[i("div",Ve,[l[0]||(l[0]=i("h2",{class:"text-4xl font-bold text-white"}," My Latest Projects ",-1)),i("div",Ue,[(t(),e(o,null,r(["All","Web Development","Desktop Application"],(e=>i("button",{key:e,onClick:()=>h.value=e,class:c(["px-4 py-2 rounded-full transition-all duration-300",h.value===e?"bg-primary-500 text-white":"text-[#ADB7BE] hover:text-primary"])},n(e),11,Fe))),64))])]),p.value?(t(),e("div",qe,[g(I)])):(t(),e("div",Ne,[i("ul",Ge,[(t(!0),e(o,null,r(x.value,(s=>(t(),e("div",{key:s.id},[i("div",We,[i("div",{class:"h-52 md:h-[24rem] rounded-t-xl bg-cover bg-center",style:m({backgroundImage:`url(${a.value.get(s.image)||s.image})`})},[i("div",Ke,[i("div",Je,[s.webURL?(t(),e("a",{key:0,href:s.webURL,target:"_blank",rel:"noopener noreferrer",class:"h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link",title:"View Live Demo"},l[1]||(l[1]=[i("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"h-10 w-10 text-[#ADB7BE] group-hover/link:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"},[i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"})],-1)]),8,Qe)):f("",!0),s.gitURL?(t(),e("a",{key:1,href:s.gitURL,target:"_blank",rel:"noopener noreferrer",class:"h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link",title:"View Source Code"},l[2]||(l[2]=[i("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-10 w-10 text-[#ADB7BE] group-hover/link:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",viewBox:"0 0 24 24",fill:"currentColor"},[i("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})],-1)]),8,$e)):f("",!0)])])],4),i("div",Ye,[i("h3",Xe,n(s.title),1),i("p",Ze,n(s.description),1),i("div",et,[(t(!0),e(o,null,r(s.technologies,(s=>(t(),e("div",{key:s,class:"text-center ml-1 mt-1 rounded-3xl bg-[#111827]",style:{"box-shadow":"0 4px 30px\n                                                rgba(0, 0, 0, 0.1)",border:"1px solid #111827","backdrop-filter":"blur(9px)","-webkit-backdrop-filter":"blur(9px)"}},[i("p",tt,n(s),1)])))),128))])])])])))),128))])]))])]))}}),at=Object.freeze(Object.defineProperty({__proto__:null,default:st},Symbol.toStringTag,{value:"Module"})),lt={class:"text-white mt-20",id:"contact"},it={class:"grid md:grid-cols-2 gap-4 relative px-4 xl:px-16 mt-8","data-aos":"zoom-in-up"},ot={style:{background:"#111a3e",width:"100%",height:"100%","border-radius":"20px",overflow:"hidden",border:"1px solid #111a3e","backdrop-filter":"blur(9px)","-webkit-backdrop-filter":"blur(9px)"}},rt={class:"mb-6"},nt={class:"mb-6"},ct={class:"mb-6"},dt=["disabled"],pt=a({__name:"ContactSection",setup(a){const o=l({email:"",subject:"",message:""}),r=l(!1),d=l(null),p=async()=>{try{r.value=!0,d.value=null;const e={from_email:o.value.email,subject:o.value.subject,message:o.value.message,to_email:"dbritz22@proton.me"};await A.send("service_6t3n40b","template_gpwmo2q",e,"U0RE2Nsi4q8icVtE7"),d.value={type:"success",message:"Message sent successfully!"},o.value={email:"",subject:"",message:""}}catch(e){d.value={type:"error",message:"Failed to send message. Please try again."}}finally{r.value=!1}};return(a,l)=>(t(),e("section",lt,[l[8]||(l[8]=i("h2",{class:"text-4xl font-bold text-white text-left mb-4 px-4 xl:pl-16"}," Let's Connect ",-1)),i("div",it,[l[6]||(l[6]=s('<div><p class="text-[#adb7be]">(Placeholder Text)</p><div class="col-lg-4 col-md-4 mb-lg-0 mt-5"><div class="flex mb-10 items-center"><div class="p-2" style="background:#111a3e;width:50px;height:46px;display:flex;justify-content:center;border-radius:50%;overflow:hidden;border:1px solid#111a3e;backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);"><img src="https://img.icons8.com/metro/50/ffffff/new-post.png" alt="Primary Email" class="w-6"></div><div class="ml-5 text-white"><h4>Primary Email</h4><p>dbritz22@proton.me</p></div></div><div class="flex mb-10 items-center"><div class="p-2" style="background:#111a3e;width:50px;height:46px;display:flex;justify-content:center;border-radius:50%;overflow:hidden;border:1px solid#111a3e;backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);"><img src="https://img.icons8.com/metro/50/ffffff/new-post.png" alt="Secondary Email" class="w-6"></div><div class="ml-5 text-white"><h4>Secondary Email</h4><p>dihanbritz05@gmail.com</p></div></div><div class="flex mb-10 items-center"><div class="p-2" style="background:#111a3e;width:50px;height:46px;display:flex;justify-content:center;border-radius:50%;overflow:hidden;border:1px solid#111a3e;backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);"><img src="https://img.icons8.com/ios-filled/50/ffffff/phone.png" alt="Phone" class="w-6"></div><div class="ml-5 text-white"><h4>Phone</h4><p>+27663370662 / 066 337 0662</p></div></div><div class="flex mb-10 items-center"><div class="p-2" style="background:#111a3e;width:50px;height:46px;display:flex;justify-content:center;border-radius:50%;overflow:hidden;border:1px solid#111a3e;backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);"><img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" class="w-6"></div><div class="ml-5 text-white"><h4>LinkedIn</h4><p>https://www.linkedin.com/in/dihan-britz/</p></div></div><div class="flex mb-10 items-center"><div class="p-2" style="background:#111a3e;width:50px;height:46px;display:flex;justify-content:center;border-radius:50%;overflow:hidden;border:1px solid#111a3e;backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);"><img src="https://img.icons8.com/ios-filled/50/ffffff/github.png" alt="GitHub" class="w-6"></div><div class="ml-5 text-white"><h4>GitHub</h4><p>https://github.com/DoubledDoge</p></div></div></div></div>',1)),i("div",ot,[i("form",{class:"flex flex-col p-2","data-aos":"zoom-in-up",onSubmit:b(p,["prevent"])},[i("div",rt,[l[3]||(l[3]=i("label",{for:"email",class:"text-white block mb-2 text-sm font-medium"},"Email",-1)),h(i("input",{"onUpdate:modelValue":l[0]||(l[0]=e=>o.value.email=e),type:"email",id:"email",required:"",class:"bg-[#111827] placeholder:[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5",placeholder:"Please enter your email",name:"Email",autocomplete:"email"},null,512),[[x,o.value.email]])]),i("div",nt,[l[4]||(l[4]=i("label",{for:"subject",class:"text-white block mb-2 text-sm font-medium"},"Subject",-1)),h(i("input",{"onUpdate:modelValue":l[1]||(l[1]=e=>o.value.subject=e),type:"subject",id:"subject",required:"",class:"bg-[#111827] placeholder:[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5",placeholder:"Please enter your subject",name:"Subject"},null,512),[[x,o.value.subject]])]),i("div",ct,[l[5]||(l[5]=i("label",{for:"message",class:"text-white block mb-2 text-sm font-medium"},"Message",-1)),h(i("textarea",{"onUpdate:modelValue":l[2]||(l[2]=e=>o.value.message=e),id:"message",required:"",class:"bg-[#111827] placeholder:[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5",placeholder:"Let's talk about ...",name:"Message",rows:"4"},null,512),[[x,o.value.message]])]),i("button",{type:"submit",disabled:r.value,class:"z-1 w-[100%!important] px-6 md:px-7 py-3 rounded-full sm:w-max flex justify-center text-white bg-primary border-2 border-transparent disabled:opacity-50 disabled:cursor-not-allowed"},n(r.value?"Sending...":"Send Message"),9,dt),d.value?(t(),e("div",{key:0,class:c(["mt-4 text-center p-2 rounded","success"===d.value.type?"bg-green-600":"bg-red-600"])},n(d.value.message),3)):f("",!0)],32)]),l[7]||(l[7]=i("div",{class:"bg-linear-to-tr opacity-25 from-[#570cac] to-primary blur-2xl h-20 w-80 z-0 absolute -top-1/2 -left-4 transform -translate-x-2/3 -translate-1/2"},null,-1))])]))}}),mt=Object.freeze(Object.defineProperty({__proto__:null,default:pt},Symbol.toStringTag,{value:"Module"})),ut={class:"mt-8 border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white"},gt=a({name:"SiteFooter",__name:"Footer",setup:s=>(s,a)=>(t(),e("footer",ut,a[0]||(a[0]=[i("div",{class:"container p-12 flex flex-col md:flex-row justify-between items-center"},[i("div",{class:"text-white text-3xl font-bold mb-4 md:mb-0"},"Dihan Britz"),i("div",{class:"text-slate-600 text-center md:text-right"},[i("p",null,"© 2025 Dihan Britz"),i("p",{class:"text-sm"},"Open source under MIT License")])],-1)])))}),ft=Object.freeze(Object.defineProperty({__proto__:null,default:gt},Symbol.toStringTag,{value:"Module"}));export{ve as A,mt as C,ft as F,ee as H,I as L,N,at as P,ce as S,B as a,Ie as b,A as e,w as p,E as t};
