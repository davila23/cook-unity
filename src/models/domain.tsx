import { Currency } from "./currency";

export type DomainData = {
ip: string;
name: string;
code: string;
lat: number;
lon: number;
currencies : Currency[];
distante_to_usa: number
}