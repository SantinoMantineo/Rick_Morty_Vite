const app = require('../src/app');
const session = require('supertest');
const agent = session(app);
// Declarar una variable para almacenar los datos compartidos entre pruebas
let sharedData = {};

describe("_Test de RUTAS_", () => {
    describe('GET /rickandmorty/character/:id', () => {
        it(`Responde con status: 200`, async () => {
            await agent.get('/rickandmorty/character/1').expect(200);
        });

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = (await agent.get('/rickandmorty/character/1')).body;
            expect(response).toHaveProperty('id');
            expect(response).toHaveProperty('name');
            expect(response).toHaveProperty('species');
            expect(response).toHaveProperty('gender');
            expect(response).toHaveProperty('status');
            expect(response).toHaveProperty('origin');
            expect(response).toHaveProperty('image');
        });

        it("Si hay un error responde con status: 500", async () => {
            await agent.get('/rickandmorty/character/invalid_id').expect(500);
        });
    });

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

    describe("_POST /rickandmorty/fav_", () => {
        it("Lo que envíes por body debe ser devuelto en un arreglo", async () => {
            const char1 = {id: 1, name: "Rick"};
            const response = await agent.post("/rickandmorty/fav")
                .send(char1)
                .expect(200);

            // Almacena el cuerpo de la respuesta en sharedData para usarlo en otras pruebas
            sharedData.favorites = response.body;

            expect(response.body).toEqual([char1]);
        });

        it("Si envías un nuevo elemento, debe ser devuelto en un arreglo que incluye elementos enviados previamente", async () => {
            // Obtener los datos compartidos de la prueba anterior
            const char1 = {id: 1, name: "Rick"};
            const prevFavorites = sharedData.favorites;

            // Enviando un segundo elemento por el body
            const char2 = {id: 2, name: "Morty"};
            const response = await agent.post("/rickandmorty/fav")
                .send(char2)
                .expect(200);

            // Verificar que la respuesta incluya los elementos enviados previamente
            expect(response.body).toEqual([...prevFavorites, char2]);
        });
    });

    describe("_DELETE /rickandmorty/fav/:id_", () => {
        it("Si no existe un personaje con el ID, devuelve un arreglo con elementos previos sin modificar", async () => {
            // Supongamos que ya hay un arreglo de elementos previos
            const char1 = {id: 1, name: "Rick"};
            const char2 = {id: 2, name: "Morty"};

            // Realizamos una solicitud DELETE con un ID que no existe
            const response = await agent.delete("/rickandmorty/fav/3");

            // Ahora realizamos las comprobaciones utilizando las funciones expect de Jest
            expect(response.body).toContainEqual(char1);
            expect(response.body).toContainEqual(char2);
        });
        
    

        it("Cuando envías un ID válido, se elimina correctamente al personaje", async () => {
            // Supongamos que ya tienes un arreglo de elementos previos
            const prevFavorites = sharedData.favorites;

            // Realizamos una solicitud DELETE con un ID que existe en los favoritos
            const response = await agent.delete("/rickandmorty/fav/1")
                .expect(200);

            // Filtra el elemento eliminado del arreglo previo
            const expectedFavorites = prevFavorites.filter(item => item.character !== "Rick");

            // Verificar que la respuesta sea igual al arreglo previo sin el elemento eliminado
           
        });
    });
});
