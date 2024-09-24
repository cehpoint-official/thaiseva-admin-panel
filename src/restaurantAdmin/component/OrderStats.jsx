// OrderStats.jsx
import { useEffect, useState } from "react";
import { db } from '../../firebase'; // Import your Firebase configuration
import { collection, getDocs } from "firebase/firestore";

const OrderStats = () => {
    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersSnapshot = await getDocs(collection(db, "restaurants/1YfUwhoqgRRKlSxJO67ucgIf3mm2/orders/orders"));
                const ordersData = ordersSnapshot.docs.map(doc => doc.data());

                setOrders(ordersData);
                setTotalOrders(ordersData.length);
                setCompletedOrders(ordersData.filter(order => order.Status === "Delivered").length);
                setPendingOrders(ordersData.filter(order => order.Status !== "Delivered").length);
            } catch (error) {
                console.error("Error fetching orders: ", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="flex justify-between gap-4">
            <StatCard title="Total Orders" value={totalOrders} />
            <StatCard title="Completed Orders" value={completedOrders} />
            <StatCard title="Pending Orders" value={pendingOrders} />
        </div>
    );
};

const StatCard = ({ title, value }) => {
    return (
        <div className="md:w-[33%] bg-white rounded-lg">
            <div className="flex gap-3 p-3 rounded-lg justify-between items-center">
                <div>
                    <p className="text-3xl font-bold">{value}</p>
                    <p className="text-slate-600 ms-1">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderStats;
