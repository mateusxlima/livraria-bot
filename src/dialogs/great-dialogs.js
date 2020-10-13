class GreatDialogs {
  constructor(context) {
    this.context = context;
  }

  async great() {
    await this.context.sendActivity(`
      Olá tudo bem? Em que posso ajudar?
      
      Tente dizer: 
      📕 Livros de romance 
      📘 Quero o livro Sapiens
      📗 Autor Auguto Cury
      🛒 Adicione o livro "1" ao meu carrinho 
      📚 Me mostre meu carrinho 
      📦 Quero fechar meu pedido
    `)
  }
}

module.exports = GreatDialogs;