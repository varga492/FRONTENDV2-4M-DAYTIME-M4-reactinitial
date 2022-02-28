import { createServer } from 'miragejs';

/**
 * 
 * 
 * DO NOT TOUCH THIS FILE!!!!!!
 * 
 * 
 */


 let data = [
  {
    name: 'Kovács Béla',
    pets: [
      { name: "Bodri", animal: "dog", isVaccinated: false },
      { name: "Cirmi", animal: "cat", isVaccinated: false }
    ]
  },
  {
    name: 'Varga Lajos',
    pets: [
      { name: "Frakk", animal: "dog", isVaccinated: false }
    ]
  },
  {
    name: 'Nagy Béla',
    pets: [
      { name: "Csőrike", animal: "pigeon", isVaccinated: false }
    ]
  }
]

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,
    models: {
    },
    seeds(server) {
    },
    routes() {
      this.urlPrefix = 'https://demoapi.com';
      this.namespace = '/api';
      this.timing = 2000

      this.get('/series/howimetyourmother', (schema, request) => {
        return [
            { name: "Ted Mosby", details: "He is the main protagonist of the series..."},
            { name: "Barney Stinson", details: "He is best friend of the protagonist..."},
            { name: "Marshall Eriksen", details: "He is also the best friend of the protagonist..."},
          ]
      })

      this.post('/series/newsletter', (schema, request) => {
        return { done: true }
      })

      this.get('/laptop', (schema, request) => {
        return [
          { brand: "Apple", name: "MacBook Air", weigth: 0.5 },
          { brand: "Asus", name: "P30", weigth: 1.7 },
          { brand: "Lenovo", name: "A50", weigth: 1.5 },
        ]
      })

      this.get('/vet/clients', (schema, request) => {
        const search = request.queryParams.search
        return data.filter(client => client.name.includes(search))
      });

      this.post('/vet/pets', (schema, request) => {
        let { name, isVaccinated } = JSON.parse(request.requestBody);
        data.forEach(c => {
          c.pets.forEach(p => {
            if (p.name === name) p.isVaccinated = isVaccinated
          })
        })
        return { success: true }
      });

    },
  });
  return server;
}