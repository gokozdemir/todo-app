const gorevListesi = document.querySelector('.gorev-listesi');
const gorevEkleButton = document.querySelector('.btn-gorev-ekle');
const eklenenGorev = document.querySelector('.input-gorev');

gorevEkleButton.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevTamamlaSil);
document.addEventListener('DOMContentLoaded', listeyiEkranaGetir);

function gorevTamamlaSil(e) {
    let hedefOge = e.target;

    if (hedefOge.classList.contains('gorev-btn-tamamlandi')) {
        hedefOge.parentElement.classList.toggle('gorev-tamamlandi');
    }

    if (hedefOge.classList.contains('gorev-btn-sil')) {
        if (confirm('Emin misiniz?')) {
            hedefOge.parentElement.classList.add('kaybol', 'close-slide');
            localStoragedanSil(hedefOge.parentElement.children[0].innerText);
            setTimeout(function () {
                hedefOge.parentElement.classList.remove('kaybol')
                hedefOge.parentElement.remove();
            }, 200);
            // hedefOge.parentElement.addEventListener('transitionend', () => {
            //     hedefOge.parentElement.remove();
            // })
        }

    }
}

function gorevEkle(e) {

    listeElemaniOlustur(eklenenGorev.value)
    localStorageKaydet(eklenenGorev.value);
    eklenenGorev.value = '';

    e.preventDefault();
}

function localStorageKaydet(gorevText) {
    let gorevler = localStoragedanDiziyeCevir();

    gorevler.push(gorevText);

    localStorage.setItem('gorevler', JSON.stringify(gorevler));


}

function localStoragedanSil(silinecekGorev) {
    let gorevler = JSON.parse(localStorage.getItem('gorevler'));

    gorevler.forEach(function (item, index) {
        if (silinecekGorev === item) {
            gorevler.splice(index, 1);
        }
    })

    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}

function listeyiEkranaGetir(e) {

    let gorevler = localStoragedanDiziyeCevir();

    gorevler.forEach(function (item) {
        listeElemaniOlustur(item);
    })

}

function localStoragedanDiziyeCevir() {
    let gorevler;

    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    return gorevler;
}

function listeElemaniOlustur(listeMetni) {
    let gorevItem = document.createElement('div');
    gorevItem.classList.add('gorev-item');

    //Li oluşturma
    let gorevItemLi = document.createElement('li');
    gorevItemLi.classList.add('gorev-tanim');
    gorevItemLi.textContent = listeMetni;

    //Tamamlandı butonu oluşturma
    let gorevBtnTamamlandi = document.createElement('button');
    gorevBtnTamamlandi.classList.add('gorev-btn', 'gorev-btn-tamamlandi');
    gorevBtnTamamlandi.innerHTML = '<i class="far fa-check-square"></i>';

    //Sil butonu oluşturma
    let gorevBtnSil = document.createElement('button');
    gorevBtnSil.classList.add('gorev-btn', 'gorev-btn-sil');
    gorevBtnSil.innerHTML = '<i class="far fa-trash-alt"></i>';


    //Item'ın içerisine öğeleri ekliyoruz.
    gorevItem.appendChild(gorevItemLi);
    gorevItem.appendChild(gorevBtnTamamlandi);
    gorevItem.appendChild(gorevBtnSil);

    //Oluşturduğumuz görev yapısını html yapımıza ekleme
    gorevListesi.appendChild(gorevItem);
}


