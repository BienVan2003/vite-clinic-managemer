export const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);

    return formattedAmount
};

