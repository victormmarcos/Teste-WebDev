document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const postText = document.getElementById('postText').value;
    const postCategoria = document.getElementById('postCategoria').value;
    const urlPost1 = document.getElementById('urlPost1').value;
    const urlPost2 = document.getElementById('urlPost2').value;
    const urlPost3 = document.getElementById('urlPost3').value;
    const postDate = new Date().toLocaleString();

    const postElement = document.createElement('div');
    postElement.className = `post ${postCategoria}`;

    postElement.innerHTML = `
        <h3>${postCategoria}</h3>
        <p>${postText}</p>
        <div class="post-date">${postDate}</div>
        <div class="carousel">
            <div class="carousel-images">
                ${urlPost1 ? `<img src="${urlPost1}" alt="Imagem do post">` : ''}
                ${urlPost2 ? `<img src="${urlPost2}" alt="Imagem do post">` : ''}
                ${urlPost3 ? `<img src="${urlPost3}" alt="Imagem do post">` : ''}
            </div>
            <button class="carousel-button prev">&lt;</button>
            <button class="carousel-button next">&gt;</button>
        </div>
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

    setupCarousel(postElement.querySelector('.carousel'));
});

function editPost(postElement, postText, postCategoria, urlPost1, urlPost2, urlPost3) {
    document.getElementById('postText').value = postText;
    document.getElementById('postCategoria').value = postCategoria;
    document.getElementById('urlPost1').value = urlPost1;
    document.getElementById('urlPost2').value = urlPost2;
    document.getElementById('urlPost3').value = urlPost3;

    postElement.remove();
}

function setupCarousel(carousel) {
    const imagesContainer = carousel.querySelector('.carousel-images');
    const images = imagesContainer.querySelectorAll('img');
    let currentIndex = 0;

    carousel.querySelector('.next').addEventListener('click', function() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    carousel.querySelector('.prev').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = images.length - 1;
        }
        updateCarousel();
    });

    function updateCarousel() {
        const offset = -currentIndex * 100;
        imagesContainer.style.transform = `translateX(${offset}%)`;
    }
}
