const moneyFormat = (value: number) => {
    const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
    return formatted;
};

export { moneyFormat };
