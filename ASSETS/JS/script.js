import { Peliculas } from "./peliculas.js"

    const listar = (lista) => {
        lista.forEach(pelicula => {
            const card = $(`
                <div class="card" style="width: 18rem;">
                    <img src="${pelicula.img || 'placeholder.jpg'}" class="card-img-top" alt="${pelicula.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${pelicula.titulo}</h5>
                        <p class="card-text">${pelicula.descripcion || 'Sin descripción disponible.'}</p>
                        <button class="btn btn-primary btn-reserva">Reservar</button>
                    </div>
                </div>
            `);
            $('#listaPeliculas').append(card);
        });
    };
    
    listar(Peliculas);
    
    $(document).on('click', '.btn-reserva', function() {
        const cardTitle = $(this).parent().find('h5').text();
        $('#pelicula').val(cardTitle);
        $('#asientos').val(1);

        $('#total').text(`Total: ${5990}`);
        
        $('#asientos').off('input').on('input', function() {
            const asientos = $(this).val() || 0;
            $('#total').text(`Total: ${5990 * asientos}`);
        });
        
        $('#reserva').modal('show');
    });

    $('#submit').click((e) => {
        e.preventDefault();
        
        const pelicula = $('#pelicula').val();
        const horario = $('#horario').val();
        const asientos = $('#asientos').val();
        
        const numeroTarjeta = $('#tarjeta').val().replace(/\s/g, '');
        if (numeroTarjeta.length < 16 || numeroTarjeta.length > 19) {
            alert('El número de tarjeta debe tener entre 16 y 19 dígitos');
            return;
        }
        const cvv = $('#cvv').val();
        if (cvv.length < 3 || cvv.length > 4) {
            alert('El CVV debe tener 3 o 4 dígitos');
            return;
        }
        const nombreTitular = $('#titular').val().trim();
        if (nombreTitular.length < 3 || /[0-9]/.test(nombreTitular)) {
            alert('El nombre del titular no puede contener números');
            return;
        }
        
        if(!pelicula || !horario || !asientos || asientos < 1 || !numeroTarjeta || !cvv || !nombreTitular) {
            alert('Por favor complete todos los campos correctamente');
            return;
        }

        const numeroOrden = Math.floor(100000000 + Math.random() * 900000000);

        $('#body-confirm').empty();
        $('#confirmLabel').text(`Orden N°: ${numeroOrden}`);

        const boleta = $(`
            <div class="row">
                <h5 class="text-center mb-3">Reserva Exitosa!</h5>
                <div class="texto mb-3">
                    <p class="m-0"><strong>Película:</strong> ${pelicula}</p>
                    <p class="m-0"><strong>Hora de Inicio:</strong> ${horario}</p>
                    <p class="m-0"><strong>Cantidad de asientos:</strong> ${asientos}</p>
                </div>
                <img class="img-fluid d-block mx-auto" src="./ASSETS/IMG/QR.png" alt="Código QR">
                <p class="text-center fs-4 fw-bold mt-3">Gracias por su Compra!</p>
                <p class="text-center fs-4 fw-bold mt-3">Se le enviara la informacion de su pedido por correo</p>
            </div>
        `);

        $('#body-confirm').append(boleta);
        $('#reserva').modal('hide');
        $('#confirmacion').modal('show');
        $('#pago')[0].reset()

        setTimeout(() => {
            $('#confirmacion').modal('hide');
        }, 10000);
    });



