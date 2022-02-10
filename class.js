const fs = require("fs");
const userManager = require("../Trabajo1/esto");

pathToProducts = "/products.json";

class product {
  constructor(name, price, color) {
    this.name = name;
    this.price = price;
    this.color = color;
  }
}

let product1 = new product("queso", 1.99, "amarillo");
let product2 = new product("calculadora",15,"blanca")
let product3 = new product("camiseta",15,"azul")

class productManager {
  asignId = async (product) => {
    if (!product.name || !product.price) {
      return { status: 400, error: "missing fields" };
    }
    if (fs.existsSync(pathToProducts)) {
      try {
        let data = fs.promises.readFile(pathToProducts, "utf-8");
        let parsedProducts = JSON.parse(data);
        let idd = parsedProducts[parsedProducts.length - 1].id + 1;
        product.id = idd;
        parsedProducts.push(product);
        await fs.promises.writeFile(
          pathToProducts,
          JSON.stringify(parsedProducts, null, 2)
        );
      } catch (error){throw error}
    } else {
      try {
        product.id = 1;
        await fs.promises.writeFile(
          pathToProducts,
          JSON.stringify([product], null, 2)
        );
        return { status: "success", message: "user created" };
      } catch (error) {
        return { status: "400", message: error };
      }
    }
  };
}

productManager.asignId(product1);
