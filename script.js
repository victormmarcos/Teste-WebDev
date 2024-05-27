document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const postText = document.getElementById('postText').value;
    const postCategoria = document.getElementById('postCategoria').value;
    const urlPost1 = document.getElementById('urlPost1').value;
    const urlPost2 = document.getElementById('urlPost2').value;
    const urlPost3 = document.getElementById('urlPost3').value;

    const postElement = document.createElement('div');
    postElement.className = `post ${postCategoria}`;

    postElement.innerHTML = `
        <h3>${postCategoria}</h3>
        <p>${postText}</p>
        ${urlPost1 ? `<img src="${urlPost1}" alt="Imagem do post">` : ''}
        ${urlPost2 ? `<img src="${urlPost2}" alt="Imagem do post">` : ''}
        ${urlPost3 ? `<img src="${urlPost3}" alt="Imagem do post">` : ''}
        <div class="post-actions">
            <button type="button" class="btnPost btnEdit">Editar</button>
            <button type="button" class="btnPost btnDelete">Apagar</button>
        </div>
    `;

    document.getElementById('postsContainer').appendChild(postElement);

    document.getElementById('postForm').reset();

    postElement.querySelector('.btnEdit').addEventListener('click', function() {
        editPost(postElement, postText, postCategoria, urlPost1, urlPost2, urlPost3);
    });
    
    postElement.querySelector('.btnDelete').addEventListener('click', function() {
        postElement.remove();
    });
});

function editPost(postElement, postText, postCategoria, urlPost1, urlPost2, urlPost3) {
    document.getElementById('postText').value = postText;
    document.getElementById('postCategoria').value = postCategoria;
    document.getElementById('urlPost1').value = urlPost1;
    document.getElementById('urlPost2').value = urlPost2;
    document.getElementById('urlPost3').value = urlPost3;

    postElement.remove();
}

let currentSlide = 0;
const slides = document.querySelectorAll('.slider');
const totalSlides = slides.length;

document.getElementById('next-button').addEventListener('click', function() {
    slides[currentSlide].classList.remove('on');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].classList.add('on');
});

document.getElementById('prev-button').addEventListener('click', function() {
    slides[currentSlide].classList.remove('on');
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('on');
});

document.getElementById('filtroCategoria').addEventListener('change', function() {
    const selectedCategory = this.value;
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        if (selectedCategory === 'Todos' || post.classList.contains(selectedCategory)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});
