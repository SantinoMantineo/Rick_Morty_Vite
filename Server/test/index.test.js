const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

describe("_Test de RUTAS_", ()=>{
    describe('GET /rickandmorty/character/:id', () => {
        it(`Responde con status: 200`, async ()=>{
            await agent.get('/rickandmorty/character/1').expect(200)
        })

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await agent.get('/rickandmorty/character/1');
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('species');
            expect(response.body).toHaveProperty('gender');
            expect(response.body).toHaveProperty('status');
            expect(response.body).toHaveProperty('origin');
            expect(response.body).toHaveProperty('image');
          });

        it("Si hay un error responde con status: 500"), async ()=>{
            await agent.get('/rickandmorty/character/invalid_id').expect(500);
        }
    })

    describe("_GET /rickandmorty/login_", () => {
        it("Validacion de login con información correcta", async () => {
            const response = await agent.get("/rickandmorty/login")
                .query({ email: "santinomantineo@gmail.com", password: "123123" })
                .expect(200) // Verifica que la respuesta sea 200
                .expect({ access: true }); // Verifica que la respuesta sea { access: true }
        });

        it("Validacion de login con información incorrecta", async () => {
            const response = await agent.get("/rickandmorty/login")
                .query({ email: "correo_incorrecto", password: "contraseña_incorrecta" })
                .expect(200) // Verifica que la respuesta sea 200
                .expect({ access: false }); // Verifica que la respuesta sea { access: false }
        });
    });

    describe("_POST /rickandmorty/fav_", ()=>{
        it("Lo que envíes por body debe ser devuelto en un arreglo", async ()=>{
            const requestBody = { character: "Rick" };
            const response = await agent.post("/rickandmorty/fav")
                .send(requestBody)
                .expect(200);

                expect(response.body).toEqual([requestBody])
        })

        it("Si envías un nuevo elemento, debe ser devuelto en un arreglo que incluye elementos enviados previamente", async () => {
            // Enviando el primer elemento por el body
            const requestBody1 = { character: "Rick" };
            await agent.post("/rickandmorty/fav")
                .send(requestBody1)
                .expect(200);
    
            // Enviando un segundo elemento por el body
            const requestBody2 = { character: "Morty" };
            const response = await agent.post("/rickandmorty/fav")
                .send(requestBody2)
                .expect(200);
    
            // Verificar que la respuesta sea un arreglo que incluya los elementos enviados previamente
            expect(response.body).toEqual([requestBody1, requestBody2]);
        })
    })

    describe("_DELETE /rickandmorty/fav/:id_", () => {
        it("Si no existe un personaje con el ID, devuelve un arreglo con elementos previos sin modificar", async () => {
            // Supongamos que ya hay un arreglo de elementos previos
            const prevFavorites = [{ id: 1, character: "Rick" }, { id: 2, character: "Morty" }];
    
            // Realizamos una solicitud DELETE con un ID que no existe
            const response = await agent.delete("/rickandmorty/fav/3")
                .expect(200);
    
            // Verificar que la respuesta sea igual al arreglo previo
            expect(response.body).toEqual(prevFavorites);
        });
    
        it("Cuando envías un ID válido, se elimina correctamente al personaje", async () => {
            // Supongamos que ya tienes un arreglo de elementos previos
            const prevFavorites = [{ id: 1, character: "Rick" }, { id: 2, character: "Morty" }];
    
            // Realizamos una solicitud DELETE con un ID que existe en los favoritos
            const response = await agent.delete("/rickandmorty/fav/1")
                .expect(200);
    
            // Verificar que la respuesta sea igual al arreglo previo sin el elemento eliminado
            const expectedFavorites = [{ id: 2, character: "Morty" }];
            expect(response.body).toEqual(expectedFavorites);
        });
    });
})