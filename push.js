import { doc, serverTimestamp, setDoc } from "firebase/firestore"; // Import necessary Firestore functions
import { db } from './firebaseConfig.js'; // Adjust the import according to your Firebase setup

const pushOrdersToFirestore = async (restaurantId, orders) => {
    try {
        // Create a dictionary object to hold orders
        const ordersDictionary = {};

        // Loop through each order and prepare the dictionary
        for (const order of orders) {
            const orderId = order.OrderID.replace('#', ''); 
            const orderRef = doc(db, `orders`, orderId); 
            await setDoc(orderRef, {
                restaurantId: restaurantId,
                Date: order.Date,
                CustomerName: order.CustomerName,
                Location: order.Location,
                Amount: order.Amount,
                Status: order.Status,
                originalOrderId: order.OrderID, 
                timestamp: serverTimestamp(), 
            });
        }

        console.log("Orders added to Firestore as a dictionary.");
    } catch (error) {
        console.error("Error adding orders: ", error);
    }
};

// Sample order data
const orders = [
    {
        OrderID: "#68780",
        Date: "02 Jan, 2024",
        CustomerName: "Tithi Mondal",
        Location: "Chon Buri 20150, Thailand",
        Amount: "177.60",
        Status: "New Order",
    },
    {
        OrderID: "#99780",
        Date: "09 Jan, 2024",
        CustomerName: "Tithi Mondal",
        Location: "Chon Buri 20150, Thailand",
        Amount: "437.10",
        Status: "New Order",
    },
    {
        OrderID: "#22780",
        Date: "04 Jan, 2024",
        CustomerName: "Mery Marlo",
        Location: "Chon Buri 20150, Thailand",
        Amount: "217.60",
        Status: "On delivery",
    },
    {
        OrderID: "#68780",
        Date: "07 Feb, 2024",
        CustomerName: "Ross Rock",
        Location: "Chon Buri 20150, Thailand",
        Amount: "377.60",
        Status: "Cancelled",
    },
    {
        OrderID: "#44280",
        Date: "01 Feb, 2024",
        CustomerName: "John Deu",
        Location: "Chon Buri 20150, Thailand",
        Amount: "188.20",
        Status: "Delivered",
    },
];

// Call the function to push orders
const restaurantId = "1YfUwhoqgRRKlSxJO67ucgIf3mm2"; // Replace with the actual restaurant ID
pushOrdersToFirestore(restaurantId, orders);
