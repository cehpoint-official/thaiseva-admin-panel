import { doc, setDoc } from "firebase/firestore";
import { db } from './firebaseConfig.js'; 

const pushOrdersToFirestore = async (restaurantId) => {
    const orderIds = ['22780', '44280', '68780', '99780']; // The specific order IDs

    try {
        for (const orderId of orderIds) {
            // Reference to the restaurant's orders to store just the orderId
            const restaurantOrderRef = doc(db, `restaurants/${restaurantId}/orders`, orderId); 

            // Push only the orderId under restaurants -> restaurantId -> orders
            await setDoc(restaurantOrderRef, { orderId });
        }

        console.log("Specific order IDs added under restaurants -> {restaurantId} -> orders.");
    } catch (error) {
        console.error("Error adding orders: ", error);
    }
};

// Call the function to push specific order IDs
pushOrdersToFirestore('1YfUwhoqgRRKlSxJO67ucgIf3mm2'); // Replace with actual restaurantId
