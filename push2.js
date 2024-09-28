import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from './firebaseConfig.js'; 
import orders from './dummyOrder.json' assert { type: 'json' };

const pushOrdersToFirestore = async (restaurantId, orders) => {
    try {
        // Loop through each order and push it as a document
        for (const order of orders) {
            const orderId = order.OrderID.replace('#', ''); // Create unique order ID
            const customerRef = doc(db, `orders`, restaurantId); // Reference to the customer's document

            // Create the order details
            const orderDetails = {
                CustomerId: order.CustomerId,
                CustomerName: order.CustomerName,
                RestaurantName: order.RestaurantName,
                RestaurantId: restaurantId,
                Status: [
                    { status: "New Order", timestamp: order.Status === "New Order" ? serverTimestamp() : null },
                    { status: "Preparing", timestamp: order.Status === "Preparing" ? serverTimestamp() : null },
                    { status: "On Delivery", timestamp: order.Status === "On Delivery" ? serverTimestamp() : null },
                    { status: "Delivered", timestamp: order.Status === "Delivered" ? serverTimestamp() : null },
                    { status: "Complete", timestamp: order.Status === "Complete" ? serverTimestamp() : null },
                    { status: "Payment Done", timestamp: order.Status === "Payment Done" ? serverTimestamp() : null },
                ],
                Items: [
                    {
                        ItemId: "itemId1",
                        ItemName: "Sample Item 1",
                        Type: "Veg",
                        Quantity: 1,
                        Price: 20.00,
                        Discount: 0,
                    },
                    {
                        ItemId: "itemId2",
                        ItemName: "Sample Item 2",
                        Type: "Non-Veg",
                        Quantity: 2,
                        Price: 30.00,
                        Discount: 5,
                    },
                ],
                Amount: order.Amount,
                OrderId: order.orderId,
                Location: order.Location,
                timestamp: serverTimestamp(), // Overall order timestamp
            };

            // Set the order document in Firestore
            await setDoc(doc(customerRef), orderDetails);
        }

        console.log("Orders added to Firestore under orders -> customerId -> orderId -> details.");
    } catch (error) {
        console.error("Error adding orders: ", error);
    }
};

// Call the function to push orders
pushOrdersToFirestore('222432', orders); // Replace with actual restaurantId
