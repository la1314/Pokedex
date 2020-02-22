import React, { Component } from 'react';
import Listado from './Listado';

export default class Busqueda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            allPokemons: [],
            datosPokemons: [],
            pokemons: []
        };
    }

    componentDidMount() {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=964")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        allPokemons: result.results
                        
                    });

                    result.results.forEach(element => {
                        fetch(element.url)
                            .then(res => res.json()).then(
                                (result) => {
                                    this.setState({
                                        datosPokemons: this.state.datosPokemons.concat(result)
                                    });
                                })
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    //Se filtra en pokemons cuyos nombres incluyan el valor del input filtrar
    filtrarPokemons = (e) => {

        if (e.target.value === '' || e.target.value === null) {
            this.setState({
            pokemons: this.state.datosPokemons
            })
        } else {
            this.setState({
                pokemons: this.state.datosPokemons.filter(pokemon => pokemon.name.includes(e.target.value.toLowerCase()))
            }) 
        }
    }

    //Previene el recargado del form
    submitHandler(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="cabecera">
                    <h1>PokeDex</h1>
                    <form id="busquedaform" onSubmit={this.submitHandler} >
                        <input type="text" name="filtrar" onChange={this.filtrarPokemons} />
                    </form>
                </div>
                <div id='CartaFlotante'></div>
                <Listado pokemons={this.state.pokemons} />
            </div>
        );
    }
}
