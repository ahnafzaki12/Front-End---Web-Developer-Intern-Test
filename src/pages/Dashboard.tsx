import Navbar from '../components/Navbar'

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <h1 className="text-3xl font-bold text-blue-600">
                    Tailwind OK 🚀
                </h1>
            </div>
        </>
    )
}
