export const generateProductErrorInfo = (product) => {
    return `Required properties:
      title: Necesita ser un string, recibio ${product.title}
      description: Necesita ser un string, recibio ${product.description}
      price: Necesita ser un número, recibio ${product.price}
      code: Necesita ser un string, recibio ${product.code}
      category: Necesita ser un string, recibio ${product.category}`;
};


export const generateUserErrorInfo = (user) => {
    return `Uno o mas propiedades estan incompletos o son invalidos.
    Lista de propiedades obligatorios:
        * first_name: Necesita ser un string, recibio ${user.first_name}
        * last_name: Necesita ser un string, recibio ${user.last_name}
        * email: Necesita ser un string, recibio ${user.email}
        * zona: Necesita ser un string, recibio ${user.zona}
    `
}