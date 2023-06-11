//referencias

const usuarioActivo=document.querySelector('#usuarioActivo')
const usuarioDesactivado=document.querySelector('#usuarioDesactivado')
const btnEnviar=document.querySelector('#btnEnviar')
const textEnviar=document.querySelector('#textEnviar')



const socket = io();
socket.on("connect", () => {
    usuarioActivo.style.display=""
    usuarioDesactivado.style.display="none"
    
 
});
socket.on("disconnect", () => {
    usuarioActivo.style.display="none"
    usuarioDesactivado.style.display=""
});
socket.on("mensajeServer", (paylod) => {
   console.log(paylod)
});

btnEnviar.addEventListener("click",()=>{
   const mensaje=textEnviar.value;


   socket.emit("mensaje",mensaje,(id)=>{
    console.log(id)
   })



})