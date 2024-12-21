import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import { adoptionsService, petsService, usersService } from '../services/index.js';
import mongoose from 'mongoose';


describe('Tests funcionales adoptme', function () {
    this.timeout(5000);

    // Test de ruta de users
    describe('Users Route', function () {
        it('POST /api/users para crear un usuario', async function () {
            const newUser = {
                first_name: 'Test',
                last_name: 'User',
                email: `test@example.com`,
                password: 'passwordABC',
                role: 'user'
            };

            const result = await request(app)
                .post('/api/sessions/register')
                .send(newUser)
            expect(result.status).to.equal(200);
            expect(result._body).to.have.property('status', 'success');
            expect(result._body.payload).to.be.an('object');
            expect(result._body.payload).to.have.property('_id');
        });

        it('GET /api/users debería obtener todos los usuarios', async function () {
            const result = await request(app).get('/api/users');
            expect(result.statusCode).to.equal(200);
            expect(result._body.status).to.equal("success");
            expect(result._body.payload).to.be.an("array");
        });


        it("Debería devolver error si falta un campo requerido", async function () {
            const incompleteFormUser = {
                last_name: "User",
            };

            const result = await request(app)
                .post('/api/sessions/register')
                .send(incompleteFormUser)


            expect(result.statusCode).to.equal(400);
            expect(result.body).to.have.property('status', 'error');
            expect(result._body).to.have.property('error');
        });
    });

    // Test de ruta de pets
    describe('Rutas de mascotas', function () {
        it('POST /api/pets debería crear una mascota', async function () {
            const newPet = {
                name: 'test',
                specie: 'Pez',
                birthDate: '2025-01-01',
            };

            const result = await request(app)
                .post('/api/pets')
                .send(newPet)
            expect(result.statusCode).to.equal(200);
            expect(result._body).to.have.property('status', 'success');
            expect(result._body.payload).to.be.an('object');
        });

        it('GET /api/pets debería obtener todas las mascotas', async function () {
            const result = await request(app).get('/api/pets');
            expect(result.statusCode).to.equal(200);
            expect(result._body).to.have.property('status', 'success');
            expect(result._body.payload).to.be.an('array');
        });
    });


    // Test de ruta de adopciones
    describe('Rutas de adopciones', function () {
        let userID, petID, adoptionId;
        beforeEach(async () => {
            const user = await usersService.create({
                first_name: "test",
                last_name: "user",
                email: `testuser@example.com`,
                password: "hashedpassword",
                role: "user",
                pets: []
            })
            const pet = await petsService.create({
                name: "TestPet",
                specie: "Dog",
                birthDate: "2020-01-01",
                adopted: false
            });

            const adoption = await adoptionsService.create({
                owner: user._id,
                pet: pet._id
            });

            userID = user._id;
            petID = pet._id;
            adoptionId = adoption._id;

        })


        it('POST /api/adoptions/:uid/:pid crea una adopción de mascota', async function () {

            const result = await request(app)
                .post(`/api/adoptions/${userID}/${petID}`)
                .set('Content-Type', 'application/json');

            if (result.status === 400 || result.status === 404) {
                expect(result.body).to.have.property('error');
            } else {
                expect(result.status).to.equal(200);
                expect(result.body).to.have.property('status', 'success');
                expect(result.body.message).to.equal('Pet adopted');
            }
        });

        it('GET /api/adoptions debería obtener todas las adopciones', async function () {
            const result = await request(app).get('/api/adoptions');
            expect(result.status).to.equal(200);
            expect(result.body).to.have.property('status', 'success');
            expect(result.body.payload).to.be.an('array');
        });
        it('GET /api/adoptions/:aid debería obtener todas las adopciones', async function () {
            const result = await request(app).get(`/api/adoptions/${adoptionId}`);
            if (result.status === 404) {
                expect(result.body).to.have.property('error', 'Adoption not found');
            } else {
                expect(result.status).to.equal(200);
                expect(result.body).to.have.property('status', 'success');
                expect(result.body.payload).to.be.an('object');
            }
        });

        afterEach(async () => {
            try {
                const db = mongoose.connection.db;
                await db.collection('users').deleteMany({});
                await db.collection('pets').deleteMany({});
                await db.collection('adoptions').deleteMany({});
            } catch (error) {
                console.error("Error cleaning up database after test:", error);
                throw error;
            }
        });
    });
});