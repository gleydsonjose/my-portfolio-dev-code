var pb = new Vue({
    el: "#portfolio-body",
    data: function(){
        return{
            projectsData: []
        }
    },
    methods: {
        projectImagesModal: function(allImages){
            // Inicialização de variáveis e arrays
            var mainImage_index = 0;
            var imagesGroup = [];
            var imagesInfoGroup = [];
            var el_bg_main_project_images_modal = document.querySelector('#bg-main-project-images-modal');
            var el_btn_image = document.querySelectorAll('.btn-image');
            var el_arrow_left = document.querySelector('#arrow-left');
            var el_fa_chevron_left = document.querySelector('.fa-chevron-left');
            var el_arrow_right = document.querySelector('#arrow-right');
            var el_fa_chevron_right = document.querySelector('.fa-chevron-right');
            var el_main_image = document.querySelector('#main-image');

            // Adicionando url da img das imagens de um projeto e seu alt para arrays
            allImages.forEach(function(item){
                imagesGroup.push(item.img);
                imagesInfoGroup.push(item.alt);
            })

            // Alterando url e alt de imagens da modal de acordo com os dados recebido
            el_btn_image.forEach(function(item, index){
                if(index == 0){
                    el_main_image.src = imagesGroup[index];
                    el_main_image.alt = imagesInfoGroup[index];
                }

                item.src = imagesGroup[index];
                item.alt = imagesInfoGroup[index];
            })

            // Escondendo a barra de rolagem
            document.documentElement.style.overflow = 'hidden';

            // Para abrir o modal das imagens de um projeto
            el_bg_main_project_images_modal.style.display = 'flex';
    
            for(i = 0; i <= el_btn_image.length-1; i++){
                if(i != 0){
                    el_btn_image[i].style.boxShadow = 'rgb(39, 39, 39) 0px 0px 2px 0px';
                }
            }
        
            if(mainImage_index == 0){
                el_btn_image[mainImage_index].style.boxShadow = 'rgb(94, 182, 125) 0px 0px 1px 2px';
                el_arrow_left.setAttribute('disabled', true);
                el_fa_chevron_left.style.color = '#5d5d5d';
        
                if(el_arrow_right.getAttribute('disabled') === 'true'){
                    el_arrow_right.removeAttribute('disabled');
                    el_fa_chevron_right.style.color = '#5eb67d';
                }
            }

            // Script para o arrow esquerdo do slide, a cada clique neste botão irá mostrar a imagem anterior à imagem atual, se caso a imagem for a primeira o botão vai ficar bloqueado
            el_arrow_left.addEventListener('click', function(){
                if(mainImage_index != 0){
                    mainImage_index--;

                    el_btn_image[mainImage_index].style.boxShadow = 'rgb(94, 182, 125) 0px 0px 1px 2px';
                    if(window.getComputedStyle(el_btn_image[mainImage_index+1]).getPropertyValue('box-shadow') == 'rgb(94, 182, 125) 0px 0px 1px 2px'){
                        el_btn_image[mainImage_index+1].style.boxShadow = 'rgb(39, 39, 39) 0px 0px 2px 0px';
                    }

                    el_main_image.src = imagesGroup[mainImage_index];
                    el_main_image.alt = imagesInfoGroup[mainImage_index];
                    
                    if(mainImage_index == 0){
                        this.setAttribute('disabled', true);
                        el_fa_chevron_left.style.color = '#5d5d5d';
                    }else if(mainImage_index != imagesGroup.length-1){
                        el_arrow_right.removeAttribute('disabled');
                        el_fa_chevron_right.style.color = '#5eb67d';
                    }
                }
            })

            // Script para o arrow direito do slide, a cada clique neste botão irá mostrar a próxima imagem de acordo com a imagem atual, se caso a imagem for a última o botão vai ficar bloqueado
            el_arrow_right.addEventListener('click', function(){
                if(mainImage_index != imagesGroup.length-1){
                    mainImage_index++;

                    el_btn_image[mainImage_index].style.boxShadow = 'rgb(94, 182, 125) 0px 0px 1px 2px';
                    if(window.getComputedStyle(el_btn_image[mainImage_index-1]).getPropertyValue('box-shadow') == 'rgb(94, 182, 125) 0px 0px 1px 2px'){
                        el_btn_image[mainImage_index-1].style.boxShadow = 'rgb(39, 39, 39) 0px 0px 2px 0px';
                    }

                    el_main_image.src = imagesGroup[mainImage_index];
                    el_main_image.alt = imagesInfoGroup[mainImage_index];

                    if(mainImage_index == imagesGroup.length-1){
                        this.setAttribute('disabled', true);
                        el_fa_chevron_right.style.color = '#5d5d5d';
                    } else if(mainImage_index != 0){
                        el_arrow_left.removeAttribute('disabled');
                        el_fa_chevron_left.style.color = '#5eb67d';
                    }
                }
            })

            // Se for clicado fora do modal(no fundo preto), ele será fechado
            el_bg_main_project_images_modal.addEventListener('click', function(event){
                if(event.target == this){
                    this.style.display = 'none';

                    mainImage_index = 0;
                    el_main_image.src = imagesGroup[mainImage_index];
                    el_main_image.alt = imagesInfoGroup[mainImage_index];

                    document.documentElement.style.overflow = 'auto';
                }
            })

            // Quando a tecla 'ESC' for pressionada e a modal estiver aberta, ela será fechada
            document.documentElement.addEventListener('keydown', function(event){
                if(event.key === 'Escape' && getComputedStyle(el_bg_main_project_images_modal).getPropertyValue('display') == 'flex'){
                    el_bg_main_project_images_modal.style.display = 'none';

                    mainImage_index = 0;
                    el_main_image.src = imagesGroup[mainImage_index];
                    el_main_image.alt = imagesInfoGroup[mainImage_index];

                    document.documentElement.style.overflow = 'auto';
                }
            })

            // Para fechar o modal quando for clicado no botão de fechar
            document.querySelector('#close-modal').addEventListener('click', function(){
                el_bg_main_project_images_modal.style.display = 'none';

                mainImage_index = 0;
                el_main_image.src = imagesGroup[mainImage_index];
                el_main_image.alt = imagesInfoGroup[mainImage_index];

                document.documentElement.style.overflow = 'auto';
            })

            // Script para o grupo de imagens abaixo da imagem principal na modal, se for clicado em uma imagem do grupo, ela será mostrada na imagem principal
            el_btn_image.forEach(function(item, index){
                item.addEventListener('click', function(){
                    mainImage_index = index;

                    for(i = 0; i <= el_btn_image.length-1; i++){
                        if(index != i){
                            el_btn_image[i].style.boxShadow = 'rgb(39, 39, 39) 0px 0px 2px 0px';
                        }
                    }

                    if(mainImage_index == 0){
                        if(el_arrow_right.getAttribute('disabled') === 'true'){
                            el_arrow_right.removeAttribute('disabled');
                            el_fa_chevron_right.style.color = '#5eb67d';
                        }

                        el_arrow_left.setAttribute('disabled', true);
                        el_fa_chevron_left.style.color = '#5d5d5d';
                    }else if(mainImage_index == 4){
                        if(el_arrow_left.getAttribute('disabled') === 'true'){
                            el_arrow_left.removeAttribute('disabled');
                            el_fa_chevron_left.style.color = '#5eb67d';
                        }
                        
                        el_arrow_right.setAttribute('disabled', true);
                        el_fa_chevron_right.style.color = '#5d5d5d';
                    }else{
                        if(el_arrow_left.getAttribute('disabled') === 'true'){
                            el_arrow_left.removeAttribute('disabled');
                            el_fa_chevron_left.style.color = '#5eb67d';
                        }else if(el_arrow_right.getAttribute('disabled') === 'true'){
                            el_arrow_right.removeAttribute('disabled');
                            el_fa_chevron_right.style.color = '#5eb67d';
                        }
                    }

                    this.style.boxShadow = 'rgb(94, 182, 125) 0px 0px 1px 2px';
                    el_main_image.src = imagesGroup[index];
                    el_main_image.alt = imagesInfoGroup[mainImage_index];
                })
            })
        }
    },
    created: function(){
        axios.get('json/projects-info.json').then(function(info){
            info.data.forEach(function(item){                
                pb.projectsData.push(item);
            })
        })
    }
})