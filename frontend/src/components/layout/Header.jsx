
import Search from "../parking/search";
import { MapPin } from 'lucide-react';

export default function Header() {

    
    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <MapPin className="h-8 w-8 text-blue-600" />
                            <h1 className="ml-2 text-2xl font-bold text-gray-900">Parking.Toronto</h1>
                        </div>
                        <Search />
                    </div>
                </div>
            </header>
        </>
    )
}