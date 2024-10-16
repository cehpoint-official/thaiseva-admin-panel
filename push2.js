import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from './firebaseConfig.js'; 
import orders from './dummyOrder.json' assert { type: 'json' };

const pushOrdersToFirestore = async (restaurantId, orders) => {
    try {
        for (const order of orders) {
            const orderId = order.OrderID.replace('#', ''); // Create unique order ID

            // Step 1: Push only the orderId under the `restaurants` collection -> {restaurantId} -> orders -> {orderId}
            const restaurantOrderRef = doc(db, `restaurants/${restaurantId}/orders`, orderId); 
            await setDoc(restaurantOrderRef, { orderId });

            // Step 2: Push full order details under `orders` collection -> {orderId}
            const orderDetailsRef = doc(db, `orders`, orderId); // This is in the `orders` collection

            // Initialize the status array from the incoming order data
            const statusArray = order.Status || []; // Directly use order.Status

            // Check for specific statuses in the status array
            const isCancelled = statusArray.some(statusObj => statusObj.status === "Cancelled");
            const isNewOrder = statusArray.some(statusObj => statusObj.status === "New Order");
            const isPreparing = statusArray.some(statusObj => statusObj.status === "Preparing");
            const isDelivered = statusArray.some(statusObj => statusObj.status === "Delivered");
            const isPaymentDone = statusArray.some(statusObj => statusObj.status === "Payment Done");

            // Now you can construct the orderDetails object
            const orderDetails = {
                CustomerId: order.CustomerId,
                CustomerName: order.CustomerName,
                RestaurantName: order.RestaurantName,
                RestaurantId: restaurantId,
                Status: statusArray, // Use the incoming status array
                Items: order.Items || [], // Use items from the order, adjust if necessary
                Amount: order.Amount,
                OrderId: orderId,
                Location: order.Location,
                timestamp: serverTimestamp(), // Overall order timestamp
            };

            // If you need to take specific actions based on statuses, do it here
            if (isCancelled) {
                console.log(`Order ${orderId} is cancelled.`);
            }
            if (isNewOrder) {
                console.log(`Order ${orderId} is a new order.`);
            }
            // Add any additional status checks as needed

            // Push full order details to /orders/{orderId} collection
            await setDoc(orderDetailsRef, orderDetails);
        }

        console.log("Order IDs added under restaurants -> {restaurantId} -> orders, and full details added to /orders/{orderId}.");
    } catch (error) {
        console.error("Error adding orders: ", error);
    }
};

// Call the function to push orders
pushOrdersToFirestore('1YfUwhoqgRRKlSxJO67ucgIf3mm2', orders); // Replace with actual restaurantId
