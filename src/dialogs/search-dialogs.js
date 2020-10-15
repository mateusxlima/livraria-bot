const { ActivityTypes } = require('botbuilder');

class SearchDialogs {

  async sendBooks(context, books) {
    if (books.length === 0) {
      await context.sendActivity('Ops, você precisa fazer uma nova pesquisa... 🙃');
      await context.sendActivity(`
        Tente dizer:
        - Quero um livro do Harry Potter (ou)
        - Adicione o livro "1" ao meu carrinho
      `)
      return;
    }
    for (const book of books) {
      await this.sendBook(context, book);
    }
    await context.sendActivity(`
      Você pode dizer:
      - Ver mais (ou)
      - Adicione o livro "1" ao meu carrinho
    `);
  }

  async sendBook(context, book) {
    let { name, price, author, image, number } = book;
    const reply = { type: ActivityTypes.Message };
    author = author.split(',').reverse().join(' ')
    reply.text = `Livro: ${number}  👇👇👇👇`;
    reply.attachments = [this.getInternetAttachment(image)];
    await context.sendActivity(reply);
    await context.sendActivity(name);
    await context.sendActivity(`
      Autor: ${author || 'Não encontrado'}
      Preço: ${price}
    `);
    await context.sendActivity('📕     -=-     -=-     📔     -=-     -=-     📘');
  }

  getInternetAttachment(image) {
    return {
      name: ' ',
      contentType: 'image/jpg',
      contentUrl: image
    };
  }
}

module.exports = SearchDialogs;