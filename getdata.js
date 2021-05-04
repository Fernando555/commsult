function Generate(response) {
    let div = document.getElementById('shopping');
    div.innerHTML = '';
    if (response.length == 0) {
        div.innerHTML = "Tidak ada data";
    } else {
        response.forEach(x => {

            var col = document.createElement("div");
            col.setAttribute("class", "col-md-4");

            var divproduct = document.createElement("div");
            divproduct.setAttribute("class", "product-item");


            var div1 = document.createElement("div");
            div1.setAttribute("class", "down-content");

            var h4 = document.createElement("h4");
            h4.appendChild(document.createTextNode(x.name));

            var h6 = document.createElement("h6");
            var small = document.createElement("small");
            // var del = document.createElement("del");
            // del.appendChild(document.createTextNode(x.price))
            // small.appendChild(del);
            h6.appendChild(small);
            h6.appendChild(document.createTextNode('RP' + "." + x.price));


            var p = document.createElement('p');
            p.appendChild(document.createTextNode(x.detail));

            var button = document.createElement('button');
            button.setAttribute("class", "addcartbutton");
            button.appendChild(document.createTextNode('Add-cart'));

            var span = document.createElement('span');
            span.setAttribute("class", "addcart")

            div1.appendChild(h4);
            div1.appendChild(h6);
            div1.appendChild(p);
            var img = document.createElement("IMG");
            img.setAttribute("src", x.image);
            img.setAttribute("alt", x.name);
            img.setAttribute("class", "addcart");

            divproduct.appendChild(img);

            divproduct.appendChild(div1);

            divproduct.appendChild(span);

            divproduct.appendChild(button);



            col.appendChild(divproduct);

            div.appendChild(col);
        });
        var noti = document.querySelector('li.shoppingcart');

        var select = document.querySelector('.selectaddcard');

        var button = document.getElementsByClassName('addcartbutton');

        for (var but of button) {

            but.addEventListener('click', (e) => {
                var add = Number(noti.getAttribute('data-count') || 0);

                noti.setAttribute('data-count', add + 1);

                noti.classList.add('zero')



                // image --animation to cart ---//

                var image = e.target.parentNode.querySelector('img.addcart');

                var span = e.target.parentNode.querySelector('span.addcart');

                var s_image = image.cloneNode(false);

                span.appendChild(s_image);

                span.classList.add("active");

                setTimeout(() => {

                    span.classList.remove("active");

                    span.removeChild(s_image);

                }, 500);





                // copy and paste //

                var parent = e.target.parentNode;

                var clone = parent.cloneNode(true);

                select.appendChild(clone);

                clone.lastElementChild.innerText = "Buy-now";



                if (clone) {

                    noti.onclick = () => {

                        select.classList.toggle('display');

                    }

                }

            })

        }
    }
}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this);
        let response = JSON.parse(this.responseText);
        Generate(response);
    };
    xhttp.open("GET", "http://localhost:3000/data/" + document.getElementById('sort').value, true);
    xhttp.send();
}

function searchdata() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this);
        let response = JSON.parse(this.responseText);
        Generate(response);
    };
    xhttp.open("GET", "http://localhost:3000/data/" + document.getElementById("name").value + "/" + document.getElementById('sort').value, true);
    xhttp.send();
}

function search() {
    if (event.key === 'Enter') {
        if (document.getElementById("name").value == '') {
            loadDoc();
        } else {
            searchdata();
        }

    }
}

function sort() {
    if (document.getElementById("name").value == '') {
        loadDoc();
    } else {
        searchdata();
    }
}