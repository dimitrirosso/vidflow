const containervideos = document.querySelector(".videos__container");


async function buscarmostrar(){
    try{
        // novos .then
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();
        // .then(resposta => resposta.json())
        // .then((videos) =>
        
            videos.forEach((video) => {
                if(video.categoria == ""){
                    throw new Error('sem categoria');
                }
                containervideos.innerHTML += `
                    <li class="videos__item">
                        <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                            <div class="descricao-video">
                                <img class="img-canal" src="${video.imagem} alt="imagens do canal">
                                <h3 class="titulo-video">${video.titulo}</h3>
                                <p class="titulo-canal">${video.descricao}</p>
                                <p class="categoria" hidden>${video.categoria}</p>
                            </div>
                    </li>        
                `;
            })
    }   catch(error){
        containervideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error} </p>`
    }

    // )
    // .catch((error) => {
    //     containervideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}`;
    // })
}

buscarmostrar();

//Código omitido

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa(){
    const videos = document.querySelectorAll(".videos__item");

    if(barraDePesquisa.value != ""){
        for(let video of videos){
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();

            if(!titulo.includes(valorFiltro)){
                video.style.display = "none";
            } else {
                video.style.display = "block";
            }

        }
    }else{
        video.style.display = "block";
    }
}

const botaocategoria = document.querySelectorAll(".superior__item");

botaocategoria.forEach((botao) => {
    let nomecategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarcategorias(nomecategoria));
})

function filtrarcategorias(filtro){
    const videos = document.querySelectorAll(".videos__item");

    for(let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();
    
    if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
        video.style.display = "none";
    } else{
        video.style.display = "block";
        }
    }
}