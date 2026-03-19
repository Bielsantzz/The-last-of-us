import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css"
import { useEffect, useRef, useState } from "react";

export default function Mapinha(){

    const centroInicial = [-22.913933, -47.00];
    const [posicao, setposicao] = useState(null);
    const [erro,setErro] = useState("");

    const [pontos, setpontos] = useState ([]);
    const idRef = useRef(1);

    function calcularDistanciaM(alvo, origem){
        if(!origem) return null;

        const a = L.latLng(origem)
        const b = L.latLng(alvo.lat, alvo.lng)
        return a.distanceTo(b);
    }

        function formatarM(metros){
            if (metros== null) return "--"
            if (metros < 1000) return `${metros.toFixed(2)} m`
            return `${(metros / 1000).toFixed(2)} km`
        }


        function adicionarPonto ({lat, lng}){
            const novo= {
                id: idRef.current++,
                lat,
                lng,
                distanciaM: calcularDistanciaM({lat, lng}, local)

            }
            setpontos (( prev) => [...prev,novo])
        }

        function limparpontos(){
            setpontos([])
                idRef.current = 1
        }


        const pontosOrdenados = [...pontos].sort((a,b) => {
            const da = a.distanciaM ?? Infinity
            const db = b.distanciaM ?? Infinity
            return da - db;
        })



    useEffect(() =>{

        if(!("geolocation" in navigator)){
            setErro ("Seu Navegador não tem suporte para geolocalização!")
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setposicao({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            ()=> {
                setErro("Não é possivel obter sua localização")
            },
            {
                enableHighAccuracy: true,
                timeout: 8000,
                maximumAge: 0,
            }
        );


    },[]);

    const local = [-22.9137900, -47.0681000]
    const zoomInicial = local ? 15 : 13;

    function ClickHandler({onAdd}){
        useMapEvents({
            click(e){
                const {lat, lng} = e.latlng;
                onAdd ({lat,lng});

            },
        });
        return null;
    }





    return (
        <section className="mapinha">
            <h1> Mapinhaaa </h1>

            {erro && <div className="erro">{erro}</div>}


            <section className="Painel">
                <div className=" Painel-topo">
                    <span>Pontos Adicionados</span>
                    <button className="botao"
                            onClick={limparpontos}>
                        Limpar Pontos!!
                    </button>


                </div>
            </section>

            <MapContainer 
                center={posicao? local: centroInicial}
                zoom = {zoomInicial}
                scrollWheelZoom={true}
                className="mapa"
            >

                <TileLayer
                    attribution="&copy; Openstreetmap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "/>

                {local && (
                    <Marker position={local}>
                        <Popup>Você está aqui!!! </Popup>
                    </Marker>
                )}


            </MapContainer>
        </section>
    )

}