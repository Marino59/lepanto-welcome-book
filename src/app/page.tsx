import { queries } from "@/sanity/queries";
import { WifiCard } from "@/components/WifiCard";
// Remove next-sanity image builder for now, use CSS backgrounds or simple fallback

// Define TypeScript interfaces for our Sanity data
interface HouseInfo {
  title?: string;
  address?: string;
  history?: string;
  wifiPassword?: string;
  // heroImage?: any;
}

interface Restaurant {
  _id: string;
  name?: string;
  address?: string;
  description?: string;
  icon?: string;
}

interface Facility {
  _id: string;
  name?: string;
  address?: string;
  icon?: string;
}

interface Emergency {
  _id: string;
  name?: string;
  number?: string;
  icon?: string;
}

export const revalidate = 10; // Revalidate cache every 10 seconds

export default async function Home() {
  // Fetch data
  const houseInfoUrl = await queries.getHouseInfo();
  const restaurantsUrl = await queries.getRestaurants();
  const facilitiesUrl = await queries.getFacilities();
  const emergenciesUrl = await queries.getEmergencies();

  // Await and cast types
  const houseInfo = houseInfoUrl as HouseInfo || null;
  const restaurants = (restaurantsUrl || []) as Restaurant[];
  const facilities = (facilitiesUrl || []) as Facility[];
  const emergencies = (emergenciesUrl || []) as Emergency[];

  // Fallback Data if Sanity is empty
  const defaultHouseInfo = {
    title: "Benvenuti al Lido di Venezia",
    address: "Via Lepanto 17",
    history: "Il Lido di Venezia è molto più di un'isola: è la spiaggia d'oro della Serenissima e la culla della Belle Époque italiana. Conosciuto in tutto il mondo per ospitare ogni anno la prestigiosa Mostra Internazionale d'Arte Cinematografica, il Lido mantiene un fascino senza tempo con le sue ville liberty e i grandi alberghi storici. Godetevi la tranquillità di questa isola sospesa tra la laguna e il Mare Adriatico, a soli 15 minuti di vaporetto da Piazza San Marco.",
    wifiPassword: "Lepanto17"
  };

  const defaultRestaurants = [
    { _id: '1', name: "El Cason", address: "Via Pividor Giovanni", description: "Un punto di riferimento al Lido. Ottima scelta di pesce fresco, carne alla brace e tantissime varianti di pizza.", icon: "utensils" },
    { _id: '2', name: "Ai Do Mati", address: "Gran Viale S.M. Elisabetta", description: "Perfetto per mangiare all'aperto nel suo bel dehors, offre ottime pizze e piatti tipici proprio sulla via principale.", icon: "pizza-slice" },
    { _id: '3', name: "La Taverna", address: "A pochi minuti dal centro", description: "Locale a conduzione familiare, rustico e accogliente, ideale per chi cerca una pizza genuina in un'atmosfera rilassata.", icon: "wine-glass" },
    { _id: '4', name: "Punto Pizza da Maury", address: "Via Sandro Gallo", description: "Siete di fretta? È la migliore pizzeria al taglio e da asporto della zona, pluripremiata per i suoi impasti.", icon: "box-open" },
  ];

  const defaultFacilities = [
    { _id: '1', name: "Conad City", address: "Viale S.M. Elisabetta, 1", icon: "cart-shopping" },
    { _id: '2', name: "Coop Centro", address: "Via Doge Michiel, 5b", icon: "basket-shopping" },
    { _id: '3', name: "Farmacia Dr. Marangoni", address: "Viale S.M. Elisabetta, 55/A", icon: "staff-snake" },
  ];

  const defaultEmergencies = [
    { _id: '1', name: "Emergenza Generale", number: "112", icon: "phone" },
    { _id: '2', name: "Ambulanza", number: "118", icon: "truck-medical" },
    { _id: '3', name: "Guardia Medica Lido", number: "041 2385668", icon: "house-medical" },
    { _id: '4', name: "Ospedale Al Mare (Lido)", number: "041 5295234", icon: "hospital" },
  ];

  // Merge
  const finalHouseInfo = houseInfo?.title ? houseInfo : defaultHouseInfo;
  const finalRestaurants = restaurants.length > 0 ? restaurants : defaultRestaurants;
  const finalFacilities = facilities.length > 0 ? facilities : defaultFacilities;
  const finalEmergencies = emergencies.length > 0 ? emergencies : defaultEmergencies;

  return (
    <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl sm:min-h-[850px] sm:my-8 sm:rounded-3xl overflow-hidden border border-gray-100 pb-10">
        
        {/* Hero Section */}
        <div className="hero-bg h-64 text-white flex flex-col justify-end p-6 relative">
            <h1 className="font-serif text-3xl font-bold leading-tight mb-2 drop-shadow-lg" dangerouslySetInnerHTML={{ __html: finalHouseInfo.title?.replace(/\n/g, '<br/>') || '' }}></h1>
            <p className="text-brand-100 font-medium tracking-wide drop-shadow-md flex items-center">
                <i className="fa-solid fa-location-dot mr-2"></i> {finalHouseInfo.address}
            </p>
        </div>

        <div className="px-6 -mt-6">
            
            {/* Intro / History */}
            {finalHouseInfo.history && (
            <div className="bg-white content-card rounded-2xl p-5 mb-6 border border-gray-100 relative z-10">
                <h2 className="font-serif text-xl font-bold text-brand-900 mb-3">La Nostra Storia</h2>
                <p className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: finalHouseInfo.history.replace(/\n/g, '<br/>') || '' }}></p>
            </div>
            )}

            {/* Practical Info */}
            <h2 className="font-serif text-xl font-bold text-gray-800 mb-4 px-1 mt-4">La Casa</h2>
            
            <WifiCard password={finalHouseInfo.wifiPassword} />

            {/* Restaurants */}
            <h2 className="font-serif text-xl font-bold text-gray-800 mb-4 px-1 mt-8">I Nostri Ristoranti Preferiti</h2>
            <div className="space-y-4 mb-8">
                {finalRestaurants.map((restaurant) => (
                <div key={restaurant._id} className="flex bg-white content-card rounded-2xl p-4 border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mr-4 shrink-0">
                        <i className={`fa-solid fa-${restaurant.icon || 'utensils'}`}></i>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                        <p className="text-xs text-brand-800 font-medium mb-1"><i className="fa-solid fa-map-pin mr-1"></i>{restaurant.address}</p>
                        <p className="text-sm text-gray-600">{restaurant.description}</p>
                    </div>
                </div>
                ))}
            </div>

            {/* Essentials */}
            <h2 className="font-serif text-xl font-bold text-gray-800 mb-4 px-1 mt-8">Negozi ed Essenziali</h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
                {finalFacilities.map((facility, index) => (
                <div key={facility._id} className={`bg-gray-50 content-card rounded-2xl p-4 border border-gray-100 ${index === 2 ? 'col-span-2 flex items-center' : 'text-center'}`}>
                    <div className={`w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center ${index === 2 ? 'mr-3 shrink-0 bg-green-100 text-green-600' : 'mx-auto mb-2'}`}>
                        <i className={`fa-solid fa-${facility.icon || 'store'} ${index === 2 ? 'text-lg' : ''}`}></i>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm">{facility.name}</h3>
                        <p className={`text-gray-500 mt-1 ${index === 2 ? 'text-xs' : 'text-xs'}`}>{facility.address}</p>
                    </div>
                </div>
                ))}
            </div>

            {/* Emergencies */}
            <h2 className="font-serif text-xl font-bold text-gray-800 mb-4 px-1 mt-8">Numeri di Emergenza</h2>
            <div className="bg-red-50 content-card rounded-2xl p-5 border border-red-100 mb-8">
                <ul className="space-y-3">
                    {finalEmergencies.map((emergency, index) => (
                    <li key={emergency._id} className={`flex justify-between items-${index >= 2 ? 'start' : 'center'} ${index !== finalEmergencies.length - 1 ? 'pb-3 border-b border-red-100' : ''}`}>
                        <span className={`text-sm font-medium text-red-900 ${index >= 2 ? 'leading-tight' : ''}`}>
                            <i className={`fa-solid fa-${emergency.icon || 'phone'} w-5 text-red-500 text-center ${index >= 2 ? 'inline-block' : ''}`}></i> {emergency.name}
                        </span>
                        <div className={index === 2 ? 'text-right' : ''}>
                           <a href={`tel:${emergency.number?.replace(/\s/g, '')}`} className={`font-bold text-red-600 ${index === 2 ? 'block' : index === 3 ? 'text-right' : ''}`}>{emergency.number}</a>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>

            <div className="text-center pb-2 pt-2">
                <p className="text-sm text-gray-400 font-serif italic mb-1 flex items-center justify-center">
                    <i className="fa-solid fa-water text-brand-200 mr-2"></i> Vi auguriamo un piacevole soggiorno <i className="fa-solid fa-water text-brand-200 ml-2"></i>
                </p>
            </div>
        </div>
    </div>
  );
}
