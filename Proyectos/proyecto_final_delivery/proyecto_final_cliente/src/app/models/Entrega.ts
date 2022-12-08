export interface Entrega {
    id:              number;
    latitudOrigen:   string;
    longitudOrigen:  string;
    latitudDestino:  string;
    longitudDestino: string;
    precio:          string;
    estado:          number;
    created_at:      string;
    updated_at:      string;
    chofer_id?:       number;
    client_id:       number;
    latitudActual?:   string;
    longitudActual?:  string;
}