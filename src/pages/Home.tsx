import Navbar from '../components/Navbar'

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Navbar />
            <div className="p-6">
                <h1 className="text-2xl font-bold dark:text-white">Home</h1>
                <h1 className="text-3xl font-bold text-blue-600">
                    Ahnaf Zaki  🚀
                </h1>
            </div>
        </div>
    )
}
