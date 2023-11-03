const form = document.querySelector('form');
const input = document.querySelector('form input');
const inputPlaceholder = document.querySelector('form span');
const button = document.querySelector('form button');
const errorEl = document.querySelector('.err');
form.addEventListener('change', () => {
    inputPlaceholder.classList.add('top');
    if(input.value.length < 1) {
        inputPlaceholder.classList.remove('top');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    button.innerHTML = 'Downloading...';
    button.disabled = true;
    downloadImage(input.value);
});



function downloadImage(url) {
    fetch(url)
    .then(res => res.blob())
    .then(resData => {
        errorEl.innerHTML = '';
        const file = URL.createObjectURL(resData);
        const link = document.createElement('a');
        link.href = file;
        const fileExtention = url.split('/');
        link.download = fileExtention[fileExtention.length - 1];
        link.click();
        URL.revokeObjectURL(file);
        button.innerHTML = 'Download';
    })
    .catch(() => {
        errorEl.innerHTML = '<i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;Filed to download. Please Enter Valid URL';
        button.innerHTML = 'Download';
    });
}


// https://www.juventus.com/images/image/private/t_album/f_auto/dev/fb8mptk1pibx4y8xfpks.jpg