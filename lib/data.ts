export type EventItem = { id:string; name:string; city:string; venue:string; date:string; booths:string; status:"Live"|"Draft"|"Closed" };
export const demoEvents: EventItem[] = [
{id:"beauty-expo-abu-dhabi",name:"Beauty Expo Abu Dhabi",city:"Abu Dhabi",venue:"ADNEC",date:"20 - 23 June 2026",booths:"42 / 120",status:"Live"},
{id:"coffee-festival-uae",name:"Coffee Festival UAE",city:"Dubai",venue:"Dubai World Trade Centre",date:"10 - 12 July 2026",booths:"18 / 85",status:"Live"},
{id:"fashion-market-dubai",name:"Fashion Market Dubai",city:"Dubai",venue:"Dubai Design District",date:"5 - 8 August 2026",booths:"27 / 65",status:"Draft"}
];
export const booths = [
{no:"A1",brand:"Royal Oud",type:"Perfume",reserved:true},{no:"A2",brand:"Lama Boutique",type:"Fashion",reserved:true},{no:"A3",brand:"Velvet Coffee",type:"Coffee",reserved:true},{no:"B1",brand:"Available",type:"Open",reserved:false},{no:"B2",brand:"Amna Sweets",type:"Dessert",reserved:true},{no:"B3",brand:"Available",type:"Open",reserved:false},{no:"C1",brand:"Glow Beauty",type:"Beauty",reserved:true},{no:"C2",brand:"Available",type:"Open",reserved:false},{no:"C3",brand:"Pearl Abayas",type:"Fashion",reserved:true}
];
