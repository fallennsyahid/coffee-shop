document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000 },
            { id: 2, name: 'Arabica Blend', img: '2.jpg', price: 25000 },
            { id: 3, name: 'Primo Passo', img: '3.jpg', price: 30000 },
            { id: 4, name: 'Aceh Gayo', img: '4.jpg', price: 35000 },
            { id: 5, name: 'Sumatra Mandheling', img: '5.jpg', price: 40000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // Check The Same Item
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // If Cart Empty
            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                // Items Already, Check The Different Items Or Check The Same Items In The Cart
                this.items = item.items.map((item) => {
                    // If Item Different
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        // If Item Already, Add Quantity & Total
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
    });
});

// Convert IDR
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(number);
};