const App=()=>{
    const appView = document.querySelector('.app-view')
    
    const check = ()=>{
        let helloText =[]
        fetch('http://localhost:2020')
        .then(
            (response)=>{
                if(response.status!== 200){
                console.log(`erroer withyour request ${response.status}`)
                    return
                }
                response.text().then(
                    (data)=>{
                        helloText.push(data)
                        const div = document.createElement("div");
                        div.className='views'
                        div.innerHTML=`<h1>${data}</h1>`
                        appView.appendChild(div)

                    }
                )
            }
            
        )
            
           
    }

    check()
    
    const dashboard= () =>{
    return `<div>
            <ul>
                <li><a href="">Subjects</a></li>
                <li><a href="">Years</a></li>
                <li><a href="">Exam Type</a></li>
                <li><a href="">All Questions</a></li>
            </ul>
    
            </div>`
    }
   
    const eleme = document.createElement('div')
    eleme.innerHTML= dashboard() 
    eleme.className='dasboard'
    
    appView.appendChild(eleme)

}
App()