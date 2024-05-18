export function discountCalculator(
    preco: number,
    precoPromocional: number
): number {
    // Verifica se o preço promocional é menor que o preço regular
    if (precoPromocional < preco) {
        // Calcula o desconto em valor absoluto
        const descontoAbsoluto = preco - precoPromocional;

        // Calcula a porcentagem de desconto
        //const porcentagemDesconto = (descontoAbsoluto / preco) * 100;
        const porcentagemDesconto = Math.round(
            (descontoAbsoluto / preco) * 100
        );

        return porcentagemDesconto;
    } else {
        // Se o preço promocional não for menor que o preço regular, não há desconto
        return 0;
    }
}
