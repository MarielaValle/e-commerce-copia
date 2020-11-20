window.addEventListener("load", function(){
    
    const delay=3000;
    
    setTimeout (miFuncion, delay);
    
    function miFuncion(){
        if(sessionStorage.getItem('visitante')==null) {
            
            
            let nombre=prompt('Hola! ¿cuál es tu nombre?')
            
            let bienvenido = document.querySelector('.bienvenido');  
            
            if(nombre==null){
                nombre = 'bienvenid@'
            }
            
            bienvenido.innerHTML = '¡Hola, '+ nombre + '!';
            
            sessionStorage.setItem('visitante',nombre)
            
        }else {
            nombre=sessionStorage.getItem('visitante')
            document.querySelector('.bienvenido').innerHTML = '¡Hola ' + nombre +'!';
            
        }
        
       
        
        console.log(sessionStorage)
        
    }
    
    
    //------------------------
    let menuLink = document.querySelectorAll("#menuLink a");
    
    console.log(menuLink)
    
    
    
    for (let x=0; x < menuLink.length; x ++){
        //menuLink.onmouseover=function(){
        
        menuLink[x].addEventListener("click", function(){              
            
           
                this.style.color= "#730220"
           
                
                //menuLink.onmouseover=function(){
                            
                
            
        });
        
        
        
    }
    
})


// verde = #034001;  bordó = #730220  




