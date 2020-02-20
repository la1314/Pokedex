import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Carta from './Carta';

export default class Listado extends Component {

    //Función que añade al ReactDOM una carta con los datos pasados
    showCard = (datos) => {

        let contenedor = document.getElementById('CartaFlotante');
        ReactDOM.unmountComponentAtNode(contenedor);
        let carta = <Carta pokemon={datos} />;
          
        ReactDOM.render(carta, contenedor)
    }

    //Añade capitalize al string pasado
    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    //Formatea el peso del pokemon
    formatWeight = (str) => {

        return (str / 10) + " Kg";
    }

    //Ordena mediante ID los pokemons
    ordenarPokemons = (pokemons) => {

        let ordenado = pokemons.sort(function (a, b) {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });

        return ordenado;
    }

    render() {

        const pokemons = this.ordenarPokemons(this.props.pokemons);

        return (

            <div id='patata' className='contenedor'>
                {
                    pokemons.map((item) => (
                        <div key={item.name} className="cartas" >
                            <img src={item.sprites.front_default} alt={item.name} />
                            <div className="datos">
                                <h4><b>{this.capitalize(item.name)}</b></h4>
                                <h4><b>{this.formatWeight(item.weight)}</b></h4>
                            </div>
                            <button onClick={() => this.showCard(item)}>Consultar Datos</button>

                        </div>

                    ))
                }
            </div>
        );

    }
}
